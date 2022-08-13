import { Request, Response } from "express";
import {
    createSession,
    findSessions,
    updateSession,
} from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config from "config";
import logger from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
    // Validate the user's password
    const user = await validatePassword(req.body);

    if (!user) {
        return res.status(401).send("Invalid email or password");
    }
    // create a session
    const session = await createSession(user._id, req.get("user-agent") || "");
    // create an access token
    // signJwt gives the accessToken the user object and adds on a session property
    // User + session object is added to res.locals.user in the deserializeUser middleware which allows controllers to acces user id and session id
    const accessToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("accessTokenTtl") } // 15min
    );
    // create a refresh token
    const refreshToken = signJwt(
        { ...user, session: session._id },
        { expiresIn: config.get("refreshTokenTtl") } // 15min
    );

    res.cookie("accessToken", accessToken, {
        maxAge: 900000, // 15 mins
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });

    res.cookie("refreshToken", refreshToken, {
        maxAge: 3.154e10, // 1 year
        httpOnly: true,
        domain: "localhost",
        path: "/",
        sameSite: "strict",
        secure: false,
    });

    // return access & refresh tokens
    return res.status(201).send({ accessToken, refreshToken });
}

export async function getUserSessionsHandler(req: Request, res: Response) {
    try {
        const userId = res.locals.user._id;
        const sessions = await findSessions({ user: userId, valid: true });

        return res.status(200).send(sessions);
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

export async function deleteSessionHandler(req: Request, res: Response) {
    try {
        const sessionId = res.locals.user.session;
        const updatedSession = await updateSession(
            { _id: sessionId },
            { valid: false }
        );

        return updatedSession
            ? res.status(201).send({ accessToken: null, refreshToken: null })
            : res.status(404).json({ message: "Not found" });
    } catch (error) {
        logger.error(error);
        return res.status(500).json({ error });
    }
}

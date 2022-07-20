import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserInput {
    email: string;
    name: string;
    password: string;
}

export interface UserDocument extends UserInput, mongoose.Document {
    createdAt: Date;
    updatedAt: Date;
    comparePassword(candiatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema(
    {
        email: { type: String, required: true, unique: true },
        name: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);

// You get an error because the arrow function changes the scope of 'this.' Have to use function keyword for 'this' to work.
userSchema.pre("save", async function (next) {
    let user = this as unknown as UserDocument;

    // if the pre save is not modifying the password, return next
    if (!user.isModified("password")) {
        return next();
    }

    // if the password is being modified
    const salt = await bcrypt.genSalt(config.get<number>("saltWorkFactor"));
    const hash = await bcrypt.hashSync(user.password, salt);

    user.password = hash;

    return next();
});

userSchema.methods.comparePassword = async function (
    candiatePassword: string
): Promise<boolean> {
    const user = this as UserDocument;

    return bcrypt.compare(candiatePassword, user.password).catch((e) => false);
};

const UserModel = mongoose.model<UserDocument>("User", userSchema);

export default UserModel;

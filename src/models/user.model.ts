import mongoose from "mongoose";
import bcrypt from "bcrypt";
import config from "config";

export interface UserDocument extends mongoose.Document {
    email: string;
    name: string;
    password: string;
    createdAt: Date;
    updatedAt: Date;
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

userSchema.pre("save", async (next: (err?: Error) => void) => {
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

const UserModel = mongoose.model("User", userSchema);

export default UserModel;

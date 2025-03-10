import mongoose, { Document, Model } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
    _id: mongoose.Types.ObjectId;
    name: string;
    email: string;
    password: string;
    comparePassword(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
    name: { type: String },
    email: { type: String, unique: [true,"this email is already in use"] },
    password: String,
});

userSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password, 10);
    }
    next();
});

userSchema.methods.comparePassword = async function (
    candidatePassword: string
): Promise<boolean> {
    return bcrypt.compare(candidatePassword, this.password);
};

export default (mongoose.models.User as Model<IUser>) ||
mongoose.model<IUser>('User', userSchema);
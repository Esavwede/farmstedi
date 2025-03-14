/*** MODULES ***/

// Database
import mongoose, { Schema, Document } from "mongoose";

// Hashing
import bcrypt from "bcryptjs";
import { ServerError } from "../utils/errors/server/500Error";

/** User Interface */
export interface IUser extends Document {
  googleId: string;
  facebookId: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  emailVerified: boolean;
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

/** User Schema */
const UserSchema = new Schema<IUser>(
  {
    googleId: {
      type: String,
      unique: true,
      sparse: true,
    },
    facebookId: {
      type: String,
      unique: true,
      sparse: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
    emailVerified: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

/** Presave Methods */

// Saving New Password
UserSchema.pre("save", async function (next) {
  try {
    if (!this.isModified("password")) return next(); // Password Not Modified Return

    // Hash Modified Password
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (e: any) {
    console.log("Server Error While Hashing Saved Password");
    throw new ServerError("Server Error");
  }
});

/** UserSchema Methods */

// Compare Passwords
UserSchema.methods.comparePassword = async function (
  candidatePassword: string
): Promise<boolean> {
  try {
    return await bcrypt.compare(candidatePassword, this.password);
  } catch (e: any) {
    console.log("Password Compare Error");
    console.log(e);
    throw new ServerError("Server Error");
  }
};

const User = mongoose.model<IUser>("user", UserSchema);
export default User;

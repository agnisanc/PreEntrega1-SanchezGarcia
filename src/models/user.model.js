import { Schema, model } from "mongoose";
import { createHash } from "../utils/hash.js";

const userSchema = new Schema(
    {
      first_name: { type: String, required: true },
      last_name: { type: String, required: true },
      email: { type: String, required: true, unique: true },
      age: { type: Number, required: true },
      password: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ["admin", "user"],
        default: "user",
      },
    },
    {
      timestamps: true,
    }
  );


userSchema.pre("save", function (next) {
    if (this.email.includes("@") && this.email.includes(".")) {
        return next();
    }
    next(new Error("Invalid email"))
})

userSchema.pre("save", async function (next) {
    const newPassword = await createHash(this.password);

    this.password = newPassword;

    next();
});

export const userModel = model("user", userSchema);
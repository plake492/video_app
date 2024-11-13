import mongoose, { Schema, Document } from "mongoose"
import bcrypt from "bcryptjs"

// Define the User interface (TypeScript types)
interface IUser extends Document {
  name: string
  email: string
  password: string
  comparePassword: (candidatePassword: string) => Promise<boolean>
}

// Create the User schema
const UserSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensure email is unique
      lowercase: true, // Store emails in lowercase
      match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"], // Simple email regex validation
    },
    password: {
      type: String,
      required: true,
      minlength: 6, // Minimum length for password
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
)

// Pre-save hook to hash the password before saving it to the database
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) {
    return next() // Skip hashing if password is not modified
  }

  // Hash the password with 10 salt rounds
  try {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
  } catch (error) {
    return next(error) // Pass the error to the next middleware
  }
})

// Method to compare passwords (useful for login)
UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  return bcrypt.compare(candidatePassword, this.password)
}

// Create and export the model
const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema)

export default User

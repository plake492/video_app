import mongoose, { Schema, Document } from "mongoose"

// Define the Video interface (TypeScript types)
interface IVideo extends Document {
  title: string
  description: string
  url: string
  user: mongoose.Schema.Types.ObjectId
}

// Create the Video schema
const VideoSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
      trim: true,
    },
    url: {
      type: String,
      required: true,
      trim: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }, // Automatically add createdAt and updatedAt fields
)

// Create and export the model
const Video =
  mongoose.models.Video || mongoose.model<IVideo>("Video", VideoSchema)

export default Video

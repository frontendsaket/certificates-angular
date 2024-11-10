import mongoose from "mongoose";

const certificateSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  recipient: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
});

export default mongoose.model("certificate", certificateSchema);

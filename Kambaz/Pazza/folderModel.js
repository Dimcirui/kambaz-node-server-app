import mongoose from "mongoose";
import schema from "./folderSchema.js";
const model = mongoose.model("PazzaFolderModel", schema);
export default model;
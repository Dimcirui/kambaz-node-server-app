import mongoose from "mongoose";
import schema from "./schema.js";
const model = mongoose.model("PazzaModel", schema);
export default model;
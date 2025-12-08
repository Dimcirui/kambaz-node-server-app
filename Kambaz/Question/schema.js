import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    _id: String,
    quizId: { type: String, required: true },
    title: { type: String, default: "New Question"},
    points: { type: Number, default: 0 },
    text: { type: String, default: "" },
    type: { 
        type: String,
        enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "FILL_IN_THE_BLANK"],
        default: "MULTIPLE_CHOICE"
    },
    choices: [{ text: String, isCorrect: Boolean }],
    correctAnswer: { type: String, default: "" }
  }
);
export default schema;
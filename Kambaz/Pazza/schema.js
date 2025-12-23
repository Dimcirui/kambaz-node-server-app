import mongoose from "mongoose";

const followupSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: { type: Date, default: Date.now },
    resolved: { type: Boolean, default: false },
    replies: [{ 
        author: String, 
        text: String, 
        date: { type: Date, default: Date.now } 
    }]
});

const answerSchema = new mongoose.Schema({
    author: String,
    text: String,
    date: { type: Date, default: Date.now },
    type: { type: String, enum: ["STUDENT", "INSTRUCTOR"], default: "STUDENT" },
    upvotes: { type: Number, default: 0 }
});

const pazzaSchema = new mongoose.Schema({
    course: { type: String, required: true },
    title: { type: String, required: true },
    details: String,
    type: { type: String, enum: ["QUESTION", "NOTE"], default: "QUESTION" },
    folders: [String],
    author: String,
    date: { type: Date, default: Date.now },
    views: { type: Number, default: 0 },
    
    studentAnswer: answerSchema,
    instructorAnswer: answerSchema,
    followups: [followupSchema],
    
    pinned: { type: Boolean, default: false }
}, { collection: "pazza_posts" });

export default pazzaSchema;
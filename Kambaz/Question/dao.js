import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function QuestionDao() {
    const findQuestionsForQuiz = async (quizId) => {
        return model.find({ quizId });
    };

    const findQuestionById = async (questionId) => {
        return model.findById(questionId);
    };

    const createQuestion = async (quizId, question) => {
        const newQuestion = {
            ...question,
            _id: uuidv4(),
            quizId: quizId
        };
        return model.create(newQuestion);
    };

    const updateQuestion = async (questionId, questionUpdates) => {
        const { _id, ...updates } = questionUpdates;
        return model.updateOne({ _id: questionId }, { $set: updates });
    }

    const deleteQuestion = async (questionId) => {
        return model.deleteOne({ _id: questionId });
    };

    return {
        findQuestionsForQuiz,
        findQuestionById,
        createQuestion,
        updateQuestion,
        deleteQuestion
    };
}
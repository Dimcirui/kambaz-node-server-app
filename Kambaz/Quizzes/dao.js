import model from './model.js';
import { v4 as uuidv4 } from 'uuid';

export default function QuizzesDao() {

    const findAllQuizzes = async () => {
        return model.find();
    }

    const findQuizzesForCourse = async (courseId) => {
        return model.find({ course: courseId });
    };

    const findQuizById = async (quizId) => {
        return model.findById(quizId);
    };

    const createQuiz = async (quiz) => {
        const newQuiz = { _id: quiz._id || uuidv4(), ...quiz };
        return model.create(newQuiz);
    }

    const updateQuiz = async (quizId, quizUpdates) => {
        const { _id, ...updates } = quizUpdates;
        return model.updateOne({ _id: quizId }, { $set: updates });
    }

    const deleteQuiz = async (quizId) => {
        return model.deleteOne({ _id: quizId });
    }

    return {
        findAllQuizzes,
        findQuizzesForCourse,
        findQuizById,
        createQuiz,
        updateQuiz,
        deleteQuiz
    };
}
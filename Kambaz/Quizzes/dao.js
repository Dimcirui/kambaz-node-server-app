import { v4 as uuidv4 } from 'uuid';

export default function QuizzesDao(db) {
    const findAllQuizzes = () => db.quizzes;

    const findQuizzesForCourse = async (courseId) => {
        return db.quizzes().filter(quiz => quiz.course === courseId);
    };

    const createQuiz = async (quiz) => {
        const newQuiz = { _id: uuidv4(), ...quiz };
        db.quizzes = [...db.quizzes, newQuiz];
        return newQuiz;
    }

    const updateQuiz = async (quizId, quizUpdates) => {
        const quiz = db.quizzes.find((q) => q._id === quizId);
        Object.assign(quiz, quizUpdates);
        return quiz;
    }

    const deleteQuiz = async (quizId) => {
        db.quizzes = db.quizzes.filter((quiz) => quiz._id !== quizId);
        return quizId;
    }

    return {
        findAllQuizzes,
        findQuizzesForCourse,
        createQuiz,
        updateQuiz,
        deleteQuiz
    };
}
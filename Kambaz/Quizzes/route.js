import QuizzesDao from './dao.js';

export default function QuizzesRoutes(app, db) {
    const dao = QuizzesDao(db);

    const findQuizzesForCourse = (req, res) => {
        const { cid } = req.params;
        const quizzes = dao.findQuizzesForCourse(cid);
        res.json(quizzes);
    };

    const createQuizForCourse = (req, res) => {
        const { cid } = req.params;
        const quizData = { ...req.body, course: cid };
        const newQuiz = dao.createQuiz(quizData);
        res.json(newQuiz);
    };

    const updateQuiz = (req, res) => {
        const { qid } = req.params;
        const updatedQuiz = dao.updateQuiz(qid, req.body);
        res.json(updatedQuiz);
    };

    const deleteQuiz = (req, res) => {
        const { qid } = req.params;
        dao.deleteQuiz(qid);
        res.sendStatus(200);
    };

    app.get('/api/courses/:cid/quizzes', findQuizzesForCourse);
    app.post('/api/courses/:cid/quizzes', createQuizForCourse);
    app.put('/api/quizzes/:qid', updateQuiz);
    app.delete('/api/quizzes/:qid', deleteQuiz);
}

import QuizzesDao from './dao.js';

export default function QuizzesRoutes(app, db) {
    const dao = QuizzesDao(db);

    const findQuizzesForCourse = async (req, res) => {
        const { cid } = req.params;
        const quizzes = await dao.findQuizzesForCourse(cid);
        res.json(quizzes);
    };

    const createQuizForCourse = async (req, res) => {
        const { cid } = req.params;
        const quizData = { ...req.body, course: cid };
        const newQuiz = await dao.createQuiz(quizData);
        res.json(newQuiz);
    };

    const updateQuiz = async (req, res) => {
        const { qid } = req.params;
        const updatedQuiz = await dao.updateQuiz(qid, req.body);
        res.json(updatedQuiz);
    };

    const deleteQuiz = async (req, res) => {
        const { qid } = req.params;
        await dao.deleteQuiz(qid);
        res.sendStatus(200);
    };

    app.get('/api/courses/:cid/quizzes', findQuizzesForCourse);
    app.post('/api/courses/:cid/quizzes', createQuizForCourse);
    app.put('/api/quizzes/:qid', updateQuiz);
    app.delete('/api/quizzes/:qid', deleteQuiz);
}

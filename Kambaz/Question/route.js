import QuestionDao from "./dao.js";

export default function QuestionRoutes(app) {
    const dao = QuestionDao();

    const findQuestionsForQuiz = async (req, res) => {
        const { qid } = req.params;
        const questions = await dao.findQuestionsForQuiz(qid);
        res.json(questions);
    };

    const findQuestionById = async (req, res) => {
        const { questionId } = req.params;
        const question = await dao.findQuestionById(questionId);
        res.json(question);
    };

    const createQuestion = async (req, res) => {
        const { qid } = req.params;
        const question = await dao.createQuestion(qid, req.body);
        res.json(question);
    };

    const updateQuestion = async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.updateQuestion(questionId, req.body);
        res.json(status);
    };

    const deleteQuestion = async (req, res) => {
        const { questionId } = req.params;
        const status = await dao.deleteQuestion(questionId);
        res.json(status);
    };

    app.get('/api/quizzes/:qid/questions', findQuestionsForQuiz);
    app.get('/api/questions/:questionId', findQuestionById);
    app.post('/api/quizzes/:qid/questions', createQuestion);
    app.put('/api/questions/:questionId', updateQuestion);
    app.delete('/api/questions/:questionId', deleteQuestion);
}
import GradesDao from "./dao.js";

export default function GradesRoutes(app) {
  const findGradesForStudent = async (req, res) => {
    const { userId } = req.params;
    const grades = await GradesDao.findGradesForStudent(userId);
    res.json(grades);
  };

  const findGradesForAssignment = async (req, res) => {
    const { assignmentId } = req.params;
    const grades = await GradesDao.findGradesForAssignment(assignmentId);
    res.json(grades);
  };

  const updateGrade = async (req, res) => {
    const { gradeId } = req.params;
    const status = await GradesDao.updateGrade(gradeId, req.body);
    res.send(status);
  };

  const createGrade = async (req, res) => {
    const grade = await GradesDao.createGrade(req.body);
    res.json(grade);
  };

  const deleteGrade = async (req, res) => {
    const { gradeId } = req.params;
    const status = await GradesDao.deleteGrade(gradeId);
    res.send(status);
  };

  app.get("/api/users/:userId/grades", findGradesForStudent);
  app.get("/api/assignments/:assignmentId/grades", findGradesForAssignment);
  app.put("/api/grades/:gradeId", updateGrade);
  app.post("/api/grades", createGrade);
  app.delete("/api/grades/:gradeId", deleteGrade);
}

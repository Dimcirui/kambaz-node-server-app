import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app, db) {
  const assignmentsDao = AssignmentsDao(db);

  const findAssignmentsForCourse = (req, res) => {
    const { cid } = req.params;
    const assignments = assignmentsDao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const createAssignmentForCourse = (req, res) => {
    const { cid } = req.params;
    const newAssignment = assignmentsDao.createAssignmentForCourse(cid, req.body);
    res.json(newAssignment);
  };

  const deleteAssignment = (req, res) => {
    const { aid } = req.params;
    assignmentsDao.deleteAssignment(aid);
    res.sendStatus(200);
  };

  const updateAssignment = (req, res) => {
    const { aid } = req.params;
    const updatedAssignment = assignmentsDao.updateAssignment(aid, req.body);
    res.json(updatedAssignment);
  };

  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:cid/assignments", createAssignmentForCourse);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
}
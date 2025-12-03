import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
  const assignmentsDao = AssignmentsDao();

  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const createAssignmentForCourse = async (req, res) => {
    try {
      const { cid } = req.params;

      console.log("Creating assignment for course:", cid);
      console.log("Request body:", req.body);

      const newAssignment = await assignmentsDao.createAssignment({ ...req.body, course: cid });

      console.log("Created assignment:", newAssignment);

      res.json(newAssignment);
    } catch (error) {
      console.error("Error creating assignment:", error);
      res.status(500).json({ error: error.message });
    }
  };

  const deleteAssignment = async (req, res) => {
    const { aid } = req.params;
    await assignmentsDao.deleteAssignment(aid);
    res.sendStatus(200);
  };

  const updateAssignment = async (req, res) => {
    const { aid } = req.params;
    const updatedAssignment = await assignmentsDao.updateAssignment(aid, req.body);
    res.json(updatedAssignment);
  };

  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:cid/assignments", createAssignmentForCourse);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
}
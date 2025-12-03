import AssignmentsDao from "./dao.js";

export default function AssignmentsRoutes(app) {
  console.log("=== AssignmentsRoutes: Starting registration ===");

  const assignmentsDao = AssignmentsDao();

  const findAssignmentsForCourse = async (req, res) => {
    const { cid } = req.params;
    const assignments = await assignmentsDao.findAssignmentsForCourse(cid);
    res.json(assignments);
  };

  const createAssignmentForCourse = async (req, res) => {
    console.log("=== createAssignmentForCourse called ===");
    console.log("cid:", req.params.cid);
    console.log("body:", req.body);
    try {
      const { cid } = req.params;
      const newAssignment = await assignmentsDao.createAssignment({ ...req.body, course: cid });

      console.log("Created:", newAssignment);

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

  console.log("=== Registering assignment routes ===");
  app.get("/api/courses/:cid/assignments", findAssignmentsForCourse);
  app.post("/api/courses/:cid/assignments", createAssignmentForCourse);
  app.delete("/api/assignments/:aid", deleteAssignment);
  app.put("/api/assignments/:aid", updateAssignment);
  console.log("=== AssignmentsRoutes: Registration complete ===");
}
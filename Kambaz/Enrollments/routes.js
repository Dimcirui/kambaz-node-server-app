import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const enrollmentsDao = EnrollmentsDao();

  const enrollUserInCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.body;
    await enrollmentsDao.enrollUserInCourse(currentUser._id, courseId);
    res.sendStatus(201);
  };

  const unenrollUserFromCourse = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const { courseId } = req.params;
    await enrollmentsDao.unenrollUserFromCourse(currentUser._id, courseId);
    res.sendStatus(200);
  };

  const findEnrollmentsForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = await enrollmentsDao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };

  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments/:courseId", unenrollUserFromCourse);
  app.get("/api/users/current/enrollments", findEnrollmentsForCurrentUser);
}
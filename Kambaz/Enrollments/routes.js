import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const enrollUserInCourse = async (req, res) => {
    const { userId, courseId } = req.body;
    try {
      const status = await dao.enrollUserInCourse(userId, courseId);
      res.send(status);
    } catch (error) {
      res.status(400).send({ message: "Unable to enroll user. Maybe already enrolled?" });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    const { userId, courseId } = req.params;
    const status = await dao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  };

  const findEnrollmentsForUser = async (req, res) => {
    const { userId } = req.params;
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
  app.get("/api/enrollments/:userId", findEnrollmentsForUser);
}

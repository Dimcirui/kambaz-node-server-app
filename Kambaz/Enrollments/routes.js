import EnrollmentsDao from "./dao.js";

export default function EnrollmentsRoutes(app) {
  const dao = EnrollmentsDao();

  const enrollUserInCourse = async (req, res) => {
    let { userId, courseId } = req.body;
    if (!userId) {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    try {
      const status = await dao.enrollUserInCourse(userId, courseId);
      res.send(status);
    } catch (error) {
      res.status(400).send({ message: "Unable to enroll user. Maybe already enrolled?" });
    }
  };

  const unenrollUserFromCourse = async (req, res) => {
    let { userId, courseId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const status = await dao.unenrollUserFromCourse(userId, courseId);
    res.send(status);
  };

  const findEnrollmentsForUser = async (req, res) => {
    let { userId } = req.params;
    if (userId === "current") {
      const currentUser = req.session["currentUser"];
      if (!currentUser) {
        res.sendStatus(401);
        return;
      }
      userId = currentUser._id;
    }
    const enrollments = await dao.findEnrollmentsForUser(userId);
    res.json(enrollments);
  };

  app.post("/api/enrollments", enrollUserInCourse);
  app.delete("/api/enrollments/:userId/:courseId", unenrollUserFromCourse);
  app.get("/api/enrollments/:userId", findEnrollmentsForUser);
}

import EnrollmentsDao from "../Enrollments/dao.js";
import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();
  const findAllUsers = async (req, res) => {
    const users = await dao.findAllUsers();
    res.json(users);
  };
  
  const enrollmentsDao = EnrollmentsDao();
  app.get("/api/users", findAllUsers);
  const createUser = (req, res) => {
    const user = dao.createUser(req.body);
    res.json(user);
  };
  const deleteUser = (req, res) => { 
    const { userId } = req.params;
    dao.deleteUser(userId);
    res.sendStatus(200);
  };
  

  const findUserById = (req, res) => { 
    const { userId } = req.params;
    const user = dao.findUserById(userId);
    res.json(user);
  };
  
  const updateUser = (req, res) => {
    const userId = req.params.userId;
    const userUpdates = req.body;
    dao.updateUser(userId, userUpdates);
    const currentUser = dao.findUserById(userId);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };


  const signup = async (req, res) => {
    const user = await dao.findUserByUsername(req.body.username);
    if (user) {
      res.status(400).json({ message: "Username already taken" });
      return;
    }
    const currentUser = await dao.createUser(req.body);
    req.session["currentUser"] = currentUser;
    res.json(currentUser);
  };

  const signin = async (req, res) => {
    const { username, password } = req.body;
    const currentUser = await dao.findUserByCredentials(username, password);
    if (currentUser) {
      req.session["currentUser"] = currentUser;
      res.json(currentUser);
    } else {
      res.status(401).json({ message: "Unable to login. Try again later." });
    }
  };

  const signout = (req, res) => {
    req.session.destroy();
    res.sendStatus(200);
  };

const profile = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  
  const findUsersInCourse = (req, res) => {
    const { cid } = req.params;
    const users = enrollmentsDao.findUsersEnrolledInCourse(cid);
    res.json(users);
  };

  const enrollUserInCourse = (req, res) => {
    const { cid } = req.params;
    const { userId } = req.body;
    enrollmentsDao.enrollUserInCourse(userId, cid);
    res.sendStatus(201);
  };

  const unenrollUserFromCourse = (req, res) => {
    const { cid, uid }  = req.params;
    enrollmentsDao.unenrollUserFromCourse( uid, cid);
    res.sendStatus(200);
  };

  const findEnrollmentsForCurrentUser = (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = enrollmentsDao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };


  app.post("/api/users", createUser);
  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.get("/api/users/enrollments", findEnrollmentsForCurrentUser);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  app.get("/api/courses/:cid/people", findUsersInCourse);
  app.post("/api/courses/:cid/people", enrollUserInCourse);
  app.delete("/api/courses/:cid/people/:uid", unenrollUserFromCourse);
}

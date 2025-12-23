import EnrollmentsDao from "../Enrollments/dao.js";
import UsersDao from "./dao.js";

export default function UserRoutes(app) {
  const dao = UsersDao();
  const enrollmentsDao = EnrollmentsDao();

  const findAllUsers = async (req, res) => {
    const { role, name } = req.query;
    if (role) {
      const users = await dao.findUsersByRole(role);
      res.json(users);
      return;
    }
    if (name) {
        const users = await dao.findUsersByPartialName(name);
        res.json(users);
        return;
      }
    const users = await dao.findAllUsers();
    res.json(users);
  };


const createUser = async (req, res) => {
    const user = await dao.createUser(req.body);
    res.json(user);
  };


  const deleteUser = async (req, res) => {
      const status = await dao.deleteUser(req.params.userId);
      res.json(status);
  };

  

  const findUserById = async (req, res) => {
    const user = await dao.findUserById(req.params.userId);
    res.json(user);
  };
  
  const updateUser = async (req, res) => {
    const { userId } = req.params;
    const userUpdates = req.body;
    await dao.updateUser(userId, userUpdates);
    const currentUser = req.session["currentUser"];
    if (currentUser && currentUser._id === userId) {
      const updatedUser = { ...currentUser, ...userUpdates };
      req.session["currentUser"] = updatedUser;
      res.json(updatedUser);
    } else {
      res.json(currentUser);
    }
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

      // res.cookie("test-cookie", "hello", {
      //   sameSite: "none",
      //   secure: true,
      //   httpOnly: true,
      // });

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
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, private');

    console.log("profile - sessionID:", req.sessionID);
    console.log("profile - session data:", req.session);

    const currentUser = req.session["currentUser"];
    if (!currentUser) {

      console.log("profile - no currentUser found");

      res.sendStatus(401);
      return;
    }
    res.json(currentUser);
  };

  
  // const findUsersInCourse = async (req, res) => {
  //   const { cid } = req.params;
  //   const users = await enrollmentsDao.findUsersEnrolledInCourse(cid);
  //   res.json(users);
  // };

  // const enrollUserInCourse = async (req, res) => {
  //   const { cid } = req.params;
  //   const { userId } = req.body;
  //   await enrollmentsDao.enrollUserInCourse(userId, cid);
  //   res.sendStatus(201);
  // };

  // const unenrollUserFromCourse = async (req, res) => {
  //   const { cid, uid }  = req.params;
  //   await enrollmentsDao.unenrollUserFromCourse( uid, cid);
  //   res.sendStatus(200);
  // };

  const findEnrollmentsForCurrentUser = async (req, res) => {
    const currentUser = req.session["currentUser"];
    if (!currentUser) {
      res.sendStatus(401);
      return;
    }
    const enrollments = await enrollmentsDao.findEnrollmentsForUser(currentUser._id);
    res.json(enrollments);
  };


  app.post("/api/users/signup", signup);
  app.post("/api/users/signin", signin);
  app.post("/api/users/signout", signout);
  app.get("/api/users/profile", profile);
  app.post("/api/users", createUser);
  app.get("/api/users", findAllUsers);
  app.get("/api/users/current/enrollments", findEnrollmentsForCurrentUser);
  app.get("/api/users/:userId", findUserById);
  app.put("/api/users/:userId", updateUser);
  app.delete("/api/users/:userId", deleteUser);
  // app.get("/api/courses/:cid/people", findUsersInCourse);
  // app.post("/api/courses/:cid/people", enrollUserInCourse);
  // app.delete("/api/courses/:cid/people/:uid", unenrollUserFromCourse);
}

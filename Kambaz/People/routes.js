import EnrollmentsDao from "../Enrollments/dao.js";

export default function PeopleRoutes(app, db) {
    const dao = EnrollmentsDao(db);

    const findUsersForCourse = async (req, res) => {
        const { cid } = req.params;
        const users = await dao.findUsersForCourse(cid);
        res.json(users);
    };

    app.get("/api/courses/:cid/people", findUsersForCourse);
}

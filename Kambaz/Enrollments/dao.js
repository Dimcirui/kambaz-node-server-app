import model from "./model.js";
import userModel from "../Users/model.js"; 

export default function EnrollmentsDao() {
  const findEnrollmentsForUser = (userId) => model.find({ user: userId });

  const findUsersEnrolledInCourse = async (courseId) => {
    const enrollments = await model.find({ course: courseId });
    const enrollmentUserIds = enrollments.map((enrollment) => enrollment.user);
    const users = await userModel.find({ _id: { $in: enrollmentUserIds } });
    return users;
  };

  const enrollUserInCourse = (userId, courseId) => {
    return model.create({ _id: Date.now().toString(), user: userId, course: courseId });
  };

  const unenrollUserFromCourse = (userId, courseId) => {
    return model.deleteOne({ user: userId, course: courseId });
  };

  return {
    findEnrollmentsForUser,
    findUsersEnrolledInCourse,
    enrollUserInCourse,
    unenrollUserFromCourse,
  };
}
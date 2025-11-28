import model from "./model.js";
import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
    const findAssignmentsForCourse = (courseId) => model.find({ course: courseId });

    const createAssignment = (assignment) => {
        delete assignment._id; 
        return model.create(assignment);
    };

    const deleteAssignment = (assignmentId) => model.deleteOne({ _id: assignmentId });

    const updateAssignment = (assignmentId, assignmentUpdates) => {
        return model.updateOne({ _id: assignmentId }, { $set: assignmentUpdates });
    };

return {
    findAssignmentsForCourse,
    createAssignment,
    deleteAssignment,
    updateAssignment
};
}
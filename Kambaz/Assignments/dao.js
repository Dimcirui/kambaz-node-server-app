import { v4 as uuidv4 } from "uuid";

export default function AssignmentsDao(db) {
function findAssignmentsForCourse(courseId) {
    return db.assignments.filter(
        (assignment) => assignment.course === courseId
    );
}

function createAssignmentForCourse(courseId, assignment) {
    const newAssignment = { ...assignment, _id: uuidv4(), course: courseId };
    db.assignments = [...db.assignments, newAssignment];
    return newAssignment;
}

function deleteAssignment(assignmentId) {
    db.assignments = db.assignments.filter(
        (assignment) => assignment._id !== assignmentId
    );
}

function updateAssignment(assignmentId, assignmentUpdates) {
    const assignment = db.assignments.find(
        (assignment) => assignment._id === assignmentId
    );
    Object.assign(assignment, assignmentUpdates);
    return assignment;
}

return {
    findAssignmentsForCourse,
    createAssignmentForCourse,
    deleteAssignment,
    updateAssignment
};
}
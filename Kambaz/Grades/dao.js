import model from "./model.js";

export function findGradesForStudent(studentId) {
  return model.find({ student: studentId }).populate("assignment");
}

export function findGradesForAssignment(assignmentId) {
  return model.find({ assignment: assignmentId }).populate("student");
}

export function updateGrade(gradeId, gradeUpdates) {
  return model.updateOne({ _id: gradeId }, { $set: gradeUpdates });
}

export function createGrade(grade) {
  return model.create(grade);
}

export function deleteGrade(gradeId) {
  return model.deleteOne({ _id: gradeId });
}

export default {
    findGradesForStudent,
    findGradesForAssignment,
    updateGrade,
    createGrade,
    deleteGrade
};

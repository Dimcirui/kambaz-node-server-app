import model from "./model.js";
import folderModel from "./folderModel.js";

export default function PazzaDao() {

    const createPost = async (post) => {
        delete post._id;
        return model.create(post);
    };
    const findPostsForCourse = async (courseId) => {
        return model.find({ course: courseId });
    }
    const findPostById = async (postId) => {
        return model.findById(postId);
    }
    const updatePost = async (postId, post) => {
        return model.updateOne({ _id: postId }, { $set: post });
    }
    const deletePost = async (postId) => {
        return model.deleteOne({ _id: postId });
    }
    const findFoldersForCourse = async (courseId) => {
        return folderModel.find({ course: courseId });
    }
    const createFolder = async (folder) => {
        delete folder._id;
        return folderModel.create(folder);
    }
    const updateFolder = async (folderId, name) => {
        return folderModel.updateOne({ _id: folderId }, { $set: { name } });
    }
    const deleteFolder = async (folderId) => {
        return folderModel.deleteOne({ _id: folderId });
    }
    return {
        createPost,
        findPostsForCourse,
        findPostById,
        updatePost,
        deletePost,
        findFoldersForCourse,
        createFolder,
        updateFolder,
        deleteFolder
    };
}
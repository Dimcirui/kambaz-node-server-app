import model from "./model.js";

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
    return {
        createPost,
        findPostsForCourse,
        findPostById,
        updatePost,
        deletePost
    };
}
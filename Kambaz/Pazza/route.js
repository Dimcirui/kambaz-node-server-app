import PazzaDao from "./dao.js";

export default function PazzaRoutes(app) {
    const dao = PazzaDao();

    app.get("/api/courses/:cid/pazza", async (req, res) => {
        const { cid } = req.params;
        const posts = await dao.findPostsForCourse(cid);
        res.json(posts);
    });

    app.post("/api/courses/:cid/pazza", async (req, res) => {
        const { cid } = req.params;
        const newPost = { ...req.body, course: cid };
        const post = await dao.createPost(newPost);
        res.json(post);
    });

    app.put("/api/pazza/:pid", async (req, res) => {
        const { pid } = req.params;
        const status = await dao.updatePost(pid, req.body);
        res.json(status);
    });

    app.delete("/api/pazza/:pid", async (req, res) => {
        const { pid } = req.params;
        const status = await dao.deletePost(pid);
        res.json(status);
    });
}
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
        const currentUser = req.session["currentUser"];
        const newPost = { 
            ...req.body, 
            course: cid,
            author: currentUser ? currentUser.username : "Anonymous" 
        };
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

    app.get("/api/courses/:cid/pazza/folders", async (req, res) => {
        const { cid } = req.params;
        const folders = await dao.findFoldersForCourse(cid);
        res.json(folders);
    });

    app.post("/api/courses/:cid/pazza/folders", async (req, res) => {
        const { cid } = req.params;
        const { name } = req.body;
        const folder = await dao.createFolder({ course: cid, name });
        res.json(folder);
    });

    app.put("/api/pazza/folders/:fid", async (req, res) => {
        const { fid } = req.params;
        const { name } = req.body;
        const status = await dao.updateFolder(fid, name);
        res.json(status);
    });

    app.delete("/api/pazza/folders/:fid", async (req, res) => {
        const { fid } = req.params;
        const status = await dao.deleteFolder(fid);
        res.json(status);
    });
}
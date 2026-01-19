import { Router } from "express";
import { createPost } from "../controllers/post.controller.js";
import { getPosts } from "../controllers/post.controller.js";
import { updatePost } from "../controllers/post.controller.js";
import { deletePost } from "../controllers/post.controller.js";


const router = Router ();

router.route('/create').post(createPost);
router.route('/getPosts').get(getPosts);
router.route('/update/:id').patch(updatePost);
router.route('/delete/:id').delete(deletePost);
export default router;
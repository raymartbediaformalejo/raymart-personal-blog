const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", postsController.getAllPosts);
router.get("/post", postsController.getPost);
router.get("/search", postsController.searchPosts);

router
  .route("/")
  // .get(verifyJWT, postsController.getAllPosts)
  .post(verifyJWT, postsController.createNewPost)
  .patch(verifyJWT, postsController.updatePost)
  .delete(verifyJWT, postsController.deletePost);

module.exports = router;

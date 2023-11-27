const express = require("express");
const router = express.Router();
const postsController = require("../controllers/postsController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", postsController.getAllPosts);

router
  .route("/")
  .post(verifyJWT, postsController.createNewPost)
  .patch(verifyJWT, postsController.updatePost)
  .delete(verifyJWT, postsController.deletePost);

module.exports = router;

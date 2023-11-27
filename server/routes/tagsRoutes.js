const express = require("express");
const router = express.Router();
const tagsController = require("../controllers/tagsController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", tagsController.getAllTag);

router
  .route("/")
  .post(verifyJWT, tagsController.createNewTag)
  .patch(verifyJWT, tagsController.updateTag)
  .delete(verifyJWT, tagsController.deleteTag);

module.exports = router;

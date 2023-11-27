const express = require("express");
const router = express.Router();
const categoryController = require("../controllers/categoryController");
const verifyJWT = require("../middleware/verifyJWT");

router.get("/", categoryController.getAllCategory);

router
  .route("/")
  .post(verifyJWT, categoryController.createNewCategory)
  .patch(verifyJWT, categoryController.updateCategory)
  .delete(verifyJWT, categoryController.deleteCategory);

module.exports = router;

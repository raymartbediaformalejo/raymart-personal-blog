const Category = require("../models/Category");
const Post = require("../models/Post");

// @desc Get all category
// @route GET /categories
// @access Public
const getAllCategory = async (req, res) => {
  // Get all cateogy from MongoDB
  const categories = await Category.find().lean();
  // If no category
  if (!categories.length) {
    return res.status(400).json({ message: "No category found" });
  }

  res.json(categories);
};

// @desc Create new category
// @route POST /categories
// @access Private
const createNewCategory = async (req, res) => {
  const { name, description, image } = req.body;

  // Confirm data
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  // Check for duplicate category name
  const duplicate = await Category.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate category" });
  }

  // Create category
  const category = await Category.create({
    name,
    description,
    image,
  });

  if (category) {
    // Created
    return res.status(200).json({ message: "New category created" });
  } else {
    return res.status(400).json({ message: "Invalid category data" });
  }
};

// @desc Update a category
// @route PATCH /categories
// @access Private
const updateCategory = async (req, res) => {
  const { _id, name, description, image } = req.body;

  // Confirm data
  if (!name) {
    return res.status(400).json({ message: "Category name is required" });
  }

  // Confirm category exists to update
  const category = await Category.findById(_id).exec();
  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  // Check for duplicate category name
  const duplicate = await Category.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate._id.toString() !== _id) {
    return res.status(409).json({ message: "Duplicate category" });
  }

  category.name = name;
  category.description = description;
  category.image = image;

  const updatedCategory = await category.save();
  res.json(`'${updatedCategory.name}' updated`);
};

// @desc Delete a categorySchema
// @route DELETE /categories
// @access Private
const deleteCategory = async (req, res) => {
  const { _id } = req.body;

  // Confirm data
  if (!_id) {
    return res.status(400).json({ message: "Category ID required" });
  }

  // Confirm category exist to delete
  const category = await Category.findById(_id);

  // Check if the category has assigned posts
  const post = await Post.findOne({ category: { $in: [_id] } })
    .lean()
    .exec();

  if (!category) {
    return res.status(400).json({ message: "Category not found" });
  }

  if (post) {
    return res.status(400).json({ message: "Category has assigned posts" });
  }

  await category.deleteOne();

  const reply = `Category '${category.name}' with ID ${category._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllCategory,
  createNewCategory,
  updateCategory,
  deleteCategory,
};

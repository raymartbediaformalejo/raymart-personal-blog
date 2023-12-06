const Tag = require("../models/Tag");
const Post = require("../models/Post");

// @desc Get all tag
// @route GET /tags
// @access Public
const getAllTag = async (req, res) => {
  // Get all tag from MongoDB
  const tags = await Tag.find().lean();
  console.log("tags: ", tags);
  // If no tag
  if (!tags.length) {
    return res.status(400).json({ message: "No tags found" });
  }

  for (const tag of tags) {
    const tagCount = await Post.countDocuments({ tag: tag._id });
    tag.tagCount = tagCount;
  }

  res.json(tags);
};

// @desc Create new category
// @route POST /categories
// @access Private
const createNewTag = async (req, res) => {
  const { name, description, image } = req.body;

  // Confirm data
  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  // Check for duplicate tag name
  const duplicate = await Tag.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate tag" });
  }

  // Create tag
  const tag = await Tag.create({
    name,
    description,
    image,
  });

  if (tag) {
    // Created
    return res.status(200).json({ message: "New tag created" });
  } else {
    return res.status(400).json({ message: "Invalid tag data" });
  }
};

// @desc Update a tag
// @route PATCH /tags
// @access Private
const updateTag = async (req, res) => {
  const { _id, name, description, image } = req.body;
  console.log(req.body);

  // Confirm data
  if (!name) {
    return res.status(400).json({ message: "Tag name is required" });
  }

  // Confirm category exists to update
  const tag = await Tag.findById(_id).exec();
  console.log(tag);
  if (!tag) {
    return res.status(400).json({ message: "Tag not found" });
  }

  // Check for duplicate tag name
  const duplicate = await Tag.findOne({ name })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate && duplicate._id.toString() !== _id) {
    return res.status(409).json({ message: "Duplicate tag" });
  }

  tag.name = name;
  tag.description = description;
  tag.image = image;

  const updatedTag = await tag.save();
  res.json(`'${updatedTag.name}' updated`);
};

// @desc Delete a tagSchema
// @route DELETE /tags
// @access Private
const deleteTag = async (req, res) => {
  const { _id } = req.body;

  // Confirm data
  if (!_id) {
    return res.status(400).json({ message: "Tag ID required" });
  }

  // Confirm tag exist to delete
  const tag = await Tag.findById(_id);

  // Check if the tag has assigned posts
  const post = await Post.findOne({ tag: { $in: [_id] } })
    .lean()
    .exec();

  if (!tag) {
    return res.status(400).json({ message: "Tag not found" });
  }

  if (post) {
    return res.status(400).json({ message: "Tag has assigned posts" });
  }

  await tag.deleteOne();

  const reply = `Tag '${tag.name}' with ID ${tag._id} deleted`;

  res.json(reply);
};

module.exports = {
  getAllTag,
  createNewTag,
  updateTag,
  deleteTag,
};

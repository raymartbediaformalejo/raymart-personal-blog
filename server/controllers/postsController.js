const Post = require("../models/Post");

// @desc Get all posts
// @route GET /posts
// @access Public
const getAllPosts = async (req, res) => {
  // Get all posts from MongoDB
  const posts = await Post.find().lean();

  // If no posts
  if (!posts?.length) {
    return res.status(400).json({ message: "No posts found" });
  }

  res.json(posts);
};

// @desc Create new post
// @route POST /posts
// @access Private
const createNewPost = async (req, res) => {
  const {
    author,
    category,
    tag,
    title,
    summary,
    image,
    content,
    status,
    visibility,
    featured,
    articles,
  } = req.body;

  // Confirm data
  if (!title) {
    return res.status(400).json({ message: "Post title is required" });
  }

  // Check for duplicate title
  const duplicate = await Post.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  if (duplicate) {
    return res.status(409).json({ message: "Duplicate post title" });
  }

  // Create post
  const post = await Post.create({
    author,
    category,
    tag,
    title,
    summary,
    image,
    content,
    status,
    visibility,
    featured,
    articles,
  });

  if (post) {
    // Created
    return res.status(201).json({ message: "New post created" });
  } else {
    return res.status(400).json({ message: "Invalid post data received" });
  }
};

// @desc Update a post
// @route PATCH /posts
// @access Private
const updatePost = async (req, res) => {
  const {
    _id,
    category,
    tag,
    title,
    summary,
    image,
    content,
    status,
    visibility,
    featured,
    articles,
  } = req.body;

  // Confirm data
  if (!_id || !title) {
    return res.status(400).json({ message: "Post title is required" });
  }

  // Confirm post exists to update
  const post = await Post.findById(_id).exec();

  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }

  // Check for duplicate title
  const duplicate = await Post.findOne({ title })
    .collation({ locale: "en", strength: 2 })
    .lean()
    .exec();

  // Allow renaming of the original post
  if (duplicate && duplicate?._id.toString() !== _id) {
    return res.status(409).json({ message: "Duplicate post title" });
  }

  post.category = category;
  post.tag = tag;
  post.title = title;
  post.summary = summary;
  post.image = image;
  post.content = content;
  post.status = status;
  post.visibility = visibility;
  post.featured = featured;
  post.articles = articles;

  const updatedPost = await post.save();

  res.json(`'${updatedPost.title}' updated`);
};

// @desc Delete a post
// @route DELETE /posts
// @access Private
const deletePost = async (req, res) => {
  const { _id } = req.body;

  // Confirm data
  if (!_id) {
    return res.status(400).json({ message: "Post ID required" });
  }

  // Confirm post exists to delete
  const post = await Post.findById(_id).exec();

  if (!post) {
    return res.status(400).json({ message: "Post not found" });
  }

  await post.deleteOne();

  const reply = `Post '${post.title}' with ID ${post._id} deleted`;
  Post;
  res.json(reply);
};

module.exports = {
  getAllPosts,
  createNewPost,
  updatePost,
  deletePost,
};

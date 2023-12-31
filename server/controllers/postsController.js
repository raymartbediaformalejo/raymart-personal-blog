const Post = require("../models/Post");
const Tag = require("../models/Tag");

// @desc Get all posts
// @route GET /posts
// @access Public
const getAllPosts = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const featured = req.query.featured || false;
  // Get all posts from MongoDB
  let posts;
  let total;

  if (JSON.parse(featured)) {
    posts = await Post.find({ featured: true }).lean();
    total = await Post.countDocuments({ featured: true });
  } else {
    posts = await Post.find().lean();
    total = await Post.countDocuments();
  }

  // If no posts
  if (!posts?.length) {
    return res.status(400).json({ message: "No posts found" });
  }

  const response = {
    total,
    page: page + 1,
    limit,
    posts,
  };

  res.status(200).json(response);
};

// @desc Get post
// @route GET /post
// @access Public
const getPost = async (req, res) => {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: "Post ID required" });
  }

  const post = await Post.findOneAndUpdate(
    { _id: id },
    { $inc: { viewCount: 1 } },
    { new: true }
  );

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  res.status(200).json(post);
};

// @desc Search  post
// @route POST /posts
// @access Public
const searchPosts = async (req, res) => {
  const page = parseInt(req.query.page) - 1 || 0;
  const limit = parseInt(req.query.limit) || 5;
  const search = req.query.q || "";
  let sort = req.query.sort || "createdAt";
  let tag = req.query.tag || "All";

  const tagOptions = (await Tag.find().lean()).map((tag) => tag._id);

  tag === "All" ? (tag = [...tagOptions]) : (tag = req.query.tag.split(","));

  req.query.sort ? (sort = req.query.sort.split(",")) : (sort = [sort]);

  let sortBy = {};

  if (sort[1]) {
    sortBy[sort[0]] = sort[1];
  } else {
    sortBy[sort[0]] = "asc";
  }

  const posts = await Post.find({ title: { $regex: search, $options: "i" } })
    .where("tag")
    .in([...tag])
    .sort(sortBy)
    .skip(page * limit)
    .limit(limit)
    .select("_id");

  const total = await Post.countDocuments({
    tag: { $in: [...tag] },
    title: { $regex: search, $options: "i" },
  });

  const response = {
    total,
    page: page + 1,
    limit,
    posts,
  };

  res.status(200).json(response);
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

  const updatedPost = await post.save();

  res.json(`'${updatedPost.title}' updated`);
};

// @desc Delete a post
// @route DELETE /posts
// @access Private
const deletePost = async (req, res) => {
  const { ids } = req.body;

  // Confirm data
  if (!ids || !Array.isArray(ids) || ids.length === 0) {
    return res.status(400).json({ message: "Post IDs required" });
  }

  const deletedPosts = await Post.deleteMany({ _id: { $in: ids } });

  if (!deletedPosts || deletedPosts.deletedCount === 0) {
    return res.status(400).json({ message: "No posts found to delete" });
  }

  res.json(`Deleted ${deletedPosts.deletedCount} post(s)`);
};

module.exports = {
  getAllPosts,
  getPost,
  searchPosts,
  createNewPost,
  updatePost,
  deletePost,
};

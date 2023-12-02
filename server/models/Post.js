const mongoose = require("mongoose");
const AutoIncrement = require("mongoose-sequence")(mongoose);

const postSchema = new mongoose.Schema(
  {
    author: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    category: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
    tag: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Tag",
      },
    ],
    title: {
      type: String,
      required: true,
    },
    image: {
      type: String,
    },
    summary: {
      type: String,
    },
    content: {
      type: String,
    },
    status: {
      type: String,
      default: "Draft",
    },
    visibility: {
      type: String,
      default: "Private",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    articles: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Post",
      },
    ],
  },
  {
    timestamps: true,
  }
);

postSchema.index({ title: "text" });

module.exports = mongoose.model("Post", postSchema);

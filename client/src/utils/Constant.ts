export const MAIN_NAVIGATION_ITEMS = {
  HOME: { url: "/", name: "Home" },
  ARTICLES: { url: "/articles", name: "Articles" },
  PROJECTS: { url: "/projects", name: "Projects" },
  ABOUT: { url: "/about", name: "About" },
  RESOURCES: { url: "/resources", name: "Resources" },
};

export const DASHBOARD_MAIN_NAVIGATION_ITEMS = {
  HOME: { url: "/dashboard", name: "Home" },
  ARTICLES: { url: "/dashboard/articles", name: "Articles" },
};

export const SECONDARY_NAVIGATIONS_ITEMS = {
  TODAY_I_LEARNED: { url: "/today-i-learned", name: "Today I Learned(TIL)" },
  TOPICS: { url: "/topics", name: "Topics" },
  POPULAR_POSTS: { url: "/popular-posts", name: "Popular posts" },
};

export const POST_QUERY_KEYS = {
  QUERY: "q",
  TAG: "tag",
  SORT: "sort",
  PAGE: "page",
  LIMIT: "limit",
};

export const POSTS_LIMIT = 5;

export const DASHBOARD = "dashboard";

export const QUILL_EDITOR_FORMATS = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "align",
  "strike",
  "script",
  "blockquote",
  "background",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "color",
  "code-block",
];

export const QUILL_EDITOR_MODULES = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [{ color: [] }, { background: [] }],
    [{ list: "ordered" }, { list: "bullet" }],
    [{ indent: "-1" }, { indent: "+1" }],
    ["link", "image", "video"],
    [{ align: [] }],
    ["code-block"],
    ["clean"],
  ],
  clipboard: {
    matchVisual: false,
  },
};

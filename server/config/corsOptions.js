const allowedOrigins = require("./allowedOrigins");

const corsOptions = {
  origin: "https://raymart-personal-blog.vercel.app",
  credentials: true,
  optionsSuccessStatus: 200,
};

module.exports = corsOptions;

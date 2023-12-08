import React from "react";
import useAuth from "../../hooks/useAuth";

const NewArticle = () => {
  const { username, isAdmin, status, roles } = useAuth();
  console.log("username: ", username);
  console.log("isAdmin: ", isAdmin);
  console.log("status: ", status);
  console.log("roles: ", roles);

  return <div>NewArticle</div>;
};

export default NewArticle;

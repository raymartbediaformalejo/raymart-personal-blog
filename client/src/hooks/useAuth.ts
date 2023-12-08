import { useAppSelector } from "./../redux/hooks/useAppSelector";
import { jwtDecode } from "jwt-decode";

const useAuth = () => {
  const token = useAppSelector((state) => state.auth.token);
  let isAdmin = false;
  let status = "";

  console.log("token: ", token);

  if (token) {
    const decoded = jwtDecode(token);
    // @ts-expect-error: Unreachable code error
    const { username, roles } = decoded.UserInfo;

    isAdmin = roles.includes("Admin");

    if (isAdmin) status = "Admin";

    return { username, roles, status, isAdmin };
  }

  return { username: "", roles: [], isAdmin, status };
};
export default useAuth;

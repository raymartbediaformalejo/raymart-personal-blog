import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Prefetch from "./components/Prefetch";
import Articles from "./pages/articles/Articles";
import TodayILearned from "./pages/til/TodayILearned";
import About from "./pages/about/About";
import Login from "./pages/sign/Login";
import PersistLogin from "./pages/sign/PersistLogin";
import NewArticle from "./pages/articles/NewArticle";
import { useAppSelector } from "./redux/hooks/useAppSelector";
import { selectCurrentToken } from "./redux/auth/auth.slice";

function App() {
  const token = useAppSelector(selectCurrentToken);
  console.log("token: ", token);

  // const decoded = jwtDecode(token!);
  // console.log(decoded);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="today-i-learned" element={<TodayILearned />} />
          <Route path="about" element={<About />} />

          <Route element={<PersistLogin />}>
            <Route path="/articles/new" element={<NewArticle />} />
          </Route>
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

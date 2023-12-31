import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import Home from "./pages/home/Home";
import Prefetch from "./components/Prefetch";
import Articles from "./pages/articles/Articles";
import TodayILearned from "./pages/til/TodayILearned";
import About from "./pages/about/About";
import Login from "./pages/sign/Login";
import PersistLogin from "./pages/sign/PersistLogin";
import NewPost from "./pages/dashboard/posts/NewPost";
import EditPost from "./pages/dashboard/posts/EditPost";
import Dashboard from "./pages/dashboard";
import DashboardLayout from "./components/Layout/DashboardLayout";
import DashArticles from "./pages/dashboard/posts/index";
import SingleArticle from "./pages/articles/SingleArticle";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="login" element={<Login />} />
        <Route element={<Prefetch />}>
          <Route index element={<Home />} />
          <Route path="articles">
            <Route index element={<Articles />} />
            <Route path=":id" element={<SingleArticle />} />
          </Route>

          <Route path="today-i-learned" element={<TodayILearned />} />
          <Route path="about" element={<About />} />

          <Route element={<PersistLogin />}>
            <Route path="dashboard" element={<DashboardLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="articles">
                <Route index element={<DashArticles />} />
                <Route path="new" element={<NewPost />} />
                <Route path=":id" element={<EditPost />} />
              </Route>
            </Route>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;

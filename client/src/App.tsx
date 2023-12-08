import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/home/Home";
import Prefetch from "./components/Prefetch";
import Articles from "./pages/articles/Articles";
import TodayILearned from "./pages/til/TodayILearned";
import About from "./pages/about/About";
import Login from "./pages/sign/Login";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route element={<Prefetch />}>
          <Route index element={<Home />} />
          <Route path="articles" element={<Articles />} />
          <Route path="today-i-learned" element={<TodayILearned />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Route>
    </Routes>
  );
}

export default App;

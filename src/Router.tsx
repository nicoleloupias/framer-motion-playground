import { Route, Routes } from "react-router-dom";
import { ListPage } from "./Pages/List1/ListPage";
import { VideoDetail } from "./Pages/Video/VideoDetail";
import { VideoHome } from "./Pages/Video/VideoHome";

const Router = () => {
  return (
    <main>
      <Routes>
        <Route path={"/"} element={<VideoHome />} />
        <Route path={"/list"} element={<ListPage />} />
        <Route path={"/page"} element={<VideoDetail />} />
      </Routes>
    </main>
  );
};

export default Router;

import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./App.css";

import PostsPage from "./pages/PostList.page";
import SinglePostPage from "./pages/SinglePost.page";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/posts" replace />} />
        <Route path="/posts" element={<PostsPage />} />
        <Route path="/posts/:id" element={<SinglePostPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

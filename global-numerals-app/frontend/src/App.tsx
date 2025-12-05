import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./routes/Home";
import Library from "./routes/Library";
import SystemDetail from "./routes/SystemDetail";
import Converter from "./routes/Converter";
import Practice from "./routes/Practice";
import PracticePuzzle from "./routes/PracticePuzzle";

const App: React.FC = () => {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/library" element={<Library />} />
        <Route path="/library/:id" element={<SystemDetail />} />
        <Route path="/converter" element={<Converter />} />
        <Route path="/practice" element={<Practice />} />
        <Route path="/practice/:id" element={<PracticePuzzle />} />
      </Routes>
    </Layout>
  );
};

export default App;

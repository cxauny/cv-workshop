import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainHeader from "./components/main-header/main-header";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import Experiences from "./pages/Experiences";

export default function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <MainHeader />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/experiences" element={<Experiences />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

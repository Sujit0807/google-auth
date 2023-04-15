import { Routes, Route } from "react-router-dom";
import Join from "./pages/Join";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import { AuthContextProvider } from "./store/AuthContext";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Join />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </AuthContextProvider>
    </div>
  );
}

export default App;

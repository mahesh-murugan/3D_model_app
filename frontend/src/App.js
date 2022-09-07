import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import ProtectedRoute from "./routes/ProtectedRoutes";
import Dashboard from "./Views/Dashboard";
import Login from "./Views/Login";


function App() {
  return (
    <BrowserRouter>
    <Routes>

      {/* public pages */}
      <Route path="/login" element={<Login />} />

      {/* protected pages */}
      <Route element={<ProtectedRoute />} >
         <Route path="/" element={<Dashboard />} />
      </Route>
    </Routes>
  </BrowserRouter>
  );
}

export default App;

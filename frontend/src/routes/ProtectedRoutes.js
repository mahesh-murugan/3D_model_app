import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = (props) => {
  const auth = useSelector((state) => state.auth);

  if (auth.access !== "") {
    if (props.path === "/login") {
      return <Navigate to={"/"} />;
    }
    return <Outlet {...props} />;
  } else if (!auth.access) {
    return <Navigate to={"/login"} replace={true} />;
  } else {
    return <div>Not found</div>;
  }
};

export default ProtectedRoute;
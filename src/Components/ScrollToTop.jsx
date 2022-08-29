import { useEffect } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";



const ScrollToTop = (props) => {
  const { routeAccess } = useSelector((state) => state.auth);
  const location = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);
  return <>{props.children}</>;
//   if (routeAccess) {
//   } else {
//     return <Navigate to="/" />;
//   }
};

export default ScrollToTop;

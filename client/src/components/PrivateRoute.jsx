import { useSelector } from "react-redux"
import { Navigate, Outlet, useLocation } from "react-router-dom"


export default function PrivateRoute() {
    const {currentUser} = useSelector((state)=>state.user);
    console.log(currentUser);
    const location = useLocation();
    console.log(location.pathname);
  return currentUser ? <Outlet /> : <Navigate to="/sign-in" replace state={{from: location?.pathname}} />
 }

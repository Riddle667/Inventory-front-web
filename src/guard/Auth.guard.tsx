import { PublicRoutes } from "@/models";
import { AppStore } from "@/redux/store"
import { useSelector } from "react-redux"
import { Navigate, Outlet } from "react-router-dom";

export default function AuthGuard() {
    const userState = useSelector((store:AppStore)=> store.user );

  return userState.name ? (<Outlet/>) : (<Navigate replace to={PublicRoutes.LOGIN} />)
}

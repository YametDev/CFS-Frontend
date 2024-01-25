import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Outlet, useParams } from "react-router-dom";
import { exists } from "./redux/actions";

const Layout = () => {
  const params = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    const id = params.id;
    exists(id, data => {
      dispatch({type: "CompanyData", payload: data});
    }, state => dispatch({type: "CompanyExist", payload: state + 1}));
  }, [params.id])

  return (
    <>
      <Outlet />
    </>
  )
};

export default Layout;
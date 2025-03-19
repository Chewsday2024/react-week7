import { Link, Outlet, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import axios from "axios";



import { asyncUserLogout, getIsLoginStatus, getLoginStatus } from "../pages/login/loginSlice";
import Loading from "../components/Loading";
import Toast from "../components/toast/Toast";



function Navbar () {

  const dispatch = useDispatch();

  const switchPageTo = useNavigate();

  const isLogin = useSelector(getIsLoginStatus);

  const loginStatus = useSelector(getLoginStatus);

  

  useEffect(() => {
    if (isLogin) {
      const token = document.cookie.replace(/(?:(?:^|.*;\s*)dogfood\s*\=\s*([^;]*).*$)|^.*$/,"$1",);
    
      axios.defaults.headers.common['Authorization'] = token;
    }
  }, [isLogin]);




  useEffect(() => {
    (loginStatus === 'logout succeed' || !isLogin) && switchPageTo('/');
    
  },[loginStatus, switchPageTo, isLogin]);


  // useEffect(() => {
  //   dispatch(asyncCheckIsUserLogin());

  //   !isLogin && switchPageTo('/');
  // }, [dispatch, isLogin, switchPageTo]);
  


  return (
    <>
      <nav className="bg-dark sticky-top">
        <div className="container-fluid">
          <ul className="d-flex justify-content-between w-50 m-auto">
          <li>
              <Link
                type="button"
                className="btn btn-primary">
                  首頁
              </Link>
            </li>

            <li>
              <Link 
                type="button"
                className="btn btn-primary"
                to='productList'
                >
                  產品列表
              </Link>
            </li>

            <li>
              <Link
                type="button"
                className="btn btn-primary"
                to='cartlist'>購物車</Link>
            </li>

            <li>
              <Link
                type="button"
                className="btn btn-primary"
                to='backstage'>產品後台</Link>
            </li>

            <li>
              <button 
                type="button" 
                className="btn btn-primary"
                onClick={() => dispatch(asyncUserLogout())}
                >
                  登出
              </button>
            </li>
          </ul>
        </div>
      </nav>


      <Outlet />

      <Toast />

      <Loading />
    </>
  );
};

export default Navbar;
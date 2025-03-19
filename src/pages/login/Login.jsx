import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";



import { asyncUserLogin, getIsLoginStatus, getLoginStatus } from "./loginSlice";
import Loading from "../../components/Loading";




function Login () {

  const dispatch = useDispatch();

  const switchPageTo = useNavigate();

  const isLogin = useSelector(getIsLoginStatus);

  const loginStatus = useSelector(getLoginStatus);


  useEffect(() => {
    isLogin && switchPageTo('/React-Week7');
  }, [isLogin, switchPageTo])



  const [accountData, setAccountData] = useState({
    username: '',
    password: ''
  });


  function trackInputValue (e) {
    const { name, value } = e.target;

    setAccountData({
      ...accountData,
      [name]: value
    })
  }

  

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center vh-100">
      <div className="row justify-content-center">
        <h1 className="h3 mb-3 text-center font-weight-normal">請先登入</h1>
        <div className="col-8">
          <form id="form" onSubmit={(e) => {
            e.preventDefault();
            dispatch(asyncUserLogin(accountData));
            }}>  
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                placeholder="name@example.com"
                name="username"
                onChange={trackInputValue}
                autoComplete="username"
                required
                autoFocus
                />
              <label htmlFor="username">Email address</label>
            </div>

            <div className="form-floating">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                onChange={trackInputValue}
                autoComplete="current-password"
                required
                />
              <label htmlFor="password">Password</label>
            </div>

            <button className="btn btn-lg btn-primary w-100 mt-3">登入</button>
          </form>
        </div>
      </div>

      <p className="mt-5 mb-3 text-muted">&copy; 2024~∞ - 六角學院</p>



      {loginStatus === 'loading' && <Loading />}
    </div>
  );
};

export default Login;
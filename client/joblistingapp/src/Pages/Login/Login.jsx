import React, { useEffect, useState } from "react";
import style from "./Login.module.css";
import backgroundimage from "../../assets/loginbackground.jpg";
import axios from "axios";
function Login() {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const [loginitem, setloginitem] = useState({ token: "", name: "" });
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/login", user)
      .then((res) => {
        console.log(res.data);
        if (res.data.token) {
          console.log("logedin successfully");
        }
        localStorage.setItem('name',res.data.name)
        localStorage.setItem('token',res.data.token)

      })
      .catch((err) => {
        console.error(err);
      });
  };


  return (
    <>
      <div className={style.main}>
        <div className={style.left}>
          <div className={style.lefthead}>
            <h1>Already have account ?</h1>
            <h3>Your personal job finder is here</h3>
          </div>
          <form className={style.form} onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={user.email}
              onInput={(e) =>
                setuser({
                  ...user,
                  email: e.target.value,
                })
              }
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={user.password}
              onInput={(e) =>
                setuser({
                  ...user,
                  password: e.target.value,
                })
              }
            ></input>
            <button type="submit">Sign in</button>
          </form>
          <div className={style.bottom}>
            <p>Don't have account?</p>
            <a href="/register">Sign Up</a>
          </div>
        </div>

        <div className={style.right}>
          <h1 className={style.righthead}>Your Personal Job Finder</h1>
          <img src={backgroundimage} alt="leftimg" />
        </div>
      </div>
    </>
  );
}

export default Login;

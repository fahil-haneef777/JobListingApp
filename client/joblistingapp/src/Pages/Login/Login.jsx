import React from "react";
import style from "./Login.module.css";
import backgroundimage from "../../assets/loginbackground.jpg";
function Login() {
  return (
    <>
      <div className={style.main}>
        <div className={style.left}>
          <div className={style.lefthead}>
            <h1>Already have account ?</h1>
            <h3>Your personal job finder is here</h3>
          </div>
          <form className={style.form}>
            <input type="email" placeholder="Email" name="Email"></input>
            <input
              type="password"
              placeholder="Password"
              name="Password"
            ></input>
            <button type="submit">Sign in</button>
          </form>
          <div className={style.bottom}>
            <p>Don't have account?</p>
            <a href="">Sign Up</a>
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

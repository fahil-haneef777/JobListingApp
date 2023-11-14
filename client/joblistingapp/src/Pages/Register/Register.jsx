import React, { useEffect } from "react";
import style from "./Register.module.css";
import backgroundimage from "../../assets/loginbackground.jpg";
import { ToastContainer, toast } from "react-toastify";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { register } from "../../apis/auth";

function Register() {
  const navigate = useNavigate();
  const [newUser, setnewUser] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });
  const [error, seterror] = useState("");
  const [item, setitem] = useState({ token: "", name: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:3000/register", newUser)
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("name", res.data.name);
        localStorage.setItem("token", res.data.token);
        seterror("");
        toast.success("User added Successfully", {
          position: "top-center",
          autoClose: 2000,
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      })
      .catch((err) => {
        console.error(err.response);
        if (err.response.status === 400) {
          seterror(err.response.data.error);
        } else if (err.response.status === 409) {
          seterror(err.response.data.message);
        }
      });
  };

  useEffect(() => {
    localStorage.setItem("item", JSON.stringify(item));
  }, [item]);

  return (
    <>
      <div className={style.main}>
        {/* left */}

        <div className={style.left}>
          <div className={style.lefthead}>
            <h1>Create an account</h1>
            <h3>Your personal job finder is here</h3>
          </div>

          <form className={style.form} onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={newUser.name}
              onInput={(e) => {
                setnewUser({
                  ...newUser,
                  name: e.target.value,
                });
              }}
            ></input>
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={newUser.email}
              onInput={(e) =>
                setnewUser({
                  ...newUser,
                  email: e.target.value,
                })
              }
            ></input>
            <input
              type="number"
              placeholder="Mobile"
              name="mobile"
              value={newUser.mobile}
              onInput={(e) =>
                setnewUser({
                  ...newUser,
                  mobile: e.target.value,
                })
              }
            ></input>
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={newUser.password}
              onInput={(e) =>
                setnewUser({
                  ...newUser,
                  password: e.target.value,
                })
              }
            ></input>
            <div className={style.checkbox}>
              <input type="checkbox" id="checkbox"></input>
              <label htmlFor="checkbox">
                By creating an account, I agree to our terms of use and privacy
                policy
              </label>
            </div>
            <button type="submit">Sign Up</button>
            <p className={style.error} style={{ color: "red" }}>
              {error}
            </p>
          </form>

          <div className={style.bottom}>
            <p>Already have an account?</p>
            <a href="/login">Sign in</a>
          </div>
        </div>

        {/* right */}
        <div className={style.right}>
          <h1 className={style.righthead}>Your Personal Job Finder</h1>
          <img src={backgroundimage} alt="leftimg" />
        </div>
      </div>
      <ToastContainer />
    </>
  );
}

export default Register;

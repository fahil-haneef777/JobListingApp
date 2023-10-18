import React, { useEffect, useState } from "react";
import style from "./Jobdescription.module.css";
import topnav from "../../assets/topnav.jpg";
import { useNavigate } from "react-router-dom";
import stipend from "../../assets/stipend.png";
import duration from "../../assets/duration.png";
import axios from "axios";
function Jobdescription() {
  const navigate = useNavigate();
  const [loggedin, setloggedin] = useState(localStorage.getItem("token"));
  const [username, setusername] = useState(localStorage.getItem("name"));
  const [jobinfo, setjobinfo] = useState({});
  const [skill, setskill] = useState(jobinfo.skills);

  //   const newskill=skill.split(',').map((skill)=>skill.trim())

  const handlelogin = () => {
    navigate("/login");
  };
  const handleregister = () => {
    navigate("/register");
  };
  const handlelogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  //   useEffect(() => {
  //     axios
  //       .get("http://localhost:3000/jobpost/652eee6c71875fedca2aa4c9")
  //       .then((res) => {
  //         console.log(res.data.message);
  //         setjobinfo(res.data.message);
  //         console.log(jobinfo.skills);
  //       })
  //       .catch((err) => console.error(err));
  //   }, []);

  useEffect(() => {
    const fetchJobinfo = async () => {
      try {
        const responce = await axios.get(
          "http://localhost:3000/jobpost/653023f59cfd6ecf3f98ed5f"
        );
        setjobinfo(responce.data.message);
        console.log(responce.data.message.skills);
      } catch (error) {
        console.error(error);
      }
    };
    fetchJobinfo();
  }, []);

  useEffect(() => {
    setskill(jobinfo.skills);
  }, [jobinfo]);

  return (
    <>
      <div className={style.main}>
        {/* Nav Bar */}
        <div className={style.topnav}>
          <img src={topnav} alt="topnav" />
          <h2>Jobfinder</h2>
          <div>
            {loggedin ? (
              <div className={style.loggedin}>
                <button onClick={handlelogout}>Logout</button>
                <p>Hello {username} </p>
              </div>
            ) : (
              <div className={style.loggedout}>
                <button className={style.logbutton} onClick={handlelogin}>
                  Login
                </button>
                <button className={style.regbutton} onClick={handleregister}>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
        {/* Job heading */}
        <div className={style.heading}>
          <h2 className={style.innerheading}>
            {jobinfo.position}{" "}
            {jobinfo.remote === "Remote"
              ? "work from home"
              : "work from office"}{" "}
            job/internship at {jobinfo.companyName}
          </h2>
        </div>

        {/* Body */}

        <div className={style.body}>
          <div>
            <h2>{jobinfo.position}</h2>
          </div>

          <div>
            <p
              style={{
                position: "relative",
                bottom: "3px",
                color: "red",
                padding: "1vh",
              }}
            >
              {jobinfo.location}
            </p>
            {loggedin ? <button className={style.edit}>Edit Job</button> : ""}
          </div>

          <div className={style.three}>
            <div className={style.stipend}>
              <img src={stipend} alt="stipend" />
              <p>Stipend</p>
              <span className={style.salary}>Rs {jobinfo.salary}/month</span>
            </div>
            <div className={style.duration}>
              <img src={duration} alt="duration" />
              <p>Duration</p>
              <span className={style.durationtime}>6 months</span>
            </div>
          </div>

          <div className={style.about}>
            <h3>About Company</h3>

            <p>{jobinfo.about}</p>
          </div>

          <div className={style.aboutjob}>
            <h3>About Job/Internship</h3>
            <p>{jobinfo.description}</p>
          </div>

          <div className={style.skills}>
            <h3>Skill&#40;s&#41; required</h3>
            <div className={style.skillsdiv}>
              {jobinfo.skills?.map((skill) => {
                return <p className={style.jobskill}>{skill}</p>;
              })}
            </div>
          </div>

          <div className={style.information}>
            <h3>Additional Information</h3>
            <p>{jobinfo.information}</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default Jobdescription;

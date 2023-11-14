import React, { useEffect, useState, useContext } from "react";
import style from "./JobEdit.module.css";
import Jobimg from "../../assets/jobpage.jpg";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import JobContext from "../../context/jobcontext";

function Jobedit() {
  const { jobid } = useContext(JobContext);
  const navigate = useNavigate();

  const [info, setinfo] = useState({
    companyName: "",
    logoUrl: "",
    position: "",
    salary: "",
    jobType: "",
    remote: "",
    location: "",
    description: "",
    about: "",
    skills: "",
    information: "",
  });

  const handleSubmit = () => {
    axios
      .put(`http://localhost:3000/job-post/${jobid}`, info, {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((res) => {
        console.log(res.data);
        console.log(info);
        toast.success("Job edited successfully!", {
          position: "top-right",
          autoClose: 2000, // Auto-close the message after 2 seconds
        });
        setTimeout(() => {
          navigate(-1);
        }, 2000);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleCancel = () => {
    toast.error("Job Edit Canceled!", {
      position: "top-center",
      autoClose: 1000,
    });
    setTimeout(() => {
      navigate("/login");
    }, 2000);
  };

  return (
    <>
      <div className={style.main}>
        {/* left */}
        <div className={style.left}>
          <h1>Edit job description</h1>
          <div className={style.fieldinput}>
            <div className={style.company}>
              {" "}
              <label htmlFor="companyname">
                Company Name &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="companyname"
                placeholder="Enter your company name here"
                value={info.companyName}
                onInput={(e) => {
                  setinfo({ ...info, companyName: e.target.value });
                }}
              />
            </div>
            <div className={style.url}>
              {" "}
              <label htmlFor="logourl">
                Add logo Url &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="logourl"
                placeholder="Enter the link"
                value={info.logoUrl}
                onInput={(e) => {
                  setinfo({ ...info, logoUrl: e.target.value });
                }}
              />
            </div>
            <div className={style.position}>
              {" "}
              <label htmlFor="jobposition">
                Job Position &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="jobposition"
                placeholder="Enter Job Position"
                value={info.position}
                onInput={(e) => {
                  setinfo({ ...info, position: e.target.value });
                }}
              />
            </div>

            <div className={style.salary}>
              {" "}
              <label htmlFor="salary">
                Monthly salary &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="salary"
                placeholder="Enter amount in rupees"
                value={info.salary}
                onInput={(e) => {
                  setinfo({ ...info, salary: e.target.value });
                }}
              />
            </div>

            <div className={style.jobtype}>
              {" "}
              <label htmlFor="jobtype">
                Job Type &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <select
                id="jobtype"
                name="jobtype"
                value={info.jobType}
                onChange={(e) => {
                  setinfo({ ...info, jobType: e.target.value });
                }}
              >
                <option value="Marketing">Marketing</option>
                <option value="IT">IT</option>
                <option value="Finance">Finance</option>
                <option value="Sales">Sales</option>
                <option value="Customer support">Customer Support</option>
                <option value="Engineering">Engineering</option>
              </select>
            </div>

            <div className={style.remote}>
              {" "}
              <label htmlFor="remote">
                Remote/Office &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <select
                id="remote"
                name="remote"
                value={info.remote}
                onChange={(e) => {
                  setinfo({ ...info, remote: e.target.value });
                }}
              >
                <option value="Office">Office</option>
                <option value="Remote">Remote</option>
              </select>
            </div>

            <div className={style.location}>
              {" "}
              <label htmlFor="location">
                Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="location"
                placeholder="Enter location"
                value={info.location}
                onInput={(e) => {
                  setinfo({ ...info, location: e.target.value });
                }}
              />
            </div>

            <div className={style.description}>
              {" "}
              <label htmlFor="description">
                Job Description &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <textarea
                id="description"
                name="description"
                rows="4"
                cols="50"
                placeholder="type job description"
                value={info.description}
                onInput={(e) => {
                  setinfo({ ...info, description: e.target.value });
                }}
              ></textarea>
            </div>

            <div className={style.about}>
              {" "}
              <label htmlFor="about">
                About Company &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <textarea
                id="about"
                name="aboutCompany"
                rows="4"
                cols="50"
                placeholder="type about your company"
                value={info.about}
                onInput={(e) => {
                  setinfo({ ...info, about: e.target.value });
                }}
              ></textarea>
            </div>

            <div className={style.skill}>
              {" "}
              <label htmlFor="skill">
                Skill Required &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="skill"
                placeholder="Enter the must have skill"
                value={info.skills}
                onInput={(e) => {
                  setinfo({
                    ...info,
                    skills: e.target.value
                      .split(",")
                      .map((skill) => skill.trim()),
                  });
                }}
              />
            </div>

            <div className={style.info}>
              {" "}
              <label htmlFor="information">
                information &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </label>
              <input
                type="text"
                id="information"
                placeholder="Enter additional information"
                value={info.information}
                onInput={(e) => {
                  setinfo({ ...info, information: e.target.value });
                }}
              />
            </div>
          </div>
          <div className={style.button}>
            <button onClick={handleCancel}> Cancel</button>
            <button onClick={handleSubmit}>Edit Job</button>
            <ToastContainer />
          </div>
        </div>

        {/* right */}
        <div className={style.right}>
          <h1>Recruiter add job details here</h1>
          <img src={Jobimg} alt="jobimg" />
        </div>
      </div>
    </>
  );
}

export default Jobedit;

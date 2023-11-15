import React, { useContext } from "react";
import topnav from "../../assets/topnav.jpg";
import style from "./Home.module.css";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "../../assets/search.png";
import close from "../../assets/close.png";
import nopeople from "../../assets/nopeople.png";
import india from "../../assets/india.png";
import JobContext from "../../context/JobContext";
import Jobdescription from "../JobDescriptionPage/Jobdescription";
import BASEURL from "../../Constants/baseUrl";
function Home() {
  const navigate = useNavigate();
  const [loggedin, setloggedin] = useState(localStorage.getItem("token"));
  const [username, setusername] = useState(localStorage.getItem("name"));
  const [skill, setskill] = useState([]);
  const [alljob, setalljob] = useState();
  const [option, setoption] = useState([]);
  const [searchQuery, setsearchQuery] = useState([]);
  const [searchjob, setsearchjob] = useState([]);

  const { jobid, setjobid } = useContext(JobContext);

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

  const handleselect = (e) => {
    const skills = e.target.value;
    if (!skill.includes(skills)) {
      setskill([...skill, skills]);
    }
  };

  const handleclear = () => {
    setskill([]);
  };

  const handledelete = (skills) => {
    const updatedskill = skill.filter((selected) => selected !== skills);
    setskill(updatedskill);
  };

  //handlesearch
  axios.defaults.withCredentials = true;

  const handlesearch = () => {
    axios
      .get(`${BASEURL}/job/search?title=${searchQuery}&skills=${skill}`)
      .then((res) => {
        console.log(res.data);
        setsearchjob(res.data);
        setjobid(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get(
        'https://joblisting-backend-yzeo.onrender.com/Alljob', {
          withCredentials: true,
        }
      )
      .then((res) => {
        setalljob(res.data);
        setsearchjob(res.data.job);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    if (alljob) {
      const extractedskill = Object.values(alljob.job).reduce(
        (acc, current) => {
          if (current.skills) {
            return [...acc, ...current.skills];
          }
          return acc;
        },
        []
      );

      const allskills = extractedskill.reduce((acc, skills) => {
        const skillArr = skills.split(",").map((skill) => skill.trim());
        return acc.concat(skillArr);
      }, []);
      const uniquearray = [...new Set(allskills)];
      setoption(uniquearray);
    }
  }, [alljob]);

  const handlesearchinputkeypress = (e) => {
    if (e.key === "Enter") {
      handlesearch();
    }
  };
  const handlesearchinputhchange = (e) => {
    setsearchQuery(e.target.value);
  };

  if (searchjob) {
    console.log(searchjob);
  }

  const handleEdit = (editbyjobid) => {
    setjobid(editbyjobid);
    navigate("/jobedit");
  };
  const handleJobDescription = (Jobdescriptionbyid) => {
    setjobid(Jobdescriptionbyid);
    navigate("/jobdescription");
  };

  return (
    <div className={style.main}>
      {/* navbar */}
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
      {/*  */}
      <div className={style.jobfilter}>
        <div className={style.searchcontainer}>
          <img src={Search} alt="Search" className={style.searchicon} />
          <input
            type="text"
            placeholder="Type any job title"
            className={style.searchinput}
            value={searchQuery}
            onChange={handlesearchinputhchange}
            onKeyDown={handlesearchinputkeypress}
          />
        </div>

        {/*  */}
        <div className={style.skillfilter}>
          <select
            className={style.skilldropdown}
            defaultValue="placeholder"
            onChange={handleselect}
          >
            <option value="placeholder" disabled hidden>
              Skills
            </option>
            {option?.map((option, key) => (
              <option value={option} key={key}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/*  */}
        <div className={style.skillsbox}>
          {skill?.map((skills) => (
            <div className={style.skillsrow} key={skills}>
              <h3>{skills}</h3>
              <span className={style.closebox}>
                <img
                  src={close}
                  alt="close"
                  className={style.close}
                  onClick={() => handledelete(skills)}
                />
              </span>
            </div>
          ))}
        </div>

        {/*  */}
        <div className={style.buttonfilter}>
          <button className={style.clear} onClick={handleclear}>
            {" "}
            Clear
          </button>
        </div>
        {loggedin ? (
          <button className={style.addjob} onClick={() => navigate("/jobadd")}>
            +Add Job
          </button>
        ) : (
          ""
        )}
      </div>
      {/* to be mapped */}
      {searchjob?.map((job, index) => (
        <div key={index} className={style.joblisting}>
          <div className={style.jobimg}>
            <img src={job.logoUrl} alt="company icon" />
          </div>

          <div className={style.additionalinfo}>
            <h3>{job.position}</h3>
            <span className={style.noofpeople}>
              <img src={nopeople} alt="no of people" />
              <p>11-50</p>
              <p>&#8377; {job.salary}</p>
              <div className={style.place}>
                <img src={india} alt="place" />
                <p>{job.location} </p>
              </div>
            </span>
            <div className={style.additionalbottom}>
              <p>Remote/office</p>
              <p>Full time</p>
            </div>
          </div>

          <div className={style.joblistingright}>
            <div className={style.joblistingskillsrequired}>
              {/* to be mapped */}
              {job.skills?.map((skillstring) =>
                skillstring.split(",").map((skill, index) => (
                  <span key={index} className={style.skillsrequired}>
                    {skill}
                  </span>
                ))
              )}
            </div>
            <div className={style.jobbutton}>
              {loggedin ? (
                <button onClick={() => handleEdit(job._id)}>Edit Job</button>
              ) : (
                ""
              )}

              <button onClick={() => handleJobDescription(job._id)}>
                {" "}
                View details
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Home;

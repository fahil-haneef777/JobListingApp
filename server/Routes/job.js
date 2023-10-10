const express = require("express");
const router = express.Router();
const Jobs = require("../models/jobs");
const verifyjwt = require("../middleware/middleware");

router.post("/job-post", verifyjwt, async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skills,
      recruiterName,
    } = req.body;

    if (
      !companyName ||
      !logoUrl ||
      !position ||
      !salary ||
      !jobType ||
      !remote ||
      !location ||
      !description ||
      !about ||
      !skills ||
      !recruiterName
    ) {
      return res.send({ message: "all fields are required" });
    }

    const jobPost = new Jobs({
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skills,
      recruiterName,
    });
    await jobPost.save();
    res.send({ message: "job details added successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.patch("/job-post/:id", verifyjwt, async (req, res) => {
  try {
    const {
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skills,
      recruiterName,
    } = req.body;

    const { id } = req.params;

    await Jobs.findByIdAndUpdate(id, {
      companyName,
      logoUrl,
      position,
      salary,
      jobType,
      remote,
      location,
      description,
      about,
      skills,
      recruiterName,
    });

    res.status(200).send({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
});

router.get("/Alljob", async (req, res) => {
  const Job = await Jobs.find();
  res.send({ job: Job });
});

router.get("/job/search", async (req, res) => {
  const title = req.query.title;
  const skill = req.query.skill;
  console.log(title,skill)
  // if(skills){
  //   filter.skills={$in:skills.split(',')};
  // }
  // if(jobType){
  //   filter.jobType={$regex:jobType,$options:'i'};
  // }
  // console.log(filter)

  try {
    const job = await Jobs.find(
      {
        position: { $regex: title, $options: "i" },
        skills: { $regex: skill, $options: "i" },
      },
      {
        _id: 0,
        companyName: 1,
        logoUrl: 1,
        position: 1,
        salary: 1,
        jobType: 1,
        remote: 1,
        location: 1,
        about: 1,
        skills:1
      }
    );
    res.send(job);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;

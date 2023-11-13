const express = require("express");
const router = express.Router();
const Jobs = require("../models/jobs");
const verifyjwt = require("../middleware/middleware");

//job adding api
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
      information,
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
      !information
    ) {
      return res.status(400).send({ message: "all fields are required" });
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
      information,
    });
    await jobPost.save();
    res.send({ message: "job details added successfully" });
  } catch (error) {
    console.log(error);
  }
});

//job update api

router.put("/job-post/:id", verifyjwt, async (req, res) => {
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
      information,
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
      information,
    });

    res.status(200).send({ message: "updated successfully" });
  } catch (error) {
    console.log(error);
  }
});
// all job api
router.get("/Alljob", async (req, res) => {
  const Job = await Jobs.find();
  res.send({ job: Job });
});

//job search and filter api

router.get("/job/search", async (req, res) => {
  const title = req.query.title;
  const skills = req.query.skills;
  console.log(title, skills);
  const filter = {};
  if (skills) {
    filter.skills = { $regex: skills, $options: "i" };
    // filter.skills = { $regex: skills, $options: "i" };
    // filter.skills = { $in: skills };
  }
  if (title) {
    filter.position = { $regex: title, $options: "i" };
  }

  try {
    const job = await Jobs.find(filter);
    res.send(job);
  } catch (error) {
    console.log(error);
  }
});

//detail description of jobpost api

router.get("/jobpost/:id", async (req, res) => {
  const id = req.params.id;
  const Job = await Jobs.findById({ _id: id }, { _id: 0 });
  res.send({ message: Job });
});
module.exports = router;

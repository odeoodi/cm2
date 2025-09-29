const Job = require("../models/jobModel");
const mongoose = require("mongoose");
//   title: { type: String, required: true },
//   type: { type: String, required: true },
//   location: { type: String, required: true },
//   description: { type: String, required: true },
//   salary: { type: String, required: true },
//   company: {
//     name: { type: String, required: true },
//     description: { type: String, required: true },
//     contactEmail: { type: String, required: true },
//     contactPhone: { type: String, required: true }
//   }

// GET /jobs
const getAllJobs = async (req, res) => {
  const limit = parseInt(req.query._limit);
  try {
    const jobs = limit
      ? await Job.find({}).sort({ createdAt: -1 }).limit(limit)
      : await Job.find({}).sort({ createdAt: -1 });
    res.status(200).json(jobs);
  } catch (err) {
    //console.err(err);
    res.status(500).json({ message: "Failed to retrieve jobs" });
  }
};

// POST /jobs
const createJob = async (req, res) => {
  try {
    const newJob = await Job.create({ ...req.body });
    res.status(201).json(newJob);
  } catch (err) {
    res.status(500).json({ message: "Failed to add job" });
  }
};

// GET /jobs/:jobId
const getJobById = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  try {
    const job = await Job.findById(jobId);
    if (job) {
      res.status(200).json(job);
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to find job" });
  }
};

// PUT jobs/:jobId

const updateJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }
  try {
    const updatedJob = await Job.findOneAndUpdate(
      { _id: jobId },
      { ...req.body },
      { new: true }
    );
    if (updatedJob) {
      res.status(200).json(updatedJob);
    } else {
      res.status(404).json({ message: "No job found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to find job" });
  }
};

// DELETE jobs/:jobId

const deleteJob = async (req, res) => {
  const { jobId } = req.params;

  if (!mongoose.Types.ObjectId.isValid(jobId)) {
    return res.status(400).json({ message: "Invalid job ID" });
  }

  try {
    const deletedJob = await Job.findOneAndDelete({ _id: jobId });
    if (deletedJob) {
      res.status(204).json({ message: "Job deleted!" });
    } else {
      res.status(404).json({ message: "Job not found" });
    }
  } catch (err) {
    res.status(500).json({ message: "Failed to find job" });
  }
};

module.exports = {
  getAllJobs,
  createJob,
  getJobById,
  updateJob,
  deleteJob,
};

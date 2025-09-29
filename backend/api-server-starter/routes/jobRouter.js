const express = require("express");
const router = express.Router();

const {
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob,
} = require("../controllers/jobControllers");

const requireAuth = require("../middleware/requireAuth");

// Public routes
router.get("/", getAllJobs);
router.get("/:jobId", getJobById);

// Protected routes
router.post("/", requireAuth, createJob);
router.put("/:jobId", requireAuth, updateJob);
router.delete("/:jobId", requireAuth, deleteJob);

module.exports = router;

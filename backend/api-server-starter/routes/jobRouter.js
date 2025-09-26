const express = require('express');
const router = express.Router();

const {
    getAllJobs,
    createJob,
    getJobById,
    updateJob,
    deleteJob
} = require('../controllers/jobControllers');

// GET /jobs
router.get('/', getAllJobs);

// POST /jobs
router.post('/', createJob);

// GET /jobs/:jobId
router.get('/:jobId', getJobById);

// PUT /jobs/:jobId
router.put('/:jobId', updateJob);

// DELETE /jobs/:jobId
router.delete('/:jobId',deleteJob);

module.exports = router;
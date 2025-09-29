const express = require ("express")
const router = express.Router();

const {
    getAllUsers,
  createUser,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  signupUser
} = require('../controllers/userControllers')


//GET /users
router.get('/', getAllUsers)

//POST /users
router.post('/', createUser)

//GET /users/:userId
router.get('/:userId', getUserById)

//PUT /users/:userId
router.put('/:userId', updateUser)

//DELETE /users/:userId
router.delete('/:userId', deleteUser)

//POST /users/login
router.post('/login', loginUser)

//POST /users/signup
router.post('/signup', signupUser)

module.exports = router
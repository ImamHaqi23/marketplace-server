const router = require('../helpers/router');

const {
  register,
  deleteUser,
  getUserById,
  getAllUser,
  login,
} = require('../controllers/authController');
const authentication = require('../middlewares/authentication');

router.post('/register', register);
router.post('/login', login);
router.use(authentication);
router.get('/get-user/:id', getUserById);
router.get('/get-all-user', getAllUser);
router.delete('/delete-user/:id', deleteUser);

module.exports = router;

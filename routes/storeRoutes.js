const router = require('../helpers/router');

const {
  createStore,
  deleteStore,
  getAllStore,
  getStoreById,
  updateStore,
} = require('../controllers/storeController');
const authentication = require('../middlewares/authentication');
const { authorizationSeller } = require('../middlewares/authorization');

router.use(authentication);
router.use(authorizationSeller);

router.post('/create-store', createStore);
router.get('/get-all-store', getAllStore);
router.get('/get-store/:id', getStoreById);
router.put('/update-store/:id', updateStore);
router.delete('/delete-store/:id', deleteStore);

module.exports = router;

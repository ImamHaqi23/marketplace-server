const router = require('../helpers/router');

const {
  getTransaction,
  createTransaction,
} = require('../controllers/transactionController');
const authentication = require('../middlewares/authentication');
const { authorizationBuyer } = require('../middlewares/authorization');

router.use(authentication);
router.use(authorizationBuyer);
router.get('/get-transaction', getTransaction);
router.post('/create-transaction', createTransaction);

module.exports = router;

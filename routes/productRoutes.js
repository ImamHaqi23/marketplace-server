const router = require('../helpers/router');

const {
  createProduct,
  getAllProduct,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const authentication = require('../middlewares/authentication');
const { authorizationSeller } = require('../middlewares/authorization');

router.get('/get-all-product', getAllProduct);
router.get('/get-product/:id', getProductById);

router.use(authentication);
router.use(authorizationSeller);
router.post('/create-product', createProduct);
router.put('/update-product/:id', updateProduct);
router.delete('/delete-product/:id', deleteProduct);

module.exports = router;

require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const port = process.env.PORT || 5000;

const authRouter = require('./routes/authRoutes');
const storeRouter = require('./routes/storeRoutes');
const productRouter = require('./routes/productRoutes');
const transactionRouter = require('./routes/transactionRoutes');

app.use('/auth', authRouter);
app.use('/store', storeRouter);
app.use('/product', productRouter);
app.use('/transaction', transactionRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

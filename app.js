require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.PORT || 8000;
const cookieParser = require('cookie-parser');
const path = require('path');
const connectMongoDB = require('./dbConfig');
const userRouter = require('./routers/user');
const detailsRouter = require('./routers/details');


//database connection
// ...existing code...
//database connection
connectMongoDB(process.env.MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));
// ...existing code...

app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine','ejs');

app.use("/", userRouter);
app.use("/info", detailsRouter);

app.listen(PORT, ()=> console.log(`Server is running on port ${PORT}`));

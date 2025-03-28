const express = require('express');
const router = express.Router();
const {handelCreateUser,
    handelCreatePage,
    handelLogout,
    handelLoginPage,
    handelProfile,
    handelUserLogin,
} = require('../controllers/user');
const {isLoggedIn} = require('../middlewares/authMid');

router.post("/create", handelCreateUser);

router.get("/", handelCreatePage);

router.get("/login", handelLoginPage);

router.get("/logout", handelLogout);

router.get("/profile", isLoggedIn, handelProfile);

router.post("/login", handelUserLogin);

module.exports = router;
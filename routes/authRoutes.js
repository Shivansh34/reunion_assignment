const express = require('express');
const router = express.Router();
const {authenticate}=require('../controller/Auth'); 

router.post("/authenticate",authenticate);

module.exports = router;
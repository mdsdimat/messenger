// server.js
// import express from 'express';
const express = require('express');
// const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.static('./'));

// app.get('/',function(req,res) {
//     res.sendFile(path.join(__dirname+'/static/index.html'));
// });

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
// server.js
import express from 'express';
// const path = require('path');

const app = express();
const PORT = 4000;

app.use(express.static('./'));

// app.get('/',function(req,res) {
//     res.sendFile(path.join(__dirname+'/static/index.html'));
// });

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
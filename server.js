// eslint-disable-next-line @typescript-eslint/no-var-requires,no-undef
const express = require('express');

const app = express();
// eslint-disable-next-line no-undef
const PORT = process.env.PORT || 4000;

app.use(express.static('./'));

app.listen(PORT, function () {
    console.log(`Example app listening on port ${PORT}!`);
});
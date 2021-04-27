const express = require("express");
const app = express();
const server = require('http').Server(app)
const appPort = process.env.PORT || 3000;

app.get('/', (req, res) => {
    res.send('Hello')
  })

app.listen(AppPort, function () {
    console.log(`********** EXPRESS SERVER is running on port ${appPort} **********`);
  });
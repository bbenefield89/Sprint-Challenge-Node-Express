const express = require('express');

const app = express();
const port = 5000;
const projectRoute = require('./routes/projectroutes');

app.use('/api/projects', projectRoute);

app.listen(port, () => console.log(`Server listening on port: ${ port }`));
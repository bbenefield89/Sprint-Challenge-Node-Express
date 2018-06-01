const express = require('express');

const app = express();
const port = 5000;
const projectRoute = require('./routes/projectroutes');
const actionRoute = require('./routes/actionroutes');

app.use(express.json());
app.use('/api/projects', projectRoute);
app.use('/api/actions', actionRoute);

app.listen(port, () => console.log(`Server listening on port: ${ port }`));
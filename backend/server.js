const cookieParser = require('cookie-parser');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const session = require('express-session');
const dbConnect = require('./utils/db');
require('dotenv').config();

const app = express();

const corsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());


dbConnect();

const userRoutes = require('./routes/userRoutes');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const applicationRoutes = require('./routes/ApplicationRoutes');

app.use('/api/v1/user', userRoutes);
app.use('/api/v1/company', companyRoutes);
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/application', applicationRoutes);

app.get('/', (req, res) => {
    res.send('<h1>This is Home Page</h1>');
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
    console.log(`Server started successfully at http://localhost:${port}`);
});

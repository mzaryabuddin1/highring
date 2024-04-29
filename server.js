const express = require('express')
const mongoose = require('mongoose')
const sequelize = require('./config/database')
const nocache = require('nocache')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const http = require('http')


const app = express()  
app.use(nocache());
app.use(cors())
app.use(cookieParser())
app.use(express.json())

app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  next();
});
const server = http.createServer(app);

// ROUTES
app.use('/api/user', require('./routes/userRoutes'))
app.use('/api/job', require('./routes/jobRoutes'))
app.use('/api/recruit', require('./routes/recruitMeRoutes'))
app.get("/", (req, res) => { res.status(200).json({ success: 1, msg: "Live!" }) })

sequelize.sync()
    .then(() => {
        console.log('Database and tables synced');
    })
    .catch((err) => {
        console.error('Error syncing database:', err);
    });

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log('Server is running on port ', PORT);
});
const express = require('express');
const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const User = require('./models/User');
require('dotenv').config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors(
  {origin: 'http://localhost:3000',methods: ['GET', 'POST'],optionsSuccessStatus: 204,
  })
);

// Import MongoDB connection
require('./config/db');

// Import and use routes
const adminRoutes = require('./routes/adminRoutes')
const donorRoutes = require('./routes/donorRoutes')
const schoolRoutes = require('./routes/schoolRoutes')

app.use('/user/admin', adminRoutes);
app.use('/user/donor', donorRoutes);
app.use('/user/school', schoolRoutes);


//logout Enpoints
app.post('/logout', (req, res) => {
  res.status(200).json({ message: 'Logged out successfully' });
});

app.get('/test', (req, res) => {
  User.find({})
    .then(users => {
      res.status(200).json(users);
    })
    .catch(err => {
      console.error('Error:', err);
      res.status(500).json({ error: 'Internal server error' });
    });
});


app.listen(8081, () => {
  console.log('Server is running on port 8081');
});

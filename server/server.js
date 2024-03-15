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
//const makedonationRoutes = require('./routes/makedonationRoutes');
//const makereq = require('./routes/makereqRoutes');

app.use('/user/admin', adminRoutes);
app.use('/user/donor', donorRoutes);
app.use('/user/school', schoolRoutes);
//app.use('/user/makedonation', makedonationRoutes);
//app.use('/user/makereq', makereqRoutes);


//logout Endpoints
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

// Enable CORS for all routes
//app.use(cors({ methods: ['GET', 'POST', 'PUT', 'DELETE'] }));


/*
app.delete('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    UserModel.deleteDonorById({_id: userId})
    .then(response => res.json(response))
    .catch(err => res.json(err))
});

app.put('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    UserModel.updateDonorById({_id: userId}, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        item: req.body.item,
        quantity: req.body.quantity,
        location: req.body.location,

        
    }).then(user => res.json(user))
    .catch(err => res.json(err))
});

app.delete('/delete/:userId', (req, res) => {
    const userId = req.params.userId;
    UserModel.deleteSchoolById({_id: userId})
    .then(response => res.json(response))
    .catch(err => res.json(err))
});

app.put('/update/:userId', (req, res) => {
    const userId = req.params.userId;
    UserModel.updateSchoolById({_id: userId}, {
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        item: req.body.item,
        quantity: req.body.quantity,
        location: req.body.location,

        
    }).then(user => res.json(user))
    .catch(err => res.json(err))
});

*/


app.listen(8081, () => {
  console.log('Server is running on port 8081');
});

const express = require('express');
const mongoose = require('mongoose');
const dotenv= require('dotenv').config();
const cors = require('cors')
const app = express();
const User = require('./models/User');
const Device = require('./models/Device');

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log("Error occured while connecting to the database: ",err));

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
})

app.get('/', (req, res) => {
    res.send('Hello, World!');
})

app.post('/createNewUser', async (req, res) => {
    try {
      const { name, email } = req.body; 
      
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ error: 'Email is already in use' });
      }
  
      const newUser = new User({ name, email });
      await newUser.save();
  
      res.status(201).json(newUser);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to create a new user' });
    }
  });

  app.get('/getAllUsers', async (req, res) => {
    try {
      const users = await User.find(); 
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Failed to fetch users' });
    }
  });

  app.post('/allotDevice', async (req, res) => {
    try {
        const { userId } = req.body; 
        const newDevice = new Device({
            alloted_to_user: userId
        })  
        await newDevice.save();
        res.status(201).json(newDevice);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create a new device' });
      }
  });

app.get('/getAllDevices', async (req, res) => {
  
  try {
  const devices = await Device.find().populate('alloted_to_user');
  res.status(200).json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to fetch devices' });
  }
})
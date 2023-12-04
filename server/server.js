const express = require("express");
const cors = require('cors');
const app = express();

const { db } = require('./firebase.js');

app.use(express.json());
app.use(cors());

app.post('/add-user', async (req, res) => {
  try {
    console.log('Received POST request:', req.body);
    const { username, minutes, seconds } = req.body;

    const usersRef = db.collection('users');

    await usersRef.add({
      username: username,
      minutes: minutes,
      seconds: seconds
    });

    res.status(200).json({ message: 'User added successfully.' });
  } catch (error) {
    console.error('Error adding user: ', error);
    res.status(500).json({ error: 'Error adding user.' });
  }
});

app.listen(4000, () => console.log("Server is running on port 4000"));

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

app.get('/get-users', async (req, res) => {
  try {
    const usersRef = db.collection('users');
    const snapshot = await usersRef.get();

    const users = [];
    snapshot.forEach((doc) => {
      users.push({
        id: doc.id,
        data: doc.data()
      });
    });

    res.status(200).json({ users });
  } catch (error) {
    console.error('Error fetching users: ', error);
    res.status(500).json({ error: 'Error fetching users.' });
  }
});

app.listen(4000, () => console.log("Server is running on port 4000"));

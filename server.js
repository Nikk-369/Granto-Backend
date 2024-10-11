require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const connectDB = require('./config/db');
const User = require('./models/user'); // Adjust the path accordingly

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

console.log('Attempting to connect to the database...'); 
connectDB();

app.post('/api/submit-form', async (req, res) => {
    const { name, email, mobile, totalLoss } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            mobile,
            totalLoss
        });

        await newUser.save();
        console.log('User saved:', newUser);

        res.status(200).json({ message: 'Form submitted successfully' });
    } catch (error) {
        console.error('Error saving user:', error);
        res.status(500).json({ message: 'Error saving form data', error: error.message });
    }
});

app.post('/api/submit-utr', async (req, res) => {
    const { email, utrNumber } = req.body; // Assume you want to link the UTR number to a user by email

    try {
        const user = await User.findOneAndUpdate(
            { email }, 
            { utrNumber }, // Update the utrNumber field
            { new: true } // Return the updated document
        );

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        console.log('UTR Number updated for user:', user);
        res.status(200).json({ message: 'UTR submitted successfully', user });
    } catch (error) {
        console.error('Error updating UTR number:', error);
        res.status(500).json({ message: 'Error saving UTR number', error: error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

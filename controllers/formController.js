const User = require('../models/user');

// Handle form submission
const submitForm = async (req, res) => {
    try {
        const { name, email, mobile, totalLoss } = req.body;

        const user = new User({ name, email, mobile, totalLoss });
        await user.save();

        res.status(201).json({ message: 'Form submitted successfully!', user });
    } catch (error) {
        res.status(400).json({ message: 'Form submission failed', error });
    }
};

// Handle UTR submission
const submitUTR = async (req, res) => {
    try {
        const { utrNumber, email } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.utrNumber = utrNumber;
        await user.save();

        res.status(200).json({ message: 'UTR number submitted successfully!', user });
    } catch (error) {
        res.status(400).json({ message: 'UTR submission failed', error });
    }
};

module.exports = { submitForm, submitUTR };

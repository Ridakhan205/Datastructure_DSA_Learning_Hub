const express = require('express');
const fs = require('fs');
const path = require('path');

const app = express();
app.use(express.json());

// ------------------------------
// Feedback folder
// ------------------------------
const feedbackFolder = path.join(__dirname, 'feedbacks');
if (!fs.existsSync(feedbackFolder)) {
    fs.mkdirSync(feedbackFolder);
}

// ------------------------------
// Serve frontend static files
// ------------------------------
app.use(express.static(path.join(__dirname, '../frontend')));

// ------------------------------
// Serve content folder (DSA topics, media, etc.)
// ------------------------------
app.use('/content', express.static(path.join(__dirname, '../content')));

// ------------------------------
// Serve homepage
// ------------------------------
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ------------------------------
// Feedback endpoint
// ------------------------------
app.post('/feedback', (req, res) => {
    const feedback = req.body.feedback;
    if (!feedback) return res.status(400).send('Feedback is required');

    const filePath = path.join(feedbackFolder, 'feedback.txt');
    fs.appendFile(filePath, feedback + '\n---\n', err => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error saving feedback');
        }
        res.send('Feedback received');
    });
});

// ------------------------------
// Start server
// ------------------------------
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`✅ Server running on port ${PORT}`);
});


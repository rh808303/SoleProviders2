const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve about page
app.get('/about.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'about.html'));
});

// All other routes serve static files
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, req.path));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log('Open http://localhost:3000/about.html in your browser');
});

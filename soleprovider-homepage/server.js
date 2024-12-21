const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');
const fs = require('fs');

// Serve static files from the current directory
app.use(express.static(__dirname));

// Serve about page with injected API key
app.get('/about.html', (req, res) => {
    try {
        const htmlContent = fs.readFileSync(path.join(__dirname, 'about.html'), 'utf8');
        const modifiedHtml = htmlContent.replace(
            '<!-- The API key will be injected by the server -->',
            `<script src="https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap" async defer></script>`
        );
        res.send(modifiedHtml);
    } catch (error) {
        console.error('Error serving about.html:', error);
        res.status(500).send('Internal Server Error');
    }
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

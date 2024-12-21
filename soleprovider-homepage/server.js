const express = require('express');
const app = express();
require('dotenv').config();
const path = require('path');

app.use(express.static(path.join(__dirname, 'public')));

app.get('/about.html', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html lang="en">
            <head>
                <!-- ...existing code... -->
            </head>
            <body>
                <!-- ...existing code... -->
                <script>
                    // Initialize and add the map
                    function initMap() {
                        const location = { lat: -25.344, lng: 131.036 };
                        const map = new google.maps.Map(document.getElementById("map"), {
                            zoom: 4,
                            center: location,
                        });
                        const marker = new google.maps.Marker({
                            position: location,
                            map: map,
                        });
                    }

                    // YouTube Player API
                    function onYouTubeIframeAPIReady() {
                        new YT.Player('player', {
                            videoId: 'dQw4w9WgXcQ',
                            events: {
                                'onReady': (event) => event.target.playVideo()
                            },
                            playerVars: {
                                'autoplay': 1,
                                'mute': 1
                            }
                        });
                    }
                </script>
                <!-- Add Google Maps API script -->
                <script src="https://maps.googleapis.com/maps/api/js?key=${process.env.GOOGLE_MAPS_API_KEY}&callback=initMap" loading="async" defer></script>
            </body>
        </html>
    `);
});

app.listen(3000, () => {
    console.log('Server is running on port 3000');
});

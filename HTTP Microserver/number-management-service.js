const express = require('express');
const axios = require('axios');
const app = express();
const port = 8008;

// Endpoint to handle GET requests to "/numbers"
app.get('/numbers', async (req, res) => {
    try {
    // Retrieve the "url" query parameter from the request
    const { url } = req.query;

    if (!url) {
      // If "url" parameter is missing, send a 400 Bad Request response
        return res.status(400).json({ error: 'Missing "url" parameter' });
    }

    // Parse the "url" parameter as an array even if it is a single URL
    const urls = Array.isArray(url) ? url : [url];

    // Array to store the unique numbers retrieved from all URLs
    let mergedNumbers = [];

    // Function to fetch data from a single URL and merge the numbers
    const fetchDataFromUrl = async (url) => {
        try {
        const response = await axios.get(url);
        const { numbers } = response.data;
        // Merge the numbers with the existing mergedNumbers array while keeping it unique
        mergedNumbers = [...new Set([...mergedNumbers, ...numbers])];
        } catch (error) {
        // If any error occurs during fetching, ignore the URL and proceed to the next one
        console.error(`Error fetching data from URL ${url}:`, error.message);
        }
    };

    // Array to store all the asynchronous requests for fetching data from URLs
    const requests = urls.map((url) => fetchDataFromUrl(url));

    // Wait for all the requests to complete or timeout (500ms)
    await Promise.allSettled(requests);

    // Sort the mergedNumbers array in ascending order
    mergedNumbers.sort((a, b) => a - b);

    // Send the response with the merged and sorted numbers
    res.json({ numbers: mergedNumbers });
    } catch (error) {
    // If any unexpected error occurs, send a 500 Internal Server Error response
    res.status(500).json({ error: 'Internal Server Error' });
    }
});

// Start the server listening on the specified port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

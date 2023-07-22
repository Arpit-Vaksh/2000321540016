const express = require('express');
const app = express();
const port = 8000;

// Endpoint to handle GET requests to "/numbers/primes"
app.get('/numbers/primes', (req, res) => {
    res.json({ numbers: [2, 3, 5, 7, 11, 13, 17, 19, 23] });
});

// Endpoint to handle GET requests to "/numbers/fibo"
app.get('/numbers/fibo', (req, res) => {
    res.json({ numbers: [1, 2, 3, 5, 8, 13, 21] });
});

// Endpoint to handle GET requests to "/numbers/odd"
app.get('/numbers/odd', (req, res) => {
    res.json({ numbers: [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23] });
});

// Endpoint to handle GET requests to "/numbers/rand"
app.get('/numbers/rand', (req, res) => {
    res.json({ numbers: [3, 9, 4, 11, 6, 23, 15, 2, 8, 13, 21, 10] });
});

// Start the test server listening on the specified port
app.listen(port, () => {
    console.log(`Test server is running on port ${port}`);
});

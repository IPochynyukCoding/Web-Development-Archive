const express = require('express');
const app = express();
const port = 26405;

//Array to calculate menu price
const menuItems = [
    {
        name:"borsch",
        "price":4.99
    },
    {
        name:"varenyky",
        "price":6.99
    },
    {
        name:"salo",
        "price":2.99
    },
    {
        name:"pampushky",
        "price":7.99
    },
]
const importItems = [
    {
        name:"roshen",
        "price":1.50
    },
    {
        name:"zhivchik",
        "price": 3.99
    },
    {
        name:"flint",
        "price": 1.99
    },
    {
        name:"crazyBee",
        "price": 0.99
    },
]


// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

app.use(express.static('Frontend'));
// Define GET route to serve the order form
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/Frontend/order.html');
});

// Define POST route to handle form submission
app.post('/submit', (req, res) => {
    // Extract form data
    const { borschCounter, varenykyCounter, saloCounter, pampushkyCounter, roshenCounter, zhivchikCounter, flintCounter, crazyBeeCounter, totalCostBackend} = req.body;
    let total = totalCostBackend;
    res.redirect(`/confirmed.html?totalCostProcessed=${total}`);
});
// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
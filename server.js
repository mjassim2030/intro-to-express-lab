const express = require("express")

const app = express()
const PORT = 3000

const collectibles = [
    { name: 'shiny ball', price: 5.95 },
    { name: 'autographed picture of a dog', price: 10 },
    { name: 'vintage 1970s yogurt SOLD AS-IS', price: 0.99 }
];

const shoes = [
    { name: "Birkenstocks", price: 50, type: "sandal" },
    { name: "Air Jordans", price: 500, type: "sneaker" },
    { name: "Air Mahomeses", price: 501, type: "sneaker" },
    { name: "Utility Boots", price: 20, type: "boot" },
    { name: "Velcro Sandals", price: 15, type: "sandal" },
    { name: "Jet Boots", price: 1000, type: "boot" },
    { name: "Fifty-Inch Heels", price: 175, type: "heel" }
];

// Routes
app.get('/', (req, res) => {
    res.send(`
        <h2>Welcome</h2>
        <h3>Testing Routes</h3>
        <ul>
            <li><a href="/greetings/Ali">/greetings/Ali</a></li>
            <li><a href="/roll/16"><span style="color: green">(Correct Roll) </span> /roll/16</a></li>
            <li><a href="/roll/momo"><span style="color: red">(Wrong Roll) </span> /roll/momo</a></li>
            <li><a href="/collectibles/1"><span style="color: green">(Available Item) </span> /collectibles/1</a></li>
            <li><a href="/collectibles/12"><span style="color: red">(Unavailable Item) </span> /collectibles/12</a></li>
            <li><a href="/shoes">All Shoes</a></li>
            <li><a href="/shoes?min-price=50">Shoes equal or over 50</a></li>
            <li><a href="/shoes?max-price=500">Shoes less than or equal to 500</a></li>
            <li><a href="/shoes?min-price=50&max-price=500">Shoes between 50 and 500</a></li>
            <li><a href="/shoes?type=sandal">Shoes of type sandal</a></li>
            <li><a href="/shoes?min-price=50&max-price=500&type=sneaker">Shoes between 50 and 500 of type sneaker</a></li>
        </ul>

        <h3>Thank you</h3>
        `)
});

app.get('/greetings/:username', (req, res) => {
    res.send(`Hello there, ${req.params.username}`)
});

app.get('/roll/:number', (req, res) => {

    const givenNumber = parseInt(req.params.number)

    if (givenNumber || givenNumber === 0) {
        let rolledNumber = Math.floor(Math.random() * (givenNumber + 1))
        res.send(`You rolled a ${rolledNumber}.`)
    }
    else {
        res.send("You must specify a number.")
    }
});


app.get('/collectibles/:index', (req, res) => {

    const item = collectibles[parseInt(req.params.index)]

    if (item) {
        res.send(`So, you want the ${item.name}? For ${item.price}, it can be yours!`)
    }
    else {
        res.send("This item is not yet in stock. Check back soon!")
    }

});


app.get('/shoes', (req, res) => {

    const minPrice = parseInt(req.query['min-price'])
    const maxPrice = parseInt(req.query['max-price'])
    const shoesType = req.query['type']

    let newShoesCollection = shoes

    newShoesCollection = shoes.filter(shoe => {
        return (!minPrice || shoe.price >= minPrice) && (!maxPrice || shoe.price <= maxPrice) && (!shoesType || shoe.type === shoesType)
    });

    res.send(newShoesCollection)

});

// Listen to Port
app.listen(PORT, () => {
    console.log(`Server is on http://localhost:${PORT}/`);
});
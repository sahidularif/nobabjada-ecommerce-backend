const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = 5000
const stripe = require('./routes/stripe');
const {routes } = require('./routes/auth.routes');
const { productRoute } = require('./routes/services');
require('dotenv').config();
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

// Connect to  the Mongodb database
// require('./database')();


app.use('/auth', routes);
app.use('/stripe', stripe);
app.use('/product', productRoute);

app.get("/", (req, res) => {
    res.send({ message: "Welcome" })
});


// Server Liseting 
const server = app.listen(port, () => {
    console.log('Connected to port ' + port)
})

// app.use((req, res, next) => {
//     // Error goes via `next()` method
//     setImmediate(() => {
//         next(new Error('Something went wrong'));
//     });
// });

app.use((err, req, res, next) => {
    if (res.headersSent) {
        next()
    } else {
        if(err.message){
            res.status(500).send(err.message)
        } else {
            res.send('There was an error')
        }
    }
})
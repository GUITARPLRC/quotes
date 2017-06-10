const express = require('express');
const bodyParser = require('body-parser');
const mongoClient = require('mongodb').MongoClient;

const app = express();

let db;

mongoClient.connect('mongodb://dang:dang@ds119682.mlab.com:19682/quotes', (err, database) => {
    if (err) console.log(err);

    db = database;

    app.listen(3000, () => {
      console.log('listening on 3000');
    })
});


app.set('view engine', 'ejs');


app.get('/', (req, res) => {
    db.collection('quotes').find().toArray((err, results) => {
        res.render('index.ejs', {quotes: results});
    })
})


app.use(bodyParser.urlencoded({extended: true}));


app.post('/quotes', (req, res) => {
    db.collection('quotes').save(req.body, (err, results) => {
        if (err) console.log(err);

        console.log('saved to database');
        res.redirect('/');
    })
})

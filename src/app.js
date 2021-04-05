const express = require('express');
const app = express();
const port = process.env.PORT || 3000; // for environment of Hosting
const path = require('path');
const hbs = require('hbs');

// console.log(__dirname);
const staticPath = path.join(__dirname, '../public');

// to set the view engine
const templatePath = path.join(__dirname, '../templates/views')
app.set('views', templatePath);
app.set("view engine", "hbs");

const partialsPath = path.join(__dirname, '../templates/partials')
hbs.registerPartials(partialsPath);

app.use(express.static(staticPath));

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/weather', (req, res) => {
    res.render('weather');
});

app.get('*', (req, res) => {
    res.render('404error', {
        errorMsg: "Opps! Page Not Found."
    });
});

app.listen(port, () => {
    console.log('Weather Server is running....')
});
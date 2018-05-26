const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

hbs.registerPartials(__dirname + '/templates/_partials');
hbs.registerHelper('year', () => {
  return new Date().getFullYear();
});

hbs.registerHelper('upper', (t) => {
  return t.toUpperCase();
});

let app = express();
app.set('view engine', 'hbs');
app.settings.views = 'templates';

app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
  let now = new Date().toString();
  let log = `${now}: ${req.method}, ${req.url}`;

  fs.appendFile('server.log', log + '\n',(err) => {
    if (err) {
      console.log('Unable to add log');
    }
  });
  next();
});

app.use((req, res, next) => {
  res.render('maintainence');
});

app.get('/', (req, res) => {
  res.render('template', {
    message : "Hello World"
  });
});

app.get('/about', (req,res) => {
  res.send('<h1>About!</h1>');
});

app.get('/bad', (req, res) => {
  res.send({
    status: 400,
    errorMessage: 'Bad request'
  });
});

app.listen(3000, () => {
  console.log('Server is up on port 3000');
});

const express = require('express');
const csrf = require('csurf');
const cookieParser = require('cookie-parser');
const { HairColor, Person } = require('./models');

const app = express();

app.use(express.urlencoded({extended: true }));
app.use(cookieParser());
app.set('view engine', 'pug');

const csrfProtecton = csrf({ cookie: true });
const asyncHandler = (handler) => {
  return (req, res, next) => handler(req, res, next).catch(next);
}

app.get('/', asyncHandler(async (req, res) => {
 const people = await Person.findAll( { include: [HairColor] });
 console.log(people.HairColor)
 res.render('home', { title: 'Home', people });
}))

app.get('/new-person', csrfProtecton, asyncHandler(async (req, res) => {
  const colors = await HairColor.findAll();
  res.render('new-person', { colors, title: 'New Person', csrfToken: req.csrfToken() });
}));

app.post('/new-person', csrfProtecton, asyncHandler(async (req, res) => {
  const { firstName, lastName, age, biography, hairColorId } = req.body;
  await Person.create( { firstName, lastName, age, biography, hairColorId });
  res.redirect('/');
}));

const port = 8081;
app.listen(port, console.log(`Listending on port: ${port}...`));





/* Do not change this export. The tests depend on it. */
try {
  exports.app = app;
} catch(e) {
  exports.app = null;
}

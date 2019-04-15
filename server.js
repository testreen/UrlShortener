import express from 'express';
import bodyParser from 'body-parser';
import routes from './routes/index';

// Instantiate express
const app = express();

// Set the server port
const port = process.env.PORT || 8000;

// Configure app to use bodyParser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Register the routes in app
app.use('/', routes);

// If response status 404
app.use(function (req, res, next) {
  res.status(404).send("Sorry, incorrect original or shortened URL entered!")
})

// Start the server
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});

module.exports = app;

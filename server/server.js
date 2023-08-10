const express = require('express');
const sequelize = require('./config/connection');
const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ message: 'Something went wrong on the server.' });
  });

// turn on routes
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`'Now listening' on port ${PORT}!`));
    }
);
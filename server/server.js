const express = require('express');
const sequelize = require('./config/connection');
// const routes = require('./routes');

const app = express();
const PORT = process.env.PORT || 3005;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.use(routes);

// turn on routes
sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening'));
    }
);
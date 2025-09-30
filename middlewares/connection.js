var mongoose = require('mongoose');

//Set up default mongoose connection
var conn = mongoose.connect(process.env.mongoPath, { useNewUrlParser: true, useFindAndModify: false, useUnifiedTopology: true })
    .then((db) => {
        console.log('Database connected');

        return db
    })
    .catch((error) => {
        console.log('Error connecting to database' + error);
    });

module.exports = conn
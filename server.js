var express = require("express");
var personRoute = require("./src/routes/routes");
let mongoose = require('mongoose');
var app = express();



app.use(express.json())
app.use('/person', personRoute)
const PORT = process.env.PORT || 8000

app.listen(PORT, (err) => err ? console.log(err) : console.log("Server is running " + PORT))

const server = 'amal:amal1234@cluster.dq1pj.mongodb.net';
const database = 'mmyFirstDatabase';
class Database {
    constructor() {
        this._connect()
    }
    _connect() {
        mongoose.connect(`mongodb+srv://${server}/${database}?retryWrites=true&w=majority`, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
            .then(() => {
                console.log('Database connection successful')
            })
            .catch(err => {
                console.error('Database connection error')
            })
    }
}
module.exports = new Database()
const express = require('express')
require('./db/mongoose')

const app = express()
var cors = require('cors');
const port = process.env.PORT || 9000
// var whitelist = [
//     'http://0.0.0.0:3000',
// ];
// var corsOptions = {
//     origin: function(origin, callback){
//         var originIsWhitelisted = whitelist.indexOf(origin) !== -1;
//         callback(null, originIsWhitelisted);
//     },
//     credentials: true
// };
// app.use(cors(corsOptions));


//app.use(cors)

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Content-Type");
    next();
});

app.use(express.json())

const bcrypt = require('bcryptjs')


const userRouter = require('./routers/person')
app.use(userRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
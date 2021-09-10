const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
mongoose.connect('mongodb://127.0.0.1:27017/address-book', {
    useNewUrlParser: true,
})

const connection = mongoose.connection;

connection.once("open", function() {
  console.log("MongoDB database connection established successfully");
});

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    address: {
        type: String,
        required: true,
        trim: true,

    },
})

/*userSchema.statics.findByCredentials = async (name, password) => {

    const user = await User.findOne({ name })

    if (!user) {
        throw new Error('This username has not been registered')
    }

    return user
}

*/

const Person = mongoose.model('Person', personSchema, 'addresses')



module.exports = Person

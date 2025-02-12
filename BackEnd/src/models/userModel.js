const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

/*
mongoose: Se usa para interactuar con MongoDB. Proporciona herramientas para definir 
esquemas y modelos de datos, que se guardan en la base de datos.

validator: Es una librería útil para realizar validaciones, en este caso, 
para validar que el email tenga un formato correcto.

bcryptjs: Se usa para encriptar las contraseñas de los usuarios antes de guardarlas en la base de datos.

jsonwebtoken (jwt): Se utiliza para generar y verificar tokens JWT (JSON Web Tokens),
que se usarán para autenticar a los usuarios en tu aplicación.
*/

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

userSchema.methods.generateAuthToken = async function () {
    const user = this //Ese user en la BDD

    // Generamos un token JWT usando el _id del usuario
    const token = jwt.sign({ _id: user._id.toString() }, 'thisismynewcourse')

    // Añadimos el token generado al array de tokens del usuario
    user.tokens = user.tokens.concat({ token })

    // Guardamos el documento del usuario con el nuevo token
    await user.save()

    // Devolvemos el token generado
    return token
}

userSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

// Hash the plain text password before saving
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

const User = mongoose.model('User', userSchema, 'Usuarios')

module.exports = User
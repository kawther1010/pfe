const express = require('express')
const expressLayouts = require('express-ejs-layouts')
const session = require('express-session')
const passport = require('passport')
const path = require('path');

const app = express()

// Load environment variables
require('dotenv').config()

// Configure Passport
require('./config/passportLocal')(passport)
require('./config/passportGoogle')(passport)

// Connect to MongoDB
require('./config/database')()
    .then(() => {
        // Start cron
        require('./config/cronConfig')();
    }).catch(err => {
        console.error('Database connection error:', err);
        process.exit(1); // exit with a failure code
    });


// Set up EJS
app.use(expressLayouts)
app.set('view engine', 'ejs')

app.use(express.static(path.join(__dirname, 'public')));

// Parse request bodies
app.use(express.urlencoded({ extended: false }))

// Set up sessions
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}))

// Initialize Passport middleware
require('./middleware/passport')(app)

// Set up flash messages middleware
require('./middleware/flash')(app)

// Set up routes
app.use('/', require('./routes/index'))
app.use('/users', require('./routes/users'))
app.use('/auth', require('./routes/auth'))
app.use('/dashboard', require('./routes/admin'))


// Start the server
const PORT = process.env.PORT || 5000

app.listen(PORT, console.log(`Server started on port ${PORT}`))
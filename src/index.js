const express = require('express');
const path = require('path');
const { engine } = require("express-handlebars");
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');

//Initialization
const app = express();
require('./database');
require('./config/passport');


// Settings
const REST_PORT = 8080;
app.set('port', process.env.PORT || REST_PORT);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', engine({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layout'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    allowProtoProperties: true
}));
app.set('view engine', '.hbs');

// Middlewares
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'));
app.use(session({
    secret: 'estoesunsecreto',
    resave: true,
    saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Global Vars 
app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg'); 
    res.locals.error_msg = req.flash('error_msg'); 
    res.locals.error = req.flash('error'); 
    //res.locals.user = req.user || null; 
    let testObj = req.user || null; 
    if (testObj != null){
        const myJSON = JSON.stringify(testObj);
        let obj = JSON.parse(myJSON);
        res.locals.user = obj.name || null;

    }
    
    next();
} );



//Routes 
app.use(require('./routes/index'));
app.use(require('./routes/users'));
app.use(require('./routes/notes'));


//Static Files
app.use(express.static(path.join(__dirname, 'public')));
//Server is listen

app.listen(app.get('port'), () => {
    console.log('Server Running on port:', REST_PORT)
});
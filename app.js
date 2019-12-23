//jshint node: true, esversion: 6

//ip addr show
// express – jako „podstawa aplikacji”
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const mongo = require('mongodb');

mongoose.connect('mongodb://localhost/myapp');
const db = mongoose.connection;

// let routes = require('./api/index');
// let users = require('./api/user');
// const api = require('./api');
// // app.post('/logIn', api.FunLogIn);
// // app.post('/singnUp', api.FunSignUp);


// const app = express();
const app = express();

// const routes = require('./routes');
let routes = require('./routes/index');
let users = require('./routes/users');
let lots = require('./routes/lots');



// View Engine
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars'); // ejs
// app.use(express.static(path.join(__dirname, 'public')));

// obsługa danych typu application/json
// body-parser – żeby móc parsować dane przychodzące w zapytaniu
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());

// „serwer statyczny”
app.use(express.static(path.join(__dirname, 'public')));

// konfiguracja obsługi sesji (poziom Express,js)
const sessionSecret = 'Wielki$ekret44';
// const sessionKey = 'express.sid';
app.use(session({
    // key: sessionKey,
    secret: 'sessionSecret',
    // store: sessionStore,
    resave: false,
    saveUninitialized: true,
}));

// middleware Passport.js
app.use(passport.initialize());
app.use(passport.session());

// Express Validator
app.use(expressValidator({
    errorFormatter: function(param, msg, value) {
        let namespace = param.split('.');
        let root    = namespace.shift();
        let formParam = root;
      while(namespace.length) {
        formParam += '[' + namespace.shift() + ']';
      }
      return {
        param : formParam,
        msg   : msg,
        value : value
      };
    }
  }));

// Connect Flash
app.use(flash());

// Global Vars
app.use(function (req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user || null;
    next();
});


// const socketio = require('socket.io');
// serwer HTTP dla aplikacji „app”
const server = require('http').createServer(app);
// obsługa Socket.io
// const io = socketio.listen(server);
const io = require('socket.io')(server);

// const tableIo = require('./routes/tableIo')(io);

// app.use(express.static(__dirname + '/public'));

// app.get('/', routes.index());
app.use('/users', users);
app.use('/user', lots);
app.use('/', routes);

// io.sockets.on('connection', (socket) => {
//     console.log(socket);
//     socket.on('send', (data) => {
//         console.log(data);
//     });
// });

// io.sockets.on('connection', function (socket) {
//     socket.on('start', function (message) {
//         // console.log("Message: " + JSON.stringify(message));
//         // socket.broadcast.send(message);
//         console.log(message);
//     });
// });

const table = io
    .of('/table')
    .on('connect', (socket) => {
        console.log("data");
        socket.on('start', (data) => {
            // console.log("data");
            // console.log(data);
        });

    socket.on('refresh', (data) => {
        // console.log("dataaaaaaaaaaa");
        // console.log(data);
    });
});

// const masages = io
//     .of('/message')
//     .on('connect', (socket) => {

// });

// const api = require('./api');
// app.post('/logIn', api.FunLogIn);
// app.post('/singnUp', api.FunSignUp);


// io.sockets.on('connection', (socket) => {
//     socket.emit('news', {
//         ahoj: 'od serwera'
//     });
//     socket.on('reply', (data) => {
//         console.log(data);
//     });
// });

// parametry – ewentualnie przekazywane poprzez zmienne środowiskowe
const port = process.env.PORT || 4000;
// uruchamiamy aplikację
// app.listen(port, () => {
//     console.log(`Serwer gry dostępny na porcie ${port}`);
// });
server.listen(port);
console.log(`Serwer gry dostępny na porcie ${port}`);

// console.log(table);

// const ioObj = {table : table};

// ioObj.table = table;

// module.exports = ioObj;




/*

// A do czego może nam być potrzebny moduł cookie-session? ;)
const cookieSession = require('cookie-session');
// drobiazgi do sprawnego i czytelnego logowania
const logger = require('morgan');
const errorHandler = require('errorhandler');

// mongoose.connect('mongodb://localhost:27017/test');


const secret = process.env.SECRET || '$uper $ecret';
const env = process.env.NODE_ENV || 'development';
// tworzymy i konfigurujemy obiekt aplikacji



// obsługa zasobów statycznych
// app.use(express.static('public'));

const serveStatic = require('serve-static');
app.use(serveStatic('public'));


passport.serializeUser( (user, done) => {
    done(null, user);
});
passport.deserializeUser( (obj, done) => {
    done(null, obj);
});

passport.use(new LocalStrategy(
    (username, password, done) => {
        if ((username === 'admin') && (password === 'tajne')) {
            console.log('Udane logowanie...');
            return done(null, {
                username: username,
                password: password
            });
        } else {
            return done(null, false);
        }
    }
));

let schemaUser = mongoose.Schema({
    firstname: String,
    lastname: String,
    email: String,
    password: String
});

let modelUser = mongoose.model('users', schemaUser);


let database = [];


/* socket 
const connect = require('connect');
const appIO = connect();

const httpServer = require('http').createServer(appIO);
const socketio = require('socket.io');
const io = socketio.listen(httpServer);





// obsługa sesji za pomocą ciasteczek
app.use(cookieSession({secret: secret}));
*/






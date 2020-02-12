const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

const authRoutes = require('./api/auth/auth.routes')
const userRoutes = require('./api/user/user.routes')
const orderRoutes = require('./api/order/order.routes')
const houseRoutes = require('./api/house/house.routes')
// const connectSockets = require('./api/socket/socket.routes')


app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },

}))

if (process.env.NODE_ENV === 'production') {
    // app.use(express.static(path.resolve(__dirname, 'public')));
    app.use(express.static(path.join(__dirname, 'frontend/build')));
    app.get('*', (req, res) => { res.sendfile(path.join(__dirname = 'frontend/build/index.html')); })
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

// routes
app.use('/api/auth', authRoutes)
app.use('/api/house', houseRoutes)
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)


// handle every other route with index.html, which will contain
// a script tag to your application's JavaScript file(s).
// app.get('*', function (request, response) {
//     response.sendFile(path.resolve(__dirname, '../public', 'index.html'));
// });

// app.get('*', (req, res) => {  res.sendFile(path.join(__dirname+'/frontend/public/index.html'));})
// const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, function () {
    // console.log('environement var NODE_ENV: ', process.env.NODE_ENV, '\n')
    // console.log('environement vars: ', process.env)
    console.log('Server is running on port: ' + port)
});

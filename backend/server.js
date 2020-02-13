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


app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },

}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8080', 'http://localhost:8080', 'http://127.0.0.1:3000', 'http://localhost:3000', 'http://localhost:3001'],
        credentials: true
    };
    app.use(cors(corsOptions));
}

app.use('/api/auth', authRoutes)
app.use('/api/house', houseRoutes)
app.use('/api/user', userRoutes)
app.use('/api/order', orderRoutes)


const port = process.env.PORT || 3030;
http.listen(port, function () {
    console.log('Server is running on port: ' + port)
});

const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

const MongoStore = require('connect-mongo');

// const indexRouter = require('./routes/index');
const authRouter = require('./routes/Auth.routes');
const adminRouter = require('./routes/Admin.routes');
const adminBrandRouter = require('./routes/Admin.brand.routes');
const adminCategoryRouter = require('./routes/Admin.category.routes');

dotenv.config({ path: './config/config.env' })
PORT = process.env.PORT || 4000

connectDB();

app.set('view engine', 'ejs')

// Middlewares
app.use('/', express.static('public'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(session({
    secret: "squirrel",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI,
        touchAfter: 24 * 3600, // Lazy update session
    }),
    ttl: 24 * 60 * 60,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.authenticate('session'));

app.get('/', (req, res) => res.send('Root route'))

app.use('/api/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/admin/brand', adminBrandRouter);
app.use('/admin/category', adminCategoryRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
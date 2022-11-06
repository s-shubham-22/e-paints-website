const express = require('express')
const app = express()
const dotenv = require('dotenv')
const bodyParser = require('body-parser')
const cookieParser = require("cookie-parser");
const connectDB = require('./config/db');
const passport = require('passport');
const session = require('express-session');

const MongoStore = require('connect-mongo');

// Client Routes
const clientRouter = require('./routes/Client.routes');

// Auth Routes
const authRouter = require('./routes/Auth.routes');

// Admin Routes
const adminRouter = require('./routes/Admin.routes');
const adminSliderRouter = require('./routes/Admin.slider.routes');
const adminBrandRouter = require('./routes/Admin.brand.routes');
const adminCategoryRouter = require('./routes/Admin.category.routes');
const adminProductRouter = require('./routes/Admin.product.routes');
const adminQueryRouter = require('./routes/Admin.query.routes');
const adminContactRouter = require('./routes/Admin.contact.routes');

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

app.get('/', clientRouter);

app.use('/api/auth', authRouter);
app.use('/admin', adminRouter);
app.use('/admin/slider', adminSliderRouter);
app.use('/admin/brand', adminBrandRouter);
app.use('/admin/category', adminCategoryRouter);
app.use('/admin/product', adminProductRouter);
app.use('/admin/query', adminQueryRouter);
app.use('/admin/contact', adminContactRouter);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
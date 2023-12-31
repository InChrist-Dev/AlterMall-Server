const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const checkDirectory = require('./middleware/directoryMiddleware.js')
const basicAuthMiddleware = require('./middleware/authMiddleware.js');
const { swaggerUi, specs } = require("./swagger/swagger")


dotenv.config();
const pageRouter = require('./routes/mainroute.js');
const { sequelize } = require('./models');

checkDirectory();

const app = express(); 

app.use('/upload', express.static(path.join(__dirname, 'upload/')));

app.use("/api-docs", basicAuthMiddleware, swaggerUi.serve, swaggerUi.setup(specs));

app.set('port', process.env.PORT || 2000);

sequelize.sync({alter:true, force: false })
    .then(() => {
        console.log('DB 연결 성공')
    })
    .catch((err) => {
        console.log(err);
    })

nunjucks.configure('views', {
    express: app,
    watch: true,
});

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
    resave:false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false,
    }
}));

app.use('/', pageRouter);

app.use((req, res, next) => {
    const error = new Error(`${req.method} ${req.url} 라우터가 없습니다.`);
    error.status = 404;
    next(error);
});

app.use((err, req, res, next) => {
    res.locals.message = err.message;
    res.locals.error = process.env.NODE_ENV !== 'production' ? err : {};
    res.status(err.status || 500);
});

app.listen(app.get('port'), () => {
    console.log(app.get('port'), '번 포트에서 대기 중');
});

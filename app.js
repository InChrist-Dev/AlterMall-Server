const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const session = require('express-session');
const nunjucks = require('nunjucks');
const dotenv = require('dotenv');
const { swaggerUi, specs } = require("./swagger/swagger")


dotenv.config();
const pageRouter = require('./routes/mainroute.js');
const { sequelize } = require('./models');

const app = express();

app.use('/static', express.static(path.join(__dirname, 'upload')));

app.use("/", (req, res) => {
    res.status(200).send(
    `
    <h1>이건 지갑이에요</h1>
    </p>
    <h2>아나 이거 만든다고 시간을 얼마나 쓴거야</h2>
    </p>
    <img src="/static/imgs/wallet.jpeg" width="180", height="180" ">
    </p>
    <h1>이건 딸기에요<h1/>
    </p>
    <h2>맛있겠다!!<h2/>
    </p>
    <img src="/static/imgs/berry.jpeg" width="180", height="180" ">
    `
    )
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs))
app.set('port', process.env.PORT || 8000);

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

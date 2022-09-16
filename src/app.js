const express = require ("express");
const app = express ();
const path = require ("path");
const methodOverride = require('method-override');
const session = require ("express-session");
const cookieParser = require('cookie-parser');
const userLoggedMiddleware = require('./middlewares/users/userLoggedMiddleware')

// Middlewares application importados y nativos 
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false })); // Para poder leer el body
app.use(express.json()); // Para poder leer el body
app.use(session ({ //Para poder iniciar session
    secret: "still secret",
    resave: false,
    saveUninitialized: false  
}));
app.use(cookieParser()); // Para poder usar Cookies
app.use(methodOverride("_method"));
app.use(userLoggedMiddleware);


// ************ Template Engine ************
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'ejs');



// app.use(userLoggedMiddleware);

// --Routes--

// Main routes
const mainRouter = require("./routes/index.js")
app.use("/", mainRouter);

// Users routes
const authRouter = require("./routes/auth.js");
app.use("/auth", authRouter);

// Movies routes
const moviesRouter = require("./routes/movies.js");
app.use("/movies", moviesRouter);

// Error 404 handler
app.use((req, res, next) => {
    res.status(404).render('error')
})

// Listen to server for server up!
app.set("port", process.env.PORT || 5000);
app.listen (app.get("port"), () => console.log ("Server running in http://localhost:" + app.get("port")));


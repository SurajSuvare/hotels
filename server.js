const express = require('express')
const app = express()
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); // req.body


app.get('/' , (req,res) => {
    res.send("hello world")
});


// import the router filrs
const personRouter = require('./Routes/personRoutes');
const menuRouter = require('./Routes/menuRoutes');

// use the routers
app.use('/person', personRouter);
app.use('/menu', menuRouter);



app.listen(3000 , () => {
  console.log("listen on port 3000")
})
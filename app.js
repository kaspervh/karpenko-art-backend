const express = require('express');
const connectDB = require('./config/db')

const app = express();

//connect database
connectDB();

// will allow express to read calls with body
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.send('Hello world');
})

// user calls
app.use('/api/login', require('./src/api/login'))

// picture calls



app.listen(process.env.PORT || 1337, () => console.log('server is running'))
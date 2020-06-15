const express = require('express')

const app = express();

// will allow express to read calls with body
app.use(express.json())
app.use(express.urlencoded({extended: false}))


app.get('/', (req, res) => {
    res.send('Hello world');
})

// user calls
app.use('/api/login', require('./api/login'))

// picture calls


app.listen(process.env.PORT || 1337, () => console.log('server is running'))
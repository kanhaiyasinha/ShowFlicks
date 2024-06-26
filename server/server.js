const express = require('express')

//accessing environment variable configurations
require('dotenv').config()

const app = express()
const dbConfig = require('./config/dbConfig')
const userRoutes = require('./routes/userRoutes')
const movieRoutes = require('./routes/movieRoutes')
const theatreRoutes = require('./routes/theatreRoutes')
const showRoutes = require('./routes/showRoutes')
const bookingRoutes = require('./routes/bookingRoutes')

//we use express.json() to body parsing of json data we're getting from the client
app.use(express.json())
app.use('/api/users', userRoutes.router)
app.use('/api/movies', movieRoutes.router)
app.use('/api/theatre', theatreRoutes.router)
app.use('/api/shows', showRoutes.router)
app.use('/api/bookings', bookingRoutes.router)



app.listen(8080, () => {
    console.log('Server is connected')
})

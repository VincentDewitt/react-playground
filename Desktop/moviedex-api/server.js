require('dotenv').config("./env")
const express = require('express')
const morgan = require('morgan')
const helmet = require('helmet')
const cors = require('cors')
const MOVIEDEX = require('./movies-data.json')
const { nextTick } = require('process')

const app = express()
app.use(morgan('dev'))
app.use(helmet())
app.use(cors())

function validateBearerToken(req,res){
const authToken = req.get('Authorization')
const apiToken = process.env.API_TOKEN
console.log('validation security')
if (!authToken || authToken.split(' ')[1] !== apiToken) {
    return res.status(401).json({ error: 'Unauthorized request'})
}
next();
}

app.get('/movie',function handlegetMovie (req,res){
   let response = MOVIEDEX;
   console.log(response)
   console.log(process.env.API_TOKEN)
   if (req.query.genre){
       response = response.filter(movies => {
        let genreFilter = movies.genre
       return genreFilter.toLowerCase().includes(req.query.genre.toLowerCase())
       })
   }

   if (req.query.country){
       response = response.filter(movies => {
           let countryFilter = movies.country
           return countryFilter.toLowerCase().includes(req.query.country.toLowerCase())
       })
   }

  /* if(req.query.avg_vote){
       response = response.filter(movies => {
        let voteFilter = movies.avg_vote
        return voteFilter.
       })
   } */

 return res.json(response)
})
const PORT = 7000

app.listen(PORT, () => {
    console.log(`Server is Running on port ${PORT}`)
})
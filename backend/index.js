const connectToMongo = require('./db.js');
const express = require('express');
const cors = require('cors');
connectToMongo();

const app = express();
const port = 3001
app.use(cors())
app.use(express.json())
//Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))

app.listen(port, ()=>{
    console.log("Example app listening at http://localhost:"+port)
})

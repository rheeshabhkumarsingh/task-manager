const express = require("express");
require('./db/mongoose')
const { default: mongoose } = require("mongoose");
const userRouter = require('./routers/usersRouter');
const taskTouter = require('./routers/taskRouter')


const app = express();
const PORT = process.env.PORT || 7000;
app.use(express.json())

app.use(userRouter)

app.use(taskTouter)

app.listen(PORT, () => {
    console.log('Server is up on PORT: ', PORT)
})
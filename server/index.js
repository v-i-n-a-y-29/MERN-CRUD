const express = require("express");
const databaseConnection = require("./database");
const bookRouter = require('./routes/book.routes')
const userRouter = require('./routes/user.routes')
const authMiddleWare = require('./middleware/auth.middleware')
const cors = require('cors')
const cookieParser = require('cookie-parser')
databaseConnection();

const app = express();
app.use(express.json());
app.use(cookieParser())

app.use(
  cors({
    origin: [
      'http://localhost:5173',
    ],
    credentials: true,
  })
)

app.get('/',(req,res)=>{
    res.send("hello world")
})

app.use('/book',authMiddleWare,bookRouter)
app.use('/auth',userRouter)

app.listen(8000, () => {
  console.log("Port listening on 8000");
});
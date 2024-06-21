import express from 'express'
import usersrouter from "./routes/users.route.js"

const app = express();

app.use("/users", usersrouter)
// app.get("/",(req,res) => {
//   res.send("hello")
// })
// app.post("/",(req,res) => {
//   res.send("creating a user")
// })

app.listen(8080,() => {
  console.log("server on port 8080")
})
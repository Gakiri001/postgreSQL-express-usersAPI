import {Router} from 'express'

const router = Router();

router.get("/",(req,res) => {
  res.send("Getting all users")
})

router.get("/:id",(req,res) => {
  res.send("Getting a single user")
})

router.post("/",(red,res) => {
  res.send("Creating a user")
})

router.patch("/:id",(req,res) => {
  res.send("updating a user")
})

router.delete("/:id",(req,res) => {
  res.send("Deleting a user")
})

export default router;
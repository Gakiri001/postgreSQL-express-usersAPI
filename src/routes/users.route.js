import {Router} from 'express'
import pool from '../db.config.js';

const router = Router();

router.get("/",async (req,res) => {
  try{
    const result = await pool.query("SELECT * FROM usersTable");
    res.status(200).json({success:true,data:result.rows})
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }
})

router.get("/:id",async (req,res) => {
  const id = req.params.id;
  try{
    const result = await pool.query("SELECT * FROM usersTable WHERE id=$1",[id]);
    if(result.rowCount === 0){
      res.status(404).json({success:false, message:"User not found"})
    }
    else{
      res.status(200).json({success:true,data:result.rows[0]})
    }
  }
  catch(err){
    res.status(500).json({success:false, message:err.message})
  }
})

const validateUserInfo = (req,res,next) => {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  const occupation = req.body.occupation;
  const avatarURL = req.body.avatarURL;

  if(!firstName) return res.status(400).json({success:false,message:"First Name is required"})
  if(!lastName) return res.status(400).json({success:false,message:"last Name is required"})
  if(!email) return res.status(400).json({success:false,message:"email is required"})
  if(!occupation) return res.status(400).json({success:false,message:"occupation is required"})
  if(!avatarURL) return res.status(400).json({success:false,message:"Please upload a photo"})
  next();
}

router.post("/",validateUserInfo,async (req,res) => {
  try{
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const email = req.body.email;
    const occupation = req.body.occupation;
    const avatarURL = req.body.avatarURL;

    const insert = await pool.query("INSERT INTO usersTable (firstName, lastName, email, occupation, avatarURL) VALUES ($1, $2, $3, $4, $5)", [firstName, lastName, email, occupation, avatarURL])
    
    if(insert.rowCount === 1){
      res.status(201).json({success:true,message:"User created successfully"});
    }
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }
})

router.patch("/:id",(req,res) => {
  res.send("updating a user")
})

router.delete("/:id",(req,res) => {
  res.send("Deleting a user")
})

export default router;
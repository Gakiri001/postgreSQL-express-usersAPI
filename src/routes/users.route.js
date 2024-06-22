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

router.patch("/:id",async (req,res) => {
  const{firstName,lastName,email,occupation,avatarURL} = req.body
  const id = req.params.id 
  try{
    let updateOperation;
    if(firstName) {
      updateOperation = await pool.query("UPDATE usersTable SET firstName=$1 WHERE id=$2",[firstName,id])
    }
    if(lastName) {
      updateOperation = await pool.query("UPDATE usersTable SET lastName=$1 WHERE id=$2",[lastName,id])
    }
    if(email) {
      updateOperation = await pool.query("UPDATE usersTable SET email=$1 WHERE id=$2",[email,id])
    }
    if(occupation) {
      updateOperation = await pool.query("UPDATE usersTable SET occupation=$1 WHERE id=$2",[occupation,id])
    }
    if(avatarURL) {
      updateOperation = await pool.query("UPDATE usersTable SET avatarURL=$1 WHERE id=$2",[avatarURL,id])
    }
    if(updateOperation.rowCount===1){
      res.status(200).json({success:true,message:"Users updated successfully"})
    }
    else{
      res.status(400).json({success:false,message:"Invalid user"})
    }
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})    
  }
})

router.delete("/:id",async (req,res) => {
  const id = req.params.id
  try{
    const deleteOperation = await pool.query("DELETE FROM usersTable WHERE id=$1",[id])
    if(deleteOperation.rowCount===1){
      res.status(200).json({success:true,message:"User deleted successfully"})
    }
    else{
      res.status(400).json({success:false, message:"invalid user"})
    }
  }
  catch(err){
    res.status(500).json({success:false,message:err.message})
  }
})

export default router;
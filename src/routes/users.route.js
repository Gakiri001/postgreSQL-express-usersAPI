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

router.post("/",async (req,res) => {
  res.send("Post user to database")
})

router.patch("/:id",(req,res) => {
  res.send("updating a user")
})

router.delete("/:id",(req,res) => {
  res.send("Deleting a user")
})

export default router;
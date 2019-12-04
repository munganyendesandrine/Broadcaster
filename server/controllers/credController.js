import Credentials from "../models/credentials";
import jwt from "jsonwebtoken";

class credController {
  
  static signUp(req, res){
    const credential = {
      id: parseInt(Credentials.length) + 1,
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
      bio: req.body.bio,
      phone: req.body.phone,
      email: req.body.email,
      pwd: req.body.pwd,
      confirmPwd: req.body.confirmPwd,
      filetoupload: req.body.filetoupload  
    }
    Credentials.push(credential);
    const token = jwt.sign({credential}, 'generateToken')
    return res.status(201).json({
      status:201,
      message: "User created successfully", 
      data:{token:token}
    });
  }
  
  static signIn(req, res){
    const authentic = {
      email: req.body.email,
      pwd: req.body.pwd
    }
    Credentials.push(authentic);
    return res.status(200).json({
      status:200,
      message: "User is successfully logged in", 
      data:authentic
    });
  }
}
export default credController;



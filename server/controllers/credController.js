import Credentials from "../models/credentials";
// import moment from "moment";

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
    return res.status(201).json({
      status:201,
      message: "User created successfully", 
      data:credential
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



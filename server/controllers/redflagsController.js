import RedFlags from "../models/redFlags";
import Credentials from "../models/credentials";
import Status from "../models/status";
import moment from "moment";

class redflagsController {
  
  static createRF(req, res){
    const user = Credentials.find(uid => uid.id === parseInt(req.params.id));
    const redFlag = {
      id: parseInt(RedFlags.length) + 1,
      createdOn: moment.utc().format("DD/MM/YYYY  HH:mm:ss"),
      createdBy:user,
      title: req.body.title,
      type: "Red Flag Record",
      location: req.body.location,
      status: "Draft",
      imageFile: req.body.imageFile,
      videoFile: req.body.videoFile,
      comment: req.body.comment
      
    }
    RedFlags.push(redFlag);

    const a = [];
    const obj={
                id: redFlag.id,
                message: "Created redflag record"
              };
    a.push(obj);

    return res.status(201).json({
      status:201,
      data:a
    });
  }

  static allRedflags(req, res){
    return res.status(200).json({
      status: 200,
      message: "All RedFlags Records",
      data: RedFlags
    });
  }
  static specificRF(req, res){
      const specificRedflag = RedFlags.find(specRF => specRF.id === parseInt(req.params.id));

      if(!specificRedflag) return res.status(404).send("Redflag Record with the given ID was not found");
    
      return res.status(200).json({
      status:200,
      data:specificRedflag
    });
  }

  static editLocation(req, res){
      const place = RedFlags.find(loc => loc.id === parseInt(req.params.id));

      if(!place) return res.status(404).send("Red-flag Record with the given ID was not found");

      // validate, if invalid return 400 Bad Request
      if(!req.body.location)
        return res.status(400).send('Location required');
      //Updates
      place.location = req.body.location;
      
      const b = [];
      const obj={
                id: place.id,
                message: "Updated red-flag record’s location"
              };
      b.push(obj);

      return res.status(200).json({
      status:200,
      data:b
    });
  }

  static editComment(req, res){
    const comment = RedFlags.find(description => description.id === parseInt(req.params.id));

    if(!comment) return res.status(404).send("Red-flag Record with the given ID was not found");

    if(!req.body.comment) return res.status(400).send('Comment Required');
      
    //Updates
    comment.comment = req.body.comment;

    const c = [];
    const obj={
                id: comment.id,
                message: "Updated red-flag record’s comment"
              };
    c.push(obj);

    return res.status(200).json({
      status:200,
      data:c
    });
  }

  static deleteRF(req, res){
    const dltRF = RedFlags.find(record => record.id === parseInt(req.params.id));

    if(!dltRF) return res.status(404).send("Red-flag Record with the given ID was not found");

    //Delete
    const index = RedFlags.indexOf(dltRF);
    RedFlags.splice(index,1);

    const d = [];
    const obj={
                id: dltRF.id,
                message: "Red-flag record has been deleted"
              };
    d.push(obj);

    return res.status(200).json({
      status:200,
      data:d
    });
  }

  /*Templates*/
  //Home Page
  static home(req, res){
    res.render('landingPage.pug', {title:"Broadcaster Home", message:"Broadcaster"});
  }
  //All Redflags template
  static viewAllRedflags(req, res){
    res.render('allRF_Records.pug', {title:"Broadcaster All Red Flags", message:"All Red-Flag Records", RedFlags:RedFlags});
  }
  //Load Create Form template
  static createRF2(req, res){
    res.render('addRedflag.pug', {title:"Broadcaster Create Red Flags", message:"Create New Red-Flag Record"});
  }
  //Post Created Redflag
  static createRF3(req, res){
    const user = Credentials.find(uid => uid.id === parseInt(req.params.id));
    const redFlag = {
      id: parseInt(RedFlags.length) + 1,
      createdOn: moment.utc().format("DD/MM/YYYY  HH:mm:ss"),
      createdBy:user,
      title: req.body.title,
      type: "Red Flag Record",
      location: req.body.location,
      status: "Draft",
      imageFile: req.body.imageFile,
      videoFile: req.body.videoFile,
      comment: req.body.comment
    }
    RedFlags.push(redFlag);
    console.log("Submitted");
    return;
    // res.redirect('/');
  }
  //Load Edit Form template
  static specificRF2(req, res){
      const specificRedflag = RedFlags.find(specRF => specRF.id === parseInt(req.params.id));
      res.render('editRedflag.pug', {title:"Broadcaster Edit Red Flags", message:"Edit This Red-Flag Record", RedFlags:RedFlags});
  }
  //Update Redlfag Record(s)
  static editRF(req, res){
    const rfData = RedFlags.find(loc => loc.id === parseInt(req.params.id));

    //Updates
    rfData.title = req.body.title;
    rfData.comment = req.body.comment;
    rfData.imageFile = req.body.imageFile;
    rfData.videoFile = req.body.videoFile;
    rfData.location = req.body.location;
      
    console.log("Saved");
    return;
  }
  //Load Delete Form template
  static specificRF3(req, res){
      const specificRedflag = RedFlags.find(specRF => specRF.id === parseInt(req.params.id));
      res.render('deleteRedflag.pug', {title:"Broadcaster Delete Red Flags", message:"Delete This Red-Flag Record", 
        message2:"You Wont Be Able To Undo This Record After Deletion!", message3:"Do You Realy Want To Delete This Record?", 
        message4:"Deleting Red-Flag Record ...", RedFlags:RedFlags});
  }
  static delete_rf(req, res){
    const dltRF = RedFlags.find(record => record.id === parseInt(req.params.id));

    //Delete
    const index = RedFlags.indexOf(dltRF);
    RedFlags.splice(index,1);
    console.log("Record Deleted")
    res.render('deleteRedflag.pug', {RedFlags:RedFlags});
  }
  //Admin Dashboard
  static admin(req, res){
    res.render('adminPanel.pug', {title:"Broadcaster Dashboard", Credentials:Credentials, RedFlags:RedFlags, Status:Status});
  }
  //SignUp view
  static signUpView(req, res){
    res.render('signUp.pug', {title:"Broadcaster Register"});
  }
  //SignIn view
  static signInView(req, res){
    res.render('signIn.pug', {title:"Broadcaster Login"});
  }
  //Profile view
  static profileView(req, res){
    res.render('userProfile.pug', {title:"Broadcaster User Profile", Credentials:Credentials, RedFlags:RedFlags, Status:Status});
  }
}

export default redflagsController;

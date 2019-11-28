import Interventions from "../models/interventions";
import moment from "moment";

class intervController {
  
  static createINTV(req, res){
    const interv = {
      id: parseInt(Interventions.length) + 1,
      createdOn: moment.utc().format("DD/MM/YYYY  HH:mm:ss"),
      // createdBy:req.body.id,
      title: req.body.title,
      type: "Intervention Record",
      location: req.body.location,
      status: "Draft",
      imageFile: req.body.imageFile,
      videoFile: req.body.videoFile,
      comment: req.body.comment
    }
    Interventions.push(interv);

    const a = [];
    const obj={
                id: interv.id,
                message: "Created intervention record"
              };
    a.push(obj);

    return res.status(201).json({
      status:201,
      data:a
    });
  }

  static allINTV(req, res){
    return res.status(200).json({
      status: 200,
      message: "All Interventions Records",
      data: Interventions
    });
  }
  static specificINTV(req, res){
      const specificInterv= Interventions.find(specINTV => specINTV.id === parseInt(req.params.id));

      if(!specificInterv) return res.status(404).send("Intervention Record with the given ID was not found");
    
      return res.status(200).json({
      status:200,
      data:specificInterv
    });
  }

  static editLocation(req, res){
      const place = Interventions.find(loc => loc.id === parseInt(req.params.id));

      if(!place) return res.status(404).send("Intervention Record with the given ID was not found");

      // validate, if invalid return 400 Bad Request
      if(!req.body.location)
        return res.status(400).send('Location required');
      //Updates
      place.location = req.body.location;
      
      const b = [];
      const obj={
                id: place.id,
                message: "Updated intervention record’s location"
              };
      b.push(obj);

      return res.status(200).json({
      status:200,
      data:b
    });
  }

  static editComment(req, res){
    const comment = Interventions.find(description => description.id === parseInt(req.params.id));

    if(!comment) return res.status(404).send("Intervention Record with the given ID was not found");

    // validate, if invalid return 400 Bad Request
    if(!req.body.comment) return res.status(400).send('Comment required');
      
    //Updates
    comment.comment = req.body.comment;

    const c = [];
    const obj={
                id: comment.id,
                message: "Updated intervention record’s comment"
              };
    c.push(obj);

    return res.status(200).json({
      status:200,
      data: c 
    });
  }

  static deleteINTV(req, res){
    const dltINTV = Interventions.find(record => record.id === parseInt(req.params.id));

    if(!dltINTV) return res.status(404).send("Intervention Record with the given ID was not found");

    //Delete
    const index = Interventions.indexOf(dltINTV);
    Interventions.splice(index,1);
    
    const d = [];
    const obj={
                id: dltINTV.id,
                message: "Intervention record has been deleted"
              };
    d.push(obj);

    return res.status(200).json({
      status:200,
      data:d
    });
  }
}

export default intervController;

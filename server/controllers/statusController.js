import Status from "../models/status";

class statusController {
  
  static status(req, res){
    const selectElement = {
      status:req.body.selectid
    }
    Status.push(selectElement);
    console.log(req.body.selectid);
  }
}
export default statusController;

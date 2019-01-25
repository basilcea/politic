import parties from "../models/party";

class partyController{
  static createParty(req,res){
    //create a political
    if (!req.body.name) {
      return res.status(400).send({
        "status":400 ,
        "error": " name is required"
      });
    }
    if (!req.body.hqAddress){
      return res.status(400).send({
        "status": 400,
        "error": "Headquaters's address is required"
      });
    }
    const party = {
      "id": parties.length + 1,
      "name": req.body.name ,
      "AKA": req.body.AKA ,
      "hqAddress" : req.body.hqAddress,
      "logoUrl": req.body.logoUrl
    }
    parties.push(party);
    if(party){
      return res.status(201).send({
        "status": 201,
        "data": [party],
        "message":"You have added a political party"
      });
    }
    return res.status(500).send({
      "status": 500,
      'error':"Something Failed"
    });
  }

}
export default partyController ;
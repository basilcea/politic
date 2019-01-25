import parties from "../models/party";

class partyController{
  static createParty(req,res){
    //create a political party

    // check if name is provided
    if (!req.body.name) {
      return res.status(412).send({
        "status":412 ,
        "error": " name is required"
      });
    }
    // check if headquaters address is provided
    if (!req.body.hqAddress){
      return res.status(412).send({
        "status": 412,
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
    // add party details to the data structure
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
  static getAllParties(req,res){
    if(parties){
       return res.status(200).send({
        "status": 200,
        "data" :[parties],
        "message": 'parties retrieved successfully'
      });
    }
    else if (!parties) {
      return res.status(400).send({
        "status":400,
        "error": 'parties not found',
      })
    };
    return res.status(500).send({
      "status":500,
      "error":"parties can not be gotten, Try again"
    })
  }
  static getParty(req, res) {
    //force all id string to integer
    const id = parseInt(req.params.id, 10);

    parties.filter((party) => {
      if (party.id === id) {
          return res.status(200).send({
            "status": 200,
            "data": [party],
            "message":"Political party retrieved succesfully"
          });
      }
    });
    res.status(404).send({
      "status": 404,
      "error": 'Party does not exist',
    });
    res.status(500).send({
      "status": 500,
      "error": 'Server Error',
    });

  }


}
export default partyController ;

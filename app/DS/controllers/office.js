import offices from "../models/office";

class officeController{

  static createOffice(req,res){
    //create a political office

    // check if type  is provided
    if (!req.body.type) {
      return res.status(412).send({
        "status":412 ,
        "error": "type of office is required"
      });
    }
    const office = {
      "id": offices.length + 1,
      "type": req.body.type ,
      "name": req.body.name
    }
    // add party details to the data structure
    offices.push(office);
    if(office){
      return res.status(201).send({
        "status": 201,
        "data": [office],
        "message":"You have added a political office"
      });
    }
    return res.status(500).send({
      "status": 500,
      'error':"Something Failed"
    });
  };
}



export default officeController ;

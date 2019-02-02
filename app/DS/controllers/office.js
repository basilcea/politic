import offices from '../models/office';

/** Class representing controllers for offices endpoints */
class officeController {
  /**
  * Create an office
  * @param {string} - name of office
  * @param {string} - type of office
  */
  static createOffice(req, res) {
    // check if type  is provided
    const {id, type, name} = req.body;
    if (!req.body.type) {
      return res.status(412).send({
<<<<<<< HEAD
        "status":412 ,
        "error": "type of office is required"
      });
    }
    if (!req.body.name) {
      return res.status(412).send({
        "status":412 ,
        "error": "name of office is required"
      });
    }
=======
        "status": 412,
        "error": 'type of office is required'
      });}
    if(/^[a-zA-Z]+$/.test(type)===false){
      return res.status(406).send({
        "status":406,
        "error": 'name must be alphabets only'
      })}
    // check if name of office is provided
    if (!req.body.name) {
      return res.status(412).send({
        "status": 412,
        "error": 'name of office is required'
      });}
    if(/^[a-zA-Z]+$/.test(name)===false){
      return res.status(406).send({
        "status":406,
        "error": 'name must be alphabets only'
      })}
>>>>>>> ft-get-office-endpiont-163405998
    const office = {
      "id": offices.length + 1,
      "type": type,
      "name": name
    };
    /**

    * Add the office object to the the data array
    * create an  unique id
    * @return {object} - The office object

    */
    offices.push(office);
    if (office) {
      return res.status(201).send({
        "status": 201,
        "data": office,
<<<<<<< HEAD
        "message":"You have added a political office"
      });
    }
  };
=======
        "message": 'You have added a political office'
      });
    }
  }
>>>>>>> ft-get-office-endpiont-163405998

   /**
  * Get all offices
  * @return {object} - array of all offices
  */
  static getAllOffices(req, res) {
    if (offices) {
      return res.status(200).send({
        "status": 200,
<<<<<<< HEAD
        "data" :offices,
=======
        "data": offices,
>>>>>>> ft-get-office-endpiont-163405998
        "message": 'offices retrieved successfully'
      });
    }
    if (!offices) {
      return res.status(400).send({
<<<<<<< HEAD
        "status":400,
        "error": 'offices does not exist',
      })
    };
  };
=======
        "status": 400,
        "error": 'offices does not exist'
      });
    }
  }

   /**
  * Get an office
  * @param {integer} - id of the office
  * @return {object} -An office with the id
  */
>>>>>>> ft-get-office-endpiont-163405998

  static getOffice(req, res) {
    // force all id string to integer
    const id = parseInt(req.params.id, 10);
    let officeFound;
    offices.filter((office) => {
      if (office.id === id) {
        officeFound = office;
        return res.status(200).send({
          "status": 200,
          "data": office,
<<<<<<< HEAD
          "message":"Political office retrieved succesfully"
=======
          "message": 'Political office retrieved succesfully'
>>>>>>> ft-get-office-endpiont-163405998
        });
      }
    });
    // if no such office with that id
    if (!officeFound) {
      res.status(404).send({
        "status": 404,
        "error": 'Office Not Found'
      });
    }
  }
}


export default officeController ;

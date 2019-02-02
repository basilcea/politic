import parties from '../models/party';
/** Class representing controllers for parties endpoints */

class partyController {
  /**
  * Create an office
  * @param {string} - name of office
  * @param {string} - hqAddress of office
  */

  static createParty(req, res) {
    const {id, name, AKA, hqAddress, logoUrl} = req.body;
      // check if name is provided
    if (!name) {
      return res.status(412).send({
        "status":412,
        "error": " name is required"
      });
    }
    // check if name is an alphabet
    if(/^[a-zA-Z]+$/.test(name)===false){
      return res.status(406).send({
        "status":406,
        "error": 'name must be alphabets only'
      })
    }
    // check if headquaters address is provided
    if (!hqAddress) {
      return res.status(412).send({
        "status": 412,
        "error": "Headquaters's address is required"
      });
    }
    const party = {
      "id": parties.length + 1,
      "name": name,
      "AKA": AKA,
      "hqAddress": hqAddress,
      "logoUrl": logoUrl
    };
    /**

    * Add the part object to the the data array
    * create an  unique id
    * @return {object} - The party object

    */
    parties.push(party);
<<<<<<< HEAD
      return res.status(201).send({
        "status": 201,
        "data": party,
        "message":"You have added a political party"
      });
  }

  static getAllParties(req,res){
    if(parties){
       return res.status(200).send({
        "status": 200,
        "data" :parties,
=======
    return res.status(201).send({
      "status": 201,
      "data": party,
      "message": 'You have added a political party'
    });
  }

   /**
  * Get all parties
  * @return {object} - array of all parties with the status code
  */

  static getAllParties(req, res) {
    if (parties) {
      return res.status(200).send({
        'status': 200,
        "data": parties,
>>>>>>> ft-get-office-endpiont-163405998
        "message": 'parties retrieved successfully'
      });
    }
    if (!parties) {
      return res.status(400).send({
        "status":400,
        "error": 'parties does not exist'
      })
    };
  }

  /**
  * Get a party
  * @param {integer} - id of the party
  * @return {object} -An party that has that id  with the status code
  */

  static getParty(req, res) {
    // force all id string to integer
    const id = parseInt(req.params.id, 10);
    let partyFound;
    parties.filter((party) => {
      if (party.id === id) {
        partyFound = party;
        return res.status(200).send({
          "status": 200,
          "data": party,
<<<<<<< HEAD
          "message":"Political party retrieved succesfully"
=======
          "message": 'Political party retrieved succesfully'
>>>>>>> ft-get-office-endpiont-163405998
        });
      }
    });
    if (!partyFound) {
      return res.status(404).send({
        "status": 404,
        "error": 'Party Not Found',
      })
    }
  }
  /**
  * Delete a party
  * @param {integer} - id of the party
  * @return {object} -An object with status code and message
  */

  static deleteParty(req, res) {
    const id = parseInt(req.params.id, 10);
    let partyFound;
    parties.filter((party, index) => {
      if (party.id === id) {
        partyFound = party;
        parties.splice(index, 1);
        return res.status(200).send({
          "status": 200,
          "data": {
<<<<<<< HEAD
            "message":"party deleted successfully"
=======
            "message": 'party deleted successfully'
>>>>>>> ft-get-office-endpiont-163405998
          }
        });
      }
    });
    if (!partyFound) {
      return res.status(404).send({
        "status": 404,
        "error": 'party does not exist'
      });
    }
<<<<<<< HEAD
  };
=======
  }
   /**
  * Edit party name
  * @param {integer} - id of the party
  * @return {object} -An party that has has a new name
  */
>>>>>>> ft-get-office-endpiont-163405998

  static editPartyName(req, res) {
    const id = parseInt(req.params.id, 10);
    let partyFound;
    parties.filter((party, index) => {
      if (party.id === id) {
        partyFound = party;
        partyFound.name = req.body.name || partyFound.name;
        if(/^[a-zA-Z]+$/.test(partyFound.name)===false){
          return res.status(406).send({
            "status":406,
            "error": 'name must be alphabets only'
          });}
        return res.status(201).send({
<<<<<<< HEAD
          'status': 201,
          'data': {
            'id': partyFound.id,
            'name': partyFound.name
          },
          "party": partyFound,
          'message':'Party Name edited'
        })
      }
    })
=======
          "status": 201,
          "data": {
            "id": partyFound.id,
            "name": partyFound.name
          }, "message": 'Party Name edited'
        });}
    });
>>>>>>> ft-get-office-endpiont-163405998
    if (!partyFound) {
      return res.status(404).send({
        'status': 404,
        "error": 'Party does not exist'
      });
    }
  }
}

export default partyController;

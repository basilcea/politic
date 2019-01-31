import offices from '../models/office';

class officeController {
  static createOffice(req, res) {
    // create a political office

    // check if type  is provided
    if (!req.body.type) {
      return res.status(412).send({
        status: 412,
        error: 'type of office is required'
      });
    }
    if (!req.body.name) {
      return res.status(412).send({
        status: 412,
        error: 'name of office is required'
      });
    }
    const office = {
      id: offices.length + 1,
      type: req.body.type,
      name: req.body.name
    };
    // add party details to the data structure
    offices.push(office);
    if (office) {
      return res.status(201).send({
        status: 201,
        data: office,
        message: 'You have added a political office'
      });
    }
  }

  static getAllOffices(req, res) {
    if (offices) {
      return res.status(200).send({
        status: 200,
        data: offices,
        message: 'offices retrieved successfully'
      });
    }
    if (!offices) {
      return res.status(400).send({
        status: 400,
        error: 'offices does not exist'
      });
    }
  }

  static getOffice(req, res) {
    // force all id string to integer
    const id = parseInt(req.params.id, 10);
    let officeFound;
    offices.filter(office => {
      if (office.id === id) {
        officeFound = office;
        return res.status(200).send({
          status: 200,
          data: office,
          message: 'Political office retrieved succesfully'
        });
      }
    });
    if (!officeFound) {
      res.status(404).send({
        status: 404,
        error: 'Office Not Found'
      });
    }
  }
}

export default officeController;

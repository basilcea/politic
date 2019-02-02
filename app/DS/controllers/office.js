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
        "message": 'You have added a political office'
      });
    }
  }
}


export default officeController ;

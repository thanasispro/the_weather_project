let selectService = require('../service/selects.service.js')
   
exports.get_collected_cities = async(req, res) => {
    try {
     let result = await selectService.selectData()
     console.log(result)
     res.send(result)
    } catch (err) {
      console.error(err);
      res.status(400).send("Cannot retrieve saved cities");
    }
  };
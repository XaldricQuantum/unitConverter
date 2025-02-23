'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const units = ["gal", "l", "mi", "km", "lbs", "kg"]
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    console.log("api post route");
    
    let input = req.query.input.toLowerCase();
    console.log(input);
    if (/\s/.test(input)) {
      console.log("invalid number and unit");
      return res.send('invalid number and unit')
    } else if (units.some(unit => input.includes(unit))) {
      const regexUnit = new RegExp(units.join('|', 'g'));
      console.log(regexUnit);
      
      const parts = input.split(regexUnit);
      console.log(parts);
      console.log(`length ${parts.length}`);
      
      if (parts.length > 2 ) {
        return res.send('invalid unit')
      } else {
        try {
          const nums = parts[0].split('/');
          if (nums.length > 2) {
            return res.send('invalid number');
          } else if (nums.length === 2) {
            let num = nums[0] / nums[1];
          }
          
        } catch (err) {
          console.log(err);
          
        }
      }
      
    }
    
    console.log(convertHandler.getNum(input));
    console.log(convertHandler.getUnit(input));
    const initNum = convertHandler.getNum(input);
    const initUnit = convertHandler.getUnit(input);
    const returnNum = convertHandler.convert(initNum, initUnit);
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    let result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    console.log("result:", result);
    
    return res.json(result);
  })

};

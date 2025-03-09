'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  const units = ["gal", "lbs", "mi", "km", "l", "kg"]
  let convertHandler = new ConvertHandler();
  app.route('/api/convert').get((req, res) => {
    console.log("api get route");
    
    let input = req.query.input.toLowerCase();
    let invalidResult = "";
    console.log(input);
    if (/\s/.test(input)) {
      console.log("invalid number and unit");
      return res.send('invalid number and unit')
    } else if (units.some(unit => input.includes(unit))) {
      const regexUnit = new RegExp(units.join('|', 'g'));
      console.log(regexUnit);
      
      const parts = input.split(regexUnit);
      console.log(parts);
      console.log(`-> 24 length ${parts.length}`);
      console.log(parts[-1]);
      
      
      if (parts.length > 2 || parts[parts.length - 1] !== "") {
        invalidResult = 'invalid unit';
        console.log(invalidResult);
        
        // return res.send('invalid unit')
      }
      try {
        const nums = parts[0].split('/');
        console.log(`-> 34 ${nums}`);
        console.log(nums);
        
        
        if (nums.length > 2) {
          invalidResult = invalidResult ? invalidResult = `invalid number and unit` : 'invalid number'
          // return res.send('invalid number');
          console.log("-> 39 invalid number");
          
          console.log(invalidResult);
          
        } else if (nums.length === 2) {
          let num = nums[0] / nums[1];
        }
        if (invalidResult !== "") {
          return res.send(invalidResult)
        }
        
      } catch (err) {
        console.log(err);
        
      }
      
      
    }
    
    console.log(convertHandler.getNum(input));
    console.log(convertHandler.getUnit(input));
    const initNum = convertHandler.getNum(input);    
    const initUnit = convertHandler.getUnit(input);
    const returnNum = Number((convertHandler.convert(initNum, initUnit)).toFixed(5));
    console.log(Number(returnNum.toFixed(5)));
    
    const returnUnit = convertHandler.getReturnUnit(initUnit);

    let result = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
    console.log("result:", result);
    
    return res.json(result);
  })

};

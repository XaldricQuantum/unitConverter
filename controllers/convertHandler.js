function ConvertHandler() {
  
  // const regexNum = /^(\d*\.?\d+)?\s*(.*)/;

  const regexUnit = /(gal|lbs|mi|km|l|kg)$/;
  const numRegex = /\d/;
  const onlyNumRegex = /[^0-9/.]/g;

  this.getNum = function(input) {
    let result;
    const match = input.split(regexUnit);
    console.log(`getNum: ${match[0]}`);
    if (onlyNumRegex.test(match[0]) || match[0] === "") {        
      result = match[0] ? parseFloat(match[0]) : 1;
      console.log('get num match', match);
      
    } else if (match[0]) {
      // if ()
      try {
        
        if ((match[0].split("/").length) > 2) {
          console.log("return error");
          
          // a = b;
          throw new Error;
  
        }
      } catch (e) {
        // console.error( "error bad number");
        console.log(e.message);
        
        throw e;
      }
      result = match[0].includes("/") ? parseFloat(match[0].split("/")[0])/parseFloat(match[0].split("/")[1]) : Number(Number(match[0]).toFixed(5));
    }
    
    return parseFloat(result.toFixed(5));
  };
  
  this.getUnit = function(input) {
    let result;
    const match = input.match(regexUnit);
    const parts = input.split(regexUnit);
    console.log('input:', input);
    console.log('getUnit parts:', parts);
    
    // console.log('getUnit');
    console.log(`getUnit: ${match}`);
    try {
      
      if (numRegex.test(match)) {
        result = false;
      } else {
        result = match[0];
        if (result === "l" ) {
          return "L";
        }
        if (result === null || result === false) {
          throw new Error;
        }
      }
    } catch (e) {
      throw e;
    }
    // console.log(result);
    
    return result;
  };
  
  this.getReturnUnit = function(initUnit) {
    let result;
    switch (initUnit) {
      case "gal":
        result = "L";
        break;
      case "l":
        result = "gal";
        break;
      case "L":
        result = "gal";
        break;
      case "kg":
        result = "lbs";
        break;
      case "lbs":
        result = "kg";
        break;
      case "mi":
        result = "km";
        break;
      case "km":
        result = "mi";
        break;
      default:
        result = "invalid unit"
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    switch (unit) {
      case "gal":
        result = "gallons";
        break;
      case "l":
        result = "liters";
        break;
      case "km":
        result = "kilometers";
        break;
      case "mi":
        result = "miles";
        break;
      case "kg":
        result = "kilograms";
        break;
      case "lbs":
        result = "pounds";
        break
      case "L":
        result = "liters";
        break;
      default:
        result = "invalid unit";
        break;

    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case "gal":
        result = initNum * galToL;
        break;
      case "L":
        result = initNum / galToL;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "km":
        result = initNum / miToKm;
        break
      default:
        result = "invalid conversion";
        break;
    }
    return result;
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    result = {initNum: initNum, initUnit: initUnit, returnNum: returnNum, returnUnit: returnUnit, 
      string: `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`}
    
    return result;
  };
  
}

module.exports = ConvertHandler;

const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    test('should correctly read a whole number input', function () {
        assert.equal(convertHandler.getNum("32kg"), 32);
    });
    test('should correctly read a decimal number input', function () {
        assert.equal(convertHandler.getNum("3.5mi"), 3.5);
    });
    test('should correctly read a fractional input', function () {
        assert.equal(convertHandler.getNum("1/2gal"), 0.5);
    });
    test('should correctly read a fractional input with a decimal', function () {
        assert.equal(convertHandler.getNum("2.5/5lbs"), 0.5);
    });
    test('should return an error on a double-fraction', function () {
        assert.throws(() => convertHandler.getNum("3/2/3kg"), Error);
    });
    test(' should correctly default to a numerical input of 1 when no numerical input is provided.', function () {
        assert.equal(convertHandler.getNum("kg"), 1);
    });
    test('should correctly read each valid input unit.', function () {
        assert.equal(convertHandler.getUnit("3.5mi"), "mi");
        assert.equal(convertHandler.getUnit("3.5kg"), "kg");
        assert.equal(convertHandler.getUnit("3.5l"), "L");
        assert.equal(convertHandler.getUnit("3.5gal"), "gal");
        assert.equal(convertHandler.getUnit("3.5km"), "km");
        assert.equal(convertHandler.getUnit("3.5lbs"), "lbs");
    });
    test('should correctly return an error for an invalid input unit', function () {
        assert.throws(() => convertHandler.getUnit("min"), Error);
    });
    test('should return the correct return unit for each valid input unit', function () {
        assert.equal(convertHandler.getReturnUnit("mi"), "km");
        assert.equal(convertHandler.getReturnUnit("kg"), "lbs");
        assert.equal(convertHandler.getReturnUnit("l"), "gal");
        assert.equal(convertHandler.getReturnUnit("gal"), "L");
        assert.equal(convertHandler.getReturnUnit("km"), "mi");
        assert.equal(convertHandler.getReturnUnit("lbs"), "kg");
    });
    test('should correctly return the spelled-out string unit for each valid input unit', function () {
        assert.equal(convertHandler.spellOutUnit("mi"), "miles");
        assert.equal(convertHandler.spellOutUnit("kg"), "kilograms");
        assert.equal(convertHandler.spellOutUnit("l"), "liters");
        assert.equal(convertHandler.spellOutUnit("gal"), "gallons");
        assert.equal(convertHandler.spellOutUnit("km"), "kilometers");
        assert.equal(convertHandler.spellOutUnit("lbs"), "pounds");
    });
    test('should correctly convert gal to L', function () {
        assert.approximately(convertHandler.convert(1, "gal"), 3.78541, 0.00001)
    });
    test('should correctly convert L to gal', function () {
        assert.approximately(convertHandler.convert(1, "l"), 0.26417, 0.00001);
    });
    test('should correctly convert mi to km', function () {
        assert.approximately(convertHandler.convert(1, "mi"), 1.60934, 0.00001);
    });
    test('should correctly convert km to mi', function () {
        assert.approximately(convertHandler.convert(1, "km"), 0.62137, 0.00001);
    });
    test('should correctly convert lbs to kg', function () {
        assert.approximately(convertHandler.convert(1, "lbs"), 0.45359, 0.00001);
    });
    test('should correctly convert kg to lbs', function () {
        assert.approximately(convertHandler.convert(1, "kg"), 2.20462, 0.00001);
    });
});
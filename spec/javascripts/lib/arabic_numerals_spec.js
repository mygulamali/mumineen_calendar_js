(function () {
  "use strict";

  describe("ArabicNumerals", function () {
    describe("fromInteger", function () {
      it("expects to convert 7 into the equivalent UTF-8 Arabic numeral string", function () {
        expect(ArabicNumerals.fromInteger(7)).toEqual("\u0667");
      });

      it("expects to convert 21 into the equivalent UTF-8 Arabic numeral string", function () {
        expect(ArabicNumerals.fromInteger(21)).toEqual("\u0662\u0661");
      });

      it("expects to convert Pi into the UTF-8 Arabic numeral string for 3", function () {
        expect(ArabicNumerals.fromInteger(Math.PI)).toEqual("\u0663");
      });
    });
  });
})();

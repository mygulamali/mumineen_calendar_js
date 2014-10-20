/** @jsx React.DOM */
(function () {
  "use strict";

  function createDayObject(hijriDate) {
    var gregorianDate = hijriDate.toGregorian();
    return {
      hijri: {
        year: hijriDate.getYear(),
        month: hijriDate.getMonth(),
        date: hijriDate.getDate()
      },
      gregorian: {
        year: gregorianDate.getFullYear(),
        month: gregorianDate.getMonth(),
        date: gregorianDate.getDate()
      },
      ajd: hijriDate.toAJD()
    };
  }

  describe("CalendarDay", function () {
    var key,
        day,
        today,
        instance;

    afterEach(function () {
      if (instance && instance.isMounted()) {
        instance.unmountComponent();
      }
    });

    describe("gregorianDateString", function () {
      beforeEach(function () {
        today = new HijriDate(1432, 3, 20);
      });

      describe("when the calendar day is at the beginning of the Hijri month", function () {
        beforeEach(function () {
          key = "1432-3-1";
          day = createDayObject(new HijriDate(1432, 3, 1));
          instance = TestUtils.renderIntoDocument(<CalendarDay key={key} day={day} today={today} />);
        });

        it("expects to return the Gregorian date, month and year", function () {
          expect(instance.gregorianDateString()).toEqual("6 Mar 2011");
        });
      });

      describe("when the calendar day is a filler day.", function () {
        beforeEach(function () {
          key = "1432-2-30";
          day = createDayObject(new HijriDate(1432, 2, 30));
          day['filler'] = true;
          instance = TestUtils.renderIntoDocument(<CalendarDay key={key} day={day} today={today} />);
        });

        it("expects to return the Gregorian date", function () {
          expect(instance.gregorianDateString()).toEqual("5");
        });
      });

      describe("when the calendar day is not at the beginning of the Hijri month or a filler day", function () {
        describe("when the Gregorian day is at the beginning of the Gregorian month", function () {
          beforeEach(function () {
            key = "1432-3-27";
            day = createDayObject(new HijriDate(1432, 3, 27));
            instance = TestUtils.renderIntoDocument(<CalendarDay key={key} day={day} today={today} />);
          });

          it("expects to return the Gregorian date and month", function () {
            expect(instance.gregorianDateString()).toEqual("1 Apr");
          });
        });

        describe("when the Gregorian day is at the beginning of the Gregorian year", function () {
          beforeEach(function () {
            key = "1432-0-26";
            day = createDayObject(new HijriDate(1432, 0, 26));
            instance = TestUtils.renderIntoDocument(<CalendarDay key={key} day={day} today={today} />);
          });

          it("expects to return the Gregorian date, month and year", function () {
            expect(instance.gregorianDateString()).toEqual("1 Jan 2011");
          });
        });

        describe("when the Gregorian day is not at the beginning of the Gregorian month or year", function () {
          beforeEach(function () {
            key = "1432-3-20";
            day = createDayObject(new HijriDate(1432, 3, 20));
            instance = TestUtils.renderIntoDocument(<CalendarDay key={key} day={day} today={today} />);
          });

          it("expects to return the Gregorian date", function () {
            expect(instance.gregorianDateString()).toEqual("25");
          });
        });
      });
    });
  });
})();

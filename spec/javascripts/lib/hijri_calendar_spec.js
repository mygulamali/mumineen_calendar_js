(function () {
  "use strict";

  describe("HijriCalendar", function () {
    describe("dayOfWeek", function () {
      describe("when the first day of the week is Sunday", function () {
        it("expects 4th Rabi al-Aakhar 1432H to be on Friday", function () {
          var calendar = new HijriCalendar(1432, 4);
          expect(calendar.dayOfWeek(20)).toBe(5);
        });
      });

      describe("when the first day of the week is Monday", function () {
        it("expects 4th Rabi al-Aakhar 1432H to be on Friday", function () {
          var calendar = new HijriCalendar(1432, 4, true);
          expect(calendar.dayOfWeek(20)).toBe(4);
        });
      });
    });

    describe("previousMonth", function () {
      describe("when the month is greater than 0", function () {
        it("expects to subtract 1 from the month", function () {
          var calendar = new HijriCalendar(1432, 3);
          expect(calendar.previousMonth().getMonth()).toBe(2);
        });
      });

      describe("when the month is 0", function () {
        var calendar;

        beforeEach(function () {
          calendar = (new HijriCalendar(1432, 0)).previousMonth();
        });

        it("expects to set the month to 11", function () {
          expect(calendar.getMonth()).toBe(11);
        });

        it("expects to subtract 1 from the year", function () {
          expect(calendar.getYear()).toBe(1431);
        });
      });
    });

    describe("nextMonth", function () {
      describe("when the month is less than 11", function () {
        it("expects to add 1 to the month", function () {
          var calendar = new HijriCalendar(1432, 3)
          expect(calendar.nextMonth().getMonth()).toBe(4);
        });
      });

      describe("when the month is 11", function () {
        var calendar;

        beforeEach(function () {
          calendar = (new HijriCalendar(1432, 11)).nextMonth();
        });

        it("expects to set the month to 0", function () {
          expect(calendar.getMonth()).toBe(0);
        });

        it("expects to add 1 to the year", function () {
          expect(calendar.getYear()).toBe(1433);
        });
      });
    });

    describe("previousYear", function () {
      describe("when the year is greater than MIN_CALENDAR_YEAR", function () {
        it("expects to subtract 1 from the year", function () {
          var calendar = new HijriCalendar(1432, 3);
          expect(calendar.previousYear().getYear()).toEqual(1431);
        });
      })

      describe("when the year is MIN_CALENDAR_YEAR", function () {
        it("expects the year to remain the same", function () {
          var calendar = new HijriCalendar(HijriCalendar.getMinYear(), 3),
              calendarPreviousYear = calendar.previousYear();
          expect(calendarPreviousYear.getYear()).toEqual(calendar.getYear());
        });
      });
    });

    describe("nextYear", function () {
      describe("when the year is less than MAX_CALENDAR_YEAR", function () {
        it("expects to add 1 to the year", function () {
          var calendar = new HijriCalendar(1432, 3);
          expect(calendar.nextYear().getYear()).toEqual(1433);
        });
      });

      describe("when the year is MAX_CALENDAR_YEAR", function () {
        it("expects the year to remain the same", function () {
          var calendar = new HijriCalendar(HijriCalendar.getMaxYear(), 3),
              calendarNextYear = calendar.nextYear();
          expect(calendarNextYear.getYear()).toEqual(calendar.getYear());
        });
      });
    });
  });
})();

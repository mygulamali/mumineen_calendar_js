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

    describe("iconClassName", function () {
      var key,
          day,
          today,
          miqaats,
          instance;

      beforeEach(function () {
        today = new HijriDate(1432, 3, 20);
        miqaats = [
          {
            "month": 0,
            "date": 1,
            "miqaats": [
              {
                "title": "Miqaat 1",
                "description": null,
                "phase": "day",
                "priority": 1,
                "year": 1436
              }
            ]
          },
          {
            "month": 0,
            "date": 2,
            "miqaats": [
              {
                "title": "Miqaat 2",
                "description": null,
                "phase": "night",
                "priority": 1,
                "year": 1436
              },
              {
                "title": "Miqaat 3",
                "description": "A description",
                "phase": "day",
                "priority": 3,
                "year": null
              }
            ]
          },
          {
            "month": 0,
            "date": 3,
            "miqaats": [
              {
                "title": "Miqaat 4",
                "description": "Another description",
                "phase": "day",
                "priority": 3,
                "year": null
              }
            ]
          }
        ]
      });

      afterEach(function () {
        if (instance && instance.isMounted()) {
          instance.unmountComponent();
        }
      });

      describe("when the calendar day is a filler day", function () {
        beforeEach(function () {
          key = "1436-0-1";
          day = createDayObject(new HijriDate(1436, 0, 1));
          day.filler = true;
          instance = TestUtils.renderIntoDocument(
            <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
          );
        });

        it("expects to return null", function () {
          expect(instance.iconClassName()).toEqual(null);
        });
      });

      describe("when there are no miqaats for the calendar day", function () {
        beforeEach(function () {
          key = "1436-0-4";
          day = createDayObject(new HijriDate(1436, 0, 4));
          instance = TestUtils.renderIntoDocument(
            <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
          );
        });

        it("expects to return null", function () {
          expect(instance.iconClassName()).toEqual(null);
        });
      });

      describe("when there are miqaats for the calendar day", function () {
        describe("when the first miqaat is of priority 1 and takes place in the day", function () {
          beforeEach(function () {
            key = "1436-0-1";
            day = createDayObject(new HijriDate(1436, 0, 1));
            instance = TestUtils.renderIntoDocument(
              <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
            );
          });

          it("expects to return the classname for the Sun icon", function () {
            expect(instance.iconClassName()).toEqual("icon-sun");
          });
        });

        describe("when the first miqaat is of priority 1 and takes place in the night", function () {
          beforeEach(function () {
            key = "1436-0-2";
            day = createDayObject(new HijriDate(1436, 0, 2));
            instance = TestUtils.renderIntoDocument(
              <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
            );
          });

          it("expects to return the classname for the Moon icon", function () {
            expect(instance.iconClassName()).toEqual("icon-moon");
          });
        });

        describe("when the first miqaat is a priority greater than 1", function () {
          beforeEach(function () {
            key = "1436-0-3";
            day = createDayObject(new HijriDate(1436, 0, 3));
            instance = TestUtils.renderIntoDocument(
              <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
            );
          });

          it("expects to return the classname for the dot icon", function () {
            expect(instance.iconClassName()).toEqual("icon-circle");
          });
        });

        describe("when the year of the first miqaat is after the year of the calendar day", function () {
          describe("when there are no other valid miqaats on the calendar day", function () {
            beforeEach(function () {
              key = "1435-0-1";
              day = createDayObject(new HijriDate(1435, 0, 1));
              instance = TestUtils.renderIntoDocument(
                <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
              );
            });

            it("expects to return null", function () {
              expect(instance.iconClassName()).toEqual(null);
            });
          });

          describe("when there is another valid miqaat on the calendar day", function () {
            beforeEach(function () {
              key = "1435-0-2";
              day = createDayObject(new HijriDate(1435, 0, 2));
              instance = TestUtils.renderIntoDocument(
                <CalendarDay key={key} day={day} today={today} miqaats={miqaats} />
              );
            });

            it("expects to return the classname for the next valid miqaat", function () {
              expect(instance.iconClassName()).toEqual("icon-circle");
            });
          });
        });
      });
    });
  });
})();

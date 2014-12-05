/** @jsx React.DOM */
(function () {
  "use strict";

  describe("Calendar", function () {
    var instance,
        mockMiqaats;

    beforeEach(function () {
      mockMiqaats = [
        {
          "month": 0,
          "date": 1,
          "miqaats": [
            {
              "title": "Hijri New Year",
              "description": null,
              "phase": "day",
              "priority": 1,
              "year": null
            }
          ]
        },
        {
          "month": 3,
          "date": 4,
          "miqaats": [
            {
              "title": "Milad Imam uz-Zaman (SA)",
              "description": "21st Imam.",
              "phase": "day",
              "priority": 1,
              "year": null
            }
          ]
        },
        {
          "month": 3,
          "date": 20,
          "miqaats": [
            {
              "title": "Milad Dai al-Muqaddas, Syedna Mohammed Burhanuddin (AQ)",
              "description": "52nd Dai, Mumbai, India.",
              "phase": "day",
              "priority": 1,
              "year": null
            }
          ]
        }
      ];
    });

    afterEach(function () {
      if (instance && instance.isMounted()) {
        instance.unmountComponent();
      }
    });

    describe("miqaats", function () {
      beforeEach(function () {
        var today = new HijriDate(1432, 3, 20),
            calendar = new HijriCalendar(today.getYear(), today.getMonth());
        instance = TestUtils.renderIntoDocument(
          <Calendar
            calendar={calendar}
            today={today}
            modalId={null}
            miqaats={mockMiqaats}
            onDayClick={null}
          />
        );
      });

      it("expects to return the miqaats for just this calendar month", function () {
        expect(instance.miqaats()).toEqual([
          {
            "month": 3,
            "date": 4,
            "miqaats": [
              {
                "title": "Milad Imam uz-Zaman (SA)",
                "description": "21st Imam.",
                "phase": "day",
                "priority": 1,
                "year": null
              }
            ]
          },
          {
            "month": 3,
            "date": 20,
            "miqaats": [
              {
                "title": "Milad Dai al-Muqaddas, Syedna Mohammed Burhanuddin (AQ)",
                "description": "52nd Dai, Mumbai, India.",
                "phase": "day",
                "priority": 1,
                "year": null
              }
            ]
          }
        ]);
      });
    });
  });
})();

/** @jsx React.DOM */
(function () {
  "use strict";

  describe("MiqaatList", function () {
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
            },
            {
              "title": "Another miqaat",
              "description": "A description",
              "phase": "day",
              "priority": 3,
              "year": null
            }
          ]
        }
      ];

      jasmine.Ajax.install();
    });

    afterEach(function () {
      if (instance && instance.isMounted()) {
        instance.unmountComponent();
      }
      jasmine.Ajax.uninstall();
    });

    describe("listItems", function () {
      describe("when there are no miqaats on the specified Hijri day", function () {
        var day,
            request;

        beforeEach(function () {
          day = {
            hijri: {
              date: 2,
              month: 0,
              year: null
            }
          };
          instance = TestUtils.renderIntoDocument(<MiqaatList day={day} />);
          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            status: 200,
            responseText: JSON.stringify(mockMiqaats)
          });
        });

        it("expects to return a single list item with an appropriate message", function () {
          expect(instance.listItems()).toEqual(
            <li className="none">There are no miqaats on this day.</li>
          );
        });
      });

      describe("when there are miqaats on the specified Hijri day", function () {
        var day,
            request;

        beforeEach(function () {
          day = {
            hijri: {
              date: 1,
              month: 0,
              year: null
            }
          };
          instance = TestUtils.renderIntoDocument(<MiqaatList day={day} />);
          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            status: 200,
            responseText: JSON.stringify(mockMiqaats)
          });
        });

        it("expects to return a list of miqaats", function () {
          expect(instance.listItems().length).toEqual(2);
        });
      });
    });
  });
})();

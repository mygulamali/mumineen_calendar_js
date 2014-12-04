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
              "year": 1435
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
      describe("when the miqaat data hasn't loaded", function () {
        var day,
        request;

        beforeEach(function () {
          day = {
            hijri: {
              date: 1,
              month: 0,
              year: 1435
            }
          };
          instance = TestUtils.renderIntoDocument(<MiqaatList day={day} />);
          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            status: 404,
            responseText: ""
          });
        });

        it("expects to return a single list item with an error message", function () {
          expect(instance.listItems()).toEqual(
            <li className="error">Sorry, there was a problem loading the miqaat data...</li>
          );
        });
      });

      describe("when there are no miqaats on the specified Hijri day", function () {
        var day,
            request;

        beforeEach(function () {
          day = {
            hijri: {
              date: 2,
              month: 0,
              year: 1435
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
              year: 1435
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
          expect(instance.listItems()).toEqual([
            <li key="Hijri New Year">
              Hijri New Year<br />
              <span className="description">{null}</span>
            </li>,
            <li key="Another miqaat">
              Another miqaat<br />
              <span className="description">A description</span>
            </li>
          ]);
        });
      });

      describe("when there is a miqaat that began after the specified Hijri day", function () {
        var day,
        request;

        beforeEach(function () {
          day = {
            hijri: {
              date: 1,
              month: 0,
              year: 1434
            }
          };
          instance = TestUtils.renderIntoDocument(<MiqaatList day={day} />);
          request = jasmine.Ajax.requests.mostRecent();
          request.respondWith({
            status: 200,
            responseText: JSON.stringify(mockMiqaats)
          });
        });

        it("expects to return only the miqaats that have already occured", function () {
          expect(instance.listItems()).toEqual([
            <li key="Hijri New Year">
              Hijri New Year<br />
              <span className="description">{null}</span>
            </li>
          ]);
        });
      });
    });
  });
})();

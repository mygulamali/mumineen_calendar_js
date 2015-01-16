/** @jsx React.DOM */
if (document.getElementsByTagName('main').length > 0) {
  React.render(
    <CalendarFrame today={HijriDate.fromGregorian(new Date())} />,
    document.getElementsByTagName('main').item(0)
  );
}

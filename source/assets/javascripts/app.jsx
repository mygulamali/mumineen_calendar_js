/** @jsx React.DOM */
if (document.getElementsByTagName('main').length > 0) {
  React.renderComponent(
    <CalendarFrame today={HijriDate.fromGregorian(new Date())} />,
    document.getElementsByTagName('main').item(0)
  );
}

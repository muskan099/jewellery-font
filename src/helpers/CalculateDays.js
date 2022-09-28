import moment from "moment";
function calculateDays(startDate, endDate) {
  var start_date = moment(startDate, "YYYY-MM-DD");
  var end_date = moment(endDate, "YYYY-MM-DD");
  var duration = moment.duration(end_date.diff(start_date));
  var days = duration.asDays();

  return parseInt(days);
}
export default calculateDays;

import moment from "moment";

export function convertDate(isoDate) {
  return moment(isoDate).format("M/D/YYYY, h:mm:ss A");
}

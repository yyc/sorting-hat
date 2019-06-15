import XLSX from "xlsx";
import _ from "lodash";

function getHeaders(cells) {
  let headers = Object.keys(cells[0]);
  return headers;
}

export { getHeaders };

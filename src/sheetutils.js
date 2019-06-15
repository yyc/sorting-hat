import XLSX from "xlsx";
import _ from "lodash";

function getHeaders(table) {
  let cells = XLSX.utils.sheet_to_json(table);
  let headers = Object.keys(cells[0]);
  return headers;
}

export { getHeaders };

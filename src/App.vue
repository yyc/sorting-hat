<template>
  <div id="app">
    <dropzone v-if="table == false" @receivedTable="handleTable"></dropzone>
    <div v-if="table !== false">
      <div id="previewtable">
        <table>
          <tr>
            <th v-for="header in previewHeaders" v-bind:key="header">
              {{ header }}
            </th>
          </tr>
          <tr v-for="row in previewTable" v-bind:key="row.vueindex">
            <td
              v-for="header in previewHeaders"
              v-bind:key="row.vueindex + header"
            >
              {{ row[header] }}
            </td>
          </tr>
        </table>
      </div>
      <configpanel
        v-bind:config="config"
        v-bind:headers="headers"
        @triggersort="handleSort"
      ></configpanel>
    </div>
  </div>
</template>

<script>
import Dropzone from "./components/Dropzone";
import Configpanel from "./components/configpanel";

import XLSX from "xlsx";

import { getHeaders } from "./sheetutils";

function handleTable(tableData, options = {}) {
  this.table = tableData;
  this.headers = getHeaders(tableData);
}

function previewHeaders() {
  if (this.config.showSortingOnly == false) {
    return getHeaders(this.table);
  } else {
    return this.config.priority;
  }
}

function previewTable() {
  let json_table = XLSX.utils.sheet_to_json(this.table);
  return json_table.map((x, i) => ({ ...x, vueindex: i }));
}

function handleSort() {}

export default {
  name: "App",
  components: {
    Dropzone,
    Configpanel
  },
  data: () => ({
    table: false,
    config: {
      showSortingOnly: false,
      priority: ["Gender", "Faculty"],
      seed: "asdf"
    },
    headers: []
  }),
  methods: {
    handleTable,
    handleSort
  },
  computed: {
    previewHeaders,
    previewTable
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#previewtable,
.configpanel {
  display: inline-block;
  height: 100vh;
  width: 45vw;
}
#previewtable {
  overflow: scroll;
}
.configpanel {
  overflow: hidden;
}
</style>

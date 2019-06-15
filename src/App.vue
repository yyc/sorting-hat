<template>
  <div id="app">
    <dropzone v-if="table == false" @receivedTable="handleTable"></dropzone>
    <div v-if="table !== false">
      <div id="previewtable" v-html="previewTable"></div>
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

function previewTable() {
  if (this.config.showSortingOnly == false) {
    return XLSX.utils.sheet_to_html(this.table);
  } else {
  }
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

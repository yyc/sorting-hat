<template>
  <div id="app">
    <dropzone v-if="table == undefined" @receivedTable="handleTable"></dropzone>
    <div v-if="table !== undefined">
      <div id="previewtable" v-html="previewTable"></div>
      <configpanel v-bind:config="config"></configpanel>
    </div>
  </div>
</template>

<script>
import Dropzone from "./components/Dropzone";
import Configpanel from "./components/configpanel";

import XLSX from "xlsx";

function handleTable(tableData, options = {}) {
  this.table = tableData;
  console.log(this.table);
}

function previewTable() {
  if (this.config.showSortingOnly == false) {
    return XLSX.utils.sheet_to_html(this.table);
  } else {
  }
}

export default {
  name: "App",
  components: {
    Dropzone,
    Configpanel
  },
  data: () => ({
    table: undefined,
    config: {
      showSortingOnly: false
    }
  }),
  methods: {
    handleTable
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

<template>
  <div id="app">
    <dropzone v-if="table == undefined" @receivedTable="handleTable"></dropzone>
  </div>
</template>

<script>
import Dropzone from "./components/Dropzone";

function handleTable(tableData) {
  this.table = tableData;
  console.log(this.table);
}

export default {
  name: "App",
  components: {
    Dropzone
  },
  data: () => ({
    table: undefined
  }),
  methods: {
    handleTable
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
  margin-top: 60px;
}
</style>

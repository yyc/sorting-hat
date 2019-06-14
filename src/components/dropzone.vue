<template>
  <div
    class="dropzone"
    v-bind:class="{ dropHover: isHover }"
    @dragover.prevent
    @dragover="isHover = true"
    @dragleave="isHover = false"
    @drop="handleDrop"
  >
    Drop a spreadsheet file here (.xls, .xlsx, .csv or .tsv)
  </div>
</template>
<script>
import XLSX from "xlsx";

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  let self = this;
  let files = e.dataTransfer.files;
  let f = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: "array" });
    self.$emit("receivedTable", workbook);
  };
  reader.readAsArrayBuffer(f);
}

export default {
  name: "Dropzone",
  data: () => ({ isHover: false }),
  methods: { handleDrop }
};
</script>
<style>
.dropzone {
  border: 1px solid black;
  margin-left: 25%;
  margin-right: 25%;
  padding-bottom: 100px;
  padding-top: 100px;
}
.dropHover {
  background-color: rgb(185, 255, 79);
}
</style>

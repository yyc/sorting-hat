<template>
  <div
    class="dropzone"
    v-bind:class="{ dropHover: isHover }"
    @dragover.prevent
    @dragover="isHover = true"
    @dragleave="isHover = false"
    @dragend="isHover = false"
    @drop="handleDrop"
  >
    <p v-if="sheets.length == 0">
      Drop a spreadsheet file here (.xls, .xlsx, .csv or .tsv)
    </p>
    <div v-if="sheets.length > 0">
      Your spreadsheet contains multiple sheets. Please select the sheet with
      the required details:
      <ul>
        <li
          v-for="sheet in sheets"
          v-bind:key="sheet.name"
          v-on:click="sheetSelect(sheet.table)"
        >
          {{ sheet.name }}
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import XLSX from "xlsx";

function handleDrop(e) {
  e.stopPropagation();
  e.preventDefault();
  this.isHover = false;
  let self = this;
  let files = e.dataTransfer.files;
  let f = files[0];
  var reader = new FileReader();
  reader.onload = function(e) {
    var data = new Uint8Array(e.target.result);
    var workbook = XLSX.read(data, { type: "array" });

    if (workbook.SheetNames.length == 1) {
      self.$emit("receivedTable", workbook.Sheets[workbook.SheetNames[0]]);
      return;
    }
    self.sheets = workbook.SheetNames.map(sheetName => ({
      name: sheetName,
      table: workbook.Sheets[sheetName]
    }));
  };
  reader.readAsArrayBuffer(f);
}

function sheetSelect(sheet) {
  this.$emit("receivedTable", sheet);
}

export default {
  name: "Dropzone",
  data: () => ({ isHover: false, sheets: [] }),
  methods: { handleDrop, sheetSelect }
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

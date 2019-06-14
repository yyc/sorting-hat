<template>
  <div class="configpanel">
    Sorting Configuration:
    <br />

    <input type="checkbox" id="show-sorting" v-model="config.showSortingOnly" />
    <label for="show-sorting"> Show Sorting Columns Only</label>
    <br />
    <!-- <configjson v-bind:config="config"></configjson> -->
  </div>
</template>

<script>
import configjson from "./configjson";

let defaultConfig = {};

export default {
  name: "Configpanel",
  components: {
    configjson
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data: function() {
    console.log(this.config);
    return {
      myconfig: this.config
    };
  }
};
</script>

<style></style>

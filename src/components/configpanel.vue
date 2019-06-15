<template>
  <div class="configpanel">
    <h3>Sorting Configuration</h3>
    <br />

    <input type="checkbox" id="show-sorting" v-model="config.showSortingOnly" />
    <label for="show-sorting"> Show Sorting Columns Only</label>
    <br />
    Headers:
    <ul>
      <li v-for="header in headers" v-bind:key="header">{{ header }}</li>
    </ul>
    <!-- <configjson v-bind:config="config"></configjson> -->
    <button v-on:click="$emit('triggersort')">Sort</button>
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
    },
    headers: {
      type: Array,
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

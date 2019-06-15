<template>
  <textarea
    v-model="jsonString"
    v-bind:class="{ invalid: isInvalidJSON }"
    )
  ></textarea>
</template>

<script>
function isValidJSON(str) {
  try {
    JSON.parse(str);
  } catch (e) {
    return false;
  }
  return true;
}
export default {
  name: "configjson",
  props: { config: Object },
  data: () => ({
    isValidJSON: false
  }),
  computed: {
    jsonString: {
      get: () => JSON.stringify(config),
      set: val => {
        if (isValidJSON(str)) {
          this.this.$emit("update:config", JSON.parse(str));
        } else {
        }
      }
    }
  }
};
</script>

<style>
.invalid {
  box-shadow: 0px 0px 5px red;
}
</style>

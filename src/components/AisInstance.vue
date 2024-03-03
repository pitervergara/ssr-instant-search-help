<template>
  <p>Hello</p>
</template>

<script>
import { createWidgetMixin } from "vue-instantsearch/vue3/es";
export default {
  mixins: [createWidgetMixin({ connector: true })],
  mounted() {
    //console.log("mounted", this.instantSearchInstance);
  }
};
</script>

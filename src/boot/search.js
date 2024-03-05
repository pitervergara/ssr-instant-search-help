import { boot } from "quasar/wrappers";
import VueInstantSearch from "vue-instantsearch/vue3/es";

export default boot(async ({ app }) => {
  app.use(VueInstantSearch);
});

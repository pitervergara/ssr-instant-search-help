import { boot } from "quasar/wrappers";
import VueInstantSearch from "vue-instantsearch/vue3/es";

export default boot(async ({ app, ssrContext }) => {
  app.use(VueInstantSearch);

  if (ssrContext) {
    ssrContext.app = app;
  }
});

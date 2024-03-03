import { boot } from "quasar/wrappers";
import VueInstantSearch, {
  createServerRootMixin,
} from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch/lite";
import { ref } from "vue";
import { history as historyRouter } from "instantsearch.js/es/lib/routers";
import { createWidgetMixin } from "vue-instantsearch/vue3/es";

export default boot(async ({ app, ssrContext }) => {
  const url = ssrContext ? ssrContext.url : window.location.href;
  const routing = {
    router: historyRouter({
      getLocation() {
        return url;
      },
      cleanUrlOnDispose: false,
    }),
  };

  const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  );

  const serverRootMixin = ref(
    createServerRootMixin({
      searchClient,
      indexName: "instant_search",
    })
  );

  app.use(VueInstantSearch); // do I need this besides the app.mixin?
  app.provide("serverRootMixin", serverRootMixin);
  if (ssrContext !== null) {
    ssrContext.ALGOLIA_STATE = {};
    ssrContext.serverRootMixin = serverRootMixin;
    ssrContext.app = app;
  }
});

import { boot } from "quasar/wrappers";
import VueInstantSearch, {
  createServerRootMixin,
} from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch/lite";

export default boot(async ({ app, ssrContext }) => {
  app.use(VueInstantSearch);

  const searchClient = algoliasearch(
    "latency",
    "6be0576ff61c053d5f9a3225e2a90f76"
  );

  const serverRootMixin = createServerRootMixin({
    searchClient,
    indexName: "instant_search",
  });

  const instantsearch = serverRootMixin.data()["instantsearch"];
  app.provide("serverRootMixin", serverRootMixin);
  app.provide("$_ais_ssrInstantSearchInstance", instantsearch);

  if (ssrContext !== null) {
    ssrContext.ALGOLIA_STATE = {};
    ssrContext.$_ais_ssrInstantSearchInstance = instantsearch;
  }
});

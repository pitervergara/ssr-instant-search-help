import { boot } from 'quasar/wrappers'
import VueInstantSearch, {  createServerRootMixin, } from 'vue-instantsearch/vue3/es';
import algoliasearch from 'algoliasearch/lite';


export default boot(async ({ app, ssrContext }) => {
  const searchClient = algoliasearch(
    'latency',
    '6be0576ff61c053d5f9a3225e2a90f76'
  );

  const srmixin = createServerRootMixin({
    searchClient,
    indexName: 'instant_search',
  });

  app.mixin(srmixin); 
  app.use(VueInstantSearch);  // do I need this besides the app.mixin?

  if (ssrContext !== null) {
    ssrContext.ALGOLIA_STATE = {};

    // I added this to ssrContext to get it back in the component preFetch, but I'm not sure if it's the right way to do it
    ssrContext.srmixin = srmixin;
  }

})

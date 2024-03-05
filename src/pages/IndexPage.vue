<template>
  <q-page class="q-pa-md">
    <div class="container">
      <ais-instant-search-ssr>

        <div class="search-panel">
          <div class="search-panel__filters">

            <ais-refinement-list attribute="brand" />
          </div>

          <div class="search-panel__results">
            <div class="searchbox">
              <ais-search-box placeholder="" />
            </div>
            <ais-hits>
              <template v-slot:item="{ item }">
                <article>
                  <h1 class="text-h4">
                    <ais-highlight :hit="item" attribute="name" />
                  </h1>
                  <p>
                    <ais-highlight :hit="item" attribute="description" />
                  </p>
                </article>
              </template>
            </ais-hits>

            <div class="pagination">
              <ais-pagination />
            </div>
          </div>
        </div>
      </ais-instant-search-ssr>
    </div>
  </q-page>
</template>

<script>
import useComponent from 'src/composables/useComponent';
import { createServerRootMixin } from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch/lite";
import { renderToString } from 'vue/server-renderer';
import { onBeforeMount, provide } from 'vue';
import {
  AisInstantSearchSsr,
  AisSearchBox,
  AisRefinementList,
  AisHits,
  AisPagination,
} from 'vue-instantsearch/vue3/es';
import useCustomRouter from 'src/composables/useCustomRouter';
import route from 'src/router/index.js';
const vueRouter = route();

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);
const serverRootMixin = createServerRootMixin({
  searchClient,
  indexName: "instant_search",
  route: {
    router: useCustomRouter(vueRouter),
  },
});
const instantsearch = serverRootMixin.data()["instantsearch"];

export default {
  async preFetch({ ssrContext }) {
    const component = useComponent(instantsearch);
    await instantsearch.findResultsState({ component, renderToString }).then((results) => {
      ssrContext.ALGOLIA_STATE = results;
    });
  }
}
</script>

<script setup>


provide("$_ais_ssrInstantSearchInstance", instantsearch);

onBeforeMount(() => {

  if (typeof window === 'object' && window.__ALGOLIA_STATE__) {
    instantsearch.hydrate(window.__ALGOLIA_STATE__);
    delete window.__ALGOLIA_STATE__;
  }
})
</script>

<style lang="scss" scoped></style>

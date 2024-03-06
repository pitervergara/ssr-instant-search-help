<template>
  <q-page class="q-pa-md">
    <div class="container">
      <ais-instant-search-ssr>

        <div class="search-panel">
          <div class="search-panel__filters">

            <ais-refinement-list attribute="brand" />
            <ais-menu attribute="category" />
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
import useVirtualWidgets from 'src/composables/useVirtualWidgets';
import useServerRoot from 'src/composables/useServerRoot';

import { onBeforeMount, provide } from 'vue';
import { useRouter } from 'vue-router';
import { renderToString } from 'vue/server-renderer';

import algoliasearch from "algoliasearch/lite";
import {
  AisInstantSearchSsr,
  AisSearchBox,
  AisMenu,
  AisRefinementList,
  AisHits,
  AisPagination,
} from 'vue-instantsearch/vue3/es';


const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);
const indexName = "instant_search";

export default {
  async preFetch({ ssrContext }) {
    const vueRouter = ssrContext.router;

    let instantsearch = useServerRoot(searchClient, indexName, vueRouter);
    instantsearch = useVirtualWidgets(instantsearch);

    const app = ssrContext.app;
    app.provide('$_ais_ssrInstantSearchInstance', instantsearch);

    const component = useComponent(instantsearch);
    await instantsearch.findResultsState({ component, renderToString }).then((results) => {
      ssrContext.ALGOLIA_STATE = results;
    });
  }
}
</script>

<script setup>


onBeforeMount(() => {
  const vueRouter = useRouter();
  const instantsearch = useServerRoot(searchClient, indexName, vueRouter);

  provide('$_ais_ssrInstantSearchInstance', instantsearch);

  if (typeof window === 'object' && window.__ALGOLIA_STATE__) {
    instantsearch.hydrate(window.__ALGOLIA_STATE__);
    delete window.__ALGOLIA_STATE__;
  }
})
</script>

<style lang="scss" scoped></style>

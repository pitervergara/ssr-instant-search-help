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


                <div class="q-pa-md row items-start q-gutter-md">

                  <q-card class="my-card text-white"
                    style="background: radial-gradient(circle, #35a2ff 0%, #014a88 100%)">
                    <q-card-section>
                      <div class="text-h6">
                        <ais-highlight :hit="item" attribute="name" />
                      </div>
                      <div class="text-subtitle2">
                        <ais-highlight :hit="item" attribute="name" />
                      </div>
                    </q-card-section>

                    <q-card-section class="q-pt-none">
                      <ais-highlight :hit="item" attribute="description" />
                    </q-card-section>
                  </q-card>

                </div>

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


const indexName = "instant_search";
const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default {
  // Server Side Rendering - This runs on the server, in node.js context

  async preFetch({ ssrContext }) {
    const vueRouter = ssrContext.router;
    const app = ssrContext.app;

    let instantsearch = useServerRoot(searchClient, indexName, vueRouter);
    instantsearch = useVirtualWidgets(instantsearch);

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

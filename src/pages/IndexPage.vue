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
import { createServerRootMixin } from "vue-instantsearch/vue3/es";
import algoliasearch from "algoliasearch/lite";
import { renderToString } from 'vue/server-renderer';
import { onBeforeMount, provide } from 'vue';
import {
  AisInstantSearchSsr,
  AisSearchBox,
  AisMenu,
  AisRefinementList,
  AisHits,
  AisPagination,
} from 'vue-instantsearch/vue3/es';
import useServerRootMixin from 'src/composables/userServerRootMixin';
import useCustomRouter from 'src/composables/useCustomRouter';
import useVirtualWidgets from 'src/composables/useVirtualWidgets';
import { useRouter } from 'vue-router';

const indexName = "instant_search";

const searchClient = algoliasearch(
  "latency",
  "6be0576ff61c053d5f9a3225e2a90f76"
);

export default {
  async preFetch({ ssrContext }) {
    const vueRouter = ssrContext.router;
    const app = ssrContext.app;

    let instantsearch = useServerRootMixin({
      searchClient,
      indexName,
      vueRouter,
    });

    // adds virtual widgets to the instantsearch instance, allowing SSR apply URL filters
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
  let instantsearch = useServerRootMixin({
    searchClient,
    indexName,
    vueRouter,
  });

  provide('$_ais_ssrInstantSearchInstance', instantsearch);

  if (typeof window === 'object' && window.__ALGOLIA_STATE__) {
    instantsearch.hydrate(window.__ALGOLIA_STATE__);
    delete window.__ALGOLIA_STATE__;
  }
})
</script>

<style lang="scss" scoped></style>

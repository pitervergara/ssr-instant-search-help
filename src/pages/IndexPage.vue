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
import { renderToString } from '@vue/server-renderer';
import { defineComponent } from 'vue';

export default {

  preFetch ({ssrContext}) {

    const instantsearch  = ssrContext.srmixin.data()['instantsearch']
    /**
     * TODO: What should I pass as params to findResultsState?
     * 
     * const element = null;
     * const renderToString = renderToString; // Is this correct?
     * 
     * instantsearch.findResultsState({ element, renderToString }).then((state) => {
     *   ssrContext.ALGOLIA_STATE = state;
     * }); 
     * 
     */
  }
}
</script>

<script setup>
import {
  AisInstantSearchSsr,
  AisRefinementList,
  AisHits,
  AisHighlight,
  AisSearchBox,
  AisStats,
  AisPagination,
  createServerRootMixin,
} from 'vue-instantsearch/vue3/es';

import { onBeforeMount } from 'vue';
import { getCurrentInstance } from "vue";

onBeforeMount(() => {
  const instance = getCurrentInstance();
  const instantsearch = instance.appContext.mixins[0].data()['instantsearch']
  /**
   * TODO: How to hydrate? This seems a bad way to get instantsearch instance back
   */
  if (typeof window === 'object' && window.__ALGOLIA_STATE__) {
    // instantsearch.hydrate(window.__ALGOLIA_STATE__);
    // delete window.__ALGOLIA_STATE__;
  }
  
})
</script>

<style lang="scss" scoped>

</style>

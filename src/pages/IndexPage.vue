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

import { renderToString } from 'vue/server-renderer';
import { h, inject } from 'vue';
import {
  createServerRootMixin,
  AisInstantSearchSsr,
  AisSearchBox,
  AisCurrentRefinements,
  AisClearRefinements,
  AisMenuSelect,
  AisPanel,
  AisRefinementList,
  AisConfigure,
  AisHits,
  AisPagination,
  AisToggleRefinement,
  AisSortBy,
  AisStats,
} from 'vue-instantsearch/vue3/es';

import {
  connectSearchBox,
  connectPagination,
  connectStats,
  connectRefinementList,
  connectToggleRefinement,
} from 'instantsearch.js/es/connectors';

export default {

  async preFetch({ ssrContext }) {

    const instantsearch = ssrContext.serverRootMixin.value.data()['instantsearch'];
    const app = ssrContext.app;

    // Setup virtual widgets - without these the initial query will not work
    const renderFn = (renderOptions, isFirstRender) => { };
    const virtualSearchBox = connectSearchBox(renderFn);
    const virtualPagination = connectPagination(renderFn);
    const virtualStats = connectStats(renderFn);
    const virtualRefinementList = connectRefinementList(renderFn);
    const virtualToggleRefinement = connectToggleRefinement(renderFn);
    instantsearch.addWidgets([
      virtualSearchBox(),
      virtualPagination(),
      virtualStats(),
      virtualRefinementList({ attribute: 'brand' }),
      virtualToggleRefinement({ attribute: 'free_shipping' }),
    ]);

    app.provide('$_ais_ssrInstantSearchInstance', instantsearch);

    await instantsearch.findResultsState({
      component: {
        $options: {
          components: {
            AisInstantSearchSsr,
            AisSearchBox,
            AisCurrentRefinements,
            AisClearRefinements,
            AisMenuSelect,
            AisRefinementList,
            AisConfigure,
            AisHits,
            AisPagination,
            AisPanel,
            AisToggleRefinement,
            AisSortBy,
            AisStats,
          },
          data() {
            return { instantsearch };
          },
          provide: { $_ais_ssrInstantSearchInstance: instantsearch },
          render() {
            return h(AisInstantSearchSsr, null, () => [
              h('div', { class: 'container mx-auto' }, () => [
                h('br'),
                h(AisSearchBox, { placeholder: 'Product, brand, color, …' }),
                h('br'),
                h('div', { class: 'grid grid-cols-4' }, () => [
                  h('div', { class: 'lg:block mr-2 mt-3' }, () => [
                    h(AisClearRefinements, { 'data-layout': 'desktop' }, () => [
                      h('template', { slot: 'resetLabel' }, () => [
                        h('div', { class: 'clear-filters' }, () => [
                          h(
                            'svg',
                            {
                              xmlns: 'http://www.w3.org/2000/svg',
                              width: '10',
                              height: '10',
                              viewBox: '0 0 11 11',
                            },
                            () => [
                              h(
                                'g',
                                {
                                  fill: 'none',
                                  'fill-rule': 'evenodd',
                                  opacity: '.4',
                                },
                                () => [
                                  h('path', { d: 'M0 0h11v11H0z' }),
                                  h('path', {
                                    fill: '#000',
                                    'fill-rule': 'nonzero',
                                    d: 'M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206 .437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928',
                                  }),
                                ]
                              ),
                            ]
                          ),
                          'Clear filters',
                        ]),
                      ]),
                    ]),
                    h('br'),
                    h('div', { class: 'container-body' }, () => [
                      h(AisPanel, () => [
                        h('template', { slot: 'header' }, 'Brands'),
                        h('template', () => [
                          h(AisRefinementList, {
                            attribute: 'brand',
                            searchable: true,
                            'searchable-placeholder': 'Search for brands…',
                          }),
                        ]),
                      ]),
                      h('br'),
                      h(
                        AisToggleRefinement,
                        { attribute: 'free_shipping', label: 'Free Shipping' },
                        () => [
                          h(
                            'template',
                            {
                              slotProps: {
                                value,
                                refine,
                                createURL,
                                sendEvent,
                              },
                            },
                            () => [
                              h('span', { class: 'toggle-slider' }, () => [
                                h('input', {
                                  type: 'checkbox',
                                  class: 'toggle-checkbox',
                                  ':checked': value.isRefined,
                                  '@click': 'refine(value)',
                                }),
                              ]),
                              h(
                                'a',
                                {
                                  ':href': 'createURL(value)',
                                  '@click.prevent': 'refine(value)',
                                },
                                () => [`Free Shipping ({{value.count}})`]
                              ),
                            ]
                          ),
                        ]
                      ),
                      h(AisToggleRefinement, null, () => [
                        { attribute: 'free_shipping' },
                      ]),
                    ]),
                  ]),
                  h('div', { class: 'col-span-3' }, () => [
                    h('div', { class: 'results' }, () => [
                      h(
                        AisStats,
                        { class: 'hidden lg:block mb-4 mt-4' },
                        () => [
                          h(
                            'template',
                            {
                              slotProps: { hitsPerPage, nbPages, nbHits, page },
                            },
                            () => [
                              h(
                                'span',
                                { class: 'text-sm text-blue-800' },
                                () => [
                                  'Showing {{ getResultsShown(hitsPerPage, nbPages, nbHits, page) }} out of {{ nbHits }}',
                                ]
                              ),
                            ]
                          ),
                        ]
                      ),
                    ]),
                    h('br'),
                    h(AisHits, () => [
                      h('template', { slotProps: { items } }, () => [
                        h('div', { class: 'grid grid-cols-4 gap-4' }, () => [
                          items.map((item) =>
                            h(
                              'div',
                              { key: item.objectID, class: 'grid-item' },
                              () => [
                                h('div', { class: 'card' }, () => [
                                  h('div', { class: 'card-body' }, () => [
                                    h('img', {
                                      ':src': item.image,
                                      alt: 'item image',
                                    }),
                                    h(
                                      'h3',
                                      { class: 'text-center mt-10' },
                                      item.name
                                    ),
                                  ]),
                                ]),
                              ]
                            )
                          ),
                        ]),
                      ]),
                    ]),
                  ]),
                ]),
                h('br'),
                h('br'),
                h('div', { class: 'flex justify-center' }, () => [
                  h(AisPagination),
                ]),
              ]),
            ]);
          },
        },
      },
      renderToString,
    }).then((results) => {
      ssrContext.ALGOLIA_STATE = results;
    });

  }
}
</script>

<script setup>

import { onBeforeMount } from 'vue';
import { getCurrentInstance } from "vue";

onBeforeMount(() => {
  const { ctx } = getCurrentInstance();
  const app = ctx.$.appContext.app;

  const serverRootMixin = inject('serverRootMixin')
  const instantsearch = serverRootMixin.value.data()['instantsearch'];


  if (typeof window === 'object' && window.__ALGOLIA_STATE__) {
    instantsearch.hydrate(window.__ALGOLIA_STATE__);
    delete window.__ALGOLIA_STATE__;
  }
  app.provide('$_ais_ssrInstantSearchInstance', instantsearch);
})
</script>

<style lang="scss" scoped></style>

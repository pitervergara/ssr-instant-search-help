import {
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
} from "vue-instantsearch/vue3/es";
import { h } from "vue";

const useComponent = (instantsearch) => {
  const component = {
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
          h("div", { class: "container mx-auto" }, () => [
            h("br"),
            h(AisSearchBox, { placeholder: "Product, brand, color, …" }),
            h("br"),
            h("div", { class: "grid grid-cols-4" }, () => [
              h("div", { class: "lg:block mr-2 mt-3" }, () => [
                h(AisClearRefinements, { "data-layout": "desktop" }, () => [
                  h("template", { slot: "resetLabel" }, () => [
                    h("div", { class: "clear-filters" }, () => [
                      h(
                        "svg",
                        {
                          xmlns: "http://www.w3.org/2000/svg",
                          width: "10",
                          height: "10",
                          viewBox: "0 0 11 11",
                        },
                        () => [
                          h(
                            "g",
                            {
                              fill: "none",
                              "fill-rule": "evenodd",
                              opacity: ".4",
                            },
                            () => [
                              h("path", { d: "M0 0h11v11H0z" }),
                              h("path", {
                                fill: "#000",
                                "fill-rule": "nonzero",
                                d: "M8.26 2.75a3.896 3.896 0 1 0 1.102 3.262l.007-.056a.49.49 0 0 1 .485-.456c.253 0 .451.206 .437.457 0 0 .012-.109-.006.061a4.813 4.813 0 1 1-1.348-3.887v-.987a.458.458 0 1 1 .917.002v2.062a.459.459 0 0 1-.459.459H7.334a.458.458 0 1 1-.002-.917h.928",
                              }),
                            ]
                          ),
                        ]
                      ),
                      "Clear filters",
                    ]),
                  ]),
                ]),
                h("br"),
                h("div", { class: "container-body" }, () => [
                  h(AisPanel, () => [
                    h("template", { slot: "header" }, "Brands"),
                    h("template", () => [
                      h(AisRefinementList, {
                        attribute: "brand",
                        searchable: true,
                        "searchable-placeholder": "Search for brands…",
                      }),
                    ]),
                  ]),
                  h("br"),
                  h(
                    AisToggleRefinement,
                    { attribute: "free_shipping", label: "Free Shipping" },
                    () => [
                      h(
                        "template",
                        {
                          slotProps: {
                            value,
                            refine,
                            createURL,
                            sendEvent,
                          },
                        },
                        () => [
                          h("span", { class: "toggle-slider" }, () => [
                            h("input", {
                              type: "checkbox",
                              class: "toggle-checkbox",
                              ":checked": value.isRefined,
                              "@click": "refine(value)",
                            }),
                          ]),
                          h(
                            "a",
                            {
                              ":href": "createURL(value)",
                              "@click.prevent": "refine(value)",
                            },
                            () => [`Free Shipping ({{value.count}})`]
                          ),
                        ]
                      ),
                    ]
                  ),
                  h(AisToggleRefinement, null, () => [
                    { attribute: "free_shipping" },
                  ]),
                ]),
              ]),
              h("div", { class: "col-span-3" }, () => [
                h("div", { class: "results" }, () => [
                  h(AisStats, { class: "hidden lg:block mb-4 mt-4" }, () => [
                    h(
                      "template",
                      {
                        slotProps: { hitsPerPage, nbPages, nbHits, page },
                      },
                      () => [
                        h("span", { class: "text-sm text-blue-800" }, () => [
                          "Showing {{ getResultsShown(hitsPerPage, nbPages, nbHits, page) }} out of {{ nbHits }}",
                        ]),
                      ]
                    ),
                  ]),
                ]),
                h("br"),
                h(AisHits, () => [
                  h("template", { slotProps: { items } }, () => [
                    h("div", { class: "grid grid-cols-4 gap-4" }, () => [
                      items.map((item) =>
                        h(
                          "div",
                          { key: item.objectID, class: "grid-item" },
                          () => [
                            h("div", { class: "card" }, () => [
                              h("div", { class: "card-body" }, () => [
                                h("img", {
                                  ":src": item.image,
                                  alt: "item image",
                                }),
                                h(
                                  "h3",
                                  { class: "text-center mt-10" },
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
            h("br"),
            h("br"),
            h("div", { class: "flex justify-center" }, () => [
              h(AisPagination),
            ]),
          ]),
        ]);
      },
    },
  };

  return component;
};

export default useComponent;

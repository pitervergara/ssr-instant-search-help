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
      render() {},
    },
  };

  return component;
};

export default useComponent;

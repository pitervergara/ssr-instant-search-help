import {
  connectSearchBox,
  connectPagination,
  connectStats,
  connectRefinementList,
  connectToggleRefinement,
  connectMenu,
} from "instantsearch.js/es/connectors";

function useVirtualWidgets(instantsearch) {
  // Setup virtual widgets - without these the initial query will not work
  const renderFn = (renderOptions, isFirstRender) => {};
  const virtualSearchBox = connectSearchBox(renderFn);
  const virtualPagination = connectPagination(renderFn);
  const virtualStats = connectStats(renderFn);
  const virtualRefinementList = connectRefinementList(renderFn);
  const virtualToggleRefinement = connectToggleRefinement(renderFn);
  const virtualMenu = connectMenu(renderFn);
  instantsearch.addWidgets([
    virtualSearchBox(),
    virtualPagination(),
    virtualStats(),
    virtualRefinementList({ attribute: "brand" }),
    virtualToggleRefinement({ attribute: "free_shipping" }),
    virtualMenu({ attribute: "category" }),
  ]);

  return instantsearch;
}

export default useVirtualWidgets;

import qs from "qs";
// https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/vue/#combining-with-nuxtjs
const useCustomRouter = function (vueRouter) {
  let pushed = 0;
  return {
    router: {
      cleanUrlOnDispose: false,
      read() {
        return vueRouter.currentRoute.value.query;
      },
      write(routeState) {
        // Only push a new entry if the URL changed (avoid duplicated entries in the history)
        if (this.createURL(routeState) === this.createURL(this.read())) {
          console.log("skip");
          return;
        }
        console.log("read", this.read());
        console.log("routestate", routeState);
        console.log(
          this.createURL(routeState),
          "!==",
          this.createURL(this.read())
        );

        vueRouter.push({
          query: routeState,
        });
      },
      createURL(routeState) {
        return vueRouter.resolve({
          query: routeState,
        }).href;
      },
      onUpdate(cb) {
        if (typeof window === "undefined") return;

        this._removeAfterEach = vueRouter.afterEach(() => {
          cb(this.read());
        });

        this._onPopState = () => {
          cb(this.read());
        };
        window.addEventListener("popstate", this._onPopState);
      },
      dispose() {
        if (typeof window === "undefined") {
          return;
        }
        if (this._onPopState) {
          window.removeEventListener("popstate", this._onPopState);
        }
        if (this._removeAfterEach) {
          this._removeAfterEach();
        }
      },
    },

    stateMapping: {
      stateToRoute(uiState) {
        const indexUiState = uiState["instant_search"] || {};

        return {
          query: indexUiState.query,
          page: indexUiState.page,
          brands:
            indexUiState.refinementList && indexUiState.refinementList.brand,
          category: indexUiState.menu && indexUiState.menu.categories,
        };
      },

      routeToState() {
        const routeState = vueRouter.currentRoute.value.query;

        return {
          instant_search: {
            query: routeState.query,
            page: routeState.page,
            menu: {
              categories: routeState.category,
            },
            refinementList: {
              brand: routeState.brands,
            },
          },
        };
      },
    },
  };
};

export default useCustomRouter;

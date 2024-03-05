// https://www.algolia.com/doc/guides/building-search-ui/going-further/routing-urls/vue/#combining-with-nuxtjs
const useCustomRouter = function (vueRouter) {
  return {
    read() {
      return vueRouter.currentRoute.query;
    },
    write(routeState) {
      // Only push a new entry if the URL changed (avoid duplicated entries in the history)
      if (this.createURL(routeState) === this.createURL(this.read())) {
        return;
      }
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
      console.log("onUpdate");
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
  };
};

export default useCustomRouter;

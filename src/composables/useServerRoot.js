import { createServerRootMixin } from "vue-instantsearch/vue3/es";
import useCustomRouter from "src/composables/useCustomRouter";

const useServerRoot = function (searchClient, indexName, vueRouter) {
  const routing = useCustomRouter(vueRouter);
  const serverRootMixin = createServerRootMixin({
    searchClient,
    indexName,
    routing,
  });

  const instantsearch = serverRootMixin.data()["instantsearch"];
  return instantsearch;
};

export default useServerRoot;

import algoliasearch from "algoliasearch/lite";

export default function getSearchClient() {
  return algoliasearch("latency", "6be0576ff61c053d5f9a3225e2a90f76");
}

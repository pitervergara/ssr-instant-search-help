import WPAPI from 'wpapi';
import { ref } from 'vue';

export default function getBackendAPIClient(nonce = null) {
  const api = ref(null);

  if (api.value === null) {
    api.value = new Promise((resolve, reject) => {
      let apiPromise;
      apiPromise = WPAPI.discover(`${process.env.EDOOGLE_API_URL}/wp-json`);

      apiPromise.then(
        function (wp) {
          if (nonce !== null) {
            wp._options.nonce = nonce;
            wp._options.auth = true;
          }

          resolve(wp);
        },
        (err) => {
          console.log('Erro ao criar WPClient.');
          reject(err);
        }
      );
    });
  }

  return api.value;
}

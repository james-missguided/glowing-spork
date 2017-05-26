const client = 'missguided';
const passkey = 'kuuqd395w5u7gv43987gxshh';
const endPoint = 'https://curations-api.nexus.bazaarvoice.com/content/get/';

export default({limit = 20, before = ''} = {}) => {
  const url = `${endPoint}?client=${client}&passkey=${passkey}&withProductData=true&limit=${limit}&before=${before}`;

  return fetch(url)
          .then(res => {
            if (res.ok) return res.json();

            throw new Error('Network response was not ok.');
          });
}

import axios from 'axios';

export const getAllProduct = async () => {
  let res = await axios.get(`${process.env.REACT_APP_API_URL}/admin/api/2024-01/products.json`, {
    headers: {
      'X-Shopify-Access-Token': `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`,
      'Access-Control-Allow-Origin': 'http://localhost:3000',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  });
  console.log(res);
  return res.products;
};

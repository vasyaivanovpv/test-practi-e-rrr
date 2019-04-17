import { API_ROOT } from 'utils/constants';

export const httpGet = async endPoint => {
  try {
    const response = await fetch(`${API_ROOT}/${endPoint}`);
    if (response.ok) {
      const json = await response.json();
      return json;
    } else {
      throw new Error(response.status);
    }
  } catch (err) {
    console.warm('httpGet error ', err);
  }
};

export const postData = (url, data) => {
  return fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'content-type': 'application/json',
    },
    credentials: 'same-origin',
    mode: 'cors',
    redirect: 'follow',
    referrer: 'no-refferer',
    cache: 'no-cache',
  });
};

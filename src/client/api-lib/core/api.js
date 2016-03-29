import axios from 'axios';

import config from '../../config/app';

function _apiResponse(success, payload) {
  return {
    successful: success,
    data: payload.data
  };
}

function status(response) {
  if (response.status >= 200 && response.status < 300) {
    const res = _apiResponse(true, response);
    return Promise.resolve(res);
  }
  if (response.status === 400 || response.status === 401) {
    return Promise.resolve(_apiResponse(false, response));
  }
  return Promise.reject(new Error(response.status + response.statusText));
}

function mapHeaders(headers, options) {
  const newHeaders = headers;
  if (options && options.headers) {
    for (const prop in options.headers) {
      if (options.headers.hasOwnProperty(prop)) {
        newHeaders[prop] = options.headers[prop];
      }
    }
  }

  return newHeaders;
}

function getHeaders(options) {
  const token = ''; // localStorage.getItem('id_token') || null;

  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json'
  };

  if (options && options.authenticated) {
    headers.Authorization = `Bearer ${token}`;
  }

  return mapHeaders(headers, options);
}

function getBaseUri() {
  return config.baseUri;
}

function uriEncodeBody(body) {
  let str = '';
  for (const key in body) {
    if ({}.hasOwnProperty.call(body, key)) {
      str += `${key}=${body[key]}&`;
    }
  }

  return str.substring(0, str.length - 1);
}

function getBody(options, body) {
  if (options && options.uriEncodedBody) {
    return uriEncodeBody(body.toJS());
  }
  return JSON.stringify(body);
}

export function get(url, options) {
  const requestHeaders = getHeaders(options);
  const baseUri = getBaseUri(options);
  const queryParams = uriEncodeBody(options);
  return axios.get(`${baseUri}${url}?${queryParams}`, {
    headers: requestHeaders
  })
  .then(status);
}

export function post(url, body, options) {
  const requestHeaders = getHeaders(options);
  const baseUri = getBaseUri(options);

  return axios.post(baseUri + url, getBody(options, body), {
    headers: requestHeaders
  })
  .then(status);
}

export function put(url, body, options) {
  const requestHeaders = getHeaders(options);
  const baseUri = getBaseUri(options);

  return axios.put(baseUri + url, getBody(options, body), {
    headers: requestHeaders,
  })
  .then(status);
}

export function del(url, options) {
  const requestHeaders = getHeaders(options);
  const baseUri = getBaseUri(options);
  return axios.delete(baseUri + url, {
    headers: requestHeaders
  })
  .then(status);
}

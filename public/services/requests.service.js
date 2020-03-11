import chrome from 'ui/chrome';

export class GenericRequest {
  constructor() {
    this.apiBasePath = chrome.addBasePath('/api/arcanna/');
    this.header = { 'kbn-xsrf': 'kibana', 'Content-Type': 'application/json' };
  }

  async request(url, method, body = null) {
    return fetch(this.apiBasePath + url, {
      method: method,
      body: body,
      headers: this.header
    }).then(response => {
      return response.json();
    }).catch(error => console.error(error));
  }

  async fullPathRequest(url, method, body = null) {
    return fetch(url, {
      method: method,
      body: body,
      headers: this.header
    }).then(response => {
      return response.json();
    }).catch(error => console.error(error));
  }
}
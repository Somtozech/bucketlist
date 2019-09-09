// const search = (query) => {
//   fetch(`/bucketlist/q=${query}`).then()
// }
const LOCAL_STORAGE_TOKEN_KEY = 'randomtokenkey';
class Client {
  constructor() {
    this.useLocalStorage = typeof localStorage !== 'undefined';
    if (this.useLocalStorage) {
      this.token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
      this.authorization = `Bearer ${this.token}`;
    }
  }

  setToken(token) {
    this.token = token;

    if (this.useLocalStorage) {
      localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, token);
    }
  }

  removeToken() {
    this.token = null;

    if (this.useLocalStorage) {
      localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
    }
  }

  search(query, cb) {
    const url = `/api/v1/bucketlists/?q=${query}`;
    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  createBucketList(body) {
    const url = `/api/v1/bucketlists/`;
    return fetch(url, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      },
      body: JSON.stringify(body)
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  getBucketLists() {
    const url = `/api/v1/bucketlists/`;
    return fetch(url, {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  deleteBucketList(id) {
    const url = `/api/v1/bucketlists/${id}`;
    return fetch(url, {
      method: 'delete',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      }
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  editBucketList(item) {
    const url = `/api/v1/bucketlists/${item._id}`;
    return fetch(url, {
      method: 'put',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      },
      body: JSON.stringify({ name: item.name })
    })
      .then(this.checkStatus)
      .then(this.parseJSON);
  }

  login = body => {
    return fetch('/api/v1/auth/login', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    })
      .then(this.checkStatus)
      .then(this.parseJSON)
      .then(json => this.setToken(json.token));
  };

  isLoggedIn() {
    return !!this.token;
  }

  logout() {
    this.removeToken();
    return fetch('/api/v1/auth/logout', {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
        Authorization: this.authorization
      }
    });
  }

  checkStatus = async response => {
    if (response.status >= 200 && response.status < 300) {
      return response;
    } else {
      const res = await response.json();
      if (res.error && res.error.name === 'TokenExpiredError') {
        this.logout();
      }

      const error = new Error(`HTTP Error ${response.statusText}`);
      error.statusText = response.statusText;
      error.status = response.status;
      error.response = response;
      throw error;
    }
  };

  parseJSON(response) {
    return response.json();
  }
}

export default new Client();

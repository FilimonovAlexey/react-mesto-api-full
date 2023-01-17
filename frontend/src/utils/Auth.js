class Auth {
  constructor(options) {
    this._options = options;
  }

  register(data) {
    return fetch(`${this._options.baseUrl}/signup`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      })
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }

  authorize(data) {
    return fetch(`${this._options.baseUrl}/signin`, {
      method: "POST",
      headers: this._options.headers,
      body: JSON.stringify({
        password: data.password,
        email: data.email,
      }),
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }

  checkToken(token) {
    return fetch(`${this._options.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    }).then((res) => (res.ok ? res.json() : Promise.reject(res)));
  }
}

const auth = new Auth({
  baseUrl: "https://auth.nomoreparties.co",
  headers: {
    "Content-Type": "application/json" 
  }
});

export default auth;

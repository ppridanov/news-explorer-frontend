class Api {
  constructor(options) {
    this.baseUrl = options.baseUrl;
    this.headers = options.headers;
  }
  signin(emailValue, passwordValue) {
    console.log(emailValue, passwordValue)
    return fetch('http://localhost:3000/signin', {
      method: 'POST',
      headers: this.headers,
      body: JSON.stringify({
        email: emailValue,
        password: passwordValue
      })
    })
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    })  }
}

function serverUrl() {
  const serverUrl = 'http://localhost:3000';
  return serverUrl;
}

export const connection = new Api({
  baseUrl: serverUrl(),
  headers: {
    'Content-Type': 'application/json'
  },
});
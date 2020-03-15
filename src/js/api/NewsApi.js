export default class NewsApi {
  constructor(url, key) {
    this._apiKey = key;
    console.log(key);
    this._url = url;
  }

  render(value) {
    const date = new Date();
    const weekAgoDate = new Date();
    weekAgoDate.setDate(date.getDate() - 7);
    const toDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const fromDate = `${weekAgoDate.getFullYear()}-${weekAgoDate.getMonth() + 1}-${weekAgoDate.getDate()}`;
    const url = `${this._url}/v2/everything?q=${value}&language=ru&apiKey=${this._apiKey}&from=${fromDate}&to=${toDate}&pageSize=100`;
    return fetch(url)
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        Promise.reject();
      });
  }
}

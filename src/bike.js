export class BikeStolen {
  getStolenBikes() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = 'https://bikeindex.org:443/api/v3/search?page=1&per_page=5&location=Portland%2COR%2C97213&distance=5&stolenness=proximity';
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });
  }
}

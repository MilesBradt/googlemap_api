export class GoogleLocate {

  geocodeFromLocation(address) {
    return new Promise(function(resolve, reject) {

      let addressLocate = address
      let request = new XMLHttpRequest();
      let url = ('https://maps.googleapis.com/maps/api/geocode/json?address='+ addressLocate + '&key=AIzaSyC9lMrrD9IIguOMmDBYH9oPJW44zxCX5GA')
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

export class DinoSpam {
  getDinoNames() {
    return new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = 'http://dinoipsum.herokuapp.com/api/?format=json&paragraphs=1&words=3';
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

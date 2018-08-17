import JSZip from 'jszip';

export default class Loader {
  constructor() {
    this.reader = new FileReader();
  }

  _compareFileNames(a, b) {
    var ax = [],
      bx = [];

    a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
      ax.push([$1 || Infinity, $2 || '']);
    });
    b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
      bx.push([$1 || Infinity, $2 || '']);
    });

    while (ax.length && bx.length) {
      var an = ax.shift();
      var bn = bx.shift();
      var nn = an[0] - bn[0] || an[1].localeCompare(bn[1]);
      if (nn) return nn;
    }
    return ax.length + bx.length;
  }

  _zip(file, fn) {
    const that = this;
    JSZip.loadAsync(file).then(zip => {
      var re = /^(?:(?!__macosx)).*(.jpg|.png|.gif|.jpeg)$/;
      var promises = Object.keys(zip.files)
        .sort(that._compareFileNames)
        .filter(function(fileName) {
          // console.log(fileName);
          // don't consider non image files
          return re.test(fileName.toLowerCase());
        })
        .map(function(fileName, index) {
          var file = zip.files[fileName];
          return file.async('blob').then(function(blob) {
            return [
              index,
              fileName, // keep the link between the file name and the content
              URL.createObjectURL(blob) // create an url. img.src = URL.createObjectURL(...) will work
            ];
          });
        });
      // `promises` is an array of promises, `Promise.all` transforms it
      // into a promise of arrays
      return Promise.all(promises);
    }).then(result => {
      return fn(result);
    });
  }

  read(file, fn) {
    let that = this;
    if (typeof FileReader !== 'undefined') {
      that.reader.onload = evt => {
        return fn(evt);
      };
      if (file.name.endsWith('.cbz')) {
        return that._zip(file, fn)
      } else if (file.type.includes('image')) {
        that.reader.readAsDataURL(file);
      }
    }
  }
}

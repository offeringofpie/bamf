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
    import(/* webpackChunkName: "jszip" */'jszip').then(JSZip => {
      JSZip.loadAsync(file)
        .then(zip => {
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
        })
        .then(result => {
          return fn(result);
        });
    });
  }

  _rar(rarFile, fn) {
    import(/* webpackChunkName: "unrar" */'unrar-js/lib/Unrar').then(unrar => {

      const files = unrar.default(rarFile);

      const result = files.map((file,index) => {
        return [
          index,
          file.filename,
          URL.createObjectURL(new Blob([file.fileData], {type: 'image/jpg'}))
        ];
      });

      return fn(result);
    });
  }

  read(file, fn) {
    let that = this;
    if (typeof FileReader !== 'undefined') {
      that.reader.onload = evt => {
        return fn(evt);
      };
      if (file.name.endsWith('.cbz') || file.name.endsWith('.zip')) {
        return that._zip(file, fn);
      } else if (file.name.endsWith('.cbr') || file.name.endsWith('.rar')) {
        that.reader.onload = evt => {
          return that._rar(evt.target.result, fn);
        };
        that.reader.readAsArrayBuffer(file);
      } else if (file.type.includes('image')) {
        that.reader.readAsDataURL(file);
      }
    }
  }
}

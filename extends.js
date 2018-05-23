var obj = {};
var val = '';
Object.defineProperty(obj, 'a', {
  get: function() {
    return val;
  },
  set: function(newval) {
    val = newval;
  }
})

function assign () {
  var o = {};
  for (let i = 0; i < arguments.length; i++) {
    let a = arguments[i];
    if (a != null) {
      for (let j in a) {
        if(a.hasOwnProperty(j)) {
          o[j] = a[j]
        }
      }
    }
  }
}

function tentotwo (num) {
    let b = [];
    while(num > 0) {
        let a = Math.floor(num % 2);
        b.push(a);
        num = Math.floor(num / 2);
    }
    let c = b.reverse().join('');
    console.log(c);
}
tentotwo(6);
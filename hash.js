function hashtable() {
    var table = {};
    var lose = function(key) {
        var hash = 0;
        for (var i = 0; i < key.length; i++) {
            hash += key.charCodeAt(i);
        }
        return hash % 37;
    }
    this.put = function(key, value) {
        var position = lose(key);
        console.log(position);
        table[position] = value;
    }
}
var ha = new hashtable()
ha.put('fdf', 'fdsdadada');

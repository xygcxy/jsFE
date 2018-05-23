// 硬币找零
function mincoin(coins) {
    var coins = coins;
    var cache = {};

    this.makeChange = function(amout) {
        var me = this;
        if (!amout) {
            return [];
        }
        if (cache[amout]) {
            return cache[amout];
        }
        var min = [], newMin, newAmout;
        for (var i=0; i<coins.length; i++) {
            var coin = coins[i];
            newAmout = amout - coin;
            // console.log(newAmout + 't')
            if (newAmout >= 0) {
                newMin = me.makeChange(newAmout);
            }
            if (newAmout >= 0 && (newMin.length < min.length-1 || !min.length) && (newMin.length || !newAmout)) {
                min = [coin].concat(newMin);

            }
        }
        return (cache[amout] = min);
    }
}

var mincoins = new mincoin([1,3,4]);
console.log(mincoins.makeChange(6));

// 背包
function knapSack(capacity, weight, values, n) {
    //value[3,4,5] weight[2,3,4] capicity5 n value.length
    var i, w, a, b, ks = [];
    for (i = 0; i <= n; i++) {
        ks[i] = [];
    }
    for (i = 0; i <= n; i++) {
        for (w = 0; w <= capacity; w++) {
            if (i == 0 || w == 0) {
                ks[i][w] = 0;
            } else if (weight[i - 1] <= w) { // 2 < 2  ks[1][2] i = 1, w = 2 ks[3][5] 4<=5
                a = values[i - 1] + ks[i-1][w-weight[i-1]]; //3+0  5+ks[2][1]
                b = ks[i-1][w]; // ks[0][2] = 0  ks[2][5]=7
                ks[i][w] = (a > b) ? a : b; //选择价值大的 3
            } else {
                ks[i][w] = ks[i-1][w];
            }
        }
    }
    var j = n, k = capacity;
    while(j > 0 && k > 0) { //3,5
        if (ks[j][k] !== ks[j-1][k]) {
            // 
            j--;
            k = k - ks[j][k] //5-ks[2][5]
        } else {
            j--;
        }
    }
    return ks[n][capacity];
}
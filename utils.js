const COIN_DATA = [
    { "name": " 𒀱", "color": "#ffffff", "value": 1e62, "class": "currency-shadow-rainbow" },
    { "name": " 𒀱", "color": "#ffffff", "value": 1e47, "class": "currency-shadow" },
    { "name": " 𒇫", "color": "#66ccff", "value": 1e41, "class": "currency-shadow" },
    { "name": "🜊", "color": "#00ff00", "value": 1e35, "class": "currency-bold" },
    { "name": "✹", "color": "#ffffcc", "value": 1e30 },
    { "name": "∰", "color": "#ff0083", "value": 1e26 },
    { "name": "Φ", "color": "#27b897", "value": 1e23 },
    { "name": "Ξ", "color": "#cd72ff", "value": 1e20 },
    { "name": "Δ", "color": "#f5c211", "value": 1e17 },
    { "name": "d", "color": "#ffffff", "value": 1e14 },
    { "name": "r", "color": "#ed333b", "value": 1e12 },
    { "name": "S", "color": "#6666ff", "value": 1e10 },
    { "name": "e", "color": "#2ec27e", "value": 1e8 },
    { "name": "p", "color": "#79b9c7", "value": 1e6 },
    { "name": "g", "color": "#E5C100", "value": 10000 },
    { "name": "s", "color": "#a8a8a8", "value": 100 },
    { "name": "c", "color": "#a15c2f", "value": 1 },
]
function formatMoney(money)
{
    var money2 = Math.floor(money)
    var money_list = ["","","",'#000000',"#000000","#000000"]
    var coinUsed = 0
    for(var i=0 ; i<=2; i++){
        for (var j = 1; j < COIN_DATA.length; j++) {
            var m = COIN_DATA[j].value;
            var prev = COIN_DATA[j - 1].value;
            var diff = prev ? prev / m : Infinity;
            var amount = Math.floor(money2 / m) % diff;
            if ((amount > 0 || (money2 < 1 && m == 1))) {
                money_list[i] = amount+COIN_DATA[j].name
                money_list[i+3] = COIN_DATA[j].color
                coinUsed++
                break
            }
        }
        money2 = money2-(amount*m)
        if(money2==0) break
}
return money_list
}
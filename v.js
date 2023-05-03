var app;
var caculateTime;
function loadVue() {
	app = new Vue({
	    el: "#app",
	    data: {
			player,
			tmp,
			format,
			Decimal,
			tab,
        }
	})
}

function CalcStartTime()
{
	var fulltime = this.time[0]+'-'+this.time[1]<10? '0'+this.time[1]:this.time[1]+'-'+this.time[2]<10? '0'+this.time[2]:this.time[2]+' '+this.time[3]<10? '0'+this.time[3]:this.time[3]+':'+this.time[4]<10? '0'+this.time[4]:this.time[4]+':'+this.time[5]<10? '0'+this.time[5]:this.time[5]
	player.StartTime = Date.parse(new Date(fulltime).toString())
}
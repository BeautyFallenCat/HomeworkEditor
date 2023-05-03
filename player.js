//初始player对象值
var storageName = "Homework";
intervals = {}
var gameData = {
	Subject:["语文","数学","英语","政治","历史","地理","生物","物理","化学"]
};
function getStartPlayer() {
	let p = {
    currTime: new Date().getTime(),
	currGameTime: new Date().getTime(),
	money: new Decimal(0),
	StartTime: Date.parse('2000-01-01 00:00:00'),
	EndTime: Date.parse('2050-01-01 00:00:00'),
	HomeworkName: '无名',
	IsActive: {
		0:[true,false,false,false,false],
		1:[false,false,false,false,false],
		2:[false,false,false,false,false],
		3:[false,false,false,false,false],
		4:[false,false,false,false,false],
		5:[false,false,false,false,false],
		6:[false,false,false,false,false],
		7:[false,false,false,false,false],
		8:[false,false,false,false,false],
	},
	MaxProgress: {
		0:[10,0,0,0,0],
		1:[0,0,0,0,0],
		2:[0,0,0,0,0],
		3:[0,0,0,0,0],
		4:[0,0,0,0,0],
		5:[0,0,0,0,0],
		6:[0,0,0,0,0],
		7:[0,0,0,0,0],
		8:[0,0,0,0,0],
	},
	Progress: {
		0:[6,0,0,0,0],
		1:[0,0,0,0,0],
		2:[0,0,0,0,0],
		3:[0,0,0,0,0],
		4:[0,0,0,0,0],
		5:[0,0,0,0,0],
		6:[0,0,0,0,0],
		7:[0,0,0,0,0],
		8:[0,0,0,0,0],
	},
	Weight: {
		0:[1,0,0,0,0],
		1:[0,0,0,0,0],
		2:[0,0,0,0,0],
		3:[0,0,0,0,0],
		4:[0,0,0,0,0],
		5:[0,0,0,0,0],
		6:[0,0,0,0,0],
		7:[0,0,0,0,0],
		8:[0,0,0,0,0],
	},
	Desc: {
		0:["写出由1-丁醇合成正戊烷的全部合成路线。(测试用)","","","",""],
		1:["","","","",""],
		2:["","","","",""],
		3:["","","","",""],
		4:["","","","",""],
		5:["","","","",""],
		6:["","","","",""],
		7:["","","","",""],
		8:["","","","",""],
	},
	};
	return p;
}

function fixPlayer() {
	let start = getStartPlayer();
	addNewV(player, start);
}
//检查player对象中是否有未定义对象，如果有替换为player初始值中的对应值，方便进一步游戏开发
//真是的，谁愿意游戏开发过程中加变量后一个个定义数值啊啊啊啊啊
//所以加入这个
//==系统提示：作者由于废话被禁言15min==
function addNewV(obj, start) {
	for (let x in start) {
		if (obj[x] === undefined) obj[x] = start[x]
		else if (typeof start[x] == "object" && !(start[x] instanceof Decimal)) addNewV(obj[x], start[x])
		else if (start[x] instanceof Decimal) obj[x] = new Decimal(obj[x])
	}
}
//加载游戏(网页body完成加载后运行)
function loadGame() {
	let g = localStorage.getItem(storageName);
    if (g !== null) player = JSON.parse(Base64.decode(g));
	else player = getStartPlayer();//玩家没玩过
	
	fixPlayer();//很重要!!!没了容易出事
	updateTemp();//加载各种二级变量
	updateTemp();
	updateTemp();
	updateTemp();
	updateTemp();
	loadVue();//加载vue
	intervals.game = setInterval(function() { gameLoop(0)}, 30) //30毫秒一个tick
	intervals.save = setInterval(function() { save(); }, 2500) //2.5秒一保存
}
function save() {
	localStorage.setItem(storageName, Base64.encode(JSON.stringify(player)));
}
//导入存档
function importSave() {
	let data = prompt("粘贴你的存档: ")
	if (data===undefined||data===null||data=="") return;
	try {
		player = JSON.parse(Base64.decode(data));
		save()
		window.location.reload();
	} catch(e) {
		console.log("导入失败!请检查你的存档的复制过程中是否有遗漏!");
		console.error(e);
		return;
	}
}
//导出存档(导出方式为*下载文件*)
function exportSave() {
	let data = Base64.encode(JSON.stringify(player))
	const a = document.createElement('a');
	a.setAttribute('href', 'data:text/plain;charset=utf-8,' + data);
	a.setAttribute('download', "fclwd_"+new Date()+".txt");
	a.setAttribute('id', 'downloadSave');

	document.body.appendChild(a);
	a.click();
	document.body.removeChild(a);
}
//重置游戏
function hardReset() {
	if (!confirm("你确定要重置所有作业吗...")) return;
	player = getStartPlayer();
	save();
	window.location.reload();
}
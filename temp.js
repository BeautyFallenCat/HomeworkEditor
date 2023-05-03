function updateTemp() {
	updateTempThought();
}
//更新所有游戏内二级变量的数值
function updateTempThought()
{
    tmp.moneyDisplay = formatMoney(player.money)
    CalcProgress()
    CalcMax()
    CalcSubjectProgress()
    CalcLastIndex()
    GetFontColor()
}

function CalcProgress()
{
    tmp.completed = 0
    for(var i = 0; i <= gameData.Subject.length-1; i++)
    {
        for(var j = 0; j <= 4 ; j++)
        {
            if(player.IsActive[i][j]) tmp.completed += (player.Progress[i][j]*player.Weight[i][j])
        }
    }
}

function CalcLastIndex()
{
    tmp.lastindex = [4,4,4,4,4,4,4,4,4]
    for(var i = 0; i <= gameData.Subject.length-1; i++)
    {
        for(var j = 0; j <= 4 ; j++)
        {
            if(player.IsActive[i][j] == false) {tmp.lastindex[i] = j - 1 ; break}
        }
    }
}

function CalcSubjectProgress()
{
    tmp.SubjectCompleted = [0,0,0,0,0,0,0,0,0]
    tmp.SubjectMax = [0,0,0,0,0,0,0,0,0]
    tmp.SubjectProgress = [0,0,0,0,0,0,0,0,0]
    for(var i = 0; i <= gameData.Subject.length-1; i++)
    {
        for(var j = 0; j <= 4 ; j++)
        {
            if(player.IsActive[i][j]) tmp.SubjectCompleted[i] += (player.Progress[i][j]*player.Weight[i][j])
        }
    }
    for(var i = 0; i <= gameData.Subject.length-1; i++)
    {
        for(var j = 0; j <= 4 ; j++)
        {
            if(player.IsActive[i][j]) tmp.SubjectMax[i] += (player.MaxProgress[i][j]*player.Weight[i][j])
        }
        tmp.SubjectProgress[i] = format(Math.max(tmp.SubjectCompleted[i],0.0001)/Math.max(tmp.SubjectMax[i],0.0001))
    }
}


function CalcMax()
{
    tmp.max = 0
    for(var i = 0; i <= gameData.Subject.length-1; i++)
    {
        for(var j = 0; j <= 4 ; j++)
        {
            if(player.IsActive[i][j]) tmp.max += (player.MaxProgress[i][j]*player.Weight[i][j])
        }
    }
    tmp.progress = format(Math.max(tmp.completed,0.0001)/Math.max(tmp.max,0.0001)*100)
}

function DeltaProgress(weight)
{
    let total = 0
    for(var i = 0; i <= gameData.Subject.length-1; i++)
    {
        for(var j = 0; j <= 4 ; j++)
        {
            if(player.IsActive[i][j]) total += (player.MaxProgress[i][j]*player.Weight[i][j])
        }
    }
    let progress = format(weight/total*100)
    return progress
}

function AddHomework(subject)
{
    if(tmp.lastindex[subject] == 4) {alert('你的'+gameData.Subject[subject]+'作业已经有5项了哦，不能再添加啦!真的会有学校这么卷吗，姐姐好同情呀ww');return}
    if(!confirm("你确定要为 "+gameData.Subject[subject]+" 科目添加一项作业吗？")) return
    player.Desc[subject][tmp.lastindex[subject]+1] = prompt('请输入新增的作业内容(如果不记得的话可以关注下家长群或者同学群哦!)')
    var a = prompt('请输入一个数字，代表新增的作业包含多少页练习册/多少张卷子/多少道题~')
    player.MaxProgress[subject][tmp.lastindex[subject]+1] = a
    var a = prompt('请输入一个数字，代表该项作业的每个部分占总作业量的权重~')
    player.Weight[subject][tmp.lastindex[subject]+1] = a
    player.IsActive[subject][tmp.lastindex[subject]+1] = true
}
function DeleteLastHomework(subject)
{
    if(tmp.lastindex[subject] == -1) {alert('你现在并没有任何'+gameData.Subject[subject]+'作业...为什么要继续删除呢，好疯狂呀!');return}
    if(!confirm("你确定要删除 "+gameData.Subject[subject]+" 科目的最后一项作业吗？故意逃避作业在姐姐看来不是好孩子哦...")) return
    if(!confirm("真的要删除吗...")) return
    player.Desc[subject][tmp.lastindex[subject]] = ''
    player.Progress[subject][tmp.lastindex[subject]] = 0
    player.MaxProgress[subject][tmp.lastindex[subject]] = 0
    player.Weight[subject][tmp.lastindex[subject]] = 0
    player.IsActive[subject][tmp.lastindex[subject]] = 0
}
function EditStartTime()
{
    if(!confirm("你确定要修改作业起始时间吗~")) return
    var a = prompt('请输入作业起始的时间!(格式如下:2023-03-03 11:45:13)')
    if(Date.parse(a).toString()=='NaN') {alert('输入的日期格式不对哦~');return}
    if(Date.parse(a)>Date.now()) {alert('作业的起始时间不能晚于现在时间哦');return}
    player.StartTime = Date.parse(a)
}
function EditEndTime()
{
    if(!confirm("你确定要修改作业结束时间吗~")) return
    var a = prompt('请输入作业结束的时间!(格式如下:2023-03-03 11:45:13)')
    if(Date.parse(a).toString()=='NaN') {alert('输入的日期格式不对哦~');return}
    if(Date.parse(a)<Date.now()) {alert('作业的结束时间不能早于现在时间哦');return}
    player.EndTime = Date.parse(a)
}
function EditHomeworkName()
{
    player.HomeworkName = prompt('请输入新的作业名称~(例:五一、周末、暑假)')
}
function GetFontColor()
{
    tmp.overflewProgress = tmp.progress-((Date.now()-player.StartTime)/(player.EndTime-player.StartTime))*100
    if(tmp.overflewProgress>20) return 'rgb(0,255,255)'
    else if(tmp.overflewProgress>10) return 'rgb(0,255,'+(tmp.overflewProgress-10)*25.5+')'
    else if(tmp.overflewProgress>0) return 'rgb(0,255,0)'
    else if(tmp.overflewProgress>-5) return 'rgb(255,255,0)'
    else if(tmp.overflewProgress>-25) return 'rgb(255,'+(255+((tmp.overflewProgress+5)*12.75))+',0)'
    else return 'red'
}
var remArray = new Array();
var reminder = function(currentReminder){
	this.text = currentReminder.value;
	this.id = currentReminder.id;
	this.note = "";
	this.priority = "";
	this.complete = getComplete(this.id);
	function getComplete(id){
		var index = getIndexForId(id);
		if(remArray[index])
			return remArray[index].complete;
		else return "no";
	}
}
reminder.prototype.save = function(){
	remArray[getIndexForId(this.id)] = this;
	var myJsonString = JSON.stringify(remArray);
	localStorage.setItem('reminder', myJsonString);
	var str = localStorage.getItem('reminder');
	var pars = JSON.parse(str);
}
reminder.prototype.delete = function(){
	var t = remArray.splice(getIndexForId(this.id),1);
	var myJsonString = JSON.stringify(remArray);
	localStorage.setItem('reminder', myJsonString);
	var str = localStorage.getItem('reminder');
	var pars = JSON.parse(str);
	loadReminders();
}
reminder.prototype.finishedToggle = function(){
	if(this.complete == "yes")this.complete = "no";
	else this.complete = "yes";
	remArray[getIndexForId(this.id)] = this;
	var myJsonString = JSON.stringify(remArray);
	localStorage.setItem('reminder', myJsonString);
	loadReminders();
}
function getIndexForId(id){
	for (var i = 0; i < remArray.length; i++){
		if(remArray[i].id == id){
			return i;
		}
	}
	return remArray.length;
}
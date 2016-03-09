var remArray = new Array();
var reminder = function(reminderTextField){
	this.text = reminderTextField.value;
	this.id = reminderTextField.id;
	this.note = "";
	this.priority = "";
	this.complete = getComplete(this.id);
    
	function getComplete(id) // fetches the value at the complete field of reminder object if it exists, otherwise returns "no".
    {     
		var index = getIndexForId(id);
		if(remArray[index])
			return remArray[index].complete;
		else return "no";
	}
}
reminder.prototype.save = function()
{
	remArray[getIndexForId(this.id)] = this;
	var myJsonString = JSON.stringify(remArray);
	localStorage.setItem('reminder', myJsonString);
}
reminder.prototype.delete = function()
{
	var deletedReminder = remArray.splice(getIndexForId(this.id),1);
	var myJsonString = JSON.stringify(remArray);
	localStorage.setItem('reminder', myJsonString);
	loadReminders();
}
reminder.prototype.finishedToggle = function() //toggles brtween finished and unfinished reminders.
{
	if(this.complete == "yes")this.complete = "no";
	else this.complete = "yes";
	remArray[getIndexForId(this.id)] = this;
	var myJsonString = JSON.stringify(remArray);
	localStorage.setItem('reminder', myJsonString);
	loadReminders();
}
function getIndexForId(id) //returns the unique id for each reminder object.
{
	for (var i = 0; i < remArray.length; i++){
		if(remArray[i].id == id){
			return i;
		}
	}
	return remArray.length;
}
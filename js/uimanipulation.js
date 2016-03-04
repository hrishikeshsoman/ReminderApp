var index=0;
show = 1;
var idIndex;
window.onload=function(){
    var jsonString = localStorage.getItem('reminder');
    if(jsonString != "" && jsonString != "[]"){
        remArray = (JSON.parse(jsonString));
        loadReminders();
        idIndex = parseInt(remArray[remArray.length-1].id)+1;
    }
    else {
        idIndex = 0;
    }
}
function loadReminders(){
    index = 0;
    document.getElementById("containerFinishedDiv").innerHTML="";
    document.getElementById("container").innerHTML="";
    while(index < remArray.length){
                addObject();
        }
}
function showOrHide(toggleButton){
    if(show==0) {
        show = 1;
        document.getElementById("containerFinishedDiv").style.display = "none";
        toggleButton.innerHTML = "Show completed";
    }
    else {
        show = 0;
        document.getElementById("containerFinishedDiv").style.display = "block";
        toggleButton.innerHTML = "Hide completed";
    }
}
function addObject(event) {
     if(!event||event.id=="add"||event.keyCode == 13) {
            var contentDiv = document.createElement('Div');
            contentDiv.id = "content";
            contentDiv.className = "contentDiv";

            var completedButton = document.createElement('Div');
            completedButton.className = "completedButtonDiv";
            completedButton.setAttribute("onclick","{new reminder(this.nextSibling.nextSibling.firstChild).finishedToggle();}");
            contentDiv.appendChild(completedButton);

            var deleteButton = document.createElement('Div');
            deleteButton.className = "deleteButtonDiv";
            deleteButton.innerHTML="&#10007";
            deleteButton.setAttribute("onclick","{new reminder(this.nextSibling.firstChild).delete();}");
            contentDiv.appendChild(deleteButton);


            var textDiv = document.createElement('Div');
            textDiv.id = "text";
            textDiv.className = "textContainer";
            contentDiv.appendChild(textDiv);

            
            var textField = document.createElement('Input');
            textField.className = "reminderField";
            textField.setAttribute("type","text");
            textField.setAttribute("onkeydown","addObject(event)");
            textField.setAttribute("onblur","{new reminder(this).save();}");
            textDiv.appendChild(textField);

            if(!remArray[index]){
                document.getElementById('container').appendChild(contentDiv);
                completedButton.innerHTML = "&#x2610";
              textField.focus();
              textField.setAttribute("id",idIndex);
              idIndex++;
            }
            else {
                textField.id = remArray[index].id;
                textField.value = remArray[index].text;
                if(remArray[index].complete == "no"){
                    completedButton.innerHTML = "&#x2610";
                     document.getElementById('container').appendChild(contentDiv);
                }
                else  {
                    completedButton.innerHTML = "&#x2611";
                    document.getElementById('containerFinishedDiv').appendChild(contentDiv);
                }
            }

            index++;   
        }


}
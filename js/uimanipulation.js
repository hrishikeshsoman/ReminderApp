var index=0;
window.onload=function(){
    while(index < 4){// 4 dummy values
           addObject();
    }     
}

function addObject(event) {
     if(!event||event.id=="add"||event.keyCode == 13) {
            var contentDiv = document.createElement('Div');
            contentDiv.id = "content";
            contentDiv.className = "contentDiv";

            var buttonDiv = document.createElement('Div');
            buttonDiv.id = "button";
            buttonDiv.className = "buttonDiv";
            contentDiv.appendChild(buttonDiv);

            var textDiv = document.createElement('Div');
            textDiv.id = "text";
            textDiv.className = "textContainer";
            contentDiv.appendChild(textDiv);

            var textField = document.createElement('Input');
            textField.id = "textfield";
            textField.className = "reminderField";
            textField.setAttribute("type","text");
            textField.setAttribute("id",index);
            textField.setAttribute("onkeydown","addObject(event)");
            textField.setAttribute("onblur","save(this)");
            textDiv.appendChild(textField);
             
            var completedButton = document.createElement('Div');
            completedButton.className = "completedButtonDiv";
            completedButton.innerHTML = "o";
            completedButton.setAttribute("onclick","removeObject(this)");
            contentDiv.appendChild(completedButton);

            var deleteButton = document.createElement('Div');
            deleteButton.className = "deleteButtonDiv";
            deleteButton.innerHTML="-";
            deleteButton.setAttribute("onclick","removeObject(this)");
            contentDiv.appendChild(deleteButton);

            document.getElementById('container').appendChild(contentDiv);
             
            index++;   
        }


}

function removeObject(element){
    element.parentNode.parentNode.removeChild(element.parentNode);
}
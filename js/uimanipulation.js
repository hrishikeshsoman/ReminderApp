var index=0;
var show = 1;
var idIndex;

var newReminderField;
var oldReminderField;

var completedUncheckedButton;
var completedCheckedButton;

var deleteButton;
var innerDiv;

window.onload=function() // fetches the reminder array from local storage if available
{
    var jsonString = localStorage.getItem('reminder');
    if(jsonString != "" && jsonString != "[]" && jsonString != null) 
    {
        remArray = (JSON.parse(jsonString));
        loadReminders();
        idIndex = parseInt(remArray[remArray.length-1].id)+1; 
    }
    else 
    {
        idIndex = 0;
    }
}
function loadReminders()  // populates the available reminders on the screen.
{
    index = 0;
    document.getElementById("containerFinishedDiv").innerHTML="";
    document.getElementById("containerDiv").innerHTML="";
    while(index < remArray.length)
        {
                addObject();
        }
}
function showOrHide(toggleButton) 
{
    if(show==0) 
    {
        show = 1;
        document.getElementById("containerFinishedDiv").style.display = "none";
        toggleButton.innerHTML = "Show completed";
    }
    else 
    {
        show = 0;
        document.getElementById("containerFinishedDiv").style.display = "block";
        toggleButton.innerHTML = "Hide completed";
    }
}
function addObject(event) // adds a single reminder with UI
{
     if(!event||event.id=="add"||event.keyCode == 13) // 13: keycode for enter key
     {
         
            deleteButton =  "<div class = \"contentDiv\">"
                            + " <div class = \"deleteButtonDiv\" onclick=\"{new reminder(this.nextSibling.nextSibling.nextSibling.nextSibling.firstChild).delete();}\"> &#10007 "
                            + "</div>";  // &#10007 unicode character for x symbol  
            
            if(!remArray[index]) //creates new reminders
            {
                completedUncheckedButton =  " <div class=\"completedButtonDiv\" onclick=\"{new reminder(this.nextSibling.nextSibling.firstChild).finishedToggle();}\">"
                                            + "&#x2610</div>" ; // &#x2610 unicode character for ballot box
                
                newReminderField =  " <div id = \"textDiv\" class=\"textContainer\">"
                                        +  "<input id = "+idIndex+" type=\"text\" class=\"reminderField\" onblur=\"{new reminder(this).save();}\"  onkeydown = \"addObject(event)\" >"
                                        +  "</input>"
                                        + "</div>"
                                        + "</div>";
                                        
                innerDiv = document.createElement('div');
                innerDiv.class = "innerDiv";
                innerDiv.innerHTML = deleteButton + completedUncheckedButton + newReminderField;
                document.getElementById('containerDiv').appendChild(innerDiv);
                document.getElementById(idIndex).focus();   
                idIndex++;
            }
            else  // reloads the saved reminders
            {
                oldReminderField =  " <div id = \"textDiv\" class=\"textContainer\">"
                                    +  "<input id = "+remArray[index].id+" type=\"text\" class=\"reminderField\" onblur=\"{new reminder(this).save();}\"  onkeydown = \"addObject(event)\" >"
                                    +  "</input>"
                                    + "</div>"
                                    + "</div>";
            
                innerDiv = document.createElement('div');
                innerDiv.class = "innerDiv";
                
                if(remArray[index].complete == "no")
                {
                     completedUncheckedButton =  " <div class=\"completedButtonDiv\" onclick=\"{new reminder(this.nextSibling.nextSibling.firstChild).finishedToggle();}\">"
                                                 + "&#x2610</div>" ; // &#x2610 unicode character for ballot box
                                               
                     innerDiv.innerHTML = deleteButton + completedUncheckedButton + oldReminderField;
                     document.getElementById('containerDiv').appendChild(innerDiv);    
                }
                else  
                {
                    completedCheckedButton =  " <div class=\"completedButtonDiv\" onclick=\"{new reminder(this.nextSibling.nextSibling.firstChild).finishedToggle();}\">"
                                              + "&#x2611</div>" ; // &#x2611 unicode character for ballot box checked
                    innerDiv.innerHTML = deleteButton + completedCheckedButton + oldReminderField;
                    document.getElementById('containerFinishedDiv').appendChild(innerDiv);      
                }
                document.getElementById(remArray[index].id).value = remArray[index].text;
            }

            index++;   
        }
}
function MenuChoice()
{
 if (document.getElementById("menu").value == "Display Section 1")
 {
 document.getElementById("section1").style.visibility = "visible";
 document.getElementById("section2").style.visibility = "hidden";
 document.getElementById("section3").style.visibility = "hidden";
 document.getElementById("section4").style.visibility = "hidden";
 document.getElementById("section5").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Display Section 2")
 {
 document.getElementById("section1").style.visibility = "hidden";
 document.getElementById("section2").style.visibility = "visible";
 document.getElementById("section3").style.visibility = "hidden";
 document.getElementById("section4").style.visibility = "hidden";
 document.getElementById("section5").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Display Section 3")
 {
 document.getElementById("section1").style.visibility = "hidden";
 document.getElementById("section2").style.visibility = "hidden";
 document.getElementById("section3").style.visibility = "visible";
 document.getElementById("section4").style.visibility = "hidden";
 document.getElementById("section5").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Display Section 4")
 {
 document.getElementById("section1").style.visibility = "hidden";
 document.getElementById("section2").style.visibility = "hidden";
 document.getElementById("section3").style.visibility = "hidden";
 document.getElementById("section4").style.visibility = "visible";
 document.getElementById("section5").style.visibility = "hidden";
 }
 else if (document.getElementById("menu").value == "Display Section 5")
 {
 document.getElementById("section1").style.visibility = "hidden";
 document.getElementById("section2").style.visibility = "hidden";
 document.getElementById("section3").style.visibility = "hidden";
 document.getElementById("section4").style.visibility = "hidden";
 document.getElementById("section5").style.visibility = "visible";
}
else
{
 document.getElementById("section1").style.visibility = "hidden";
 document.getElementById("section2").style.visibility = "hidden";
 document.getElementById("section3").style.visibility = "hidden";
 document.getElementById("section4").style.visibility = "hidden";
 document.getElementById("section5").style.visibility = "hidden";  
}
}


function GetCatList()
{
 var objRequest = new XMLHttpRequest();
 var url = "https:student.business.uab.edu/jsonwebservice/service1.svc/getAllCategories";
 
 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var output = JSON.parse(objRequest.responseText);
 GenerateOutput(output);
 }
 }

 //Initiate the server request
 objRequest.open("GET", url, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send();
}
function GenerateOutput(result)
{
 var count = 0;
 var displaytext = "<table><tr><th>Category ID</th><th>Category Name</th><th>Category Description</th></tr>";

 //Loop to extract data from the response object
 for (count = 0; count < result.GetAllCategoriesResult.length; count++)
 {
  displaytext+= "<tr align=center>";
  displaytext+= "<td>" + result.GetAllCategoriesResult[count].CID +"</td>";
  displaytext+= "<td>";
  displaytext+= result.GetAllCategoriesResult[count].CName;
  displaytext+= "</td>";
  displaytext+= "<td>";
  displaytext+= result.GetAllCategoriesResult[count].CDescription;
  displaytext+= "</td></tr>";
//result += "<tr><td>" + (count + 1) + "</td><td>" + meetingnumber + "</td></tr>"; //Table rows
 }
 displaytext += "</table";
 document.getElementById("catlistresult").innerHTML = displaytext;
}

function CreateCat()
{
  var objRequest = new XMLHttpRequest();
  var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/CreateCategory";
  
  var catname = document.getElementById("catname").value;
  var catdesc = document.getElementById("catdescription").value;
  var newcat = '{"CName":"' + catname + '","CDescription":"' + catdesc + '"}';
  
   //Checking for AJAx operation return
 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var result = JSON.parse(objRequest.responseText);
 OperationResult(result);
 }
 }
 objRequest.open("POST", url, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send(newcat);
 function OperationResult(output)
{
 if (output.WasSuccessful == 1)
 {
 document.getElementById("catstatus").innerHTML = "The operation was successful!"
 }
 else if (output.WasSuccesful == 0)
 {
 document.getElementById("catstatus").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
 }
 else
 {
  document.getElementById("catstatus").innerHTML = "The operation was not successful!";
 }
}
}

function UpdateDesc()
{
 var objRequest = new XMLHttpRequest();
 var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/updateCatDescription";
 var catID = document.getElementById("catiddesc").value;
 var catdesc2 = document.getElementById("catdesc").value;
 var newcat2 = '{"CID":"' + catID + '","CDescription":"' + catdesc2 + '"}';
 
  //Checking for AJAx operation return
 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var result = JSON.parse(objRequest.responseText);
 OperationResult(result);
 }
 }

 //Start AJAX request
 objRequest.open("POST", url, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send(newcat2);

}
function OperationResult(output)
{
 if (output.WasSuccessful == 1)
 {
 document.getElementById("netcatstatus").innerHTML = "The operation was successful!"
 }
 else
 {
 document.getElementById("netcatstatus").innerHTML = "The operation was not successful!" + "<br>" + output.Exception;
 }
}

function DeleteCategory()
{
 var objRequest = new XMLHttpRequest();
 var url = "https://student.business.uab.edu/jsonwebservice/service1.svc/deleteCategory/";
 url += document.getElementById("delcat").value;
 
 objRequest.onreadystatechange = function()
 {
 if (objRequest.readyState == 4 && objRequest.status == 200)
 {
 var output = JSON.parse(objRequest.responseText);
 GenerateResult(output);
 }
 }

 //Initiate the server request
 objRequest.open("GET", url, true);
 objRequest.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
 objRequest.send();
}
function OperationResult(result)
{
 if (result.DeleteCategoryResult.WasSuccessful == 1)
 {
 document.getElementById("delcatstatus").innerHTML = "The operation was successful!"
 }
 else if (result.DeleteCategoryResult.WasSuccessful == 0)
 {
 document.getElementById("delcatstatus").innerHTML = "The operation was not successful!" + "<br>" + result4.Exception;
 }
}

 
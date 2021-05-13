$(document).ready(function()
{ 
if ($("#alertSuccess").text().trim() == "") 
 { 
 $("#alertSuccess").hide(); 
 } 
 $("#alertError").hide(); 
}); 


// SAVE ============================================
$(document).on("click", "#btnSave", function(event) 
{ 
// Clear alerts---------------------
 $("#alertSuccess").text(""); 
 $("#alertSuccess").hide(); 
 $("#alertError").text(""); 
 $("#alertError").hide(); 
// Form validation-------------------
var status = validatePaymentForm(); 

if (status != true) 
 { 
 $("#alertError").text(status); 
 $("#alertError").show(); 
 return; 
 } 
// If valid------------------------
var type = ($("#hidPIDSave").val() == "") ? "POST" : "PUT"; 
$.ajax( 
{ 
url : "PaymentAPI", 
type : type, 
data : $("#formPay").serialize(), 
dataType : "text", 
complete : function(response, status) 
{ 
onPaymentSaveComplete(response.responseText, status); 
} 
}); 
}); 
// UPDATE==========================================
$(document).on("click", ".btnUpdate", function(event) 
{ 
	$("#hidPIDSave").val($(this).data("pid")); 
 $("#pMethod").val($(this).closest("tr").find('td:eq(0)').text()); 
 $("#itemName").val($(this).closest("tr").find('td:eq(1)').text()); 
 $("#itemPrice").val($(this).closest("tr").find('td:eq(2)').text()); 
 $("#email").val($(this).closest("tr").find('td:eq(3)').text()); 
});


$(document).on("click", ".btnRemove", function(event)
		{ 
		 $.ajax( 
		 { 
		 url : "PaymentAPI", 
		 type : "DELETE", 
		 data : "PID=" + $(this).data("pid"),
		 dataType : "text", 
		 complete : function(response, status) 
		 { 
		 onPaymentDeleteComplete(response.responseText, status); 
		 } 
		 }); 
		});


//CLIENT-MODEL================================================================
function validatePaymentForm() 
{ 
// CODE
if ($("#pMethod").val().trim() == "") 
 { 
 return "Insert Payment Method."; 
 } 
// NAME
if ($("#itemName").val().trim() == "") 
 { 
 return "Insert Item Name."; 
 } 
//PRICE-------------------------------
if ($("#itemPrice").val().trim() == "") 
 { 
 return "Insert Item Price."; 
 } 
// is numerical value
var tmpPrice = $("#itemPrice").val().trim(); 
if (!$.isNumeric(tmpPrice)) 
 { 
 return "Insert a numerical value for Item Price."; 
 } 
// convert to decimal price
 $("#itemPrice").val(parseFloat(tmpPrice).toFixed(2)); 
// DESCRIPTION------------------------
if ($("#email").val().trim() == "") 
 { 
 return "Insert Email Address."; 
 } 
return true; 
}

function onPaymentSaveComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully saved."); 
 $("#alertSuccess").show(); 
 $("#divPaymentGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while saving."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while saving.."); 
 $("#alertError").show(); 
 } 
$("#hidPIDSave").val(""); 
$("#formPay")[0].reset(); 
}


function onPaymentDeleteComplete(response, status)
{ 
if (status == "success") 
 { 
 var resultSet = JSON.parse(response); 
 if (resultSet.status.trim() == "success") 
 { 
 $("#alertSuccess").text("Successfully deleted."); 
 $("#alertSuccess").show(); 
 $("#divPaymentGrid").html(resultSet.data); 
 } else if (resultSet.status.trim() == "error") 
 { 
 $("#alertError").text(resultSet.data); 
 $("#alertError").show(); 
 } 
 } else if (status == "error") 
 { 
 $("#alertError").text("Error while deleting."); 
 $("#alertError").show(); 
 } else
 { 
 $("#alertError").text("Unknown error while deleting.."); 
 $("#alertError").show(); 
 } 
}

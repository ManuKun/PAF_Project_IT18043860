<%@page import="com.Payment"%>
<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Payments</title>
<link rel="stylesheet" href="Views/bootstrap.min.css">
<script src="Components/jquery-3.2.1.min.js"></script>
<script src="Components/payments.js"></script>
</head>
<body> 
<div class="container"><div class="row"><div class="col-6"> 
<h1>Payments</h1>
<form id="formPay" name="formPay">
 Payment Method: 
 <input id="pMethod" name="pMethod" type="text" 
 class="form-control form-control-sm">
 <br> Item name: 
 <input id="itemName" name="itemName" type="text" 
 class="form-control form-control-sm">
 <br> Item price: 
 <input id="itemPrice" name="itemPrice" type="text" 
 class="form-control form-control-sm">
 <br> E-Mail Address: 
 <input id="email" name="email" type="text" 
 class="form-control form-control-sm">
 <br>
 <input id="btnSave" name="btnSave" type="button" value="Save" 
 class="btn btn-primary">
 <input type="hidden" id="hidPIDSave" 
 name="hidPIDSave" value="">
</form>
<div id="alertSuccess" class="alert alert-success"></div>
<div id="alertError" class="alert alert-danger"></div>
<br>
<div id="divPaymentGrid">
	<%
 		Payment PaymentObj = new Payment(); 
 		out.print(PaymentObj.readPayments()); 
 	%>
</div>
</div> </div> </div> 
</body>
</html>
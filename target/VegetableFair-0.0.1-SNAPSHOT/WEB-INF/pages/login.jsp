<%@ page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
	request.setAttribute("ctx", basePath);
%>

<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<meta charset="utf-8">
<meta http-equiv="X-UA-Compatible" content="IE=8" />
<title>CMS系统</title>
<script src="${ctx }/js/jquery.js"></script>
<script type="text/javascript">
	$(document).ready(function() {
		document.getElementById('loginForm').action = "http://" + "${CMSIP }" + ":" + "${CMSPort }" + "/CMS/login/login"; 
		$("#loginForm").submit();
	});
</script>
</head>
<body>
	<h1>CMS系统</h1>
	<form method="post" id="loginForm">
		<ul class="login_k">
			<input type="text" name="user" value="${username }">
			<input type="password" name="pwd" value="${password }">
		</ul>
	</form>
</body>
</html>

/**
 * 截图方法
 * @author lixiang
 * @screenshot 截图对象
 * @filePath 图片保存路径
 * @name 图片名称
 */

var screenshot = new Screenshot ();//创建截图对象
var filePath;//图片保存路径
var name;//图片名称
var parentLink = window.dialogArguments;
$(document).ready(function(){
	//设置默认路径
	$("#path").val(new ActiveXObject("WScript.Shell").ExpandEnvironmentStrings("%UserProfile%\\Desktop"));
	/*浏览事件*/
	$(".jt_tk_ll").click(function(){
		filePath = screenshot.getPath();
	});
	/*确定*/
	$("#ensure").unbind('click').click(function(){
		window.dialogArguments.document.getElementById("printScreenFrame").style.display = "block";
		parentLink.imageName = $.trim($("#name").val());
		parentLink.imageFilePath = $("#path").val();
		if(parentLink.imageName==''){
			alert("图片名称不能为空");
			$("#name").val('');
			return;
		 }
		parentLink.imagePrint();
		filePath = '';
		name = '';
		window.close();
	});
	/*取消事件*/
	$("#cancel").unbind('click').click(function(){
		screenshot.cancel();
	});
});

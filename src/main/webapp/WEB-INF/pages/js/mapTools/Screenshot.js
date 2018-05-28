/**
 * 截图方法封装
 * @author lixiang
 * 
 */
var Screenshot = OM.Class.extend({ 
	"type" : "screenshot", 
	/*获取文件路径*/
	"getPath" : function(){
		try{
				var shell = new ActiveXObject("Shell.Application");//获取弹窗对象
				var folder = shell.BrowseForFolder(0,"请选择存储路径", 0);//获取文件夹名称
				if(folder != null){
					if(folder == "桌面"){
						var shell_2 = new ActiveXObject("WScript.Shell");
						filePath = shell_2.ExpandEnvironmentStrings("%UserProfile%\\Desktop");//扩展默认路径
					}else{
						filePath = folder.Items().Item().Path;//获取浏览路径	
					}
					if(!filePath){
						alert("请选择路径");
						return;
					}
					if(filePath != null){
						 $("#path").val(filePath);					 
					}
				}				
		}catch(e){
			alert(e.message);
		}
	},
	/*截图方法调用*/
	"imagePrint" : function(map3D){
		 name = $.trim($("#name").val()); // 获取图片名称去前后空格
		 if(name==''){
			alert("图片名称不能为空");
			$("#name").val('');
			return;
		 }else{
			filePath = $("#path").val() +"\\"; //SDK需求，拼接路径
			name = "" + name + ".jpg";
			map3D.imageCut(filePath, name, 4);//调用SDK截图方法
			window.dialogArguments.parent.content3d.attachEvent("FireOnResponserNotify", screenshot.imageEvent);
			$("#ensure").unbind('click');//点击事件只触发一次
		 }
	},
	
	/*截图事件*/
	"imageEvent" : function(str,id){
		if(str == "SceneshotResponser"){ 
			if(id){ 
				//window.dialogArguments.document.getElementById("screenshotFrame").style.display = "none";
				alert("截图成功,图片保存路径为:" + filePath + name );
				//window.dialogArguments.parent.map.RemoveResponser("SceneshotResponser"); //移除截图响应器
				//window.dialogArguments.parent.content3d.detachEvent("FireOnResponserNotify", screenshot.imageEvent);
				filePath = "";
				screenshot.cancel();
				
			} 
		} 
	},
	
	/*截图关闭事件*/
	"cancel" : function(){
		window.close();
	}
});
//注册类名
OM.Class.className(Screenshot, "Screenshot");
// 空间命名
OM["Screenshot"] = Screenshot;
	 
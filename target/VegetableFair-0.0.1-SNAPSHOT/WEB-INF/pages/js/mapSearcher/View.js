/**
 * 视点管理
 * 
 * @author DL
 * @creatDate 2017-09-28
 */
// 视点默认状态
var sdState = 1;
// map页面弹出框
var webResp = null;
// 弹出框页面路径
var pageBouncedUrl = "http://" + projectIP + ":" + projectPort
		+ "/VegetableFair/mapTools/appendView.do";
// 经度
var conx;
// 纬度
var cony;
// 高程
var conz;
// 视点名称
var WegditViewName;
// 视点备注
var WegditViewNote;
// 模糊查询-名称结果集
var nameViewArray = [];

$(document).ready(function() {
	/** 视点map弹出框* */
//	 $('.sdsc_btn').unbind('click').click(function() {
//		 addView("测试 " + Math.floor((Math.random() * 199 + 1) * 100));
//	 });
	
	// 动态新弹框
//	$('.sdsc_btn').unbind('click').click(function() {
//		if (sdState) {
//			$(".sdsc_btn").css("background", "url(../img/sdsc_btn1.png)");
//			sdState = 0;
//			content3d.attachEvent("FireOnLButtonUp", showWegdit);// 出现弹框
//			content3d.attachEvent("FireOnResponserNotify", saveWegdit);// 弹框功能
//		} else {
//			$(".sdsc_btn").css("background", "url(../img/sdsc_btn.png)");
//			sdState = 1;
//			// 动态框
//			content3d.detachEvent("FireOnLButtonUp", showWegdit);
//			content3d.detachEvent("FireOnResponserNotify", saveWegdit);
//			cancelWegdit();
//		}
//	});
	
	// 静态新弹框
	$('.sdsc_btn').unbind('click').click(function() {
		if (sdState) {
			ShowWebDialog();
		} else {
			HideWebDialog();
		}
	});
	
});

/**
 * 根据name查询视点结果
 * 
 * @param viewPointName,视点名称
 */
function findViewPointByName(viewPointName) {
	nameViewArray = [];
	// 将异步方法改为同步方法
	$.ajaxSettings.async = false;
	$.ajax({
		url : '../mapTools/findView.do',
		type : "post",
		data : {
			name : viewPointName,
			pageNo : "1"
		},
		success : function(data) {
			// 每一条结果集
			var records = data.record.records;
			for (var i = 0; i < records.length; i++) {
				nameViewArray.push(records[i].name);
			}
		},
		error : function(e) {
		}
	});
	return nameViewArray;
}

/**
 * 新增视点
 * 
 * @param viewPointName,名称
 * @param viewPointDescr,备注
 */
function addView(viewPointName, viewPointDescr) {
	// 新增视点避免名称重复
	var nameArr=findViewPointByName(viewPointName);
	for(var i=0;i<nameArr.length;i++){
		if(nameArr[i] == viewPointName){
			alert("视点名称已存在!");
			return;
		}
	}
	// 备注
	if (!viewPointDescr) {
		viewPointDescr = "";
	}
	// 获取当前视点
	var points = map3D.getViewPoint();
	var pointList = points.split(";");

	$.ajax({
		url : '../mapTools/addView.do',
		type : "post",
		data : {
			userId : "",
			name : viewPointName,
			descr : viewPointDescr,
			x : pointList[0].split(":")[1],
			y : pointList[1].split(":")[1],
			z : pointList[2].split(":")[1],
			rotateAngle : pointList[3].split(":")[1],
			overAngle : pointList[4].split(":")[1],
			range : pointList[5].split(":")[1]
		},
		success : function(data) {
			if (data.success == 1) {
				findViewPoint(1);
				alert("视点添加成功");
			}else{
				alert(data.msg);
			}
		},
		error : function(e) {
		}
	});
}

/**
 * 删除视点
 * 
 * @param id,数据id
 */
function deleteView(id) {
	if(confirm("确定删除此视点?")){
		$.ajax({
			url : '../mapTools/deleteView.do',
			type : "post",
			data : {
				id : id
			},
			success : function(data) {
				if (data.success == 1) {
					findViewPoint(1);
				}else{
					alert(data.msg);
				}
			},
			error : function(e) {
			}
		});
	}
}

/**
 * 更新视点
 * 
 * @param thisId,数据id
 */
// 打开修改框
function openModify(thisId,descr) {
	/** 修改功能框中赋值* */
	// 名称-name
	var viewInputText = $("#" + thisId).val().split("_")[1];
	// 备注-descr
	var viewTextarea = $("#" + thisId).val().split("_")[2];
	viewTextarea = viewTextarea == "null" ? "" : viewTextarea;
	$("#viewInputText").val(viewInputText);
	$("#viewTextarea").val(viewTextarea);
	// 修改框显隐
	$('.bzxg_menu_sd').show();
	/** 视点修改框---确定* */
	$('#modifySure').unbind('click').click(function() {
		var id = $("#" + thisId).val().split("_")[0];
		modifyView(id,descr);
		$('.bzxg_menu_sd').hide();
	});
	/** 视点修改框---删除* */
	$('#modifyErase').unbind('click').click(function() {
		$('.bzxg_menu_sd').hide();
	});
}
// 更新视点
function modifyView(id,descr) {
	// 获取当前视点
	var points = map3D.getViewPoint();
	var pointList = points.split(";");
	// 获取修改框信息
	var viewInputText = $("#viewInputText").val();
	var viewTextarea = $("#viewTextarea").val();
	// 修改视点避免名称重复
	var nameArr=findViewPointByName(viewInputText);
	for(var i=0;i<nameArr.length;i++){
		// 若名称已存在且备注不变
		if((nameArr[i] == viewInputText)&&(descr==viewTextarea)){
			alert("视点已存在,修改失败!");
			return;
		}
	}
	$.ajax({
		url : '../mapTools/modifyView.do',
		type : "post",
		data : {
			id : id,
			name : viewInputText,
			descr : viewTextarea,
			x : pointList[0].split(":")[1],
			y : pointList[1].split(":")[1],
			z : pointList[2].split(":")[1],
			rotateAngle : pointList[3].split(":")[1],
			overAngle : pointList[4].split(":")[1],
			range : pointList[5].split(":")[1]
		},
		success : function(data) {
			if (data.success == 1) {
				findViewPoint(1);
			}
		},
		error : function(e) {
		}
	});
}

/**
 * 查询视点
 * 
 * @param pagenumber,页码
 */
function findViewPoint(pagenumber) {
	// 搜索值为空则查询所有结果
	var viewPointName = '';
	$.ajax({
		url : '../mapTools/findView.do',
		type : "post",
		data : {
			name : viewPointName,
			pageNo : pagenumber
		},
		success : function(data) {
			// 视点结果列表
			var viewResultList = '';
			if (data.success == 1) {
				// 每一条结果集
				var records = data.record.records;
				// 结果集总数
				var totalRecords = data.record.totalRecords;
				// 总页数
				var totalPage = data.record.totalPage;
				for (var i = 0; i < records.length; i++) {
					var record = records[i];
					var id = record.id;
					var name = record.name;
					//对备注进行判空运算
					var descr = record.descr;
					descr = descr == null ?'' : descr;
					viewResultList += '<ul id="' + id + '" class="map_dttc_qxsy" value="' + id + "_" + name + "_" + descr + '">';
					viewResultList += '<span class="map_dttc_qxsy_xh"> <span class="fh">' + (i + 1) + '</span>';
					viewResultList += '</span>';
					viewResultList += '<span onclick="flyViewPoint(' + record.longitude + ',' + record.latitude + ',' + record.elevation + ','
							       + record.rotateAngle + ',' + record.overAngle + ',' + record.range + ',' + id + ');">' + record.name + '</span>';
					viewResultList += '<span class="sdsc_sc" id="deleteView" onclick="deleteView(\'' + id + '\')"></span>';
					viewResultList += '<span class="sdsc_bj" id="updateView" onclick="openModify(\'' + id + '\',\'' + descr +'\')"></span>';
					viewResultList += '</ul>';
				}
				/** 分页查询* */
				viewResultList += viewPager(pagenumber, totalPage);
			}
			$('.sdsc_lb').html(viewResultList);
			$('.sdsc_bj').unbind('click').click(function() {
				$('.bzxg_menu_sd').show();
			});
		},
		error : function(e) {
		}
	});
}

/**
 * 分页查询
 * 
 * @param pageNo,页码
 * @param totalPage,总页数
 * @returns {String},列表节点
 */
function viewPager(pageNo, totalPage) {
	// 若超出限制则只显示前25*9---200条记录
	if (totalPage > 25) {
		totalPage = 25;
	}
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageNode = "";
	pageNode += '<div style="width: 100%; height: 24px; background: #f0f3f4;position: absolute; bottom: 0px;">';
	pageNode += '<div class="fanye1">';
	// 第一页
	pageNode += '<span style="width: 25px;" onclick="findViewPoint(' + 1 + ')">&lt;&lt;</span> ';
	// 上一页
	if (currPage == 1) {
		pageNode += '<span style="width: 20px;">&lt;</span> ';
	} else {
		pageNode += '<span style="width: 20px;" onclick="findViewPoint(' + (pageNo - 1) + ')">&lt;</span> ';
	}
	// 当前页
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	var endPage = (startPage + 3) > totalPage ? totalPage : (startPage + 3);
	for (var page = startPage; page <= endPage; page++) {
		if (page == currPage) {
			pageNode += '<span style="width: 25px;" class="shuzi"><b>' + page + '</b></span>';
		} else {
			pageNode += '<span style="width: 25px;" class="shuzi" onclick="findViewPoint(' + page + ')">' + page + '</span>';
		}
	}
	// 下一页
	if (currPage == totalPage) {
		pageNode += '<span style="width: 20px;">&gt;</span>';
	} else {
		pageNode += '<span style="width: 20px;" onclick="findViewPoint(' + (pageNo + 1) + ')">&gt;</span>';
	}
	// 最后一页
	pageNode += '<span style="width: 25px;" onclick="findViewPoint(' + totalPage + ')">&gt;&gt;</span>';
	pageNode += '</div>';
	pageNode += '</div>';
	return pageNode;
}

/**
 * 地图点击框
 */
/** **********************************************固定框********************************************* */
var webobject;
/**
 * 打开网页静态框
 */
function ShowWebDialog() {
	// 开启的样式
	$(".sdsc_btn").css("background", "url(../img/sdsc_btn1.png)");
	sdState = 0;
	var opt = tools.CreateToolsOptions("web"); // /< 创建配置项
	opt.AddConfig("Url", pageBouncedUrl); // /< 网页链接地址
	opt.AddConfig("Left", "850"); // /< 屏幕位置x
	opt.AddConfig("Top", "450"); // /< 屏幕位置y
	opt.AddConfig("Widget", "348"); // /< 页面宽度
	opt.AddConfig("Height", "198"); // /< 页面高度
	webobject = tools.CreateToolsObject("WebInfoTool", opt); // /< 创建工具类型
	webobject.AddObserver();
	webobject.Active(); // /< 激活工具类
	/*setTimeout(function(){
		var str = "hello";
		var opt = tools.CreateToolsOptions("web");											///< 创建配置项
		opt.AddConfig("FunctionName", "Test");												///< 页面宽度
		opt.AddConfig("FunctionParam", str);												///< 页面高度		
		webobject.UpdateToolsOption(opt);
	}, 100);*/
	// 开启响应事件
	//content3d.attachEvent("FireOnToolsNotify", saveWebDialog);
	saveWebDialog(true);
}
/**
 * 关闭网页静态框
 */
function HideWebDialog() {
	// 关闭的样式
	$(".sdsc_btn").css("background", "url(../img/sdsc_btn.png)");
	sdState = 1;
	webobject.Deactive(); // /< 移除网页弹窗界面
	// 关闭响应事件
	content3d.detachEvent("FireOnToolsNotify", saveWebDialog);
}
/**
 * 处理页面框
 */
function saveWebDialog(flage) {
	if(flage){
		function VPSDKCtrl::FireOnToolsNotify(str,id)
		{
	var msg = webobject.GetToolsResult().GetConfigValueByKey("Param");
	var msgs = msg.split("@#");
	if (msgs[0] == "1") {// 保存
		// 视点名称
		WegditViewName = msgs[1];
		// 视点备注
		WegditViewNote = msgs[2];
		if(!WegditViewName){
			alert("视点名称不能为空!");
			return;
		}
		addView(WegditViewName, WegditViewNote);
		HideWebDialog();
	} else {// 取消或关闭
		HideWebDialog();
	}
		}
	}
}
/** **********************************************移动框********************************************* */
function showWegdit(x, y) {
	// 设置位置为当前屏幕中间
	if (webResp) {
		/** 坐标转换* */
		var convert = translate.ScreenPosToWorldPos(x, y);
		conx = convert.GetX();
		cony = convert.GetY();
		conz = convert.GetZ();
		var pOption = map.CreateResponserOptions("123"); // /< 创建响应器配置项
		pOption.AddConfig("Longitude", conx); // /< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", cony); // /< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight", conz); // /< 指向经纬度坐标高度
		webResp.UpdateResponserOptions(pOption);
	} else {
		/** 坐标转换* */
		var convert = translate.ScreenPosToWorldPos(x, y);
		conx = convert.GetX();
		cony = convert.GetY();
		conz = convert.GetZ();
		// var posVar = pos.split(',');
		var dataPath = content3d.GetSDKPath().substring(0, 53)
				+ "data\\texture\\close.bmp"; // /< 关闭按钮图片路径
		var pOption = map.CreateResponserOptions("123"); // /< 创建响应器配置项
		pOption.AddConfig("Longitude", conx); // /< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", cony); // /< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight", conz); // /< 指向经纬度坐标高度
		pOption.AddConfig("Widget", "346"); // /< 窗口宽度
		pOption.AddConfig("Height", "198"); // /< 窗口高度
		// pOption.AddConfig("Widget", "446"); // /< 窗口宽度
		// pOption.AddConfig("Height", "298"); // /< 窗口高度
		pOption.AddConfig("ArrowSize", "30"); // /< 箭头大小
		pOption.AddConfig("Radial", "20"); // /< 圆角直径
		pOption.AddConfig("Url", pageBouncedUrl); // /< 指向网页url
		pOption.AddConfig("MoveDelay", "1"); // /< 坐标更新帧率
		pOption.AddConfig("CloseButtonState", "false"); // /< 是否显示关闭按钮
		pOption.AddConfig("CloseButtonUrl", dataPath); // /< 关闭按钮图片路径
		// pOption.AddConfig("BKColor", "65,177,255"); ///< 箭头背景颜色
		pOption.AddConfig("CloseBtnPosX", "320"); // /< 关闭按钮所在窗口x位置
		pOption.AddConfig("CloseBtnPosY", "5"); // /< 关闭按钮所在窗口y位置
		pOption.AddConfig("CloseBtnPosW", "20"); // /< 关闭按钮宽度
		pOption.AddConfig("CloseBtnPosH", "20"); // /< 关闭按钮高度
		webResp = map.CreateResponser("TipsDialogResponser", pOption); // /<
		// 创建响应器
		webResp.addObserver();
		map.AddResponser(webResp); // /< 响应器添加至场景
	}
}
/**
 * 处理页面框
 */
function saveWegdit() {
	var msg = webResp.GetResponserResult().GetConfigValueByKey("Param");
	var msgs = msg.split("@#");
	if (msgs[0] == "1") {// 保存
		// 视点名称
		WegditViewName = msgs[1];
		// 视点备注
		WegditViewNote = msgs[2];
		if(!WegditViewName){
			alert("视点名称不能为空!");
			return;
		}
		addView(WegditViewName, WegditViewNote);
		cancelWegdit();
	} else {// 取消或关闭
		cancelWegdit();
	}
}
/**
 * 关闭页面框
 */
function cancelWegdit() {
	map.RemoveResponser("TipsDialogResponser"); // /< 移除响应器
	webResp = null;
	
	$(".sdsc_btn").css("background", "url(../img/sdsc_btn.png)");
	sdState = 1;
	content3d.detachEvent("FireOnLButtonUp", showWegdit);
	content3d.detachEvent("FireOnResponserNotify", saveWegdit);
}
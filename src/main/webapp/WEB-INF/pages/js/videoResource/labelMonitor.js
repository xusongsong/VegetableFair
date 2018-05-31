
/**
 * 标注管理功能
 * @author shine
 * @date 2018-5-17
 * 
 */

//备注:观看此方法时，请先以方法为切入点，先看方法数目以及其作用，连成一条线形成业务路径，再去观看代码

//每页标注结果集集合(根据id取值)
var labelResultInfo = [];
//标注页目条数
var labelPageSize = 7;
//是否初次加载所有标注图层
var firstLabelFlage = true;
//接地线太高(文字标注抬高)
var lineLiftUp = '2';
//文字标注属性弹窗相对调整高度值
var trimHeight = Number(lineLiftUp) + 3;
//图片标注图层
var labelImageLayer = null;
//图片标注图层组
var labelImageLayers = [];
//文字标注图层
var labelTextLayer = null;
//文字标注图层组
var labelTextLayers = [];
//标注属性弹窗对象
var labelWebResp = null;
//添加标注属性弹窗对象
var labelAddResp = null;
//创建文字标注要素对象数组
var labelArrayTextLayer = [];
//创建图片要素对象数组
var labelArrayImageLayer = [];
//当前展示的文字要素属性框ID(删除时判定关闭使用)
var attributeDialogId = '';
//标注取点对象
var positionObj = null;
//是否开启添加标注
var addLabelFlage = false;
//是否开启重新取点功能
var updateLabelFlage = false;
//图片标注绝对路径
var labelImageLayerUrl = "http://" + projectIP + ":" + projectPort //标注图片路径
+ "/VegetableFair/img/mapdw.png";
//标注属性弹窗绝对路径
var labelAttributeUrl = "http://" + projectIP + ":" + projectPort
+ "/VegetableFair/mapTools/detail.do";
//标注添加弹窗绝对路径
var labelBouncedUrl = "http://" + projectIP + ":" + projectPort//弹出框页面路径
+ "/VegetableFair/mapTools/labelDialog.do";
//文字标注背景图片绝对路径
var buildBackgroundUrl = "http://" + projectIP + ":" + projectPort
+"/VegetableFair/img/build1.png";


/**
 * 查询所有标注列表信息
 * @param pageNo(标注分页)
 */
function getLabelList(pageNo){
	//获取当前搜索栏内容
	var labeltName = document.getElementById("LabeltName").value;// 值为空则查询所有结果
	//将原先分页标注结果集集合清空
	labelResultInfo = [];
	//设置页码参数值
	var pageSize = labelPageSize;
	//创建参数对象
	var labelLevel = {labeltName:labeltName,
					  pageSize:pageSize,
					  pageNo:pageNo};
	//获取后端结果集集合
	var data = findLabelPoint(labelLevel);
	//循环遍历所有列表文字要素,并删除
	delLabelText();
	//删除当前添加标注图片
	if(!addLabelFlage){//若当前没有开启标注添加则删除
		delLabelImageLayer();
	}
	//判断数据是否为空
	if(data == null || data == undefined){
		alert("服务请求有误，请稍后重试!");
	}else{
		if(data.success == 1){
			var labelResultList = '';
			/**调用标注分页接口获取后台数据**/
			//var records = data.record.records;//获取返回值集合
			//var totalRecords = data.record.totalRecords;//获取返回值总条目数字段
			//var totalPage = data.record.totalPage;//页数(取整)*/
			var labelList = data.record;
			//获取后台分页结果集合
			var labelPageArray = getLabelPageLevel(labelList);
			//根据结果集合获取分页数
			var totalPage = labelPageArray.length - 1 ;
			//若当前分页数大于分页结果集合分页数则
			if(pageNo > totalPage){
				pageNo = totalPage;
			}
			//获取当前页结果集
			var records = labelPageArray[pageNo];
			//挂载标注列表
			labelResultList += createLabelList(records);
			labelResultList += createLabelPageList(pageNo, totalPage);//对页面挂载进行分页挂载
			//创建所有文字标注图层(每次查询都加载所有要素存在一定加载风险,待优化)
			/*if(firstLabelFlage){*/
			createAllMapFeature(labelList);
				//firstLabelFlage = false;
			/*}*/
		}else{
			//若查询的结果为空则
			var totalPage = 0;
			var labelResultList = '';
			labelResultList += createLabelPageList(pageNo,0);
		}
		$('#labelResult').html(labelResultList);//页面挂载
	}
}

/**--------------------------------------------------------标注操作逻辑简单方法---------------------------------**/

/**
 * 批量删除所有的图片标注要素
 */
function delLabelImageLayer(){
	for(var i = 0; i < labelArrayImageLayer.length; i++){
		 var deleteLayer = labelArrayImageLayer[i];
		 deleteLableImageFeature(deleteLayer);
		 labelArrayImageLayer.splice(i,1);
	 }
}

/**
 * 批量删除所有的文字标注要素
 */
function delLabelText(){
	for(var i = 0; i < labelArrayTextLayer.length; i++){
		var deleteLayer = labelArrayTextLayer[i];
		deleteLabelTextFeature(deleteLayer);
	}
	labelArrayTextLayer = [];
}

/**
 * 根据ID删除文字标注要素
 * @param id (当前操作标注的ID值)
 */
function delTextLabelById(id){
	for(var i = 0; i < labelArrayTextLayer.length; i++){
		var deleteLayer = labelArrayTextLayer[i];
		//若当前对象数值为空则
		if(deleteLayer == null || deleteLayer == undefined){
			return;
		}
		//若当前id与要素对象ID相匹则
		if(id == deleteLayer.id){
			deleteLabelTextFeature(deleteLayer);
			labelArrayTextLayer.splice(i,1);
			return;
		}
	}
}

/**
 * 前端对后台数据进行分页处理
 * @param data (后台接口请求数据)
 */
function getLabelPageLevel(data){
	var labelPageArray = [];// 根据页数分
	var pageBySize = [];//根据每页数分
	var pageSize = labelPageSize;
	var totalRecord = data.length;//获取记录条数
	/**获取总页数三种方法**/
	var pageCount = Math.ceil(totalRecord/pageSize);//总页数
	//var pageCount = (totalRecord + pageSize -1)/pageSize
	//var pageCount = totalRecord % pageSize == 0 ? (totalRecord/pageSize):(totalRecord/pageSize + 1) ;
	var pageNo = 1;
	for(var i = 0; i < totalRecord; i++){
		var level = data[i];
		pageBySize.push(level);
		//寻找节点(i== 每页数据 || i==最后一页最后一条数据)
		if((i+1) % pageSize == 0 || (pageNo == pageCount && (i == totalRecord - 1))){
			labelPageArray[pageNo] = pageBySize;
			pageBySize = [];
			pageNo++;
		}
	}
	return labelPageArray;
}

/**
 * 创建标注列表
 * @param records 当前页集合
 */
function createLabelList(records){
	var labelResultList = '';
	for (var i = 0; i < records.length; i++) {
		var record = records[i];
		if(record == null || record == undefined){
			continue;
		}
		var id = record.id;
		labelResultInfo.push(record);
		labelResultList += '<ul id="'+ id + '" class="map_dttc_qxsy" style="margin-top: 25px;">';
		labelResultList += '<span class="map_dttc_qxsy_xh"> <span class="fh">'+ (i + 1) + '</span>';
		labelResultList += '</span>';
		labelResultList += '<span  id="label_'+id+'" onclick="flyLabelPosition(' + id + ');">' + record.name + '</span>';
		labelResultList += '<span class="sdsc_sc" onclick ="delLabelPoint(' + id + ')"></span>';
		labelResultList += '<span class="sdsc_bj" onclick = "startUpdateLabel(' + id + ');"></span>';//绑定修改标注事件
		labelResultList += '</ul>';
	}
	return labelResultList;
}

/**
 * 根据ID获取当前标注对象
 * @param id (标注ID)
 */
function getLevelInfo(id){
	var level = null;
	for(var  i = 0; i < labelResultInfo.length; i++){
		var levelInfo = labelResultInfo[i];
		//若当前对象值为空则
		if(levelInfo == null || levelInfo == undefined){
			continue;
		}
		if(id == levelInfo.id){
			level = levelInfo;
		}
	}
	return level;
}

/**
 * 分页路径列表创建
 * @param pageNo (分页数)
 * @param totalPage (总页数)
 * @returns pageList (分页结果集列表)
 */
function createLabelPageList(pageNo,totalPage){
	var currPage = pageNo;
	var totalPage = totalPage;
	var pageList = '';
	//中间展示几页数目
	var middlePageSize = 3;
	//分页列表拼接
	pageList += '<div class = "fanye">';
	pageList += '<div class="fanye1">';
	// 第一页
	pageList += '<span style="width: 15px;" onclick="getLabelList(' + 1
			+ ')">&lt;&lt;</span> ';
	// 上一页
	if(currPage == 1){
		pageList += '<span style="width: 53px;">&lt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick="getLabelList(' + (currPage - 1) + ')">&lt;</span>';
	}
	//设定中间起始值
	var startPage = (currPage - 1) < 1 ? 1 : (currPage - 1);
	//设定中间结束值
	var endPage = (startPage + middlePageSize ) > totalPage ? totalPage :(startPage + middlePageSize); 
	//该判定是为了当不足几页显示几页的样式
	if(endPage <= middlePageSize){
		endPage = middlePageSize;
	}
	//循环生成中间列表层级
	for(var page = 1; page <= endPage; page++){
		if(page == currPage){
			pageList += '<span style="width: 25px;" class="shuzi"><b>' + currPage + '</b></span>';
		}else{
			pageList += '<span style="width: 25px;" class="shuzi" onclick="getLabelList(' + page + ')"><b>' + page + '</b></span>';
		}
	}
	//下一页
	if(currPage == totalPage){
		pageList += '<span style="width: 53px;">&gt;</span>';
	}else{
		pageList += '<span style="width: 53px;" onclick= "getLabelList(' + (currPage + 1) + ') ">&gt;</span>';
	}
	//最后一页
	pageList += '<span style="width: 15px;" onclick="getLabelList(' + totalPage + ')">&gt;&gt;</span> ';
	pageList += '</div>';
	pageList += '</div> ';
	return pageList;
}

/**----------------------------------------------------添加标注相关----------------------------------------------------**/

/**
 * 开始添加标注
 * 
 */
function startAddLabel(){
	if(!addLabelFlage){
		addLabelFlage = true;
		$(".tjbz_btn").css("background", "url(../img/tjbz_icon1.png)");
	}else{
		cancelAddLabel();
	}
	//调用SDK鼠标点击事件
	function VPSDKCtrl::FireOnLButtonUp(x,y)
	{
		if(addLabelFlage){
		 var pos = map3D.coordTransformation(3,{
	    		screenX:x,screenY:y
				}).split(','); // 将屏幕坐标点转换成经纬度坐标
		 var viewPoints = map3D.getViewPoint().split(';');//获取视点坐标
		 positionObj = {
				 longitude: pos[0],
				 latitude: pos[1],
				 elevation: pos[2],
				 rotateAngle: viewPoints[3].split(':')[1],
				 overAngle: viewPoints[4].split(':')[1],
				 range:viewPoints[5].split(':')[1] };
		 //调用添加标注事件
		 addLabelEvent(pos);
		}else{
			positionObj = null;	
		}
	}
}

/**
 * 添加标注事件(修改标注俩用)
 * @param pos 当前鼠标点击的三维坐标
 */
function addLabelEvent(pos){
	//删除所有的图片标注
	 delLabelImageLayer();
	 //根据坐标创建新的文字标注
	 createImageMapFeature(pos);
	 //若当前为添加状态则
	 if(addLabelFlage){
		showLabelWegdit(pos);
		notifyState = "addLabelEvent"; 
		//labelAddIntegerEvent();
	 }
}

/**
 * 清除所有添加标注信息
 */
function cancelAddLabel(){
	//添加标注状态修改
	addLabelFlage = false;
	//取点对象置空
	positionObj = null;
	//删除所有图片标注信息
	delLabelImageLayer();
	//关闭添加标注弹窗
	canelLabelAddWegdit();
	//改变添加标注图片样式
	$(".tjbz_btn").css("background", "url(../img/tjbz_icon.png)");
}

/**----------------------------------------------修改标注相关----------------------------------------------------------**/

/**
 * 开启修改标注信息
 * @param id
 */
function startUpdateLabel(id){
	//根据ID获取当前标注对象信息
	var level = getLevelInfo(id);
	//标注取点先行置空
	positionObj = null;
	$('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass('map_dttc_qxsy_xhclick');// 清除所有标记
	$('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');// 特定标记
	$('#bzxgname').val(level.name);//标注修改窗获取标注名称信息
	$('#labelRemark').text(level.memo == null ? '':level.memo);//获取备注信息
	$('.bzxg_menu').show();//显示标注修改窗
	/*标注修改窗确定事件*/
	$('#bzqd').unbind('click').click(function(){
		var updateLabelName = $('#bzxgname').val();
		var labelRemark = $('#labelRemark').text();
		//若未开启重新取点则使用当前点位信息
		if(positionObj == null){
			positionObj = {
					 longitude:level.longitude,
					 latitude: level.latitude,
					 elevation:level.elevation,
					 rotateAngle: level.rotateAngle,
					 overAngle:level.overAngle,
					 range:level.range };
			}
		updateLabelPoint(updateLabelName,labelRemark,id);//调用标注修改事件
		$('.bzxg_menu').hide();//修改栏弹窗隐藏
		updateLabelFlage = false;
	});
	
	/*重新取点事件*/
	$('.cxqd').unbind('click').click(function(){
		updateLabelFlage = true;
		//开启重新取点事件
		getPositionAgain();
	});
	
	/*取消修改*/
	$('#bzsc').unbind('click').click(function(){
		$('.bzxg_menu').hide();//修改栏弹窗隐藏
		updateLabelFlage = false;
	});
}

/**
 * 重新取点事件
 */
function getPositionAgain(){
	//调用SDL多进程事件(鼠标点击事件)
	function VPSDKCtrl::FireOnLButtonUp(x,y){
		//根据全局修改状态变量进行判定
		if(updateLabelFlage){
		 var pos = map3D.coordTransformation(3,{
	    		screenX:x,screenY:y
				}).split(','); // 将屏幕坐标点转换成经纬度坐标
		 var viewPoints = map3D.getViewPoint().split(';');//获取视点坐标
		 positionObj = {
				 longitude:pos[0],
				 latitude: pos[1],
				 elevation:pos[2],
				 rotateAngle: viewPoints[3].split(':')[1],
				 overAngle:viewPoints[4].split(':')[1],
				 range:viewPoints[5].split(':')[1] };
		 //显示图片标注
		 addLabelEvent(pos);
		}
	}
}  

/**------------------------------------------------------SDK飞行定位事件---------------------------------------------------**/

/**
 * 标注飞行定位
 * @param id
 */
function flyLabelPosition(id){
	// 清除所有标记
	$('.map_dttc_qxsy').children('.map_dttc_qxsy_xh').removeClass('map_dttc_qxsy_xhclick');
	//根据ID获取当前标注对象
	var level = getLevelInfo(id);
	var time = 3;
	if(level == null || level == undefined){
		return;
	}
	map3D.flyPosition(level.longitude, level.latitude, level.elevation, level.rotateAngle, level.overAngle,  level.range, time);// 飞行定位
	//标注图标变红(特定标注)
	$('#' + id).children('.map_dttc_qxsy_xh').addClass('map_dttc_qxsy_xhclick');
	$('.bzxg_menu').hide();//修改栏弹窗隐藏
}
/**--------------------------------------------SDK操作图层方法----------------------------------------------------**/

/**
 * 创建文字标注图层
 */
function createLabelImageLayer(){
	labelImageLayer = map3D.createImageLabelLayer({
		liftUp:"1",
		iconUrl:labelImageLayerUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	labelImageLayers.push(labelImageLayer);//往图片标注图层组中添加所创建图层
}

/**
 * 创建文字标注要素
 * @param level 标注对象
 */
function addLabelImageFeature(level){
	 //图片标注ID(可自定义赋值)
	 var labelImageValue = '';
	 //拾取图层判定信息(该图片标注不拾取所以配置为0)
	 var commonNum = '0';
	 //添加图片标注信息
	 var imageFeature = map3D.addImageLabel({
		 layer:labelImageLayer,
		 imageValue:labelImageValue,
		 Lon:level[0],
		 Lat:level[1],
		 Height:level[2],
		 ename:commonNum});
	 return imageFeature;
}

/**
 * 删除当前图片要素
 * @deleteLayer 图片要素对象
 */
function deleteLableImageFeature(deleteLayer){
	map3D.deleteImageById({
		feature:deleteLayer.imageFeature,
		layer:deleteLayer.labelImageLayer
		}); // 删除一个图片要素
}

/**
 * 创建文字标注图层
 */
function createLabelTextLayer(){
	labelTextLayer = map3D.CreatePointTextEditLayerfunction({
		liftUp:lineLiftUp,//接地线抬升值(配置该项接地线将是文字到点之间，否则是文字、点到地底)
		backgroundUrl:buildBackgroundUrl,//背景图片
		CharacterMode:"1",//字符大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值
		AlignmentMode:"5",//设置文字位于要素的位置
		lineFlage:"false"//是否开启接地线
		});
	//矢量图层数组存储(拾取存放图层位置)
	vectorAllLayer.push(labelTextLayer);
}

/**
 * 添加文字标注要素信息
 * @param 当前标注对象
 */
function addLabelTextFeature(level){
	//拾取事件判定(用于判定属于哪个图层拾取)
	var ename = '4';
	//拾取时参数信息传递
	var textValue = level.name + "," + level.longitude + "," + level.latitude + "," + level.id;
	//文字标注高度调节
	var lineHeight = Number(level.elevation) + Number(lineLiftUp) + "";
	//创建建筑图片要素信息(参照SDK图片要素创建)
	var labelTextFeature = map3D.addPointTextLabel2({
		layer:labelTextLayer, 
		name:level.name,
		Lon:level.longitude,
		Lat:level.latitude,
		//Height:level.elevation,
		Height:lineHeight,
		textValue:textValue,
		ename:ename
		});
	return labelTextFeature;
}

/**
 * 删除当前文字要素
 * @deleteLayer 文字要素对象
 */
function deleteLabelTextFeature(deleteLayer){
	map3D.deleteTextById({
		feature:deleteLayer.textFeature,
		layer:deleteLayer.labelTextLayer
		}); // 删除一个文字要素
}

/**-----------------------------------------------------创建图层要素对象集合---------------------------------------------------------**/

/**
 * 创建图片要素对象数组(添加图片要素未有ID信息)
 * @param pos (三维坐标)
 */
function createImageMapFeature(pos){
	var level = pos;
	//创建图片要素对象
	var mapFeature = {};
	 if(level[0] == null || level[0] == undefined || level[1] == null || level[1] == undefined){
		 return;
	 }
	 //添加图片要素
	 var imageFeature = addLabelImageFeature(level);
	 //图片要素对象赋值
	 mapFeature.labelImageLayer = labelImageLayer;
	 mapFeature.imageFeature = imageFeature;
	 //创建完成的要素信息存入标注图片数组中
	 labelArrayImageLayer.push(mapFeature);
}

/**
 * 根据ID创建单个文字标注
 * @param id
 */
function createSingleMapFeature(id){
	var level = getLevelInfo(id);
	var mapFeature = {};
	if(level == null || level == undefined){
		return;
	}
	if(level.longitude == null || level.longitude == undefined || level.latitude == null || level.latitude == undefined){
		return;
	}
	mapFeature.id = level.id;
	//添加文字要素
	var labelTextFeature = addLabelTextFeature(level);
	//文字要素对象赋值
	mapFeature.textFeature = labelTextFeature;
	mapFeature.labelTextLayer = labelTextLayer;
	//创建完成的要素信息存入标注文字数组中
	labelArrayTextLayer.push(mapFeature);
}

/**
 * 根据后台标注数据集创建所有文字标注(不分页查询,分页查询请使用labelResultInfo)
 * @param record
 */
function createAllMapFeature(record){
	for(var i = 0; i < record.length; i++){
		var level = record[i];
		var mapFeature = {};
		if(level == null || level == undefined){
			continue;
		}
		if(level.longitude == null || level.longitude == undefined || level.latitude == null || level.latitude == undefined){
			continue;
		}
		mapFeature.id = level.id;
		//添加文字要素
		var labelTextFeature = addLabelTextFeature(level);
		//文字要素对象赋值
		mapFeature.textFeature = labelTextFeature;
		mapFeature.labelTextLayer = labelTextLayer;
		//创建完成的要素信息存入标注文字数组中
		labelArrayTextLayer.push(mapFeature);
	}
}

/**----------------------------------------SDK弹窗创建及取消-----------------------------------------------------------------**/

/**
 * 显示添加标注弹窗
 */
function showLabelWegdit(pos) {//传递坐标值与页面跳转路径
	if (labelAddResp) {
		//** 坐标转换* *//*
		var pOption = map.CreateResponserOptions("123"); // /< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]); // /< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]); // /< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight", pos[2]); // /< 指向经纬度坐标高度
		labelAddResp.UpdateResponserOptions(pOption);
	} else {
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]);								///< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]);								///< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight", pos[2]);												///< 指向经纬度坐标高度
		pOption.AddConfig("Widget", "348");													///< 窗口宽度
		pOption.AddConfig("Height", "200");													///< 窗口高度
		pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
		pOption.AddConfig("Radial", "20");													///< 圆角直径
		pOption.AddConfig("Url", labelBouncedUrl);				///< 指向网页url
		pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
		pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
		labelAddResp  = map.CreateResponser("TipsDialogResponser", pOption);		7			///< 创建响应器
		labelAddResp.AddObserver();
		map.AddResponser(labelAddResp);															///< 响应器添加至场景
	}
}

/*取消页面弹框*/
function canelLabelAddWegdit(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	labelAddResp = null;
}

/**
 * 创建标注属性弹窗
 * @param pos (标注三维坐标)
 * @param id  (标注id)
 * @param labelAttributeParamUrl (标注属性弹窗路径含属性信息)
 */
function createLabelAttributeDialog(pos,id,labelAttributeParamUrl){
	if (labelWebResp) {//若已存在弹窗则关闭
		cancelAttributeDialog();
	}
	//用于删除标注时关闭当前删除标注ID对应的弹窗
	attributeDialogId = id;
	//标注属性弹窗高度进行调整
	var trimDialogHeight = Number(pos[2]) + trimHeight;
	//SDK方法调用，请查询SDK弹窗生成文档
	var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
	pOption.AddConfig("Longitude", pos[0]);												///< 指向经纬度坐标经度
	pOption.AddConfig("Latitude", pos[1]);												///< 指向经纬度坐标维度
	//pOption.AddConfig("PosHeight",  pos[2]);											///< 指向经纬度坐标高度
	pOption.AddConfig("PosHeight",  trimDialogHeight);											///< 指向经纬度坐标高度
	/**5-7 SDK新版本添加**/
	pOption.AddConfig("ShowDistance", "10000");											///< 显示范围
	/**5-7 SDK新版本添加**/
	pOption.AddConfig("Widget", "366");													///< 窗口宽度
	pOption.AddConfig("Height", "142");	//150	-125									///< 窗口高度
	pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
	pOption.AddConfig("Radial", "20");													///< 圆角直径
	pOption.AddConfig("Url", labelAttributeParamUrl);					                        ///< 指向网页url
	pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
	pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
	labelWebResp  = map.CreateResponser("TipsDialogResponser", pOption);					///< 创建响应器
	labelWebResp.AddObserver();
	map.AddResponser(labelWebResp);														///< 响应器添加至场景
}

/**
 * 关闭标注属性弹窗
 */
function cancelAttributeDialog(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	labelWebResp = null;
}

/**-------------------------------------------------标注增删改查ajax请求事件---------------------------------------------------**/

/**
 * 添加标注ajax请求
 * @param wegditLabelName(标注名称)
 * @param wegditLabelMemo(标注备注)
 */
function addLabelPoint(wegditLabelName, wegditLabelMemo){
	$.ajax({
		url : '../mapTools/addLabel.do',
		type : 'post',
		data : {
			userId : '',
			name : wegditLabelName ,
			longitude : positionObj.longitude,
			latitude : positionObj.latitude,
			elevation : positionObj.elevation,
			rotateAngle : positionObj.rotateAngle,
			overAngle : positionObj.overAngle,
			range : positionObj.range,
			memo : wegditLabelMemo,
		},
		success : function(data){
			if(data.success == 1){
				//查询所有标注信息
				getLabelList(1);
				alert("添加标注成功");
			}else{
				alert(data.msg);
			}
		},
		error : function(e){
			alert("ajax请求有误，请稍后重试");
		}
	});
}

/**
 *根据ID删除当前标注信息ajax
 *@param id
 */
function delLabelPoint(id){
	if(confirm("确定删除此标注?")){
		$.ajax({
			url : '../mapTools/delLabel.do',
			type : 'post',
			data : {
				id : id
			},
			success : function(data){
				if(data.success == 1){
					//根据标注ID删除当前文字要素信息
					delTextLabelById(id);
					//若当前删除标注属性弹窗开启则关闭
					if(id == attributeDialogId){
						cancelAttributeDialog();
					}
					//查询所有的标注列表
					getLabelList(1);
				}
				else{
					alert(data.msg);
				}
			},
			error : function(e){
				alert("ajax请求有误，请稍后重试");
			}
		});
	}
}

/**
 * 修改标注信息
 * @param updateLabelName(修改标注名称)
 * @param labelRemark(修改标注备注信息)
 * @param id(当前修改标注ID)
 */
function updateLabelPoint(updateLabelName,labelRemark,id){
	$.ajax({
		url : '../mapTools/updateLabel.do',
		type : 'post',
		data : {
			name : updateLabelName,
			longitude : positionObj.longitude,
			latitude : positionObj.latitude,
			elevation : positionObj.elevation,
			rotateAngle : positionObj.rotateAngle,
			overAngle : positionObj.overAngle,
			range : positionObj.range,
			memo : labelRemark,
			id : id
		},
		success : function(data){
			if(data.success == 1){
				//查询所有标注信息
				getLabelList(1);
			}
			else{
				alert(data.msg);
			}
		},
		error : function(e){
			alert("ajax请求有误，请稍后重试");
		}
	});
}

/**
 * 查询所有标注信息
 * @param level (标注查询参数封装)
 */
function findLabelPoint(level){
	var result = null;
	$.ajax({
		url : '../mapTools/findLabel.do',
		type : "post",
		data : {
			name : level.labeltName,
			pageNo : level.pageNo,
			pageSize : level.pageSize
		},
		success : function(data) {
			result = data;
		},
		error: function (e){
		}
	});
	return result;
}

/**------------------------------------------------SDK文字标注拾取事件------------------------------------------------------**/

/**
 * 文字标注拾取触发事件
 */
function labelPickEvent(){
	//获取拾取文字标注属性信息
    var textValue = map3D.getLabelValue(vectorPickLayer).textName.split(',');
    //获取当前拾取文字标注三维坐标
    var pos = map3D.getLabelValue(vectorPickLayer).points.split(',');
    //拼接属性弹窗参数路径
    var labelAttributeParamUrl = labelAttributeUrl + "?name=" + encodeURIComponent(textValue[0]) + "&x=" + textValue[1] + "&y=" + textValue[2];
    var id = textValue[3];
    //创建属性弹窗
    createLabelAttributeDialog(pos,id,labelAttributeParamUrl);
    //绑定拾取事件
    notifyState = 'labelPickEvent';
    //labelAttributeIntegerEvent();
}

/**---------------------------------------------------------SDK弹窗响应事件------------------------------------------------------**/

/**
 * 属性弹窗触发事件(单含关闭功能)
 */
function labelAttributeIntegerEvent(){
	//SDK获取页面里面传递出来的参数的方法
	var msg = labelWebResp.GetResponserResult().GetConfigValueByKey("Param");
	var msgs = msg.split('@#');
	if(msgs == '0'){
		cancelAttributeDialog();
	}
}

/**
 * 添加标注弹窗响应事件
 */
function labelAddIntegerEvent(){
	//获取弹窗内传递参数
	var msg = labelAddResp.GetResponserResult().GetConfigValueByKey("Param");//SDK获取页面里面传递出来的参数的方法
	var msgs = msg.split('@#');
	if(msgs[0] == "1"){//获取触发事件的状态值，若触发事件是确定事件，则执行保存方法	
		var wegditLabelName = msgs[1];
		var wegditLabelMemo = msgs[2];
		if(!wegditLabelName){
			alert('标注名称不能为空');
			return;
		}
		//添加标注
		addLabelPoint(wegditLabelName, wegditLabelMemo);
		//关闭添加标注事件
		cancelAddLabel();
	}else if(msgs[0] == "0" || msgs[0] == "2"){//若未取消或关闭则
		cancelAddLabel();
	}
}



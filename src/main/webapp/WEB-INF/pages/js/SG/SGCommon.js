/**
 * 创建图片图层(参照SDK方法)
 * @returns
 */
function createImageLayer(opt){
	var imageLayer = map3D.createImageLabelLayer({
		liftUp:"0",
		iconUrl:imageUrl,
		xScale:0.2,
		yScale:0.2,
		zScale:0.2,
		direction:"0",
		align:"4"
		}); // 创建一个图片标注图层
	vectorAllLayer.push(imageLayer);//往图片要素图层组中添加所创建图层
	return imageLayer;
}

/**
 * 删除图片要素(参照SDK方法)
 * @param deleteLayer
 */
function deleteImageFeature(deleteLayer){
	 if(deleteLayer.imageFeature == '' || deleteLayer.imageFeature == undefined){
		 return;
	 }
	map3D.deleteImageById({
		feature:deleteLayer.imageFeature,
		layer:deleteLayer.videoImageLayer
		}); // 删除一个图片要素
}

/**
 * 创建图片要素
 * @param level
 * @returns
 */
function loadImagLayer(level){
	//设置当前变量方便拾取时获取当前拾取对象的信息
	var videoImageValue = '';
	//将时间戳转为时间节点
	var createTime = dateTurn(level.createTime);
	//拼接待获取的参数值信息
	var videoImageValue = level.indexCode + "," + level.name + ","  + level.pixel + "," + createTime;
	//判断当前拾取的是哪个图层(适用于一个场景同时存在多拾取事件)
	var ename = '1';
	//判断当前对象的经纬度是否为空，为空则不创建要素
	if(level.longitude == '' || level.latitude == ''){
		 return;
	 }
	//创建图片要素信息(参照SDK图片要素创建)
	var imageFeature = map3D.addImageLabel({
		layer:videoImageLayer, 
		imageValue:videoImageValue,
		Lon:level.longitude,
		Lat:level.latitude,
		Height:videoHeight,
		ename:ename});
	return imageFeature;
}

/**
 * 生成摄像头属性弹窗
 * @param pos(摄像头属性弹窗的经纬度高程坐标)
 * @param videoImageUrl(弹窗路径，后台编写)
 * @param indexCode(用于赋值当前打开的是哪个弹窗)
 * @returns
 */
function loadVideoDialog(pos,videoImageUrl,indexCode){
		if (webRespSG) {//若已存在弹窗则关闭
			cancelVideoWegdit();
		}
		//当前弹窗唯一编号赋值
		videoDialogIndexCode = indexCode;
		//SDK方法调用，请查询SDK弹窗生成文档
		var pOption = map.CreateResponserOptions("123");									///< 创建响应器配置项
		pOption.AddConfig("Longitude", pos[0]);												///< 指向经纬度坐标经度
		pOption.AddConfig("Latitude", pos[1]);												///< 指向经纬度坐标维度
		pOption.AddConfig("PosHeight",  pos[2]);											///< 指向经纬度坐标高度
		pOption.AddConfig("Widget", "366");													///< 窗口宽度
		pOption.AddConfig("Height", "140");	//150	-125									///< 窗口高度
		pOption.AddConfig("ArrowSize", "30");												///< 箭头大小
		pOption.AddConfig("Radial", "20");													///< 圆角直径
		pOption.AddConfig("Url", videoImageUrl);					                        ///< 指向网页url
		pOption.AddConfig("MoveDelay", "1");												///< 坐标更新帧率
		pOption.AddConfig("CloseButtonState", "false");										///< 是否显示关闭按钮
		webRespSG  = map.CreateResponser("TipsDialogResponser", pOption);					///< 创建响应器
		webRespSG.AddObserver();
		map.AddResponser(webRespSG);														///< 响应器添加至场景
}

/**
 * 关闭视频监控弹窗
 */
function cancelVideoWegdit(){
	map.RemoveResponser("TipsDialogResponser");												///< 移除响应器
	webRespSG = null;
} 

function createFaceFeature(level){
	var mapFeature = {};
	//加载图片要素
	var imageFeature = loadFaceImage(level);
	//生成要素对象(其他属性可以自行根据需要进行添加)
	mapFeature.faceImageLayer = faceImageLayer;//要素属性
	mapFeature.imageFeature = imageFeature;//图层属性
	mapFeature.cameraId = level.cameraId;//id属性唯一标识
	//要素图层组中存入要素对象
	videoArrayLayer.push(mapFeature);
}
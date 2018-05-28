/**
 * 地图工具
 * @author lixiang
 * @dxgcflag 定向观察状态值设置
 */
$(document).ready(function() {
	
	/* 分屏联动 */
	$(".btm_right_top_right_fpld").unbind('click').click(function() {
		mvTable();
	});
	
	/* 测试按钮 */
	$(".btm_right_top_right_kjxz").unbind('click').click(function() {
		/*var url="../login/CMS";
		//window.location.href=url;
		window.open(url); */  
		AB();
	});
    
    /* 全幅功能  */
	$(".btm_right_top_right_qf").unbind('click').click(function() {
		fullWidth();
	});
	
	/* 全幅功能  */
	$(".btm_right_top_right_qf").unbind('click').click(function() {
		fullWidth();
	});

	/* 全屏功能 */
	
	$(".btm_right_top_right_qp").unbind('click').click(function() {
		fullScreen();
	});
	
	/* 定向观察 */
	$("#dxgc").unbind('click').click(function() {//定向观察
		directionView();
	});
	
	/* 漫游模式 */
	$("#walk").unbind('click').click(function(){//步行
		if(walkState == 0){
			//roamMode("clearRoamMode");
			$('.dtgj_top ul').removeClass('used_mapTools');
			$('#walk').toggleClass('used_mapTools');
			return;
		}
		roamMode("onWalk");
	});
	
	$("#drive").unbind('click').click(function(){//车行
		if(driveState == 0){
			//roamMode("clearRoamMode");
			$('.dtgj_top ul').removeClass('used_mapTools');
			$('#drive').toggleClass('used_mapTools');
			return;
		}
		roamMode("onDrive");
	});
	
	$("#fly").unbind('click').click(function(){//飞行
		if(flyState == 0){
			//roamMode("clearRoamMode");
			$('.dtgj_top ul').removeClass('used_mapTools');
			$('#fly').toggleClass('used_mapTools');
			return;
		}
		roamMode("onFly");
	});
	
	/*测量功能*/
	$("#spcl").unbind('click').click(function(){//水平测量
		measure(1);
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#spcl').toggleClass('used_mapTools');
	});
	
	$("#czcl").unbind('click').click(function(){//垂直测量
		measure(2);
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#czcl').toggleClass('used_mapTools');
	});
	
	$("#mjcl").unbind('click').click(function(){//面积测量
		measure(4);
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#mjcl').toggleClass('used_mapTools');
	});
	
	$("#kjcl").unbind('click').click(function(){//空间测量
		measure(3);
		$('.dtgj_top ul').removeClass('used_mapTools');
		$('#kjcl').toggleClass('used_mapTools');
	});
	
	/*空间分析功能*/
	$("#kgfx1").unbind('click').click(function(){//开启控高分析
		startHeightControl();
	});
	
	$("#syfx1").unbind('click').click(function(){//自动开启可视域分析
		startView();
	});
	
	$("#tsfx1").unbind('click').click(function(){//开启通视分析
		startSight()
	});
	
	$("#Button5").unbind('click').click(function(){//增加高度
		startHeightControl();
	});
	
	$("#Button6").unbind('click').click(function(){//减少高度
		startHeightControl();
	});
	
	$("#kgqx0").unbind('click').click(function(){//关闭控高分析
		shutHeightController();
	});
	
	$("#syqx0").unbind('click').click(function(){//关闭视域分析
		shutView();
	});
	
	$("#tsqx0").unbind('click').click(function(){//关闭通视分析
		shutSight();
	});
	
	$("#kgjt").unbind('click').click(function(){//控高分析截图
		printScreen();
	});
	
	$("#syjt").unbind('click').click(function(){//视域分析截图
		printScreen();
	});
	
	$("#tsjt").unbind('click').click(function(){//通视分析截图
		printScreen();
	});
	
	/*标注管理功能*/
	//findLabelPoint(1);//页面加载时模拟执行搜索按键
	
	$(".bj_menu_ss_btn").unbind('click').click(function(){//点击搜索按钮进行标注列表搜索
		findLabelPoint(1);
	});
	
	$(".tjbz_btn").unbind('click').click(function(){//点击添加标注按钮开启事件
		startAddLabel();
	});
	
	/*$(".tjbz_btn").unbind('click').click(function(){//点击添加标注按钮开启事件(SDK未合版测试)
		startAddLabelTest();
	});*/
	
	/* 清除功能*/
	$(".btm_right_top_right_qc").unbind('click').click(function() {
		/*清除map上新增的图层(属性查询,搜索详情等)*/
		removeArrayLayers(mapShps);
		var hideResult4Clear=document.getElementsByName('hideResult4Clear');
		var showResult4Clear=document.getElementsByName('showResult4Clear');
		var result4Clear=document.getElementsByName('result4Clear');
		for(var i=0;i<hideResult4Clear.length;i++){
			hideResult4Clear[i].style.display="block";// 重置样式
		}
		for(var i=0;i<showResult4Clear.length;i++){
			showResult4Clear[i].style.display="none";// 重置样式
		}
		for(var i=0;i<result4Clear.length;i++){
			result4Clear[i].value="1";// 重置状态
		}
		
		/*清除测量*/
		measure(0);
		
		/*清除所有的菜博会建筑图标信息*/
		deleteBuildFeature();
		//loadBuildLayer();
		/*清除漫游模式*/
		if (roamModeState == 0) {
			roamMode("clearRoamMode");
		}
		
		/*清除空间分析*/
		spaceClose();
		
		/*清除标注页面弹框*/
		if(labelState == 0) {
			canelLabelWegdit();
		}
		/*清除地图工具高亮显示*/
		$('.dtgj_top ul').removeClass('used_mapTools');
		//取消标注拾取
		/*if(pickUpState){
			cancelVideoPickUp();
		}*/
	});
	
	/*点击左侧图标，清除高亮显示*/
	$('.k2 ul').unbind('click').click(function(){
		/*清除漫游模式*/
		if (roamModeState == 0) {
			roamMode("clearRoamMode");
		}
		//清除图标高亮显示
		$('.dtgj_top ul').removeClass('used_mapTools');
	});
});

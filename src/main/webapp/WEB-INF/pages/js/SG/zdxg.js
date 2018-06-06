/**
 * @author shine
 * 视频巡更总入口
 * @date 2018-3月-29日
 */
//四个投影的状态值
var ty1state=false;
var ty2state=false;
var ty3state=false;
var ty4state=false;
//var dynamicPathgjd =["118.81410960,36.85506484,26.9824059159,37078330001310010355,路机径二","118.80975457,36.85556172,27.4331137557,37078330001310019310","118.81028151,36.85680373,27,37078330001310016164"];//所有路径的关键点,如许添加只加关键坐标即可,其他无须修改
var dynamicPathgjd=[[{name:'路径二',//经度，纬度，高程，当前摄像头indexCode值
					  gjd:'118.81410960,36.85506484,26.9824059159,37078330001310010355;118.80975457,36.85556172,27.4331137557,37078330001310019310;118.81028151,36.85680373,27,37078330001310016164;118.81118691,36.85679023,27,37078330001310018392'}]]
var index1=0;//关键点下标1

/**
 * 巡更响应事件
 * @returns
 */
function zoneAnalysis(){
	//根据当前点击的对象id获取对应响应图层信息
   	var patrolAddLayer = patrolAddLayers[playVideoId];
	if(patrolAddLayer == null || patrolAddLayer == undefined){
		return;
	}
	var opt = patrolAddLayer.GetLayerResult();//获取图层结果集
	var val = opt.GetConfigValueByKey("RealTimePosition");//获取实时位置
	for (var i = 0; i < dynamicPathgjd.length; i++) {//
			var obj=dynamicPathgjd[i];
			for (var j = 0; j < obj.length; j++) {
				var name=obj[j].name;//取关键点名称
				var guanjiandian=obj[j].gjd.split(";");//关键点分割
					for (var z = 0; z < guanjiandian.length; z++) {
						var realIndex=guanjiandian[z].split(",");//单个关键点分割
						var realIndexcodes=realIndex[3];//取编号
							if(map3D.checkPosi(val,guanjiandian[z])){//关键点1
						        index1++;
							        if(index1==1){
							        	//patrolOpeart("paush_"+playVideoId);
							            realIndexCode=realIndexcodes;
							            previewPopVideo(4);
							        }
			       			 	return;
			   				 }
					}
			}
	}
    index1=0;
}

/**
 * 切换投影显隐
 * @param index
 * @returns
 */
function openty(index){
	if(index==1){
		if(ty1state==false){//当前所有场景坐标参数，投影类型，投影角度均从测试用例获取
	                        $("#ty1").css("background","url(../img/tree_xy2.png)");
	                        $("#ty").css("background","url(../img/tree_xy2.png)");
	                            map3D.flyPosition(118.821378995,36.8598429696,25.7240133304,4.713899535890711,-0.6273923707536173,54.28845586745789,2);
	                            //场景坐标
	                            var coord1 = "-2463130.65007,3804966.63218,-4476449.88962;-2463111.01873,3804966.66178,-4476460.64464;-2463104.68317,3804984.00867,-4476449.32983;-2463131.99759,3804984.02905,-4476434.19735;";//模型未抬高坐标
	                            //角度
	                            var pos="-2463105.12282,3804980.63502,-4476472.76183";
	                            //调用SDK播放视频方法(视频投影对象/视频投影场景坐标/当前投影ID/连接投影参数/投影类型(是否对投影进行调整)/投影角度)
	                            map3D.loadResource(videoArea,coord1,"0","37.88.54.223,8000,admin,sgjj4qhx","3",pos);
	                            //设置状态值
	                            ty1state=true;
	                        }else{
	                        	$("#ty1").css("background","url(../img/tree_xy1.png)");
	                        	$("#ty").css("background","url(../img/tree_xy1.png)");
	                            map3D.deleteVideo("0");
	                            ty1state=false;
	                        }

		

	}
	if(index==2){
		 if(ty2state==false){
	                        	$("#ty2").css("background","url(../img/tree_xy2.png)");
	                        	$("#ty").css("background","url(../img/tree_xy2.png)");
	                            map3D.flyPosition(118.807814167,36.8597248484,29.0487956014,1.776724938877666,-0.7413216901501338,81.29494437126401,2);
	                            var coord1 = "-2462119.88596,3804947.18851,-4477031.98863;-2462062.62918,3804961.55979,-4477044.48731;-2462053.55615,3804987.57732,-4477031.04198;-2462118.141,3804977.51352,-4477000.12439;";//模型未抬高坐标
	                            var pos="-2462046.18108,3804993.57881,-4477110.30805";
	                            map3D.loadResource(videoArea,coord1,"1","37.88.58.31,8000,admin,sgjk1qhx","1",pos);
	                            ty2state=true;
	                        }else{
	                        	$("#ty2").css("background","url(../img/tree_xy1.png)");
	                        	$("#ty").css("background","url(../img/tree_xy1.png)");
	                            map3D.deleteVideo("1");
	                            ty2state=false;
	                        }

	}
	if(index==3){
		 if(ty3state==false){
	                        	$("#ty3").css("background","url(../img/tree_xy2.png)");
	                        	$("#ty").css("background","url(../img/tree_xy2.png)");
	                            map3D.flyPosition(118.808490897,36.8552299963,28.3852688652,5.038621058386703,-0.547793134185379,31.90198668496536,2);
	                            var coord1 = "-2462244.86665,3804578.81431,-4477273.49234;-2462263.83546,3804569.40912,-4477271.1631;-2462263.83625,3804561.13832,-4477277.94703;-2462247.9447,3804563.54956,-4477284.52857;";//模型未抬高坐标
	                            var pos="-2462307.83343,3804577.66926,-4477283.98256";
	                            map3D.loadResource(videoArea,coord1,"2","37.88.52.186,8000,admin,sgjj4qhx","1",pos);
	                            ty3state=true;
	                        }else{
	                        	$("#ty3").css("background","url(../img/tree_xy1.png)");
	                        	$("#ty").css("background","url(../img/tree_xy1.png)");
	                            map3D.deleteVideo("2");
	                            ty3state=false;
	                        }

	}
	if(index==4){
	  if(ty4state==false){
	                        	$("#ty4").css("background","url(../img/tree_xy2.png)");
	                        	$("#ty").css("background","url(../img/tree_xy2.png)");
	                            map3D.flyPosition(118.820719536,36.8531263895,25.1156848343,1.766999703854787,-0.8239437879952669,80.01277539680599,2);
	                            var coord1 = "-2463341.70709,3804360.58476,-4476851.12459;-2463283.77032,3804372.51697,-4476873.17542;-2463291.6468,3804403.49913,-4476841.99375;-2463342.35925,3804392.85604,-4476823.43686;";//模型未抬高坐标
	                            var pos="-2463253.7226,3804419.58937,-4476914.99498";
	                            map3D.loadResource(videoArea,coord1,"3","37.88.57.170,8000,admin,sgjk1qhx","1",pos);
	                            ty4state=true;
	                        }else{
	                        	$("#ty4").css("background","url(../img/tree_xy1.png)");
	                        	$("#ty").css("background","url(../img/tree_xy1.png)");
	                            map3D.deleteVideo("3");
	                            ty4state=false;
	                        }

	}



}

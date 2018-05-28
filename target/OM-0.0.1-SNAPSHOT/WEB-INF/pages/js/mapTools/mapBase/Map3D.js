var content3d;//object标签对象
var licenece3d;
var tools;
var map;//创建球面地图对象
var translate;//创建坐标转换对象

var heightObj = new Array(); 
var imageCutIndex = 1;
var Map3D = CooMap.Class.extend({
	    "type" : "Map3D", 
		/*
			"includes" : [CooMap["DomEvent"],CooMap["Conf"],CooMap["ClassEvent"]],
		*/
		/*
			+------------------------------------------------------------------------------
			* 函数: initialize
			* Map 入口初始化
			+------------------------------------------------------------------------------
			* handel : HTML DIV 容器对象
			* mapOptions : Array{}  地图初始化参数 
			+------------------------------------------------------------------------------
		*/
	    "initialize": function (option){
			this.option = option;
			this.option.stateFlag = this.option.stateFlag || true;
			content3d = document.createElement("object");
			content3d.classid = this.option.classid || "clsid:A1F1748A-2B6E-4616-954D-3F39B11DF57D";
			//content3d.type = this.option.type || "application/x-CoorunAWP";
			content3d.width=this.option.width || "100%";
			content3d.height=this.option.height || "100%";
			try{
				document.getElementById(this.option.id).appendChild(content3d);				
			}catch(e){
				//alert("请利用容器DIV创建地图");
			}
				map = content3d.GetIMapMgrPtr();//创建地图对象
			    translate = map.CreateTransformation();//创建坐标转换对象
			    tools = content3d.GetIToolsCOMPtr();//这是一个bug,调用弹出框的时候必须使用,否则网页会提示类型不匹配,而且弹出框显示不出来
			   
			   	setTimeout(function(){
			   		var resp = map.CreateResponserOptions("UIStateResponser");
			   		resp.AddConfig("TextFont", "C:\\WINDOWS\\Fonts\\msyh.TTF"); /////字体格式文件路径
					resp.AddConfig("StateCurrent", "false");/////当前视点信息开关
					resp.AddConfig("StateMouse", "true");/////当前鼠标信息开关
					resp.AddConfig("StateHeight", "false");/////当前高度信息开关
					resp.AddConfig("MouseShow", "");/////鼠标位置文字
					resp.AddConfig("LonShow", "经度: ");/////经度文字
					resp.AddConfig("LatShow", "纬度: ");/////纬度文字
					resp.AddConfig("HeightShow", "高度: ");/////高程文字
					var resState = map.CreateResponser("UIStateResponser", resp); /////创建状态栏响应器，必须为UIStateResponser
					map.AddResponser(resState);
			   	},1000);
				
		},
		"initMap":function(){
			map = content3d.GetIMapMgrPtr();//创建地图对象
			translate = map.CreateTransformation();//创建坐标转换对象
		    tools = content3d.GetIToolsCOMPtr();//这是一个bug,调用弹出框的时候必须使用,否则网页会提示类型不匹配,而且弹出框显示不出来
			   
		},
		/*获取网络授权*/
		"getLicence":function(url){		
			content3d.InitLic(url);
		},
		/*获取本地授权*/
		"getNativeLicence":function(){		
			licenece3d.Init();
		},
		/*飞行定位*/
		"flyPosition": function(lon,lat,height,Azimuth,Pitch,range,time){
			var navigation = map.CreateNavigation();
            var positions = map.CreatePosition(lon,lat,height);
            navigation.FlyToDest(positions, Azimuth, Pitch, range, time);//参数都是弧度 
		},
		/*加载GMS网络模型*/
		"loadGMS":function(url,serverName){
		var tlo = map.CreateLayerOptions(serverName);//服务器上存放模型数据的文件夹名称

        tlo.AddConfig("LayerOptionsName","ModelLayerOptions");
        tlo.AddConfig("Visible", "true");
        tlo.AddConfig("Name", serverName);
	    tlo.AddConfig("DataSourceTypeName","gms");
	    tlo.AddConfig("Url",url);
	    var gmsLayer = map.CreateLayer("ModelLayer", tlo);
		map.AddLayer(gmsLayer);
	    //setTimeout(function(){gmsLayer.Locate()},500);//数据飞行定位
	    return gmsLayer;
		},
		/*加载单个模型*/
		"loadSingleModel":function(url){
			var tlo = map.CreateLayerOptions("singlemodel"); // 创建singlemodel图层配置，给配置起个名称，任意名称
            tlo.AddConfig("LayerOptionsName", "ModelLayerOptions"); // 创建配置类型, ModelLayerOptions代表模型数据配置，必须是此键值对
            tlo.AddConfig("DataSourceTypeName", "singlemodel"); // 数据源类型,代表SINGLEMODEL插件，必须是此键值对
            tlo.AddConfig("Url", url); /////要加载的数据路径，此数据需为但wrl数据
            var singleModelLayer = map.CreateLayer("ModelLayer", tlo); ////创建模型图层，第一项参数必须为ModelLayer
            map.AddLayer(singleModelLayer); ///添加模型图层
            return singleModelLayer;

		},
		/*加载本地DOM数据*/
		"loadNativeDOM":function(dataURL,rectangle,minLevel,maxLevel){
			var tlo = map.CreateLayerOptions("domlayer"); 	// 创建dom图层配置，给配置起个名称，任意名称
            tlo.AddConfig("LayerOptionsName", "ImageLayerOptions"); // 创建配置类型, ImageLayerOptions代表影像数据配置，必须是此键值对
            tlo.AddConfig("DataSourceTypeName", "mtd"); // 数据源类型,代表MTD插件，必须是此键值对
            tlo.AddConfig("Driver", "terrainquadtree"); // 代表地形驱动，必须是此键值对

            //////////////以下部分可以通过图层信息获取获得相应的配置////////////
            tlo.AddConfig("Url", dataURL); /////要加载的数据路径，此数据必须是通过MTD切割工具生成的数据，并且进行了网络发布
            tlo.AddConfig("Format", "png"); ///////切割形成的数据格式
            tlo.AddConfig("Srs", "EPSG:4326"); /////数据的坐标参考
            tlo.AddConfig("MaxX", rectangle[2]); /////数据的范围X向最大值
            tlo.AddConfig("MinX", rectangle[0]); /////数据的范围X向最小值
            tlo.AddConfig("MaxY", rectangle[3]); ////数据的范围Y向最大值
            tlo.AddConfig("MinY", rectangle[1]); /////数据的范围Y向最小值
            tlo.AddConfig("TileSize", "256"); /////切割数据的瓦片大小，可以往小于16的方向设置，但绝对不能往大于16的方向设置，但最好用切割的大小设置，否则会影响效率
            tlo.AddConfig("MinLevel", String(minLevel)); /////数据显示的最小层级
            tlo.AddConfig("MaxLevel", String(maxLevel)); /////数据显示的最大层级

            var mtddomlayer = map.CreateLayer("ImageLayer", tlo); ////创建DEM图层，第一项参数必须为ImageLayer
            map.AddLayer(mtddomlayer); ///添加DOM图层
            return mtddomlayer;
		},
		/*加载网络DOM服务数据*/
		"loadDOM":function(dataURL,rectangle,minLevel,maxLevel){
			 var tlo = map.CreateLayerOptions("domlayer"); 	// 创建dom图层，给配置起个名称，任意名称
            tlo.AddConfig("LayerOptionsName", "ImageLayerOptions"); // 创建配置类型, ImageLayerOptions代表影像数据配置，必须是此键值对
            tlo.AddConfig("DataSourceTypeName", "mtds"); // 数据源类型,代表MTDS插件，必须是此键值对
            tlo.AddConfig("Driver", "terrainquadtree"); // 代表地形驱动，必须是此键值对

            //////////////以下部分可以通过图层信息获取获得相应的配置////////////
			tlo.AddConfig("Url", dataURL); /////要加载的数据路径，此数据必须是通过MTD切割工具生成的数据，并且进行了网络发布
            tlo.AddConfig("Format", "png"); ///////切割形成的数据格式
            tlo.AddConfig("Srs", "EPSG:4326"); /////数据的坐标参考
           	tlo.AddConfig("MaxX", rectangle[2]); /////数据的范围X向最大值
            tlo.AddConfig("MinX", rectangle[0]); /////数据的范围X向最小值
            tlo.AddConfig("MaxY", rectangle[3]); ////数据的范围Y向最大值
            tlo.AddConfig("MinY", rectangle[1]); /////数据的范围Y向最小值
            tlo.AddConfig("TileSize", "256"); /////切割数据的瓦片大小，可以往小于16的方向设置，但绝对不能往大于16的方向设置，但最好用切割的大小设置，否则会影响效率
            tlo.AddConfig("MinLevel", String(minLevel)); /////数据显示的最小层级
            tlo.AddConfig("MaxLevel", String(maxLevel)); /////数据显示的最大层级

            var mtddomlayer = map.CreateLayer("ImageLayer", tlo); ////创建DEM图层，第一项参数必须为ImageLayer
            map.AddLayer(mtddomlayer); ///添加DOM图层
            return mtddomlayer;
		},
		/*加载网络DEM服务数据*/
		"loadDEM":function(dataURL,rectangle,minLevel,maxLevel){
			var tlo = map.CreateLayerOptions("demlayer"); 				// 创建dem图层，给配置起个名称，任意名称
            tlo.AddConfig("LayerOptionsName", "ElevationLayerOptions"); // 创建配置类型,ElevationLayerOptions代表高程数据配置，必须是此键值对
            tlo.AddConfig("DataSourceTypeName", "mtds"); 				// 数据源类型,代表MTDS插件，必须是此键值对
            tlo.AddConfig("Driver", "terrainquadtree"); 				// 代表地形驱动，必须是此键值对

            //////////////以下部分可以通过图层信息获取获得相应的配置////////////
            tlo.AddConfig("Url", dataURL); /////要加载的数据路径，此数据必须是通过MTD切割工具生成的数据，并且进行了网络发布
            tlo.AddConfig("Format", "tif"); 							///////切割形成的数据格式
            tlo.AddConfig("Srs", "EPSG:4326"); 							/////数据的坐标参考
            tlo.AddConfig("MaxX", rectangle[2]); 					/////数据的范围X向最大值
            tlo.AddConfig("MinX", rectangle[0]); 					/////数据的范围X向最小值
            tlo.AddConfig("MaxY", rectangle[3]); 					////数据的范围Y向最大值
            tlo.AddConfig("MinY", rectangle[1]); 					/////数据的范围Y向最小值
            tlo.AddConfig("TileSize", "16"); /////切割数据的瓦片大小，可以往小于16的方向设置，但绝对不能往大于16的方向设置，但最好用切割的大小设置，否则会影响效率
            tlo.AddConfig("MinLevel", minLevel); /////数据显示的最小层级
            tlo.AddConfig("MaxLevel", maxLevel); /////数据显示的最大层级

            var mtdsdemlayer = map.CreateLayer("ElevationLayer", tlo); ////创建DEM图层，第一项参数必须为ElevationLayer
            map.AddLayer(mtdsdemlayer);///添加DEM图层
            return mtdsdemlayer;
            //mtdsdemlayer.Locate();////DEM图层定位
		},
		/*设置地形透明0.0-1.0（注：0.0没效果）*/
		configTOpacity:function(opacity){
			  var tlo = map.CreateOperationOptions("TerrainOption");        //创建配置类型,操作类型的配置

            tlo.AddConfig("OptionsTypeName", "TerrainOption");           //地形配置项名称  
            tlo.AddConfig("Operation", "Opacity");                        //添加操作类型为透明度操作
            tlo.AddConfig("Opacity", opacity);                                //透明度值0.0~1.0 

           var operationPtr = map.CreateOperation("TerrainOperation", tlo);  //根据配置创建模型调整操作，第一个参数为模型操作的类名

            map.AddOperation(operationPtr);
            return  operationPtr;                             //加入操作并执行
		},
		/*更新透明值操作*/
		"updateTOpacity":function(operationPtr,opacity){
			var tlo = map.CreateOperationOptions("TerrainOption");        //创建配置类型,操作类型的配置
	        tlo.AddConfig("OptionsTypeName", "TerrainOption");            //创建添加配置项类型
	        tlo.AddConfig("Opacity", opacity);                             //添加透明度
	        operationPtr.UpdateOperationOptions(tlo);                      //更新透明度   
		},
		/*加载本地矢量数据*/
		
		"loadSphereShp": function(opt){  //加载矢量数据	
			this.opt = opt;
			var Url = this.opt.url; //设置数据的绝对路径
			var Size = this.opt.Size || "10";//配置大小(0-10)
            var Color = this.opt.Color || "1.0,1.0,0.0,1.0";//配置颜色RGBA
            var TileSize = this.opt.TileSize || "100000";//配置切片大小
            var LiftUp = this.opt.LiftUp || "10";//配置抬高值
            var MinRange = this.opt.MinRange || "0.0";//配置最小显示范围
            var MaxRange = this.opt.MaxRange || "1000000.0";//配置最大显示范围
            var Stipple = this.opt.Stipple || "-1";//线样式
            var Width = this.opt.Width || "2";//线宽
			if(this.opt.type == 0){  //加载矢量点数据
			var pSymbol = map.CreateSymbol("PointSymbol");
			pSymbol.AddConfig("Size", Size);//0-10
			pSymbol.AddConfig("Color", Color);
			      
			var pStyle = map.CreateStyle("Point");
			pStyle.SetName("point");
			pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig());
			pStyle.AddFilterName("BuildGeometryFilter");
			        
			var tlo = map.CreateLayerOptions("shp");
			tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
			tlo.AddConfig("DataSourceTypeName","fmgeom");
			tlo.AddConfig("Driver", "ESRI Shapefile");
			tlo.AddConfig("Url", Url);
			tlo.AddConfig("FeatureSourceType","ogr");
			tlo.AddConfig("TileSizeFactor","1.0");
			tlo.AddConfig("TileSize",TileSize);
			tlo.AddConfig("LiftUp",LiftUp);
			tlo.AddConfig("MaxRange",MaxRange);
			tlo.AddConfig("MinRange",MinRange);
			
  			var styleSheet = map.CreateStyleSheet(); ////创建样式表
       	 	styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
        	tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
            
            var pointShpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer字符串
        	map.AddLayer(pointShpLayer); ////添加矢量图层
            return pointShpLayer;
			}else if(this.opt.type == 1){  //线
				var lSymbol = map.CreateSymbol("LineSymbol");
				  lSymbol.AddConfig("Stipple", Stipple);//-1 实线 1 虚线
				  lSymbol.AddConfig("Width", Width);//
				  lSymbol.AddConfig("Color", Color);
				        
				  var lStyle = map.CreateStyle("Line");
				  lStyle.SetName("line");
				  lStyle.AddSymbol("LineSymbol", lSymbol.GetConfig());
				  lStyle.AddFilterName("BuildGeometryFilter");
				        
				  var tlo = map.CreateLayerOptions("shp");
				  tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
				  tlo.AddConfig("DataSourceTypeName","fmgeom");
				  tlo.AddConfig("Driver", "ESRI Shapefile");
				  tlo.AddConfig("Url", Url);
				  tlo.AddConfig("FeatureSourceType","ogr");
				  tlo.AddConfig("TileSizeFactor","1.0");
				  tlo.AddConfig("TileSize",TileSize);
				  tlo.AddConfig("LiftUp",LiftUp);
				  tlo.AddConfig("MaxRange",MaxRange);
				  tlo.AddConfig("MinRange",MinRange);
				 
				  var styleSheet = map.CreateStyleSheet(); ////创建样式表
		          styleSheet.AddStyle(lStyle.GetConfig()); ////将样式配置添加至样式表
		          tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
		          
		          var lineShpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
		          map.AddLayer(lineShpLayer); ////添加矢量图层
				  return lineShpLayer;
					
			}else if(this.opt.type == 2){  //面
				var pSymbol = map.CreateSymbol("PolygonSymbol");
				  pSymbol.AddConfig("Color", Color);
				        
				  var pStyle = map.CreateStyle("Polygon");
				  pStyle.SetName("polygon");
				  pStyle.AddSymbol("PolygonSymbol", pSymbol.GetConfig());
				  pStyle.AddFilterName("BuildGeometryFilter");
				        
				  var tlo = map.CreateLayerOptions("shp");
				  tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
				  tlo.AddConfig("DataSourceTypeName","fmgeom");
				  tlo.AddConfig("Driver", "ESRI Shapefile");
				  tlo.AddConfig("Url", Url);
				  tlo.AddConfig("FeatureSourceType","ogr");
				  tlo.AddConfig("TileSizeFactor","1.0");
				  tlo.AddConfig("TileSize",TileSize);
				  tlo.AddConfig("LiftUp",LiftUp);
				  tlo.AddConfig("MaxRange",MaxRange);
				  tlo.AddConfig("MinRange",MinRange);
				 
			 	  var styleSheet = map.CreateStyleSheet(); ////创建样式表
			      styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
			      tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
			      var polygonShpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
			      map.AddLayer(polygonShpLayer); ////添加矢量图层
				return polygonShpLayer;	

			}
		},
		"showlayer": function(layer){  //图层显隐控制
			if(layer == null || layer == undefined){
				return;
			}
			else{
				layer.SetVisible(true);
			}
			
		},
		"hidelayer": function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			else{
				layer.SetVisible(false);	
			}
				
		},
		"removelayer": function(layer){//图层移除
			if(layer == null || layer == undefined){
				return;
			}
			else{
				map.RemoveLayer(layer);
			}
			
		},

		/*路径漫游*/
		"drawRoamPath": function(){  //开启绘制
			 //////创建图层配置信息
			 var tlo = map.CreateLayerOptions("draw2dcircle");
			 tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions");///2D对象绘制必须设置为Draw2DObjectOptions
		     tlo.AddConfig("DataSourceTypeName", "as_draw2dobject");
		     tlo.AddConfig("IsImmediateMode", "true");
			 tlo.AddConfig("PointColor", "1, 0.8, 0.6,0.6");//点的颜色
			 tlo.AddConfig("PointSize", "0");//点的大小
			 tlo.AddConfig("DrawLineColor", "1,0.2,0,1");//绘制图形外边框颜色
			 tlo.AddConfig("LiftUp", "0.1");//抬高高度
			 tlo.AddConfig("VisiableLine", "true");//是否显示外边框
			 tlo.AddConfig("VisiableFace", "true");//是否显示填充面
			 tlo.AddConfig("DrawType", "3");//绘制线
            tlo.AddConfig("DataSourceTypeName", "as_draw2dobject"); /////// 数据源类型,代表2D对象，必须是此键值对
            var drawRoamPath = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
            drawRoamPath.AddObserver();
            map.AddLayer(drawRoamPath); ///添加分析图层
            return drawRoamPath;         
		},
		"clearRoamPath": function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			else{
				map.RemoveLayer(layer);
			}
		
		},
		"addRoamPath":function(coordStr,distance,speed){
			 var tlo = map.CreateLayerOptions("dynamicpathlayer"); // 创建路径动画图层配置，给配置起个名称，任意名称
			    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions"); // 创建配置类型, DynamicPathLayerOptions代表路径图层数据配置，必须是此键值对

			    tlo.AddConfig("PlayerMode", "PLAYER_ONEWAY");////播放模式 有一次性播放"PLAYER_ONEWAY" 循环一次播放"PLAYER_ONEWAY_LOOP" 往返播放"PLAYER_ROUND_LOOP"
			    tlo.AddConfig("PlayerState", "PLAYER_STOP");///播放状态 有播放"PLAYER_PLAY"、暂停"PLAYER_PAUSE"、停止"PLAYER_STOP"
			    tlo.AddConfig("ViewObjectMode", "0,-0.708,"+distance);///路径观察视角，格式为"1.57,-0.708,100",第一个为视角方位角，第二个为视角俯仰角，第三个为视点到关键点距离
			    tlo.AddConfig("Velocity",speed);///速度 单位m/s
			    tlo.AddConfig("LineWidth","2.0");///线宽
			    tlo.AddConfig("LineStipple","65535");///线样式
			    tlo.AddConfig("LineColor", "0.0,1.0,0.0, 0.0");////路径线颜色
				tlo.AddConfig("InterpLineColor", "1.0,0.0,0.0, 0.0");////差值线颜色
			    tlo.AddConfig("NodeActive", "true");////节点激活状态,当为true时可以跟随模型或路径移动，当前漫游不可用
			    //tlo.AddConfig("PathActive", "true");////路径激活状态，与节点激活状态互斥

				tlo.AddConfig("KeyPoints", coordStr);
				
				

				var dynamicPathLayer = map.CreateLayer("DynamicPathLayer", tlo);
				map.AddLayer(dynamicPathLayer);
				dynamicPathLayer.AddObserver();		   
		        return dynamicPathLayer;
		},
		"playRoamPath": function(layer){  //播放路径
			if(layer == null || layer == undefined){
				return;
			}
				var tlo = map.CreateLayerOptions("dynamicpathlayer");
			    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
			    tlo.AddConfig("PlayerState", "PLAYER_PLAY");
				layer.UpdateLayerOptions(tlo);
		},
		"pauseRoamPath": function(layer){  //暂停播放
			if(layer == null || layer == undefined){
				return;
			}
			var tlo = map.CreateLayerOptions("dynamicpathlayer");
		    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
		    tlo.AddConfig("PlayerState", "PLAYER_PAUSE");

		    layer.UpdateLayerOptions(tlo);
		   
		    
		},
		"stopRoamPath": function(layer){  //停止播放
			if(layer == null || layer == undefined){
				return;
			}
			 var tlo = map.CreateLayerOptions("dynamicpathlayer");
			    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
			    tlo.AddConfig("PlayerState", "PLAYER_STOP");
			    layer.UpdateLayerOptions(tlo);
		},
		"getPointCount": function(){  //获取路径绘制的点总个数
			var pathPointCount = content3d.GetICameraPtr().GetRoamPathPointCount();
			return pathPointCount;	
		},
		"getPointCoordinate": function(index){  //获取路径播放经过的点坐标信息
			var pathPointCoordinate = content3d.GetICameraPtr().GetRoamPathPointCoordinate(index);
			return pathPointCoordinate;			
		},
		/*本地WRL模型操作*/

		"loadCPM":function(url){
			 var tlo = map.CreateLayerOptions("cpm"); // 创建cpm图层配置，给配置起个名称，任意名称
            tlo.addConfig("LayerOptionsName", "ModelLayerOptions"); // 创建配置类型, ModelLayerOptions代表模型数据配置，必须是此键值对
            tlo.Addconfig("DataSourceTypeName", "cpm"); // 数据源类型,代表CPM插件，必须是此键值对
            tlo.addconfig("Url", url); /////要加载的数据路径，此数据需为CPM数据，不支持压缩数据
            var cpmLayer = map.CreateLayer("ModelLayer", tlo); ////创建模型图层，第一项参数必须为ModelLayer
            map.AddLayer(cpmLayer); ///添加模型图层
            //cpmLayer.Locate(); ////模型图层定位
			return  cpmLayer;
		},
		"modelPick":function(){//模型拾取
			content3d.GetIObjectPickPtr().SetScenePickParam(true, 1);
		},
		"stopModelPick":function(){//停止拾取
			content3d.GetIObjectPickPtr().SetScenePickParam(false, 1);
		},
		"modelSetHighlight":function(layer,state){//模型高亮显示
			layer.SetHighlight(state);
		},
		/*测量工具--距离、水平、垂直*/
		"addSphereMeasure": function(type){  //测量功能
			var Measurelayer;
			if(type == 0){//点测量
				 //////创建图层配置信息
	            var tlo = map.CreateLayerOptions("pointMeasure"); // 创建分析图层配置，给配置起个名称，任意名称
	            tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
	            tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
	            tlo.AddConfig("PointSize", "5"); //设置点击点的大小
	            tlo.AddConfig("TextVisible", "true"); ////文字是否被显示
	            tlo.AddConfig("TextLiftUp", "0"); /////文字显示的抬高高度
	            tlo.AddConfig("DataSourceTypeName", "as_point"); /////// 数据源类型,代表点测量，必须是此键值对

	            /////创建文字符号
	            var pSymbol = map.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置 
	            pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
	            pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
	            pSymbol.AddConfig("Size", "40"); ///设置字体大小
	            pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
	            pSymbol.AddConfig("CharacterMode", "1"); // 取值 1 -- 始终朝向相机
	            pSymbol.AddConfig("AlignmentMode", "5"); // 文字对齐方式
	            pSymbol.AddConfig("AxisAlignment", "6"); // 旋转轴 0 - 7 ， 6: 自动
	            pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复			
	            pSymbol.AddConfig("IsEmbolden", "false"); //字体是否加粗
	            pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
	            pSymbol.AddConfig("IsUnderline", "false"); //字体是否有下划线
	            pSymbol.AddConfig("IsBack", "false"); //是否设置背景色
	            pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效
	            //pSymbol.AddConfig("FieldPrecision", "-20"); //字段精度

	            /////创建样式
	            var pStyle = map.CreateStyle("Text"); /////创建Style，名字可以任意
	            pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

	            //////////将样式添加到图层配置里
	            tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
	            Measurelayer = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
	            map.AddLayer(Measurelayer); ///添加分析图层
			}
			else if(type == 1){//水平测量
			//////创建图层配置信息
	            var tlo = map.CreateLayerOptions("horizontalMeasure"); // 创建分析图层配置，给配置起个名称，任意名称
	            tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
	            tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
	            tlo.AddConfig("PointSize", "5"); //设置点击点的大小
	            tlo.AddConfig("TextVisible", "true"); ////文字是否被显示
	            tlo.AddConfig("HorizontalMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
	            tlo.AddConfig("LineWidth", "2"); ////线宽
	            tlo.AddConfig("TextLiftUp", "0"); /////文字显示的抬高高度
	            tlo.AddConfig("MeasureUnit","0");		//0-米； 1-公里；2-海里
	        		tlo.AddConfig("MeasureUnitLanguage", "1")//0-英文； 1-中文
	        		tlo.AddConfig("IsDepthTest","false");	//是否开启深度测试。false不开启，结果会浮在场景上，true实际显示位置
	            tlo.AddConfig("DataSourceTypeName", "as_horizontal");/////// 数据源类型,代表水平距离测量，必须是此键值对

	            /////创建文字符号
	            var pSymbol = map.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置 
	            pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
	            pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
	            pSymbol.AddConfig("Size", "40"); ///设置字体大小
	            pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
	            pSymbol.AddConfig("CharacterMode", "1");// 取值 1 -- 始终朝向相机
	            pSymbol.AddConfig("AlignmentMode", "5");// 文字对齐方式
	            pSymbol.AddConfig("AxisAlignment", "6");// 旋转轴 0 - 7 ， 6: 自动
	            pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复			
	            pSymbol.AddConfig("IsEmbolden", "false");//字体是否加粗
	            pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
	            pSymbol.AddConfig("IsUnderline", "false");//字体是否有下划线
	            pSymbol.AddConfig("IsBack", "false");//是否设置背景色
	            pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效
	            //pSymbol.AddConfig("FieldPrecision", "-20");//字段精度

	            /////创建样式
	            var pStyle = map.CreateStyle("Text");/////创建Style，名字可以任意
	            pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

	            //////////将样式添加到图层配置里
	            tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
	            Measurelayer = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
	            map.AddLayer(Measurelayer); ///添加分析图层
			 }else if(type == 2){//垂直测量
				 //////创建图层配置信息
		            var tlo = map.CreateLayerOptions("verticalMeasure"); // 创建分析图层配置，给配置起个名称，任意名称
		            tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
		            tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
		            tlo.AddConfig("PointSize", "5"); //设置点击点的大小
		            tlo.AddConfig("TextVisible", "true"); ////文字是否被显示
		            tlo.AddConfig("VerticalMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
		            tlo.AddConfig("LineWidth", "2"); ////线宽
		            tlo.AddConfig("TextLiftUp", "0"); /////文字显示的抬高高度
		            tlo.AddConfig("MeasureUnit","0");		//0-米； 1-公里；2-海里
	        			tlo.AddConfig("MeasureUnitLanguage", "1");//0-英文； 1-中文
								tlo.AddConfig("IsDepthTest","true");	//是否开启深度测试。false不开启，结果会浮在场景上，true实际显示位置
		            tlo.AddConfig("DataSourceTypeName", "as_vertical"); /////// 数据源类型,代表垂直距离测量，必须是此键值对

		            /////创建文字符号
		            var pSymbol = map.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置 
		            pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
		            pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
		            pSymbol.AddConfig("Size", "40"); ///设置字体大小
		            pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
		            pSymbol.AddConfig("CharacterMode", "1"); // 取值 1 -- 始终朝向相机
		            pSymbol.AddConfig("AlignmentMode", "5"); // 文字对齐方式
		            pSymbol.AddConfig("AxisAlignment", "6"); // 旋转轴 0 - 7 ， 6: 自动
		            pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复			
		            pSymbol.AddConfig("IsEmbolden", "false"); //字体是否加粗
		            pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
		            pSymbol.AddConfig("IsUnderline", "false"); //字体是否有下划线
		            pSymbol.AddConfig("IsBack", "false"); //是否设置背景色
		            pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效
		            //pSymbol.AddConfig("FieldPrecision", "-20"); //字段精度

		            /////创建样式
		            var pStyle = map.CreateStyle("Text"); /////创建Style，名字可以任意
		            pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

		            //////////将样式添加到图层配置里
		            tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
		            Measurelayer = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
		            map.AddLayer(Measurelayer); ///添加分析图层
			 }else if(type == 3){//距离测量
			 
				 //////创建图层配置信息
		            var tlo = map.CreateLayerOptions("distanceMesure"); // 创建分析图层配置，给配置起个名称，任意名称
		            tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
		            tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
		            tlo.AddConfig("PointSize", "5"); //设置点击点的大小
		            tlo.AddConfig("TextVisible", "true"); ////文字是否被显示
		            tlo.AddConfig("DistanceMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
		            //tlo.AddConfig("MeasureUnit","11");		               //10-平方米； 11-公顷； 12-平方公里； 13-平方海里
		            tlo.AddConfig("LineWidth", "2"); ////线宽
		            tlo.AddConfig("TextLiftUp", "0"); /////文字显示的抬高高度
		            tlo.AddConfig("MeasureUnit","0");		              //0-米； 1-公里；2-海里
	        		tlo.AddConfig("MeasureUnitLanguage","1");		      //0-英文； 1-中文
					tlo.AddConfig("IsDepthTest","false");	//是否开启深度测试。false不开启，结果会浮在场景上，true实际显示位置
		            tlo.AddConfig("DataSourceTypeName", "as_distance");/////// 数据源类型,代表距离测量，必须是此键值对

		            /////创建文字符号
		            var pSymbol = map.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置 
		            pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
		            pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
		            pSymbol.AddConfig("Size", "40"); ///设置字体大小
		            pSymbol.AddConfig("CharacterSize", "20"); 	//文字大小
		            pSymbol.AddConfig("CharacterMode", "1");// 取值 1 -- 始终朝向相机
		            pSymbol.AddConfig("AlignmentMode", "5");// 文字对齐方式
		            pSymbol.AddConfig("AxisAlignment", "6");// 旋转轴 0 - 7 ， 6: 自动
		            pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复			
		            pSymbol.AddConfig("IsEmbolden", "false");//字体是否加粗
		            pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
		            pSymbol.AddConfig("IsUnderline", "false");//字体是否有下划线
		            pSymbol.AddConfig("IsBack", "false");//是否设置背景色
		            pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效
		            //pSymbol.AddConfig("FieldPrecision", "-20");//字段精度

		            /////创建样式
		            var pStyle = map.CreateStyle("Text");/////创建Style，名字可以任意
		            pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

		            //////////将样式添加到图层配置里
		            tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
		            Measurelayer = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
		            map.AddLayer(Measurelayer); ///添加分析图层
			 }else if(type == 4){//面积测量
				 //////创建图层配置信息
		            var tlo = map.CreateLayerOptions("areaMeasure "); // 创建分析图层配置，给配置起个名称，任意名称
		            tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
		            tlo.AddConfig("PointColor", "0.0,0.0,1.0,1.0"); //设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
		            tlo.AddConfig("PointSize", "5"); //设置点击点的大小
		            tlo.AddConfig("TextVisible", "true"); ////文字是否被显示
		            tlo.AddConfig("AreaMeasureLineColor", "1.0,0.0,0.0,1.0"); //设置线的颜色（RGBA）
		            tlo.AddConfig("PolygonColor", "0,1.0,1.0,0.5"); //设置线的颜色（RGBA）
		            tlo.AddConfig("MeasureUnit","10");		               //10-平方米； 11-公顷； 12-平方公里； 13-平方海里
		            tlo.AddConfig("MeasureUnitLanguage", "1");		      //0-英文； 1-中文
		            tlo.AddConfig("LineWidth", "2"); ////线宽
		            tlo.AddConfig("TextLiftUp", "10"); /////文字显示的抬高高度
		            tlo.AddConfig("LiftUp", "1"); ////抬升高度，任意值
		            tlo.AddConfig("DataSourceTypeName", "as_area"); /////// 数据源类型,代表面积测量，必须是此键值对
		            tlo.AddConfig("AreaMeasureType", "1");	               // 0-空间面积测量； 1-水平面积测量； 2-地形面积测量（暂无）

		            /////创建文字符号
		            var pSymbol = map.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置 
		            pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0,1"); //设置文字颜色（RGBA）
		            pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
		            pSymbol.AddConfig("Size", "40"); ///设置字体大小
		            pSymbol.AddConfig("CharacterMode", "1"); // 取值 1 -- 始终朝向相机
		            pSymbol.AddConfig("CharacterSize", "20"); 						//文字大小
		            pSymbol.AddConfig("AlignmentMode", "5"); // 文字对齐方式
		            pSymbol.AddConfig("AxisAlignment", "6"); // 旋转轴 0 - 7 ， 6: 自动
		            pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复			
		            pSymbol.AddConfig("IsEmbolden", "false"); //字体是否加粗
		            pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
		            pSymbol.AddConfig("IsUnderline", "false"); //字体是否有下划线
		            pSymbol.AddConfig("IsBack", "false"); //是否设置背景色
		            pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效
		            //pSymbol.AddConfig("FieldPrecision", "-20"); //字段精度
		        /////创建样式
		            var pStyle = map.CreateStyle("Text"); /////创建Style，名字可以任意
		            pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

		            //////////将样式添加到图层配置里
		            tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
		            Measurelayer = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
		            map.AddLayer(Measurelayer); ///添加分析图层			 
			 }else if(type == 5){ //表面积测量
				//创建图层配置信息
			var mlo = map.CreateLayerOptions("areaMeasure");      //创建分析图层配置，给配置起个名称，任意名称
			mlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); //创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
			//mlo.AddConfig("DataSourceTypeName","as_area");			//数据源类型,代表垂直距离测量，必须是此键值对
			mlo.AddConfig("PointColor","0,0.3,0.8,1.0"); 			//设置点击点的颜色透明度（RGBA） 1为不透明 0为透明
			mlo.AddConfig("PointSize","7"); 						//设置点击点的大小
			mlo.AddConfig("AreaMeasureLineColor","0,0.9,0.2,1.0");  //设置线的颜色（RGBA）
			mlo.AddConfig("PolygonColor","0,0.7,0.4,0.5"); 			//设置面的颜色（RGBA）
			mlo.AddConfig("MeasureUnit","10"); 						//10-平方米； 11-公顷； 12-平方公里； 13-平方海里
			mlo.AddConfig("MeasureUnitLanguage", "1"); 				//0-英文； 1-中文
			mlo.AddConfig("AreaMeasureType", "2"); 					//0-空间面积测量； 1-水平面积测量； 2-地表面积测量
			
			mlo.AddConfig("PolygonMode", "2" );                   //地表面积测量专有配置项 封闭区域显示方式选择 1,以多边形区域显示 2,以网格显示
			mlo.AddConfig("PageLevel", "5" );                     //地表面积测量专有配置项 0~16 当前层级累加该数值并调度相应层级瓦片
			mlo.AddConfig("GridLineColor", "1.0,1.0,0.0,1.0");    //地表面积测量专有配置项 格网线设置 当PolygonMode为2时选择


			//创建文字符号
			var pSymbol = map.CreateSymbol("TextSymbol");                  //创建文字符号，必须为TextSymbol字符串
			pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0");       	//设置文字颜色（RGBA）
			pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF");  	//设置字体类型,字体文件一定要存在
			pSymbol.AddConfig("Size", "40"); 								//字体精度大小
			pSymbol.AddConfig("CharacterSize", "20"); 						//文字大小
			pSymbol.AddConfig("CharacterMode", "1"); 						//取值 1 -- 始终朝向相机
			pSymbol.AddConfig("AlignmentMode", "5");						//文字对齐方式
			pSymbol.AddConfig("AxisAlignment", "6");						//旋转轴 0 - 7 ， 6: 自动
			pSymbol.AddConfig("RemoveDuplicateLabels", "false");			//去重复			
			pSymbol.AddConfig("IsEmbolden", "false");						//字体是否加粗
			pSymbol.AddConfig("IsTransform", "true");						//字体是否为斜体
			pSymbol.AddConfig("IsUnderline", "false");						//字体是否有下划线
			pSymbol.AddConfig("IsBack", "false");							//是否设置背景色
			pSymbol.AddConfig("BackColor", "0,1.0,1.0,1");					//背景颜色，是否设置背景色为true有效

			//创建样式
			var pStyle = map.CreateStyle("Text");                         //创建Style，名字可以任意
			pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig());          //添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取
			//将样式添加到图层配置里
			mlo.AddConfig("Style", pStyle.GetConfig());                   //第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取
			
			SurfaceAreaMeasure = map.CreateLayer("AnalysisLayer", mlo);          //创建分析图层，第一项参数必须为AnalysisLayer
			map.AddLayer(SurfaceAreaMeasure);                                    //添加分析图层		
			}	

				return Measurelayer;
			},
		/*控高分析*/
		"heightControl":function(height){
			var tlo = map.CreateLayerOptions("heightControl ")// 创建分析图层配置，给配置起个名称，任意名称
            tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
            tlo.AddConfig("DataSourceTypeName", "as_heightcontrol"); /////// 数据源类型,代表控高分析，必须是此键值对
            tlo.AddConfig("PointColor", "0.0,0.0,1.0"); //设置点击点的颜色（RGB）
            tlo.AddConfig("PointSize", "5"); //设置点击点的大小
            tlo.AddConfig("TextVisible", "false"); ////文字是否被显示
            tlo.AddConfig("HeightControlLineColor", "0.0,0.0,1.0,1"); //设置线的颜色（RGB）
            tlo.AddConfig("TextLiftUp", "0"); /////文字显示的抬高高度
            tlo.AddConfig("AreaNum", "1"); /////绘制的区域个数 
            tlo.AddConfig("LayersID", "1"); ////要取消范围内模型现状的id集合，以逗号分隔，末尾不能有逗号 如：3,4,5
            tlo.AddConfig("Height",height); ///控高的高差
            tlo.AddConfig("TopColor", "0,1,0,0.5"); //设置控高顶面的颜色（RGBA）
            tlo.AddConfig("SideColor", "1,1,1,0.5"); //设置控高侧面的颜色（RGBA）
            tlo.AddConfig("RangeLineVisible", "false"); ////范围线是否显示

            /////创建文字符号
            var pSymbol = map.CreateSymbol("TextSymbol"); //创建文字符号，必须为TextSymbol字符串，当上面设置TextVisible设置为 true才创建并进行相应配置 
            pSymbol.AddConfig("FillingColor", "1.0, 0.0, 0.0, 1.0"); //设置文字颜色（RGBA）
            pSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\STXIHEI.TTF"); //设置字体类型,字体文件一定要存在
            pSymbol.AddConfig("Size", "15"); ///设置字体大小
            pSymbol.AddConfig("CharacterMode", "1"); // 取值 1 -- 始终朝向相机
            pSymbol.AddConfig("AlignmentMode", "4"); // 文字对齐方式
            pSymbol.AddConfig("AxisAlignment", "6"); // 旋转轴 0 - 7 ， 6: 自动
            pSymbol.AddConfig("RemoveDuplicateLabels", "false"); // 去重复			
            pSymbol.AddConfig("IsEmbolden", "false"); //字体是否加粗
            pSymbol.AddConfig("IsTransform", "true"); //字体是否为斜体
            pSymbol.AddConfig("IsUnderline", "false"); //字体是否有下划线
            pSymbol.AddConfig("IsBack", "false"); //是否设置背景色
            pSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); //背景颜色，是否设置背景色为true有效
            pSymbol.AddConfig("FieldPrecision", "-20"); //字段精度

            /////创建样式
            var pStyle = map.CreateStyle("Text"); /////创建Style，名字可以任意
            pStyle.AddSymbol("TextSymbol", pSymbol.GetConfig()); ///添加文字符号到Style里，第一参必须为TextSymbol字符串，第二参为上面创建的文字符号的配置信息，通过 pSymbol.GetConfig()获取

            //////////将样式添加到图层配置里
            tlo.AddConfig("Style", pStyle.GetConfig()); ////第一参必须为Style字符串，第二参为上面创建的Style的配置信息，通过 pStyle.GetConfig()获取

            var heightControl = map.CreateLayer("AnalysisLayer", tlo); ////创建分析图层，第一项参数必须为AnalysisLayer
            map.AddLayer(heightControl); ///添加分析图层
	        return heightControl;

		},
		/*更新控高分析*/
		"updateHeightControl":function(layer,height){
			if(layer == null || layer == undefined){
				return;
			}
			var opt = layer.GetLayerOption();
			var points = opt.GetConfigValueByKey("Points");//起始点的坐标
			var pointsIndex = opt.GetConfigValueByKey("PointsIndex");
			var mlo3 = map.CreateLayerOptions("")
			mlo3.AddConfig("LayerOptionsName", "HeightControlOptions")
		    mlo3.AddConfig("Points",points);
		    mlo3.AddConfig("PointsIndex",pointsIndex);
		    mlo3.AddConfig("Height",height);
		    mlo3.AddConfig("IsLoad","true");
			
			var id = layer.GetLayerID();
		    map.UpdateAnalysis(id, mlo3);
		},
		/*获取控高分析的起始点坐标*/
		"getHeightControlPos":function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			var opt = layer.GetLayerOption();
			var points = opt.GetConfigValueByKey("Points");//起始点的坐标
			return points;
		},
		/*视域分析---根据坐标点添加的视域分析*/
		"viewShed":function(VAngle,HAngle,EyePos,ArmPos){
		    var mlo3 = map.CreateLayerOptions("");
	        mlo3.AddConfig("LayerOptionsName", "AnalysisLayerOptions");///视域分析必须设置为ViewShedAnalysisOptions
	        mlo3.AddConfig("DataSourceTypeName", "as_viewshed");
		    mlo3.AddConfig("VAngle",VAngle);
		    mlo3.AddConfig("HAngle",HAngle);
		    mlo3.AddConfig("EyePos",EyePos);//观察点坐标(起始点坐标)
		    mlo3.AddConfig("ArmPos", ArmPos);//目标点坐标(目标点坐标)   注意:这是场景坐标-2768163.3659590534,3196156.3096583206,-4767988.168168
			mlo3.AddConfig("IsLoad", "true");
		    //mlo3.AddConfig("IsImmediateMode","true");
		    mlo3.AddConfig("DrawLineColor","0,1,0,1");
		    mlo3.AddConfig("DrawViewColor","1,0,0,1");
		    mlo3.AddConfig("DrawViewLookColor","1,1,0,1");
		    //mlo3.AddConfig("IsDepthTest","true");
		    var view = map.CreateLayer("AnalysisLayer", mlo3);
		    map.AddLayer(view);
		    return view;
		},
		/*视域分析---老版本SDK支持*/
		"updateViewShedAnalysis":function(layer,VAngle,HAngle,ArmPos){
			if(layer == null || layer == undefined){
				return;
			}
			var opt = layer.GetLayerOption();
			var eyePos = opt.GetConfigValueByKey("EyePos");//获取观察点坐标(起始点坐标)
			
			var mlo3 = map.CreateLayerOptions("")
			mlo3.AddConfig("LayerOptionsName", "AnalysisLayerOptions");
			mlo3.AddConfig("VAngle", VAngle);
			mlo3.AddConfig("HAngle", HAngle);
			mlo3.AddConfig("EyePos", eyePos);
			mlo3.AddConfig("ArmPos", ArmPos);
			mlo3.AddConfig("IsLoad", "true");
			layer.UpdateLayerOptions(mlo3);
	    
		},
		"sightAnalysis":function(VAngle,HAngle){
			var mlo3 = map.CreateLayerOptions("")
		     mlo3.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); ///视域分析必须设置为ViewShedAnalysisOptions
		     mlo3.AddConfig("DataSourceTypeName", "as_viewshed");
			 mlo3.AddConfig("VAngle","60");
			 mlo3.AddConfig("HAngle","60");
			// mlo3.AddConfig("IsImmediateMode","true");
			 mlo3.AddConfig("DrawLineColor","0,1,0,1");
			 mlo3.AddConfig("DrawViewColor","1,0,0,1");
			 mlo3.AddConfig("DrawViewLookColor","1,1,0,1");
			// mlo3.AddConfig("IsDepthTest","true");
			 var layer = map.CreateLayer("AnalysisLayer", mlo3);
			 map.AddLayer(layer);
			 return layer;
		},
		/*获取视域分析的观察点坐标*/
		"getViewShedPos":function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			var opt = layer.GetLayerOption();
			var eyePos = opt.GetConfigValueByKey("EyePos");//观察点坐标
			return eyePos;
		},
		/*通视分析*/
		"lineOfSight":function(){
			 var mlo3 = map.CreateLayerOptions("")
		        mlo3.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); ///通视分析必须设置为LineOfSightOptions
		        mlo3.AddConfig("DataSourceTypeName", "as_linesight");
		        mlo3.AddConfig("StartColor","0,0,1,1");
			    mlo3.AddConfig("EndColor","0,0,1,1");
			    mlo3.AddConfig("HitColor","1,1,0,1");
			    mlo3.AddConfig("StartPointSize","7");
			    mlo3.AddConfig("EndPointSize","7");
			    mlo3.AddConfig("HitPointSize","10");
			    mlo3.AddConfig("IsImmediateMode","true");
			    mlo3.AddConfig("LineOfSightColor","0,1,0,1");
			    mlo3.AddConfig("InvisiblePartColor","1,0,0,1");
			    mlo3.AddConfig("VisiblePartColor","1,1,0,1");
			    mlo3.AddConfig("IsDepthTest","true");
			    var layer = map.CreateLayer("AnalysisLayer", mlo3);
			    map.AddLayer(layer);
			    return layer;
		},
		/*更新通视分析*/
		"updateLineOfSight":function(layer,statPos,endPos){
			if(layer == null || layer == undefined){
				return;
			}
			var mlo3 = map.CreateLayerOptions("")
			mlo3.AddConfig("LayerOptionsName", "LineOfSightOptions")
			mlo3.AddConfig("EndColor","1,0,1");
			mlo3.AddConfig("HitColor","1,1,1");
			mlo3.AddConfig("StartPoint",statPos);
			mlo3.AddConfig("EndPoints",endPos);
		    mlo3.AddConfig("IsLoad","true");
			var id = layer.GetLayerID();
			map.UpdateAnalysis(id, mlo3);   
		},
		/*获取通视分析的观察点和目标点坐标*/
		"getLineOfSightPos":function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			var opt = layer.GetLayerOption();
			var statPos = opt.GetConfigValueByKey("StartPoint");//观察点坐标
			var endPos = opt.GetConfigValueByKey("EndPoints");//目标点坐标
			var LineOfSightPos = "观察点坐标："+statPos+";目标点坐标："+endPos;
			return LineOfSightPos;

		},
		/*常用工具--坐标转换（经纬度转场景、场景转经纬度、屏幕转经纬度）、获取当前视点（经纬度、经纬度+旋转角）、获取SDK路径*/
		"coordTransformation":function(type,opt){
			this.opt = opt;
			var PosX = this.opt.posX;//场景坐标X
			var PosY = this.opt.posY; //场景坐标Y
			var PosZ = this.opt.posZ;//场景坐标H
			var lon = this.opt.Lon;//经度
			var lat = this.opt.Lat; //纬度
			var height = this.opt.Height;//高度
			var ScreenX = this.opt.screenX;//屏幕坐标X
			var ScreenY = this.opt.screenY;  //屏幕坐标Y
			var coordContent;
			if(type == 1){//经纬度转场景坐标
				var positions = map.CreatePosition(lon,lat,height);//获取点对象
				var convert = translate.ConvertLongLatHeightToXYZ(positions);
				coordContent = convert.GetX()+","+convert.GetY()+","+convert.GetZ()+";";
               
			}else if(type == 2){//场景坐标转经纬度
				var positions = map.CreatePosition(PosX,PosY,PosZ);//获取点对象
				var convert = translate.ConvertXYZToLongLatHeight(positions);
			    coordContent = convert.GetX()+","+convert.GetY()+","+convert.GetZ();
			}else if(type == 3){//屏幕坐标转经纬度
				var convert = translate.ScreenPosToWorldPos(ScreenX,ScreenY);
				coordContent = convert.GetX()+","+convert.GetY()+","+convert.GetZ();
			}
			else if(type == 4){//经纬度转屏幕坐标
			var positions = map.CreatePosition(lon,lat,height);
			 var sPos = translate.WorldPosToScreenPos(positions);
			  coordContent = sPos.GetX()+","+sPos.GetY();
			}
			
			 return coordContent;

		},
		/*获取当前视点*/
		"getViewPoint":function(){		
			 var viewPoints = map.CreateNavigation().GetViewPoint();
			// alert(viewPoints);
			 return viewPoints;
		},
		"getSDKPath":function(){//获取SDK路径
			var path = content3d.GetSDKPath();
			return path;

		},
		/*注册事件*/
		"sdkEvent":function(){
			var eve = content3d;
			return eve; 
		},
		//创建一个模型标注图层
		"createModelLabelLayer":function(modelUrl){
			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
	        pSymbol.AddConfig("Size", "10"); ////点大小，范围0-10
	        pSymbol.AddConfig("Color", "1.0,1.0,0.0,1.0"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
	       
	        	 var tSymbol = map.CreateSymbol("ModelSymbol"); ////创建类型为ModelSymbol的符号，必须为ModelSymbol字符串 
	 	        tSymbol.AddConfig("Heading", "0"); ////绕Z轴(世界坐标系方向相同 far->near)旋转,从far(-Z)向near(+Z)看去,逆时针为正，弧度表示
	 	        tSymbol.AddConfig("Pitch", "0"); //////绕Y轴(世界坐标系方向相同 down(-Y)向up(Y))旋转,从down(-Y)向up(+Y)看去,逆时针为正，弧度表示
	 	        tSymbol.AddConfig("Roll", "0"); ////绕X轴(世界坐标系方向相同 left->right)旋转,从left(-X)向right(+X)看去,逆时针为正，弧度表示

	 	        tSymbol.AddConfig("XScale", "1"); ////模型x方向放大比例
	 	        tSymbol.AddConfig("YScale", "1"); ////模型y方向放大比例
	 	        tSymbol.AddConfig("ZScale", "1"); ////模型z方向放大比例
	 	        tSymbol.AddConfig("ModelOriginDir", "0,0,1"); ////模型原始轴向
	 	        tSymbol.AddConfig("Url", modelUrl); ////模型资源路径
	 	        tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

	 	        var res = map.CreateResource("ModelSymbol"); ////创建模型资源，此处必须为ModelSymbol
	 	        res.AddConfig("Uri", modelUrl); ////模型资源路径
	 	        var reslib = map.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
	 	        reslib.AddResource(res); ////将资源添加至资源库
	 	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
		        pStyle.SetName("point"); ////设置别名point
		       // pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式
		        //pStyle.AddFilterName("BuildGeometryFilter"); //设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
		        pStyle.AddSymbol("ModelSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为ModelSymbol字符串
		        pStyle.AddFilterName("SubstituteModelFilter"); ////设置构建器符号为SubstituteModelFilter，必须为SubstituteModelFilter字符串，此为图标符号化和模型符号化共有

		        var styleSheet = map.CreateStyleSheet(); ////创建样式表
		        styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
		        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表
	       
	        	
	        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
	        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
	        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
	        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
	       //tlo.AddConfig("Url", shpUrl); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
	        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
	        tlo.AddConfig("Fields", "Name:String:100:0,modelid:String:100:0,lon:String:100:0,lat:String:100:0,height:String:100:0"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
	        tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
	        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
	        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
	        tlo.AddConfig("LiftUp", "0.5"); ////抬升高度，任意值
	        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
	        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
	        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

        	var shpLayer = map.CreateLayer("FeatureModelLayer", tlo);
        	map.AddLayer(shpLayer);
        	return shpLayer;
		},
		/*添加模型标注*/
		"addModelLabel":function(layer,modelID,Lon,Lat,Height){	
        	var id = layer.GetLayerID(); ////获取图层id
 	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层      
 	       var addFeature = map.CreateFeature();								//创建要素对象								//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)----注:多结构的时候,三维场景会爆机
		    addFeature.SetGeometryType(1);	
	        addFeature.AddPoint(Lon, Lat, Height);
	        addFeature.AddAttribute("modelid", modelID, 5);
	        addFeature.AddAttribute("lon", Lon, 5);
	        addFeature.AddAttribute("lat", Lat, 5);
	        addFeature.AddAttribute("height", Height, 5);
	        var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
			editLayer.AddFeature(addFeature);
		},
		//创建文字标注图层
		"createTextLabelLayer":function(opt){
			this.opt = opt;
			var liftUp = this.opt.liftUp || 0;
			var shpUrl = this.opt.shpUrl || "";
			var fColor = this.opt.fontColor || "1.0, 1.0, 0.0, 1.0";
			var fSize = this.opt.fontSize || 6;
			var bColor = this.opt.backColor || "1.0,0.0,0.0,0.5";
			var lState = this.opt.lineState || "0";

			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
	        pSymbol.AddConfig("Size", "10"); ////点大小，范围0-10
	        pSymbol.AddConfig("Color", "1.0,1.0,0.0,1"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
	        
			var tSymbol = map.CreateSymbol("TextSymbol"); ////创建类型为TextSymbol的符号，必须为TextSymbol字符串
	        tSymbol.AddConfig("FillingColor", fColor); ////文字颜色（RGBA），颜色值0-1，最后一位代表透明度，0为透明，1为不透
	        tSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\msyh.ttf"); ////文字字体，从系统字体目录中取，字体文件必须存在，配置一些参数时，如果没生效可能与字体文件相关，例如中文
	        tSymbol.AddConfig("CharacterSize", String(fSize)); ////文字大小
	        tSymbol.AddConfig("CharacterMode", "1"); ////字符大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值
	        tSymbol.AddConfig("AlignmentMode", "4"); ////设置文字位于要素的位置
	        tSymbol.AddConfig("AxisAlignment", "6"); ////设置文字旋转模式0 - 7 ， 6: 自动
	        tSymbol.AddConfig("RemoveDuplicateLabels", "false"); ////是否移除重复的多重标注
	        tSymbol.AddConfig("IsEmbolden", "true"); ////是否加粗
	        tSymbol.AddConfig("IsTransform", "true"); ////是否斜体
	        tSymbol.AddConfig("IsUnderline", "false"); ////是否加下划线
	        tSymbol.AddConfig("IsBack", "true"); ////是否有背景
	        tSymbol.AddConfig("BackColor", bColor); ////设置文字背景色
	        tSymbol.AddConfig("ImageURL", ""); ////背景图片地址
	        tSymbol.AddConfig("LineColor", "1,1,1,1"); ////接地线颜色
	        tSymbol.AddConfig("IsAddGroundLine",lState); ////是否开启接地线
	        tSymbol.AddConfig("FeatureLiftUp",liftUp); 				//接地线抬升值(配置该项接地线将是文字到点之间，否则是文字、点到地底)
	        tSymbol.AddConfig("Content", "[textname]"); ////[]里代表矢量的某字段名称----这个配置必须有

	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
	          pStyle.AddSymbol("TextSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为TextSymbol字符串
	          pStyle.AddFilterName("BuildTextFilter"); ////设置文字构建器符号为BuildTextFilter，必须为BuildGeometryFilter字符串
	       	  pStyle.SetName("point"); ////设置别名point
	       	  //pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式
	      	  //pStyle.AddFilterName("BuildGeometryFilter"); //设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
	      
	       
	        /////////////////////此部分是文字在场景中显示的配置/////////////////

	        var styleSheet = map.CreateStyleSheet(); ////创建样式表
	         styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
	         
	         var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
		      tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
		      tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
		      tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
		      tlo.AddConfig("Url", shpUrl); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
		      tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
		      tlo.AddConfig("Fields", "Name:String:100:0,textname:String:100:0,lon:String:100:0,lat:String:100:0,height:String:100:0"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
		      tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
		      tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
		      tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
		      tlo.AddConfig("LiftUp", "0"); ////抬升高度，任意值
		      tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
		      tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
		      tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

		      var shpLayer = map.CreateLayer("FeatureModelLayer", tlo);
		      map.AddLayer(shpLayer);
	       	  return shpLayer;
		},
		/*创建文字标注*/
		"addTextLabel":function(layer,name,Lon,Lat,Height){
			
		  	var id = layer.GetLayerID(); ////获取图层id
	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
	        /*创建文字要素*/
        	var addFeature = map.CreateFeature();	//创建要素							//创建要素对象
			addFeature.SetGeometryType(1);	//多结构要素
			addFeature.AddPoint(Lon, Lat, Height);//添加点
			//为文字标注添加属性
			addFeature.AddAttribute("textname", name, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
			addFeature.AddAttribute("lon", Lon, 5);	
	        addFeature.AddAttribute("lat", Lat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("height", Height, 5);	
			var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
			editLayer.AddFeature(addFeature);
			return addFeature;
	        
		},
		//保存标注文件
		"saveLabelFile":function(layer){
			var id = layer.GetLayerID(); ////获取图层id
        	var pointeditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
			pointeditLayer.SaveLayer(); ////编辑面图层保存，一般用于首次创建保存
		},
		//标注拾取后删除
		"deleteLabelByPick":function(layer){
		//layer表示的是一个数组，用来存放不同类型的文字标注
		var lay = "";
  		for(var i = 0;i<layer.length;i++){
		 lay += layer[i].getlayerid() + ",";
		}
 		var la = lay.substring(0, lay.length -1).split(",");
 		for(var j = 0;j<la.length;j++){
        var pointeditLayer = map.GetFeatureModelLayer(la[j]); ////获取矢量图层
		pointeditLayer.DeleteFeature();
 		}
		},
		//通过坐标删除要素
		"deleteLabel":function(layer,lon,lat,height){
		var id = layer.GetLayerID(); ////获取图层id
        var pointeditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
		pointeditLayer.DeleteFeatureByGeoPos(lon,lat,height);	
		},
		//对文字标注进行坐标更新
		"updateTextLabel":function(layer,feature,name,Lon,Lat,Height){
			var id = layer.GetLayerID(); ////获取图层id
	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
	        /*创建文字要素*/
        	var addFeature = map.CreateFeature();	//创建要素							//创建要素对象
			addFeature.SetGeometryType(1);	//多结构要素
			addFeature.AddPoint(Lon, Lat, Height);//添加点
			//为文字标注添加属性
			addFeature.AddAttribute("textname", name, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
			addFeature.AddAttribute("lon", Lon, 5);	
	        addFeature.AddAttribute("lat", Lat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("height", Height, 5);	
			var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 
		    editLayer.UpdateFeatureByNew(feature,addFeature);
		},
		//对文字标注进行拾取更新
		"updateTextLabelByPick":function(picklayer,layer,opt){
			this.opt = opt;
			var content = picklayer.GetResponserResult();//此处的picklayer是创建标注拾取响应器返回的layer
			var oldTextname = content.GetConfigValueByKey("textname");
			var oldLon = content.GetConfigValueByKey("lon");
			var oldLat = content.GetConfigValueByKey("lat");
			var oldHeight = content.GetConfigValueByKey("height");


			var newName = this.opt.Name || oldTextname;
			var newLon = this.opt.Lon || oldLon;
			var newLat = this.opt.Lat || oldLat;
			var newHeight = this.opt.Height || oldHeight;

			var id = layer.GetLayerID(); ////获取图层id
	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
	        /*创建old文字要素*/
        	var oldAddFeature = map.CreateFeature();	//创建要素							//创建要素对象
			editLayer.GetFeatureByPick(oldAddFeature);
			oldAddFeature.SetGeometryType(1);	//多结构要素
			oldAddFeature.AddPoint(oldLon, oldLat, oldHeight);//添加点
			//为文字标注添加属性
			oldAddFeature.AddAttribute("textname", oldTextname, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
			oldAddFeature.AddAttribute("lon", oldLon, 5);	
	        oldAddFeature.AddAttribute("lat", oldLat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	oldAddFeature.AddAttribute("height", oldHeight, 5);	

			/*创建new文字要素*/
        	var newAddFeature = map.CreateFeature();	//创建要素							//创建要素对象
			newAddFeature.SetGeometryType(1);	//多结构要素
			newAddFeature.AddPoint(newLon, newLat ,newHeight);//添加点
			//为文字标注添加属性
			newAddFeature.AddAttribute("textname", newName, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
			newAddFeature.AddAttribute("lon", newLon, 5);	
	        newAddFeature.AddAttribute("lat", newLat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	newAddFeature.AddAttribute("height", newHeight, 5);	
			var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			newAddFeature.SetFeatureId(featureId + 1); 
		    editLayer.UpdateFeatureByNew(oldAddFeature,newAddFeature);
		},
		//创建一个图片文字标注图层
		"createImageLabelLayer":function(opt){
			this.opt = opt;
			var IconUrl = this.opt.iconUrl;
			var liftUp = this.opt.liftUp || 0;
			var ShpUrl = this.opt.shpUrl || "";
			var XScale = this.opt.xScale || 0.5;
			var YScale = this.opt.yScale || 0.5;
			var ZScale = this.opt.zScale || 0.5;
			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
	        pSymbol.AddConfig("Size", "10"); ////点大小，范围0-10
	        pSymbol.AddConfig("Color", "1.0,1.0,0.0,1.0"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
	        var tSymbol = map.CreateSymbol("IconSymbol"); ////创建类型为IconSymbol的符号，必须为IconSymbol字符串
	        tSymbol.AddConfig("Align", "-5"); ////设置图片与要素的相对位置
	        tSymbol.AddConfig("AxisAlignmentType", "0"); ////设置图片旋转模式
	        tSymbol.AddConfig("CharacterMode", "0"); ////图片大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值Scale
	        tSymbol.AddConfig("Scale", "1"); ////图片大小变化上限值
	        tSymbol.AddConfig("XScale", String(XScale)); ////图片x方向放大比例
	        tSymbol.AddConfig("YScale", String(YScale)); ////图片y方向放大比例
	        tSymbol.AddConfig("ZScale", String(ZScale)); ////图片z方向放大比例
	        tSymbol.AddConfig("LineColor", "1,1,1,0"); ////接地线颜色
	        tSymbol.AddConfig("IsAddGroundLine", "0"); ////是否开启接地线
	        tSymbol.AddConfig("FeatureLiftUp", String(liftUp)); 				//接地线抬升值(配置该项接地线将是文字到点之间，否则是文字、点到地底)
	        tSymbol.AddConfig("Url", IconUrl); ////图标资源路径
	        tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

	        var res = map.CreateResource("IconSymbol"); ////创建图标资源，此处必须为IconSymbol
	        res.AddConfig("Uri", IconUrl); ////图标资源路径
	        var reslib = map.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
	        reslib.AddResource(res); ////将资源添加至资源库
	        /////////////////////此部分是图片在场景中显示的配置/////////////////

	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
	        pStyle.SetName("point"); ////设置别名point
	        //pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式，第一参必须为PointSymbol字符串
	        //pStyle.AddFilterName("BuildGeometryFilter"); ////设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
	        pStyle.AddSymbol("IconSymbol", tSymbol.GetConfig()); ////将图片符号配置添加到该样式，第一参必须为IconSymbol字符串
	        pStyle.AddFilterName("SubstituteModelFilter"); ////设置图片构建器符号为SubstituteModelFilter，此为图标符号化和模型符号化共有

	        var styleSheet = map.CreateStyleSheet(); ////创建样式表
	        styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
	        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表
	        
	        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
	        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
	        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
	        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
	        tlo.AddConfig("Url", ShpUrl); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
	        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
	        tlo.AddConfig("Fields", "Name:String:100:0,imageValue:String:100:0,lon:String:100:0,lat:String:100:0,height:String:100:0"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
	        tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
	        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
	        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
	        tlo.AddConfig("LiftUp", "0"); ////抬升高度，任意值
	        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
	        tlo.AddConfig("MinRange", "0"); ////最小显示范围，0-无穷大
	        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
	        
	    	var shpLayer = map.CreateLayer("FeatureModelLayer", tlo);
        	map.AddLayer(shpLayer);
	       	return shpLayer;
		},
		/*创建图片标注*/
		"addImageLabel":function(layer,imageValue,Lon,Lat,Height){
        	var id = layer.GetLayerID(); ////获取图层id
 	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
 	       var addFeature = map.CreateFeature();								//创建要素对象								//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)----注:多结构的时候,三维场景会爆机
		    addFeature.SetGeometryType(1);	
	        addFeature.AddPoint(Lon, Lat, Height);
	        addFeature.AddAttribute("imageValue", imageValue, 5);
	        addFeature.AddAttribute("lon", Lon, 5);	
	        addFeature.AddAttribute("lat", Lat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("height", Height, 5);	
	        var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
			editLayer.AddFeature(addFeature);   
			return addFeature;
	        
		},
		//更新图片标注
		"updateImageLabel":function(layer,feature,imageValue,Lon,Lat,Height){
			var id = layer.GetLayerID(); ////获取图层id
 	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
 	        var addFeature = map.CreateFeature();								//创建要素对象								//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)----注:多结构的时候,三维场景会爆机
		    addFeature.SetGeometryType(1);	
	        addFeature.AddPoint(Lon, Lat, Height);
	        addFeature.AddAttribute("imageValue", imageValue, 5);
	        addFeature.AddAttribute("lon", Lon, 5);	
	        addFeature.AddAttribute("lat", Lat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("height", Height, 5);	
	        var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 
		    editLayer.UpdateFeatureByNew(feature,addFeature);						//设置FeatureID
		   // return feature;
		},
		/*开启标注拾取*/
		"labelPick":function(layer){
		var pOption = map.CreateResponserOptions("123"); 	
		var lay = "";
  		for(var i = 0;i<layer.length;i++){
		 lay += layer[i].getlayerid() + ",";
		}
 		var la = lay.substring(0, lay.length -1);
 		pOption.AddConfig("PickLayerIdList",la);//拾取图层id
        pOption.AddConfig("PickColor", "1.0,0,0,1.0");
        pOption.AddConfig("IsChangeColor", "true");
        pickResp = map.CreateResponser("PickVectorResponser", pOption); //创建矢量拾取响应器，第一参必须为PickVectorResponser字符串
        pickResp.AddObserver();
        map.AddResponser(pickResp); 	
		return pickResp;
		},
		/*标注拾取销毁*/
		"destroyLabelPick":function(layer){
			map.RemoveResponser("PickVectorResponser");
		},
		/*获取标注拾取的属性*/
		"getLabelValue":function(layer){
		    var content = layer.GetResponserResult();//此处的layer是创建标注拾取响应器返回的layer
		    var modelId = content.GetConfigValueByKey("modelid");
		   var imageValue = content.GetConfigValueByKey("imagevalue");	
		   var textName = content.GetConfigValueByKey("textname");	
		   var points = content.GetConfigValueByKey("lon")+","+content.GetConfigValueByKey("lat")+","+content.GetConfigValueByKey("height");				
		   var result = {
		   	modelId:modelId,
		   	imageValue:imageValue,
		   	textName:textName,
		   	points:points
		   }
		   return result;
		},
		/*8.16根据拾取更新标注*/
		"updatePickLabel":function(layer,pickResp){
		 var pOption = map.CreateResponserOptions("123"); 				//创建响应器配置，参数任意名称
		  pOption.AddConfig("PickLayerIdList", layer.GetLayerID());//拾取图层id	
		  pickResp.UpdateResponserOptions(pOption);
		},
		addResForPoint:function(option,type){
			this.option = option;
			var ModelUrl = this.option.modelUrl;//模型路径
			var IconUrl = this.option.iconUrl;//图片路径
			var ShpUrl = this.option.shpUrl || "";//矢量文件的路径
			var State = this.option.state || true;
			var Height = this.option.height || 0;
			var Name = this.option.name || "NAME"

			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
           pSymbol.AddConfig("Size", "1"); ////点大小，范围0-10
           pSymbol.AddConfig("Color", "1.0,1.0,0.0,1.0"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
          if(type=="model"){
		    var tSymbol = map.CreateSymbol("ModelSymbol"); ////创建类型为ModelSymbol的符号，必须为ModelSymbol字符串 
	        tSymbol.AddConfig("Heading", "0"); ////绕Z轴(世界坐标系方向相同 far->near)旋转,从far(-Z)向near(+Z)看去,逆时针为正，弧度表示
	        tSymbol.AddConfig("Pitch", "-0.8"); //////绕Y轴(世界坐标系方向相同 down(-Y)向up(Y))旋转,从down(-Y)向up(+Y)看去,逆时针为正，弧度表示
	        tSymbol.AddConfig("Roll", "0"); ////绕X轴(世界坐标系方向相同 left->right)旋转,从left(-X)向right(+X)看去,逆时针为正，弧度表示

	        tSymbol.AddConfig("XScale", "1"); ////模型x方向放大比例
	        tSymbol.AddConfig("YScale", "1"); ////模型y方向放大比例
	        tSymbol.AddConfig("ZScale", "1"); ////模型z方向放大比例
	        tSymbol.AddConfig("ModelOriginDir", "0,0,1"); ////模型原始轴向
	        tSymbol.AddConfig("Url", ModelUrl); ////模型资源路径
	        tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

	         var res = map.CreateResource("ModelSymbol"); ////创建模型资源，此处必须为ModelSymbol
	        res.AddConfig("Uri", ModelUrl); ////模型资源路径
	        var reslib = map.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
	        reslib.AddResource(res); ////将资源添加至资源库

	         var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
	        pStyle.SetName("point"); ////设置别名point
	        pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式
	        pStyle.AddFilterName("BuildGeometryFilter"); //设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
	        pStyle.AddSymbol("ModelSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为ModelSymbol字符串
	        pStyle.AddFilterName("SubstituteModelFilter"); ////设置构建器符号为SubstituteModelFilter，必须为SubstituteModelFilter字符串，此为图标符号化和模型符号化共有

	        var styleSheet = map.CreateStyleSheet(); ////创建样式表
	        styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
	        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表

		}else if(type == "text"){
			var tSymbol = map.CreateSymbol("TextSymbol"); ////创建类型为TextSymbol的符号，必须为TextSymbol字符串
	        tSymbol.AddConfig("FillingColor", "1.0, 1.0, 0.0, 1.0"); ////文字颜色（RGBA），颜色值0-1，最后一位代表透明度，0为透明，1为不透
	        tSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\msyh.ttf"); ////文字字体，从系统字体目录中取，字体文件必须存在，配置一些参数时，如果没生效可能与字体文件相关，例如中文
	        tSymbol.AddConfig("Size", "15"); ////文字大小
	        tSymbol.AddConfig("CharacterMode", "1"); ////字符大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值
	        tSymbol.AddConfig("AlignmentMode", "4"); ////设置文字位于要素的位置
	        tSymbol.AddConfig("AxisAlignment", "6"); ////设置文字旋转模式0 - 7 ， 6: 自动
	        tSymbol.AddConfig("RemoveDuplicateLabels", "false"); ////是否移除重复的多重标注
	        tSymbol.AddConfig("IsEmbolden", "true"); ////是否加粗
	        tSymbol.AddConfig("IsTransform", "true"); ////是否斜体
	        tSymbol.AddConfig("IsUnderline", "false"); ////是否加下划线
	        tSymbol.AddConfig("IsBack", "false"); ////是否有背景
	        tSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); ////设置文字背景色
	        tSymbol.AddConfig("ImageURL", ""); ////背景图片地址
	        tSymbol.AddConfig("LineColor", "1,1,1,1"); ////接地线颜色
	        tSymbol.AddConfig("IsAddGroundLine", String(State)); ////是否开启接地线
	        tSymbol.AddConfig("FeatureLiftUp", Height); 				//接地线抬升值(配置该项接地线将是文字到点之间，否则是文字、点到地底)
	        tSymbol.AddConfig("Content", "["+Name+"]"); ////[]里代表矢量的某字段名称

	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
	        pStyle.AddSymbol("TextSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为TextSymbol字符串
	        pStyle.AddFilterName("BuildTextFilter"); ////设置文字构建器符号为BuildTextFilter，必须为BuildGeometryFilter字符串
	        /////////////////////此部分是文字在场景中显示的配置/////////////////

	        /////////////////////此部分是点在场景中显示的配置/////////////////
	        pStyle.SetName("point"); ////设置别名point
	        pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将符号配置添加到该样式
	        pStyle.AddFilterName("BuildGeometryFilter");  ////设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
	        /////////////////////此部分是点在场景中显示的配置/////////////////

	        var styleSheet = map.CreateStyleSheet(); ////创建样式表
	         styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
		}else if(type == "icon"){
			var tSymbol = map.CreateSymbol("IconSymbol"); ////创建类型为IconSymbol的符号，必须为IconSymbol字符串
	        tSymbol.AddConfig("Align", "-5"); ////设置图片与要素的相对位置
	        tSymbol.AddConfig("AxisAlignmentType", "0"); ////设置图片旋转模式
	        tSymbol.AddConfig("CharacterMode", "2"); ////图片大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值Scale
	        tSymbol.AddConfig("Scale", "1"); ////图片大小变化上限值
	        tSymbol.AddConfig("XScale", "0.5"); ////图片x方向放大比例
	        tSymbol.AddConfig("YScale", "0.5"); ////图片y方向放大比例
	        tSymbol.AddConfig("ZScale", "0.5"); ////图片z方向放大比例
	        tSymbol.AddConfig("LineColor", "1,1,1,1"); ////接地线颜色
	        tSymbol.AddConfig("IsAddGroundLine", String(State)); ////是否开启接地线
	        tSymbol.AddConfig("FeatureLiftUp", Height);
	        tSymbol.AddConfig("Url", IconUrl); ////图标资源路径
	        tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

	        var res = map.CreateResource("IconSymbol"); ////创建图标资源，此处必须为IconSymbol
	        res.AddConfig("Uri", IconUrl); ////图标资源路径
	        var reslib = map.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
	        reslib.AddResource(res); ////将资源添加至资源库
	        /////////////////////此部分是图片在场景中显示的配置/////////////////

	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
	        pStyle.SetName("point"); ////设置别名point
	        pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式，第一参必须为PointSymbol字符串
	        pStyle.AddFilterName("BuildGeometryFilter"); ////设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
	        pStyle.AddSymbol("IconSymbol", tSymbol.GetConfig()); ////将图片符号配置添加到该样式，第一参必须为IconSymbol字符串
	        pStyle.AddFilterName("SubstituteModelFilter"); ////设置图片构建器符号为SubstituteModelFilter，此为图标符号化和模型符号化共有

	        var styleSheet = map.CreateStyleSheet(); ////创建样式表
	        styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
	        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表*/
			}
       
	        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
	        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
	        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
	        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
	        tlo.AddConfig("Url", ShpUrl); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
	        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
	        tlo.AddConfig("Fields", "Name:String:100:0,Height:Double:100:3,Width:Float:100:3"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
	        tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
	        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
	        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
	        tlo.AddConfig("LiftUp", "0"); ////抬升高度，任意值
	        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
	        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
	        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
	        var resForPointLayer = map.CreateLayer("FeatureModelLayer", tlo);
			map.AddLayer(resForPointLayer);
			return resForPointLayer;
		},
		"addGraphics":function(type){  
	       var mlo3 = map.CreateLayerOptions("draw2dcircle");
	        mlo3.AddConfig("LayerOptionsName", "AnalysisLayerOptions");///2D对象绘制必须设置为Draw2DObjectOptions
	        mlo3.AddConfig("DataSourceTypeName", "as_draw2dobject");
		    mlo3.AddConfig("IsImmediateMode", "true");
		    mlo3.AddConfig("PointColor", "1, 0.8, 0.6,0.6");//点的颜色
		    mlo3.AddConfig("PointSize", "0");//点的大小
		    mlo3.AddConfig("DrawLineColor", "1,0.2,0,1");//绘制图形外边框颜色
		    mlo3.AddConfig("DrawFaceColor", "1,0.8,0.8,0.6");//绘制图形填充的颜色
		    mlo3.AddConfig("LiftUp", "0.1");//抬高高度
		    mlo3.AddConfig("VisiableLine", "true");//是否显示外边框
		    mlo3.AddConfig("VisiableFace", "true");//是否显示填充面
		    mlo3.AddConfig("SplitPointNum", "40");
		    mlo3.AddConfig("DrawType", String(type));//绘制矩形
		
		    var Draw2DObjectLayer = map.CreateLayer("AnalysisLayer", mlo3);
		    Draw2DObjectLayer.AddObserver();
		    map.AddLayer(Draw2DObjectLayer);	    
		    return Draw2DObjectLayer;
		},
		"createDynamicPath":function(opt){
			this.opt = opt;
			var ModelUrl = this.opt.modelUrl || "";
			var ViewObject = this.opt.viewObject || "0.0,-0.338920733233321,100.0";
			var CoordStr = this.opt.coordStr || "";
			var PathWidth = this.opt.pathWidth || "2.0";
			var PathColor = this.opt.pathColor || "0.0,1.0,0.0,1.0";
			var Speed = this.opt.speed || 5.0;
			var tlo = map.CreateLayerOptions("dynamicpathlayer");
		    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions"); /////动态路径配置信息 必须为DynamicPathLayerOptions
		    tlo.AddConfig("Url", ModelUrl);
		   //	tlo.AddConfig("InterpLineWidth", "4.0");     ///差值线 线宽
	    	//tlo.AddConfig("InterpLineStipple", "65535");
		    //tlo.AddConfig("InterpLineColor", "0.0,1.0,1.0,1");
		    tlo.AddConfig("PlayerMode", "PLAYER_ONEWAY");//播放模式 有一次性播放"PLAYER_ONEWAY" 循环一次播放"PLAYER_ONEWAY_LOOP" 往返播放"PLAYER_ROUND_LOOP"
		    tlo.AddConfig("ViewObjectMode", ViewObject);//视角对象;视角对象的格式为"1.57,-0.708,100",第一个为视角方位角,第二个为视角俯仰角，第三个为视点到关键点距离
		    tlo.AddConfig("KeyPoints",CoordStr);
		    tlo.AddConfig("LineWidth",PathWidth);
		    tlo.AddConfig("LineStipple","65535");
		    tlo.AddConfig("LineColor", PathColor);
		    tlo.AddConfig("Velocity", String(Speed));
		    var dynamicPathLayer = map.CreateLayer("DynamicPathLayer", tlo);
		    map.AddLayer(dynamicPathLayer);
		    return dynamicPathLayer;
		},
		"operateDynamicPath":function(layer,opt){
			this.opt = opt;
			var type = this.opt.type;
			var PlayState = this.opt.playState;
			var FollowState = this.opt.followState || false;
			var Speed = this.opt.speed || 5.0;
			if(layer == null || layer == undefined){
				return;
			}
			var tlo = map.CreateLayerOptions("dynamicpathlayer");
		    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
		    switch(type){
		    	case "move": tlo.AddConfig("PlayerState", PlayState);//播放类型（播放--PLAYER_PLAY   暂停---PLAYER_PAUSE    停止---PLAYER_STOP）
		    	tlo.AddConfig("NodeActive", "true");
		    	break;
		    	case "follow":tlo.AddConfig("NodeActive", String(FollowState));//是否跟随
		    	break;
		    	case "speed": tlo.AddConfig("Velocity", String(Speed));
		    	break;
		    }
		     layer.UpdateLayerOptions(tlo);

		},
		"operateDynamicPathold":function(layer,opt){
			this.opt = opt;
			var PlayState = this.opt.playState;
			var FollowState = this.opt.followState || "false";
			if(layer == null || layer == undefined){
				return;
			}
			var tlo = map.CreateLayerOptions("dynamicpathlayer");
		    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
		    tlo.AddConfig("PlayerState", PlayState);//播放类型（播放--PLAYER_PLAY   暂停---PLAYER_PAUSE    停止---PLAYER_STOP）
		    tlo.AddConfig("NodeActive", FollowState);//是否跟随
		    layer.UpdateLayerOptions(tlo);
		},
		"controlDynamicSpeed":function(layer,speed){
			if(layer == null || layer == undefined){
				return;
			}
			var tlo = map.CreateLayerOptions("dynamicpathlayer");
		    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
		    tlo.AddConfig("Velocity", speed);
		    layer.UpdateLayerOptions(tlo);
		},
		"addDynamicFollow":function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			 var tlo = map.CreateLayerOptions("dynamicpathlayer");
			    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
			    tlo.AddConfig("NodeActive", "true");
			    layer.UpdateLayerOptions(tlo);
		},
		"cancelDynamicFollow":function(layer){
			if(layer == null || layer == undefined){
				return;
			}
			 var tlo = map.CreateLayerOptions("dynamicpathlayer");
			    tlo.AddConfig("LayerOptionsName", "DynamicPathLayerOptions");
			    tlo.AddConfig("NodeActive", "false");
			    layer.UpdateLayerOptions(tlo);
		},
		/**
		 * 图层组显隐控制部分
		 */
		"createLayerGroup":function(modelUrl){
			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
	        pSymbol.AddConfig("Size", "10"); ////点大小，范围0-10
	        pSymbol.AddConfig("Color", "1.0,1.0,0.0,1.0"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透

	        var tSymbol = map.CreateSymbol("ModelSymbol"); ////创建类型为ModelSymbol的符号，必须为ModelSymbol字符串 
	        tSymbol.AddConfig("Heading", "0"); ////绕Z轴(世界坐标系方向相同 far->near)旋转,从far(-Z)向near(+Z)看去,逆时针为正，弧度表示
	        tSymbol.AddConfig("Pitch", "0"); //////绕Y轴(世界坐标系方向相同 down(-Y)向up(Y))旋转,从down(-Y)向up(+Y)看去,逆时针为正，弧度表示
	        tSymbol.AddConfig("Roll", "0"); ////绕X轴(世界坐标系方向相同 left->right)旋转,从left(-X)向right(+X)看去,逆时针为正，弧度表示

	        tSymbol.AddConfig("XScale", "1"); ////模型x方向放大比例
	        tSymbol.AddConfig("YScale", "1"); ////模型y方向放大比例
	        tSymbol.AddConfig("ZScale", "1"); ////模型z方向放大比例
	        tSymbol.AddConfig("ModelOriginDir", "0,0,1"); ////模型原始轴向
	        tSymbol.AddConfig("Url", modelUrl); ////模型资源路径
	        tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

	        var res = map.CreateResource("ModelSymbol"); ////创建模型资源，此处必须为ModelSymbol
	        res.AddConfig("Uri", modelUrl); ////模型资源路径
	        var reslib = map.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
	        reslib.AddResource(res); ////将资源添加至资源库

	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
	        pStyle.SetName("point"); ////设置别名point
	        pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式
	        pStyle.AddFilterName("BuildGeometryFilter"); //设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
	        pStyle.AddSymbol("ModelSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为ModelSymbol字符串
	        pStyle.AddFilterName("SubstituteModelFilter"); ////设置构建器符号为SubstituteModelFilter，必须为SubstituteModelFilter字符串，此为图标符号化和模型符号化共有

	        var styleSheet = map.CreateStyleSheet(); ////创建样式表
	        styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
	        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表

	        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
	        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
	        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
	        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
	        tlo.AddConfig("Url", "C:\\test.shp"); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
	        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
	        tlo.AddConfig("Fields", "Name:String:100:0,Height:Double:100:3,Width:Float:100:3"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
	        tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
	        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
	        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
	        tlo.AddConfig("LiftUp", "0.5"); ////抬升高度，任意值
	        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
	        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
	        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
			var shpLayer = map.CreateLayer("FeatureModelLayer", tlo);       	
			return shpLayer;
		},
		"addGroupLayer":function(layer,name){
			 var layerGroup = map.AddLayerGroup(name);//创建管理图层的图层组对象
			layerGroup.AddLayer(layer);	
			return layerGroup;
		},
		"showGroupLayer":function(layer){
			layer.SetVisible(true);
		},
		"hideGroupLayer":function(layer){
			layer.SetVisible(false);
		},
		/*截图*/
		"imageCut":function(savePath,imageName,imageMultiple){
            if(imageCutIndex>1){
				map.RemoveResponser("SceneshotResponser");
            }
			setTimeout(function(){
				var resp = map.CreateResponserOptions("SceneshotResponser");
	            resp.AddConfig("FilePath", savePath);/////截图保存目录
	            resp.AddConfig("FileName", imageName); /////截图保存名称
	            resp.AddConfig("bIsOrtho", "false"); /////是否正交投影
	            resp.AddConfig("bUseCache", "false"); /////是否保存缓存
	            resp.AddConfig("ImageMultiple",imageMultiple ); /////截图倍数
	            resp.AddConfig("JoinMultiple", imageMultiple); /////拼接倍数
	            //resp.AddConfig("ImageWidth", "1024");/////图片宽度，不设及默认自动获取屏幕大小
	            //resp.AddConfig("ImageHeight", "768");/////图片高度，不设及默认自动获取屏幕大小
	            resp.AddConfig("LodScale", "1.0"); /////模型加载衰减
	            var resSceneShot = map.CreateResponser("SceneshotResponser", resp);
	            map.AddResponser(resSceneShot);   
			},100); 
            imageCutIndex ++;
		},
		/*关闭截图响应器*/
		"RemoveResImagecut":function(){
			map.RemoveResponser("SceneshotResponser");
		},
		/*添加网页弹出框*/
		"showWegdit":function(opt){
			this.opt = opt;
			var positions = this.opt.position || "0.0,0.0,0.0";
			var width = this.opt.width || 300;
			var height = this.opt.height || 300;
			var url = this.opt.url;
			var pOption = map.CreateResponserOptions("123");
			pOption.AddConfig("Longitude", positions.split(",")[0]);
			pOption.AddConfig("Latitude", positions.split(",")[1]);
			pOption.AddConfig("PosHeight", positions.split(",")[2]);
			pOption.AddConfig("Widget", width);
			pOption.AddConfig("Height", height);
			pOption.AddConfig("Url", url);
			pOption.AddConfig("MoveDelay", "60");
			var webResp  = map.CreateResponser("TipsDialogResponser", pOption);
			map.AddResponser(webResp);
			return webResp;
		},
		/*销毁网页弹出框*/
		"hideWegdit":function(){
			map.RemoveResponser("TipsDialogResponser");	
		},
		/*加载道路WFS服务*/
		"loadWFS":function(wfsUrl,layeName,fieldName){
			if(fieldName == ""){
            fieldName = "name";
			}
			 var lSymbol = map.CreateSymbol("LineSymbol");
			    lSymbol.AddConfig("Stipple", "-1");//-1 线 1 虚线
		        lSymbol.AddConfig("Width", "3");//
		        lSymbol.AddConfig("Color", "1.0,0.0,0.0,1");
				
				var tSymbol = map.CreateSymbol("TextSymbol"); ////创建类型为TextSymbol的符号，必须为TextSymbol字符串
			        tSymbol.AddConfig("FillingColor", "1.0, 1.0, 0.0, 1.0"); ////文字颜色（RGBA），颜色值0-1，最后一位代表透明度，0为透明，1为不透
			        tSymbol.AddConfig("Font", "C:\\Windows\\Fonts\\STSONG.TTF"); ////文字字体，从系统字体目录中取，字体文件必须存在，配置一些参数时，如果没生效可能与字体文件相关，例如中文
			        //tSymbol.AddConfig("Size", "8"); ////文字大小-----旧版本SDK支持
			        tSymbol.AddConfig("CharacterSize", "6"); ////文字大小----新版本SDK支持
			        tSymbol.AddConfig("CharacterMode", "1"); ////字符大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值
			        tSymbol.AddConfig("AlignmentMode", "4"); ////设置文字位于要素的位置
			        tSymbol.AddConfig("AxisAlignment", "6"); ////设置文字旋转模式0 - 7 ， 6: 自动
			        tSymbol.AddConfig("RemoveDuplicateLabels", "false"); ////是否移除重复的多重标注
			        tSymbol.AddConfig("IsEmbolden", "true"); ////是否加粗
			        tSymbol.AddConfig("IsTransform", "true"); ////是否斜体
			        tSymbol.AddConfig("IsUnderline", "false"); ////是否加下划线
			        tSymbol.AddConfig("IsBack", "false"); ////是否有背景
			        tSymbol.AddConfig("BackColor", "0,1.0,1.0,1"); ////设置文字背景色
			        tSymbol.AddConfig("ImageURL", ""); ////背景图片地址
			        tSymbol.AddConfig("LineColor", "1,1,1,1"); ////接地线颜色
			        tSymbol.AddConfig("IsAddGroundLine", "0"); ////是否开启接地线
			        tSymbol.AddConfig("Content", "["+fieldName+"]"); ////[]里代表矢量的某字段名称

			        var lStyle = map.CreateStyle("Line"); ////创建名称为Point的样式，名称任意
			        lStyle.AddSymbol("TextSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为TextSymbol字符串
			        lStyle.AddFilterName("BuildTextFilter"); ////设置文字构建器符号为BuildTextFilter，必须为BuildGeometryFilter字符串
			        /////////////////////此部分是文字在场景中显示的配置/////////////////

			        /////////////////////此部分是点在场景中显示的配置/////////////////
			        lStyle.SetName("Line"); ////设置别名point
			        lStyle.AddSymbol("LineSymbol", lSymbol.GetConfig()); ////将符号配置添加到该样式
			        lStyle.AddFilterName("BuildGeometryFilter");  ////设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
			        /////////////////////此部分是点在场景中显示的配置/////////////////

				
				
		        var tlo = map.CreateLayerOptions("wfs"); ////创建图层配置对象，名称任意
		        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
		        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对

		        //////////////////////////////////////此部分有别于OGR数据源///////////////////////////////////////////////////
		        tlo.AddConfig("Url", wfsUrl); ////数据存放位置，此为网络路径，在浏览器中查看，
		        tlo.AddConfig("FeatureSourceType", "wfs"); ////要素数据源类型，针对wfs数据源wfs
		        tlo.AddConfig("LayerName", layeName); ////wfs图层名称，可通过图层信息获取接口获得到
		        //////////////////////////////////////此部分有别于OGR数据源///////////////////////////////////////////////////
				
		   
				
		        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
		        tlo.AddConfig("TileSize", "50000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
		        tlo.AddConfig("LiftUp", "5"); ////抬升高度，任意值
		        //tlo.AddConfig("MaxRange", "100000"); ////最大显示范围，大于最小显示范围-无穷大
		        //tlo.AddConfig("MinRange", "1000"); ////最小显示范围，0-无穷大
				tlo.AddConfig("MaxRange", "1000000"); ////最大显示范围，大于最小显示范围-无穷大
		        tlo.AddConfig("MinRange", "0"); ////最小显示范围，0-无穷大



			    var styleSheet = map.CreateStyleSheet(); ////创建样式表
		        styleSheet.AddStyle(lStyle.GetConfig()); ////将样式配置添加至样式表
		        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串
				
		        var wfshpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
		        map.AddLayer(wfshpLayer); ////添加矢量图层
		       // wfshpLayer.Locate(); ////模型图层定位*/
		        return wfshpLayer;
		},
		/*加载WMS服务*/
		"loadWMS":function(url,layerName,rectangle,version,srs){

 			var tlo = map.CreateLayerOptions("wms"); 	// 创建wms图层，给配置起个名称，任意名称
            tlo.AddConfig("LayerOptionsName", "ImageLayerOptions"); // 创建配置类型, ImageLayerOptions代表影像数据配置，必须是此键值对
            tlo.AddConfig("DataSourceTypeName", "wms"); // 数据源类型,代表WMS插件，必须是此键值对
            tlo.AddConfig("Driver", "terrainquadtree"); // 代表地形驱动，必须是此键值对
            tlo.AddConfig("Transparent", "true"); //设置请求的数据透明通道是否透明
            tlo.AddConfig("TileSize", "256"); /////数据的瓦片大小，建议设置大小为256
            tlo.AddConfig("MinLevel", "0"); /////数据显示的最小层级
            tlo.AddConfig("MaxLevel", "19"); /////数据显示的最大层级

            //////////////以下部分可以通过图层信息获取获得相应的配置////////////
			tlo.AddConfig("Url", url); /////要加载的数据服务路径
            tlo.AddConfig("LayerName",layerName); /////图层名称
            tlo.AddConfig("Style", "default"); /////样式
            tlo.AddConfig("ImageFormat", "image/png"); /////Image的格式
            tlo.AddConfig("WmsVersion", version); /////WMS服务版本号
            tlo.AddConfig("Srs", srs); /////数据的坐标参考

            //////此部分可以不配置，数据照样可以加载，但图层定位会有问题///////
            tlo.AddConfig("MaxX", rectangle[2]); /////数据的范围X向最大值
            tlo.AddConfig("MinX", rectangle[0]); /////数据的范围X向最小值
            tlo.AddConfig("MaxY", rectangle[3]); ////数据的范围Y向最大值
            tlo.AddConfig("MinY", rectangle[1]); /////数据的范围Y向最小值

           var wmslayer = map.CreateLayer("ImageLayer", tlo); ////创建WMS图层，第一项参数必须为ImageLayer
            map.AddLayer(wmslayer); ///添加WMS图层
            //wmslayer.Locate(); ////WMS图层定位
            return wmslayer;
		},
		"videoPlay":function(videoSource,Points){
			//var Points = "120.2163206250898,30.21108905740757,15.72113596089184;120.2164263470019,30.21093101099925,5.075216918252409;";
			  var mlo = map.CreateLayerOptions("Video"); //服务器上存放模型数据的文件夹名称

		        mlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); // 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
		        mlo.AddConfig("DataSourceTypeName", "as_videoprj");
		        mlo.AddConfig("CameraCountMax", "1");
		        mlo.AddConfig("HAngles", "50;"); //视域水平方向夹角
		   //     mlo.AddConfig("Scales", "1.738;"); //视域水平比例;
		        mlo.AddConfig("Scales", "1.238;"); //视域水平比例;
			    mlo.AddConfig("VideoResources", videoSource);
		        mlo.AddConfig("IsLoad", "true");
		        mlo.AddConfig("Points", Points);

		        var videoLayer = map.CreateLayer("AnalysisLayer", mlo);
		        map.AddLayer(videoLayer);
		        return videoLayer;
		},
		"loadOSGB":function(basePath,url,srcOrigin){
			 var tlo = map.CreateLayerOptions("osgbs"); 	// 创建osgbs图层配置，给配置起个名称，任意名称
	            tlo.AddConfig("LayerOptionsName", "ModelLayerOptions"); // 创建配置类型, ModelLayerOptions代表模型数据配置，必须是此键值对
	            tlo.AddConfig("DataSourceTypeName", "smeshs"); // 数据源类型,代表SMESHS插件，必须是此键值对
				tlo.AddConfig("Compress", "true"); 
				

	            //////////////以下部分可以通过图层信息获取获得相应的配置////////////
	            tlo.AddConfig("Url", basePath+"/"+url); /////要加载的数据路径
	            tlo.AddConfig("Srs", "PROJCS[\"Transverse_Mercator\",GEOGCS[\"Geographic Coordinate System\",DATUM[\"WGS84\",SPHEROID[\"WGS84\",6378137,298.257223560493]],PRIMEM[\"Greenwich\",0],UNIT[\"degree\",0.0174532925199433]],PROJECTION[\"Transverse_Mercator\"],PARAMETER[\"scale_factor\",1],PARAMETER[\"central_meridian\",120],PARAMETER[\"latitude_of_origin\",0],PARAMETER[\"false_easting\",500000],PARAMETER[\"false_northing\",0],UNIT[\"Meter\",1]]"); /////数据的坐标参考
	            tlo.AddConfig("OriginPoint", srcOrigin); /////数据的坐标偏移值
	            tlo.AddConfig("BasePath", basePath); /////层级数据的路径，最后面没有斜线
	            var osgsblayer = map.CreateLayer("ModelLayer", tlo); ////创建倾斜摄影图层，第一项参数必须为ModelLayer
	            map.AddLayer(osgsblayer); ///添加倾斜摄影图层
	            osgsblayer.Locate(); ////倾斜摄影图层定位
	            return osgsblayer;
		},
		/*获取播放路径关键点*/
		"CalcBuffer":function(pos,keyPos){
			if(keyPos == undefined){
				return;
			}
			var buffer = 5;
			var mPos = pos.split(',');
			var tmp = keyPos.substring(0, keyPos.length - 1);
			var mKeyPos = tmp.split(',');
			var dis = (mPos[0] * 1 - mKeyPos[0] * 1) * (mPos[0] * 1 - mKeyPos[0] * 1)
					+ (mPos[1] * 1 - mKeyPos[1]) * (mPos[1] * 1 - mKeyPos[1])
					+ (mPos[2] * 1 - mKeyPos[2]) * (mPos[2] * 1 - mKeyPos[2]);
			if(dis < buffer * buffer)
				return true;
			return false;
		},
		/*添加罗盘响应器*/
		"addCompass":function(){
			var resp = map.CreateResponserOptions("UICompassResponser");
            resp.AddConfig("Visible", "true");/////设置罗盘响应器显隐状态。特别注意，罗盘响应器因为内部的关系，已经默认创建，外部需要通过更新配置接口设置显隐状态，而不是通过添加的方式
            var resCompass = map.CreateResponser("UICompassResponser", resp); /////创建罗盘响应器，必须为UICompassResponser
            resCompass.UpdateResponserOptions(resp); /////更新罗盘响应器配置，这里必须这么处理
            return resp;
		},
		"deleteCompass":function(resp){
		resp.AddConfig("Visible", "false");
		var resCompass = map.CreateResponser("UICompassResponser", resp); /////创建罗盘响应器，必须为UICompassResponser
        resCompass.UpdateResponserOptions(resp); /////更新罗盘响应器配置，这里必须这么处理
		},
		//动态模型
		"createModelLayer":function(shpUrl,modelUrl){
			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
	        pSymbol.AddConfig("Size", "1"); ////点大小，范围0-10
	        pSymbol.AddConfig("Color", "1.0,1.0,0.0,0"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透
	       
	        var tSymbol = map.CreateSymbol("ModelSymbol"); ////创建类型为ModelSymbol的符号，必须为ModelSymbol字符串 
	 	    tSymbol.AddConfig("Heading", "0");  	//绕Z轴(世界坐标系方向相同 far->near)旋转,从far(-Z)向near(+Z)看去,逆时针为正，弧度表示
        	tSymbol.AddConfig("Pitch", "[Pitch]");  //绕Y轴(世界坐标系方向相同 down(-Y)向up(Y))旋转,从down(-Y)向up(+Y)看去,逆时针为正，弧度表示
        	tSymbol.AddConfig("Roll", "0"); 		//绕X轴(世界坐标系方向相同 left->right)旋转,从left(-X)向right(+X)看去,逆时针为正，弧度表示

        	tSymbol.AddConfig("XScale", "[XScale]"); 		//模型x方向放大比例
        	tSymbol.AddConfig("YScale", "[YScale]"); 		//模型y方向放大比例
        	tSymbol.AddConfig("ZScale", "[ZScale]"); 		//模型z方向放大比例
	 	    tSymbol.AddConfig("ModelOriginDir", "0,0,1"); ////模型原始轴向
	 	    tSymbol.AddConfig("Url", modelUrl); ////模型资源路径
	 	    tSymbol.AddConfig("LibraryName", "reslib"); ////资源名称

	 	    var res = map.CreateResource("ModelSymbol"); ////创建模型资源，此处必须为ModelSymbol
	 	    res.AddConfig("Uri", modelUrl); ////模型资源路径
	 	    var reslib = map.CreateResourceLibrary("reslib"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
	 	        reslib.AddResource(res); ////将资源添加至资源库
	 	        var pStyle = map.CreateStyle("Point"); ////创建名称为Point的样式，名称任意
		        pStyle.SetName("point"); ////设置别名point
		        pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); ////将点符号配置添加到该样式
		        pStyle.AddFilterName("BuildGeometryFilter"); //设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
		        pStyle.AddSymbol("ModelSymbol", tSymbol.GetConfig()); ////将符号配置添加到该样式，第一参必须为ModelSymbol字符串
		        pStyle.AddFilterName("SubstituteModelFilter"); ////设置构建器符号为SubstituteModelFilter，必须为SubstituteModelFilter字符串，此为图标符号化和模型符号化共有

		        var styleSheet = map.CreateStyleSheet(); ////创建样式表
		        styleSheet.AddStyle(pStyle.GetConfig()); ////将样式配置添加至样式表
		        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表
	       
	        	
	        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
	        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
	        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
	        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
	        tlo.AddConfig("Url", shpUrl); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
	        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
	        tlo.AddConfig("Fields", "Name:String:100:0,XScale:Float:100:4,YScale:Float:100:4,ZScale:Float:100:4,Pitch:Float:100:4,lon:String:100:0,lat:String:100:0,height:String:100:0"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
	        tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
	      	tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
        	tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
        	tlo.AddConfig("LiftUp", "0"); ////抬升高度，任意值
       	 	tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
        	tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
	        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

        	var shpLayer = map.CreateLayer("FeatureModelLayer", tlo);
        	map.AddLayer(shpLayer);
        	var id = shpLayer.GetLayerID(); ////获取图层id
 	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
       		return shpLayer;
		},
		"addModel":function(layer,opt){
			this.opt = opt;
			var modelID = this.opt.modelName || "default";
			var xScale = this.opt.xScale || 1;
			var yScale = this.opt.yScale || 1;
			var zScale = this.opt.zScale || 1;
			var pitch = this.opt.pitch || 0;
			var Lon = this.opt.lon;
			var Lat = this.opt.lat;
			var Height = this.opt.height;

			var id = layer.GetLayerID(); ////获取图层id
 	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
 	        
 	       var addFeature = map.CreateFeature();								//创建要素对象								//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)----注:多结构的时候,三维场景会爆机
		    addFeature.SetGeometryType(1);	
	        addFeature.AddPoint(Lon, Lat, Height);
	        addFeature.AddAttribute("Name", modelID, 5);	
	        addFeature.AddAttribute("XScale", xScale, 3);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("YScale", yScale, 3);					//添加属性值
		    addFeature.AddAttribute("ZScale", zScale, 3);					//添加属性值
		    addFeature.AddAttribute("Pitch", pitch, 3);				//添加属性值
		    addFeature.AddAttribute("lon", Lon, 5);	
	        addFeature.AddAttribute("lat", Lat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("height", Height, 5);	
	        var featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
			editLayer.AddFeature(addFeature);
			return addFeature;
		},
		"createModelPick":function(layer,PickColor){
			PickColor = PickColor || "1.0,0.0,0.0,1.0";
			var lay = "";
  			for(var i = 0;i<layer.length;i++){

  				 lay += layer[i].getlayerid() + ",";

  				}
 			var la = lay.substring(0, lay.length -1);
		var pOption = map.CreateResponserOptions("123"); 				//创建响应器配置，参数任意名称
        pOption.AddConfig("PickLayerIdList", la);//拾取图层id
        pOption.AddConfig("PickColor", PickColor);
        pOption.AddConfig("IsChangeColor", "true");
        var pickResp = map.CreateResponser("PickVectorResponser", pOption); //创建矢量拾取响应器，第一参必须为PickVectorResponser字符串
        pickResp.AddObserver();
        map.AddResponser(pickResp); 
        return pickResp;
		},
		"destroyModelPick":function(layer){
			//map.RemoveLayer(layer);
		 map.RemoveResponser("PickVectorResponser");
		},
		"getModelValue":function(layer){
			 var content = layer.GetResponserResult();//此处的layer是创建标注拾取响应器返回的layer
		    var modelId = content.GetConfigValueByKey("name");//获取模型的id信息（人为自定义）
		    var points = content.GetConfigValueByKey("lon")+","+content.GetConfigValueByKey("lat")+","+content.GetConfigValueByKey("height");//获取模型的id信息（人为自定义）
		   var result = {
		   	modelId:modelId,
		   	points:points	  
		   }
		   return result;
		},
		//模型拾取后删除
		"deleteMByPick":function(layer){
		var lay = "";
  		for(var i = 0;i<layer.length;i++){
		 lay += layer[i].getlayerid() + ",";
		}
 		var la = lay.substring(0, lay.length -1).split(",");
 		for(var j = 0;j<la.length;j++){
        var pointeditLayer = map.GetFeatureModelLayer(la[j]); ////获取矢量图层
		pointeditLayer.DeleteFeature();
 		}
		},
		//通过坐标删除要素
		"deleteModel":function(layer,lon,lat,height){
		var id = layer.GetLayerID(); ////获取图层id
        var pointeditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
		pointeditLayer.DeleteFeatureByGeoPos(lon,lat,height);	
		},
		//更新模型
		"updateModel":function(layer,feature,opt){
			this.opt = opt;
			var modelID = this.opt.modelName || "default";
			var xScale = this.opt.xScale || 1;
			var yScale = this.opt.yScale || 1;
			var zScale = this.opt.zScale || 1;
			var pitch = this.opt.pitch || 0;
			var Lon = this.opt.lon;
			var Lat = this.opt.lat;
			var Height = this.opt.height;

			
			var id = layer.GetLayerID(); ////获取图层id
 	        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
 	        
 	        var addFeature = map.CreateFeature();								//创建要素对象								//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)----注:多结构的时候,三维场景会爆机
		    addFeature.SetGeometryType(1);	
	        addFeature.AddPoint(Lon, Lat, Height);
	        addFeature.AddAttribute("Name", modelID, 5);	
	        addFeature.AddAttribute("XScale", xScale, 3);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("YScale", yScale, 3);					//添加属性值
		    addFeature.AddAttribute("ZScale", zScale, 3);					//添加属性值
		    addFeature.AddAttribute("Pitch", pitch, 3);				//添加属性值
		    addFeature.AddAttribute("lon", Lon, 5);	
	        addFeature.AddAttribute("lat", Lat, 5);					//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
		   	addFeature.AddAttribute("height", Height, 5);	
			var featureId = editLayer.GetMaxFeatureID();			//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 					//设置FeatureID
			editLayer.UpdateFeatureByNew(feature, addFeature);
			//return addFeature;
		},
		//通过坐标对模型标注进行高亮显示
		"heightModel":function(layer,lon,lat,height,PickColor){
			PickColor = PickColor || "0.0,1.0,0.0,1.0";
  			var tlo = map.CreateOperationOptions("123"); //创建配置类型,操作类型的配置
			tlo.AddConfig("OptionsTypeName", "FeatureIntersectOption");
            tlo.AddConfig("Operation", "GetFeature");
			tlo.AddConfig("FaultTolerant", "1");			// 是否启用容差模式
			tlo.AddConfig("FaultTolerantValue", "1");		// 容差大小
			tlo.AddConfig("PickColor", PickColor);
			tlo.AddConfig("Lon", lon);
			tlo.AddConfig("Lat", lat);
			tlo.AddConfig("Height", height);
			tlo.AddConfig("HightLight", "1");
			tlo.AddConfig("LayersID", layer.GetLayerID());
			var operateHeightPtr = map.CreateOperation("FeatureIntersectOperation", tlo); //根据配置创建模型调整操作
			operateHeightPtr.AddObserver();
            map.AddOperation(operateHeightPtr);
            heightObj[lon+","+lat+","+height] = operateHeightPtr;
		},
		//清除根据坐标高亮
		"clearHeightModel":function(lon,lat,height){
 		map.RemoveOperation(heightObj[lon+","+lat+","+height]);
		},
		//模型保存
		"saveModelFile":function(layer){
			var id = layer.GetLayerID(); ////获取图层id
        	var pointeditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
			pointeditLayer.SaveLayer(); ////编辑面图层保存，一般用于首次创建保存
		},
		/*已知坐标拉体块*/
		"createBlocklayer":function(Extrusion,color){
			////////墙体颜色配置
        var wallpolygonSymbol = map.CreateSymbol("PolygonSymbol"); ////创建类型为PolygonSymbol的符号，必须为PolygonSymbol字符串
        wallpolygonSymbol.AddConfig("Color", color); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透

        ////////屋顶颜色配置
        var roofpolygonSymbol = map.CreateSymbol("PolygonSymbol"); ////创建类型为PolygonSymbol的符号，必须为PolygonSymbol字符串
        roofpolygonSymbol.AddConfig("Color", color); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透

        var extruSymbol = map.CreateSymbol("PolygonExtrusionSymbol"); ////创建类型为PolygonExtrusionSymbol的符号,为面挤出符号，必须为PolygonExtrusionSymbol字符串
        extruSymbol.AddConfig("HeightExpression", String(Extrusion)); ////挤出面的高度，可以直接传值，也可以[]中设置相应的属性字段，会根据属性字段进行拉伸高度

        /////创建墙体样式，并添加墙体面符号
        var pwallStyle = map.CreateStyle("WallPolygonStyle"); ////创建名称为"WallPolygonStyle的样式，名称任意
        pwallStyle.AddSymbol("PolygonSymbol", wallpolygonSymbol.GetConfig()); ////将Wall面符号配置添加到该样式，第一参必须为PolygonSymbol字符串

        /////创建屋顶样式，并添加屋顶面符号
        var proofStyle = map.CreateStyle("RoofPolygonStyle"); ////创建名称为"RoofPolygonStyle的样式，名称任意
        proofStyle.AddSymbol("PolygonSymbol",roofpolygonSymbol.GetConfig()); ////将Roof面符号配置添加到该样式，第一参必须为PolygonSymbol字符串

        extruSymbol.AddConfig("WallStyleName", "WallPolygonStyle"); ////拉伸体块墙体颜色，通过此关键字WallStyleName关联墙体面符号，第二参必须与墙体面符号所在样式名称一致
        extruSymbol.AddConfig("RoofStyleName", "RoofPolygonStyle"); ////拉伸体块屋顶颜色，通过此关键字RoofStyleName关联屋顶面符号，第二参必须与屋顶面符号所在样式名称一致

        var eStyle = map.CreateStyle("ExtruStyle"); ////创建名称为ExtruStyle的样式，名称任意
        eStyle.AddSymbol("PolygonExtrusionSymbol", extruSymbol.GetConfig()); ////将面挤出符号配置添加到该样式，第一参必须为PolygonExtrusionSymbol字符串
        eStyle.AddFilterName("ExtrudeGeometryFilter"); ////设置挤出构建器符号为ExtrudeGeometryFilter，必须为ExtrudeGeometryFilter字符串

       var styleSheet = map.CreateStyleSheet(); ////创建样式表
        styleSheet.AddStyle(pwallStyle.GetConfig()); ////将墙体样式配置添加至样式表
        styleSheet.AddStyle(proofStyle.GetConfig()); ////将屋顶样式配置添加至样式表
        styleSheet.AddStyle(eStyle.GetConfig()); ////将挤出面样式配置添加至样式表

        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象，名称任意
        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
        tlo.AddConfig("Url", "C:\\test.shp"); ////数据存放位置，注意双斜杠
        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
        tlo.AddConfig("LiftUp", "0.0"); ////抬升高度，任意值
        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
		tlo.AddConfig("BuildSpatialIndex","true");
        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

        var exshpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
        map.AddLayer(exshpLayer); ////添加矢量图层
	 	return exshpLayer;
       
		},
		"addBlock":function(layer,arr){
		var id = layer.GetLayerID(); ////获取图层id
        var polygoneditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层

        var addFeature = map.CreateFeature();								//创建要素对象
		addFeature.SetGeometryType(4);									//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)

		
		for(var i = 0;i<arr.length;i++){
		addFeature.AddPoint(arr[i].split(",")[0],arr[i].split(",")[1],arr[i].split(",")[2]);////向编辑图层添加坐标点信息
		}
		var featureId = polygoneditLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
		addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
		polygoneditLayer.AddFeature(addFeature);
		},
		"deleteBlock":function(layer,arr){				
		var id = layer.GetLayerID(); ////获取图层id
        var polygoneditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
		polygoneditLayer.DeleteFeatureByGeoPos(arr[0].split(",")[0],arr[0].split(",")[1],arr[0].split(",")[2]);		
		},
		/*手动添加坐标拉体块*/
		"createBlock_old":function(url,Extrusion){
////////墙体颜色配置
        var wallpolygonSymbol = map.CreateSymbol("PolygonSymbol"); ////创建类型为PolygonSymbol的符号，必须为PolygonSymbol字符串
        wallpolygonSymbol.AddConfig("Color", "1.0, 0.0, 0.0, 1"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透

        ////////屋顶颜色配置
        var roofpolygonSymbol = map.CreateSymbol("PolygonSymbol"); ////创建类型为PolygonSymbol的符号，必须为PolygonSymbol字符串
        roofpolygonSymbol.AddConfig("Color", "1.0, 0.0, 0.0, 1"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透

        var extruSymbol = map.CreateSymbol("PolygonExtrusionSymbol"); ////创建类型为PolygonExtrusionSymbol的符号,为面挤出符号，必须为PolygonExtrusionSymbol字符串
        extruSymbol.AddConfig("HeightExpression", "50"); ////挤出面的高度，可以直接传值，也可以[]中设置相应的属性字段，会根据属性字段进行拉伸高度

        /////创建墙体样式，并添加墙体面符号
        var pwallStyle = map.CreateStyle("WallPolygonStyle"); ////创建名称为"WallPolygonStyle的样式，名称任意
        pwallStyle.AddSymbol("PolygonSymbol", wallpolygonSymbol.GetConfig()); ////将Wall面符号配置添加到该样式，第一参必须为PolygonSymbol字符串

        /////创建屋顶样式，并添加屋顶面符号
        var proofStyle = map.CreateStyle("RoofPolygonStyle"); ////创建名称为"RoofPolygonStyle的样式，名称任意
        proofStyle.AddSymbol("PolygonSymbol",roofpolygonSymbol.GetConfig()); ////将Roof面符号配置添加到该样式，第一参必须为PolygonSymbol字符串

        extruSymbol.AddConfig("WallStyleName", "WallPolygonStyle"); ////拉伸体块墙体颜色，通过此关键字WallStyleName关联墙体面符号，第二参必须与墙体面符号所在样式名称一致
        extruSymbol.AddConfig("RoofStyleName", "RoofPolygonStyle"); ////拉伸体块屋顶颜色，通过此关键字RoofStyleName关联屋顶面符号，第二参必须与屋顶面符号所在样式名称一致

        var eStyle = map.CreateStyle("ExtruStyle"); ////创建名称为ExtruStyle的样式，名称任意
        eStyle.AddSymbol("PolygonExtrusionSymbol", extruSymbol.GetConfig()); ////将面挤出符号配置添加到该样式，第一参必须为PolygonExtrusionSymbol字符串
        eStyle.AddFilterName("ExtrudeGeometryFilter"); ////设置挤出构建器符号为ExtrudeGeometryFilter，必须为ExtrudeGeometryFilter字符串

       var styleSheet = map.CreateStyleSheet(); ////创建样式表
        styleSheet.AddStyle(pwallStyle.GetConfig()); ////将墙体样式配置添加至样式表
        styleSheet.AddStyle(proofStyle.GetConfig()); ////将屋顶样式配置添加至样式表
        styleSheet.AddStyle(eStyle.GetConfig()); ////将挤出面样式配置添加至样式表

        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象，名称任意
        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
        tlo.AddConfig("Url", url); ////数据存放位置，注意双斜杠
        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
        tlo.AddConfig("LiftUp", "0.0"); ////抬升高度，任意值
        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
		tlo.AddConfig("BuildSpatialIndex","true");
        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

        var exshpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
        map.AddLayer(exshpLayer); ////添加矢量图层

        var id = exshpLayer.GetLayerID(); ////获取图层id
        var polygoneditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层


        var addFeature = map.CreateFeature();								//创建要素对象
		addFeature.SetGeometryType(4);									//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)


		/*鼠标绘制多边形并触发事件然后保存坐标*/
			var mlo3 = map.CreateLayerOptions("draw2dcircle");
	        mlo3.AddConfig("LayerOptionsName", "AnalysisLayerOptions");///2D对象绘制必须设置为Draw2DObjectOptions
	        mlo3.AddConfig("DataSourceTypeName", "as_draw2dobject");
		    mlo3.AddConfig("IsImmediateMode", "true");
		    mlo3.AddConfig("PointColor", "1, 0.8, 0.6,0.6");//点的颜色
		    mlo3.AddConfig("PointSize", "0");//点的大小
		    mlo3.AddConfig("DrawLineColor", "1,0.2,0,1");//绘制图形外边框颜色
		    mlo3.AddConfig("DrawFaceColor", "1,0.8,0.8,0.6");//绘制图形填充的颜色
		    mlo3.AddConfig("LiftUp", "0");//抬高高度
		    mlo3.AddConfig("VisiableLine", "true");//是否显示外边框
		    mlo3.AddConfig("VisiableFace", "true");//是否显示填充面
		    mlo3.AddConfig("SplitPointNum", "40");
		    mlo3.AddConfig("DrawType", "2");//绘制矩形
			
		    var Draw2DObjectLayer = map.CreateLayer("AnalysisLayer", mlo3);
		    Draw2DObjectLayer.AddObserver();
		    map.AddLayer(Draw2DObjectLayer);


		     var layermap = new Array();
		    layermap[Draw2DObjectLayer.GetLayerID()] = Draw2DObjectLayer;
		    content3d.attachEvent("FireOnLayerNotify", function(layerid,type){ 	
			var layer = layermap[layerid];
			    var opt = layer.GetLayerResult();
			        if(opt.GetConfigValueByKey("DataSourceTypeName") == "as_draw2dobject")
			        {
			          var points = opt.GetConfigValueByKey("Points");
			          alert(points);
			          map.RemoveLayer(Draw2DObjectLayer);

			           var tt = points.substring(0,points.length-1).split(";");
		
		for(var i = 0;i<tt.length;i++){
		//alert(tt[i].split(",")[0]+","+tt[i].split(",")[1]+","+tt[i].split(",")[2]);
		//addFeature.AddPoint(tt[i].split(",")[0],tt[i].split(",")[1],tt[i].split(",")[2]);////向编辑图层添加坐标点信息
		addFeature.AddPoint(tt[i].split(",")[0],tt[i].split(",")[1],tt[i].split(",")[2]);////向编辑图层添加坐标点信息
		}
		var featureId = polygoneditLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
		addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
		polygoneditLayer.AddFeature(addFeature);
     
			      }
		    });

  return polygoneditLayer;
		},
		//体块保存
		"saveBlock":function(layer){
			layer.SaveLayer();
		},
		//体块拾取
		"blockPick":function(layer){
		var pOption = map.CreateResponserOptions("123"); 				//创建响应器配置，参数任意名称
        pOption.AddConfig("PickLayerIdList", layer.GetLayerID());//拾取图层id
        pOption.AddConfig("PickColor", "1.0,0,0,1.0");
        pOption.AddConfig("IsChangeColor", "true");
        var pickResp = map.CreateResponser("PickVectorResponser", pOption); //创建矢量拾取响应器，第一参必须为PickVectorResponser字符串
        pickResp.AddObserver();
        map.AddResponser(pickResp); 
        return pickResp;
		},
		//取消体块拾取
		"cancelBlockPick":function(){
			 map.RemoveResponser("PickVectorResponser");
			},
			//创建一个气泡图层
		"createTipLayer":function(){
			var SDKpath = content3d.GetSDKPath();
			var path = SDKpath.substring(0, SDKpath.length - 4).replace(/\\/g, "\\\\");
			var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
        pSymbol.AddConfig("Size", "10"); ////点大小，范围0-10
        pSymbol.AddConfig("Color", "1.0,1.0,0.0,0.0"); ////颜色值0-1（RGBA），最后一位代表透明度，0为透明，1为不透

        /////////////////////此部分是文字在场景中显示的配置/////////////////
        var tSymbol = map.CreateSymbol("TextSymbol"); ////创建类型为TextSymbol的符号，必须为TextSymbol字符串
        tSymbol.AddConfig("FillingColor", "0.17, 0.15, 0.15, 1.0"); ////文字颜色（RGBA），颜色值0-1，最后一位代表透明度，0为透明，1为不透
        tSymbol.AddConfig("Font", "C:\\WINDOWS\\Fonts\\msyh.ttf"); ////文字字体，从系统字体目录中取，字体文件必须存在，配置一些参数时，如果没生效可能与字体文件相关，例如中文
        tSymbol.AddConfig("Size", "40"); ////字体精度大小
        tSymbol.AddConfig("CharacterSize", "3"); ////文字大小
        tSymbol.AddConfig("CharacterMode", "0"); ////字符大小变化模式，0：随对象变化显示，1:随相机远近变化，2：随相机远近变化，同时不超过上限值
        tSymbol.AddConfig("AlignmentMode", "4"); ////设置文字位于要素的位置
        tSymbol.AddConfig("AxisAlignment", "6"); ////设置文字旋转模式0 - 7 ， 6: 自动
        tSymbol.AddConfig("RemoveDuplicateLabels", "false"); ////是否移除重复的多重标注
        tSymbol.AddConfig("IsEmbolden", "false"); ////是否加粗
        tSymbol.AddConfig("IsTransform", "false"); ////是否斜体
        tSymbol.AddConfig("IsUnderline", "false"); ////是否加下划线
        tSymbol.AddConfig("IsBack", "true"); ////是否有背景
        //tSymbol.AddConfig("BackColor", "0.88,0.87,0.76,1"); ////设置文字背景色
        tSymbol.AddConfig("LineColor", "1.0,1.0,1.0,0"); ////接地线颜色
        tSymbol.AddConfig("IsAddGroundLine", "1"); ////是否开启接地线
        tSymbol.AddConfig("Content", "[Name]"); ////[]里代表矢量的某字段名称

        //***********如果需要配置背景图片，则需要添加图片资源库*********/
        tSymbol.AddConfig("ImageURL", path+"data\\\\image\\\\4.png"); //背景图片地址
        tSymbol.AddConfig("LibraryName", "Library"); 			//设置资源库名称
        tSymbol.AddConfig("BackdropMarginLeft", "6.0"); 		//背景边框左边大小
        tSymbol.AddConfig("BackdropMarginRight", "8.0"); 		//背景边框右边大小
        tSymbol.AddConfig("BackdropMarginUp", "6.0"); 			//背景边框上边大小
        tSymbol.AddConfig("BackdropMarginDown", "8.0"); 		//背景边框下边大小

		//*图片资源库配置信息*/
				
		var res = map.CreateResource("TextSymbol"); ////创建图标资源，此处必须为TextSymbol
        res.AddConfig("Uri", path+"data\\\\image\\\\4.png"); ////图标资源路径
        var reslib = map.CreateResourceLibrary("Library"); ////创建资源库，名称和图层配置LibraryName设置的名称对应
        reslib.AddResource(res); ////将资源添加至资源库
		
        var pStyle = map.CreateStyle("Point"); 					//创建名称为Point的样式，名称任意
        pStyle.AddSymbol("TextSymbol", tSymbol.GetConfig()); 	//将符号配置添加到该样式，第一参必须为TextSymbol字符串
        pStyle.AddFilterName("BuildTextFilter"); 				//设置文字构建器符号为BuildTextFilter，必须为BuildGeometryFilter字符串
        /////////////////////此部分是文字在场景中显示的配置/////////////////

        /////////////////////此部分是点在场景中显示的配置/////////////////
        pStyle.SetName("point"); 								//设置别名point
        pStyle.AddSymbol("PointSymbol", pSymbol.GetConfig()); 	//将符号配置添加到该样式
        pStyle.AddFilterName("BuildGeometryFilter");  			//设置构建器符号为BuildGeometryFilter，必须为BuildGeometryFilter字符串
        /////////////////////此部分是点在场景中显示的配置/////////////////

        var styleSheet = map.CreateStyleSheet(); 				//创建样式表
        styleSheet.AddStyle(pStyle.GetConfig()); 				//将样式配置添加至样式表
        styleSheet.AddResLib(reslib.GetConfig()); ////将资源库添加至样式表

        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象
        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
        tlo.AddConfig("Ddfriver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
        //tlo.AddConfig("Url", "F:\\zhumh\\testPoint.shp"); ////初次创建需选择没有数据的目录，其在保存后会自动生成。当前设置的路径为不存在
        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
        tlo.AddConfig("Fields", "Name:String:100:0,Height:Double:100:3,Width:Float:100:3"); ////创建矢量的属性字段，属性名：属性类型：类型长度：小数点后几位
        tlo.AddConfig("GeometryType", "Point"); ////几何类型     Point为点 Polyline为线 Polygon为面 此项配置不能少或字符串一定不能错误，否则保存文件不成功
        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
        tlo.AddConfig("LiftUp", "50"); ////抬升高度，任意值
        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

        var shpLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
        map.AddLayer(shpLayer); ////添加矢量图层
        return shpLayer;
			},
		//添加气泡
		"tip":function(layer,lon,lat,height,name){
			
        var id = layer.GetLayerID(); ////获取图层id
        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层

        var addFeature = map.CreateFeature();								//创建要素对象
			addFeature.SetGeometryType(1);									//设置要素几何类型(1:点; 2:线; 3:环; 4:面; 5:多结构)
		
			addFeature.AddPoint(lon,lat,height);////向编辑图层添加坐标点信息
			addFeature.AddAttribute("Name", name, 5);			//添加属性值
			var featureId = editLayer.GetMaxFeatureID();		//获取矢量图层要素最大ID
			addFeature.SetFeatureId(featureId + 1); 				//设置FeatureID
			editLayer.AddFeature(addFeature);
		
		},
		"clearTip":function(layer,lon,lat,height){
		var id = layer.GetLayerID(); ////获取图层id
        var polygoneditLayer = map.GetFeatureModelLayer(id); ////获取矢量图层
		polygoneditLayer.DeleteFeatureByGeoPos(lon,lat,height);	
		},
		/*漫游模式
		   ///设置自定义漫游模式
            ///参数1：开启状态
            ///参数2：漫游高度，>=0 ,取0为默认设置为当前高度
            ///参数3：漫游速度，基准值为1.0，类似步行速度。可根据实际情况增加或减小
            ///参数4：漫游俯仰角度，范围-89到-1之间*/
    "createRoamMode":function(type){
		 var navagation = map.CreateRoam();
		 switch(type){
			 case "OnWalk": navagation.SetCustomGlideRoamMode(true, 10, 1, -10);
			 openStart(ttState,0.1);
			 break;
			 case "OnDrive": navagation.SetCustomGlideRoamMode(true, 10, 15, -10);
			 openStart(ttState,1);
			 break;
			 case "OnFly": navagation.SetCustomGlideRoamMode(true, 200, 50, -45);
			 break;	
		}
    },
    "destroyRoamMode":function(){
      var navagation = map.CreateRoam();
      navagation.SetCustomGlideRoamMode(false, 0, 0, 0);///关闭自定义漫游
    },  
    
    //加载网络C3S格式数据
    "loadC3S":function(url){
    	var tlo = map.CreateLayerOptions("c3s"); // 创建cpm图层配置，给配置起个名称，任意名称 
     tlo.AddConfig("LayerOptionsName", "ModelLayerOptions"); // 创建配置类型, ModelLayerOptions代表模型数据配置，必须是此键值对
     tlo.AddConfig("DataSourceTypeName", "c3ss"); // 数据源类型,代表CPM插件，必须是此键值对 
	 tlo.AddConfig("Compress", 1);
     tlo.AddConfig("Url", url); 
            
    var c3sLayer = map.CreateLayer("ModelLayer", tlo); ////创建模型图层，第一项参数必须为ModelLayer 
    map.AddLayer(c3sLayer); ///添加模型图层
    return c3sLayer;
  
    },
    //全屏
    "fullScreen":function(){
	    content3d.SetFullScreenState(true);
	    var resp = map.CreateResponserOptions("UIFullScreenResponser");
	    var resFullbtn = map.CreateResponser("UIFullScreenResponser", resp); /////创建全屏按钮响应器，必须为UIFullScreenResponser
	    map.AddResponser(resFullbtn);
	    return resp;
    },
    //热力图
    "hotMapLayer":function(result){
    	var styleSheet = map.CreateStyleSheet(); ////创建样式表
        for (var i = 0; i < result.length; i++)/////result 存储了很多不同颜色值（RGBA（0-255）），如 var result = new Array(new Array("A33", "120,15,15,70"),new Array("A5", "120,15,15,70"),new Array("B1", "120,15,15,70");
        {
            var tSymbol = map.CreateSymbol("PointExtrusionSymbol"); ////创建类型为ModelSymbol的符号，必须为ModelSymbol字符串
			tSymbol.AddConfig("ExtrudeType", "0"); ////挤出类型，0-圆 1-方
			tSymbol.AddConfig("Radius", "[Radius]"); //////半径，单位m
			tSymbol.AddConfig("DrawMode", "2"); ////绘制模式，0-正面；1-反面；2-双面
			/////获取不同值的颜色////
            var a1 = new Array(4);
            a1 = result[i][1].split(",");
            var str = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + "," + a1[3];
            /////获取不同值的颜色////
			tSymbol.AddConfig("SurfaceColor", str); ////显示颜色
			tSymbol.AddConfig("SplitPointNum", "64"); ////构成圆定点数

            

            var pSymbol = map.CreateSymbol("PointSymbol"); ////创建类型为PointSymbol的符号，必须为PointSymbol字符串
			pSymbol.AddConfig("Size", "5"); ////点大小，范围0-10
			pSymbol.AddConfig("Color", "1.0,1.0,0.0,0.0"); ////颜色值（RGBA）0-1，最后一位代表透明度，0为透明，1为不透

            var tmpStyle = map.CreateStyle(result[i][0]); ///创建名称为result[i][0]的样式
            tmpStyle.AddSymbol("PointExtrusionSymbol", tSymbol.GetConfig()); ////将面挤出符号配置添加到该样式，第一参必须为PolygonExtrusionSymbol字符串
            tmpStyle.AddFilterName("ExtrudeGeometryFilter"); ///设置挤出构建器符号为ExtrudeGeometryFilter，必须为ExtrudeGeometryFilter字符串
            styleSheet.AddStyle(tmpStyle.GetConfig()); ////将挤出面样式配置添加至样式表
            styleSheet.AddStyleSelector(result[i][0]); /////添加样式选择器，其名称必须与创建名称为result[i][0]的样式的名称一致,专题配置必须有此项
        }
        styleSheet.SetStrExpression("[C]"); /////专题配置的字段,以此字段中不同的值创建样式，也就是result[i][0]的值就是此字段中不同的值

        var tlo = map.CreateLayerOptions("shp"); ////创建图层配置对象，名称任意
        tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions"); ////创建配置类型, FeatureModelLayerOptions代表矢量数据配置，必须是此键值对
        tlo.AddConfig("DataSourceTypeName", "fmgeom"); ////数据源类型,代表fmgeom插件，必须是此键值对
        tlo.AddConfig("Driver", "ESRI Shapefile"); ////数据驱动，针对shp、dxf数据源必须是ESRI Shapefile
		tlo.AddConfig("Fields", "Name:String:100:0,Radius:Double:100:3,C:String:100:0");
        tlo.AddConfig("Url", ""); ////数据存放位置，注意双斜杠
        tlo.AddConfig("FeatureSourceType", "ogr"); ////要素数据源类型，针对shp、dxf数据源必须是ogr
        tlo.AddConfig("TileSizeFactor", "1.0"); ////瓦片大小的影响因子，建议是1.0
        tlo.AddConfig("TileSize", "5000"); ////瓦片大小，根据数据实际情况设置，根据数据面积来，面积越大值越大
        tlo.AddConfig("LiftUp", "0"); ////抬升高度，任意值
        tlo.AddConfig("MaxRange", "1000000.0"); ////最大显示范围，大于最小显示范围-无穷大
        tlo.AddConfig("MinRange", "0.0"); ////最小显示范围，0-无穷大
        tlo.AddConfig("StyleSheet", styleSheet.GetConfig()); ////将样式表配置添加至图层配置对象，第一参必须为StyleSheet字符串

        var themePointLayer = map.CreateLayer("FeatureModelLayer", tlo); ////创建矢量图层，第一项参数必须为FeatureModelLayer
        map.AddLayer(themePointLayer); ////添加矢量图层
        return themePointLayer;
    },
    "addHotPoint":function(layer,opt){
    	this.opt = opt;
        var Lon = this.opt.lon;
		var Lat = this.opt.lat;
		var Height = this.opt.height;
		var r = this.opt.radius || 0.0;
		var color = this.opt.color;
    	var id = layer.GetLayerID(); ////获取图层id
        var editLayer = map.GetFeatureModelLayer(id); ////获取矢量图层	
        var addFeature = map.CreateFeature();								//创建要素对象
		addFeature.SetGeometryType(1);	
		addFeature.AddPoint(Lon,Lat,Height);
	    addFeature.AddAttribute("Radius", r, 4);							//添加属性值(1:int; 2:long; 3:float; 4:double; 5:string; 6:bool)
	    addFeature.AddAttribute("C", color, 5);	
		featureId = editLayer.GetMaxFeatureID();					//获取矢量图层要素最大ID
		addFeature.SetFeatureId(featureId + 1); 						//设置FeatureID
		editLayer.AddFeature(addFeature);		
    },
    //开启模型拾取高亮显示
		"pickLineOpen":function (layer){
			var resp = map.CreateResponserOptions("123"); 
			resp.AddConfig("PickLayerIdList", layer.GetLayerID()); 
			resp.AddConfig("PickColor", "1.0,1.0,0.0,0.8"); 
			resp.AddConfig("IsChangeColor", "true"); 
			var res = map.CreateResponser("PickModelResponser", resp);
			res.AddObserver();
			map.AddResponser(res); 
			return res;
		},
		//关闭模型拾取高亮显示
		"pickLineClose":function (){
			map.RemoveResponser("PickModelResponser");
		},
		//根据坐标对LOD模型进行高亮显示
		"modelHighlight":function(lon,lat,height){
			var tlo = map.CreateOperationOptions("ModelOptions");
			tlo.AddConfig("OptionsTypeName","ModelOptions");
			tlo.AddConfig("LayersID","-1");
			tlo.AddConfig("Operation","Create");
			tlo.AddConfig("PickColor","1,0,0,1.0");
			tlo.AddConfig("LonCoord",lon);
			tlo.AddConfig("LatCoord",lat);
			tlo.AddConfig("HCoord",height);
			var operationPtr = map.CreateOperation("ModelOperation",tlo);
			map.AddOperation(operationPtr);
			return operationPtr;

		},
		//取消根据坐标进行高亮显示
		"removeHighlight":function(Operation){
			map.RemoveOperation(Operation);
		},
		//添加字幕
		"AddResCaption":function(opt){
			this.opt = opt;
			var Deriction = this.opt.deriction || "up"
			var Content = this.opt.content || "";
			var TextScale = this.opt.textScale || 1;
			var PlaySpeed = this.opt.playSpeed || 2;
			var PlayTimes = this.opt.playTimes || 1;
			var TextColor = this.opt.textColor || "1,0,0";
			var StartPosition = this.opt.startPosition;
			var PlayLength = this.opt.playLength || 200
			var resp = map.CreateResponserOptions("UICaptionResponser");
			resp.AddConfig("Deriction", Deriction);/////字幕运动方向：left,right,up,down
			resp.AddConfig("Content", Content); /////字幕内容
			resp.AddConfig("TextFont", "C:\\WINDOWS\\Fonts\\msyh.TTF"); /////字体路径
			resp.AddConfig("TextScale", String(TextScale)); /////文字放大比例：0<scale<100
			resp.AddConfig("PlaySpeed", String(PlaySpeed)); /////字幕播放速度 像素/帧
			resp.AddConfig("PlayTimes", String(PlayTimes)); /////字幕播放次数 次
			resp.AddConfig("PlayLength", String(PlayLength)); /////字幕播放长度 像素
			resp.AddConfig("StartPosition", StartPosition+",0"); /////字幕播放起始位置 屏幕坐标
			resp.AddConfig("TextColor", TextColor); /////文字颜色
			resp.AddConfig("PlayState", "true"); /////播放状态
			var resCaption = map.CreateResponser("UICaptionResponser", resp); /////创建字幕响应器，必须为UICaptionResponser
			map.AddResponser(resCaption);
			return resCaption;
		},
		"clearCaption":function(){
			 map.RemoveResponser("UICaptionResponser"); /////移除字幕响应器，必须为UICaptionResponser
		},
		"addEvent":function(name, func){
			if(content3d.attachEvent)
		{ content3d.attachEvent(name, func); }
		else if(content3d.addEventListener)
		{ content3d.addEventListener(name, func, false); }
		else { alert("failed to attach event"); }
	},
	"delEvent":function(name, func)
	{
		if(content3d.detachEvent)
		{ content3d.detachEvent(name, func); }
		else if(content3d.removeEventListener)
		{ content3d.removeEventListener(name, func, false); }
		else { alert("failed to remove event"); }
	},
	/*视频投影---区域投影/映射投影*/
	/*创建视频投影图层*/
	"addVideoAreaMap":function(){
		var tlo = map.CreateLayerOptions("vArea"); 					// 创建分析图层配置，给配置起个名称，任意名称
		tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); 	// 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
		tlo.AddConfig( "DataSourceTypeName", "as_videoarea" ); 		// 此处格式固定，使用区域投影插件
		var videoArea = map.CreateLayer("AnalysisLayer", tlo); 			// 创建分析图层，第一项参数必须为AnalysisLayer
		videoArea.AddObserver();
		map.AddLayer(videoArea); 	
		return videoArea;
	},
	/*开启视频投影*/
	"createVideoArea":function(layer,id,Url){
		var tlo = map.CreateLayerOptions("vArea"); 					// 创建分析图层配置，给配置起个名称，任意名称
			tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); 	// 创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
			tlo.AddConfig( "DataSourceTypeName", "as_videoarea" ); 		// 此处格式固定，使用区域投影插件
			
			tlo.AddConfig( "IsCreateSingleArea", "true");				// 是否需要创建区域
			tlo.AddConfig( "IsDelete", "false");						// 是否删除
			tlo.AddConfig( "IsAllOperator", "false" );					// 是否批量操作

			tlo.AddConfig( "LineColor", "0.3, 0.3, 0.4, 1.0" );			// 线框颜色rgba
			tlo.AddConfig( "LineWidth", "5.0" );						// 线框宽
			tlo.AddConfig("ID", String(id)); 						    // 所创建区域ID			
			tlo.AddConfig( "VideoResources", Url); // 视频路径	
			layer.UpdateLayerOptions(tlo);		
	},
	"operateVideoAre":function(layer,opt){
		this.opt = opt;
		var id = this.opt.id;
		var type= this.opt.type;
		var state = this.opt.state;
		var tlo = map.CreateLayerOptions("vArea"); 					//  创建分析图层配置，给配置起个名称，任意名称
		tlo.AddConfig("LayerOptionsName", "AnalysisLayerOptions"); 	//  创建配置类型, AnalysisLayerOptions代表分析图层数据配置，必须是此键值对
		tlo.AddConfig( "DataSourceTypeName", "as_videoarea" ); 		//  此处格式固定，使用区域投影插件	
		
		tlo.AddConfig( "ID", String(id));
		switch(type){
		case "isVisible":tlo.AddConfig( "ImageIsVisible", String(state)); //单个图层显隐
		break;
		case "del":tlo.AddConfig( "IsDelete", "true"); 
		break;
		case "moveRight":
			tlo.AddConfig( "MoveType", "1" );							// 是否移动及移动方式, 不添加默认不移动
			tlo.AddConfig( "MoveDistance", "0.0000001, 0.0, 0.0" );		// 移动(经纬度、高程), 不添加默认不移动
		break;
		case "moveLeft":
			tlo.AddConfig( "MoveType", "1" );							// 是否移动及移动方式, 不添加默认不移动
			tlo.AddConfig( "MoveDistance", "-0.0000001, 0.0, 0.0" );		// 移动(经纬度、高程), 不添加默认不移动
		break;
		case "moveUp":
			tlo.AddConfig( "MoveType", "1" );							// 是否移动及移动方式, 不添加默认不移动
			tlo.AddConfig( "MoveDistance", "0.0, 0.0000001, 0.0" );		// 移动(经纬度、高程), 不添加默认不移动
		break;
		case "moveDown":
			tlo.AddConfig( "MoveType", "1" );							// 是否移动及移动方式, 不添加默认不移动
			tlo.AddConfig( "MoveDistance", "0.0, -0.0000001, 0.0" );		// 移动(经纬度、高程), 不添加默认不移动
		break;
		case "liftUp":
			tlo.AddConfig( "MoveType", "1" );							// 是否移动及移动方式, 不添加默认不移动
			tlo.AddConfig( "MoveDistance", "0.0, 0.0, 0.050" );		// 移动(经纬度、高程), 不添加默认不移动
		break;
		case "liftDown":
			tlo.AddConfig( "MoveType", "1" );							// 是否移动及移动方式, 不添加默认不移动
			tlo.AddConfig( "MoveDistance", "0.0, 0.0, -0.050" );		// 移动(经纬度、高程), 不添加默认不移动
		break;
		}	               
		layer.UpdateLayerOptions(tlo);		
	},
	/*雾效*/
	"setFog":function(opt){
            this.opt = opt;
            var FogStatus = this.opt.fogStatus; //雾霾开启状态，true开启，false关闭
            var FogColor = this.opt.fogColor; //雾霾颜色
			alert(FogStatus);
            var FogDensity = this.opt.fogDensity; //雾霾浓度
            if(FogStatus != "" && FogStatus != undefined){
                map.SetParame("FogEnable", FogStatus);
				alert(1);
            }
            if(FogColor != "" && FogColor != undefined){
              map.SetParame("FogColor", FogColor);
			  alert(2);
            }
            if(FogDensity != "" && FogDensity != undefined){
                map.SetParame("FogDensity", FogDensity);
				alert(3);
            }
        },
		/*烟火特效*/
        "createFire":function(opt){
            this.opt = opt;
            var ScreenX = this.opt.screenX;
            var ScreenY = this.opt.screenY;
            var mSize = 1;
            var longlatPos = translate.ScreenPosToWorldPos(ScreenX, ScreenY);                                                                      // 将屏幕坐标点转换成经纬度坐标
            var worldPos = translate.ConvertLongLatHeightToXYZ(longlatPos);                                                                                    // 经纬度转场景坐标
            var DirectPos = translate.ConvertLongLatHeightToXYZ(map.CreatePosition(longlatPos.GetX(), longlatPos.GetY(), 0));        // 取投影坐标
            var DirectVec = map3D.normalize(DirectPos.GetX(), DirectPos.GetY(), DirectPos.GetZ());                                                    // 计算投影坐标单位向量
            var RecordPos = map3D.record(worldPos.GetX(), worldPos.GetY(), worldPos.GetZ());                                                              // 配置区域
            var ZoneXYZPos = translate.ConvertLongLatHeightToXYZ(map.CreatePosition(longlatPos.GetX(), longlatPos.GetY(), 20));    // 取投影坐标
            var ZonePos = map.CreatePosition(ZoneXYZPos.GetX() - worldPos.GetX(), ZoneXYZPos.GetY() - worldPos.GetY(), 
                ZoneXYZPos.GetZ() - worldPos.GetZ());
            var dataPath = content3d.GetSDKPath().substring(0, 43) + "data";
      var scale = mSize / 1.4;
      if (Math.abs(scale - 0.0) < 1.0e-6){
          scale = 1.0;
      }
            ////// 火焰效果粒子组
      //// 创建粒子渲染类型
      var mFireRenderer = map.CreateParticleRender();                                                                              // 建粒子渲染类型
      mFireRenderer.AddConfig("RenderType", "ParticleQuadRender");                                                     // 创建四边形粒子渲染类型
      mFireRenderer.AddConfig("XScale", 0.3 * scale);                                                                                // X轴缩放比例
      mFireRenderer.AddConfig("YScale", 0.3 * scale);                                                                                // Y轴缩放比例
      mFireRenderer.AddConfig("TextureEnable", "true");                                                                            // 是否启用纹理
      mFireRenderer.AddConfig("AtlasDimensionX", "2");                                                                            // 纹理切割x向切割数
      mFireRenderer.AddConfig("AtlasDimensionY", "2");                                                                            // 纹理切割y向切割数
            //// 建立粒子模板
      var mFireModel = map.CreateParticleModel();                                                                                      // 创建粒子模板
      mFireModel.AddConfig("RedParam", "3;0.8,0.9,0.8,0.9");                                                                // 红色参数
      mFireModel.AddConfig("GreenParam", "3;0.5,0.6,0.5,0.6");                                                            // 绿色参数
      mFireModel.AddConfig("BlueParam", "0;0.3");                                                                                      // 蓝色参数
      mFireModel.AddConfig("AlphaParam", "1;0.4,0.0");                                                                            // 透明参数
            mFireModel.AddConfig("SizeParam", "4;;0.5,2.0,5.0|1.0,0.0");                                                 // 粒子大小
      mFireModel.AddConfig("AngleParam", "3;0.0,6.28,0.0,6.28");                                                        // 角度参数
      mFireModel.AddConfig("TextureIndexParam", "2;0,4.0");                                                                    // 纹理参数
      mFireModel.AddConfig("MinLifeTime", 1);                                                                                            // 最小生命周期
      mFireModel.AddConfig("MaxLifeTime", 1.5);                                                                                        // 最大生命周期
            //// 设置粒子区域对象
      var zone1 = map.CreateParticleZone();                                                                                                                            // 创建粒子区域
      zone1.AddConfig("ZoneType", "SphereZone");                                                                                                                    // 创建区域类型
      zone1.AddConfig("Position", (0 * DirectVec.GetX()) + "," + (-1 * DirectVec.GetY()) + "," + (0 * DirectVec.GetZ()));    // 区域坐标
      zone1.AddConfig("Radius", 0.5 * scale);                                                                                                                          // 区域半径
            var direct1 = 1 - map3D.vectorDirection(DirectVec.GetX(), DirectVec.GetY(), DirectVec.GetZ(), 0, 1, 0);
      //// 设置粒子发射器
      var mFireEmitter1 = map.CreateParticleEmitter();                                                                                                          // 创建粒子发射器
      mFireEmitter1.AddConfig("EmitterType", "StraightEmitter");                                                                                            // 粒子发射器类型
      mFireEmitter1.AddConfig("Name", "mFireEmitter1");                                                                                                          // 发射器名称
      mFireEmitter1.AddConfig("Direction", (DirectVec.GetX() * direct1) + "," + (DirectVec.GetY() * direct1) + "," 
          + (DirectVec.GetZ() * direct1));                                                                                // 发射方向 (0,1,0)
            //mFireEmitter1.AddConfig("Direction", DirectVec.GetX() + "," + DirectVec.GetY() + "," + DirectVec.GetZ());                    // 发射方向 (0,1,0)
      mFireEmitter1.AddConfig("ParticleZone", zone1.GetConfig());                                                                                            // 发射器区域
      mFireEmitter1.AddConfig("Flow", 40);                                                                                                                            // 发射数量
      mFireEmitter1.AddConfig("MinForce", 1.0 * scale);                                                                                                          // 最小推力
      mFireEmitter1.AddConfig("MaxForce", 2.5 * scale);                                                                                                          // 最大推力
      //// 设置粒子区域对象
      var zone2 = map.CreateParticleZone();                                                                                                                            // 创建粒子区域
      zone2.AddConfig("ZoneType", "SphereZone");                                                                                                                    // 区域类型
      zone2.AddConfig("Position", (0.15 * DirectVec.GetX()) + "," + (-1.2 * DirectVec.GetY()) + "," 
          + (0.075 * DirectVec.GetZ()));                                                                                  // 区域位置
      zone2.AddConfig("Radius", 0.1 * scale);                                                                                                                          // 区域半径
            var direct2 = 1 - map3D.vectorDirection(DirectVec.GetX(), DirectVec.GetY(), DirectVec.GetZ(), 0, 0.6, 0);
      //// 设置粒子发射器
      var mFireEmitter2 = map.CreateParticleEmitter();                                                                                                          // 创建粒子发射器
      mFireEmitter2.AddConfig("EmitterType", "StraightEmitter");                                                                                            // 发射器类型
      mFireEmitter2.AddConfig("Name", "mFireEmitter2");                                                                                                          // 发射器名称
      mFireEmitter2.AddConfig("Direction", (DirectVec.GetX() * direct2) + "," + (DirectVec.GetY() * direct2) + "," 
          + (DirectVec.GetZ() * direct2));                                                                                // 发射器方向
      mFireEmitter2.AddConfig("ParticleZone", zone2.GetConfig());                                                                                            // 发射器区域
      mFireEmitter2.AddConfig("Flow", 15);                                                                                                                            // 发射数量
      mFireEmitter2.AddConfig("MinForce", 0.5 * scale);                                                                                                          // 最小推力
      mFireEmitter2.AddConfig("MaxForce", 1.5 * scale);                                                                                                          // 最大推力
      //// 设置粒子区域对象
      var zone3 = map.CreateParticleZone();                                                                                                                            // 创建粒子区域
      zone3.AddConfig("ZoneType", "SphereZone");                                                                                                                    // 创建粒子区域类型
      zone3.AddConfig("Position", (-0.375 * DirectVec.GetX()) + "," + (-1.15 * DirectVec.GetY()) + "," 
          + (-0.375 * DirectVec.GetZ()));                                                                                 // 区域坐标位置
      zone3.AddConfig("Radius", 0.3 * scale);                                                                                                                          // 区域半径
            var direct3 = 1 - map3D.vectorDirection(DirectVec.GetX(), DirectVec.GetY(), DirectVec.GetZ(), -0.6, 0.8, -0.8);
      //// 设置粒子发射器
      var mFireEmitter3 = map.CreateParticleEmitter();                                                                                                          // 创建发射器
      mFireEmitter3.AddConfig("EmitterType", "StraightEmitter");                                                                                            // 发射器类型
      mFireEmitter3.AddConfig("Name", "mFireEmitter3");                                                                                                          // 发射器名称
      mFireEmitter3.AddConfig("Direction", (DirectVec.GetX() * direct3) + "," + (DirectVec.GetY() * direct3) + "," 
          + (DirectVec.GetZ() * direct3));                                                                                // 发射器方向
      mFireEmitter3.AddConfig("ParticleZone", zone3.GetConfig());                                                                                            // 发射区域
      mFireEmitter3.AddConfig("Flow", 15);                                                                                                                            // 粒子数量
      mFireEmitter3.AddConfig("MinForce", 0.5 * scale);                                                                                                          // 最小推力
      mFireEmitter3.AddConfig("MaxForce", 1.5 * scale);                                                                                                          // 最大推力
      //// 设置粒子区域对象
      var zone4 = map.CreateParticleZone();                                                                                                                            // 创建粒子区域
      zone4.AddConfig("ZoneType", "SphereZone");                                                                                                                    // 区域类型
      zone4.AddConfig("Position", (-0.255 * DirectVec.GetX()) + "," + (-1.2 * DirectVec.GetY()) + "," 
          + (0.225 * DirectVec.GetZ()));                                                                                  // 粒子区域位置
      zone4.AddConfig("Radius", 0.2 * scale);                                                                                                                          // 区域半径
            var direct4 = 1 - map3D.vectorDirection(DirectVec.GetX(), DirectVec.GetY(), DirectVec.GetZ(), -0.8, 0.5, 0.2);
      //// 设置粒子发射器
      var mFireEmitter4 = map.CreateParticleEmitter();                                                                                                          // 创建粒子发射器
      mFireEmitter4.AddConfig("EmitterType", "StraightEmitter");                                                                                            // 发射器类型
      mFireEmitter4.AddConfig("Name", "mFireEmitter4");                                                                                                          // 发射器名称
      mFireEmitter4.AddConfig("Direction", (DirectVec.GetX() * direct4) + "," + (DirectVec.GetY() * direct4) + "," 
          + (DirectVec.GetZ() * direct4));                                                                                // 发射器方向
      mFireEmitter4.AddConfig("ParticleZone", zone4.GetConfig());                                                                                            // 发射器区域
      mFireEmitter4.AddConfig("Flow", 10);                                                                                                                            // 发射器每秒发射粒子数
      mFireEmitter4.AddConfig("MinForce", 0.5 * scale);                                                                                                          // 最小推力
      mFireEmitter4.AddConfig("MaxForce", 1.5 * scale);                                                                                                          // 最大推力
      //// 设置粒子区域对象
      var zone5 = map.CreateParticleZone();                                                                                                                            // 创建区域对象
      zone5.AddConfig("ZoneType", "SphereZone");                                                                                                                    // 区域类型
      zone5.AddConfig("Position", (-0.075 * DirectVec.GetX()) + "," + (-1.2 * DirectVec.GetY()) + "," 
          + (-0.3 * DirectVec.GetZ()));                                                                                   // 区域位置
      zone5.AddConfig("Radius", 0.2 * scale);                                                                                                                          // 区域半径
 
            var direct5 = 1 - map3D.vectorDirection(DirectVec.GetX(), DirectVec.GetY(), DirectVec.GetZ(), 0.1, 0.8, -1.0);
      //// 设置粒子发射器
      var mFireEmitter5 = map.CreateParticleEmitter();                                                                                                          // 创建粒子发射器
      mFireEmitter5.AddConfig("EmitterType", "StraightEmitter");                                                                                            // 发射器类型
      mFireEmitter5.AddConfig("Name", "mFireEmitter5");                                                                                                          // 发射器名称
      mFireEmitter5.AddConfig("Direction", (DirectVec.GetX() * direct5) + "," + (DirectVec.GetY() * direct5) + "," 
          + (DirectVec.GetZ() * direct5));                                                                                // 发射器方向
      mFireEmitter5.AddConfig("ParticleZone", zone5.GetConfig());                                                                                            // 发射器区域
      mFireEmitter5.AddConfig("Flow", 10);                                                                                                                            // 发射器每秒发射粒子数
      mFireEmitter5.AddConfig("MinForce", 0.5 * scale);                                                                                                          // 最小推力
      mFireEmitter5.AddConfig("MaxForce", 1.5 * scale);                                                                                                          // 最大推力
            //// 设置粒子组
      var mFireGroup = map.CreateParticleGroup();                                                                                                                    // 创建粒子组
      mFireGroup.AddConfig("Name", "Fire");                                                                                                                            // 粒子组名称
      mFireGroup.AddConfig("Capacity", "1350");                                                                                                                      // 粒子组粒子容量
      mFireGroup.AddConfig("ParticleRender", mFireRenderer.GetConfig());                                                                                // 粒子组绘制配置
      mFireGroup.AddConfig("ParticleModel", mFireModel.GetConfig());                                                                                      // 粒子组模板配置
      mFireGroup.AddConfig("ParticleEmitters", mFireEmitter1.GetConfig() + mFireEmitter2.GetConfig() 
          + mFireEmitter3.GetConfig() + mFireEmitter4.GetConfig() + mFireEmitter5.GetConfig());                           // 粒子组发射器配置
      //mFireGroup.AddConfig("Gravity", 0.0 + "," + 3.0 * scale + "," + 0.0);                                                                          // 重力方向
            mFireGroup.AddConfig("Gravity", DirectVec.GetX() + "," + DirectVec.GetY() * scale + "," + DirectVec.GetZ());                // 重力方向
      mFireGroup.AddConfig("ImageUrl", dataPath + "\\texture\\fire.bmp.dds");                                                                          // 粒子纹理
      mFireGroup.AddConfig("BlendMode", "770,1,1");                                                                                                                // 混合模式
      mFireGroup.AddConfig("AlphaTest", "516,0.5,0,1");                                                                                                          // alpha测试
      mFireGroup.AddConfig("DepthBuffer", "0,1");                                                                                                                    // 深度缓存
            ////// 烟雾效果粒子组
            //// 创建粒子渲染类型
      var mSmokeRenderer = map.CreateParticleRender();                                                                            // 建粒子渲染类型
      mSmokeRenderer.AddConfig("RenderType", "ParticleQuadRender");                                                    // 创建四边形粒子渲染类型
      mSmokeRenderer.AddConfig("XScale", 0.3 * scale);                                                                            // X轴缩放比例
      mSmokeRenderer.AddConfig("YScale", 0.3 * scale);                                                                            // Y轴缩放比例
      mSmokeRenderer.AddConfig("TextureEnable", "true");                                                                        // 是否启用纹理
      mSmokeRenderer.AddConfig("AtlasDimensionX", "2");                                                                            // 纹理切割x向切割数
      mSmokeRenderer.AddConfig("AtlasDimensionY", "2");                                                                            // 纹理切割y向切割数
      ////建立粒子模板
      var mSmokeModel = map.CreateParticleModel();                                                                                  // 创建粒子模板
      mSmokeModel.AddConfig("RedParam", "1;0.3,0.2");                                                                                // 红色参数
      mSmokeModel.AddConfig("GreenParam", "1;0.25,0.2");                                                                        // 绿色参数
      mSmokeModel.AddConfig("BlueParam", "0;0.2");                                                                                  // 蓝色参数
      mSmokeModel.AddConfig("AlphaParam", "4;0.2,0.0;0.0,0.0|0.2,0.2|1.0,0.0");                            // 透明度参数
      mSmokeModel.AddConfig("AngleParam", "3;0.0,6.28,0.0,6.28");                                                        // 角度参数
      mSmokeModel.AddConfig("TextureIndexParam", "2;0,4.0");                                                                // 纹理参数
      mSmokeModel.AddConfig("SizeParam", "1;5,10");                                                                                  // 尺寸参数
      mSmokeModel.AddConfig("MinLifeTime", 5);                                                                                        // 最大生命周期
      mSmokeModel.AddConfig("MaxLifeTime", 5);                                                                                        // 最小生命周期
      ////设置粒子区域对象
      var smokeZone = map.CreateParticleZone();                                                                                        // 创建粒子区域
      smokeZone.AddConfig("ZoneType", "SphereZone");                                                                                // 区域类型
      smokeZone.AddConfig("Position", "0,0,0");                                                                                        // 区域位置
      smokeZone.AddConfig("Radius", 1.2 * scale);                                                                                      // 区域半径
      ////设置粒子发射器
      var mSmokeEmitter = map.CreateParticleEmitter();                                                                            // 创建粒子发射器
      mSmokeEmitter.AddConfig("EmitterType", "SphericEmitter");                                                            // 发射器类型
      mSmokeEmitter.AddConfig("Name", "SmokeEmitter");                                                                            // 发射器名称
      mSmokeEmitter.AddConfig("Direction", DirectVec.GetX() + "," 
          + DirectVec.GetY() * scale + "," + DirectVec.GetZ());                                    // 发射方向 (0,1,0)
      mSmokeEmitter.AddConfig("MinAngle", "0");                                                                                        // 最小角度
      mSmokeEmitter.AddConfig("MaxAngle", "1.57");                                                                                  // 最大角度
      mSmokeEmitter.AddConfig("ParticleZone", smokeZone.GetConfig());                                                // 发射器区域
      mSmokeEmitter.AddConfig("Flow", 25);                                                                                              // 发射器每秒发射粒子数
      mSmokeEmitter.AddConfig("MinForce", 0.5*scale);                                                                                // 最小推力
      mSmokeEmitter.AddConfig("MaxForce", 1.0*scale);                                                                                // 最大推力
      ///设置粒子组
      var mSmokeGroup = map.CreateParticleGroup();                                                                                  // 创建粒子组
      mSmokeGroup.AddConfig("Name", "Smoke");                                                                                            // 粒子组名称
      mSmokeGroup.AddConfig("Capacity", "1350");                                                                                      // 容量
      mSmokeGroup.AddConfig("ParticleRender", mSmokeRenderer.GetConfig());                                    // 绘制参数配置
      mSmokeGroup.AddConfig("ParticleModel", mSmokeModel.GetConfig());                                            // 模板参数配置
      mSmokeGroup.AddConfig("ParticleEmitters", mSmokeEmitter.GetConfig());                                    // 粒子发射器配置
      mSmokeGroup.AddConfig("Gravity", DirectVec.GetX() + "," 
          + DirectVec.GetY() * scale + "," + DirectVec.GetZ());                                     // 重力方向　(0.0,0.4*scale,0.0)
      mSmokeGroup.AddConfig("ImageUrl", dataPath + "\\texture\\explosion.bmp.dds");                    // 粒子纹理配置
      mSmokeGroup.AddConfig("BlendMode", "770,1,1");                                                                                // 混合模式
      mSmokeGroup.AddConfig("AlphaTest", "516,0.5,0,1");                                                                        // alpha测试
      mSmokeGroup.AddConfig("DepthBuffer", "0,1");                                                                                  // 深度缓存
      ////// 图层配置
      var tlo = map.CreateLayerOptions("particle");                                                                                  // 创建粒子图层
      tlo.AddConfig("LayerOptionsName", "ParticleSystemLayerOptions");                                            // 创建配置类型, ParticleSystemLayerOptions代表粒子图层数据配置
            tlo.AddConfig("ParticlePosition", longlatPos.GetX() + "," + longlatPos.GetY() + "," 
                + (longlatPos.GetZ() + 1 ));                                                            // 粒子图层坐标(经纬度)
      tlo.AddConfig("ParticleGroups", mFireGroup.GetConfig() + mSmokeGroup.GetConfig());        // 粒子组配置
      //tlo.AddConfig("BlendMode", "770, 1");
      var particleFireLayer = map.CreateLayer("ParticleSystemLayer", tlo);                                    // 创建雨效粒子图层，第一项参数必须为ParticleSystemLayer
      //layermap[particleFireLayer.GetLayerID()] = particleFireLayer;
      //particleFireLayer.AddObserver();
      map.AddLayer(particleFireLayer);                                                                                                    // 添加粒子图层
      return particleFireLayer;
        },
		 /*创建喷泉*/
        "createFountain":function(opt){
            this.opt = opt;
            var ScreenX = this.opt.screenX;
            var ScreenY = this.opt.screenY;
            var longlatPos = translate.ScreenPosToWorldPos(ScreenX, ScreenY);                                                        // 将屏幕坐标点转换成经纬度坐标
            var worldPos = translate.ConvertLongLatHeightToXYZ(longlatPos);                                                                // 经纬度转场景坐标
            var DirectPos = translate.ConvertLongLatHeightToXYZ(map.CreatePosition(longlatPos.GetX(), 
                longlatPos.GetY(), 0));                                                                          // 取投影坐标
            var DirectVec = map3D.normalize(DirectPos.GetX(), DirectPos.GetY(), DirectPos.GetZ());                  // 计算投影坐标单位向量
            var RecordPos = map3D.record(worldPos.GetX(), worldPos.GetY(), worldPos.GetZ());                              // 配置区域
            var ZoneXYZPos = translate.ConvertLongLatHeightToXYZ(map.CreatePosition(longlatPos.GetX(), 
                longlatPos.GetY(), 20));                                                                        // 取投影坐标
            var ZonePos = map.CreatePosition(ZoneXYZPos.GetX() - worldPos.GetX(), 
                ZoneXYZPos.GetY() - worldPos.GetY(), ZoneXYZPos.GetZ() - worldPos.GetZ());
            var dataPath = content3d.GetSDKPath().substring(0, 43) + "data//texture//point.bmp.dds";                // 纹理存放路径获取
            ////// 创建粒子渲染类型
            /////水滴样式
            var particleRenderer;
            if(0){
                ///Warning: 部分硬件不支持点粒子，使用四边形粒子代替
                particleRenderer = map.CreateParticleRender();                                                                                      // 建粒子渲染类型
                particleRenderer.AddConfig("RenderType", "ParticleQuadRender");                                                              // 创建四边形粒子渲染类型, ParticleQuadRenderer代表四边形粒子渲染类型
                particleRenderer.AddConfig("XScale", "0.03");                                                                                        // X轴缩放比例
                particleRenderer.AddConfig("YScale", "0.03");                                                                                        // Y轴缩放比例
                particleRenderer.AddConfig("TextureEnable", "true");                                                                            // 是否启用纹理
            }else{
                particleRenderer = map.CreateParticleRender();                                                                                      // 建粒子渲染类型
                particleRenderer.AddConfig("RenderType", "ParticlePointRender");                                                          // 创建点粒子渲染类型, ParticlePointRenderer代表点粒子渲染类型
                particleRenderer.AddConfig("Size", "0.03");                                                                                            // 粒子大小
                particleRenderer.AddConfig("WorldSizeEnable", "true");                                                                          // 粒子大小参数生效
            }
            /////水滴颜色
      //// 建立粒子模板
      var particleModel = map.CreateParticleModel();                                                                                          // 创建粒子模板
      particleModel.AddConfig("RedParam", "0;1");                                                                                                // 红色参数
      particleModel.AddConfig("GreenParam", "0;1");                                                                                            // 绿色参数
      particleModel.AddConfig("BlueParam", "0;1");                                                                                              // 蓝色参数
      particleModel.AddConfig("AlphaParam", "0;0.8");                                                                                          // 透明参数
      particleModel.AddConfig("MinLifeTime", "3.8");                                                                                          // 最小生命周期
      particleModel.AddConfig("MaxLifeTime", "3.8");                                                                                          // 最大生命周期
            /////喷泉圆锥发射区域
      //// 设置粒子区域对象        
      var pointZone = map.CreateParticleZone();                                                                                                  // 创建粒子区域
      pointZone.AddConfig("ZoneType", "PointZone");                                                                                            // 创建点区域类型, PointZone代表点区域类型
            pointZone.AddConfig("Position", "0,0.5,0");                                                                                                // 创建区域位置
      //// 设置粒子发射器
      var particleEmitter = map.CreateParticleEmitter();                                                                                    // 创建区域发射器            
      particleEmitter.AddConfig("EmitterType", "SphericEmitter");                                                                        // 创建发射器类型
      particleEmitter.AddConfig("Direction", DirectVec.GetX() + "," + DirectVec.GetY() + "," 
          + DirectVec.GetZ());                                                                                  // 发射方向(0,1,0)
      particleEmitter.AddConfig("MinAngle", 0.15 * 3.14 + "");                                                                          // 最小角度
      particleEmitter.AddConfig("MaxAngle", 0.15 * 3.14 + "");                                                                          // 最大角度
      particleEmitter.AddConfig("ParticleZone", pointZone.GetConfig());                                                              // 设置发射区域
      particleEmitter.AddConfig("Flow", 500);                                                                                                      // 发射数量(TODO: 中断发射)
      particleEmitter.AddConfig("MinForce", 1.5);                                                                                                // 最小推力
      particleEmitter.AddConfig("MaxForce", 1.5);                                                                                                // 最大推力
            /////喷泉水花地面反弹
      //// 设置粒子区域对象
            var PlaneDirectPos = translate.ConvertLongLatHeightToXYZ(map.CreatePosition(longlatPos.GetX(), 
                longlatPos.GetY(), 0));                                                                        // 取投影坐标
            var PlaneDirectVec = map3D.normalize(PlaneDirectPos.GetX(), PlaneDirectPos.GetY(), 
                PlaneDirectPos.GetZ());                                                                                  // 计算投影坐标单位向量
      var planeZone = map.CreateParticleZone();                                                                                                  // 创建粒子区域对象
      planeZone.AddConfig("ZoneType", "PlaneZone");                                                                                            // 创建平面区域类型, PlaneZone代表平面区域类型
            planeZone.AddConfig("Normal", PlaneDirectVec.GetX() + "," + PlaneDirectVec.GetY() + "," 
                + PlaneDirectVec.GetZ());                                                                          // 区域方向
            //pointZone.AddConfig("Position", "0,1,0");                                                                                                // 区域位置 (TODO: 不生效)
      //// 设置修改器
      var particleModifier = map.CreateParticleModifier();                                                                                // 创建修改器
      particleModifier.AddConfig("ModifierType", "ObstacleModifier");                                                                  // 修改器类型
      particleModifier.AddConfig("ParticleZone", planeZone.GetConfig());                                                            // 影响区域
      particleModifier.AddConfig("Trigger", "8");                                                                                                // 触发信号(INTERSECT_ZONE)
      particleModifier.AddConfig("BouncingRatio", "0.2");                                                                                    // 反弹系数
      particleModifier.AddConfig("Friction", "1.0");                                                                                          // 速度因子
      //// 设置粒子组
      var particleGroup = map.CreateParticleGroup();                                                                                          // 创建粒子组
      particleGroup.AddConfig("Name", "Fountain");                                                                                            // 粒子名称
      particleGroup.AddConfig("Capacity", "2000");                                                                                            // 粒子发射数量
      particleGroup.AddConfig("ParticleRender", particleRenderer.GetConfig());                                                // 配置粒子渲染类型
      particleGroup.AddConfig("ParticleModel", particleModel.GetConfig());                                                        // 配置粒子模板
      particleGroup.AddConfig("ParticleEmitters", particleEmitter.GetConfig());                                                // 配置粒子发射器
      particleGroup.AddConfig("ParticleModifiers", particleModifier.GetConfig());                                            // 配置粒子修改器
      particleGroup.AddConfig("Gravity", (-DirectVec.GetX()) + "," + (-DirectVec.GetY()) + "," 
          + (-DirectVec.GetZ()));                                                                            // 重力方向
      particleGroup.AddConfig("ImageUrl", dataPath);                                                                        // 资源路径
      particleGroup.AddConfig("BlendMode", "770,1,1");                                                                                      // 混合模式
      particleGroup.AddConfig("DepthBuffer", "0,1");                                                                                          // 深度缓存
      particleGroup.AddConfig("AlphaTest", "516,0.5,0,1");                                                                                // alpha测试
            //// 粒子图层配置
        var tlo = map.CreateLayerOptions("particle");                                                                                            // 创建粒子图层
        tlo.AddConfig("LayerOptionsName", "ParticleSystemLayerOptions");                                                              // 创建配置类型
        tlo.AddConfig("ParticleGroups", particleGroup.GetConfig());                                                                        // 设置粒子组配置
            tlo.AddConfig("ParticlePosition", longlatPos.GetX() + "," + longlatPos.GetY() + "," 
               + (longlatPos.GetZ() + 2));                                                                          // 粒子图层坐标(经纬度)
      var particleFountainLayer = map.CreateLayer("ParticleSystemLayer", tlo);                                                // 创建喷泉粒子图层
      //layermap[particleFountainLayer.GetLayerID()] = particleFountainLayer;
      //particleFountainLayer.AddObserver();
      map.AddLayer(particleFountainLayer);    
      return particleFountainLayer;                                                                                                              // 添加粒子图层
        },
        /*水枪*/
        "createHydraulicGiant":function(opt){
            this.opt = opt;
            var StartPointLon = this.opt.startPointLon;
            var StartPointLat = this.opt.startPointLat;
            var StartPointHeight = this.opt.startPointHeight;
            var EndPointLon = this.opt.endPointLon;
            var EndPointLat = this.opt.endPointLat;
            var EndPointHeight = this.opt.endPointHeight;
            var mStartLLHPoint = map.CreatePosition(StartPointLon, StartPointLat, StartPointHeight);
            var mStartWorldPoint = translate.ConvertLongLatHeightToXYZ(mStartLLHPoint);
            var mEndLLHPoint = map.CreatePosition(EndPointLon, EndPointLat, EndPointHeight);
            var mEndWorldPoint = translate.ConvertLongLatHeightToXYZ(mEndLLHPoint);
            var DirectPos = translate.ConvertLongLatHeightToXYZ(map.CreatePosition(StartPointLon, StartPointLat, 0));        // 取投影坐标
            var DirectVec = map3D.normalize(DirectPos.GetX(), DirectPos.GetY(), DirectPos.GetZ());                                          // 计算投影坐标单位向量
            var DirectVec2 = map3D.normalize(mEndWorldPoint.GetX() - mStartWorldPoint.GetX(), 
                mEndWorldPoint.GetY() - mStartWorldPoint.GetY(), mEndWorldPoint.GetZ() - mStartWorldPoint.GetZ());            // 计算投影坐标单位向量
            var dataPath = content3d.GetSDKPath().substring(0, 43) + "data\\texture\\point.bmp.dds";                                        // 纹理存放路径获取
            var fXSpeed = (mStartWorldPoint.GetX() - mEndWorldPoint.GetX()) / 4.0;
            var fYSpeed = (mStartWorldPoint.GetY() - mEndWorldPoint.GetY()) * 5.0 / 12.0;
            var fZSpeed = (mStartWorldPoint.GetZ() - mEndWorldPoint.GetZ()) / 4.0;
            var mForce = Math.sqrt(Math.pow(fXSpeed, 2) + Math.pow(fYSpeed, 2) + Math.pow(fZSpeed, 2));
            var mDirection = map3D.normalize(fXSpeed, fYSpeed, fZSpeed);
            var mGravity = Math.abs(fYSpeed / 5.0);
            var mSize = mForce / 15;
            var particleRenderer = map.CreateParticleRender();                                                                                              // 建粒子渲染类型
            particleRenderer.AddConfig("RenderType", "ParticleQuadRender");                                                                            // 创建四边形粒子渲染类型, ParticleQuadRenderer代表四边形粒子渲染类型
            particleRenderer.AddConfig("XScale", "0.03");                                                                                                      // X轴缩放比例
            particleRenderer.AddConfig("YScale", "0.03");                                                                                                      // Y轴缩放比例
            //particleRenderer.AddConfig("AtlasDimensionX", "2");                                                                        
            //particleRenderer.AddConfig("AtlasDimensionY", "2");                                                                        
            particleRenderer.AddConfig("TextureEnable", "true");                                                                                          // 是否启用纹理
            var particleModel = map.CreateParticleModel();                                                                                                    // 创建粒子模板
      particleModel.AddConfig("RedParam", "0;1");                                                                                                          // 红色参数
      particleModel.AddConfig("GreenParam", "0;1");                                                                                                      // 绿色参数
      particleModel.AddConfig("BlueParam", "0;1");                                                                                                      // 蓝色参数
      particleModel.AddConfig("AlphaParam", "0;0.8");                                                                                                    // 透明参数
      particleModel.AddConfig("MinLifeTime", "4");                                                                                                      // 最小生命周期
      particleModel.AddConfig("MaxLifeTime", "4");                                                                                                      // 最大生命周期
            //// 设置粒子区域对象
      var zone = map.CreateParticleZone();                                                                                                                  // 创建粒子区域
            zone.AddConfig("ZoneType", "SphereZone");                                                                                                            // 创建区域类型
            zone.AddConfig("Position", "0, 0, 0");                                                                          // 区域坐标
      zone.AddConfig("Radius", 0.025);                                                                                // 发射半径
            var particleEmitter = map.CreateParticleEmitter();                                                                                              // 创建区域发射器            
      particleEmitter.AddConfig("EmitterType", "SphericEmitter");                                                                                  // 创建发射器类型
      particleEmitter.AddConfig("Direction", DirectVec2.GetX() + "," + DirectVec2.GetY() + "," 
          + DirectVec2.GetZ());                                                                                          // 发射方向(0,1,0)
      particleEmitter.AddConfig("MinAngle", "0.0");                                                                                                      // 最小角度
      particleEmitter.AddConfig("MaxAngle", 0.05 * 3.14 + "");                                                                                    // 最大角度
      particleEmitter.AddConfig("ParticleZone", zone.GetConfig());                                                                              // 设置发射区域
      particleEmitter.AddConfig("Flow", "5000");                                                                                                          // 发射数量
      particleEmitter.AddConfig("MinForce", mForce);                                                                                                    // 最小推力
      particleEmitter.AddConfig("MaxForce", mForce);                                                                                                    // 最大推力
            var particleGroup = map.CreateParticleGroup();                                                                                                    // 创建粒子组
      particleGroup.AddConfig("Name", "Fountain");                                                                                                      // 粒子名称
      particleGroup.AddConfig("Capacity", "50000");                                                                                                      // 粒子最大数量
      particleGroup.AddConfig("ParticleRender", particleRenderer.GetConfig());                                                            // 配置粒子渲染类型
      particleGroup.AddConfig("ParticleModel", particleModel.GetConfig());                                                                  // 配置粒子模板
      particleGroup.AddConfig("ParticleEmitters", particleEmitter.GetConfig());                                                            // 配置粒子发射器
      particleGroup.AddConfig("Gravity", (-DirectVec.GetX()) + "," + (-DirectVec.GetY()) + "," 
          + (-DirectVec.GetZ()));                                                                                      // 重力方向
      particleGroup.AddConfig("ImageUrl", dataPath);                                                                                      // 资源路径
      particleGroup.AddConfig("BlendMode", "770,1,1");                                                                                                // 混合模式
      particleGroup.AddConfig("DepthBuffer", "0,1");                                                                                                    // 深度缓存
      particleGroup.AddConfig("AlphaTest", "516,0.5,0,1");                                                                                          // alpha测试
            
            var tlo = map.CreateLayerOptions("particle");                                                                                                      // 创建粒子图层
      tlo.AddConfig("LayerOptionsName", "ParticleSystemLayerOptions");                                                                        // 创建配置类型
      tlo.AddConfig("ParticleGroups", particleGroup.GetConfig());                                                                                  // 设置粒子组配置
            tlo.AddConfig("ParticlePosition", mStartLLHPoint.GetX() + "," + mStartLLHPoint.GetY() + "," 
                + (mStartLLHPoint.GetZ()));                                                                                // 粒子图层坐标(经纬度)
      var particleFountainLayer = map.CreateLayer("ParticleSystemLayer", tlo);                                                              // 创建喷泉粒子图层
      map.AddLayer(particleFountainLayer);
      return particleFountainLayer;
        },
		 /*取单位向量控制方向*/
        "normalize":function(x, y, z){
            var length = Math.sqrt(x * x + y * y + z * z );
            var mx = x / length;
            var my = y / length;
            var mz = z / length;
            return map.CreatePosition(mx, my, mz);
        },
        /*区域大小控制*/
        "record":function(x, y, z){
            var length = Math.sqrt(x * x + y * y + z * z );
            var factor = (5.0 / length) + 1;
            var mx = x * factor;
            var my = y * factor;
            var mz = z * factor;
            return map.CreatePosition(mx, my, mz);
        },
        "vectorDirection":function(x1, y1, z1, x2, y2, z2){
            var vec1 = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
            var vec2 = Math.sqrt(x2 * x2 + y2 * y2 + z2 * z2);
            var tmp = x1 * x2 + y1 * y2 + z1 * z2;
            return tmp / (vec1 * vec2);
        }
		
});

// 注册类名
CooMap.Class.className(Map3D,"Map3D");
// 空间命名
CooMap["Map3D"] = Map3D;
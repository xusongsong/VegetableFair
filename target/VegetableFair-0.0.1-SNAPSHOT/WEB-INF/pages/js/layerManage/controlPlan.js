/**
 * 控规数据功能
 * 
 * @author cd
 * @createDate 2017-10-19
 */
var result=new Array();
var polygon2D = null;
var polygon3D = null;
var wfsshpLayer;
$(document).ready(function(){
	/**
	 * 控规矢量加载
	 */
	$("#kgsl").click(function(){
		var KGURL = content3d.GetSDKPath().replace("\\bin","");
		KGURL += "\\data\\tmp\\KG\\KG.shp";
		if($("#kgsl").attr("checked")==true){
			var map = content3d.GetIMapMgrPtr();
			if(polygon2D == null){
				var styleSheet = map.CreateStyleSheet();
				for(var i=0;i<result.length;i++) {
					var a1 = new Array(4);
					a1 = result[i][1].split(",");
					var str = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + ", " + "0.7";
					var lstr = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + ", " + "0.7";
					var lSymbol = map.CreateSymbol("LineSymbol");
					lSymbol.AddConfig("Stipple", "-1");//-1 线 1 虚线
					lSymbol.AddConfig("Width", "1");//
					lSymbol.AddConfig("Color", lstr);
					var tmpSymbol = map.CreateSymbol("PolygonSymbol");
					tmpSymbol.AddConfig("Color", str);
					var tmpStyle = map.CreateStyle(result[i][0]);
					tmpStyle.AddSymbol("PolygonSymbol", tmpSymbol.GetConfig());
					tmpStyle.AddSymbol("LineSymbol", lSymbol.GetConfig());
					tmpStyle.AddFilterName("BuildGeometryFilter");
					styleSheet.AddStyle(tmpStyle.GetConfig());
					styleSheet.AddStyleSelector(result[i][0]);
				}
			 	styleSheet.SetStrExpression("[YDXZ]");
                var tlo = map.CreateLayerOptions("shp");
                tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
                tlo.AddConfig("DataSourceTypeName","fmgeom");
                tlo.AddConfig("Driver", "ESRI Shapefile");
                tlo.AddConfig("Url", KGURL);
                tlo.AddConfig("FeatureSourceType","ogr");
                tlo.AddConfig("TileSizeFactor","1.0");
                tlo.AddConfig("TileSize","500");
                tlo.AddConfig("LiftUp","10");
                tlo.AddConfig("MaxRange","10000.0");
                tlo.AddConfig("MinRange","0.0");
                tlo.AddConfig("BuildSpatialIndex", "true");
                tlo.AddConfig("StyleSheet", styleSheet.GetConfig());
                polygon2D = map.CreateLayer("FeatureModelLayer", tlo);
                map.AddLayer(polygon2D);
			}else{
				polygon2D.SetVisible(true);
			}
		}else{
			polygon2D.SetVisible(false);
		}
	});
	 
	/**
	 * 控规盒子加载
	 */
	$("#kghz").click(function(){
		var KGURL = content3d.GetSDKPath().replace("\\bin","");
		KGURL += "\\data\\tmp\\KG\\KG.shp";
		if($("#kghz").attr("checked")==true){
			var map = content3d.GetIMapMgrPtr();
			if(polygon3D == null){
				var polygonSymbol = map.CreateSymbol("PolygonSymbol");
				polygonSymbol.AddConfig("Color", "0.8, 0.0, 0.6, 0.0");
				var pStyle = map.CreateStyle("PolygonStyle");
				pStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig());
				var styleSheet = map.CreateStyleSheet();
				for(var i=0;i<result.length;i++){
					var tmpSymbol = map.CreateSymbol("PolygonExtrusionSymbol");
					tmpSymbol.AddConfig("ExtrudeStyle","true");
					tmpSymbol.AddConfig("Flatten", "true");
					tmpSymbol.AddConfig("HeightExpression", "[JZXG]");
					tmpSymbol.AddConfig("RoofStyleName", "RoofStyle" + result[i][0]);
					tmpSymbol.AddConfig("WallStyleName", "WallStyle" + result[i][0]);
					var a1 = new Array(4);
					a1 = result[i][1].split(",");
					var str = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + ", " + "0.7";
					var polygonSymbol = map.CreateSymbol("PolygonSymbol");
					polygonSymbol.AddConfig("Color", str);
					var roofStyle = map.CreateStyle("RoofStyle" + result[i][0]);
					roofStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig());
					var wallStyle = map.CreateStyle("WallStyle" + result[i][0]);
					wallStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig());
					var tmpStyle = map.CreateStyle(result[i][0]);
					tmpStyle.AddSymbol("PolygonExtrusionSymbol", tmpSymbol.GetConfig());
					tmpStyle.AddFilterName("ExtrudeGeometryFilter");
					styleSheet.AddStyle(tmpStyle.GetConfig());
					styleSheet.AddStyle(roofStyle.GetConfig());
					styleSheet.AddStyle(wallStyle.GetConfig());
					styleSheet.AddStyleSelector(result[i][0]);
				}
				styleSheet.SetStrExpression("[YDXZ]");
				var tlo = map.CreateLayerOptions("shp");
				//调整渲染优先级,解决倾斜摄影和模型无法穿透效果,值越大渲染优先级越低
				tlo.AddConfig("RenderOrder", "2");
				tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
				tlo.AddConfig("DataSourceTypeName","fmgeom");
				tlo.AddConfig("Driver", "ESRI Shapefile");
				tlo.AddConfig("Url", KGURL);
				tlo.AddConfig("FeatureSourceType","ogr");
				tlo.AddConfig("TileSizeFactor","1.0");
				tlo.AddConfig("TileSize","1000");
				tlo.AddConfig("LiftUp","10");
				tlo.AddConfig("MaxRange","10000.0");
				tlo.AddConfig("MinRange","0.0");
				tlo.AddConfig("BuildSpatialIndex", "true");
				tlo.AddConfig("StyleSheet", styleSheet.GetConfig());
				polygon3D = map.CreateLayer("FeatureModelLayer", tlo);
				map.AddLayer(polygon3D);
			}else{
				polygon3D.SetVisible(true);
			}
		}else{
			polygon3D.SetVisible(false);
		}
	});
	var jcjkArr = [["50","40,146,199,70"],
                ["70","81,158,189,70"],
                ["90","113,171,176,70"],
                ["110","140,184,164,70"],
                ["130","167,199,151,70"],
                ["150","191,212,138,70"],
                ["170","215,227,125,70"],
                ["190","238,242,109,70"],
                ["210","250,234,92,70"],
                ["230","252,207,81,70"],
                ["250","252,179,68,70"],
                ["270","250,150,57,70"],
                ["290","247,122,45,70"],
                ["310","245,96,37,70"],
                ["330","240,62,26,70"],
                ["350","232,16,20,70"]];
	/**
	 * 机场控高矢量加载
	 */
	var jcjk2D;
	$("#jichangjingkong").click(function(){
		var jcjkURL = content3d.GetSDKPath().replace("\\bin","");
		jcjkURL += "\\data\\tmp\\JCJK\\jc6.shp";
		if($("#jichangjingkong").attr("checked")==true){
			var map = content3d.GetIMapMgrPtr();
			if(jcjk2D == null){
				var styleSheet = map.CreateStyleSheet();
				for(var i=0;i<jcjkArr.length;i++) {
					var a1 = new Array(4);
					a1 = jcjkArr[i][1].split(",");
					var str = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + ", " + "0.8";
					var lstr = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + ", " + "0.8";
					var lSymbol = map.CreateSymbol("LineSymbol");
					lSymbol.AddConfig("Stipple", "-1");
					lSymbol.AddConfig("Width", "1");
					lSymbol.AddConfig("Color", lstr);
					var tmpSymbol = map.CreateSymbol("PolygonSymbol");
					tmpSymbol.AddConfig("Color", str);
					var tmpStyle = map.CreateStyle(jcjkArr[i][0]);
					tmpStyle.AddSymbol("PolygonSymbol", tmpSymbol.GetConfig());
					tmpStyle.AddSymbol("LineSymbol", lSymbol.GetConfig());
					tmpStyle.AddFilterName("BuildGeometryFilter");
					styleSheet.AddStyle(tmpStyle.GetConfig());
					styleSheet.AddStyleSelector(jcjkArr[i][0]);
				}
				styleSheet.SetStrExpression("[KG]");
				var tlo = map.CreateLayerOptions("shp");
				tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
				tlo.AddConfig("DataSourceTypeName","fmgeom");
				tlo.AddConfig("Driver", "ESRI Shapefile");
				tlo.AddConfig("Url", jcjkURL);
				tlo.AddConfig("FeatureSourceType","ogr");
				tlo.AddConfig("TileSizeFactor","1.0");
				tlo.AddConfig("TileSize","500");
				tlo.AddConfig("LiftUp","5");
				tlo.AddConfig("MaxRange","100000.0");
				tlo.AddConfig("MinRange","0.0");
				tlo.AddConfig("BuildSpatialIndex", "true");
				tlo.AddConfig("StyleSheet", styleSheet.GetConfig());
				tlo.AddConfig("IsAutoTitleSize", "false");
				jcjk2D = map.CreateLayer("FeatureModelLayer", tlo);
				map.AddLayer(jcjk2D);
			}else{
				jcjk2D.SetVisible(true);
			}
		}else{
			var map = content3d.GetIMapMgrPtr();
			map.RemoveLayer(jcjk2D);
			jcjk2D = null;
		}
	});
	/**
	 * 机场控高盒子加载
	 */
	var jcjk3D;
	$("#jichangjingkonghezi").click(function(){
		var jcjkURL = content3d.GetSDKPath().replace("\\bin","");
		jcjkURL += "\\data\\tmp\\JCJK\\jc6.shp";
		if($("#jichangjingkonghezi").attr("checked")==true){
			var map = content3d.GetIMapMgrPtr();
			if(jcjk3D == null){
				var polygonSymbol = map.CreateSymbol("PolygonSymbol");
				polygonSymbol.AddConfig("Color", "0.8, 0.0, 0.6, 0.0");
				var pStyle = map.CreateStyle("PolygonStyle");
				pStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig());
				var styleSheet = map.CreateStyleSheet();
				for(var i=0;i<jcjkArr.length;i++){
					var tmpSymbol = map.CreateSymbol("PolygonExtrusionSymbol");
					tmpSymbol.AddConfig("ExtrudeStyle","true");
					tmpSymbol.AddConfig("Flatten", "true");
					tmpSymbol.AddConfig("HeightExpression", "[机场控高]");
					tmpSymbol.AddConfig("RoofStyleName", "RoofStyle" + jcjkArr[i][0]);
					tmpSymbol.AddConfig("WallStyleName", "WallStyle" + jcjkArr[i][0]);
					var a1 = new Array(4);
					a1 = jcjkArr[i][1].split(",");
					var str = a1[0] / 255.0 + ", " + a1[1] / 255.0 + ", " + a1[2] / 255.0 + ", " + "0.8";
					var polygonSymbol = map.CreateSymbol("PolygonSymbol");
					polygonSymbol.AddConfig("Color", str);
					var roofStyle = map.CreateStyle("RoofStyle" + jcjkArr[i][0]);
					roofStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig());
					var wallStyle = map.CreateStyle("WallStyle" + jcjkArr[i][0]);
					wallStyle.AddSymbol("PolygonSymbol", polygonSymbol.GetConfig());
					var tmpStyle = map.CreateStyle(jcjkArr[i][0]);
					tmpStyle.AddSymbol("PolygonExtrusionSymbol", tmpSymbol.GetConfig());
					tmpStyle.AddFilterName("ExtrudeGeometryFilter");
					styleSheet.AddStyle(tmpStyle.GetConfig());
					styleSheet.AddStyle(roofStyle.GetConfig());
					styleSheet.AddStyle(wallStyle.GetConfig());
					styleSheet.AddStyleSelector(jcjkArr[i][0]);
				}
				styleSheet.SetStrExpression("[KG]");
				var tlo = map.CreateLayerOptions("shp");
				//调整渲染优先级,解决倾斜摄影和模型无法穿透效果,值越大渲染优先级越低
				tlo.AddConfig("RenderOrder", "2");
				tlo.AddConfig("LayerOptionsName", "FeatureModelLayerOptions");
				tlo.AddConfig("DataSourceTypeName","fmgeom");
				tlo.AddConfig("Driver", "ESRI Shapefile");
				tlo.AddConfig("Url", jcjkURL);
				tlo.AddConfig("FeatureSourceType","ogr");
				tlo.AddConfig("TileSizeFactor","1.0");
				tlo.AddConfig("TileSize","500");
				tlo.AddConfig("LiftUp","5");
				tlo.AddConfig("MaxRange","100000.0");
				tlo.AddConfig("MinRange","0.0");
				tlo.AddConfig("BuildSpatialIndex", "true");
				tlo.AddConfig("StyleSheet", styleSheet.GetConfig());
				jcjk3D = map.CreateLayer("FeatureModelLayer", tlo);
				map.AddLayer(jcjk3D);
			}else{
				jcjk3D.SetVisible(true);
			}
		}else{
			var map = content3d.GetIMapMgrPtr();
			map.RemoveLayer(jcjk3D);
			jcjk3D = null;
		}
	});
	var json=[{"H":"255,127,0" ,
              "H1":"165,82,0" ,
              "H11":"127,79,63" ,
              "H12":"165,103,82" ,
              "H13":"204,178,102" ,
              "H14":"204,204,102" ,
              "H2":"132,132,132" ,
              "H21":"0,0,0",
              "H22":"132,132,132",
              "H23":"38,66,76" ,
              "H24":"38,76,76" ,
              "H25":"63,111,127",
              "H3":"0,102,204" ,
              "H4":"47,76,38" ,
              "H41":"47,76,38" ,
              "H42":"47,76,38" ,
              "H5":"127,79,63" ,
              "H9":"153,38,0" ,
              "E":"159,255,127" ,
              "E1":"127,191,255" ,
              "E11":"127,191,255" ,
              "E12":"127,191,255" ,
              "E13":"127,191,255" ,
              "E2":"153,76,114" ,
              "E9":"153,204,102"},
              {"R":"255,191,0" ,
              "R1":"55,223,127" ,
              "R11":"255,223,127" ,
              "R12":"255,223,127" ,
              "R2":"255,255,0" ,
              "R21":"255,255,0" ,
              "R22":"255,255,0" ,
              "R3":"165,165,0" ,
              "R31":"165,165,0" ,
              "R32":"165,165,0" ,
              "A":"255,0,191" ,
              "A1":"255,0,255" ,
              "A2":"255,159,127" ,
              "A21":"255,159,127" ,
              "A22":"255,159,127" ,
              "A3":"255,127,255" ,
              "A31":"255,127,255" ,
              "A32":"255,127,255" ,
              "A33":"255,127,255" ,
              "A34":"255,127,255" ,
              "A35":"255,127,255" ,
              "A4":"0,165,124" ,
              "A41":"0,165,124" ,
              "A42":"0,165,124" ,
              "A5":"255,0,127" ,
              "A51":"255,0,127" ,
              "A52":"255,0,127" ,
              "A53":"255,0,127" ,
              "A59":"255,0,127" ,
              "A6":"127,63,95" ,
              "A7":"165,41,0" ,
              "A8":"127,0,63" ,
              "A9":"76,0,19" ,
              "B":"165,0,0" ,
              "B1":"255,0,0" ,
              "B11":"255,0,0" ,
              "B12":"255,0,0" ,
              "B13":"255,0,0" ,
              "B14":"255,0,0" ,
              "B2":"127,0,0" ,
              "B21":"127,0,0" ,
              "B22":"127,0,0" ,
              "B29":"127,0,0" ,
              "B3":"255,63,0" ,
              "B31":"255,63,0" ,
              "B32":"255,63,0" ,
              "B4":"255,127,127" ,
              "B41":"255,127,127" ,
              "B49":"255,127,127" ,
              "B9":"204,102,102" ,
              "M":"76,57,38" ,
              "M1":"204,153,102" ,
              "M2":"153,114,76" ,
              "M3":"127,95,63" ,
              "W":"153,102,204" ,
              "W1":"191,127,255" ,
              "W2":"114,76,153" ,
              "W3":"57,38,76" ,
              "S":"214,214,214" ,
              "S1":"255,255,255" ,
              "S2":"255,0,191" ,
              "S3":"128,128,128" ,
              "S4":"192,192,192" ,
              "S41":"192,192,192" ,
              "S42":"192,192,192" ,
              "S9":"91,91,91" ,
              "U":"0,153,204" ,
              "U1":"0,114,153" ,
              "U11":"0,114,153" ,
              "U12":"0,114,153" ,
              "U13":"0,114,153" ,
              "U14":"0,114,153" ,
              "U15":"0,114,153" ,
              "U16":"0,114,153" ,
              "U2":"0,57,76" ,
              "U21":"0,57,76" ,
              "U22":"0,57,76" ,
              "U3":"63,95,127" ,
              "U31":"63,95,127" ,
              "U32":"63,95,127" ,
              "U9":"38,57,76" ,
              "G":"76,153,0" ,
              "G1":"0,255,0" ,
              "G2":"0,153,0" ,
              "G3":"255,255,255"},
              {"H":"255,127,0" ,
              "H1":"165,82,0" ,
              "H11":"127,79,63" ,
              "H12":"165,103,82" ,
              "H13":"204,178,102" ,
              "H14":"204,204,102" ,
              "H2":"132,132,132" ,
              "H21":"0,0,0" ,
              "H22":"132,132,132" ,
              "H23":"38,66,76" ,
              "H24":"38,76,76" ,
              "H25":"63,111,127" ,
              "H3":"0,102,204" ,
              "H4":"47,76,38" ,
              "H41":"47,76,38" ,
              "H42":"47,76,38" ,
              "H5":"127,79,63" ,
              "H9":"153,38,0" ,
              "E":"159,255,127" ,
              "E1":"127,191,255" ,
              "E11":"127,191,255" ,
              "E12":"127,191,255" ,
              "E13":"127,191,255" ,
              "E2":"153,76,114" ,
              "E9":"153,204,102"},
              {"R":"255,191,0" ,
              "R1":"55,223,127" ,
              "R2":"255,255,0" ,
              "R3":"165,165,0" ,
              "A":"255,0,191" ,
              "A1":"255,0,255" ,
              "A2":"255,159,127" ,
              "A3":"255,127,255" ,
              "A4":"0,165,124" ,
              "A5":"255,0,127" ,
              "A6":"153,76,114" ,
              "A7":"204,51,0" ,
              "A8":"153,0,76" ,
              "A9":"76,0,19" ,
              "B":"204,0,0" ,
              "B1":"255,0,0" ,
              "B2":"127,0,0" ,
              "B3":"255,63,0" ,
              "B4":"255,127,127" ,
              "B9":"204,102,102" ,
              "M":"76,57,38" ,
              "M1":"204,153,102" ,
              "M2":"153,114,76" ,
              "M3":"127,95,63" ,
              "M4":"255,191,127" ,
              "W":"153,102,204" ,
              "W1":"191,127,255" ,
              "W2":"114,76,153" ,
              "W3":"57,38,76" ,
              "S":"214,214,214" ,
              "S1":"255,255,255" ,
              "S3":"128,128,128" ,
              "S4":"192,192,192" ,
              "S9":"91,91,91" ,
              "U":"0,153,204" ,
              "U1":"0,114,153" ,
              "U2":"0,57,76" ,
              "U3":"63,95,127" ,
              "U9":"38,57,7" ,
              "G":"76,153,0" ,
              "G1":"0,255,0" ,
              "G2":"0,153,0" ,
              "G3":"255,255,255" ,
              "G9":"0,76,0" },
              {"H21":"0,0,0",
              "H22":"0,0,0",  
              "H25":"0,0,0",    
              "S1":"0,0,0", 
              "S2":"0,0,0",
              "H21":"0,0,0",
              "H22":"0,0,0",
              "H25":"0,0,0",
              "S1":"0,0,0"}];
	/**
	 * 遍历颜色数组
	 */
	$.each(json,function(i,item){
		for(var key in item){
			result.push(new Array(key,item[key]+",70"));
		}
	}); 
	
});
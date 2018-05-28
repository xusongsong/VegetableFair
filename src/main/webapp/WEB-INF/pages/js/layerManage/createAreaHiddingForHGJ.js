var areaHidding = null;
/**
 * 压平图层创建
 * 
 * @param points,压平点集 
 * @param meshCode,压平图幅号集合 
 */
function createAreaHidding(points, meshCode){
	if(points == 0 || meshCode == 0){
		return;
	}
	if(areaHidding != null){
		map3D.removelayer(areaHidding);
		areaHidding = null;
	}
	var pointArr = points.split(";");
	var Points = "";
	var ids = "";
	var meshCodes = meshCode.split(";");
	for(var i = 0;i<pointArr.length - 1;i++){
		var point = pointArr[i].split(",");
		var srcPos = map.CreatePosition(parseFloat(point[0]), parseFloat(point[1]), parseFloat(point[2]));
		var destPos = map.CreateTransformation().ConvertXYZToLongLatHeight(srcPos);
		Points += destPos.GetX() + "," + destPos.GetY() + "," + destPos.GetZ() + ";";
	}
	for(var i=0;i<layerArray.length;i++){
		if(layerArray[i].layerID.split("_")[1] == "MODEL"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeModel = meshCodes[s] + "2"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeModel) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
		if(layerArray[i].layerID.split("_")[1] == "TERRAIN"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeTerrain = meshCodes[s] + "1"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeTerrain) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
		if(layerArray[i].layerID.split("_")[1] == "TRAFFIC"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeTraffic = meshCodes[s] + "3"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeTraffic) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
		if(layerArray[i].layerID.split("_")[1] == "BRIDGE"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeBridge = meshCodes[s] + "4"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeBridge) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
		if(layerArray[i].layerID.split("_")[1] == "VIRESCENCE"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeVirescence = meshCodes[s] + "5"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeVirescence) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
		if(layerArray[i].layerID.split("_")[1] == "RIVER_SYSTEM"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeRiverSystem = meshCodes[s] + "6"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeRiverSystem) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
		if(layerArray[i].layerID.split("_")[1] == "FACILITY"){
			for(var s = 0;s<meshCodes.length-1;s++){
				var meshCodeFacility = meshCodes[s] + "7"; 
				if(layerArray[i].layerID.split("_").length > 2){
					if(layerArray[i].layerID.split("_")[2].indexOf(meshCodeFacility) != -1){
						ids += (layerArray[i].modelLayer.getlayerid() + ",");
					}
				}
			}
		}
	}
//	if(xihuOBJ != null){
//		ids += xihuOBJ.GetLayerID();
//		ids += ",";
//    }
//	if(bingjiangOBJ != null){
//		ids += bingjiangOBJ.GetLayerID();
//		ids += ",";
//	}
	ids = ids.substring(0,ids.length-1);
	if(areaHidding != null){
		map3D.removelayer(areaHidding);
		areaHidding = null;
	}
	setTimeout(
		areaHidding = map3D.CreateAreaHidding({PointsIndex:(pointArr.length - 1),Points:Points,LayersID:ids})
	,300);
}
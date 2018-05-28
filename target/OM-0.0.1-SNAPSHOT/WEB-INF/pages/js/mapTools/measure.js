/** 测量功能 */
	var verticalLayers = horizontalLayers = distanceLayers = areaLayers = surfaceAreaLayers =[];
	function measure(id){
	switch(id){
	case 0:
		delMeasure();
		break;	
	//水平测量
	 case 1:
		var measure = map3D.addSphereMeasure(1);
		horizontalLayers.push(measure);
		break;
	//垂直测量
	case 2:
		var measure = map3D.addSphereMeasure(2);
		verticalLayers.push(measure);
		break;
	//距离测量 
	case 3:
		var measure = map3D.addSphereMeasure(3);
		distanceLayers.push(measure);
		break;
	//面积测量
	case 4:
		var measure = map3D.addSphereMeasure(4);
		areaLayers.push(measure);
		break;
	case 5:
		var measure = map3D.addSphereMeasure(5);
		surfaceAreaLayers.push(measure);
		break;
	default:
		break;
	}
	
	//清除测量
	function delMeasure() {
			if(verticalLayers != null || verticalLayers != undefined) {
        for(var i = 0 ; i<verticalLayers.length ; i++){
          map3D.removelayer(verticalLayers[i]);
        }		
			}
			if(horizontalLayers != null || horizontalLayers != undefined) {
         for(var i = 0 ; i<horizontalLayers.length ; i++){
          map3D.removelayer(horizontalLayers[i]);
        } 
			}
			if(distanceLayers != null || distanceLayers != undefined) {
         for(var i = 0 ; i<distanceLayers.length ; i++){
          map3D.removelayer(distanceLayers[i]);
        } 	
			}
      if(areaLayers != null || areaLayers != undefined) {
         for(var i = 0 ; i<areaLayers.length ; i++){
          map3D.removelayer(areaLayers[i]);
        }   
      }
	  if(surfaceAreaLayers != null || surfaceAreaLayers != undefined) {
         for(var i = 0 ; i<surfaceAreaLayers.length ; i++){
          map3D.removelayer(surfaceAreaLayers[i]);
        }   
      }
		}
};

	var fireLayer = new Array();
	var fountainLayer = new Array();
	var hydraulicGiantLayer = new Array();
    var pointList = new Array();
	/** 火焰特效*/
      function addFire(){
          SDKevent.attachEvent("FireOnLButtonUp",getXYZ1);
      }
      function getXYZ1(x,y){
          var tmpLayer = map3D.createFire({
                  screenX:x,
                  screenY:y
              });
          fireLayer.unshift(tmpLayer);
          SDKevent.detachEvent("FireOnLButtonUp",getXYZ1);
      }
      function removeFire(){
          while(fireLayer.length > 0){
              map3D.removelayer(fireLayer.pop());
          }
      }
	  
	  /** 喷泉特效*/
	  function addFountain(){
          SDKevent.attachEvent("FireOnLButtonUp",getXYZ2);
      }
      function getXYZ2(x,y){
          var tmpLayer = map3D.createFountain({
                  screenX:x,
                  screenY:y
              });
          fountainLayer.unshift(tmpLayer);
          SDKevent.detachEvent("FireOnLButtonUp",getXYZ2);
      }
      function removeFountain(){
          while(fountainLayer.length > 0){
              map3D.removelayer(fountainLayer.pop());
          }
      }
	  /** 水枪特效 */
	  function addHydraulicGiant(){
          SDKevent.attachEvent("FireOnLButtonUp",getXYZ3);
      }
      function getXYZ3(x,y){
          var point = map3D.coordTransformation(3,{screenX:x,screenY:y});
          pointList.unshift(point);
          if(pointList.length == 2){
              var start = pointList.pop().split(",");
              var end = pointList.pop().split(",");
              var tmpLayer = map3D.createHydraulicGiant({
                  startPointLon:start[0],
                  startPointLat:start[1],
                  startPointHeight:start[2],
                  endPointLon:end[0],
                  endPointLat:end[1],
                  endPointHeight:end[2]
              });
              hydraulicGiantLayer.unshift(tmpLayer);
              SDKevent.detachEvent("FireOnLButtonUp",getXYZ3);
          }
      } 
	  function removeHydraulicGiant(){
          while(hydraulicGiantLayer.length > 0){
              map3D.removelayer(hydraulicGiantLayer.pop());
          }
      }
	  
	  /** 雾效 */
      function fog(){
          map3D.setFog({
              fogStatus:true,
              fogColor:"0.9,0.8,0.3",
              fogDensity:"0.5"
        });
      }
	  function clearFog(){
          map3D.setFog({
              fogStatus:false,
			  fogColor:"0.9,0.8,0.3",
              fogDensity:"0.5"
        });
      }
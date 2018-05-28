	/** 漫游模式 */
	function roamMode(type){
		if(type =="onWalk"){
			map3D.createRoamMode("OnWalk");
		}else if(type =="onDrive"){
			map3D.createRoamMode("OnDrive");
		}else if(type =="onFly"){
			map3D.createRoamMode("OnFly");
		}else if(type =="clearRoamMode"){
			map3D.destroyRoamMode();
		}
	}
	
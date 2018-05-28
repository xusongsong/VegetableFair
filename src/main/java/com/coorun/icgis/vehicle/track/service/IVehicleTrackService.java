package com.coorun.icgis.vehicle.track.service;

import java.util.List;

import com.coorun.icgis.jites.vehicle.api.vo.CarInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleTrailInfo;

public interface IVehicleTrackService {
	
	public List<CarInfo> vehicleGetPlates(String communityId,String carId) throws Exception;

	public List<VehicleTrailInfo> vehicleTrailInfo(String uuid,String carId,String start,String end) throws Exception;
}

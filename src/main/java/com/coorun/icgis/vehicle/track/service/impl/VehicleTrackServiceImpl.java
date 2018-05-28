package com.coorun.icgis.vehicle.track.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.vehicle.api.client.VehicleClient;
import com.coorun.icgis.jites.vehicle.api.vo.CarInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleTrailInfo;
import com.coorun.icgis.vehicle.track.service.IVehicleTrackService;

@Service
public class VehicleTrackServiceImpl implements IVehicleTrackService {
	
	@Override
	public List<CarInfo> vehicleGetPlates(String communityId, String carId) throws Exception {
		return VehicleClient.vehicleGetPlates(communityId, carId);
	}

	@Override
	public List<VehicleTrailInfo> vehicleTrailInfo(String uuid, String carId, String start, String end)
			throws Exception {
		return VehicleClient.vehicleTrailInfo(uuid, carId, start, end);
	}

}

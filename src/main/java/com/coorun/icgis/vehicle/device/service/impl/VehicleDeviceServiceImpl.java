package com.coorun.icgis.vehicle.device.service.impl;

import java.util.List;

import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.vehicle.api.client.VehicleClient;
import com.coorun.icgis.jites.vehicle.api.vo.CarInfo;
import com.coorun.icgis.jites.vehicle.api.vo.TrafficFlowInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecord;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecordRequest;
import com.coorun.icgis.vehicle.device.service.IVehicleDeviceService;

@Service
public class VehicleDeviceServiceImpl implements IVehicleDeviceService {

	@Override
	public List<Children> vehicleDeviceInfo(String communityIds) throws Exception {
		return VehicleClient.vehicleDeviceInfo(communityIds);
	}


	@Override
	public TrafficFlowInfo vehicleTrafficFlow(String communityIds) throws Exception {
		return VehicleClient.vehicleTrafficFlow(communityIds);
	}

	@Override
	public List<VehicleAccessRecord> vehicleDeviceRecord(VehicleAccessRecordRequest accessRecordRequest)
			throws Exception {
		return VehicleClient.vehicleDeviceRecord(accessRecordRequest);
	}

	@Override
	public String vehicleVedioPic(String id) throws Exception {
		return VehicleClient.vehicleVedioPic(id);
	}

}

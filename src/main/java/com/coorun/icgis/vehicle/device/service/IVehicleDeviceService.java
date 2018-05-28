package com.coorun.icgis.vehicle.device.service;

import java.util.List;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.vehicle.api.vo.TrafficFlowInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecord;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecordRequest;

public interface IVehicleDeviceService {

	public List<Children> vehicleDeviceInfo(String communityIds)throws Exception;
	
	public TrafficFlowInfo vehicleTrafficFlow(String communityIds) throws Exception;
	
	public List<VehicleAccessRecord> vehicleDeviceRecord(VehicleAccessRecordRequest accessRecordRequest) throws Exception;
	
	public String vehicleVedioPic(String id)throws Exception;
}

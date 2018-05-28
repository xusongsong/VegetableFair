package com.coorun.icgis.vehicle.device.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.bean.vo.Children;
import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.vehicle.api.vo.TrafficFlowInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecord;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleAccessRecordRequest;
import com.coorun.icgis.vehicle.device.service.IVehicleDeviceService;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/vehicle/device")
public class VehicleDeviceController {

	@Resource
	private IVehicleDeviceService vehicleDeviceService;
	
	/**
	 * 车辆设备信息列表
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/info", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> vehicleDeviceInfo(
			@ApiParam(value = "communityIds", required = true) @ValidateParam({Validator.NOT_BLANK}) String communityIds,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<Children> vehicleDeviceInfo = vehicleDeviceService.vehicleDeviceInfo(communityIds);
		retResult.setRecord(vehicleDeviceInfo);
		return retResult;
	}
	
	
	
	
	/**
	 * 获取今天的车流量信息（如果为零，则今天没有车流量记录）
	 * @param communityId
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/flow", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> vehicleTrafficFlow(
			@ApiParam(value = "communityId", required = true) @ValidateParam({Validator.NOT_BLANK}) String communityId,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		TrafficFlowInfo vehicleTrafficFlow = vehicleDeviceService.vehicleTrafficFlow(communityId);
		retResult.setRecord(vehicleTrafficFlow);
		return retResult;
	}
	
	

	/**
	 * 车辆识别记录列表
	 * 
	 * @param request
	 * @return RetResult<Object>
	 */
	@RequestMapping(value = "/record", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> vehicleDeviceRecord(
			VehicleAccessRecordRequest accessRecordRequest,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<VehicleAccessRecord> vehicleDeviceRecord = vehicleDeviceService.vehicleDeviceRecord(accessRecordRequest);
		retResult.setRecord(vehicleDeviceRecord);
		return retResult;
	}

	
	
	/**
	 * 获取车辆记录的视频截图
	 * @param id  车辆记录id
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/pic", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> vehicleVedioPic(
			@ApiParam(value = "id", required = true) @ValidateParam({Validator.NOT_BLANK}) String id,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		String vehicleVedioPic = vehicleDeviceService.vehicleVedioPic(id);
		retResult.setRecord(vehicleVedioPic);
		return retResult;
	}
	
	
	
	
	/**
	 * 跳转车辆管理
	 * @return
	 */
	@RequestMapping(value = "/vehicle.do",method = {RequestMethod.GET,RequestMethod.POST})
	public String getVehicle() {
		return "iframe/vehicle";
	}
}

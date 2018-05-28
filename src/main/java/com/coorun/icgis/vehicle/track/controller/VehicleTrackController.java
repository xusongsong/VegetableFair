package com.coorun.icgis.vehicle.track.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.vehicle.api.vo.CarInfo;
import com.coorun.icgis.jites.vehicle.api.vo.VehicleTrailInfo;
import com.coorun.icgis.vehicle.track.service.IVehicleTrackService;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/vehicle/track")
public class VehicleTrackController {

	@Resource
	private IVehicleTrackService vehicleTrackService;
	
	
	/**
	 * 根据车牌获取车辆信息
	 * @param communityId
	 * @param carId 车牌号（模糊查询）
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/getPlates", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> vehicleGetPlates(
			@ApiParam(value = "communityId", required = true) @ValidateParam({Validator.NOT_BLANK}) String communityId,
			@ApiParam(value = "carId", required = true) @ValidateParam({Validator.NOT_BLANK}) String carId,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<CarInfo> vehicleGetPlates = vehicleTrackService.vehicleGetPlates(communityId,carId);
		retResult.setRecord(vehicleGetPlates);
		return retResult;
	}
	
	
	
	/**
	 * 统计车辆轨迹
	 * @param uuid
	 * @param carId  车牌
	 * @param start  开始时间
	 * @param end  停止时间
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/info", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> vehicleDeviceInfo(
			@ApiParam(value = "uuid", required = true) @ValidateParam({Validator.NOT_BLANK}) String uuid,
			@ApiParam(value = "carId", required = true) @ValidateParam({Validator.NOT_BLANK}) String carId,
			@ApiParam(value = "start", required = false) @ValidateParam({Validator.NOT_BLANK}) String start,
			@ApiParam(value = "end", required = false) @ValidateParam({Validator.NOT_BLANK}) String end,
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<VehicleTrailInfo> vehicleTrailInfo = vehicleTrackService.vehicleTrailInfo(uuid, carId, start, end);
		retResult.setRecord(vehicleTrailInfo);
		return retResult;
	}

}

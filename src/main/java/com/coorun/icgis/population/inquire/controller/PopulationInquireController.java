package com.coorun.icgis.population.inquire.controller;

import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.icgis.jites.common.validator.Validator;
import com.coorun.icgis.jites.common.validator.annotation.ValidateParam;
import com.coorun.icgis.jites.geodo.api.bean.BuildingInfo;
import com.coorun.icgis.jites.geodo.api.bean.FamilyPeopleInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonInfo;
import com.coorun.icgis.jites.geodo.api.client.GeodoClient;
import com.coorun.icgis.jites.geodo.api.response.CommunityTreeInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.PersonHourseInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.PersonInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.SnameHourseInfoResponse;
import com.coorun.icgis.population.inquire.service.IPopulationInquireService;
import com.coorun.util.RetResult;
import com.wordnik.swagger.annotations.ApiParam;

@Controller
@RequestMapping("/population/inquire")
public class PopulationInquireController {

	@Resource
	private IPopulationInquireService populationInquireService;
	
	// 跳转房屋详情页面
	@RequestMapping(value = "hourseDetail.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json;charset=UTF-8")
	public String hourseDetailJSP(HttpServletRequest request) throws Exception {
	    return "iframe/hourseDetail" ;
	} 
	
	// 跳转房屋详情页面
	@RequestMapping(value = "personDetail.do", method = { RequestMethod.GET, RequestMethod.POST }, produces = "application/json;charset=UTF-8")
	public String personDetailJSP(String token, String id, String address, HttpServletRequest request) throws Exception {
		if (!StringUtils.isBlank(id)) {
			List<PersonInfo> infos = populationInquireService.getPopulationPersonDetailInfo(token, id);
			if (infos != null && infos.size() > 0) {
				String name = infos.get(0).getName();
				String sex = infos.get(0).getSex();
				Integer age = infos.get(0).getAge();
				String nation = infos.get(0).getNation();
				String tel = infos.get(0).getTel();
				request.setAttribute("pname", name);
				request.setAttribute("psex", sex);
				request.setAttribute("page", age);
				request.setAttribute("pnation", nation);
				request.setAttribute("ptel", tel);
				request.setAttribute("paddress", address);
			}
		}
		return "iframe/personDetail" ;
	} 
	
	
	
	/**
	 * 人员信息查询（以人查房）
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/info/person", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationInquireInfoPerson(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			String condition, HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
///		List<PersonInfoResponse> queryPopulationPersonList = populationInquireService.queryPopulationPersonList(token, condition);
		retResult.setMsg("没有查询到相关人员信息");
		List<PersonHourseInfoResponse> queryPopulationPersonHourse = populationInquireService.queryPopulationPersonHourse(token, condition);
		if (queryPopulationPersonHourse != null && queryPopulationPersonHourse.size() > 0) {
			retResult.setMsg("人、屋数据获取");
			retResult.setRecord(queryPopulationPersonHourse);
		}
		return retResult;
	}
	
	/**
	 * 建筑信息查询（以房查人）
	 * 
	 * @param request
	 * @return RetResult<Pager<Object>>
	 */
	@RequestMapping(value = "/info/building", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationInquireInfoBuilding(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			@ApiParam(value = "condition", required = true) @ValidateParam({Validator.NOT_BLANK}) String condition, HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
///		List<BuildingInfo> buildingInfos = GeodoClient.geoDoPopulationBuildingInfo(token, null);
		retResult.setMsg("没有查询到相关信息");
		List<SnameHourseInfoResponse> building = populationInquireService.queryPopulationBuildingPersonInfo(token, condition);
		if (building != null && building.size() > 0) {
			retResult.setMsg("房查人数据获取");
			retResult.setRecord(building);
		}
		
		return retResult;
	}
	

	/**
	 * 以人查询家庭成员
	 * @param token
	 * @param familyCode
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/info/familyPeople", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> familyPeople(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			@ApiParam(value = "familyCode", required = true) @ValidateParam({Validator.NOT_BLANK}) String familyCode, 
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("没有查询到相关信息");
		List<FamilyPeopleInfo> retList = populationInquireService.queryPopulationFamilyPeopleInfo(token, familyCode);
		if (retList != null && retList.size() > 0) {
			retResult.setMsg("家庭成员列表");
			retResult.setRecord(retList);
		}
		return retResult;
	}
	
	/**
	 * 获取房屋详细信息
	 * @param token
	 * @param familyCode
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/info/hourseDetail", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> hourseDetail(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			@ApiParam(value = "bname", required = true) @ValidateParam({Validator.NOT_BLANK}) String bname, 
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("没有查询到相关信息");
		List<BuildingInfo> retList = populationInquireService.getPopulationHourseDetailInfo(token, bname);
		if (retList != null && retList.size() > 0) {
			retResult.setMsg("房屋详细信息");
			retResult.setRecord(retList);
		}
		return retResult;
	}
	
	/**
	 * 获取人员详细信息
	 * @param token
	 * @param id
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/info/personDetail", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> personDetail(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token,
			@ApiParam(value = "id", required = true) @ValidateParam({Validator.NOT_BLANK}) String id, 
			HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		retResult.setMsg("没有查询到相关信息");
		List<PersonInfo> retList = populationInquireService.getPopulationPersonDetailInfo(token, id);
		if (retList != null && retList.size() > 0) {
			retResult.setMsg("人员详细信息");
			retResult.setRecord(retList);
		}
		return retResult;
	}
	
	/**
	 * 社区楼号单元数结构
	 * @param token
	 * @param request
	 * @return
	 * @throws Exception
	 */
	@RequestMapping(value = "/info/tree", method = { RequestMethod.GET, RequestMethod.POST })
	@ResponseBody
	public RetResult<Object> populationInquireInfoTree(
			@ApiParam(value = "token", required = true) @ValidateParam({Validator.NOT_BLANK}) String token
			,HttpServletRequest request) throws Exception {
		RetResult<Object> retResult = new RetResult<Object>();
		List<CommunityTreeInfoResponse> tree = populationInquireService.getPopulationInquireInfoTree(token);
		retResult.setRecord(tree);
		return retResult;
	}
}

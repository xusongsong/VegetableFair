package com.coorun.icgis.population.inquire.service;

import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.BuildingInfo;
import com.coorun.icgis.jites.geodo.api.bean.FamilyPeopleInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonInfo;
import com.coorun.icgis.jites.geodo.api.response.CommunityTreeInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.PersonHourseInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.SnameHourseInfoResponse;

public interface IPopulationInquireService {
	
	/**
	 * 人口数据获取
	 * @param token
	 * @param condition
	 * @return
	 * @throws Exception
	 */
//	public List<PersonInfoResponse> queryPopulationPersonList(String token, String condition) throws Exception;
	
	/**
	 * 人查房接口
	 * @param token
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public List<PersonHourseInfoResponse> queryPopulationPersonHourse(String token, String condition) throws Exception;
	
	
	/**
	 * 房查人
	 * @param token
	 * @param condition
	 * @return
	 * @throws Exception
	 */
	public List<SnameHourseInfoResponse> queryPopulationBuildingPersonInfo(String token, String condition) throws Exception;
	
	
	/**
	 * 以人查询家庭成员
	 * @param token
	 * @param familyCode
	 * @return
	 * @throws Exception
	 */
	public List<FamilyPeopleInfo> queryPopulationFamilyPeopleInfo(String token, String familyCode) throws Exception;
	
	/**
	 * 获取建筑房屋详细信息
	 * @param token
	 * @param bname
	 * @return
	 * @throws Exception
	 */
	public List<BuildingInfo> getPopulationHourseDetailInfo(String token, String bname) throws Exception;
	
	/**
	 * 查询人员详细信息
	 * @param token
	 * @param id
	 * @return
	 * @throws Exception
	 */
	public List<PersonInfo> getPopulationPersonDetailInfo(String token, String id) throws Exception;
	
	/**
	 * 社区楼号单元数结构
	 * @param token
	 * @return
	 * @throws Exception
	 */
	public List<CommunityTreeInfoResponse> getPopulationInquireInfoTree(String token) throws Exception;
}

package com.coorun.icgis.population.inquire.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.coorun.icgis.jites.geodo.api.bean.BuildingInfo;
import com.coorun.icgis.jites.geodo.api.bean.FamilyPeopleInfo;
import com.coorun.icgis.jites.geodo.api.bean.PeopleHourseInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonImageInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonInfo;
import com.coorun.icgis.jites.geodo.api.bean.SnameHourseInfo;
import com.coorun.icgis.jites.geodo.api.client.GeodoClient;
import com.coorun.icgis.jites.geodo.api.response.CommunityTreeInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.PersonHourseInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.PersonInfoResponse;
import com.coorun.icgis.jites.geodo.api.response.SnameHourseInfoResponse;
import com.coorun.icgis.population.inquire.service.IPopulationInquireService;

@Service
public class PopulationInquireServiceImpl implements IPopulationInquireService {


	/// 人口数据获取接口（老接口-弃用）
//	@Override
//	public List<PersonInfoResponse> queryPopulationPersonList(String token, String condition) throws Exception {
//		List<PersonInfoResponse> personInfoResponses = new ArrayList<>();
//		String params = "";
//		if (!StringUtils.isBlank(condition)) {
//			params = String.format("name='%s' or identification='%s'", condition,condition);
//		}
//		List<PersonInfo> personInfos = GeodoClient.geoDoPopulationPersonInfo(token, params);
//		if (personInfos != null && personInfos.size() >0 ) {
//			// 本地分页初始化十条
////			Pager<PersonInfo> pager = new Pager<>(personInfos, personInfos.size(), 1, 10);
//			
//			// 首次返回 10 条数据
//			int length = personInfos.size();
//			if (StringUtils.isBlank(condition)) {
//				if (personInfos.size() > 10) {
//					length = 10;
//				}
//			}
//			// 获取人口免冠照片
//			for (int i = 0; i < length; i++) {
//				String photoId = personInfos.get(i).getPhoto_imgid();
//				List<PersonImageInfo> imageInfos = null;
//				if (!StringUtils.isBlank(photoId)) {
//					String photoParams = String.format("id='%s'", photoId);
//					imageInfos = GeodoClient.geoDoPopulationPersonImageInfo(token, photoParams);
//				}
//				personInfoResponses.add(new PersonInfoResponse(personInfos.get(i), imageInfos));
//			}
//		}
//		return personInfoResponses;
//	}
	
	
	@Override
	public List<PersonHourseInfoResponse> queryPopulationPersonHourse(String token, String condition) throws Exception {
		List<PersonHourseInfoResponse> retList = null;
		String params = "";
		if (!StringUtils.isBlank(condition)) {
			params = String.format("(p.name like '%s' or p.identification like '%s') and sb.communityid=53", condition,condition);
		}
		List<PeopleHourseInfo> phList = GeodoClient.geoDoPopulationPersonHourseInfo(token, params);
		if (phList != null && phList.size() > 0) {
			retList = new ArrayList<>();
			for (PeopleHourseInfo ph : phList) {
				String hourseNum = ph.getBname().substring(ph.getBname().length() - 4);
				String address = ph.getCname() + ph.getSname() + ph.getUnitnum() + hourseNum;
				ph.setAddressDetail(address);
				// 获取人口免冠照片
				String photoId = ph.getPhoto_imgid();
				if (StringUtils.isBlank(photoId)) {
					photoId = ph.getSfz_zm_imgid();
				}
				if (StringUtils.isBlank(photoId)) {
					photoId = ph.getSfz_fm_imgid();
				}
				List<PersonImageInfo> imageInfos = null;
				if (!StringUtils.isBlank(photoId)) {
					String photoParams = String.format("id='%s'", photoId);
					imageInfos = GeodoClient.geoDoPopulationPersonImageInfo(token, photoParams);
				}
				retList.add(new PersonHourseInfoResponse(ph, imageInfos));
			}
		}
		return retList;
	}

	
	@Override
	public List<SnameHourseInfoResponse> queryPopulationBuildingPersonInfo(String token, String condition) throws Exception {
		List<SnameHourseInfoResponse> retList = null;
		String params = "";
		if (!StringUtils.isBlank(condition)) {
			params = String.format("sname='%s'", condition);
		}
		List<SnameHourseInfo> geoSnameHourse = GeodoClient.geoDoPopulationSnameHourseInfo(token, params);
		if (geoSnameHourse != null && geoSnameHourse.size() > 0) {
			retList = new ArrayList<>();
			for (SnameHourseInfo sh : geoSnameHourse) {
				String hourseNum = sh.getBname().substring(sh.getBname().length() - 4);
				String address = sh.getCname() + sh.getSname() + sh.getUnitnum() + hourseNum;
				sh.setAddressDetail(address);
				// 获取人口免冠照片
				String photoId = sh.getPhoto_imgid();
				if (StringUtils.isBlank(photoId)) {
					photoId = sh.getSfz_zm_imgid();
				}
				if (StringUtils.isBlank(photoId)) {
					photoId = sh.getSfz_fm_imgid();
				}
				List<PersonImageInfo> imageInfos = null;
				if (!StringUtils.isBlank(photoId)) {
					String photoParams = String.format("id='%s'", photoId);
					imageInfos = GeodoClient.geoDoPopulationPersonImageInfo(token, photoParams);
				}
				retList.add(new SnameHourseInfoResponse(sh, imageInfos));
				
			}
		}
		return retList;
	}
	
	

	@Override
	public List<FamilyPeopleInfo> queryPopulationFamilyPeopleInfo(String token, String familyCode) throws Exception {
		List<FamilyPeopleInfo> retList = null;
		String params = "";
		if (!StringUtils.isBlank(familyCode)) {
			params = String.format("c.uuid='660f3afb-0abb-4254-8cc7-f866e36293ad' and pf.familycode='%s'", familyCode);
		}
		List<FamilyPeopleInfo> familyPeopleInfos = GeodoClient.geoDoPopulationFamilyPeople(token, params);
		if (familyPeopleInfos != null && familyPeopleInfos.size() > 0) {
			retList = familyPeopleInfos;
		}
		return retList;
	}

	
	@Override
	public List<BuildingInfo> getPopulationHourseDetailInfo(String token, String bname) throws Exception {
		List<BuildingInfo> retList = null;
		String params = "";
		if (!StringUtils.isBlank(bname)) {
			params = String.format("name='%s'", bname);
		}
		List<BuildingInfo> buildingInfos = GeodoClient.geoDoPopulationBuildingInfo(token, params);
		if (buildingInfos != null && buildingInfos.size() > 0) {
			retList = buildingInfos;
		}
		return retList;
	}


	@Override
	public List<PersonInfo> getPopulationPersonDetailInfo(String token, String id) throws Exception {
		List<PersonInfo> retList= null;
		String params = "";
		if (!StringUtils.isBlank(id)) {
			params = String.format("id='%s'", id);
		}
		List<PersonInfo> personInfos = GeodoClient.geoDoPopulationPersonInfo(token, params);
		if (personInfos != null && personInfos.size() > 0) {
			retList = personInfos;
		}
		return retList;
	}

	@Override
	public List<CommunityTreeInfoResponse> getPopulationInquireInfoTree(String token) throws Exception {
		List<CommunityTreeInfoResponse> treeInfoResponses  = GeodoClient.geoDoPopulationCommunityTree();
		return treeInfoResponses;
	}

}

package com.coorun.icgis.jites.geodo.api.response;

import java.io.Serializable;
import java.util.List;
import com.coorun.icgis.jites.geodo.api.bean.PersonImageInfo;
import com.coorun.icgis.jites.geodo.api.bean.SnameHourseInfo;

public class SnameHourseInfoResponse implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1944153163914557686L;
	
	private SnameHourseInfo snameHourseInfo;
	private List<PersonImageInfo> personImageInfo;
	
	public SnameHourseInfoResponse() {
		super();
	}
	public SnameHourseInfoResponse(SnameHourseInfo snameHourseInfo, List<PersonImageInfo> personImageInfo) {
		super();
		this.snameHourseInfo = snameHourseInfo;
		this.personImageInfo = personImageInfo;
	}
	public SnameHourseInfo getSnameHourseInfo() {
		return snameHourseInfo;
	}
	public void setSnameHourseInfo(SnameHourseInfo snameHourseInfo) {
		this.snameHourseInfo = snameHourseInfo;
	}
	public List<PersonImageInfo> getPersonImageInfo() {
		return personImageInfo;
	}
	public void setPersonImageInfo(List<PersonImageInfo> personImageInfo) {
		this.personImageInfo = personImageInfo;
	}
	
}

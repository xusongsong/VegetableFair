package com.coorun.icgis.jites.geodo.api.response;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.PeopleHourseInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonImageInfo;

public class PersonHourseInfoResponse implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1476780904997835940L;
	
	private PeopleHourseInfo peopleHourseInfo;
	private List<PersonImageInfo> personImageInfo;
	
	public PersonHourseInfoResponse() {
		super();
	}

	public PersonHourseInfoResponse(PeopleHourseInfo peopleHourseInfo, List<PersonImageInfo> personImageInfo) {
		super();
		this.peopleHourseInfo = peopleHourseInfo;
		this.personImageInfo = personImageInfo;
	}



	public PeopleHourseInfo getPeopleHourseInfo() {
		return peopleHourseInfo;
	}

	public void setPeopleHourseInfo(PeopleHourseInfo peopleHourseInfo) {
		this.peopleHourseInfo = peopleHourseInfo;
	}

	public List<PersonImageInfo> getPersonImageInfo() {
		return personImageInfo;
	}

	public void setPersonImageInfo(List<PersonImageInfo> personImageInfo) {
		this.personImageInfo = personImageInfo;
	}
	
}

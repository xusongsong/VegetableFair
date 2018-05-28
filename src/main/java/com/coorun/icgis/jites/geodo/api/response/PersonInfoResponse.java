package com.coorun.icgis.jites.geodo.api.response;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.PersonImageInfo;
import com.coorun.icgis.jites.geodo.api.bean.PersonInfo;

public class PersonInfoResponse implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1798195690317989895L;

	private PersonInfo personInfo;
	private List<PersonImageInfo> personImageInfo;
	
	
	public PersonInfoResponse(PersonInfo personInfo, List<PersonImageInfo> personImageInfo) {
		super();
		this.personInfo = personInfo;
		this.personImageInfo = personImageInfo;
	}
	
	public PersonInfoResponse() {
		super();
	}
	public PersonInfo getPersonInfo() {
		return personInfo;
	}
	public void setPersonInfo(PersonInfo personInfo) {
		this.personInfo = personInfo;
	}
	public List<PersonImageInfo> getPersonImageInfo() {
		return personImageInfo;
	}
	public void setPersonImageInfo(List<PersonImageInfo> personImageInfo) {
		this.personImageInfo = personImageInfo;
	}
}

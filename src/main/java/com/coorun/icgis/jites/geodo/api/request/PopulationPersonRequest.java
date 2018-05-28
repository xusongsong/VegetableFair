package com.coorun.icgis.jites.geodo.api.request;

import java.io.Serializable;

public class PopulationPersonRequest implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 8497201252413930796L;
	
	private String name;
	private String identification;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIdentification() {
		return identification;
	}
	public void setIdentification(String identification) {
		this.identification = identification;
	}
	
}

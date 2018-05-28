package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class NameValuedSingleInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -1617535942858142149L;
	
	private String name;
	private String value;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
}

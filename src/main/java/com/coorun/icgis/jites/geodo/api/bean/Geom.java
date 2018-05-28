package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class Geom implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 2489716448958064658L;
	private String type;
	private String value;
	
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	
}

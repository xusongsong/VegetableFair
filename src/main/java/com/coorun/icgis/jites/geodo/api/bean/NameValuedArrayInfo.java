package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;
import java.util.List;

public class NameValuedArrayInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 9192306418380726544L;

	private String name;
	private List<Integer[]> value;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Integer[]> getValue() {
		return value;
	}
	public void setValue(List<Integer[]> value) {
		this.value = value;
	}
	
}

package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class CensusItemInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -1941136399747112846L;
	
	private String name;
	private String it1;
	private String it2;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getIt1() {
		return it1;
	}
	public void setIt1(String it1) {
		this.it1 = it1;
	}
	public String getIt2() {
		return it2;
	}
	public void setIt2(String it2) {
		this.it2 = it2;
	}
	
}

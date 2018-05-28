package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class CommunityUnitPeopleInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -9091513889674095109L;
	
	private String name;
	private String sname;
	private String unitnum;
	private String count;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSname() {
		return sname;
	}
	public void setSname(String sname) {
		this.sname = sname;
	}
	public String getUnitnum() {
		return unitnum;
	}
	public void setUnitnum(String unitnum) {
		this.unitnum = unitnum;
	}
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	
}

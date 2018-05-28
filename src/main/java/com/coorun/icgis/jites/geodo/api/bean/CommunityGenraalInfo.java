package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class CommunityGenraalInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -2127705703368438891L;
	// 社区名称
	private String name;
	// 楼号id
	private String sname; 
	// 总人数
	private String count;
	
	// 总户数
	private String count2;
	// 楼号名称
	private String sname2;
	
	
	public CommunityGenraalInfo() {
		super();
	}
	
	public CommunityGenraalInfo(String name, String sname, String count, String count2, String sname2) {
		super();
		this.name = name;
		this.sname = sname;
		this.count = count;
		this.count2 = count2;
		this.sname2 = sname2;
	}

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
	public String getCount() {
		return count;
	}
	public void setCount(String count) {
		this.count = count;
	}
	public String getCount2() {
		return count2;
	}
	public void setCount2(String count2) {
		this.count2 = count2;
	}
	public String getSname2() {
		return sname2;
	}
	public void setSname2(String sname2) {
		this.sname2 = sname2;
	}
}

package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class CommunityTreeInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 3704421366146739394L;
	
	private String id;
	private String name;
	private String pid;
	private String pname;
	
	
	
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	
}

package com.coorun.test;

import java.io.Serializable;
import java.util.List;

public class Children implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -911934274892298711L;
	private String id;
	private String name;
	private String longitude;
	private String latitude;
	private List<Children> children;
		
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
	public String getLongitude() {
		return longitude;
	}
	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}
	public String getLatitude() {
		return latitude;
	}
	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}
	public List<Children> getChildren() {
		return children;
	}
	public void setChildren(List<Children> children) {
		this.children = children;
	}

}

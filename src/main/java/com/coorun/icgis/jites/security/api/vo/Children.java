package com.coorun.icgis.jites.security.api.vo;


import java.io.Serializable;
import java.util.List;

public class Children implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 5574203114410686425L;
	
	private String id;
	
	private String name;
	
	private List<Children> children;
	
	private String longitude;
	
	private String latitude;

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

	public List<Children> getChildren() {
		return children;
	}

	public void setChildren(List<Children> children) {
		this.children = children;
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
	
	
	

}

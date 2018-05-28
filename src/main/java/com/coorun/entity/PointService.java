package com.coorun.entity;

/********************************
 *
 * Author		: Billy
 * Create Date	: 2017-8-24下午5:56:56
 * Desc			:
 *
 ********************************/

public class PointService {
	
	private String id;
	private String name;
	
	private String type;

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

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	@Override
	public String toString() {
		return "PointService [id=" + id + ", name=" + name + ", type=" + type
				+ "]";
	}
	

}

package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;

public class PersonImageInfo implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = -7110438239585663307L;
	
	private String id;
	private String imgurl;
	private String objid;
	private String type;
	public String getId() {
		return id;
	}
	public void setId(String id) {
		this.id = id;
	}
	public String getImgurl() {
		return imgurl;
	}
	public void setImgurl(String imgurl) {
		this.imgurl = imgurl;
	}
	public String getObjid() {
		return objid;
	}
	public void setObjid(String objid) {
		this.objid = objid;
	}
	public String getType() {
		return type;
	}
	public void setType(String type) {
		this.type = type;
	}
	
	
}

package com.coorun.icgis.jites.geodo.api.response;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.HealthItemInfo;

public class HealthItemInfoResponse implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 1180169176727303159L;
	
	private List<String> fields;
	private List<HealthItemInfo> healthItemInfos;
	
	public List<String> getFields() {
		return fields;
	}
	public void setFields(List<String> fields) {
		this.fields = fields;
	}
	public List<HealthItemInfo> getHealthItemInfos() {
		return healthItemInfos;
	}
	public void setHealthItemInfos(List<HealthItemInfo> healthItemInfos) {
		this.healthItemInfos = healthItemInfos;
	}
	
	
}

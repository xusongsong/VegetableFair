package com.coorun.icgis.population.health.model;

import java.io.Serializable;
import java.util.List;

public class LineChatResponse implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = -6845632898011719933L;
	
	private List<String> years; 
	private List<NameDataArray> dataArrays;
	
	public List<String> getYears() {
		return years;
	}
	public void setYears(List<String> years) {
		this.years = years;
	}
	public List<NameDataArray> getDataArrays() {
		return dataArrays;
	}
	public void setDataArrays(List<NameDataArray> dataArrays) {
		this.dataArrays = dataArrays;
	}
}

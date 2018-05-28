package com.coorun.icgis.population.health.model;

import java.io.Serializable;
import java.util.List;

public class NameDataArray implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 5037184750896429194L;
	private String name;
	private List<Integer> datas;
	
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public List<Integer> getDatas() {
		return datas;
	}
	public void setDatas(List<Integer> datas) {
		this.datas = datas;
	}
}

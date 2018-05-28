package com.coorun.entity;

/**
 * 图层对象,封装数据对象
 * 
 * @author cd
 * @createDate 2017-09-20
 */
public class Layer {
	//图层唯一ID
	private String layerID;
	//城市编号
	private String cityID;
	//要素ID
	private String featureID;
	//上级ID
	private String parentID;
	//图层名称
	private String layerName;
	//图层类型
	private String layerType;
	//路径
	private String path;
	//所在层级
	private String level;
	
	public Layer() {
		
	}

	public Layer(String layerID, String cityID, String featureID, String parentID, String layerName, String layerType, String path) {
		this.layerID = layerID;
		this.cityID = cityID;
		this.featureID = featureID;
		this.parentID = parentID;
		this.layerName = layerName;
		this.layerType = layerType;
		this.path = path;
	}
	
	public String getLayerID() {
		return layerID;
	}
	public void setLayerID(String layerID) {
		this.layerID = layerID;
	}
	public String getCityID() {
		return cityID;
	}
	public void setCityID(String cityID) {
		this.cityID = cityID;
	}
	public String getFeatureID() {
		return featureID;
	}
	public void setFeatureID(String featureID) {
		this.featureID = featureID;
	}
	public String getParentID() {
		return parentID;
	}
	public void setParentID(String parentID) {
		this.parentID = parentID;
	}
	public String getLayerName() {
		return layerName;
	}
	public void setLayerName(String layerName) {
		this.layerName = layerName;
	}
	public String getLayerType() {
		return layerType;
	}
	public void setLayerType(String layerType) {
		this.layerType = layerType;
	}
	public String getPath() {
		return path;
	}
	public void setPath(String path) {
		this.path = path;
	}
	public String getLevel() {
		return level;
	}

	public void setLevel(String level) {
		this.level = level;
	}

	@Override
	public String toString() {
		return "Layer [layerID=" + layerID + ", cityID=" + cityID + ", featureID=" + featureID + ", parentID="
				+ parentID + ", layerName=" + layerName + ", layerType=" + layerType + ", path=" + path + ", level="
				+ level + "]";
	}
	
}

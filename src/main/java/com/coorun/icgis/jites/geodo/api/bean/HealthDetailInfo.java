package com.coorun.icgis.jites.geodo.api.bean;

import java.io.Serializable;
import java.util.List;

public class HealthDetailInfo implements Serializable {
	/**
	 * 
	 */
	private static final long serialVersionUID = 6706709953530313088L;

	// 血糖
	private String rbs;
	// 高压
	private String rhp;
	// 心率
	private String rhr;
	// 低压
	private String rlp;
	private String name;
	private String sex;
	private String age;
	private String tel;
	private String imgurl;
	
	private List<String[]> abs;
	private List<String[]> ahp;
	private List<String[]> ahr;
	private List<String[]> alp;
	
	private String status;
	
	public String getRbs() {
		return rbs;
	}
	public void setRbs(String rbs) {
		this.rbs = rbs;
	}
	public String getRhp() {
		return rhp;
	}
	public void setRhp(String rhp) {
		this.rhp = rhp;
	}
	public String getRhr() {
		return rhr;
	}
	public void setRhr(String rhr) {
		this.rhr = rhr;
	}
	public String getRlp() {
		return rlp;
	}
	public void setRlp(String rlp) {
		this.rlp = rlp;
	}
	public List<String[]> getAbs() {
		return abs;
	}
	public void setAbs(List<String[]> abs) {
		this.abs = abs;
	}
	public List<String[]> getAhp() {
		return ahp;
	}
	public void setAhp(List<String[]> ahp) {
		this.ahp = ahp;
	}
	public List<String[]> getAhr() {
		return ahr;
	}
	public void setAhr(List<String[]> ahr) {
		this.ahr = ahr;
	}
	public List<String[]> getAlp() {
		return alp;
	}
	public void setAlp(List<String[]> alp) {
		this.alp = alp;
	}
	public String getStatus() {
		return status;
	}
	public void setStatus(String status) {
		this.status = status;
	}
	public String getName() {
		return name;
	}
	public void setName(String name) {
		this.name = name;
	}
	public String getSex() {
		return sex;
	}
	public void setSex(String sex) {
		this.sex = sex;
	}
	public String getAge() {
		return age;
	}
	public void setAge(String age) {
		this.age = age;
	}
	public String getTel() {
		return tel;
	}
	public void setTel(String tel) {
		this.tel = tel;
	}
	public String getImgurl() {
		return imgurl;
	}
	public void setImgurl(String imgurl) {
		this.imgurl = imgurl;
	}
	
}

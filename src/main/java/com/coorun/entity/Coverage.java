package com.coorun.entity;

/**
 * OSGB,BIM,terrain,image图层
 * 
 * @author DL
 * @createDate 2017/12/04
 */
public class Coverage {
	// 图层id
	private String id;
	// 能否加载
	private String isService;
	// 自身唯一key
	private String key;
	// 目录结构
	private String name;
	// 父节点key
	private String parentKey;
	// 加载路径
	private String path;
	// 服务名
	private String sname;
	// 服务状态
	private String status;
	// 服务类型
	private String stype;
	// 登录用户
	private String userName;
	// 图层属性
	private LayerAttribute attribute;

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIsService() {
		return isService;
	}

	public void setIsService(String isService) {
		this.isService = isService;
	}

	public String getKey() {
		return key;
	}

	public void setKey(String key) {
		this.key = key;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getParentKey() {
		return parentKey;
	}

	public void setParentKey(String parentKey) {
		this.parentKey = parentKey;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

	public String getSname() {
		return sname;
	}

	public void setSname(String sname) {
		this.sname = sname;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getStype() {
		return stype;
	}

	public void setStype(String stype) {
		this.stype = stype;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public LayerAttribute getAttribute() {
		return attribute;
	}

	public void setAttribute(LayerAttribute attribute) {
		this.attribute = attribute;
	}

}

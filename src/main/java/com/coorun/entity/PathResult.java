package com.coorun.entity;

/**
 * 场景管理-路径
 * 
 * @author DL
 * @createDate 2017-10-18
 */
public class PathResult {
	// 名称
	private String pathName;
	// ID
	private String id;
	// 路径点集
	private String lnglats;
	// 路径视角
	private String viewModel;

	public String getPathName() {
		return pathName;
	}

	public void setPathName(String pathName) {
		this.pathName = pathName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getLnglats() {
		return lnglats;
	}

	public void setLnglats(String lnglats) {
		this.lnglats = lnglats;
	}

	public String getViewModel() {
		return viewModel;
	}

	public void setViewModel(String viewModel) {
		this.viewModel = viewModel;
	}

}

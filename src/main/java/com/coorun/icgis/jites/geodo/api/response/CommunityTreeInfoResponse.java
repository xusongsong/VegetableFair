package com.coorun.icgis.jites.geodo.api.response;

import java.io.Serializable;
import java.util.List;

public class CommunityTreeInfoResponse implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 4611512219456388275L;

	private String id;
	private String name;
	private String pid;
	private String pname;
	private List<CommunityTreeInfoResponse> communityTreeInfoResponses;
	
	public CommunityTreeInfoResponse() {
		super();
	}
	
	public CommunityTreeInfoResponse(String id, String name, String pid, String pname) {
		super();
		this.id = id;
		this.name = name;
		this.pid = pid;
		this.pname = pname;
	}

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
	public String getPid() {
		return pid;
	}
	public void setPid(String pid) {
		this.pid = pid;
	}
	public String getPname() {
		return pname;
	}
	public void setPname(String pname) {
		this.pname = pname;
	}
	public List<CommunityTreeInfoResponse> getCommunityTreeInfoResponses() {
		return communityTreeInfoResponses;
	}
	public void setCommunityTreeInfoResponses(List<CommunityTreeInfoResponse> communityTreeInfoResponses) {
		this.communityTreeInfoResponses = communityTreeInfoResponses;
	}
	
}

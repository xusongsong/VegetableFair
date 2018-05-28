package com.coorun.icgis.jites.geodo.api.response;

import java.io.Serializable;
import java.util.List;

import com.coorun.icgis.jites.geodo.api.bean.NameValuedArrayInfo;
import com.coorun.icgis.jites.geodo.api.bean.NameValuedSingleInfo;
import com.coorun.icgis.population.health.model.LineChatResponse;

public class HealthStatisticsInfoResponse implements Serializable{
	/**
	 * 
	 */
	private static final long serialVersionUID = 4151729510218416006L;
	
	private List<NameValuedSingleInfo> nameValuedSingleInfos;
	private List<NameValuedArrayInfo> nameValuedArrayInfos;
	private LineChatResponse lineChatResponse;
	
	public List<NameValuedSingleInfo> getNameValuedSingleInfos() {
		return nameValuedSingleInfos;
	}
	public void setNameValuedSingleInfos(List<NameValuedSingleInfo> nameValuedSingleInfos) {
		this.nameValuedSingleInfos = nameValuedSingleInfos;
	}
	public List<NameValuedArrayInfo> getNameValuedArrayInfos() {
		return nameValuedArrayInfos;
	}
	public void setNameValuedArrayInfos(List<NameValuedArrayInfo> nameValuedArrayInfos) {
		this.nameValuedArrayInfos = nameValuedArrayInfos;
	}
	public LineChatResponse getLineChatResponse() {
		return lineChatResponse;
	}
	public void setLineChatResponse(LineChatResponse lineChatResponse) {
		this.lineChatResponse = lineChatResponse;
	}
	
}

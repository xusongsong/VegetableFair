package com.coorun.test;

import java.util.List;

import com.coorun.icgis.jites.common.util.JSONUtils;

public class ChildrenTets {
	
	@SuppressWarnings("unchecked")
	public static void main(String[] args) {
//		String json = "[{\"id\":\"660f3afb-0abb-4254-8cc7-f866e36293ad\",\"name\":\"沙工新村（3D）\",\"children\":[{\"id\":\"sgxc001-d001-1\",\"name\":\"沙工新村东门入口\",\"children\":[{\"id\":\"1\",\"name\":\"沙工新村进口\",\"longitude\":\"120.5373120933453\",\"latitude\":\"31.857553318366985\"}]},{\"id\":\"sgxc001-d001-2\",\"name\":\"沙工新村东门出口\",\"children\":[{\"id\":\"2\",\"name\":\"沙工新村出口\",\"longitude\":\"120.53788018314326\",\"latitude\":\"31.858532888714336\"}]}]}]";
//		List<Children> stringToCollectionType = (List<Children>) JSONUtils.stringToCollectionType(json, List.class, Children.class);
//		System.out.println(JSONUtils.converterToString(stringToCollectionType));
		String ss = "一单元";
		System.out.println(ss.toLowerCase());
	}
}

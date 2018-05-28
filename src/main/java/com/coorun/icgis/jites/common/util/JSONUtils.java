package com.coorun.icgis.jites.common.util;

import java.io.IOException;
import java.io.StringWriter;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonNode;
import org.codehaus.jackson.JsonProcessingException;
import org.codehaus.jackson.map.DeserializationConfig;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.codehaus.jackson.map.SerializationConfig;

import com.fasterxml.jackson.core.JsonParseException;
import com.fasterxml.jackson.databind.DeserializationFeature;

public final class JSONUtils {

	
	public static String converterToString(Object object) {
		return converterToString(object, true);
	}
	
	public static String converterToString(Object object, boolean autoDetect) {

		try {
			ObjectMapper objectMapper = new ObjectMapper();
			StringWriter sw = new StringWriter();
			if (!autoDetect) {
				objectMapper.configure(SerializationConfig.Feature.AUTO_DETECT_FIELDS, false);
				objectMapper.configure(SerializationConfig.Feature.AUTO_DETECT_GETTERS, false);
				objectMapper.configure(SerializationConfig.Feature.AUTO_DETECT_IS_GETTERS, false);
			}
			
			objectMapper.writeValue(sw, object);
			return sw.toString();
		} catch (JsonGenerationException e) {
			e.printStackTrace();
		} catch (JsonMappingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static Object StringToObject(String string, Class<?> clazz) {
		
		try {
			ObjectMapper objectMapper = new ObjectMapper();
			JsonNode jsonNode = objectMapper.readTree(string);
			objectMapper.configure(DeserializationConfig.Feature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			return objectMapper.readValue(jsonNode, clazz);
		} catch (JsonProcessingException e) {
			e.printStackTrace();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return null;
		
	}
	
	
	/**   
	 * 获取泛型的Collection Type (主要转换成List集合)
	 * @param collectionClass 泛型的Collection   
	 * @param elementClasses 元素类   
	 * @return JavaType Java类型   
	 * @since 1.0   
	*/   
	public static List<?> stringToCollectionType(String string,Class<?> collectionClass, Class<?>... elementClasses) {  
		
		com.fasterxml.jackson.databind.ObjectMapper mapper = new com.fasterxml.jackson.databind.ObjectMapper();
		com.fasterxml.jackson.databind.JavaType javaType4 = mapper.getTypeFactory().constructParametricType(collectionClass, elementClasses);
		
		try {
			// 强制让非数组模式的json字符串与java集合类型相匹配  
			mapper.configure(DeserializationFeature.ACCEPT_SINGLE_VALUE_AS_ARRAY, true);
			mapper.configure(DeserializationFeature.FAIL_ON_IGNORED_PROPERTIES, false);
			mapper.configure(DeserializationFeature.FAIL_ON_UNKNOWN_PROPERTIES, false);
			return mapper.readValue(string, javaType4);
		} catch (JsonParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (com.fasterxml.jackson.databind.JsonMappingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return null;
	}   
	
	@SuppressWarnings({ "unchecked", "rawtypes" })
	public static Map transStringToMap(String mapString){  
		  Map map = new HashMap();  
		  java.util.StringTokenizer items;  
		  for(StringTokenizer entrys = new StringTokenizer(mapString, "^");entrys.hasMoreTokens();   
		    map.put(items.nextToken(), items.hasMoreTokens() ? ((Object) (items.nextToken())) : null))  
		      items = new StringTokenizer(entrys.nextToken(), "'");  
		  return map;  
		} 
}

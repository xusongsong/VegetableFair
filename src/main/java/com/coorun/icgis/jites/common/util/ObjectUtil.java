package com.coorun.icgis.jites.common.util;

import java.beans.BeanInfo;
import java.beans.Introspector;
import java.beans.PropertyDescriptor;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.collections.MapUtils;
import org.apache.commons.lang3.StringUtils;


public class ObjectUtil {

	/*
	 * null, "", " "
	 */
	public static boolean isBlank(Object obj) {
		boolean result = false;
		if (obj instanceof String) {
			result = StringUtils.isBlank((String) obj);
		} else if (obj instanceof Collection) {
			result = CollectionUtils.isEmpty((Collection) obj);
		} else if (obj instanceof Map) {
			result = MapUtils.isEmpty((Map) obj);
		} else if (obj == null) {
			result = true;
		}
		return result;
	}

	public static boolean isNotBlank(Object obj) {
		boolean result = false;
		if (obj instanceof String) {
			result = StringUtils.isNotBlank((String) obj);
		} else if (obj instanceof Collection) {
			result = CollectionUtils.isNotEmpty((Collection) obj);
		} else if (obj instanceof Map) {
			result = MapUtils.isNotEmpty((Map) obj);
		} else if (obj != null) {
			result = true;
		}
		return result;
	}

	/*
	 * null, ""
	 */
	public static boolean isEmpty(Object obj) {
		boolean result = false;
		if (obj instanceof String) {
			result = StringUtils.isEmpty((String) obj);
		} else if (obj instanceof Collection) {
			result = CollectionUtils.isEmpty((Collection) obj);
		} else if (obj instanceof Map) {
			result = MapUtils.isEmpty((Map) obj);
		} else if (obj == null) {
			result = true;
		}
		return result;
	}

	public static boolean isNotEmpty(Object obj) {
		boolean result = false;
		if (obj instanceof String) {
			result = StringUtils.isNotEmpty((String) obj);
		} else if (obj instanceof Collection) {
			result = CollectionUtils.isNotEmpty((Collection) obj);
		} else if (obj instanceof Map) {
			result = MapUtils.isNotEmpty((Map) obj);
		} else if (obj != null) {
			result = true;
		}
		return result;
	}

	public static String join(Object[] array, String separator) {
		return StringUtils.join(array, separator);
	}

	/**
	 * 使用org.apache.commons.beanutils进行转换
	 */
	public static Object mapToObjectByBeanutils(Map<String, Object> map, Class<?> beanClass) throws Exception {
		if (map == null) {
			return null;
		}

		Object obj = beanClass.newInstance();

		org.apache.commons.beanutils.BeanUtils.populate(obj, map);

		return obj;
	}

	public static Map<?, ?> objectToMapByBeanutils(Object obj) {
		if (obj == null) {
			return null;
		}

		return new org.apache.commons.beanutils.BeanMap(obj);
	}

	/**
	 * 使用Introspector进行转换
	 */

	public static Object mapToObjectByIntrospector(Map<String, Object> map, Class<?> beanClass) throws Exception {
		if (map == null)
			return null;

		Object obj = beanClass.newInstance();

		BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (PropertyDescriptor property : propertyDescriptors) {
			Method setter = property.getWriteMethod();
			if (setter != null) {
				setter.invoke(obj, map.get(property.getName()));
			}
		}

		return obj;
	}

	public static Map<String, Object> objectToMapByIntrospector(Object obj) throws Exception {
		if (obj == null) {
			return null;
		}

		Map<String, Object> map = new HashMap<String, Object>();

		BeanInfo beanInfo = Introspector.getBeanInfo(obj.getClass());
		PropertyDescriptor[] propertyDescriptors = beanInfo.getPropertyDescriptors();
		for (PropertyDescriptor property : propertyDescriptors) {
			String key = property.getName();
			if (key.compareToIgnoreCase("class") == 0) {
				continue;
			}
			Method getter = property.getReadMethod();
			Object value = getter != null ? getter.invoke(obj) : null;
			map.put(key, value);
		}

		return map;
	}

	/**
	 * 使用reflect进行转换
	 */
	public static Object mapToObjectByReflect(Map<String, Object> map, Class<?> beanClass) throws Exception {
		if (map == null) {
			return null;
		}

		Object obj = beanClass.newInstance();

		Field[] fields = obj.getClass().getDeclaredFields();
		for (Field field : fields) {
			int mod = field.getModifiers();
			if (Modifier.isStatic(mod) || Modifier.isFinal(mod)) {
				continue;
			}

			field.setAccessible(true);
			field.set(obj, map.get(field.getName()));
		}

		return obj;
	}

	public static Map<String, Object> objectToMapByReflect(Object obj) throws Exception {
		if (obj == null) {
			return null;
		}

		Map<String, Object> map = new HashMap<String, Object>();

		Field[] declaredFields = obj.getClass().getDeclaredFields();
		for (Field field : declaredFields) {
			field.setAccessible(true);
			map.put(field.getName(), field.get(obj));
		}

		return map;
	}

	/*public static void main(String[] args) throws Exception {
		Pagination commonTree = new Pagination();
		Map<String, Object> objectToMapByIntrospector = objectToMapByIntrospector(commonTree);
		Map<String, Object> objectToMapByReflect = objectToMapByReflect(commonTree);
		Map<?, ?> objectToMapByBeanutils = objectToMapByBeanutils(commonTree);
		System.out.println(objectToMapByIntrospector);
		System.out.println(objectToMapByReflect);
		System.out.println(JSONUtils.converterToString(objectToMapByBeanutils));
	}*/
}

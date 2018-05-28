package com.coorun.icgis.jites.common.validator.annotation;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

import com.coorun.icgis.jites.common.validator.Validator;


/**
 * 自定义请求参数注解
 * 
 * @author zhuyong
 */
@Target({ElementType.PARAMETER})
@Retention(RetentionPolicy.RUNTIME)
@Documented
public @interface ValidateParam {

	/**
	 * 验证器
	 * @return
	 */
	Validator[] value() default {};
	
	/**
	 * 参数的描述名称
	 * @return
	 */
	String name() default "";
}


package com.coorun.icgis.jites.common.aop;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;

public interface IIcgisAspect {

	void before(JoinPoint joinPoint) throws Throwable;

	void after(JoinPoint joinPoint) throws Throwable;

	void afterReturning(JoinPoint joinPoint, Object returnObj) throws Throwable;

	void afterThrowing(JoinPoint joinPoint, Throwable e) throws Throwable;

	Object around(ProceedingJoinPoint pJoinPoint) throws Throwable;

}

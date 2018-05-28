package com.coorun.icgis.jites.common.aop.impl;

import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.After;
import org.aspectj.lang.annotation.Around;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.aspectj.lang.annotation.Pointcut;
import org.springframework.context.annotation.EnableAspectJAutoProxy;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Component;

import com.coorun.icgis.jites.common.aop.IIcgisAspect;
import com.coorun.util.RetResult;

@Aspect
@Component
@Order(1)
@EnableAspectJAutoProxy(proxyTargetClass = true)
public class ControllerIcgisAspectImpl implements IIcgisAspect{
	
	@Pointcut("execution(* com.coorun.icgis.*.*.controller..*.*(..))")
//	@Pointcut("execution(* com.coorun.icgis..*.*(..))")
	public void icgisAspect() {
		// TODO Auto-generated method stub
	}
	
	
	
	@Override
	@Before("icgisAspect()")
	public void before(JoinPoint joinPoint) throws Throwable {
		// TODO Auto-generated method stub
	}

	@Override
	@After("icgisAspect()")
	public void after(JoinPoint joinPoint) throws Throwable {
		// TODO Auto-generated method stub
	}

	@Override
	public void afterReturning(JoinPoint joinPoint, Object returnObj) throws Throwable {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void afterThrowing(JoinPoint joinPoint, Throwable e) throws Throwable {
		// TODO Auto-generated method stub
	}

	@SuppressWarnings({ "rawtypes" })
	@Override
	@Around("icgisAspect()")
	public Object around(ProceedingJoinPoint pJoinPoint) throws Throwable {
		Object o = null;
		try {
			o = pJoinPoint.proceed(pJoinPoint.getArgs());
		} catch (Exception e) {
			RetResult retResult = new RetResult();
			retResult.setSuccess("0");
			retResult.setMsg("系统优化中，稍后重试！");
			o = retResult;
		}
		return o;
	}

	
	
}

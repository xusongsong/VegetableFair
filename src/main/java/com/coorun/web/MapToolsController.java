package com.coorun.web;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.coorun.entity.LabelResult;
import com.coorun.entity.PathResult;
/*地图工具页面跳转*/
import com.coorun.entity.VideoPathResult;
import com.coorun.entity.ViewResult;
import com.coorun.services.SceneManagerService;
import com.coorun.services.SecurityManageService;
import com.coorun.util.Pager;
import com.coorun.util.RetResult;

/**
 * 地图工具Controller层
 * 
 * @author lixiang;donglin
 * @createDate 2017-09-23
 */
@Controller
@RequestMapping(value = "mapTools")
public class MapToolsController {
	// 场景管理(路径、视点)
	@Resource
	SceneManagerService sceneManagerService;
    @Resource
    SecurityManageService securityManageService;

	/**
	 * 视点弹框保存
	 * 
	 * @return
	 */
	@RequestMapping(value = "saveViewBox.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public @ResponseBody Map<String, String> getTest(HttpServletRequest req) {
		Map<String, String> map = new HashMap<String, String>();
		String name = req.getParameter("name");
		String note = req.getParameter("note");
		map.put("name", name);
		map.put("note", note);
		return map;
	}


	/**
	 * 打开视点map页面弹框
	 * 
	 * @return
	 */
	@RequestMapping(value = "appendView.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getAppendView(HttpServletRequest req) {
		return "webView/appendView";
	}

	/**
	 * 打开门禁开关页面弹框
	 * 
	 * @return
	 */
	@RequestMapping(value = "lockState.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String turnLockState(HttpServletRequest req) {
		return "webView/turnLockState";
	}
	/**
	 * 截图弹窗JSP界面路径配置
	 * 
	 * @return
	 */
	@RequestMapping(value = "print.do", method = RequestMethod.GET)
	public String printScreen() {
		return "webView/printScreen";
	}

	/**
	 * 弹窗提示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "printScreenFrame.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getPrintFrame() {
		return "iframe/PrintScreen";
	}
	
	/**
	 *视频四宫格提示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "videoFourDialog.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getFourVideoFrame() {
		return "iframe/videoFourDialog";
	}
	
	/**
	 *门禁列表展示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "lockList.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getLockListFrame() {
		return "iframe/lockList";
	}
	/**
	 * 水平显示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "vertical.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getVertical() {
		return "iframe/Vertical";
	}

	/**
	 * 垂直显示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "horizontal.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getHorizontal() {
		return "iframe/Horizontal";
	}

	/**
	 * 面积显示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "area.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getArea() {
		return "iframe/Area";
	}

    /**
     * 距离结果显示页面
     *
     * @return
     */
    @RequestMapping(value = "distance.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
    public String getDistance() {
        return "iframe/Distance";
    }

	/**
	 * 测量提示页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "measureReminder.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String getMeasureReminder() {
		return "iframe/MeasureReminder";
	}

	
	/**
	 * 标注弹窗页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "labelDialog.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadLabelDialog() {
		return "webView/labelDialog";
	}

	/**
	 * 视频监控页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "videoResource.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadVideoResource() {
		return "webView/videoResource";
	}
	
	/**
	 * SG视频监控页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "videoResourceSG.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadVideoResourceSG() {
		return "webView/videoResourceSG";
	}
	
	/**
	 * 
	 * 人脸监控摄像头属性弹窗
	 * @return
	 */
	@RequestMapping(value = "faceAttribute.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadfaceAttribute() {
		return "webView/faceAttribute";
	}
	
	/**
	 * 
	 * 人脸识别详情弹窗
	 * @return
	 */
	@RequestMapping(value = "faceDetail.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadfaceDetail() {
		return "webView/faceDetail";
	}
	
	
	/**
	 * 视频监控播放
	 * 
	 * @return
	 */
	@RequestMapping(value = "videoPlay.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadVideoPlay() {
		return "iframe/videoPlay";
	}
	
	/**
	 * 标注属性查询弹窗页面
	 * 
	 * @return
	 */
	@RequestMapping(value = "detail.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String detail() {
		return "webView/searchDetail";
	}
	
	/**
	 * SG视频监控播放
	 * 
	 * @return
	 */
	@RequestMapping(value = "videoPlaySG.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String loadVideoPlaySG() {
		return "iframe/videoPlaySG";
	}

	/**
	 * 寿光视频资源属性弹窗
	 * 
	 * @return
	 */
	@RequestMapping(value = "videoAttribute.do", method = RequestMethod.GET, produces = "text/html;charset=UTF-8")
	public String showVideoAttribute() {
		return "webView/videoAttribute";
	}
	
	/**
	 * 视点功能模块---新增视点
	 * 
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "addView.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<String> addView(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String userId = req.getParameter("userId");
		String name = req.getParameter("name");
		String x = req.getParameter("x");
		String y = req.getParameter("y");
		String z = req.getParameter("z");
		String rotateAngle = req.getParameter("rotateAngle");
		String overAngle = req.getParameter("overAngle");
		String range = req.getParameter("range");
		String descr = req.getParameter("descr");
		/** 视点功能---新增视点 **/
		Boolean trueOrFalse = sceneManagerService.addViewPoint(name, userId, z, x, y, descr, rotateAngle, overAngle,
				range);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<String>对象 **/
		RetResult<String> retResult = new RetResult<String>();
		if (trueOrFalse) {
			success = "1";
			msg = "添加成功";
		} else {
			success = "0";
			msg = "添加失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 视点功能模块---删除视点
	 * 
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "deleteView.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<String> deleteView(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String id = req.getParameter("id");
		/** 视点功能---删除视点 **/
		Boolean trueOrFalse = sceneManagerService.deleteViewPoint(id);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<String>对象 **/
		RetResult<String> retResult = new RetResult<String>();
		if (trueOrFalse) {
			success = "1";
			msg = "删除成功";
		} else {
			success = "0";
			msg = "删除失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 视点功能模块---修改视点
	 * 
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "modifyView.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<String> modifyView(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String id = req.getParameter("id");
		String name = req.getParameter("name");
		String descr = req.getParameter("descr");
		String x = req.getParameter("x");
		String y = req.getParameter("y");
		String z = req.getParameter("z");
		String rotateAngle = req.getParameter("rotateAngle");
		String overAngle = req.getParameter("overAngle");
		String range = req.getParameter("range");
		/** 视点功能---修改视点 **/
		Boolean trueOrFalse = sceneManagerService.modifyView(id,  name, z, x, y, descr, rotateAngle, overAngle,
				range);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<String>对象 **/
		RetResult<String> retResult = new RetResult<String>();
		if (trueOrFalse) {
			success = "1";
			msg = "成功";
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 视点功能模块---查询视点
	 * 
	 * @param req
	 * @return RetResult<Pager<ViewResult>>
	 */
	@RequestMapping(value = "findView.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<Pager<ViewResult>> findView(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String name = req.getParameter("name") == null ? "" : req.getParameter("name");
		int pageNo = Integer.valueOf(req.getParameter("pageNo"));
		int pageSize = 10;
		/** 视点功能---查询视点 **/
		List<ViewResult> list = sceneManagerService.queryViewPoint(name);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<Pager<ViewResult>>对象 **/
		RetResult<Pager<ViewResult>> retResult = new RetResult<Pager<ViewResult>>();
		if (list != null && list.size() > 0) {
			success = "1";
			msg = "成功";
			/** 分页功能 **/
			Pager<ViewResult> pager = new Pager<ViewResult>(list, list.size(), pageNo, pageSize);
			retResult.setRecord(pager);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 路径功能模块---查询路径
	 * 
	 * @param req
	 * @return RetResult<Pager<PathResult>>
	 */
	@RequestMapping(value = "findPath.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<Pager<PathResult>> findPath(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String pathName = req.getParameter("pathName");
		int pageNo = Integer.valueOf(req.getParameter("pageNo"));
		int pageSize = 10;
		/** 路径功能---查询路径 **/
		List<PathResult> list = sceneManagerService.queryPathResult(pathName);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<Pager<PathResult>>对象 **/
		RetResult<Pager<PathResult>> retResult = new RetResult<Pager<PathResult>>();
		if (list != null && list.size()> 0) {
			success = "1";
			msg = "成功";
			/** 分页功能 **/
			Pager<PathResult> pager = new Pager<PathResult>(list, list.size(), pageNo, pageSize);
			retResult.setRecord(pager);
		} else {
			success = "0";
			msg = "失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 视点功能模块---删除路径
	 * 
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "deletePath.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<String> deletePath(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String id = req.getParameter("id");
		/** 路径功能---删除路径 **/
		Boolean trueOrFalse = sceneManagerService.deletePath(id);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<String>对象 **/
		RetResult<String> retResult = new RetResult<String>();
		if (trueOrFalse) {
			success = "1";
			msg = "删除成功";
		} else {
			success = "0";
			msg = "删除失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

	/**
	 * 视点功能模块---新增路径
	 * 
	 * @param req
	 * @return RetResult<String>
	 */
	@RequestMapping(value = "addPath.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<String> addPath(HttpServletRequest req) {
		/** 获取前端页面传来的值 **/
		String userId = req.getParameter("userId");
		String pathName = req.getParameter("pathName");
		String lnglats = req.getParameter("lnglats");
		String viewModel = req.getParameter("viewModel");
		/** 视点功能---新增路径 **/
		Boolean trueOrFalse = sceneManagerService.addPath(pathName, userId, lnglats, viewModel);
		// 0:处理失败 1:处理成功
		String success = null;
		// 处理消息
		String msg = null;
		/** 返回封装RetResult<String>对象 **/
		RetResult<String> retResult = new RetResult<String>();
		if (trueOrFalse) {
			success = "1";
			msg = "添加成功";
		} else {
			success = "0";
			msg = "添加失败";
		}
		retResult.setMsg(msg);
		retResult.setSuccess(success);
		return retResult;
	}

    /**
     * 巡更功能模块---新增巡更路径
     *
     * @param req
     * @return RetResult<String>
     */
    @RequestMapping(value = "addVideoPath.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public @ResponseBody RetResult<String> addVideoPath(HttpServletRequest req) {
        /** 获取前端页面传来的值 **/
        String id = req.getParameter("id");
        String userId = req.getParameter("userId");//识别用户
        String videoPathName = req.getParameter("videoPathName");//巡更名称
        String videoPathPoints = req.getParameter("videoPathPoints");//巡更点集合
        String videoPathParams = req.getParameter("videoPathParams");//巡更角度距离参数
        /** 巡更功能---新增巡更 **/
        Boolean isAdd = securityManageService.addVideoPath(videoPathName,id,userId, videoPathPoints, videoPathParams);
        // 0:处理失败 1:处理成功
        String success = null;
        // 处理消息
        String msg = null;
        if (isAdd){
            success = "1";
            msg = "巡更添加成功";
        } else {
            success = "0";
            msg = "巡更添加失败";
        }
        /** 返回封装RetResult<String>对象 **/
        RetResult<String> retResult = new RetResult<String>();
        retResult.setMsg(msg);
        retResult.setSuccess(success);
        return retResult;
    }

    /**
     * 巡更功能模块---查询巡更路径
     *
     * @param req
     * @return RetResult<Pager<VideoPathResult>>
     */
    @RequestMapping(value = "findVideoPath.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public @ResponseBody RetResult<Pager<VideoPathResult>> findVideoPath(HttpServletRequest req) {
        /** 获取前端页面传来的值 **/
        String userId = req.getParameter("userId");//识别用户
        String videoPathName = req.getParameter("videoPathName");
        int pageNo = Integer.valueOf(req.getParameter("pageNo"));
        int pageSize = 10;
        /** 巡更功能---查询巡更路径 **/
        List<VideoPathResult> list = securityManageService.queryVideoPathResult(videoPathName,userId);
        // 0:处理失败 1:处理成功
        String success = null;
        // 处理消息
        String msg = null;
        /** 返回封装RetResult<Pager<PathResult>>对象 **/
        RetResult<Pager<VideoPathResult>> retResult = new RetResult<Pager<VideoPathResult>>();
        if (list != null && list.size() > 0) {
            success = "1";
            msg = "成功";
            /** 分页功能 **/
            Pager<VideoPathResult> pager = new Pager<VideoPathResult>(list, list.size(), pageNo, pageSize);
            retResult.setRecord(pager);
        } else {
            success = "0";
            msg = "失败";
        }
        retResult.setMsg(msg);
        retResult.setSuccess(success);
        return retResult;
    }

    /**
     * 巡更功能模块---删除巡更路径
     *
     * @param req
     * @return RetResult<String>
     */
    @RequestMapping(value = "deleteVideoPath.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
    public @ResponseBody RetResult<String> deleteVideoPath(HttpServletRequest req) {
        /** 获取前端页面传来的值 **/
        String userId = req.getParameter("userId");//识别用户
        String id = req.getParameter("id");
        /** 路径功能---删除路径 **/
        Boolean isDelete = securityManageService.deleteVideoPath(id,userId);
        // 0:处理失败 1:处理成功
        String success = null;
        // 处理消息
        String msg = null;
        /** 返回封装RetResult<String>对象 **/
        RetResult<String> retResult = new RetResult<String>();
        if (isDelete) {
            success = "1";
            msg = "巡更删除成功";
        } else {
            success = "0";
            msg = "巡更删除失败";
        }
        retResult.setMsg(msg);
        retResult.setSuccess(success);
        return retResult;
    }

    /**20180525-shine**/
    /**
	 * 标注功能 - 查询标注(分页)
	 * 
	 * @param req
	 * @return RetResult<Pager<LabelResult>>
	 */
	@RequestMapping(value = "findLabelPage.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult<Pager<LabelResult>> findLabelByPage(HttpServletRequest req) {
		/* 获取前端页面的传值 */
		String name = req.getParameter("name");// 获取标注名称
		int pageNo = Integer.valueOf(req.getParameter("pageNo"));// 获取分页参数
		int pageSize = Integer.valueOf(req.getParameter("pageSize"));// 获取分页内容数
		/* 调用服务层获取后台数据结果集 */
		List<LabelResult> list = sceneManagerService.queryLabelPoint(name);// 封装返回对象集合
		/* 封装结果集 */
		RetResult<Pager<LabelResult>> retResult = new RetResult<Pager<LabelResult>>();// 返回给前端的封装RetResult对象
		if (list != null && list.size() > 0) {
			retResult.setSuccess("1");// success:0:处理失败 1:处理成功
			retResult.setMsg("成功");// msg:处理消息
			Pager<LabelResult> pager = new Pager<LabelResult>(list, list.size(), pageNo, pageSize);// 返回结果集合进行分页
			retResult.setRecord(pager);// 放入结果集合
		} else {
			retResult.setSuccess("0");// success: 0:处理失败 1:处理成功
			retResult.setMsg("失败");// msg:处理消息
		}
		return retResult;
	}
	
	/**
	 * 标注功能 - 查询全部标注
	 * 
	 * @param req
	 * @return RetResult<Pager<LabelResult>>
	 */
	@RequestMapping(value = "findLabel.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult findLabel(HttpServletRequest req) {
		/* 获取前端页面的传值 */
		String name = req.getParameter("name");// 获取标注名称
		/* 调用服务层获取后台数据结果集 */
		List<LabelResult> list = sceneManagerService.queryLabelPoint(name);// 封装返回对象集合
		/* 封装结果集 */
		RetResult retResult = new RetResult();// 返回给前端的封装RetResult对象
		if (list != null && list.size() > 0) {
			retResult.setSuccess("1");// success:0:处理失败 1:处理成功
			retResult.setMsg("成功");// msg:处理消息
			retResult.setRecord(list);// 放入结果集合
		} else {
			retResult.setSuccess("0");// success: 0:处理失败 1:处理成功
			retResult.setMsg("失败");// msg:处理消息
		}
		return retResult;
	}
	/**20180525-shine**/
	/**
	 * 标注功能 - 删除标注
	 * 
	 * @param req
	 * @return RetResult
	 */
	@RequestMapping(value = "delLabel.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult delLabel(HttpServletRequest req) {
		/* 获取页面参数值 */
		String id = req.getParameter("id");// 获取页面标注id
		/* 调用服务层获取后台数据结果集 */
		String labelState = sceneManagerService.delLabelPoint(id);// labelState:
																	// 200成功
																	// :201 失败
		RetResult retResult = new RetResult();// 封装返回对象集合
		if ("200".equals(labelState)) {
			retResult.setSuccess("1");// success:0:处理失败 1:处理成功
			retResult.setMsg("删除成功");// msg:处理消息
		} else {
			retResult.setSuccess("0");// success: 0:处理失败 1:处理成功
			retResult.setMsg("删除失败");// msg:处理消息
		}
		return retResult;
	}

	/**
	 * 标注功能 -- 修改标注
	 * 
	 * @param req
	 * @return RetResult
	 */
	@RequestMapping(value = "updateLabel.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult updateLabel(HttpServletRequest req) {
		/* 获取页面参数(参数存入对象) */
		LabelResult labelResult = new LabelResult();// 创建封装对象
		labelResult.setId(req.getParameter("id"));// 标注id
		labelResult.setName(req.getParameter("name"));// 标注名称
		labelResult.setLongitude(req.getParameter("longitude"));// 经度
		labelResult.setLatitude(req.getParameter("latitude"));// 纬度
		labelResult.setElevation(req.getParameter("elevation"));// 高程
		labelResult.setRotateAngle(req.getParameter("rotateAngle"));// 旋转角
		labelResult.setOverAngle(req.getParameter("overAngle"));// 俯仰角
		labelResult.setRange(req.getParameter("range"));// 视距范围
		labelResult.setMemo(req.getParameter("memo"));// 备注
		/* 调用服务层获取后台数据结果集 */
		String labelState = sceneManagerService.updateLabelPoint(labelResult);// labelState:200成功,201失败
		RetResult retResult = new RetResult();// 封装返回对象集合
		/* 业务逻辑判断 */
		if ("200".equals(labelState)) {
			retResult.setSuccess("1");// success:0:处理失败 1:处理成功
			retResult.setMsg("标注修改成功");// msg:处理消息
		} else {
			retResult.setSuccess("0");// success: 0:处理失败 1:处理成功
			retResult.setMsg("标注修改失败,已重复");// msg:处理消息
		}
		return retResult;
	}

	/**
	 * 标注功能-- 添加标注
	 * 
	 * @param req
	 * @return RetResult
	 */
	@RequestMapping(value = "addLabel.do", method = RequestMethod.POST, produces = "application/json;charset=UTF-8")
	public @ResponseBody RetResult addLabel(HttpServletRequest req) {
		/* 获取页面传递参数并设置对象接收 */
		LabelResult labelResult = new LabelResult();// 创建封装对象
		labelResult.setUserId(req.getParameter("userId"));// 用户ID
		labelResult.setName(req.getParameter("name"));// 标注名称
		labelResult.setLongitude(req.getParameter("longitude"));// 经度
		labelResult.setLatitude(req.getParameter("latitude"));// 纬度
		labelResult.setElevation(req.getParameter("elevation"));// 高程
		labelResult.setRotateAngle(req.getParameter("rotateAngle"));// 旋转角
		labelResult.setOverAngle(req.getParameter("overAngle"));// 俯仰角
		labelResult.setRange(req.getParameter("range"));// 视距范围
		labelResult.setMemo(req.getParameter("memo"));// 备注
		/* 定义返回对象 */
		RetResult retResult = new RetResult();
		/* 服务层调用得到返回值 */
		Map<String,String> labelMap = sceneManagerService.addLabelPoint(labelResult);// labelState:200成功 201 失败
		/* 业务逻辑判断 */
		if ("200".equals(labelMap.get("labelState"))) {
			retResult.setSuccess("1");// success:0:处理失败 1:处理成功
			retResult.setMsg(labelMap.get("msg"));// msg:处理消息
		} else {
			retResult.setSuccess("0");// success: 0:处理失败 1:处理成功
			retResult.setMsg(labelMap.get("msg"));// msg:处理消息
		}
		return retResult;
	}
	
	/**
	 * 标注功能-- 获取父页面传递参数
	 * 
	 * @param req
	 * @return RetResult
	 */
	@RequestMapping(value = "sendArguments.do", method = RequestMethod.GET, produces = "application/json;charset=UTF-8")
	public String sendArguments(HttpServletRequest req){
		String labelLongitude = req.getParameter("labelLongitude") ;
	    String labelLatitude =req.getParameter("labelLatitude");
	    String labelElevation = req.getParameter("labelElevation");
	    String labelRotateAngle = req.getParameter("labelRotateAngle");
	    String labelOverAngle = req.getParameter("labelOverAngle");
	    String labelRange =req.getParameter("labelRange");
	    req.setAttribute("labelLongitude", labelLongitude);
	    req.setAttribute("labelLatitude", labelLatitude);
	    req.setAttribute("labelElevation", labelElevation);
	    req.setAttribute("labelRotateAngle", labelRotateAngle);
	    req.setAttribute("labelOverAngle", labelOverAngle );
	    req.setAttribute("labelRange", labelRange);
	    return "js/mapTools/labelDialog" ;
	} 
	
}
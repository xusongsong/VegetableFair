package com.coorun.faceidentifymanage.web;

import com.coorun.faceidentifymanage.entity.HikListResponseEntity;
import com.coorun.faceidentifymanage.services.CameraService;
import com.coorun.faceidentifymanage.util.StringUtils;
import com.coorun.util.RetResult;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import java.util.HashMap;
import java.util.Map;

/**
 * 卡口信息操作
 *
 */
@RestController
@RequestMapping("cameraoption")
public class CameraController extends BaseController {

    @Resource
    private CameraService cameraService;

    /**
     * 获取卡口列表
     *
     * @return 卡口列表集合
     */
    @RequestMapping("cameralist")
    public RetResult showCameraList(HttpServletRequest request) {
        Map<String, String> paramMap = new HashMap<>();
        String indexCode = request.getParameter("indexCode");
        String deviceCode = request.getParameter("deviceCode");
        String pageNo = request.getParameter("pageNo");
        String pageSize = request.getParameter("pageSize");
        if (StringUtils.isEmpty(pageNo)) {
            pageNo = "1";
        }

        if (StringUtils.isEmpty(pageSize)) {
            pageSize = "10";
        }

        paramMap.put("indexCode", indexCode);
        paramMap.put("deviceCode", deviceCode);
        paramMap.put("pageNo", pageNo);
        paramMap.put("pageSize", pageSize);

        // 清除不存在值的参数
        clearEmptyEntry(paramMap);

        return cameraService.showCameraList(paramMap);
    }

    /**
     * 新增卡口
     *
     * @return 新增状态
     */
    @RequestMapping("cameradd")
    public String addCamera(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return cameraService.addCamera(jsonParam, null);
    }

    /**
     * 修改卡口信息
     *
     * @return 修改状态
     */
    @RequestMapping("cameraupdate")
    public String updateCameraInfo(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return cameraService.updateCameraInfo(jsonParam, null);
    }

    /**
     * 删除卡口
     *
     * @return 修改状态
     */
    @RequestMapping("cameradelete")
    public String deleteCamera(HttpServletRequest request) {
        String jsonParam = getJsonParam(request);
        return cameraService.deleteCamera(jsonParam, null);
    }

    /**
     * 从参数重获取开口信息
     *
     * @param request HTTP请求
     * @return 参数集合
     */
    private Map<String, String> getParamMap(HttpServletRequest request) {
        Map<String, String> paramMap = new HashMap<>();
        String cameraType = request.getParameter("cameraType");
        String indexCode = request.getParameter("indexCode");
        String deviceCode = request.getParameter("deviceCode");
        String cameraName = request.getParameter("cameraName");
        String cameraIp = request.getParameter("cameraIp");
        String cameraPort = request.getParameter("cameraPort");
        String channelNo = request.getParameter("channelNo");
        String longitude = request.getParameter("longitude");
        String latitude = request.getParameter("latitude");
        String relationPoint = request.getParameter("relationPoint");
        String userName = request.getParameter("userName");
        String password = request.getParameter("password");

        paramMap.put("cameraType", cameraType);
        paramMap.put("indexCode", indexCode);
        paramMap.put("deviceCode", deviceCode);
        paramMap.put("cameraName", cameraName);
        paramMap.put("cameraIp", cameraIp);
        paramMap.put("cameraPort", cameraPort);
        paramMap.put("channelNo", channelNo);
        paramMap.put("longitude", longitude);
        paramMap.put("latitude", latitude);
        paramMap.put("relationPoint", relationPoint);
        paramMap.put("userName", userName);
        paramMap.put("password", password);

        clearEmptyEntry(paramMap);
        return paramMap;
    }


}

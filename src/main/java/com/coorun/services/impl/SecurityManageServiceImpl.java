package com.coorun.services.impl;

import com.coorun.entity.VideoPathResult;
import com.coorun.factory.SecurityManageFactory;
import com.coorun.services.SecurityManageService;
import org.springframework.stereotype.Service;

import javax.annotation.Resource;
import java.util.List;

@Service("securityManageService")
public class SecurityManageServiceImpl implements SecurityManageService {

    /** 场景管理 **/
    @Resource
    SecurityManageFactory securityManageFactory;


    /**
     * 巡更路径功能---查询巡更路径
     *
     * @param videoPathName
     * @return List<VideoPathResult>
     */
    @Override
    public List<VideoPathResult> queryVideoPathResult(String videoPathName, String userID) {
        List<VideoPathResult> list = securityManageFactory.getVideoPathResult(videoPathName);
        return list;
    }

    /**
     * 巡更路径功能---删除巡更路径
     *
     * @param id
     * @param userID
     * @return Boolean
     */
    @Override
    public Boolean deleteVideoPath(String id, String userID) {
        Boolean isDelete = securityManageFactory.deleteVideoPath(id);
        return isDelete;
    }

    /**
     * 巡更路径功能---新增巡更路径
     *
     * @param videoPathName
     * @param userID
     * @param videoPathPoints
     * @param videoPathParams
     * @return Boolean
     */
    @Override
    public Boolean addVideoPath(String videoPathName, String id, String userID, String videoPathPoints, String videoPathParams) {
        Boolean isAdd = securityManageFactory.addVideoPath(videoPathName, id,userID, videoPathPoints, videoPathParams);
        return isAdd;
    }

}

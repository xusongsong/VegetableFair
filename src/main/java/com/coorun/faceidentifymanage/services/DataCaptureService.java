package com.coorun.faceidentifymanage.services;

import com.coorun.util.RetResult;

public interface DataCaptureService {

    /**
     *  启动实时抓拍系统
     *
     * @return
     */
    RetResult startSnapshotSystem();

    /**
     *  启动预警系统
     *
     * @return
     */
    RetResult startAlarmSystem();
}

//package com.coorun.faceidentifymanage.services.impl;
//
//import com.coorun.faceidentifymanage.mq.alarmessage.AlarmMessageAcceptor;
//import com.coorun.faceidentifymanage.mq.realtimemessage.SnapshotMessageAcceptor;
//import com.coorun.faceidentifymanage.services.DataCaptureService;
//import com.coorun.util.RetResult;
//import org.apache.log4j.Logger;
//import org.springframework.stereotype.Service;
//
//import javax.annotation.Resource;
//
//@Service
//public class DataCaptureServiceImpl implements DataCaptureService {
//
//    @Resource
//    private SnapshotMessageAcceptor snapshotMessageAcceptor;
//    @Resource
//    private AlarmMessageAcceptor alarmMessageAcceptor;
//    private Logger LOG = Logger.getLogger(getClass());
//
//    @Override
//    public RetResult startSnapshotSystem() {
//        try {
//            snapshotMessageAcceptor.startSnapshotAcceptor();
//            return new RetResult("1", "实时抓拍系统已启动");
//        } catch (Exception e) {
//            LOG.error("预警系统启动失败", e);
//            return new RetResult("0", "实时抓拍系统启动失败");
//        }
//    }
//
//    @Override
//    public RetResult startAlarmSystem() {
//        try {
//            alarmMessageAcceptor.startAlarmMonitor();
//            return new RetResult("1", "预警系统已启动");
//        } catch (Exception e) {
//            LOG.error("预警系统启动失败", e);
//            return new RetResult("0", "预警系统启动失败");
//        }
//    }
//}

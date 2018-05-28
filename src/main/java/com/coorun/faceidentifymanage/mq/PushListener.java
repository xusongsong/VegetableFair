package com.coorun.faceidentifymanage.mq;

import org.apache.log4j.Logger;
import org.directwebremoting.Browser;
import org.directwebremoting.ScriptSession;
import org.directwebremoting.WebContext;
import org.directwebremoting.WebContextFactory;
import org.directwebremoting.event.ScriptSessionEvent;
import org.directwebremoting.event.ScriptSessionListener;

import javax.servlet.http.HttpSession;
import java.util.Collection;
import java.util.HashMap;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class PushListener implements ScriptSessionListener {

    //维护一个Map key为session的Id， value为ScriptSession对象
    private static final Map<String,ScriptSession> snapshotScriptSession = new ConcurrentHashMap<>();
    private static final Map<String,ScriptSession> alarmshotScriptSession = new ConcurrentHashMap<>();
    private static final Map<String, ScriptSession> SCRIPT_SESSION = new ConcurrentHashMap<>();

    private static PushListener listener;
    private static Logger logger = Logger.getLogger(PushListener.class);
    private static PushListener pushListener;

    private PushListener() {
    }

    public static PushListener listenerFactory() {
        if (null == pushListener) {
            pushListener = new PushListener();
        }
        return pushListener;
    }

    /**
     * 会话/长连接创建时调用的方法
     */
    public void sessionCreated(ScriptSessionEvent event) {
        WebContext webContext = WebContextFactory. get();
        HttpSession session = webContext.getSession();

        ScriptSession scriptSession = event.getSession();

        String pageName = scriptSession.getPage();
        logger.debug("------------------页面地址---------------: " + pageName);
//        if (pageName.contains("snapshot.jsp")) {
//            scriptSession.setAttribute("type", "snapshot");
//            snapshotScriptSession.put(session.getId(), scriptSession);
//        } else if (pageName.contains("alarm.jsp") || pageName.contains("map.jsp")) {
//            scriptSession.setAttribute("type", "alarm");
//            alarmshotScriptSession.put(session.getId(), scriptSession);
//        }

        if (pageName.contains("map.do")) {
            SCRIPT_SESSION.put(session.getId(), scriptSession);
        }

        logger.debug("session: " + session.getId() + "  scriptSession: " + scriptSession.getId() + "is created!");
    }

    /**
     * 会话(长连接)关闭时调用的方法
     */
    public void sessionDestroyed(ScriptSessionEvent ev) {
        WebContext webContext = WebContextFactory. get();
        HttpSession session = webContext.getSession();

//        String pageName = ev.getSession().getPage();
//        if (pageName.contains("snapshot.jsp")) {
//            ScriptSession s = snapshotScriptSession.remove(session.getId());
//            System.err.println("snapshot 移除对象:" + s);
//        } else if (pageName.contains("alarm.jsp")) {
//            ScriptSession remove1 = alarmshotScriptSession.remove(session.getId());
//            System.err.println("alarm 移除对象:" + remove1);
//        }

        ScriptSession retireScriptSession = SCRIPT_SESSION.remove(session.getId());
        logger.debug("失效对象： " + retireScriptSession + "  httpsession: " + session);
    }

    /**
     * 获取所有ScriptSession
     */
//    public static Collection<ScriptSession> getScriptSessions(String type){
//        System.err.println(snapshotScriptSession.size() + "  :   " + alarmshotScriptSession.size());
//        if ("snapshot".equals(type)) {
//            return snapshotScriptSession.values();
//        } else if ("alarm".equals(type)) {
//            return alarmshotScriptSession.values();
//        }
//
//        return Browser.getTargetSessions();
//    }

    public static Collection<ScriptSession> getScriptSessions() {
        logger.debug("长连接保持存活对象个数: " + SCRIPT_SESSION.size());
        return SCRIPT_SESSION.values();
    }

}

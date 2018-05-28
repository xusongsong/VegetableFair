package com.coorun.faceidentifymanage.mq;

import org.directwebremoting.impl.DefaultScriptSessionManager;

public class DWRScriptSessionManager extends DefaultScriptSessionManager {

    public DWRScriptSessionManager(){
        this.addScriptSessionListener(PushListener.listenerFactory());
    }
}

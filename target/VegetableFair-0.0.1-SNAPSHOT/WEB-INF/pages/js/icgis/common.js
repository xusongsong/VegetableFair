//var serverPath = "http://192.168.2.136:8080/";
//serverPath="http://192.168.41.237:8080/";
//var web_url_prefix = serverPath + "OM/";
/**
 * 公关AJAX
 */
logInTest();
//$('input').placeholder();
//测试登陆
function logInTest(){    
    ajax({
        url: "login/login/scmpLogin",
        data: {
            loginName: 'zcl',
            password: '123'
        },
        successx: function (data) {
            console.log(data)
            if (data.success == '1') {
                setStorage("token", data.record.token);
                
                
            } else {
                alert(data.msg)
            }
        },
    })
}

function ajax(opt) {
    if (getStorage("token")) {
        opt.data.token = getStorage("token");
    }
    var defaultOpt = {
        url: "",
        type: "GET",
        dataType : 'jsonp',
        jsonp:"callback",
        data: {},
        timeout: 100000, //超时时间
        error: function (xhr, type) {
        }
    };
    opt.url = web_url_prefix + opt.url;
    opt = extend(defaultOpt, opt);
    console.log(opt);
    if (opt.loading) {
        opt.beforeSend = function (xhr, settings) {
        };
    }
    if (opt.successx) {
        opt.success = function (data, status) {
            opt.successx(data);
        };
    }
    $.ajax(opt);
}
function extend(target, source) {
    for (var p in source) {
        if (source.hasOwnProperty(p)) {
            target[p] = source[p];
        }
    }
    return target;
};


//设置字符串类型的本地缓存
function setStorage(objName, objValue) {
    var sto = window.localStorage;
    if (sto)
        sto.setItem(objName, objValue);
}
//读取字符串类型的本地缓存
function getStorage(objName) {
    var ret = '';
    var sto = window.localStorage;
    if (sto)
        ret = sto.getItem(objName);
    return ret;
}
//清除本地缓存，如没指定名称则为清空所 e   q 有缓存
function clearStorage(objName) {
    var sto = window.localStorage;
    if (sto) {
        if (objName)
            sto.removeItem(objName);
        else
            sto.clear();
    }
}
//设置Json类型的本地缓存
function setStorJson(objName, json) {
    if (json)
        setStorage(objName, JSON.stringify(json));
}
//读取Json类型的本地缓存
function getStorJson(objName) {
    var ret = null;
    var str = getStorage(objName);
    if (str)
        ret = JSON.parse(str);
    return ret;
}


/** 判断对象是否为空 **/
function isNullObject(map) {
    if (typeof map === "object" && !(map instanceof Array)) {
        var hasProp = true;
        for (var prop in map) {
            hasProp = false;
            break;
        }
        return hasProp
    }
}
/** 判断字符串是否为空 **/
function isNULL(str) {
    if (str == null || str == "" || str == undefined || str == "undefined" || str.replace(/(^s*)|(s*$)/g, "").length == 0 || str == "null") {
        return true;
    }
    return false;
}
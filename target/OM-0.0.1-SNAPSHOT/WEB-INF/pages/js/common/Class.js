// +----------------------------------------------------------------------
// | Coo Web Map Javascript API
// +----------------------------------------------------------------------
// | Copyright (c) 2016 http://www.hzkelan.com All rights reserved.
// +----------------------------------------------------------------------
// | Licensed Hzkelan OM
// +----------------------------------------------------------------------
// | Author: WebAPI Team
// +----------------------------------------------------------------------

/**
 +------------------------------------------------------------------------------
 * 构造函数: Class
 * 用于被其它类继承的基类，支持多重继承
 +------------------------------------------------------------------------------
 * 创建一个OM格式的类时，语法如下:
 * > var MyClass = OM.Class(prototype);
 *
 * 创建一个OM格式的类时，实现多重继承，语法如下:
 * > var MyClass = OM.Class(Class1, Class2, prototype);
 +------------------------------------------------------------------------------
 */
var OM = function () {}; 
OM.Class = function () {}; 

/**
 +------------------------------------------------------------------------------
 * 函数: extend
 * 复制源对象中所有所有属性到目标对象，以达到类继承的目的
 +------------------------------------------------------------------------------
 * 
 * > extend(destination, source);
 +------------------------------------------------------------------------------
 */

OM.Class.extend = function (props) {
	// 创建一个新类
	var ncls = function () {
		// call the constructor
		if (this["initialize"]) {
			this["initialize"].apply(this, arguments);
		}

		// call all constructor hooks
		if (this._initHooks) {
			this.callInitHooks();
		}
	};

	// instantiate class without calling constructor
	var F = function () {};
	F.prototype = this.prototype;

	var proto = new F();
	proto.constructor = ncls;

	ncls.prototype = proto;

	//inherit parent's statics
	for (var i in this) {
		if (this.hasOwnProperty(i) && i !== 'prototype') {
			ncls[i] = this[i];
		}
	}

	// 模拟静态class
	if (props["statics"]) {
		OM["extend"](ncls, props['statics']);
		delete props.statics;
	}

	// 包含对象class
	if (props["includes"]) {
	    /*
	    var icls = props.includes;
	    if (typeof icls === 'object') {
		   for (type in icls) {
					if (icls.hasOwnProperty(type)) {
						OM.Util.extend.apply(null, [proto].concat(icls[type]));
					}
		   }
		}else{
		  
		}
		delete icls;*/
		OM["Util"]["extend"].apply(null, [proto].concat(props["includes"]));
		delete props["includes"];
		
	}

	// 初始化参数
	if (props["options"] && proto["options"]) {
		props["options"] = OM["extend"]({}, proto["options"], props["options"]);
	}

	//  prototype
	OM["extend"](proto, props);
	return ncls;
};


OM.Class.isPrototype = function () {};
// 对象添加方法  
OM.Class.include = function (props) {
	OM["extend"](this.prototype, props);
};
// 对象添加方法  
OM.Class.method = function (props) {
	OM["extend"](this.prototype, props);
};
// 对象参数对象
OM.Class.options = function (options) {
	OM["extend"](this.prototype.options, options);
};
//  对象类名
OM.Class.className = function (applyClass,className) {
	 applyClass.prototype.toString  = function() {
            return className ;
     };
};
OM['Class'] = OM.Class;
OM['Class']['extend'] = OM.Class.extend;
OM['Class']['method'] = OM.Class.method;
OM['Class']['include'] = OM.Class.include;
OM['Class']['options'] = OM.Class.options;
OM['Class']['className'] = OM.Class.className;



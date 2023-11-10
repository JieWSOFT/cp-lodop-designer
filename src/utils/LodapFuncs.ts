//==本JS是加载Lodop插件及CLodop服务的综合示例，可直接使用，建议看懂后融进自己页面程序==

var CreatedOKLodopObject: any, CLodopIsLocal: any, CLodopJsState: any;

//检测操作系统2022-03-02
function detectOS() {
  var isWin = (navigator.platform == "Win32") || (navigator.platform == "Windows");
  var isMac = (navigator.platform == "Mac68K") || (navigator.platform == "MacPPC") || (navigator.platform == "Macintosh") || (navigator.platform == "MacIntel");
  var isLinux = (String(navigator.platform).indexOf("Linux") > -1);
  var isLinux_x86 = (String(navigator.platform).indexOf("Linux x86") > -1);
  var isLinux_arm = (String(navigator.platform).indexOf("Linux aarch64") > -1);
  var isUnix = (navigator.platform == "X11") && !isWin && !isMac;
  if (isMac) return "Mac";
  if (isUnix) return "Unix";
  if (isLinux_x86) return "Linux_x86";
  if (isLinux_arm) return "Linux_arm";
  if (isLinux) return "Linux";
  if (isWin) return "Windows";
  return "other";
}
//==判断是否需要CLodop(那些不支持插件的浏览器):==
function needCLodop() {
  try {
    var ua = navigator.userAgent;
    if (ua.match(/Windows\sPhone/i))
      return true;
    if (ua.match(/iPhone|iPod|iPad/i))
      return true;
    if (ua.match(/Android/i))
      return true;
    if (ua.match(/Edge\D?\d+/i))
      return true;

    var verTrident = ua.match(/Trident\D?\d+/i);
    var verIE = ua.match(/MSIE\D?\d+/i);
    var verOPR = ua.match(/OPR\D?\d+/i);
    var verFF = ua.match(/Firefox\D?\d+/i);
    var x64 = ua.match(/x64/i);
    if ((!verTrident) && (!verIE) && (x64))
      return true;
    else if (verFF) {
      verFF = verFF[0].match(/\d+/);
      if (((verFF?.[0] as any) >= 41) || (x64))
        return true;
    } else if (verOPR) {
      verOPR = verOPR[0].match(/\d+/);
      if (verOPR?.[0] as any >= 32)
        return true;
    } else if ((!verTrident) && (!verIE)) {
      var verChrome = ua.match(/Chrome\D?\d+/i);
      if (verChrome) {
        verChrome = verChrome[0].match(/\d+/);
        if (verChrome?.[0] as any >= 41)
          return true;
      }
    }
    return false;
  } catch (err) {
    return true;
  }
}

//加载CLodop时用双端口(http是8000/18000,而https是8443/8444)以防其中某端口被占,
//主JS文件“CLodopfuncs.js”是固定文件名，其内容是动态的，与当前打印环境有关:
function loadCLodop() {
  if (CLodopJsState == "loading" || CLodopJsState == "complete") return;
  CLodopJsState = "loading";
  var head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
  var JS1 = document.createElement("script");
  var JS2 = document.createElement("script");

  if (window.location.protocol == 'https:') {
    JS1.src = "https://localhost.lodop.net:8443/CLodopfuncs.js";
    JS2.src = "https://localhost.lodop.net:8444/CLodopfuncs.js";
  } else {
    JS1.src = "http://localhost:8000/CLodopfuncs.js";
    JS2.src = "http://localhost:18000/CLodopfuncs.js";
  }
  JS1.onload = JS2.onload = function () { CLodopJsState = "complete"; }
  JS1.onerror = JS2.onerror = function () { CLodopJsState = "complete"; }
  head.insertBefore(JS1, head.lastChild);
  head.insertBefore(JS2, head.lastChild);
  CLodopIsLocal = !!((JS1.src + JS2.src).match(/\/\/localho|\/\/127.0.0./i));
}

if (needCLodop()) { loadCLodop(); }//开始加载

//==获取LODOP对象主过程,判断是否安装、需否升级:==
function getLodop(oOBJECT?: any, oEMBED?: any) {
  var strHtmInstall = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop32.zip' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtmUpdate = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop32.zip' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtm64_Install = "<br><font color='#FF00FF'>打印控件未安装!点击这里<a href='install_lodop64.zip' target='_self'>执行安装</a>,安装后请刷新页面或重新进入。</font>";
  var strHtm64_Update = "<br><font color='#FF00FF'>打印控件需要升级!点击这里<a href='install_lodop64.zip' target='_self'>执行升级</a>,升级后请重新进入。</font>";
  var strHtmFireFox = "<br><br><font color='#FF00FF'>（注意：如曾安装过Lodop旧版附件npActiveXPLugin,请在【工具】->【附加组件】->【扩展】中先卸它）</font>";
  var strHtmChrome = "<br><br><font color='#FF00FF'>(如果此前正常，仅因浏览器升级或重安装而出问题，需重新执行以上安装）</font>";
  var filepath = "/static/resource/js/CLodop_Setup_for_Win64NT_6.566EN.zip";
  if (detectOS().indexOf("Linux_x86") > -1) { filepath = "http://www.c-lodop.com/download/Lodop7.039_Linux_X86_64_CN.tar.gz"; }
  if (detectOS().indexOf("Linux_arm") > -1) { filepath = "http://www.c-lodop.com/download/Lodop7.039_Linux_ARM64_CN.tar.gz"; }
  var strCLodopInstall_1 = "<br><font color='#FF00FF'>Web打印服务CLodop未安装启动，点击这里<a href='" + filepath + "' target='_self'>下载执行安装</a>";
  var strCLodopInstall_2 = "<br>（若此前已安装过，可<a href='CLodop.protocol:setup' target='_self'>点这里直接再次启动</a>）";
  var strCLodopInstall_3 = "，成功后请刷新或重启浏览器。</font>";
  var strCLodopUpdate = "<br><font color='#FF00FF'>Web打印服务CLodop需升级!点击这里<a href='" + filepath + "' target='_self'>执行升级</a>,升级后请刷新或重启浏览器。</font>";
  var LODOP;
  try {
    var ua = navigator.userAgent;
    var isIE = !!(ua.match(/MSIE/i)) || !!(ua.match(/Trident/i));
    var is64IE = isIE && !!(ua.match(/x64/i));
    if (needCLodop()) {
      try {
        LODOP = (window as any).getCLodop()
      } catch (err) { }
      if (!LODOP && CLodopJsState !== "complete") {
        if (CLodopJsState == "loading") alert("网页还没下载完毕，请稍等一下再操作."); else alert("没有加载CLodop的主js，请先调用loadCLodop过程.");
        return;
      }
      if (!LODOP) {
        let div = document.createElement('div')
        div.innerHTML = strCLodopInstall_1 + (CLodopIsLocal ? strCLodopInstall_2 : "") + strCLodopInstall_3;
        document.body.insertBefore(div, document.getElementById('app'))
        return;
      } else {
        if ((window as any).CLODOP.CVERSION < "6.5.6.6") {
          let div = document.createElement('div')
          div.innerHTML = strCLodopUpdate;
          document.body.insertBefore(div, document.getElementById('app'))
        }
        if (oEMBED && oEMBED.parentNode)
          oEMBED.parentNode.removeChild(oEMBED); //清理旧版无效元素
        if (oOBJECT && oOBJECT.parentNode)
          oOBJECT.parentNode.removeChild(oOBJECT);
      }
    } else {
      //==如果页面有Lodop就直接使用,否则新建:==
      if (oOBJECT || oEMBED) {
        if (isIE)
          LODOP = oOBJECT;
        else
          LODOP = oEMBED;
      } else if (!CreatedOKLodopObject) {
        LODOP = document.createElement("object");
        LODOP.setAttribute("width", '0');
        LODOP.setAttribute("height", '0');
        LODOP.setAttribute("style", "position:absolute;left:0px;top:-100px;width:0px;height:0px;");
        if (isIE)
          LODOP.setAttribute("classid", "clsid:2105C259-1E0C-4534-8141-A753534CB4CA");
        else
          LODOP.setAttribute("type", "application/x-print-lodop");
        document.documentElement.appendChild(LODOP);
        CreatedOKLodopObject = LODOP;
      } else
        LODOP = CreatedOKLodopObject;
      //==Lodop插件未安装时提示下载地址:==
      if ((!LODOP) || (!LODOP.VERSION)) {
        if (ua.indexOf('Chrome') >= 0)
          document.body.innerHTML = strHtmChrome + document.body.innerHTML;
        if (ua.indexOf('Firefox') >= 0)
          document.body.innerHTML = strHtmFireFox + document.body.innerHTML;
        document.body.innerHTML = (is64IE ? strHtm64_Install : strHtmInstall) + document.body.innerHTML;
        return LODOP;
      }
    }
    if (LODOP.VERSION < "6.2.2.6") {
      if (!needCLodop())
        document.body.innerHTML = (is64IE ? strHtm64_Update : strHtmUpdate) + document.body.innerHTML;
    }
    //===如下空白位置适合调用统一功能(如注册语句、语言选择等):==

    // if (detectOS().indexOf("Linux") > -1) {
    //   //Linux操作系统执行注册语句
    //   // LODOP.SET_LICENSES("", "", "EDE92F75B6A3D917F65910", "");
    // } else {
    //其他操作系统执行中注册语句
    LODOP.SET_LICENSES("", "6DFCCD5255A89C36A8715F667F8B9FA99FC", "", "");
    // }
    //===============================================.com//.com台级//.net
    return LODOP;
  } catch (err) {

    alert("getLodop出错:" + err);
  }
}

export default getLodop
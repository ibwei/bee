const domainName = "http://localhost/api";
const api = {
  user: {
    //用户登录
    login: domainName + "/user/login",
    //用户登出
    logout: domainName + "/user/logout",
    //获取验证码
    getCode:domainName + "/user/getCode",
    //服务器验证
    validateCode:domainName + "/user/validateCode",
    //绑定电话号码
    bindPhoneNuber:domainName+"/user/bindPhoneNumber",
  },
  project: {
    //获取所有的项目
    projectData: domainName + "/project/projectData",
    //获取已有项目名
    allProjectName:domainName+"/project/allProjectName",
    //新建项目类型
    newProjectType:domainName+"/project/newProjectType",
    //删除项目类型
    deleteProjectType:domainName+"/project/deleteProjectType",
    //修改项目
    editProject: domainName + "/project/editProject",
    //获取用户曾建立的所有蜂场名
    getAllSiet: domainName + "/project/getAllSite",
      //获取用户曾建立的所有的项目类型
    getAllType: domainName + "/project/getAllType",
      //新建项目
    newProject: domainName + "/project/newProject",
    //获取符合用户搜索条件的项目
    searchProject:domainName +"/project/searchProject"
  },
  check:{
    //获取符合用户搜索条件的检测项目
    searchCheck:domainName+'/check/searchCheck',
    //搜索当前用户所有检测记录
    checkHistory:domainName+'/check/checkHistory',
    //发起检测第一面的请求
    aCheck:domainName+'/check/aCheck',
    //发起检测第二面的请求
    bCheck:domainName+'/check/bCheck',
    //获取检测报告
    getCheckReport:domainName+'/check/getCheckReport',
  }
};

export default api;

(() => {
  switch (window.location.hostname) {
    case "192.168.1.232":
      window.g = {
        baseURL: "http://192.168.1.232:9009/name", //线上ip
        imgType: ".jpg,.jpeg,.png,.gif", // 图片类型
        fileType:
          ".doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt,.pdf", // 上传文件类型
        filePath: "http://192.168.1.226:9000/production/", // 文件路径拼接
        timeout: 1 * 60 * 1000, //超时
        mapStyles: [ // mapbox 地图路径
          "http://192.168.1.233:8090/iserver/services/map-mvt-dpxzqh0910/rest/maps/dpxzqh0910/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true",
          "http://192.168.1.233:8090/iserver/services/map-mvt-scgl1215/rest/maps/scgl1215/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true",
        ]
      };
      break;
    default:
      window.g = {
        baseURL: "http://192.168.1.226:9000/name", //线上ip
        imgType: ".jpg,.jpeg,.png,.gif", // 图片类型
        fileType:
          ".doc,.docx,.xlsx,.xls,.ppt,.pptx,.txt,.pdf", // 上传文件类型
        filePath: "http://192.168.1.226:9000/name/", // 文件路径拼接
        timeout: 1 * 60 * 1000, //超时
        mapStyles: [ // mapbox 地图路径
          "http://192.168.1.233:8090/iserver/services/map-mvt-dpxzqh0910/rest/maps/dpxzqh0910/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true",
          "http://192.168.1.233:8090/iserver/services/map-mvt-scgl1215/rest/maps/scgl1215/tileFeature/vectorstyles.json?type=MapBox_GL&styleonly=true",
        ]
      };
      break;
  }

  // 其他扩展配置
  window.g = Object.assign(window.g, {

  });
})();

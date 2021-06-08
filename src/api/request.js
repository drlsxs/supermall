import axios from "axios";
import { Message } from "element-ui";

// create an axios instance
let baseURL;
if (process.env.NODE_ENV === "production") {
  baseURL = window.g.baseURL;
} else {
  // baseURL = "/service226";
  // baseURL = "/service240";
  // baseURL = "/service205";
  // baseURL = "/service108";
  // baseURL = '/service103';
  // baseURL = "/service161";
  baseURL = "/service232";

}
const request = axios.create({
  baseURL,
  timeout: window.g.timeout,
});
// request interceptor
request.interceptors.request.use(
  (config) => {
    let token = sessionStorage.token || "6c223097-a071-4c55-bb02-04caf37e5252";

    config.headers.token = token;
    config.crossDomain = true;
    config.async = true;
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 下载
function download(blobUrl, filename) {
  const a = document.createElement('a');
  a.style.display = 'none';
  a.download = filename + ".xlsx";
  a.href = blobUrl;
  a.click();

  Message({
    message: filename + "下载成功！",
    type: "success",
    duration: 1000,
    showClose: true,
  });
}

// response interceptor
request.interceptors.response.use(
  (response) => {
    const res = response.data;
    // console.log(response.headers['content-disposition']);
    // if (response.config.headers.responseType == "blob" res.type === "application/vnd.ms-excel") {

    // }
    // 判断是否文件流
    if (response.config.headers.responseType == "blob") {
      const blobUrl = window.URL.createObjectURL(res);
      download(blobUrl, response.config.filename);
    } else {
      if (res.code !== 200) {
        Message({
          message: res.msg || "Error",
          type: "error",
          duration: 2000,
          showClose: true,
        });
        return res;
      } else {
        return res;
      }
    }
  },
  (error) => {
    Message({
      message: error.message,
      type: "error",
      duration: 2000,
      showClose: true,
    });
    return Promise.reject(error);
  }
);

export default request;

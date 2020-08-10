import axios from "axios";
let token = localStorage.getItem('token');
let host = 'http://srv.shine-iot.com:8060'
const posts = (url, json, boolean) => {
    console.log(url);
    console.log(json);
    if (!boolean) {
        url = `${url}`;
    }
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            data: json,
            headers: {
                "Content-Type": "application/x-www-form-urlencoded;", //application/json
            }
        }).then(res => {
            resolve(res.data);
        }).catch(() => {
            reject("post请求链接失败");
        });
    });
};
const post = (url, json, boolean) => {
    if (!boolean) {
        url = `${url}`;
        axios.interceptors.request.use(config => {
            token = 'Bearer' + localStorage.getItem('token');
            if (token) { // 判断是否存在token，如果存在的话，则每个http header都加上token
                config.headers.Authorization = token;
            }
            return config
        }, error => {
            return Promise.reject(error)
        })
    }
    return new Promise((resolve, reject) => {
        axios({
            method: "post",
            url: url,
            data: json,
            headers: {
                "Content-Type": "application/json" //application/x-www-form-urlencoded
            }
        }).then(res => {
            resolve(res.data);
        }).catch(() => {
            reject("post请求链接失败");
        });
    });
};
const get = (url, boolean, json) => {
    if (!boolean) {
        if (url.indexOf("?") != -1) {
            url = `${url}`;
        } else {
            url = `${url}`;
        }
    }
    return new Promise((resolve, reject) => {
        axios.get(url, {
            params: json
        }).then(res => {
            resolve(res.data);
        }, () => {
            reject("get请求链接失败");
        });
    });
};
// 登录
const loginApi = (json) => {
    return posts(host + `/login`, json, true);
}
// 获取设备基本详情、 以及设备的安装信息
const detailApi = (deviceId) => {
    return get(host + `/device/base/detail/${deviceId}`, true);
}
const logout = () => {
    return post(host + `/logout`);
}
const deviceOrgKcnt = () => {
    return post(host + `/device/org/kcnt`);
}
const orgLogps = () => {
    return post(host + `/org/logps`);
}
const deviceAreaDevgps = () => {
    return post(host + `/device/area/devgps`);
}
const deviceAlarmCnt = () => {
    return post(host + `/device/alarm/cnt`);
}
const deviceStusCnt = () => {
    return post(host + `/device/stus/cnt`);
}
const deviceTypeCnt = () => {
    return post(host + `/device/type/cnt`);
}
const deviceTpcodes = () => {
    return post(host + `/device/tpcodes`);
}
const fdevMntAreaEvts = (json) => {
    return post(host + `/fdev/mnt/area/evts?pageNo=${json.pageNo}`, json);
}
const fdevMntTypeCnt = () => {
    return post(host + `/fdev/mnt/type/cnt`);
}
const fdevMntAlarmCnt = () => {
    return post(host + `/fdev/mnt/alarm/cnt`);
}
const fdevMntStusCnt = () => {
    return post(host + `/fdev/mnt/stus/cnt`);
}

const fdevMntStus = () => {
    return get(host + `/fdev/mnt/stus`);
}
const fdevMntTypes = () => {
    return get(host + `/fdev/mnt/types`);
}
const fdevMntDevs = (json) => {
    return post(host + `/fdev/mnt/devs?pageNo=${json.pageNo}`, json);
}
const deviceBaseDetail = (deviceid) => {
    return get(host + `/device/base/detail/${deviceid}`);
}
const websocket = (userId) => {
    return get(host + `/websocket/${userId}`);
}
export {
    post,
    posts,
    get,
    loginApi, // 用户登录
    detailApi, //ceshi
    setTokenApi, //公用token
    logout, //退出登录
    deviceOrgKcnt, //地图底部示例
    orgLogps, //地图区域坐标
    deviceAreaDevgps, // 设备坐标
    deviceAlarmCnt, //监控主页报警趋势图例
    deviceStusCnt, //监控主页设备状态图例
    deviceTypeCnt, // 监控主页设备数量分布图例
    deviceTpcodes, // 监控主页图例设备类型
    fdevMntAreaEvts, //火灾监控页事件列表
    fdevMntTypeCnt, // 火灾监控页设备类型图例
    fdevMntAlarmCnt, // 火灾监控页报警趋势图例
    fdevMntStusCnt, //火灾监控页设备数量图例
    fdevMntTypes, //火灾监控页设备类型下拉列表
    fdevMntDevs, //火灾监控页列表
    deviceBaseDetail, //火灾监控页列表详情
    websocket, // 推送
    fdevMntStus, //设备状态
}
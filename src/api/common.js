import axios from '@/utils/request'

const login = function (data) {
  return axios({
    url: '/project-api/api/user/login', // url = base url + request url
    method: 'post',
    data: data // ----------------->>>区别
  })
}

const getMenuConfig = function (params) {
  return axios({
    url: '/project-api/api/config', // url = base url + request url
    method: 'get',
    params: params // ----------------->>>区别
  })
}

export default {
  login,
  getMenuConfig
}

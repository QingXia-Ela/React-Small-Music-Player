import request from '@/utils/request';

export function loginByCaptcha(data: object) {
  return request({
    method: 'POST',
    url: '/login/cellphone',
    params: { ...data },
  });
}

export function getCaptchaCode(phone: number) {
  return request({
    method: 'GET',
    url: '/captcha/sent',
    params: { phone },
  });
}

export function logout() {
  return request({
    method: 'GET',
    url: '/logout',
  });
}

export function getLoginState() {
  return request({
    method: 'GET',
    url: '/login/status',
  });
}

import { getLoginState } from '@/api/login';
import {
  CHANGELOGINSTATE,
  SHOWLOGINMODAL,
  SETUSERINFO,
} from '@/redux/constant';
import { ThunkActionDispatch } from 'redux-thunk';

/**
 * 修改登陆状态
 */
export const changeLoginState = (data: boolean | undefined) => ({
  type: CHANGELOGINSTATE,
  data,
});

/**
 * 是否展示登陆模态框
 */
export const showLoginModal = (data: boolean | undefined) => ({
  type: SHOWLOGINMODAL,
  data,
});

/**
 * 设置当前账户信息
 */
export const setUserInfo = (data: object) => ({ type: SETUSERINFO, data });

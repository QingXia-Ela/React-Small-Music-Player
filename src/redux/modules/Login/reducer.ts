import {
  CHANGELOGINSTATE,
  SETUSERINFO,
  SHOWLOGINMODAL,
  SHOWLOGOUTMODAL,
} from '@/redux/constant';

let initState = {
  showLoginModal: false,
  isLogin: false,
  userInfo: null,
  showLogoutModal: false,
};

export default function LoginReducer(
  prevState = initState,
  action: { [propName: string]: any },
) {
  const { type, data } = action;
  let newState = { ...prevState };

  switch (type) {
    case SHOWLOGINMODAL:
      if (typeof data == 'undefined')
        newState.showLoginModal = !newState.showLoginModal;
      else newState.showLoginModal = data;
      break;

    case CHANGELOGINSTATE:
      if (typeof data == 'undefined') newState.isLogin = !newState.isLogin;
      else newState.isLogin = data;
      break;

    case SETUSERINFO:
      newState.userInfo = { ...data };
      break;

    case SHOWLOGOUTMODAL:
      if (typeof data == 'undefined')
        newState.showLogoutModal = !newState.showLogoutModal;
      else newState.showLogoutModal = data;
      break;

    default:
      break;
  }

  return newState;
}

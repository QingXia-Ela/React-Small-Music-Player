import store from '@/redux';
import { finishInit } from './redux/modules/pageInit/action';

export function render(oldRender: any) {
  oldRender();
  let time = +new Date();

  window.onload = (e: Event) => {
    store.dispatch(finishInit());
    console.log('finish load time', +new Date() - time);
  };
}

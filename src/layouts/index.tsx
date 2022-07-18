import './index.scss'
import { IRouteComponentProps } from 'umi'
import { Provider } from 'react-redux'

import store from '@/redux/index'
import BG from './bg'


export default function Layout({ children, location, route, history, match }: IRouteComponentProps) {
  return (
    <Provider store={store}>
      <div className="layout">
        Layout
        {children}
      </div>
      <BG bgLink={require('@/assets/images/bg/base_bg.jpg')}></BG>
    </Provider>
  )
}
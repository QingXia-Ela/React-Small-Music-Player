import React, { Fragment } from 'react';
import nprogress from 'nprogress';
import './index.scss';
import { connect } from 'react-redux';

import LoadingProgress from './Progress';

interface LoadingProps {
  initState: boolean;
}

interface LoadingState {
  progress: number | null;
  maskClassName: string | undefined;
  removeMask: boolean;
}

class Loading extends React.Component<LoadingProps, LoadingState> {
  state = {
    progress: 0,
    maskClassName: 'loading_mask',
    removeMask: false,
  };
  private progressTimer: any = 0;

  render() {
    return this.state.removeMask ? (
      <Fragment></Fragment>
    ) : (
      <div className={this.state.maskClassName}>
        <div className="title">Welcome To Shiina's Music Website</div>
        <LoadingProgress value={this.state.progress} />
      </div>
    );
  }
  componentDidMount() {
    nprogress.configure({
      showSpinner: false,
    });

    nprogress.start();
    this.progressTimer = setInterval(() => {
      this.setState({ progress: nprogress.status });
    }, 400);
  }

  componentDidUpdate() {
    if (this.state.progress < 1 && this.props.initState) {
      new Promise((resolve, reject) => {
        setTimeout(resolve, 1000, this.state.progress);
      })
        .then((res) => {
          return new Promise((resolve, reject) => {
            nprogress.done();
            this.setState({
              progress: 1,
              maskClassName: 'loading_mask done',
            });
            clearInterval(this.progressTimer);
            resolve(res);
          });
        })
        .then((res) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.setState({
                maskClassName: 'loading_mask hidden',
              });
              resolve(res);
            }, 1600);
          });
        })
        .then((res) => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              this.setState({
                removeMask: true,
              });
            }, 1000);
          });
        });
    }
  }
}

export default connect((state: { [propName: string]: any }) => ({
  initState: state.pageInit,
}))(Loading);

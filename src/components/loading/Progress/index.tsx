import './index.scss';

interface LoadingProgressProps {
  value: number | null;
}

function LoadingProgress(props: LoadingProgressProps) {
  const handleProgress = (value: number | null) => {
    if (!value) return undefined;
    return parseInt(value * 100 + '');
  };

  const val = handleProgress(props.value);

  return (
    <div className="loading_progress" id="loadingProgress">
      <div className="progress_bar_container">
        <div
          className="progress_left"
          style={{ transform: `translateX(${(val ? val + 0.3 : 0) - 100}%)` }}
        ></div>
        <div
          className="progress_right"
          style={{ transform: `translateX(${100 - (val ? val : 0)}%)` }}
        ></div>
      </div>
      <div className="text">{val ? val + '%' : '0%'}</div>
    </div>
  );
}

export default LoadingProgress;

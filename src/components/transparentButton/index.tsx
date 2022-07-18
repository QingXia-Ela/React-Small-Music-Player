import './index.scss'

/**
 * 透明按钮，悬浮后颜色变深
 */
function TransparentButton(props: { [propName: string]: any }) {
  return (
    <div className="transparent_button">
      {props.children}
    </div>
  );
}

export default TransparentButton;
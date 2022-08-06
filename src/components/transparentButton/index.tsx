import './index.scss';

/**
 * 透明按钮，悬浮后颜色变深
 */
function TransparentButton(props: { [propName: string]: any }) {
  return (
    <div
      className={`transparent_button 
      ${props.disabled ? 'disabled' : ''}
      ${props.closeHoverPointer ? '' : 'hover_pointer'} 
      ${props.active ? 'active' : ''}`}
      onClick={props.onClick ? (e) => props.onClick(e) : undefined}
    >
      {props.children}
    </div>
  );
}

export default TransparentButton;

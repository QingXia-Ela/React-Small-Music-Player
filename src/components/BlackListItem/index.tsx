import * as React from 'react';
import './index.scss';

interface BlackListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element;
  iconBefore?: JSX.Element;
  align?: React.CSSProperties['textAlign'];
}

interface BlackListItemState {}

class BlackListItem extends React.Component<
  BlackListItemProps,
  BlackListItemState
> {
  state = {};
  render() {
    return (
      <div
        className={this.props.className + ' black_list_item_style'}
        style={{ textAlign: this.props.align ? this.props.align : 'left' }}
        onClick={this.props.onClick}
      >
        {this.props.iconBefore}
        <div className="black_list_item_content">{this.props.children}</div>
      </div>
    );
  }
}

export default BlackListItem;

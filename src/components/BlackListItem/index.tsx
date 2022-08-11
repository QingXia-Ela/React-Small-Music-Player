import * as React from 'react';
import './index.scss';

interface BlackListItemProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: JSX.Element;
  iconBefore?: JSX.Element;
}

interface BlackListItemState {}

class BlackListItem extends React.Component<
  BlackListItemProps,
  BlackListItemState
> {
  state = {};
  render() {
    return (
      <div className={this.props.className + ' black_list_item_style'}>
        {this.props.iconBefore}
        {this.props.children}
      </div>
    );
  }
}

export default BlackListItem;

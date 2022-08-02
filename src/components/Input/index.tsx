import { forwardRef } from 'react';
import './index.scss';

import { Input } from 'antd';

const BlackInput = forwardRef(
  (props: { [propName: string]: any }, ref: any) => {
    return (
      <Input
        className="black_input"
        type="text"
        placeholder="Type in your text..."
        ref={ref}
        {...props}
      ></Input>
    );
  },
);

export default BlackInput;

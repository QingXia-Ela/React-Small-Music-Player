import { forwardRef } from 'react';
import './index.scss';

const BlackInput = forwardRef(
  (props: { [propName: string]: any }, ref: any) => {
    return (
      <input
        className="black_input"
        type="text"
        placeholder="Type in your text..."
        ref={ref}
        {...props}
      />
    );
  },
);

export default BlackInput;

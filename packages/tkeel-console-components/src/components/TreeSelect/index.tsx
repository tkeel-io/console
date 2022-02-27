import RCTreeSelect, { TreeSelectProps } from 'rc-tree-select';

// import { PREFIX_CLS } from './constants';
import StyledWrapper from './StyledWrapper';

export default function TreeSelect(props: TreeSelectProps) {
  return (
    <>
      <StyledWrapper />
      <RCTreeSelect
        // prefixCls={PREFIX_CLS}
        {...props}
      />
    </>
  );
}

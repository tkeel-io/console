import { merge } from 'lodash';
import RCSelect, { OptGroup, Option } from 'rc-select';

import { DEFAULT_PREFIX_CLS, DEFAULT_PROPS } from './defaults';
import SelectStyles from './SelectStyles';
import { SelectProps } from './types';

export default function Select(props: SelectProps) {
  const properties = merge({}, DEFAULT_PROPS, props);

  return (
    <>
      <SelectStyles prefixCls={DEFAULT_PREFIX_CLS} />
      <RCSelect {...properties} />
    </>
  );
}

Select.OptGroup = OptGroup;
Select.Option = Option;

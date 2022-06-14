import { Box, Text } from '@chakra-ui/react';
import { indexOf } from 'lodash';
import { UseFieldArrayReturn, UseFormReturn } from 'react-hook-form';

import { DeprecatedSelect, FormControl } from '@tkeel/console-components';

import { CommandParamFormField } from '../DeviceCommandModal/components/CommandParamModal/types';
import { DataTypeConfigs, ExtendedConfig } from './components';
import { DATA_TYPE } from './constants';
import { FieldArrayHandler, FormFieldType, TelemetryFormField } from './types';

interface Props {
  formHandler: FormFieldType;
  fieldArrayHandler: FieldArrayHandler;
  supportExtendedConfig?: boolean;
  extendedArrayHandler?: UseFieldArrayReturn<TelemetryFormField, 'extendInfo'>;
  dataTypeConfig: string[];
}

export default function DeviceDataType({
  formHandler,
  fieldArrayHandler,
  supportExtendedConfig = false,
  extendedArrayHandler,
  dataTypeConfig,
}: Props) {
  const { setValue, reset, watch } = formHandler as UseFormReturn<
    TelemetryFormField | CommandParamFormField
  >;
  const watchFields = watch();

  const showDataType = DATA_TYPE.filter((item) => {
    return indexOf(dataTypeConfig, item.value) > -1;
  });

  return (
    <>
      <FormControl id="type" label="数据类型">
        <DeprecatedSelect
          style={{ width: '100%' }}
          placeholder="请选择"
          defaultValue={watchFields.type}
          onChange={(value: string) => {
            reset({ fields: [], extendInfo: [] });
            setValue('type', value);
          }}
        >
          {showDataType.map((item) => (
            <DeprecatedSelect.Option key={item.value} value={item.value}>
              {item.label}
            </DeprecatedSelect.Option>
          ))}
        </DeprecatedSelect>
        {watchFields.type === 'enum' && (
          <Text fontSize="12px" color="gray.500" marginTop="10px">
            枚举项：0～N 自然数，可通过扩展配置添加
          </Text>
        )}
      </FormControl>
      <Box>
        <DataTypeConfigs
          dataType={watchFields.type}
          formHandler={formHandler}
          fieldArrayHandler={fieldArrayHandler}
          supportExtendedConfig={supportExtendedConfig}
          extendedArrayHandler={extendedArrayHandler}
        />
      </Box>
      {extendedArrayHandler && (
        <ExtendedConfig
          extendedArrayHandler={extendedArrayHandler}
          formHandler={formHandler}
        />
      )}
    </>
  );
}

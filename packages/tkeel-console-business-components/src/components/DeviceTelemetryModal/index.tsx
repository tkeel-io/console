import { Box, Text } from '@chakra-ui/react';
import { isObject, keyBy, keys, mapValues, merge, pick } from 'lodash';
import { useEffect, useMemo } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';

import { FormField, Modal } from '@tkeel/console-components';
import { TelemetryFormFields } from '@tkeel/console-request-hooks';
import { plugin, schemas } from '@tkeel/console-utils';

import DeviceDataType from '../DeviceDataType';
import { DATA_TYPE_CONFIG } from '../DeviceDataType/constants';

const { TextareaField } = FormField;

interface Field {
  key: string;
  label: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  value: any;
  type: string;
}

interface TelemetryFormField extends TelemetryFormFields {
  fields: Field[];
  extendInfo: { label: string; value: string }[];
}

interface Props {
  isEdit?: boolean;
  isOpen: boolean;
  defaultValues?: TelemetryFormFields;
  isConfirmButtonLoading?: boolean;
  onClose: () => void;
  onConfirm: (formValues: TelemetryFormFields) => unknown;
}

const { TextField } = FormField;
export default function DeviceTelemetryModal({
  isEdit = false,
  isOpen,
  isConfirmButtonLoading,
  defaultValues,
  onClose,
  onConfirm,
}: Props) {
  const toast = plugin.getPortalToast();

  const extendInfo = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const defaultExt = defaultValues?.define?.ext ?? {};
    return isObject(defaultExt)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        Object.keys(defaultExt).map((k) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
          return { label: k, value: defaultExt[k] };
        })
      : [];
  }, [defaultValues]);

  const fields: Field[] = useMemo(() => {
    const fieldsTemp: Field[] = [];
    const fieldsObject = pick(defaultValues?.define, keys(DATA_TYPE_CONFIG));
    Object.keys(fieldsObject).forEach((key) => {
      fieldsTemp.push({
        key,
        label: '',
        type: '',
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        value: fieldsObject[key],
      });
    });
    return fieldsTemp;
  }, [defaultValues]);

  const formHandler = useForm<TelemetryFormField>({
    defaultValues: merge(defaultValues, {
      extendInfo,
      fields,
    }),
  });
  const {
    register,
    formState: { errors },
    trigger,
    reset,
    setValue,
    getValues,
    control,
  } = formHandler;

  const fieldArrayHandler = useFieldArray({
    control,
    name: `fields`,
  });

  const extendedArrayHandler = useFieldArray({
    control,
    name: 'extendInfo',
  });

  const handleConfirm = async () => {
    if (isEdit) {
      setValue('id', defaultValues?.id ?? '');
    }

    const result = await trigger();
    if (result) {
      const formValues = getValues() as TelemetryFormField;
      const defineAtt = {};
      (formValues?.fields ?? []).forEach((item) => {
        defineAtt[item.key] = item.value as string;
      });
      const ext = mapValues(
        keyBy(formValues?.extendInfo ?? [], 'label'),
        'value'
      );

      if (
        formValues.type === 'enum' &&
        Object.keys(ext).some((item) => !/^\d+$/.test(item))
      ) {
        toast.error(`数据类型为枚举时，key值需为number类型`);
        return;
      }
      const formValuesCopy = {
        ...formValues,
        define: { ext, ...defineAtt },
        extendInfo: undefined,
        fields: undefined,
      };

      onConfirm(formValuesCopy);
    }
  };

  useEffect(() => {
    if (isOpen) {
      if (!isEdit) {
        reset();
      } else {
        reset(
          merge(defaultValues, {
            extendInfo,
            fields,
          })
        );
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, isEdit, reset]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      isConfirmButtonLoading={isConfirmButtonLoading}
      title={`${isEdit ? '编辑' : '新建'}遥测`}
      width="480px"
      onConfirm={handleConfirm}
    >
      <TextField
        label="遥测名称"
        id="name"
        error={errors.name}
        registerReturn={register('name', {
          required: { value: true, message: '请填写遥测名称' },
          maxLength: { value: 32, message: '长度最多32' },
        })}
      />
      <TextField
        label="遥测ID"
        id="id"
        isDisabled={isEdit}
        error={errors.id}
        registerReturn={register('id', {
          required: { value: true, message: '请填写遥测ID' },
          pattern: schemas.idPattern,
        })}
      />
      <DeviceDataType
        formHandler={formHandler}
        fieldArrayHandler={fieldArrayHandler}
        supportExtendedConfig
        extendedArrayHandler={extendedArrayHandler}
        dataTypeConfig={['int', 'float', 'double', 'bool', 'enum']}
      />
      <Box>
        <Text color="gray.600" fontSize="14px" mb="4px">
          描述
        </Text>
        <TextareaField
          id="description"
          error={errors.description}
          registerReturn={register('description', {
            required: { value: false, message: '用户名称' },
          })}
        />
      </Box>
    </Modal>
  );
}

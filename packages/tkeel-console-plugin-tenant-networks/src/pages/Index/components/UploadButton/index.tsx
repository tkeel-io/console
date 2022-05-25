import RCUpload from 'rc-upload';
import { BeforeUploadFileType, RcFile } from 'rc-upload/lib/interface';
import { ReactNode, useState } from 'react';

import { plugin } from '@tkeel/console-utils';

interface Props {
  children: ReactNode;
  multiple: boolean;
  action: string;
  accept: string;
  fileSize: number;
  getStartUpload: (e: boolean) => void;
  getProgressUpload: (e: number) => void;
  getSuccessUpload: (e: boolean) => void;
}

function UploadButton({
  children,
  multiple,
  action,
  accept,
  fileSize,
  getStartUpload,
  getProgressUpload,
  getSuccessUpload,
}: Props) {
  const [startSum, setStartSum] = useState(0);
  const [successSum, setSuccessSum] = useState(1);
  let temptStartSum = 0;

  const beforeUpload = (file: RcFile) => {
    temptStartSum += 1;
    setStartSum(temptStartSum);
    const toast = plugin.getPortalToast();
    const { size, name } = file;
    let tip = '文件上传出错';
    return new Promise<BeforeUploadFileType>((resolve, reject) => {
      const index = name.lastIndexOf('.');
      const typeArray = accept.split(',');
      const suffer = name.slice(index, name.length);
      if (!typeArray.includes(suffer)) {
        tip = '请上传正确的文件';
        toast.error(tip);
        reject(tip);
      }
      if (size / 1024 / 1024 > fileSize) {
        tip = `上传文件的大小不能超过${fileSize}M`;
        toast.warning(tip);
        reject(tip);
      }
      resolve(file);
    });
  };
  const onStart = () => {
    getStartUpload(true);
    getProgressUpload(0);
  };
  const onSuccess = (res: unknown) => {
    setSuccessSum(() => successSum + 1);
    const toast = plugin.getPortalToast();
    const { code } = res as { code: string };
    const successCode = 'io.tkeel.SUCCESS';
    if (code === successCode) {
      const percent = Math.floor(100 / startSum) * successSum;
      getProgressUpload(percent);
      if (startSum === successSum) {
        getProgressUpload(100);
        getSuccessUpload(true);
        toast.success('导入成功！');
      }
    } else if (code !== successCode) {
      toast.error('部分或全部导入失败！');
    }
  };
  const { tokenInfo } = plugin.getPortalProps().client;
  const { basePath, origin } = plugin.getPortalProps().backend.api;
  const config = {
    action: `${origin ?? ''}${basePath}${action}`,
    name: 'file',
    accept,
    multiple,
    onStart,
    onSuccess,
    beforeUpload,
    headers: {
      Authorization: `Bearer ${tokenInfo?.access_token}`,
    },
  };
  return <RCUpload {...config}>{children}</RCUpload>;
}

export default UploadButton;

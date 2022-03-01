import { Config } from '../types';
import qingcloudBackground01 from './assets/images/qingcloud-background-01.png';
import qingcloudBackground02 from './assets/images/qingcloud-background-02.png';

const config: Config = {
  documentTiles: {
    admin: 'QingCloud IoT 物联网运维管理平台',
    tenant: 'QingCloud IoT 物联网平台',
  },
  pages: {
    AdminTenant: {
      backgroundImage: qingcloudBackground01,
      titlePart1: 'QingCloud IoT 物联网',
      titlePart2: '运维管理平台',
      description: '颠覆传统物联网应用开发的新一代核心架构',
    },
    LoginTenant: {
      backgroundImage: qingcloudBackground01,
      title: 'QingCloud IoT 物联网平台',
      description: '颠覆传统物联网应用开发的新一代核心架构',
    },
    SetPassword: {
      backgroundImage: qingcloudBackground02,
      brandName: 'QingCloud IoT',
      title: '物联网平台',
      subTitle: '设置密码',
    },
  },
};
export default config;

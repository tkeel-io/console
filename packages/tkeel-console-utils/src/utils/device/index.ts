import * as plugin from '../plugin';

interface NavigateToDeviceDetailInOtherPluginsOptions {
  id: string;
}

export function navigateToDeviceDetailInOtherPlugins({
  id,
}: NavigateToDeviceDetailInOtherPluginsOptions) {
  const portalProps = plugin.getPortalProps();
  const { navigate } = portalProps.client;
  navigate(`/tenant-devices/detail?id=${id}&menu-collapsed=true`);
}

interface NavigateToDeviceTemplateDetailInOtherPluginsOptions {
  id: string;
}

export function navigateToDeviceTemplateDetailInOtherPlugins({
  id,
}: NavigateToDeviceTemplateDetailInOtherPluginsOptions) {
  const portalProps = plugin.getPortalProps();
  const { navigate } = portalProps.client;
  navigate(`/tenant-device-templates/detail/${id}?menu-collapsed=true`);
}

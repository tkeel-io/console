import { PluginBase } from '@tkeel/console-business-components';

import Routes from './routes';

export default function App() {
  return (
    <PluginBase.App style={{ padding: '0' }}>
      <Routes />
    </PluginBase.App>
  );
}

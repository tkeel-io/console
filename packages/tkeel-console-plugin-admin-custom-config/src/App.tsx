import { PluginBase } from '@tkeel/console-business-components';

import Routes from './routes';

export default function App() {
  return (
    <PluginBase.App style={{ overflowY: 'auto' }}>
      <Routes />
    </PluginBase.App>
  );
}

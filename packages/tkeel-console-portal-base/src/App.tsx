import { QueryClientProvider } from 'react-query';
import { BrowserRouter as Router } from 'react-router-dom';

import { QueryClient } from '@tkeel/console-hooks';

import type { Props } from './containers/Contents';
import Contents from './containers/Contents';

const queryClient = new QueryClient();

export default function App(props: Props) {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <Contents {...props} />
      </Router>
    </QueryClientProvider>
  );
}

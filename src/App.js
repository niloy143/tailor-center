import { RouterProvider } from 'react-router-dom';
import { router } from './routes/BasicRoutes';

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App;

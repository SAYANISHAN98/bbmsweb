import { Outlet } from 'react-router-dom';
import Navigation from './components/Navigation';
import Sidebar from './components/Sidebar';

export default function Layout() {
  return (
    <div className="flex flex-col w-screen h-screen">
      <Navigation />
      <div className="flex flex-row w-full h-full overflow-hidden">
        <Sidebar className="h-full" />
        <div className="flex-1 w-full p-4 overflow-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

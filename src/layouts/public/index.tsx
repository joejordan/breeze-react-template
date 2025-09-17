import { Outlet } from '@tanstack/react-router';
import PublicFooter from './public-footer';

function PublicLayout() {
  return (
    <div className="relative flex min-h-svh flex-col">
      <Outlet />
      <PublicFooter />
    </div>
  );
}

export default PublicLayout;

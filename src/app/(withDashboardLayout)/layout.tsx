'use client';
import DashboardDrawer from '@/components/Dashboard/DashboardDrawer/DashboardDrawer';
import { isloggedIn } from '@/services/auth.service';
import { useRouter } from 'next/navigation';

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
   const router = useRouter();
   if (!isloggedIn()) {
      return router.push('/login');
   }
   return <DashboardDrawer>{children} </DashboardDrawer>;
};

export default DashboardLayout;
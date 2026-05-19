import type { ReactNode } from 'react';
import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: 'Admin — Jogja Ride',
};

export default function AuthedAdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}

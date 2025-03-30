export const dynamic = 'force-dynamic'; // Ensures SSR
import AdminDash from '../components/AdminDash/AdminDash';
import styles from './admin.module.css'
function AdminPage() {
 
  return (
    <>
     <AdminDash/>
    </>
  );
}

export default AdminPage;
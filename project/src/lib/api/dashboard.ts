import { collection, query, where, getDocs, Timestamp } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { startOfMonth, endOfMonth } from 'date-fns';

interface DashboardStats {
  totalBookings: number;
  activeCustomers: number;
  revenue: number;
  pendingBookings: number;
}

export const fetchDashboardStats = async (): Promise<DashboardStats> => {
  const now = new Date();
  const monthStart = startOfMonth(now);
  const monthEnd = endOfMonth(now);

  // Fetch total bookings
  const bookingsQuery = query(
    collection(db, 'bookings'),
    where('createdAt', '>=', Timestamp.fromDate(monthStart)),
    where('createdAt', '<=', Timestamp.fromDate(monthEnd))
  );
  const bookingsSnapshot = await getDocs(bookingsQuery);
  const totalBookings = bookingsSnapshot.size;

  // Fetch pending bookings
  const pendingBookingsQuery = query(
    collection(db, 'bookings'),
    where('status', '==', 'pending')
  );
  const pendingBookingsSnapshot = await getDocs(pendingBookingsQuery);
  const pendingBookings = pendingBookingsSnapshot.size;

  // Fetch active customers (customers with bookings this month)
  const customersWithBookings = new Set(
    bookingsSnapshot.docs.map(doc => doc.data().customerId)
  );
  const activeCustomers = customersWithBookings.size;

  // Calculate revenue
  const revenue = bookingsSnapshot.docs.reduce((total, doc) => {
    const booking = doc.data();
    return total + (booking.price || 0);
  }, 0);

  return {
    totalBookings,
    activeCustomers,
    revenue,
    pendingBookings,
  };
};
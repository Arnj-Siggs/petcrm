import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import { 
  Calendar, 
  Users, 
  DollarSign,
  Clock,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { fetchDashboardStats } from '../../lib/api/dashboard';

export const DashboardHome = () => {
  const { data: stats, isLoading } = useQuery({
    queryKey: ['dashboardStats'],
    queryFn: fetchDashboardStats,
  });

  const cards = [
    {
      title: 'Total Bookings',
      value: stats?.totalBookings ?? 0,
      icon: Calendar,
      change: '+12.5%',
      trend: 'up',
    },
    {
      title: 'Active Customers',
      value: stats?.activeCustomers ?? 0,
      icon: Users,
      change: '+5.2%',
      trend: 'up',
    },
    {
      title: 'Revenue (MTD)',
      value: stats?.revenue ? `$${stats.revenue.toFixed(2)}` : '$0.00',
      icon: DollarSign,
      change: '-2.4%',
      trend: 'down',
    },
    {
      title: 'Pending Bookings',
      value: stats?.pendingBookings ?? 0,
      icon: Clock,
      change: '+8.1%',
      trend: 'up',
    },
  ];

  if (isLoading) {
    return (
      <div className="animate-pulse">
        <div className="h-8 w-48 bg-gray-200 rounded mb-6"></div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white p-6 rounded-lg shadow-sm h-32"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Dashboard Overview
        </h1>
        <p className="text-gray-500">
          {format(new Date(), 'EEEE, MMMM do yyyy')}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card) => {
          const Icon = card.icon;
          const TrendIcon = card.trend === 'up' ? ArrowUpRight : ArrowDownRight;
          const trendColor = card.trend === 'up' ? 'text-green-500' : 'text-red-500';

          return (
            <div
              key={card.title}
              className="bg-white p-6 rounded-lg shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Icon className="h-6 w-6 text-primary" />
                </div>
                <span className={`flex items-center text-sm ${trendColor}`}>
                  {card.change}
                  <TrendIcon className="h-4 w-4 ml-1" />
                </span>
              </div>
              <div className="mt-4">
                <h3 className="text-sm font-medium text-gray-500">
                  {card.title}
                </h3>
                <p className="mt-2 text-3xl font-semibold text-gray-900">
                  {card.value}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Additional dashboard sections can be added here */}
    </div>
  );
};
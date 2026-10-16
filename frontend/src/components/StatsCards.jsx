import { Briefcase, Calendar, Award, XCircle } from 'lucide-react';

export default function StatsCards({ stats }) {
  const cards = [
    {
      title: 'Total Applications',
      count: stats?.total || 0,
      icon: Briefcase,
      color: 'text-[#111111]',
      bg: 'bg-[#F7F5F0]'
    },
    {
      title: 'Interviews Scheduled',
      count: stats?.interviews || 0,
      icon: Calendar,
      color: 'text-[#92400E]',
      bg: 'bg-[#FEF3C7]'
    },
    {
      title: 'Offers Received',
      count: stats?.offers || 0,
      icon: Award,
      color: 'text-[#166534]',
      bg: 'bg-[#DCFCE7]'
    },
    {
      title: 'Rejected',
      count: stats?.rejected || 0,
      icon: XCircle,
      color: 'text-[#991B1B]',
      bg: 'bg-[#FEE2E2]'
    }
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {cards.map((card, index) => {
        const IconComponent = card.icon;
        return (
          <div
            key={index}
            className="flex items-center justify-between rounded-xl border border-[#E8E0D2] bg-white p-5 shadow-xs"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-[#6A665E]">
                {card.title}
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[#111111]">
                {card.count}
              </h3>
            </div>
            <div className={`flex h-11 w-11 items-center justify-center rounded-lg ${card.bg} ${card.color}`}>
              <IconComponent size={20} />
            </div>
          </div>
        );
      })}
    </div>
  );
}

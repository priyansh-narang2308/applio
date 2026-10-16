import { LayoutDashboard, ListFilter, Calendar, Award, XCircle, LogOut, LogIn, ArrowLeft } from 'lucide-react';

export default function Sidebar({
  currentTab,
  onSelectTab,
  stats,
  user,
  onOpenAuth,
  onLogout,
  onGoHome
}) {
  const navItems = [
    { id: 'all', label: 'All Applications', icon: ListFilter, count: stats?.total || 0 },
    { id: 'Interview', label: 'Interviews', icon: Calendar, count: stats?.interviews || 0 },
    { id: 'Offer', label: 'Offers', icon: Award, count: stats?.offers || 0 },
    { id: 'Rejected', label: 'Rejected', icon: XCircle, count: stats?.rejected || 0 }
  ];

  return (
    <aside className="flex w-full flex-col border-r border-[#E8E0D2] bg-white p-5 md:w-64 md:min-h-screen">
      <div className="flex items-center justify-between border-b border-[#E8E0D2] pb-5">
        <div className="flex items-center gap-2.5">
          <div className="flex h-7 w-7 items-center justify-center rounded-md bg-[#111111] font-bold text-white text-xs">
            A
          </div>
          <span className="text-lg font-bold tracking-tight text-[#111111]">Applio</span>
        </div>
        <button
          onClick={onGoHome}
          title="Back to Landing Page"
          className="rounded-md border border-[#E8E0D2] p-1.5 text-[#6A665E] hover:border-[#111111] hover:text-[#111111]"
        >
          <ArrowLeft size={14} />
        </button>
      </div>

      <nav className="mt-6 flex flex-1 flex-col gap-1.5">
        <div className="px-3 pb-2 text-[11px] font-bold uppercase tracking-wider text-[#948F85]">
          Pipeline Navigation
        </div>
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onSelectTab(item.id)}
              className={`flex items-center justify-between rounded-lg px-3 py-2 text-sm font-semibold transition ${
                isActive
                  ? 'bg-[#111111] text-white shadow-xs'
                  : 'text-[#6A665E] hover:bg-[#F7F5F0] hover:text-[#111111]'
              }`}
            >
              <div className="flex items-center gap-2.5">
                <Icon size={16} />
                <span>{item.label}</span>
              </div>
              <span
                className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                  isActive ? 'bg-[#2B2B2B] text-white' : 'bg-[#F7F5F0] text-[#111111]'
                }`}
              >
                {item.count}
              </span>
            </button>
          );
        })}
      </nav>

      <div className="mt-auto border-t border-[#E8E0D2] pt-4">
        {user ? (
          <div className="flex items-center justify-between rounded-lg bg-[#FAF8F5] p-3">
            <div className="min-w-0">
              <div className="truncate text-xs font-bold text-[#111111]">{user.name}</div>
              <div className="truncate text-[11px] text-[#6A665E]">{user.email}</div>
            </div>
            <button
              onClick={onLogout}
              title="Sign Out"
              className="rounded-md p-1.5 text-[#6A665E] hover:bg-white hover:text-red-600"
            >
              <LogOut size={15} />
            </button>
          </div>
        ) : (
          <button
            onClick={onOpenAuth}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-[#E8E0D2] bg-[#FAF8F5] py-2 text-xs font-bold text-[#111111] transition hover:border-[#111111]"
          >
            <LogIn size={14} />
            Sign In / Register
          </button>
        )}
      </div>
    </aside>
  );
}

import { Menu, Bell, Search, User, Home, Users, Settings, FileText, X, TrendingUp, ArrowUpRight, MoreVertical, Activity, Target, Clock } from 'lucide-react';

// Header Component
function Header({ toggleSidebar }: { toggleSidebar: () => void }) {
  return (
    <header className="bg-white border-b border-gray-200 fixed top-0 left-0 right-0 z-40 h-16 shadow-sm">
      <div className="flex items-center justify-between h-full px-4 md:px-6">
        <div className="flex items-center gap-4">
          <button
            onClick={toggleSidebar}
            className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors lg:hidden"
          >
            <Menu className="w-6 h-6 text-[#595959]" />
          </button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#4C7C3C] to-[#0D150A] rounded-xl flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">N</span>
            </div>
            <span className="font-bold text-xl text-[#0D150A] hidden sm:block">
              Next App
            </span>
          </div>
        </div>

        <div className="hidden md:flex items-center flex-1 max-w-lg mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#595959]" />
            <input
              type="text"
              placeholder="Search..."
              className="w-full pl-11 pr-4 py-2.5 bg-[#F5F5F5] rounded-xl border border-transparent text-sm focus:outline-none focus:ring-2 focus:ring-[#4C7C3C] focus:bg-white transition-all"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button className="p-2.5 hover:bg-[#F5F5F5] rounded-lg transition-colors relative">
            <Bell className="w-5 h-5 text-[#595959]" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#FA3838] rounded-full ring-2 ring-white"></span>
          </button>
          
          <button className="flex items-center gap-2 px-3 py-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
            <div className="w-9 h-9 bg-gradient-to-br from-[#4C7C3C] to-[#0D150A] rounded-full flex items-center justify-center shadow-md">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="text-sm font-semibold text-[#0D150A] hidden sm:block">
              John Doe
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}
export default Header

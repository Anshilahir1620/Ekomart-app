'use client'

import { X, Home, Users, Settings, FileText, ChevronDown } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

interface SidebarProps {
  isOpen: boolean
  closeSidebar: () => void
}

function Sidebar({ isOpen, closeSidebar }: SidebarProps) {
  const pathname = usePathname()
  const [productsOpen, setProductsOpen] = useState(false)
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home, href: '/' },
    { id: 'users', label: 'Users', icon: Users, href: '/UsersPage' },
    { id: 'roles', label: 'Roles', icon: Users, href: '/Roles' },
    { id: 'banners', label: 'Banners', icon: Users, href: '/Banners' },


    {
      id: 'products',
      label: 'Products Master',
      icon: FileText,
      href: '/products',
      children: [
        { id: 'category', label: 'Category', href: '/Category' },
        { id: 'subCategory', label: 'Sub Category', href: '/SubCategory' },
        { id: 'producttype', label: 'Product Type', href: '/ProductType' },
        { id: 'dietary', label: 'Dietary', href: '/Dietary' },
        { id: 'brand', label: 'Brand', href: '/brand' },
        { id: 'product', label: 'All Product', href: '/product' },
      ],
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden backdrop-blur-sm"
          onClick={closeSidebar}
        />
      )}

      <aside
        className={`fixed top-0 left-0 h-full bg-white border-r border-gray-200 z-50 transition-transform duration-300 w-64 shadow-xl lg:shadow-none ${isOpen ? 'translate-x-0' : '-translate-x-full'
          } lg:translate-x-0 lg:mt-16`}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b border-gray-200 lg:hidden">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-[#4C7C3C] to-[#0D150A] rounded-xl flex items-center justify-center shadow-lg">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="font-bold text-xl text-[#0D150A]">Next App</span>
            </div>
            <button onClick={closeSidebar} className="p-2 hover:bg-[#F5F5F5] rounded-lg transition-colors">
              <X className="w-6 h-6 text-[#595959]" />
            </button>
          </div>

          <nav className="flex-1 p-4 space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href || (item.children && pathname.startsWith(item.href));
              if (item.children) {
                return (
                  <div key={item.id} className="space-y-1">
                    <button
                      onClick={() => setProductsOpen((o) => !o)}
                      className={`w-full flex items-center justify-between px-4 py-3.5 rounded-xl transition-all font-medium ${isActive
                        ? 'bg-gradient-to-r from-[#4C7C3C] to-[#0D150A] text-white shadow-lg shadow-[#4C7C3C]/30'
                        : 'text-[#595959] hover:bg-[#4C7C3C]/10 hover:text-[#4C7C3C]'
                        }`}
                    >
                      <span className="flex items-center gap-3"><Icon className="w-5 h-5" /><span>{item.label}</span></span>
                      <ChevronDown className={`w-4 h-4 transition-transform ${productsOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {productsOpen && (
                      <div className="pl-12 space-y-1">
                        {item.children.map((child) => {
                          const childActive = pathname === child.href;
                          return (
                            <Link
                              key={child.id}
                              href={child.href}
                              onClick={closeSidebar}
                              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm transition-all ${childActive ? 'text-[#4C7C3C] font-semibold' : 'text-[#595959] hover:text-[#4C7C3C]'
                                }`}
                            >
                              <span>{child.label}</span>
                            </Link>
                          )
                        })}
                      </div>
                    )}
                  </div>
                )
              }
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={closeSidebar}
                  className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all font-medium ${isActive
                    ? 'bg-gradient-to-r from-[#4C7C3C] to-[#0D150A] text-white shadow-lg shadow-[#4C7C3C]/30'
                    : 'text-[#595959] hover:bg-[#4C7C3C]/10 hover:text-[#4C7C3C]'
                    }`}
                >
                  <Icon className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              )
            })}
          </nav>

        </div>
      </aside>
    </>
  );
}
export default Sidebar
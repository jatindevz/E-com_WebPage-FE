"use client";

import Link from "next/link";
import { House, SquareUserRound, Store, Contact, ShoppingCart, Heart } from "lucide-react";

const Nav = () => {
  return (
    <div className="dark:bg-gray-900">
      <div className="fixed top-0 left-0 right-0 flex-center py-4 transition-colors duration-300 z-50">
        <nav className="flex-between w-[300px] h-14 px-6 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm transition-all duration-300 hover:shadow-md">
          <NavItem href="/" icon={<House className="w-5 h-5" />} label="Home" />
          <NavItem href="/about" icon={<SquareUserRound className="w-5 h-5" />} label="About" />
          <NavItem href="/store" icon={<Store className="w-5 h-5" />} label="Store" />
          <NavItem href="/contact" icon={<Contact className="w-5 h-5" />} label="Contact" />
          <div className="w-px h-6 bg-gray-300 dark:bg-gray-600" />
          <NavItem href="/wishlist" icon={<Heart className="w-5 h-5" />} label="Wishlist" />
          <NavItem href="/cart" icon={<ShoppingCart className="w-5 h-5" />} label="Cart" />
        </nav>
      </div>
    </div>
  );
};

const NavItem = ({ href, icon, label }) => {
  return (
    <Link href={href} className="relative group">
      <div className="flex flex-col items-center cursor-pointer">
        <div className="p-2 rounded-lg text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200">
          {icon}
        </div>

        <span className="absolute bottom-0 whitespace-nowrap text-xs font-medium text-gray-500 dark:text-gray-400 opacity-0 group-hover:opacity-100 transition-all duration-200 group-hover:-bottom-8">
          {label}
        </span>
      </div>
    </Link>
  );
};

export default Nav;

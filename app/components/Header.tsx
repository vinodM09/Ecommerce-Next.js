"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="w-full bg-white shadow-sm sticky top-0 z-50">
        <div className="flex items-center max-w-6xl mx-auto justify-between px-4 py-2 md:px-6">
      {/* Logo */}
      <div className="flex items-center space-x-2">
        <Link href="/" className="text-3xl font-bold">
          <img src="/images/logo-new.jpeg" alt="logo" className="w-16 h-16"/>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex space-x-6">
        <Link
          href="/recommendations"
          className={`hover:text-blue-400 ${
            pathname === "/recommendations" ? "text-blue-400" : ""
          }`}
        >
          Recommendations
        </Link>

        <Link
          href="/dashboard"
          className={`hover:text-blue-400 ${
            pathname === "/dashboard" ? "text-blue-400" : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          href="/admin"
          className={`hover:text-blue-400 ${
            pathname === "/admin" ? "text-blue-400" : ""
          }`}
        >
          Admin
        </Link>
      </nav>
        </div>

    </header>
  );
}
"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
  SignedIn,
} from "@clerk/nextjs";
import { BarLoader } from "react-spinners";
import { useStoreUser } from "@/hooks/use-store-user";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard } from "lucide-react";

const Header = () => {
  const { isLoading } = useStoreUser();
  const path = usePathname();

  return (
    <header className="fixed top-0 w-full border-b bg-white/95 backdrop-blur z-50 supports-[backdrop-filter]:bg-white/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logos/logo.png"
            alt="Splitr Logo"
            width={200}
            height={60}
            className="h-11 w-auto object-contain"
          />
        </Link>

        {/* Page links (only on home page) */}
        {path === "/" && (
          <div className="hidden md:flex items-center gap-6">
            <Link
              href="#features"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              Features
            </Link>
            <Link
              href="#how-it-works"
              className="text-sm font-medium hover:text-green-600 transition"
            >
              How It Works
            </Link>
          </div>
        )}

        {/* Auth buttons */}
        <div className="flex items-center gap-2">
          {/* Dashboard button for signed-in users */}
          <SignedIn>
            <div className="flex items-center gap-2">
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="hidden md:inline-flex items-center gap-2 hover:text-green-600 hover:border-green-600 transition"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link>

              <Link href="/dashboard">
                <Button
                  variant="ghost"
                  className="md:hidden w-10 h-10 p-0 flex items-center justify-center"
                >
                  <LayoutDashboard className="w-4 h-4" />
                </Button>
              </Link>
            </div>
          </SignedIn>

          {/* Sign In / Sign Up for signed-out users */}
          <SignedOut>
            <SignInButton>
              <Button variant="ghost">Sign In</Button>
            </SignInButton>
            <SignUpButton>
              <Button className="bg-green-600 hover:bg-green-700 border-none text-white">
                Get Started
              </Button>
            </SignUpButton>
          </SignedOut>

          {/* User menu */}
          <SignedIn>
            <UserButton />
          </SignedIn>
        </div>
      </nav>

      {/* Convex user loading bar */}
      {isLoading && <BarLoader width="100%" color="#36d7b7" />}
    </header>
  );
};

export default Header;

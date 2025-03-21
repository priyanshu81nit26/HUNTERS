"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, User, Trophy } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-gray-950 text-white shadow-md border-b border-gray-800 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Trophy className="h-6 w-6 text-blue-400 mr-2" />
              <span className="text-xl font-bold text-blue-400">DreamTeam</span>
            </Link>
            
            {/* About link visible only when signed out */}
            <SignedOut>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2 ml-4">
                About
              </Link>
            </SignedOut>
          </div>
          
          {/* Middle - Nav Links (desktop only) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            {/* Only show navigation links for signed-in users */}
            <SignedIn>
              <Link href="/dream-team" className="text-gray-300 hover:text-white px-3 py-2">
                Dream Team
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white px-3 py-2">
                About
              </Link>
              <Link href="/schedule" className="text-gray-300 hover:text-white px-3 py-2">
                Schedule
              </Link>
              <Link href="/ground-analysis" className="text-gray-300 hover:text-white px-3 py-2">
                Ground Analysis
              </Link>
              <Link href="/team-analysis" className="text-gray-300 hover:text-white px-3 py-2">
                Team Analysis
              </Link>
              <Link href="/profile" className="text-gray-300 hover:text-white px-3 py-2">
                Profile
              </Link>
            </SignedIn>
          </div>
          
          {/* Right side - Auth buttons or User button */}
          <div className="flex items-center">
            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center">
              <SignedOut>
                <div className="flex items-center space-x-3">
                  <SignInButton mode="modal">
                    <Button variant="outline" className="text-blue-400 border-blue-400 hover:bg-gray-800">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-9 h-9 border-2 border-gray-700",
                      userButtonTrigger: "focus:shadow-none hover:bg-gray-800 rounded-full"
                    }
                  }}
                />
              </SignedIn>
            </div>
            
            {/* Mobile User Button and Menu Toggle */}
            <div className="md:hidden flex items-center">
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8",
                    }
                  }}
                />
              </SignedIn>
              
              {/* Direct auth buttons for mobile */}
              <SignedOut>
                <div className="flex items-center space-x-2 mr-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-gray-800">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <button
                type="button"
                className="inline-flex items-center justify-center p-2 ml-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-gray-900">
            {/* About link for mobile when signed out */}
            <SignedOut>
              <Link 
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                About
              </Link>
            </SignedOut>
            
            {/* Mobile auth menu options */}
            <SignedIn>
              <Link 
                href="/dream-team"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                Dream Team
              </Link>
              <Link 
                href="/about"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                About
              </Link>
              <Link 
                href="/schedule"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                Schedule
              </Link>
              <Link 
                href="/ground-analysis"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                Ground Analysis
              </Link>
              <Link 
                href="/team-analysis"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800"
                onClick={closeMenu}
              >
                Team Analysis
              </Link>
              <Link 
                href="/profile"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 flex items-center"
                onClick={closeMenu}
              >
                <User className="h-4 w-4 mr-2" />
                Profile
              </Link>
            </SignedIn>
            
            <SignedOut>
              <div className="px-3 py-2 space-y-2">
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full text-blue-400 border-blue-400 hover:bg-gray-800">Sign In</Button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">Sign Up</Button>
                </SignUpButton>
              </div>
            </SignedOut>
          </div>
        </div>
      )}
    </nav>
  );
} 
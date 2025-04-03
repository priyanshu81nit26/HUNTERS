"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, Trophy, Activity } from "lucide-react";
import { SignedIn, SignedOut, UserButton, SignInButton, SignUpButton } from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => setMenuOpen(false);

  return (
    <nav className="bg-background text-foreground shadow-sm border-b border-border sticky top-0 left-0 right-0 z-[100] h-14">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
        <div className="flex justify-between h-full">
          {/* Left side - Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex-shrink-0 flex items-center">
              <Trophy className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-lg font-bold text-blue-400">DreamTeam</span>
            </Link>
            
            {/* About link visible only when signed out */}
            <SignedOut>
              <Link href="/about" className="text-muted-foreground hover:text-foreground px-3 py-2 ml-4 text-sm">
                About
              </Link>
            </SignedOut>
          </div>
          
          {/* Middle - Nav Links (desktop only) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            {/* Only show navigation links for signed-in users */}
            <SignedIn>
              <Link href="/dream-team" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm">
                Dream Team
              </Link>
              <Link href="/schedule" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm">
                Schedule
              </Link>
              <Link href="/match-analysis" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm flex items-center">
                <Activity className="h-4 w-4 mr-1" />
                Match Analysis
              </Link>
              <Link href="/ground-analysis" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm">
                Ground Analysis
              </Link>
              <Link href="/team-analysis" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm">
                Team Analysis
              </Link>
              <Link href="/bet-help" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm">
                Bet Helper
              </Link>
              <Link href="/about" className="text-muted-foreground hover:text-foreground px-3 py-2 text-sm">
                About
              </Link>
            </SignedIn>
          </div>
          
          {/* Right side - Auth buttons or User button */}
          <div className="flex items-center">
            {/* Theme Toggle */}
            <div className="mr-2">
              <ThemeToggle />
            </div>
            
            {/* Desktop auth buttons */}
            <div className="hidden md:flex items-center">
              <SignedOut>
                <div className="flex items-center space-x-2">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-muted">
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
              
              <SignedIn>
                <UserButton 
                  afterSignOutUrl="/"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-8 h-8 border-2 border-muted",
                      userButtonTrigger: "focus:shadow-none hover:bg-muted rounded-full"
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
                      userButtonAvatarBox: "w-7 h-7",
                    }
                  }}
                />
              </SignedIn>
              
              {/* Direct auth buttons for mobile */}
              <SignedOut>
                <div className="flex items-center space-x-1 mr-1">
                  <SignInButton mode="modal">
                    <Button variant="outline" size="sm" className="text-blue-400 border-blue-400 hover:bg-muted text-xs h-8">
                      Sign In
                    </Button>
                  </SignInButton>
                  <SignUpButton mode="modal">
                    <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white text-xs h-8">
                      Sign Up
                    </Button>
                  </SignUpButton>
                </div>
              </SignedOut>
              
              <button
                type="button"
                className="inline-flex items-center justify-center p-1 ml-1 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted focus:outline-none"
                aria-controls="mobile-menu"
                aria-expanded="false"
                onClick={() => setMenuOpen(!menuOpen)}
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden absolute top-14 left-0 right-0 z-50" id="mobile-menu">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-background/95 backdrop-blur-sm border-b border-border shadow-md">
            {/* About link for mobile when signed out */}
            <SignedOut>
              <Link 
                href="/about"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                About
              </Link>
            </SignedOut>
            
            {/* Mobile auth menu options */}
            <SignedIn>
              <Link 
                href="/dream-team"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Dream Team
              </Link>
              
              <Link 
                href="/schedule"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Schedule
              </Link>
              <Link 
                href="/match-analysis"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Match Analysis
              </Link>
              <Link 
                href="/ground-analysis"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Ground Analysis
              </Link>
              <Link 
                href="/team-analysis"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Team Analysis
              </Link>
              <Link 
                href="/bet-help"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                Bet Helper
              </Link>
              <Link 
                href="/about"
                className="block px-3 py-2 rounded-md text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted"
                onClick={closeMenu}
              >
                About
              </Link>
            </SignedIn>
            
            <SignedOut>
              <div className="px-3 py-2 space-y-2">
                <SignInButton mode="modal">
                  <Button variant="outline" className="w-full text-blue-400 border-blue-400 hover:bg-muted">Sign In</Button>
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
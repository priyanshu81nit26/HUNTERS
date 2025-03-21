"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-background text-foreground border-t border-border py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and description */}
          <div className="space-y-4">
            <div className="flex items-center">
              <Trophy className="h-5 w-5 text-blue-400 mr-2" />
              <span className="text-lg font-bold text-blue-400">DreamTeam</span>
            </div>
            <p className="text-sm text-muted-foreground max-w-md">
              Fantasy cricket analytics platform to help you build your perfect dream team using advanced data and performance insights.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  About
                </Link>
              </li>
              <li>
                <Link href="/team-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Team Analysis
                </Link>
              </li>
              <li>
                <Link href="/ground-analysis" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Ground Analysis
                </Link>
              </li>
              <li>
                <Link href="/schedule" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Schedule
                </Link>
              </li>
            </ul>
          </div>

          {/* Support/Contact */}
          <div>
            <h3 className="text-sm font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Help Center
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="#" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="border-t border-border mt-8 pt-6 text-center">
          <p className="text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} DreamTeam. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
} 
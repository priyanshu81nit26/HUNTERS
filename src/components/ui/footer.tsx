"use client";

import Link from "next/link";
import { Trophy } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and description */}
          <div className="md:col-span-1">
            <div className="flex items-center mb-4">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <p className="text-gray-400 text-sm mb-6">
              At DREAMTEAM, we empower cricket enthusiasts by leveraging AI to
              streamline analysis, documentation, and team management within the
              cricket ecosystem.
            </p>
          </div>

          {/* Product links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Product</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/team-analysis" className="text-gray-400 hover:text-white transition-colors">
                  Team Analysis Tool
                </Link>
              </li>
              <li>
                <Link href="/ground-analysis" className="text-gray-400 hover:text-white transition-colors">
                  Ground Analysis
                </Link>
              </li>
              <li>
                <Link href="/player-management" className="text-gray-400 hover:text-white transition-colors">
                  Player Management
                </Link>
              </li>
              <li>
                <Link href="/analytics-dashboard" className="text-gray-400 hover:text-white transition-colors">
                  Analytics Dashboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Company links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Company</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/press" className="text-gray-400 hover:text-white transition-colors">
                  Press
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/cricket-insights" className="text-gray-400 hover:text-white transition-colors">
                  Cricket Insights
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="text-gray-400 hover:text-white transition-colors">
                  Case Studies
                </Link>
              </li>
              <li>
                <Link href="/help-center" className="text-gray-400 hover:text-white transition-colors">
                  Help Center
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8"></div>

        {/* Copyright and social links */}
        <div className="text-center text-sm text-gray-400">
          <p className="mb-2">© 2023 DREAMTEAM. All rights reserved.</p>
          <p className="mb-4">Made with ❤️ by Team CricketAI</p>
          <div className="flex justify-center space-x-4">
            <p>Follow us on <span className="text-gray-300">X</span> & <Link href="https://linkedin.com" className="text-yellow-500 hover:underline">LinkedIn</Link></p>
          </div>
        </div>
      </div>
    </footer>
  );
} 
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowRight, Trophy, BarChart3, Zap } from "lucide-react";

export default function Home() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <main className="flex flex-col items-center mt-14"> 
      {/* First Segment - Hero Section */}
      <section className="relative w-full h-screen">
        {/* Background cricket player image */}
        <div className="absolute inset-0 w-full h-full z-0">
          <Image
            src="/dhoni.jpg"
            alt="Cricket player walking on field"
            fill
            className="object-cover brightness-75"
            priority
          />
          <div className="absolute inset-0 bg-black/50 z-10"></div>
        </div>
        
        {/* Hero content */}
        <div className="relative z-20 flex flex-col items-center justify-center h-full text-center px-4 max-w-5xl mx-auto text-white">
          <Trophy className="h-16 w-16 text-yellow-500 mb-6" />
          
          <h1 className="text-4xl md:text-6xl font-bold text-yellow-500 mb-6">
            Dream Team Analytics<br />
            Cricket Intelligence
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-3xl">
            Transform your cricket experience with cutting-edge AI technology. Analyze player performance, 
            evaluate ground conditions, and build the perfect dream team.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            {isClient ? (
              <>
                <Link href="/sign-up">
                  <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                    Get Started <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button variant="outline" size="lg" className="border-white text-white hover:bg-white/10">
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <Button size="lg" className="bg-yellow-500 hover:bg-yellow-600 text-black font-medium">
                Loading...
              </Button>
            )}
          </div>
        </div>
        
        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            className="text-white"
          >
            <path d="M12 5v14"></path>
            <path d="m19 12-7 7-7-7"></path>
          </svg>
        </div>
      </section>

      {/* Second Segment - Features */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">Our Key Features</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            <div className="flex flex-col items-center text-center">
              <div className="bg-yellow-100 p-4 rounded-full mb-6">
                <Trophy className="h-10 w-10 text-yellow-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Player Analysis</h3>
              <p className="text-gray-600">
                Detailed statistics and performance metrics for all cricket players across different leagues and tournaments.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <BarChart3 className="h-10 w-10 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Ground Statistics</h3>
              <p className="text-gray-600">
                Comprehensive data on cricket grounds, including pitch behavior, boundary sizes, and historical match outcomes.
              </p>
            </div>
            
            <div className="flex flex-col items-center text-center">
              <div className="bg-green-100 p-4 rounded-full mb-6">
                <Zap className="h-10 w-10 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI Predictions</h3>
              <p className="text-gray-600">
                Advanced machine learning models to predict player performance and match outcomes with high accuracy.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Third Segment - Team Analysis */}
      <section className="py-20 bg-gray-50 w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-10">
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Team Analysis</h2>
              <p className="text-gray-600 mb-8">
                Our advanced team analysis tools help you understand team strengths, weaknesses, and optimal strategies against different opponents.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Historical head-to-head performance</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Team composition analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-yellow-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Performance trends and patterns</span>
                </li>
              </ul>
              <Link href="/team-analysis" className="inline-block mt-8">
                <Button>Learn More</Button>
              </Link>
            </div>
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-lg">
              <div className="relative w-full h-full">
                <Image
                  src="/dhoni.jpg"
                  alt="Cricket player"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">Team Analysis Dashboard</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Fourth Segment - Ground Analysis */}
      <section className="py-20 bg-white w-full">
        <div className="container mx-auto px-4">
          <div className="flex flex-col-reverse md:flex-row items-center gap-10">
            <div className="w-full md:w-1/2 h-[300px] md:h-[400px] overflow-hidden rounded-lg">
              <div className="relative w-full h-full">
                <Image
                  src="/dhoni.jpg"
                  alt="Cricket player"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <p className="text-white text-xl font-semibold">Ground Analysis Dashboard</p>
                </div>
              </div>
            </div>
            <div className="md:w-1/2">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ground Analysis</h2>
              <p className="text-gray-600 mb-8">
                Understand how different cricket grounds affect game outcomes with our comprehensive ground analysis tools.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Pitch behavior analysis</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Weather impact on grounds</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-blue-100 p-1 rounded-full mr-3 mt-1">
                    <svg className="h-4 w-4 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span>Historical match statistics by venue</span>
                </li>
              </ul>
              <Link href="/ground-analysis" className="inline-block mt-8">
                <Button>Learn More</Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Fifth Segment - Call to Action */}
      <section className="py-20 bg-yellow-500 w-full">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">Ready to Build Your Dream Team?</h2>
          <p className="text-white text-lg mb-10 max-w-2xl mx-auto">
            Join thousands of cricket enthusiasts who use our platform to gain insights and make better decisions for their fantasy cricket teams.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            {isClient ? (
              <>
                <Link href="/sign-up">
                  <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
                    Sign Up Now
                  </Button>
                </Link>
                <Link href="/sign-in">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-yellow-600">
                    Sign In
                  </Button>
                </Link>
              </>
            ) : (
              <Button size="lg" className="bg-white text-yellow-600 hover:bg-gray-100">
                Loading...
              </Button>
            )}
          </div>
        </div>
      </section>
    </main>
  );
}

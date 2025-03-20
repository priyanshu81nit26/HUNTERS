"use client";

import { useState, useEffect } from "react";
import { MapPin, ChevronDown, Search, BarChart3, PieChart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

// Ground data for demo
const GROUNDS = [
  { 
    id: 1, 
    name: "M.A. Chidambaram Stadium", 
    city: "Chennai",
    image: "/dhoni.jpg",
    capacity: 50000,
    established: 1916,
    pitchType: "Spin-friendly"
  },
  { 
    id: 2, 
    name: "Wankhede Stadium", 
    city: "Mumbai",
    image: "/dhoni.jpg",
    capacity: 33108,
    established: 1974,
    pitchType: "Batting-friendly"
  },
  { 
    id: 3, 
    name: "Eden Gardens", 
    city: "Kolkata",
    image: "/dhoni.jpg",
    capacity: 68000,
    established: 1864,
    pitchType: "Balanced"
  },
  { 
    id: 4, 
    name: "M. Chinnaswamy Stadium", 
    city: "Bangalore",
    image: "/dhoni.jpg",
    capacity: 40000,
    established: 1969,
    pitchType: "Batting-friendly"
  },
  { 
    id: 5, 
    name: "Arun Jaitley Stadium", 
    city: "Delhi",
    image: "/dhoni.jpg",
    capacity: 41820,
    established: 1883,
    pitchType: "Balanced"
  },
  { 
    id: 6, 
    name: "Narendra Modi Stadium", 
    city: "Ahmedabad",
    image: "/dhoni.jpg",
    capacity: 132000,
    established: 1983,
    pitchType: "Balanced"
  },
  { 
    id: 7, 
    name: "Rajiv Gandhi Stadium", 
    city: "Hyderabad",
    image: "/dhoni.jpg",
    capacity: 55000,
    established: 2003,
    pitchType: "Balanced"
  },
  { 
    id: 8, 
    name: "Brabourne Stadium", 
    city: "Mumbai",
    image: "/dhoni.jpg",
    capacity: 20000,
    established: 1937,
    pitchType: "Batting-friendly"
  },
];

// Function to generate ground stats (mock ML model output)
const getGroundStats = (groundId: number) => {
  // This would be replaced with actual API call to ML model in production
  // Using groundId as seed for deterministic but varying output
  const seed = groundId * 17;
  
  return {
    averageFirstInningsScore: 160 + (seed % 40),
    averageSecondInningsScore: 145 + (seed % 35),
    highestTeamTotal: 220 + (seed % 30),
    lowestTeamTotal: 80 + (seed % 40),
    winPercentageBattingFirst: 40 + (seed % 30),
    winPercentageBowlingFirst: 100 - (40 + (seed % 30)),
    avgRunRate: 7.5 + ((seed % 20) / 10),
    avgWicketsPerMatch: 12 + (seed % 6),
    pitchConditions: {
      pace: 30 + (seed % 40),
      spin: 40 + (seed % 40),
      bounce: 35 + (seed % 40),
      batting: 45 + (seed % 30)
    }
  };
};

export default function GroundAnalysis() {
  const [selectedGround, setSelectedGround] = useState<typeof GROUNDS[0] | null>(null);
  const [showGroundDropdown, setShowGroundDropdown] = useState(false);
  const [searchGround, setSearchGround] = useState("");
  const [groundStats, setGroundStats] = useState<ReturnType<typeof getGroundStats> | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  const filteredGrounds = GROUNDS.filter(ground => 
    ground.name.toLowerCase().includes(searchGround.toLowerCase()) || 
    ground.city.toLowerCase().includes(searchGround.toLowerCase())
  );

  // Calculate ground stats when a ground is selected
  useEffect(() => {
    if (selectedGround) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        const stats = getGroundStats(selectedGround.id);
        setGroundStats(stats);
        setIsAnimating(false);
      }, 800); // Simulate API call delay
      
      return () => clearTimeout(timer);
    }
  }, [selectedGround]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <MapPin className="h-6 w-6 text-blue-500 mr-2" />
              Ground Analysis
            </h2>
            
            {/* Ground Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Select Ground</label>
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  onClick={() => setShowGroundDropdown(!showGroundDropdown)}
                >
                  {selectedGround ? (
                    <span>{selectedGround.name}, {selectedGround.city}</span>
                  ) : (
                    <span>Select a Cricket Ground</span>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showGroundDropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                      <div className="flex items-center bg-gray-50 rounded-md px-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search grounds..."
                          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
                          value={searchGround}
                          onChange={(e) => setSearchGround(e.target.value)}
                        />
                      </div>
                    </div>
                    <ul>
                      {filteredGrounds.map(ground => (
                        <li
                          key={ground.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                          onClick={() => {
                            setSelectedGround(ground);
                            setShowGroundDropdown(false);
                            setSearchGround("");
                          }}
                        >
                          <div>
                            <span className="font-medium">{ground.name}</span>
                            <span className="text-gray-500 text-sm ml-2">{ground.city}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Analysis Button */}
            <Button 
              className="w-full bg-blue-500 hover:bg-blue-600 mt-4"
              onClick={() => {
                if (selectedGround) {
                  setIsAnimating(true);
                  setTimeout(() => {
                    const stats = getGroundStats(selectedGround.id);
                    setGroundStats(stats);
                    setIsAnimating(false);
                  }, 800);
                }
              }}
              disabled={!selectedGround}
            >
              <BarChart3 className="h-4 w-4 mr-2" />
              Analyze Ground
            </Button>

            {/* Ground Information */}
            {selectedGround && (
              <div className="mt-8 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-medium mb-4">Ground Information</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex justify-between">
                    <span className="text-gray-600">Established:</span>
                    <span className="font-medium">{selectedGround.established}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Capacity:</span>
                    <span className="font-medium">{selectedGround.capacity.toLocaleString()}</span>
                  </li>
                  <li className="flex justify-between">
                    <span className="text-gray-600">Pitch Type:</span>
                    <span className="font-medium">{selectedGround.pitchType}</span>
                  </li>
                </ul>
              </div>
            )}
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 bg-white rounded-xl shadow-md p-6">
            {selectedGround ? (
              <>
                {/* Ground Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
                  <div className="w-full md:w-1/3 h-[200px] overflow-hidden rounded-lg relative">
                    <Image 
                      src={selectedGround.image} 
                      alt={selectedGround.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <h2 className="text-white font-bold text-xl">{selectedGround.name}</h2>
                    </div>
                  </div>
                  
                  <div className="w-full md:w-2/3">
                    <h2 className="text-2xl font-bold mb-2">{selectedGround.name}</h2>
                    <p className="text-gray-500 mb-4">{selectedGround.city}, India</p>
                    <p className="text-gray-700">
                      {selectedGround.name} is a renowned cricket venue known for its {selectedGround.pitchType.toLowerCase()} 
                      pitches and electric atmosphere. Established in {selectedGround.established}, it has a seating capacity of {selectedGround.capacity.toLocaleString()}.
                    </p>
                  </div>
                </div>
                
                {/* Statistics Display */}
                <div className="py-6">
                  <h2 className="text-xl font-bold mb-6 text-center">
                    Ground Statistical Analysis
                  </h2>
                  
                  {isAnimating ? (
                    <div className="flex justify-center items-center h-60">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
                    </div>
                  ) : (
                    groundStats && (
                      <div className="space-y-10">
                        {/* Batting Stats */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
                            Batting Statistics
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Innings Scores */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-4 text-gray-700">Average Innings Scores</h4>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>1st Innings</span>
                                    <span className="font-medium">{groundStats.averageFirstInningsScore}</span>
                                  </div>
                                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-blue-500"
                                      style={{ width: '0%' }}
                                      animate={{ width: `${(groundStats.averageFirstInningsScore / 250) * 100}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>2nd Innings</span>
                                    <span className="font-medium">{groundStats.averageSecondInningsScore}</span>
                                  </div>
                                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-green-500"
                                      style={{ width: '0%' }}
                                      animate={{ width: `${(groundStats.averageSecondInningsScore / 250) * 100}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="text-center">
                                  <p className="text-xs text-gray-500 mb-1">Highest Total</p>
                                  <p className="text-lg font-bold text-blue-600">{groundStats.highestTeamTotal}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-gray-500 mb-1">Lowest Total</p>
                                  <p className="text-lg font-bold text-red-600">{groundStats.lowestTeamTotal}</p>
                                </div>
                              </div>
                            </div>
                            
                            {/* Win Percentage */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                              <h4 className="font-medium mb-4 text-gray-700">Win Percentage by Choice</h4>
                              <div className="space-y-4">
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Batting First</span>
                                    <span className="font-medium">{groundStats.winPercentageBattingFirst}%</span>
                                  </div>
                                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-yellow-500"
                                      style={{ width: '0%' }}
                                      animate={{ width: `${groundStats.winPercentageBattingFirst}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between text-sm mb-1">
                                    <span>Bowling First</span>
                                    <span className="font-medium">{groundStats.winPercentageBowlingFirst}%</span>
                                  </div>
                                  <div className="bg-gray-200 rounded-full h-3 overflow-hidden">
                                    <motion.div 
                                      className="h-full bg-purple-500"
                                      style={{ width: '0%' }}
                                      animate={{ width: `${groundStats.winPercentageBowlingFirst}%` }}
                                      transition={{ duration: 1, ease: "easeOut" }}
                                    />
                                  </div>
                                </div>
                              </div>
                              
                              <div className="grid grid-cols-2 gap-4 mt-6">
                                <div className="text-center">
                                  <p className="text-xs text-gray-500 mb-1">Avg. Run Rate</p>
                                  <p className="text-lg font-bold text-blue-600">{groundStats.avgRunRate.toFixed(1)}</p>
                                </div>
                                <div className="text-center">
                                  <p className="text-xs text-gray-500 mb-1">Avg. Wickets</p>
                                  <p className="text-lg font-bold text-red-600">{groundStats.avgWicketsPerMatch}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Pitch Conditions */}
                        <div>
                          <h3 className="text-lg font-semibold mb-4 flex items-center">
                            <PieChart className="h-5 w-5 text-blue-500 mr-2" />
                            Pitch Characteristics
                          </h3>
                          
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              <div>
                                <h4 className="text-sm text-gray-700 font-medium mb-2">Pace</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="absolute top-0 left-0 h-full bg-red-500"
                                    style={{ width: '0%' }}
                                    animate={{ width: `${groundStats.pitchConditions.pace}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>Low</span>
                                  <span className="font-medium">{groundStats.pitchConditions.pace}%</span>
                                  <span>High</span>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm text-gray-700 font-medium mb-2">Spin</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="absolute top-0 left-0 h-full bg-green-500"
                                    style={{ width: '0%' }}
                                    animate={{ width: `${groundStats.pitchConditions.spin}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>Low</span>
                                  <span className="font-medium">{groundStats.pitchConditions.spin}%</span>
                                  <span>High</span>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm text-gray-700 font-medium mb-2">Bounce</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="absolute top-0 left-0 h-full bg-blue-500"
                                    style={{ width: '0%' }}
                                    animate={{ width: `${groundStats.pitchConditions.bounce}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>Low</span>
                                  <span className="font-medium">{groundStats.pitchConditions.bounce}%</span>
                                  <span>High</span>
                                </div>
                              </div>
                              
                              <div>
                                <h4 className="text-sm text-gray-700 font-medium mb-2">Batting Friendly</h4>
                                <div className="relative h-4 bg-gray-200 rounded-full overflow-hidden">
                                  <motion.div 
                                    className="absolute top-0 left-0 h-full bg-yellow-500"
                                    style={{ width: '0%' }}
                                    animate={{ width: `${groundStats.pitchConditions.batting}%` }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                  />
                                </div>
                                <div className="flex justify-between text-xs mt-1">
                                  <span>Low</span>
                                  <span className="font-medium">{groundStats.pitchConditions.batting}%</span>
                                  <span>High</span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        {/* Recommendations */}
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <h3 className="font-semibold mb-2 text-blue-700">Ground Analysis Summary</h3>
                          <p className="text-gray-700 mb-3">
                            {selectedGround.name} is {groundStats.winPercentageBattingFirst > groundStats.winPercentageBowlingFirst 
                              ? 'favorable for teams batting first' 
                              : 'favorable for teams bowling first'
                            } with a 
                            win percentage of {Math.max(groundStats.winPercentageBattingFirst, groundStats.winPercentageBowlingFirst)}%. 
                            The average first innings score is {groundStats.averageFirstInningsScore}, 
                            which is {groundStats.averageFirstInningsScore > groundStats.averageSecondInningsScore ? 'higher' : 'lower'} than 
                            the average second innings score of {groundStats.averageSecondInningsScore}.
                          </p>
                          <p className="text-gray-700">
                            The pitch {groundStats.pitchConditions.spin > 60 
                              ? 'offers substantial assistance to spin bowlers' 
                              : groundStats.pitchConditions.pace > 60 
                                ? 'is supportive for pace bowlers' 
                                : 'provides a good balance for both batsmen and bowlers'
                            }.
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-16">
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <MapPin className="h-24 w-24 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-500 mb-2">Ground Analysis</h2>
                <p className="text-center text-gray-400 mb-8 max-w-md">
                  Select a cricket ground from the sidebar to view detailed analysis and statistics.
                </p>
                <p className="text-center text-gray-400 text-sm max-w-md">
                  Our analysis includes batting statistics, pitch characteristics, and strategic recommendations based on historical data.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
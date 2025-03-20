"use client";

import { useState, useEffect } from "react";
import { BarChart, ChevronDown, Search, Trophy } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";

// Team data for demo
const TEAMS = [
  { id: 1, name: "Chennai Super Kings", short: "CSK", color: "#FFFF3C", image: "/dhoni.jpg" },
  { id: 2, name: "Mumbai Indians", short: "MI", color: "#004BA0", image: "/dhoni.jpg" },
  { id: 3, name: "Royal Challengers Bangalore", short: "RCB", color: "#FF0000", image: "/dhoni.jpg" },
  { id: 4, name: "Kolkata Knight Riders", short: "KKR", color: "#3A225D", image: "/dhoni.jpg" },
  { id: 5, name: "Delhi Capitals", short: "DC", color: "#00008B", image: "/dhoni.jpg" },
  { id: 6, name: "Punjab Kings", short: "PBKS", color: "#ED1B24", image: "/dhoni.jpg" },
  { id: 7, name: "Rajasthan Royals", short: "RR", color: "#FF1493", image: "/dhoni.jpg" },
  { id: 8, name: "Sunrisers Hyderabad", short: "SRH", color: "#FF8000", image: "/dhoni.jpg" },
  { id: 9, name: "Gujarat Titans", short: "GT", color: "#1560BD", image: "/dhoni.jpg" },
  { id: 10, name: "Lucknow Super Giants", short: "LSG", color: "#5CCCCC", image: "/dhoni.jpg" },
];

// Ground data for demo
const GROUNDS = [
  { id: 1, name: "M.A. Chidambaram Stadium", city: "Chennai" },
  { id: 2, name: "Wankhede Stadium", city: "Mumbai" },
  { id: 3, name: "Eden Gardens", city: "Kolkata" },
  { id: 4, name: "M. Chinnaswamy Stadium", city: "Bangalore" },
  { id: 5, name: "Arun Jaitley Stadium", city: "Delhi" },
  { id: 6, name: "Narendra Modi Stadium", city: "Ahmedabad" },
  { id: 7, name: "Rajiv Gandhi Stadium", city: "Hyderabad" },
  { id: 8, name: "Brabourne Stadium", city: "Mumbai" },
];

// Function to calculate win probability (mock ML model output)
const getWinProbability = (team1Id: number, team2Id: number, groundId: number): { team1Prob: number, team2Prob: number } => {
  // This would be replaced with actual API call to ML model in production
  // Generating deterministic but seemingly random values based on IDs for demo purposes
  const seed = (team1Id * 17 + team2Id * 23 + groundId * 31) % 100;
  const team1Prob = 30 + (seed % 41); // Between 30% and 70%
  const team2Prob = 100 - team1Prob;
  
  return { team1Prob, team2Prob };
};

export default function TeamAnalysis() {
  const [selectedTeam1, setSelectedTeam1] = useState<typeof TEAMS[0] | null>(null);
  const [selectedTeam2, setSelectedTeam2] = useState<typeof TEAMS[0] | null>(null);
  const [selectedGround, setSelectedGround] = useState<typeof GROUNDS[0] | null>(null);
  const [showTeam1Dropdown, setShowTeam1Dropdown] = useState(false);
  const [showTeam2Dropdown, setShowTeam2Dropdown] = useState(false);
  const [showGroundDropdown, setShowGroundDropdown] = useState(false);
  const [searchTeam1, setSearchTeam1] = useState("");
  const [searchTeam2, setSearchTeam2] = useState("");
  const [searchGround, setSearchGround] = useState("");
  const [winProbability, setWinProbability] = useState<{ team1Prob: number, team2Prob: number } | null>(null);
  const [isAnimating, setIsAnimating] = useState(false);

  // Filter teams based on search term
  const filteredTeams1 = TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchTeam1.toLowerCase()) && 
    team.id !== selectedTeam2?.id
  );
  
  const filteredTeams2 = TEAMS.filter(team => 
    team.name.toLowerCase().includes(searchTeam2.toLowerCase()) && 
    team.id !== selectedTeam1?.id
  );

  const filteredGrounds = GROUNDS.filter(ground => 
    ground.name.toLowerCase().includes(searchGround.toLowerCase()) || 
    ground.city.toLowerCase().includes(searchGround.toLowerCase())
  );

  // Calculate win probability when all selections are made
  useEffect(() => {
    if (selectedTeam1 && selectedTeam2 && selectedGround) {
      setIsAnimating(true);
      const timer = setTimeout(() => {
        const prob = getWinProbability(selectedTeam1.id, selectedTeam2.id, selectedGround.id);
        setWinProbability(prob);
        setIsAnimating(false);
      }, 800); // Simulate API call delay
      
      return () => clearTimeout(timer);
    }
  }, [selectedTeam1, selectedTeam2, selectedGround]);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Sidebar */}
          <div className="w-full md:w-1/4 bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold mb-6 flex items-center">
              <Trophy className="h-6 w-6 text-yellow-500 mr-2" />
              Team Analysis
            </h2>
            
            {/* Team 1 Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Team 1</label>
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  onClick={() => setShowTeam1Dropdown(!showTeam1Dropdown)}
                >
                  {selectedTeam1 ? (
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: selectedTeam1.color }}
                      />
                      {selectedTeam1.name}
                    </div>
                  ) : (
                    <span>Select Team 1</span>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showTeam1Dropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                      <div className="flex items-center bg-gray-50 rounded-md px-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search teams..."
                          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
                          value={searchTeam1}
                          onChange={(e) => setSearchTeam1(e.target.value)}
                        />
                      </div>
                    </div>
                    <ul>
                      {filteredTeams1.map(team => (
                        <li
                          key={team.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            setSelectedTeam1(team);
                            setShowTeam1Dropdown(false);
                            setSearchTeam1("");
                          }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: team.color }}
                          />
                          {team.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Team 2 Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Team 2</label>
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  onClick={() => setShowTeam2Dropdown(!showTeam2Dropdown)}
                >
                  {selectedTeam2 ? (
                    <div className="flex items-center">
                      <div 
                        className="w-4 h-4 rounded-full mr-2" 
                        style={{ backgroundColor: selectedTeam2.color }}
                      />
                      {selectedTeam2.name}
                    </div>
                  ) : (
                    <span>Select Team 2</span>
                  )}
                  <ChevronDown className="h-4 w-4" />
                </button>
                
                {showTeam2Dropdown && (
                  <div className="absolute z-10 mt-1 w-full bg-white shadow-lg rounded-md border border-gray-200 max-h-60 overflow-y-auto">
                    <div className="p-2 border-b">
                      <div className="flex items-center bg-gray-50 rounded-md px-2">
                        <Search className="h-4 w-4 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Search teams..."
                          className="w-full p-2 bg-transparent border-none focus:outline-none text-sm"
                          value={searchTeam2}
                          onChange={(e) => setSearchTeam2(e.target.value)}
                        />
                      </div>
                    </div>
                    <ul>
                      {filteredTeams2.map(team => (
                        <li
                          key={team.id}
                          className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                          onClick={() => {
                            setSelectedTeam2(team);
                            setShowTeam2Dropdown(false);
                            setSearchTeam2("");
                          }}
                        >
                          <div 
                            className="w-3 h-3 rounded-full mr-2" 
                            style={{ backgroundColor: team.color }}
                          />
                          {team.name}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
            
            {/* Ground Selection */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Ground</label>
              <div className="relative">
                <button
                  className="w-full flex items-center justify-between bg-white border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500"
                  onClick={() => setShowGroundDropdown(!showGroundDropdown)}
                >
                  {selectedGround ? (
                    <span>{selectedGround.name}, {selectedGround.city}</span>
                  ) : (
                    <span>Select Ground</span>
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
              className="w-full bg-yellow-500 hover:bg-yellow-600 mt-4"
              onClick={() => {
                if (selectedTeam1 && selectedTeam2 && selectedGround) {
                  setIsAnimating(true);
                  setTimeout(() => {
                    const prob = getWinProbability(selectedTeam1.id, selectedTeam2.id, selectedGround.id);
                    setWinProbability(prob);
                    setIsAnimating(false);
                  }, 800);
                }
              }}
              disabled={!selectedTeam1 || !selectedTeam2 || !selectedGround}
            >
              <BarChart className="h-4 w-4 mr-2" />
              Analyze Teams
            </Button>
          </div>
          
          {/* Main Content */}
          <div className="w-full md:w-3/4 bg-white rounded-xl shadow-md p-6">
            {selectedTeam1 && selectedTeam2 && selectedGround ? (
              <>
                {/* Match Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative border-4" style={{ borderColor: selectedTeam1.color }}>
                      <Image 
                        src={selectedTeam1.image} 
                        alt={selectedTeam1.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-2 font-bold text-lg">{selectedTeam1.short}</h3>
                  </div>
                  
                  <div className="text-center py-3 px-6 bg-gray-100 rounded-lg">
                    <h3 className="text-lg font-medium mb-1">Match at</h3>
                    <p className="text-sm text-gray-500">{selectedGround.name}</p>
                    <p className="text-xs text-gray-400">{selectedGround.city}</p>
                  </div>
                  
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden relative border-4" style={{ borderColor: selectedTeam2.color }}>
                      <Image 
                        src={selectedTeam2.image} 
                        alt={selectedTeam2.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <h3 className="mt-2 font-bold text-lg">{selectedTeam2.short}</h3>
                  </div>
                </div>
                
                {/* Probability Display */}
                <div className="py-6">
                  <h2 className="text-xl font-bold mb-6 text-center">
                    Win Probability Analysis
                  </h2>
                  
                  {isAnimating ? (
                    <div className="flex justify-center items-center h-60">
                      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-yellow-500"></div>
                    </div>
                  ) : (
                    winProbability && (
                      <div className="space-y-6">
                        {/* Bar Graph */}
                        <div className="grid grid-cols-6 items-center gap-4">
                          <div className="col-span-1 text-right font-semibold" style={{ color: selectedTeam1.color }}>
                            {selectedTeam1.short}
                          </div>
                          <div className="col-span-4 bg-gray-200 rounded-full h-8 overflow-hidden">
                            <motion.div 
                              className="h-full flex items-center justify-end pr-3 text-white font-bold"
                              style={{ 
                                backgroundColor: selectedTeam1.color,
                                width: '0%'
                              }}
                              animate={{ width: `${winProbability.team1Prob}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            >
                              {winProbability.team1Prob}%
                            </motion.div>
                          </div>
                          <div className="col-span-1"></div>
                        </div>
                        
                        <div className="grid grid-cols-6 items-center gap-4">
                          <div className="col-span-1 text-right font-semibold" style={{ color: selectedTeam2.color }}>
                            {selectedTeam2.short}
                          </div>
                          <div className="col-span-4 bg-gray-200 rounded-full h-8 overflow-hidden">
                            <motion.div 
                              className="h-full flex items-center justify-end pr-3 text-white font-bold"
                              style={{ 
                                backgroundColor: selectedTeam2.color,
                                width: '0%'
                              }}
                              animate={{ width: `${winProbability.team2Prob}%` }}
                              transition={{ duration: 1, ease: "easeOut" }}
                            >
                              {winProbability.team2Prob}%
                            </motion.div>
                          </div>
                          <div className="col-span-1"></div>
                        </div>
                        
                        {/* Analysis Summary */}
                        <div className="bg-gray-50 p-4 rounded-lg mt-8">
                          <h3 className="font-semibold mb-2">Analysis Summary</h3>
                          <p className="text-gray-700">
                            Based on our ML model analysis, {selectedTeam1.name} has a 
                            <span className="font-bold"> {winProbability.team1Prob}% </span> 
                            chance of winning against {selectedTeam2.name} at {selectedGround.name}.
                            {winProbability.team1Prob > winProbability.team2Prob 
                              ? ` ${selectedTeam1.name} is favored to win this match.`
                              : ` ${selectedTeam2.name} is favored to win this match.`
                            }
                          </p>
                          
                          <h4 className="font-semibold mt-4 mb-2">Key Factors</h4>
                          <ul className="list-disc list-inside space-y-1 text-gray-700">
                            <li>Historical performance at {selectedGround.name}</li>
                            <li>Team composition and player form</li>
                            <li>Previous head-to-head results</li>
                            <li>Pitch conditions expected at {selectedGround.name}</li>
                          </ul>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </>
            ) : (
              <div className="h-full flex flex-col items-center justify-center py-16">
                <div className="w-48 h-48 bg-gray-100 rounded-full flex items-center justify-center mb-6">
                  <BarChart className="h-24 w-24 text-gray-300" />
                </div>
                <h2 className="text-2xl font-bold text-gray-500 mb-2">Team Analysis</h2>
                <p className="text-center text-gray-400 mb-8 max-w-md">
                  Select two teams and a ground from the sidebar to generate win probability analysis.
                </p>
                <p className="text-center text-gray-400 text-sm max-w-md">
                  Our ML model analyzes historical data, team composition, pitch conditions and more factors to predict match outcomes.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 
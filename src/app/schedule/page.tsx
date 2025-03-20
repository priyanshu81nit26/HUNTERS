"use client";

import { useState, useEffect } from "react";
import { Calendar, Table, Search, Filter, Medal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";

// Team data for schedule generation (reusing from team-analysis)
export const TEAMS = [
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

// Ground data for venue assignment
export const GROUNDS = [
  { id: 1, name: "M.A. Chidambaram Stadium", city: "Chennai" },
  { id: 2, name: "Wankhede Stadium", city: "Mumbai" },
  { id: 3, name: "Eden Gardens", city: "Kolkata" }, 
  { id: 4, name: "M. Chinnaswamy Stadium", city: "Bangalore" },
  { id: 5, name: "Arun Jaitley Stadium", city: "Delhi" },
  { id: 6, name: "Narendra Modi Stadium", city: "Ahmedabad" },
  { id: 7, name: "Rajiv Gandhi Stadium", city: "Hyderabad" },
  { id: 8, name: "Brabourne Stadium", city: "Mumbai" },
];

// Function to generate detailed match data including ball-by-ball details
const generateBallByBallData = () => {
  const overs = [];
  let totalScore = 0;
  let wickets = 0;
  
  for (let over = 0; over < 20; over++) {
    const balls = [];
    for (let ball = 0; ball < 6 && wickets < 10; ball++) {
      const outcome = Math.random();
      let runs = 0;
      let isWicket = false;
      let extras = 0;
      
      if (outcome < 0.1) { // 10% chance of wicket
        isWicket = true;
        wickets++;
      } else if (outcome < 0.4) { // 30% chance of runs
        runs = Math.floor(Math.random() * 6) + 1;
      } else if (outcome < 0.45) { // 5% chance of extras
        extras = Math.floor(Math.random() * 5) + 1;
      }
      
      totalScore += runs + extras;
      
      balls.push({
        runs,
        isWicket,
        extras,
        totalScore,
        wickets
      });
    }
    
    overs.push({
      overNumber: over + 1,
      balls,
      overRuns: balls.reduce((sum, ball) => sum + ball.runs + ball.extras, 0),
      overWickets: balls.filter(ball => ball.isWicket).length
    });
  }
  
  return {
    overs,
    finalScore: totalScore,
    finalWickets: wickets
  };
};

// Function to generate random match results with detailed data
const generateMatchResult = (team1Id: number, team2Id: number) => {
  const innings1 = generateBallByBallData();
  const innings2 = generateBallByBallData();
  
  const isCompleted = Math.random() > 0.3; // 70% matches are completed
  
  if (!isCompleted) {
    return { 
      isCompleted: false,
      winner: null,
      team1Score: null,
      team1Wickets: null,
      team2Score: null,
      team2Wickets: null,
      innings1: null,
      innings2: null
    };
  }
  
  return {
    isCompleted: true,
    winner: innings1.finalScore > innings2.finalScore ? team1Id : team2Id,
    team1Score: innings1.finalScore,
    team1Wickets: innings1.finalWickets,
    team2Score: innings2.finalScore,
    team2Wickets: innings2.finalWickets,
    innings1,
    innings2
  };
};

// Generate a schedule of 75 matches
const generateSchedule = () => {
  const matches = [];
  const startDate = new Date('2024-05-01');
  
  // Create all possible team combinations
  for (let i = 0; i < TEAMS.length; i++) {
    for (let j = i + 1; j < TEAMS.length; j++) {
      // Each team pair plays twice (home and away)
      matches.push({
        id: matches.length + 1,
        team1: TEAMS[i],
        team2: TEAMS[j],
        ground: GROUNDS[i % GROUNDS.length],
        date: new Date(startDate.getTime() + (matches.length * 24 * 60 * 60 * 1000))
      });
      
      matches.push({
        id: matches.length + 1,
        team1: TEAMS[j],
        team2: TEAMS[i],
        ground: GROUNDS[j % GROUNDS.length],
        date: new Date(startDate.getTime() + (matches.length * 24 * 60 * 60 * 1000))
      });
    }
  }
  
  // Limit to 75 matches and add random results
  return matches.slice(0, 75).map(match => {
    const result = generateMatchResult(match.team1.id, match.team2.id);
    return { ...match, result };
  });
};

// Generate points table based on match results
const generatePointsTable = (matches: any[]) => {
  const pointsTable = TEAMS.map(team => ({
    ...team,
    matches: 0,
    won: 0,
    lost: 0,
    noResult: 0,
    points: 0,
    nrr: +(Math.random() * 2 - 1).toFixed(3) // Net run rate between -1 and 1
  }));
  
  matches.forEach(match => {
    if (match.result.isCompleted) {
      const team1Index = pointsTable.findIndex(t => t.id === match.team1.id);
      const team2Index = pointsTable.findIndex(t => t.id === match.team2.id);
      
      // Increment matches played
      pointsTable[team1Index].matches++;
      pointsTable[team2Index].matches++;
      
      if (match.result.winner === match.team1.id) {
        pointsTable[team1Index].won++;
        pointsTable[team1Index].points += 2;
        pointsTable[team2Index].lost++;
      } else {
        pointsTable[team2Index].won++;
        pointsTable[team2Index].points += 2;
        pointsTable[team1Index].lost++;
      }
    }
  });
  
  // Sort by points, then by NRR
  return pointsTable.sort((a, b) => b.points - a.points || b.nrr - a.nrr);
};

// Generate player statistics
const generatePlayerStats = () => {
  const firstNames = ["Virat", "Rohit", "MS", "Jasprit", "Ravindra", "KL", "Rishabh", "Hardik", "Shikhar", "Yuzvendra"];
  const lastNames = ["Kohli", "Sharma", "Dhoni", "Bumrah", "Jadeja", "Rahul", "Pant", "Pandya", "Dhawan", "Chahal"];
  
  const batsmen = [];
  const bowlers = [];
  const sixHitters = [];
  
  // Generate 20 players
  for (let i = 0; i < 20; i++) {
    const firstName = firstNames[i % firstNames.length];
    const lastName = lastNames[(i + 3) % lastNames.length];
    const name = `${firstName} ${lastName}`;
    const team = TEAMS[i % TEAMS.length];
    
    // Batting stats
    batsmen.push({
      id: i + 1,
      name,
      team,
      matches: 10 + Math.floor(Math.random() * 5),
      runs: 200 + Math.floor(Math.random() * 300),
      average: 25 + Math.floor(Math.random() * 30),
      strikeRate: 120 + Math.floor(Math.random() * 40)
    });
    
    // Bowling stats
    bowlers.push({
      id: i + 1,
      name,
      team,
      matches: 10 + Math.floor(Math.random() * 5),
      wickets: 5 + Math.floor(Math.random() * 20),
      economy: 6 + Math.random() * 3,
      average: 20 + Math.floor(Math.random() * 15)
    });
    
    // Six hitting stats
    sixHitters.push({
      id: i + 1,
      name,
      team,
      matches: 10 + Math.floor(Math.random() * 5),
      sixes: 5 + Math.floor(Math.random() * 30),
      fourBallSixes: 1 + Math.floor(Math.random() * 5),
      longestSix: 85 + Math.floor(Math.random() * 20)
    });
  }
  
  return {
    batsmen: batsmen.sort((a, b) => b.runs - a.runs).slice(0, 10),
    bowlers: bowlers.sort((a, b) => b.wickets - a.wickets).slice(0, 10),
    sixHitters: sixHitters.sort((a, b) => b.sixes - a.sixes).slice(0, 10)
  };
};

export default function Schedule() {
  const [matches, setMatches] = useState<any[]>([]);
  const [pointsTable, setPointsTable] = useState<any[]>([]);
  const [playerStats, setPlayerStats] = useState<any>({
    batsmen: [],
    bowlers: [],
    sixHitters: []
  });
  const [activeTab, setActiveTab] = useState<'upcoming' | 'completed'>('upcoming');
  const [statTab, setStatTab] = useState<'batting' | 'bowling' | 'sixes'>('batting');
  const [loading, setLoading] = useState(true);
  
  // Generate data on component mount
  useEffect(() => {
    setLoading(true);
    
    // Simulate API fetch delay
    setTimeout(() => {
      const generatedMatches = generateSchedule();
      const generatedPointsTable = generatePointsTable(generatedMatches);
      const generatedPlayerStats = generatePlayerStats();
      
      setMatches(generatedMatches);
      setPointsTable(generatedPointsTable);
      setPlayerStats(generatedPlayerStats);
      setLoading(false);
    }, 1000);
  }, []);
  
  // Filter matches based on active tab
  const filteredMatches = matches.filter(match => 
    activeTab === 'upcoming' ? !match.result.isCompleted : match.result.isCompleted
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 flex items-center">
          <Calendar className="h-8 w-8 text-blue-500 mr-2" />
          Tournament Schedule
        </h1>
        
        {loading ? (
          <div className="flex justify-center items-center h-60">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Match Schedule - Takes up 2/3 of the space on large screens */}
            <div className="lg:col-span-2 space-y-6">
              {/* Tabs for Upcoming vs Completed matches */}
              <div className="bg-white rounded-lg shadow-md mb-6">
                <div className="flex border-b">
                  <button 
                    className={cn(
                      "flex-1 py-3 text-center font-medium transition-colors",
                      activeTab === 'upcoming' 
                        ? "border-b-2 border-blue-500 text-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setActiveTab('upcoming')}
                  >
                    Upcoming Matches
                  </button>
                  <button 
                    className={cn(
                      "flex-1 py-3 text-center font-medium transition-colors",
                      activeTab === 'completed' 
                        ? "border-b-2 border-blue-500 text-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setActiveTab('completed')}
                  >
                    Completed Matches
                  </button>
                </div>
              </div>
              
              {/* Match Cards */}
              <div className="space-y-4">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <Link href={`/schedule/${match.id}`} key={match.id}>
                      <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                        className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
                      >
                        <div className="p-4">
                          <div className="flex justify-between items-center mb-3">
                            <span className="text-sm text-gray-500">
                              {match.date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}
                            </span>
                            <span className="text-xs bg-gray-100 text-gray-700 py-1 px-2 rounded">
                              Match #{match.id}
                            </span>
                          </div>
                          
                          <div className="flex flex-col md:flex-row justify-between items-center">
                            {/* Team 1 */}
                            <div className="flex items-center w-full md:w-auto mb-4 md:mb-0">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                                <div className="w-full h-full relative">
                                  <Image
                                    src={match.team1.image}
                                    alt={match.team1.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="font-bold" style={{ color: match.team1.color }}>{match.team1.short}</p>
                                <p className="text-sm text-gray-600">{match.team1.name}</p>
                                {match.result.isCompleted && (
                                  <p className="text-sm font-medium mt-1">
                                    {match.result.team1Score}/{match.result.team1Wickets}
                                  </p>
                                )}
                              </div>
                            </div>
                            
                            {/* VS */}
                            <div className="px-4 py-2 rounded-full bg-gray-100 text-gray-600 font-bold mb-4 md:mb-0">
                              VS
                            </div>
                            
                            {/* Team 2 */}
                            <div className="flex items-center w-full md:w-auto">
                              <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-100 mr-3 flex-shrink-0">
                                <div className="w-full h-full relative">
                                  <Image
                                    src={match.team2.image}
                                    alt={match.team2.name}
                                    fill
                                    className="object-cover"
                                  />
                                </div>
                              </div>
                              <div>
                                <p className="font-bold" style={{ color: match.team2.color }}>{match.team2.short}</p>
                                <p className="text-sm text-gray-600">{match.team2.name}</p>
                                {match.result.isCompleted && (
                                  <p className="text-sm font-medium mt-1">
                                    {match.result.team2Score}/{match.result.team2Wickets}
                                  </p>
                                )}
                              </div>
                            </div>
                          </div>
                          
                          {/* Result or Venue */}
                          <div className="mt-4 pt-3 border-t">
                            <div className="flex justify-between items-center">
                              <div className="text-sm text-gray-600">
                                <span className="font-medium">Venue:</span> {match.ground.name}, {match.ground.city}
                              </div>
                              
                              {match.result.isCompleted ? (
                                <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                                  {match.result.winner === match.team1.id 
                                    ? `${match.team1.short} won` 
                                    : `${match.team2.short} won`}
                                </div>
                              ) : (
                                <div className="text-sm text-gray-500">
                                  {Math.floor((match.date.getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))} days to go
                                </div>
                              )}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </Link>
                  ))
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-8 text-center">
                    <div className="flex justify-center mb-4">
                      <Calendar className="h-12 w-12 text-gray-300" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-500">No matches found</h3>
                    <p className="text-gray-400 mt-2">
                      {activeTab === 'upcoming' 
                        ? "All matches have been completed!" 
                        : "No completed matches yet."}
                    </p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Sidebar for Points Table and Player Stats */}
            <div className="space-y-6">
              {/* Points Table */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-blue-500 text-white flex items-center">
                  <Table className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-bold">Points Table</h2>
                </div>
                
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 py-2 text-left">Team</th>
                        <th className="px-2 py-2 text-center">M</th>
                        <th className="px-2 py-2 text-center">W</th>
                        <th className="px-2 py-2 text-center">L</th>
                        <th className="px-2 py-2 text-center">NRR</th>
                        <th className="px-2 py-2 text-center">Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {pointsTable.map((team, index) => (
                        <tr 
                          key={team.id} 
                          className={cn(
                            "border-t border-gray-100",
                            index < 4 ? "bg-blue-50" : ""
                          )}
                        >
                          <td className="px-4 py-3">
                            <div className="flex items-center">
                              {index < 4 && (
                                <div className="w-1 h-6 bg-green-500 rounded-full mr-2"></div>
                              )}
                              <span 
                                className="font-medium"
                                style={{ color: index < 4 ? team.color : "inherit" }}
                              >
                                {team.short}
                              </span>
                            </div>
                          </td>
                          <td className="px-2 py-3 text-center">{team.matches}</td>
                          <td className="px-2 py-3 text-center">{team.won}</td>
                          <td className="px-2 py-3 text-center">{team.lost}</td>
                          <td className="px-2 py-3 text-center">
                            <span className={team.nrr >= 0 ? "text-green-600" : "text-red-600"}>
                              {team.nrr > 0 ? '+' : ''}{team.nrr}
                            </span>
                          </td>
                          <td className="px-2 py-3 text-center font-bold">{team.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                <div className="p-3 bg-gray-50 text-xs text-gray-500 border-t">
                  Top 4 teams qualify for playoffs
                </div>
              </div>
              
              {/* Player Stats */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="p-4 bg-blue-500 text-white flex items-center">
                  <Medal className="h-5 w-5 mr-2" />
                  <h2 className="text-lg font-bold">Player Statistics</h2>
                </div>
                
                {/* Tabs for different stats */}
                <div className="flex border-b">
                  <button 
                    className={cn(
                      "flex-1 py-3 text-center text-sm font-medium transition-colors",
                      statTab === 'batting' 
                        ? "border-b-2 border-blue-500 text-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setStatTab('batting')}
                  >
                    Top Batsmen
                  </button>
                  <button 
                    className={cn(
                      "flex-1 py-3 text-center text-sm font-medium transition-colors",
                      statTab === 'bowling' 
                        ? "border-b-2 border-blue-500 text-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setStatTab('bowling')}
                  >
                    Top Bowlers
                  </button>
                  <button 
                    className={cn(
                      "flex-1 py-3 text-center text-sm font-medium transition-colors",
                      statTab === 'sixes' 
                        ? "border-b-2 border-blue-500 text-blue-600" 
                        : "text-gray-500 hover:text-gray-700"
                    )}
                    onClick={() => setStatTab('sixes')}
                  >
                    Most Sixes
                  </button>
                </div>
                
                {/* Batting Stats */}
                {statTab === 'batting' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Player</th>
                          <th className="px-2 py-2 text-center">Runs</th>
                          <th className="px-2 py-2 text-center">Avg</th>
                          <th className="px-2 py-2 text-center">SR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerStats.batsmen.map((player, index) => (
                          <tr 
                            key={player.id} 
                            className={cn(
                              "border-t border-gray-100",
                              index === 0 ? "bg-orange-50" : ""
                            )}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                {index === 0 && (
                                  <div className="text-orange-500 mr-1">👑</div>
                                )}
                                <div>
                                  <div className="font-medium">{player.name}</div>
                                  <div className="text-xs text-gray-500">{player.team.short}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-center font-bold">{player.runs}</td>
                            <td className="px-2 py-3 text-center">{player.average}</td>
                            <td className="px-2 py-3 text-center">{player.strikeRate}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Bowling Stats */}
                {statTab === 'bowling' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Player</th>
                          <th className="px-2 py-2 text-center">Wkts</th>
                          <th className="px-2 py-2 text-center">Econ</th>
                          <th className="px-2 py-2 text-center">Avg</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerStats.bowlers.map((player, index) => (
                          <tr 
                            key={player.id} 
                            className={cn(
                              "border-t border-gray-100",
                              index === 0 ? "bg-purple-50" : ""
                            )}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                {index === 0 && (
                                  <div className="text-purple-500 mr-1">👑</div>
                                )}
                                <div>
                                  <div className="font-medium">{player.name}</div>
                                  <div className="text-xs text-gray-500">{player.team.short}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-center font-bold">{player.wickets}</td>
                            <td className="px-2 py-3 text-center">{player.economy.toFixed(2)}</td>
                            <td className="px-2 py-3 text-center">{player.average}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
                
                {/* Six Hitting Stats */}
                {statTab === 'sixes' && (
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="bg-gray-50">
                          <th className="px-4 py-2 text-left">Player</th>
                          <th className="px-2 py-2 text-center">6s</th>
                          <th className="px-2 py-2 text-center">Longest</th>
                        </tr>
                      </thead>
                      <tbody>
                        {playerStats.sixHitters.map((player, index) => (
                          <tr 
                            key={player.id} 
                            className={cn(
                              "border-t border-gray-100",
                              index === 0 ? "bg-green-50" : ""
                            )}
                          >
                            <td className="px-4 py-3">
                              <div className="flex items-center">
                                {index === 0 && (
                                  <div className="text-green-500 mr-1">👑</div>
                                )}
                                <div>
                                  <div className="font-medium">{player.name}</div>
                                  <div className="text-xs text-gray-500">{player.team.short}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-2 py-3 text-center font-bold">{player.sixes}</td>
                            <td className="px-2 py-3 text-center">{player.longestSix}m</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
} 
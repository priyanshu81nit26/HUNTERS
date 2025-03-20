"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  ChevronsUpDown,
  Trophy
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Mock data for IPL teams
const IPL_TEAMS = [
  { id: 1, name: "Chennai Super Kings", short: "CSK", color: "yellow" },
  { id: 2, name: "Mumbai Indians", short: "MI", color: "blue" },
  { id: 3, name: "Royal Challengers Bangalore", short: "RCB", color: "red" },
  { id: 4, name: "Kolkata Knight Riders", short: "KKR", color: "purple" },
  { id: 5, name: "Delhi Capitals", short: "DC", color: "blue" },
  { id: 6, name: "Punjab Kings", short: "PBKS", color: "red" },
  { id: 7, name: "Rajasthan Royals", short: "RR", color: "pink" },
  { id: 8, name: "Sunrisers Hyderabad", short: "SRH", color: "orange" },
];

// Player interface
interface Player {
  id: number;
  name: string;
  team: string;
  role: string;
  battingHand: string;
  bowlingStyle: string;
  imageUrl: string;
  stats: {
    battingAvg: string;
    strikeRate: string;
    bowlingAvg: string;
    economy: string;
  };
  pickedByUsers: number;
  isCaptainPick: boolean;
  isViceCaptainPick: boolean;
}

export default function DreamTeamPage() {
  const [selectedTeam, setSelectedTeam] = useState(IPL_TEAMS[0]);
  const [opponent, setOpponent] = useState(IPL_TEAMS[1]);
  const [isLoading, setIsLoading] = useState(true);
  const [dreamTeam, setDreamTeam] = useState<Player[]>([]);

  // Fetch player data when team or opponent changes
  useEffect(() => {
    setIsLoading(true);
    
    // Simulating API fetch delay
    const fetchTimer = setTimeout(() => {
      // Sample dream team data - in a real app, this would come from your API
      const mockDreamTeam: Player[] = [
        {
          id: 1,
          name: "MS Dhoni",
          team: "CSK",
          role: "Wicket-keeper",
          battingHand: "Right-handed",
          bowlingStyle: "-",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "38.5",
            strikeRate: "136.8",
            bowlingAvg: "-",
            economy: "-"
          },
          pickedByUsers: 1250000,
          isCaptainPick: true,
          isViceCaptainPick: false
        },
        {
          id: 2,
          name: "Virat Kohli",
          team: "RCB",
          role: "Batsman",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm medium",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "42.7",
            strikeRate: "130.2",
            bowlingAvg: "92.5",
            economy: "8.3"
          },
          pickedByUsers: 1120000,
          isViceCaptainPick: true,
          isCaptainPick: false
        },
        // Add more players as needed
        {
          id: 3,
          name: "Jasprit Bumrah",
          team: "MI",
          role: "Bowler",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm fast",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "6.2",
            strikeRate: "88.5",
            bowlingAvg: "23.8",
            economy: "7.4"
          },
          pickedByUsers: 980000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 4,
          name: "Ravindra Jadeja",
          team: "CSK",
          role: "All-rounder",
          battingHand: "Left-handed",
          bowlingStyle: "Left-arm orthodox",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "26.1",
            strikeRate: "127.6",
            bowlingAvg: "28.2",
            economy: "7.6"
          },
          pickedByUsers: 870000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 5,
          name: "Rohit Sharma",
          team: "MI",
          role: "Batsman",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm off break",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "36.2",
            strikeRate: "128.7",
            bowlingAvg: "62.3",
            economy: "9.1"
          },
          pickedByUsers: 1050000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 6,
          name: "KL Rahul",
          team: "PBKS",
          role: "Wicket-keeper",
          battingHand: "Right-handed",
          bowlingStyle: "-",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "41.8",
            strikeRate: "133.5",
            bowlingAvg: "-",
            economy: "-"
          },
          pickedByUsers: 780000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 7,
          name: "Hardik Pandya",
          team: "MI",
          role: "All-rounder",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm medium-fast",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "28.7",
            strikeRate: "147.3",
            bowlingAvg: "31.2",
            economy: "8.9"
          },
          pickedByUsers: 920000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 8,
          name: "Rashid Khan",
          team: "SRH",
          role: "Bowler",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm leg break",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "12.8",
            strikeRate: "152.6",
            bowlingAvg: "21.7",
            economy: "6.3"
          },
          pickedByUsers: 850000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 9,
          name: "Rishabh Pant",
          team: "DC",
          role: "Wicket-keeper",
          battingHand: "Left-handed",
          bowlingStyle: "-",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "34.6",
            strikeRate: "147.9",
            bowlingAvg: "-",
            economy: "-"
          },
          pickedByUsers: 760000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 10,
          name: "Andre Russell",
          team: "KKR",
          role: "All-rounder",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm fast-medium",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "29.1",
            strikeRate: "182.3",
            bowlingAvg: "25.6",
            economy: "9.1"
          },
          pickedByUsers: 880000,
          isCaptainPick: false,
          isViceCaptainPick: false
        },
        {
          id: 11,
          name: "Yuzvendra Chahal",
          team: "RR",
          role: "Bowler",
          battingHand: "Right-handed",
          bowlingStyle: "Right-arm leg break",
          imageUrl: "/dhoni.jpg",
          stats: {
            battingAvg: "4.3",
            strikeRate: "72.5",
            bowlingAvg: "23.1",
            economy: "7.8"
          },
          pickedByUsers: 710000,
          isCaptainPick: false,
          isViceCaptainPick: false
        }
      ];
      
      setDreamTeam(mockDreamTeam);
      setIsLoading(false);
    }, 1500); // 1.5 seconds delay to simulate loading
    
    return () => clearTimeout(fetchTimer);
  }, [selectedTeam, opponent]);
  
  const handleTeamChange = (team: typeof IPL_TEAMS[0]) => {
    setSelectedTeam(team);
    if (team.id === opponent.id) {
      // If same team selected, switch opponent to avoid duplicate
      const newOpponent = IPL_TEAMS.find(t => t.id !== team.id) || IPL_TEAMS[1];
      setOpponent(newOpponent);
    }
  };
  
  const handleOpponentChange = (team: typeof IPL_TEAMS[0]) => {
    setOpponent(team);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Dream Team Builder</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Sidebar - Team Selection */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Team Dashboard</CardTitle>
                <CardDescription>
                  Select your team and opponent to get player recommendations
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Team Selector - Direct Selection */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Your Team</label>
                  <div className="relative">
                    <select 
                      className="w-full h-10 pl-3 pr-10 py-2 border rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={selectedTeam.id}
                      onChange={(e) => {
                        const team = IPL_TEAMS.find(t => t.id === parseInt(e.target.value));
                        if (team) handleTeamChange(team);
                      }}
                    >
                      {IPL_TEAMS.map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Opponent Selector - Direct Selection */}
                <div className="space-y-1">
                  <label className="text-sm font-medium">Opponent Team</label>
                  <div className="relative">
                    <select 
                      className="w-full h-10 pl-3 pr-10 py-2 border rounded-md appearance-none bg-white focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
                      value={opponent.id}
                      onChange={(e) => {
                        const team = IPL_TEAMS.find(t => t.id === parseInt(e.target.value));
                        if (team) handleOpponentChange(team);
                      }}
                    >
                      {IPL_TEAMS.filter(team => team.id !== selectedTeam.id).map((team) => (
                        <option key={team.id} value={team.id}>
                          {team.name}
                        </option>
                      ))}
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                      <ChevronsUpDown className="h-4 w-4 text-gray-400" />
                    </div>
                  </div>
                </div>
                
                {/* Upcoming Match Information */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3">Upcoming Match</h3>
                  
                  <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center space-x-2">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src="/dhoni.jpg"
                            alt={selectedTeam.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <span className="font-medium text-lg">vs</span>
                        <div className="relative h-10 w-10 rounded-full overflow-hidden">
                          <Image
                            src="/dhoni.jpg"
                            alt={opponent.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-sm">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-500">Date:</span>
                        <span className="font-medium">21/3/2025</span>
                      </div>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-500">Time:</span>
                        <span className="font-medium">7:30 PM IST</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-500">Venue:</span>
                        <span className="font-medium">
                          {selectedTeam.short === "CSK" ? "Chepauk Stadium" : 
                           selectedTeam.short === "MI" ? "Wankhede Stadium" : 
                           "Narendra Modi Stadium"}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <div className="flex items-center mb-2">
                      <Trophy className="h-4 w-4 mr-2 text-yellow-500" />
                      <span className="font-medium">Captain Picks</span>
                    </div>
                    
                    {dreamTeam.filter(player => player.isCaptainPick).map(player => (
                      <div
                        key={player.id}
                        className="flex items-center p-2 mb-2 bg-white rounded-lg border border-yellow-200 shadow-sm"
                      >
                        <div className="relative h-10 w-10 mr-3 rounded-full overflow-hidden">
                          <Image
                            src={player.imageUrl}
                            alt={player.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{player.name}</h4>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <span>{player.team}</span>
                            <span>•</span>
                            <span>{player.role}</span>
                          </div>
                        </div>
                        <Badge className="bg-yellow-100 text-yellow-800">
                          Captain
                        </Badge>
                      </div>
                    ))}
                    
                    {dreamTeam.filter(player => player.isViceCaptainPick).map(player => (
                      <div
                        key={player.id}
                        className="flex items-center p-2 mb-2 bg-white rounded-lg border border-blue-200 shadow-sm"
                      >
                        <div className="relative h-10 w-10 mr-3 rounded-full overflow-hidden">
                          <Image
                            src={player.imageUrl}
                            alt={player.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h4 className="text-sm font-medium">{player.name}</h4>
                          <div className="flex items-center space-x-1 text-xs text-gray-500">
                            <span>{player.team}</span>
                            <span>•</span>
                            <span>{player.role}</span>
                          </div>
                        </div>
                        <Badge className="bg-blue-100 text-blue-800">
                          Vice Captain
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="lg:col-span-3 space-y-6">
            {/* Dream Team Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Dream Team XI
                </CardTitle>
                <CardDescription>
                  The optimal 11 players based on performance analytics
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {isLoading ? (
                    Array.from({ length: 11 }).map((_, i) => (
                      <div key={i} className="animate-pulse flex space-x-4">
                        <div className="rounded-full bg-slate-200 h-12 w-12"></div>
                        <div className="flex-1 space-y-3 py-1">
                          <div className="h-4 bg-slate-200 rounded"></div>
                          <div className="space-y-1">
                            <div className="grid grid-cols-3 gap-2">
                              <div className="h-3 bg-slate-200 rounded col-span-2"></div>
                              <div className="h-3 bg-slate-200 rounded col-span-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    dreamTeam.map((player) => (
                      <div
                        key={player.id}
                        className={`flex flex-col p-4 bg-white rounded-lg border shadow-sm ${
                          player.isCaptainPick 
                            ? "border-yellow-400 ring-2 ring-yellow-200" 
                            : player.isViceCaptainPick
                            ? "border-blue-400 ring-2 ring-blue-200"
                            : "border-gray-200"
                        }`}
                      >
                        <div className="flex items-center mb-3">
                          <div className="relative h-14 w-14 mr-3 rounded-full overflow-hidden">
                            <Image
                              src={player.imageUrl}
                              alt={player.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-sm font-medium flex items-center">
                              {player.name}
                              {player.isCaptainPick && (
                                <Badge className="ml-2 bg-yellow-100 text-yellow-800">Captain</Badge>
                              )}
                              {player.isViceCaptainPick && (
                                <Badge className="ml-2 bg-blue-100 text-blue-800">Vice Captain</Badge>
                              )}
                            </h4>
                            <div className="flex items-center space-x-1 text-xs text-gray-500">
                              <span>{player.team}</span>
                              <span>•</span>
                              <span>{player.role}</span>
                            </div>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          {player.role !== "Bowler" && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bat Avg</span>
                                <span className="font-medium">{player.stats.battingAvg}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">SR</span>
                                <span className="font-medium">{player.stats.strikeRate}</span>
                              </div>
                            </>
                          )}
                          
                          {player.role !== "Batsman" && (
                            <>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bowl Avg</span>
                                <span className="font-medium">{player.stats.bowlingAvg}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Econ</span>
                                <span className="font-medium">{player.stats.economy}</span>
                              </div>
                            </>
                          )}
                        </div>
                        
                        <div className="mt-3 pt-3 border-t border-gray-100">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-gray-500">Picked by</span>
                            <span className="text-xs font-medium">{player.pickedByUsers.toLocaleString()} users</span>
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
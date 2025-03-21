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
import { TEAMS, GROUNDS } from "../schedule/page";

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

// Generate today's match data
const getTodayMatch = () => {
  const today = new Date();
  
  // Get team indices for today's match based on the date
  const dayOfMonth = today.getDate();
  const team1Index = dayOfMonth % TEAMS.length;
  const team2Index = (team1Index + 1) % TEAMS.length;
  
  // Get ground for the match
  const groundIndex = team1Index % GROUNDS.length;
  
  return {
    team1: TEAMS[team1Index],
    team2: TEAMS[team2Index],
    date: today,
    time: "7:30 PM IST",
    venue: GROUNDS[groundIndex].name,
    city: GROUNDS[groundIndex].city
  };
};

export default function DreamTeamPage() {
  const [todayMatch, setTodayMatch] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [dreamTeam, setDreamTeam] = useState<Player[]>([]);
  const [organizedTeam, setOrganizedTeam] = useState<{
    batsmen: Player[],
    allRounders: Player[],
    bowlers: Player[]
  }>({
    batsmen: [],
    allRounders: [],
    bowlers: []
  });

  // Fetch player data and today's match on component mount
  useEffect(() => {
    setIsLoading(true);
    
    // Get today's match
    const matchData = getTodayMatch();
    setTodayMatch(matchData);
    
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
      
      // Organize players by role
      const batsmen = mockDreamTeam.filter(player => 
        player.role === "Batsman" || player.role === "Wicket-keeper"
      );
      
      const allRounders = mockDreamTeam.filter(player => 
        player.role === "All-rounder"
      );
      
      const bowlers = mockDreamTeam.filter(player => 
        player.role === "Bowler"
      );
      
      setOrganizedTeam({
        batsmen,
        allRounders,
        bowlers
      });
      
      setIsLoading(false);
    }, 1500); // 1.5 seconds delay to simulate loading
    
    return () => clearTimeout(fetchTimer);
  }, []);

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
                  Dream team based on today&apos;s match
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Today's Match Information */}
                <div className="mt-6">
                  <h3 className="text-md font-semibold mb-3">Today&apos;s Match</h3>
                  
                  {todayMatch && (
                    <div className="p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={todayMatch.team1.image}
                              alt={todayMatch.team1.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <span className="font-medium text-lg">vs</span>
                          <div className="relative h-10 w-10 rounded-full overflow-hidden">
                            <Image
                              src={todayMatch.team2.image}
                              alt={todayMatch.team2.name}
                              fill
                              className="object-cover"
                            />
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-sm">
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500">Date:</span>
                          <span className="font-medium">
                            {todayMatch.date.toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center mb-1">
                          <span className="text-gray-500">Time:</span>
                          <span className="font-medium">{todayMatch.time}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500">Venue:</span>
                          <span className="font-medium">
                            {todayMatch.venue}, {todayMatch.city}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  
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
                  The optimal 11 players based on performance analytics for today&apos;s match
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {Array.from({ length: 11 }).map((_, i) => (
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
                    ))}
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Batsmen Section */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-blue-600">Batsmen</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {organizedTeam.batsmen.map((player) => (
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
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bat Avg</span>
                                <span className="font-medium">{player.stats.battingAvg}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">SR</span>
                                <span className="font-medium">{player.stats.strikeRate}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Picked by</span>
                                <span className="text-xs font-medium">{player.pickedByUsers.toLocaleString()} users</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* All-Rounders Section */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-green-600">All-Rounders</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {organizedTeam.allRounders.map((player) => (
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
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bat Avg</span>
                                <span className="font-medium">{player.stats.battingAvg}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">SR</span>
                                <span className="font-medium">{player.stats.strikeRate}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bowl Avg</span>
                                <span className="font-medium">{player.stats.bowlingAvg}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Econ</span>
                                <span className="font-medium">{player.stats.economy}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Picked by</span>
                                <span className="text-xs font-medium">{player.pickedByUsers.toLocaleString()} users</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    {/* Bowlers Section */}
                    <div>
                      <h3 className="text-lg font-medium mb-3 text-red-600">Bowlers</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {organizedTeam.bowlers.map((player) => (
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
                              <div className="flex justify-between">
                                <span className="text-gray-500">Bowl Avg</span>
                                <span className="font-medium">{player.stats.bowlingAvg}</span>
                              </div>
                              <div className="flex justify-between">
                                <span className="text-gray-500">Econ</span>
                                <span className="font-medium">{player.stats.economy}</span>
                              </div>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t border-gray-100">
                              <div className="flex justify-between items-center">
                                <span className="text-xs text-gray-500">Picked by</span>
                                <span className="text-xs font-medium">{player.pickedByUsers.toLocaleString()} users</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
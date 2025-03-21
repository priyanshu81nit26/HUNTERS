"use client";

import { useState } from "react";
import Image from "next/image";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Bar, Pie, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  PointElement,
  LineElement
);

// Mock data for teams
const teams = [
  { id: 1, name: "Mumbai Indians", color: "#004BA0" },
  { id: 2, name: "Chennai Super Kings", color: "#FFFF00" },
  { id: 3, name: "Royal Challengers Bangalore", color: "#FF0000" },
  { id: 4, name: "Kolkata Knight Riders", color: "#3A225D" },
  { id: 5, name: "Delhi Capitals", color: "#0078BC" },
  { id: 6, name: "Punjab Kings", color: "#ED1B24" },
  { id: 7, name: "Rajasthan Royals", color: "#FF69B4" },
  { id: 8, name: "Sunrisers Hyderabad", color: "#F7A721" },
  { id: 9, name: "Gujarat Titans", color: "#1D428A" },
  { id: 10, name: "Lucknow Super Giants", color: "#A0E6FF" },
];

// Mock data for grounds
const grounds = [
  "Wankhede Stadium, Mumbai",
  "Eden Gardens, Kolkata",
  "M. Chinnaswamy Stadium, Bangalore",
  "Arun Jaitley Stadium, Delhi",
  "M. A. Chidambaram Stadium, Chennai",
  "Rajiv Gandhi International Cricket Stadium, Hyderabad",
  "Narendra Modi Stadium, Ahmedabad",
  "Punjab Cricket Association Stadium, Mohali",
  "Sawai Mansingh Stadium, Jaipur",
  "Brabourne Stadium, Mumbai",
];

// Mock data for top batsmen
const topBatsmen = [
  { id: 1, name: "MS Dhoni", runs: 485, avg: 40.4, sr: 136.8, matches: 12, image: "/dhoni.jpg" },
  { id: 2, name: "Virat Kohli", runs: 420, avg: 35.0, sr: 130.2, matches: 12, image: "/dhoni.jpg" },
  { id: 3, name: "Rohit Sharma", runs: 380, avg: 31.7, sr: 142.5, matches: 12, image: "/dhoni.jpg" },
  { id: 4, name: "KL Rahul", runs: 345, avg: 28.8, sr: 125.9, matches: 12, image: "/dhoni.jpg" },
];

// Mock data for top bowlers
const topBowlers = [
  { id: 1, name: "Jasprit Bumrah", wickets: 25, economy: 6.8, matches: 12, image: "/dhoni.jpg" },
  { id: 2, name: "Ravindra Jadeja", wickets: 22, economy: 7.2, matches: 12, image: "/dhoni.jpg" },
  { id: 3, name: "Mohammed Shami", wickets: 18, economy: 8.1, matches: 12, image: "/dhoni.jpg" },
];

export default function TeamAnalysisPage() {
  const [selectedTeam, setSelectedTeam] = useState<string>("");
  const [opponentTeam, setOpponentTeam] = useState<string>("");
  const [selectedGround, setSelectedGround] = useState<string>("");
  
  // Mock data for win/loss stats
  const winLossData = {
    labels: ['Wins', 'Losses', 'No Result'],
    datasets: [
      {
        data: [68, 42, 5],
        backgroundColor: ['#3B82F6', '#60A5FA', '#93C5FD'],
        borderColor: ['#2563EB', '#3B82F6', '#60A5FA'],
        borderWidth: 1,
      },
    ],
  };

  // Mock data for runs per over
  const runsPerOverData = {
    labels: [...Array(20).keys()].map(i => `Over ${i+1}`),
    datasets: [
      {
        label: 'Average Runs',
        data: [8, 7, 6, 9, 12, 15, 10, 8, 7, 10, 12, 9, 7, 8, 9, 11, 13, 15, 14, 16],
        backgroundColor: selectedTeam ? 
          teams.find(team => team.name === selectedTeam)?.color || '#3B82F6' : 
          '#3B82F6',
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  // Mock data for head to head - updated to use bar graph
  const headToHeadData = {
    labels: ['Matches Played', 'Wins', 'Losses', 'No Result'],
    datasets: [
      {
        label: selectedTeam || 'Team 1',
        data: [20, 12, 8, 0],
        backgroundColor: selectedTeam ? 
          teams.find(team => team.name === selectedTeam)?.color || '#3B82F6' : 
          '#3B82F6',
        borderColor: 'rgba(53, 162, 235, 0.5)',
        borderWidth: 1,
      },
      {
        label: opponentTeam || 'Team 2',
        data: [20, 8, 12, 0],
        backgroundColor: opponentTeam ? 
          teams.find(team => team.name === opponentTeam)?.color || '#F97316' : 
          '#F97316',
        borderColor: 'rgba(249, 115, 22, 0.5)',
        borderWidth: 1,
      },
    ],
  };

  // Mock head-to-head stats for text display
  const headToHeadStats = {
    totalMatches: 20,
    team1Wins: 12, 
    team2Wins: 8,
    highestTeam1Score: 224,
    highestTeam2Score: 207,
    lastFiveMatches: ['W', 'L', 'W', 'W', 'L'], // W for team1, L for team2
  };

  // Mock data for ground performance - updated to use Doughnut with website theme
  const groundPerformanceData = {
    labels: ['Wins', 'Losses'],
    datasets: [
      {
        data: [7, 3],
        backgroundColor: [
          'rgba(59, 130, 246, 0.8)',
          'rgba(147, 197, 253, 0.8)',
        ],
        borderColor: [
          'rgba(37, 99, 235, 1)',
          'rgba(96, 165, 250, 1)',
        ],
        borderWidth: 1,
        hoverOffset: 15,
        cutout: '70%',
      },
    ],
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Performance Data',
      },
    },
  };

  const doughnutOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
      title: {
        display: true,
        text: 'Ground Performance',
        color: 'white',
        font: {
          size: 18,
        }
      },
    },
    cutout: '70%',
  };

  return (
    <div className="container mx-auto px-4 py-20">
      <h1 className="text-3xl font-bold text-center mb-8 text-white">Team Analysis</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card className="bg-gray-900 border-gray-800 text-white">
          <CardHeader>
            <CardTitle className="text-blue-400">Select Team</CardTitle>
            <CardDescription className="text-gray-400">Choose a team to analyze</CardDescription>
          </CardHeader>
          <CardContent>
            <Select onValueChange={setSelectedTeam} value={selectedTeam}>
              <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                <SelectValue placeholder="Select team" />
              </SelectTrigger>
              <SelectContent className="bg-gray-800 border-gray-700 text-white">
                {teams.map((team) => (
                  <SelectItem key={team.id} value={team.name}>
                    {team.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      {selectedTeam && (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-blue-400">Win/Loss Statistics</CardTitle>
                <CardDescription className="text-gray-400">
                  Overall performance of {selectedTeam}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px] flex items-center justify-center">
                <Pie data={winLossData} />
              </CardContent>
            </Card>

            <Card className="bg-gray-900 border-gray-800 text-white">
              <CardHeader>
                <CardTitle className="text-blue-400">Runs Per Over</CardTitle>
                <CardDescription className="text-gray-400">
                  Average runs scored per over by {selectedTeam}
                </CardDescription>
              </CardHeader>
              <CardContent className="h-[300px]">
                <Bar options={barOptions} data={runsPerOverData} />
              </CardContent>
            </Card>
          </div>

          <Card className="bg-gray-900 border-gray-800 text-white mb-8">
            <CardHeader>
              <CardTitle className="text-blue-400">Head to Head Analysis</CardTitle>
              <CardDescription className="text-gray-400">
                Compare {selectedTeam} against another team
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select onValueChange={setOpponentTeam} value={opponentTeam}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select opponent team" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {teams
                      .filter(team => team.name !== selectedTeam)
                      .map((team) => (
                        <SelectItem key={team.id} value={team.name}>
                          {team.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {opponentTeam && (
                <>
                  <div className="h-[300px]">
                    <Bar options={barOptions} data={headToHeadData} />
                  </div>
                  
                  <div className="mt-6 bg-gray-800 rounded-lg p-5">
                    <h3 className="text-xl text-blue-400 font-semibold mb-4">Head to Head Statistics</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Total Matches</p>
                        <p className="text-white text-3xl font-bold">{headToHeadStats.totalMatches}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">{selectedTeam} Wins</p>
                        <p className="text-white text-3xl font-bold">{headToHeadStats.team1Wins}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">{opponentTeam} Wins</p>
                        <p className="text-white text-3xl font-bold">{headToHeadStats.team2Wins}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Highest Score ({selectedTeam})</p>
                        <p className="text-white text-3xl font-bold">{headToHeadStats.highestTeam1Score}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Highest Score ({opponentTeam})</p>
                        <p className="text-white text-3xl font-bold">{headToHeadStats.highestTeam2Score}</p>
                      </div>
                      <div className="bg-gray-700 rounded-lg p-4 text-center">
                        <p className="text-gray-400 text-sm">Last 5 Matches</p>
                        <div className="flex justify-center gap-1 mt-2">
                          {headToHeadStats.lastFiveMatches.map((result, idx) => (
                            <span 
                              key={idx} 
                              className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white font-bold ${
                                result === 'W' ? 'bg-blue-600' : 'bg-blue-300'
                              }`}
                            >
                              {result}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white mb-8">
            <CardHeader>
              <CardTitle className="text-blue-400">Ground Performance</CardTitle>
              <CardDescription className="text-gray-400">
                {selectedTeam}&apos;s performance at different grounds
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-6">
                <Select onValueChange={setSelectedGround} value={selectedGround}>
                  <SelectTrigger className="bg-gray-800 border-gray-700 text-white">
                    <SelectValue placeholder="Select ground" />
                  </SelectTrigger>
                  <SelectContent className="bg-gray-800 border-gray-700 text-white">
                    {grounds.map((ground, index) => (
                      <SelectItem key={index} value={ground}>
                        {ground}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedGround && (
                <div className="mt-4">
                  <div className="flex items-center justify-center mb-6">
                    <div className="relative h-[300px] w-[300px]">
                      <Doughnut data={groundPerformanceData} options={doughnutOptions} />
                      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                        <p className="text-gray-400 text-sm">Win Rate</p>
                        <p className="text-white text-3xl font-bold">70%</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-800 rounded-lg p-4">
                    <h3 className="text-xl text-blue-400 font-semibold mb-2">Ground Stats</h3>
                    <p className="text-gray-300">
                      {selectedTeam} has played 10 matches at {selectedGround} with 7 wins and 3 losses.
                      The average first innings score is 178 and second innings score is 165.
                    </p>
                    <div className="grid grid-cols-2 gap-2 mt-4">
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs">Highest Score</p>
                        <p className="text-white font-semibold">225/4</p>
                      </div>
                      <div className="bg-gray-700 p-3 rounded-lg">
                        <p className="text-gray-400 text-xs">Lowest Score</p>
                        <p className="text-white font-semibold">132/8</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800 text-white">
            <CardHeader>
              <CardTitle className="text-blue-400">Top Players</CardTitle>
              <CardDescription className="text-gray-400">
                {selectedTeam}&apos;s top batsmen and bowlers
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="batsmen">
                <TabsList className="bg-gray-800 text-gray-400">
                  <TabsTrigger value="batsmen" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    Top 4 Batsmen
                  </TabsTrigger>
                  <TabsTrigger value="bowlers" className="data-[state=active]:bg-gray-700 data-[state=active]:text-white">
                    Top 3 Bowlers
                  </TabsTrigger>
                </TabsList>
                <TabsContent value="batsmen">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-4">
                    {topBatsmen.map((player) => (
                      <Card key={player.id} className="bg-gray-800 border-gray-700 overflow-hidden relative">
                        <CardHeader className="pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-white text-lg">{player.name}</CardTitle>
                              <CardDescription className="text-gray-400">Batsman</CardDescription>
                            </div>
                            <Badge className="bg-blue-600">{`#${player.id}`}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Runs</span>
                              <span className="text-white font-bold">{player.runs}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Average</span>
                              <span className="text-white font-bold">{player.avg}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Strike Rate</span>
                              <span className="text-white font-bold">{player.sr}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Matches</span>
                              <span className="text-white font-bold">{player.matches}</span>
                            </div>
                          </div>
                        </CardContent>
                        <div className="relative h-40 mt-4 overflow-hidden">
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                            className="z-0 opacity-60 hover:opacity-80 transition-opacity"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
                <TabsContent value="bowlers">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                    {topBowlers.map((player) => (
                      <Card key={player.id} className="bg-gray-800 border-gray-700 overflow-hidden relative">
                        <CardHeader className="pb-0">
                          <div className="flex justify-between items-start">
                            <div>
                              <CardTitle className="text-white text-lg">{player.name}</CardTitle>
                              <CardDescription className="text-gray-400">Bowler</CardDescription>
                            </div>
                            <Badge className="bg-blue-600">{`#${player.id}`}</Badge>
                          </div>
                        </CardHeader>
                        <CardContent className="pt-4">
                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-gray-400">Wickets</span>
                              <span className="text-white font-bold">{player.wickets}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Economy</span>
                              <span className="text-white font-bold">{player.economy}</span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-gray-400">Matches</span>
                              <span className="text-white font-bold">{player.matches}</span>
                            </div>
                          </div>
                        </CardContent>
                        <div className="relative h-40 mt-4 overflow-hidden">
                          <Image
                            src={player.image}
                            alt={player.name}
                            fill
                            style={{ objectFit: 'cover', objectPosition: 'top' }}
                            className="z-0 opacity-60 hover:opacity-80 transition-opacity"
                          />
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  );
} 
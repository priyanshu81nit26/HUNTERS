"use client";

import { useState, useEffect } from "react";
import { ArrowLeft, Activity, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import Link from "next/link";
import { Line } from "react-chartjs-2";
import {
  Chart,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useParams } from 'next/navigation';

// Register ChartJS components
Chart.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Import team and match data from schedule page
import { TEAMS, GROUNDS } from '../page';

interface Team {
  id: number;
  name: string;
  short: string;
  color: string;
  image: string;
}

interface Ground {
  id: number;
  name: string;
  city: string;
}

interface PlayerStats {
  name: string;
  runs?: number;
  balls?: number;
  fours?: number;
  sixes?: number;
  strikeRate?: number;
  overs?: number;
  maidens?: number;
  wickets?: number;
  economy?: number;
}

interface MatchData {
  id: number;
  team1: Team;
  team2: Team;
  ground: Ground;
  date: Date;
  result: {
    isCompleted: boolean;
    winner: number;
    team1Score: number;
    team1Wickets: number;
    team2Score: number;
    team2Wickets: number;
    innings1: {
      stats: {
        batting: PlayerStats[];
        bowling: PlayerStats[];
        fallOfWickets: { score: number; over: number; batsman: string; }[];
      };
      overs: { overNumber: number; runs: number; wickets: number; }[];
    };
    innings2: {
      stats: {
        batting: PlayerStats[];
        bowling: PlayerStats[];
        fallOfWickets: { score: number; over: number; batsman: string; }[];
      };
      overs: { overNumber: number; runs: number; wickets: number; }[];
    };
  };
}

export default function MatchDetail() {
  const params = useParams();
  const [match, setMatch] = useState<MatchData | null>(null);
  const [activeTab, setActiveTab] = useState<'summary' | 'scorecard' | 'graph'>('summary');
  const [selectedInnings, setSelectedInnings] = useState<1 | 2>(1);
  const [loading, setLoading] = useState(true);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerStats | null>(null);

  useEffect(() => {
    const loadMatchData = async () => {
      try {
        const matchId = params?.matchId;
        if (!matchId) {
          setLoading(false);
          return;
        }

        const id = parseInt(matchId as string);
        const team1 = TEAMS[0];
        const team2 = TEAMS[1];
        const ground = GROUNDS[0];
        
        const generatePlayerStats = () => {
          // Generate 11 batsmen with realistic scores
          const batting: PlayerStats[] = [
            { name: "Opener 1", runs: 45, balls: 32, fours: 4, sixes: 2, strikeRate: 140.62 },
            { name: "Opener 2", runs: 38, balls: 28, fours: 3, sixes: 1, strikeRate: 135.71 },
            { name: "No. 3", runs: 52, balls: 35, fours: 5, sixes: 2, strikeRate: 148.57 },
            { name: "No. 4", runs: 28, balls: 20, fours: 3, sixes: 0, strikeRate: 140.00 },
            { name: "No. 5", runs: 15, balls: 12, fours: 1, sixes: 1, strikeRate: 125.00 },
            { name: "No. 6", runs: 22, balls: 15, fours: 2, sixes: 1, strikeRate: 146.67 },
            { name: "No. 7", runs: 8, balls: 6, fours: 1, sixes: 0, strikeRate: 133.33 },
            { name: "No. 8", runs: 12, balls: 8, fours: 2, sixes: 0, strikeRate: 150.00 },
            { name: "No. 9", runs: 4, balls: 5, fours: 0, sixes: 0, strikeRate: 80.00 },
            { name: "No. 10", runs: 2, balls: 4, fours: 0, sixes: 0, strikeRate: 50.00 },
            { name: "No. 11", runs: 0, balls: 1, fours: 0, sixes: 0, strikeRate: 0.00 }
          ];

          // Generate 7 bowlers with realistic figures
          const bowling: PlayerStats[] = [
            { name: "Bowler 1", overs: 4, maidens: 0, runs: 32, wickets: 2, economy: 8.00 },
            { name: "Bowler 2", overs: 4, maidens: 1, runs: 24, wickets: 3, economy: 6.00 },
            { name: "Bowler 3", overs: 4, maidens: 0, runs: 38, wickets: 1, economy: 9.50 },
            { name: "Bowler 4", overs: 3, maidens: 0, runs: 28, wickets: 1, economy: 9.33 },
            { name: "Bowler 5", overs: 3, maidens: 0, runs: 25, wickets: 1, economy: 8.33 },
            { name: "Bowler 6", overs: 1, maidens: 0, runs: 12, wickets: 0, economy: 12.00 },
            { name: "Bowler 7", overs: 1, maidens: 0, runs: 15, wickets: 0, economy: 15.00 }
          ];

          // Generate fall of wickets
          const fallOfWickets = [
            { score: 42, over: 4.3, batsman: "Opener 1" },
            { score: 86, over: 9.2, batsman: "Opener 2" },
            { score: 120, over: 12.4, batsman: "No. 3" },
            { score: 145, over: 15.1, batsman: "No. 5" },
            { score: 160, over: 17.3, batsman: "No. 4" },
            { score: 175, over: 18.4, batsman: "No. 6" },
            { score: 180, over: 19.2, batsman: "No. 8" },
            { score: 185, over: 19.5, batsman: "No. 9" }
          ];

          return {
            batting,
            bowling,
            fallOfWickets
          };
        };

        const matchData: MatchData = {
          id: id,
          team1,
          team2,
          ground,
          date: new Date(),
          result: {
            isCompleted: true,
            winner: team1.id,
            team1Score: 185,
            team1Wickets: 6,
            team2Score: 172,
            team2Wickets: 8,
            innings1: {
              stats: generatePlayerStats(),
              overs: Array.from({ length: 20 }, (_, i) => ({
                overNumber: i + 1,
                runs: Math.floor(Math.random() * 12),
                wickets: Math.random() > 0.8 ? 1 : 0
              }))
            },
            innings2: {
              stats: generatePlayerStats(),
              overs: Array.from({ length: 20 }, (_, i) => ({
                overNumber: i + 1,
                runs: Math.floor(Math.random() * 12),
                wickets: Math.random() > 0.8 ? 1 : 0
              }))
            }
          }
        };

        setMatch(matchData);
        setLoading(false);
      } catch (error) {
        console.error('Error loading match data:', error);
        setLoading(false);
      }
    };

    loadMatchData();
  }, [params.matchId]);

  // Prepare data for run progression graph
  const getRunProgressionData = () => {
    if (!match?.result?.innings1?.overs || !match?.result?.innings2?.overs) {
      return {
        labels: [],
        datasets: []
      };
    }

    const labels = Array.from({ length: 20 }, (_, i) => `Over ${i + 1}`);
    
    let team1Runs = 0;
    const team1Data = match.result.innings1.overs.map(over => {
      team1Runs += over.runs;
      return team1Runs;
    });

    let team2Runs = 0;
    const team2Data = match.result.innings2.overs.map(over => {
      team2Runs += over.runs;
      return team2Runs;
    });

    return {
      labels,
      datasets: [
        {
          label: match.team1.name,
          data: team1Data,
          borderColor: match.team1.color,
          backgroundColor: `${match.team1.color}33`,
          fill: true,
          tension: 0.4
        },
        {
          label: match.team2.name,
          data: team2Data,
          borderColor: match.team2.color,
          backgroundColor: `${match.team2.color}33`,
          fill: true,
          tension: 0.4
        }
      ]
    };
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500" />
      </div>
    );
  }

  if (!match) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-700">Match not found</h2>
          <Link href="/schedule" className="text-blue-500 hover:underline mt-2 inline-block">
            Back to Schedule
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        {/* Back button */}
        <Link href="/schedule" className="inline-flex items-center text-blue-500 hover:text-blue-600 mb-6">
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Schedule
        </Link>

        {/* Match Header */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            {/* Team 1 */}
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 mr-4">
                <Image
                  src={match.team1.image}
                  alt={match.team1.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div className="text-center md:text-left">
                <h2 className="text-xl font-bold" style={{ color: match.team1.color }}>
                  {match.team1.name}
                </h2>
                <p className="text-2xl font-bold">
                  {match.result.team1Score}/{match.result.team1Wickets}
                </p>
              </div>
            </div>

            {/* Match Info */}
            <div className="flex flex-col items-center mb-4 md:mb-0">
              <div className="text-sm text-gray-500 mb-2">
                {match.date.toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="px-4 py-2 rounded-full bg-gray-100 text-gray-700 font-bold">
                VS
              </div>
              <div className="text-sm text-gray-500 mt-2">
                at {match.ground.name}
              </div>
            </div>

            {/* Team 2 */}
            <div className="flex items-center">
              <div className="text-center md:text-right order-1 md:order-2 mr-4 md:mr-0">
                <h2 className="text-xl font-bold" style={{ color: match.team2.color }}>
                  {match.team2.name}
                </h2>
                <p className="text-2xl font-bold">
                  {match.result.team2Score}/{match.result.team2Wickets}
                </p>
              </div>
              <div className="w-16 h-16 rounded-full overflow-hidden bg-gray-100 ml-4 order-2 md:order-1">
                <Image
                  src={match.team2.image}
                  alt={match.team2.name}
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t text-center">
            <p className="text-lg font-medium">
              {match.result.winner === match.team1.id
                ? `${match.team1.name} won by ${match.result.team1Score - match.result.team2Score} runs`
                : `${match.team2.name} won by ${match.result.team2Score - match.result.team1Score} runs`}
            </p>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white rounded-xl shadow-md mb-8">
          <div className="flex border-b">
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'summary'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('summary')}
            >
              Match Summary
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'scorecard'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('scorecard')}
            >
              Scorecard
            </button>
            <button
              className={`flex-1 py-4 text-center font-medium transition-colors ${
                activeTab === 'graph'
                  ? 'border-b-2 border-blue-500 text-blue-600'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
              onClick={() => setActiveTab('graph')}
            >
              Graphs
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="bg-white rounded-xl shadow-md p-6">
          {activeTab === 'summary' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Over by Over Summary */}
              <div>
                <h3 className="text-lg font-bold mb-4">Over by Over Summary</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">First Innings</h4>
                    <span className="text-sm text-gray-500">
                      {match.team1.short} - {match.result.team1Score}/{match.result.team1Wickets}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {match.result.innings1.overs.map((over, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-2 rounded text-center"
                      >
                        <div className="text-sm font-medium">Over {over.overNumber}</div>
                        <div className="text-lg font-bold">{over.runs}</div>
                        {over.wickets > 0 && (
                          <div className="text-xs text-red-500">{over.wickets}W</div>
                        )}
                      </div>
                    ))}
                  </div>

                  <div className="flex justify-between items-center mt-6">
                    <h4 className="font-medium">Second Innings</h4>
                    <span className="text-sm text-gray-500">
                      {match.team2.short} - {match.result.team2Score}/{match.result.team2Wickets}
                    </span>
                  </div>
                  <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
                    {match.result.innings2.overs.map((over, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 p-2 rounded text-center"
                      >
                        <div className="text-sm font-medium">Over {over.overNumber}</div>
                        <div className="text-lg font-bold">{over.runs}</div>
                        {over.wickets > 0 && (
                          <div className="text-xs text-red-500">{over.wickets}W</div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Key Moments */}
              <div>
                <h3 className="text-lg font-bold mb-4">Key Moments</h3>
                <div className="space-y-4">
                  {match.result.innings1.stats.fallOfWickets.map((wicket, index) => (
                    <div
                      key={index}
                      className="flex items-center p-3 bg-red-50 rounded-lg"
                    >
                      <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mr-4">
                        <Activity className="w-6 h-6 text-red-500" />
                      </div>
                      <div>
                        <p className="font-medium">Wicket - {wicket.batsman}</p>
                        <p className="text-sm text-gray-500">
                          Score: {wicket.score}/{index + 1} (Over {wicket.over})
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'scorecard' && (
            <div className="space-y-6">
              <div className="flex gap-4 mb-4">
                <Button
                  variant={selectedInnings === 1 ? "default" : "outline"}
                  onClick={() => setSelectedInnings(1)}
                >
                  {match.team1.name} Innings
                </Button>
                <Button
                  variant={selectedInnings === 2 ? "default" : "outline"}
                  onClick={() => setSelectedInnings(2)}
                >
                  {match.team2.name} Innings
                </Button>
              </div>

              <div className="space-y-8">
                {/* Batting Table */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Batting - {selectedInnings === 1 ? match.team1.name : match.team2.name}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Batter</th>
                          <th className="text-right py-2">R</th>
                          <th className="text-right py-2">B</th>
                          <th className="text-right py-2">4s</th>
                          <th className="text-right py-2">6s</th>
                          <th className="text-right py-2">SR</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedInnings === 1 
                          ? match.result.innings1.stats.batting 
                          : match.result.innings2.stats.batting
                        ).map((player, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 cursor-pointer text-blue-600" onClick={() => setSelectedPlayer(player)}>
                              {player.name}
                            </td>
                            <td className="text-right py-2">{player.runs}</td>
                            <td className="text-right py-2">{player.balls}</td>
                            <td className="text-right py-2">{player.fours}</td>
                            <td className="text-right py-2">{player.sixes}</td>
                            <td className="text-right py-2">{player.strikeRate?.toFixed(2)}</td>
                          </tr>
                        ))}
                        {/* Batting Summary Row */}
                        <tr className="border-t-2 font-semibold bg-gray-50">
                          <td className="py-2">Totals</td>
                          <td className="text-right py-2">
                            {selectedInnings === 1 ? match.result.team1Score : match.result.team2Score}
                          </td>
                          <td className="text-right py-2">
                            {(selectedInnings === 1 
                              ? match.result.innings1.stats.batting 
                              : match.result.innings2.stats.batting
                            ).reduce((sum, player) => sum + (player.balls || 0), 0)}
                          </td>
                          <td className="text-right py-2">
                            {(selectedInnings === 1 
                              ? match.result.innings1.stats.batting 
                              : match.result.innings2.stats.batting
                            ).reduce((sum, player) => sum + (player.fours || 0), 0)}
                          </td>
                          <td className="text-right py-2">
                            {(selectedInnings === 1 
                              ? match.result.innings1.stats.batting 
                              : match.result.innings2.stats.batting
                            ).reduce((sum, player) => sum + (player.sixes || 0), 0)}
                          </td>
                          <td className="text-right py-2">
                            {((selectedInnings === 1 ? match.result.team1Score : match.result.team2Score) / 
                              (selectedInnings === 1 
                                ? match.result.innings1.stats.batting 
                                : match.result.innings2.stats.batting
                              ).reduce((sum, player) => sum + (player.balls || 0), 0) * 100).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Bowling Table */}
                <div>
                  <h3 className="text-xl font-semibold mb-4">
                    Bowling - {selectedInnings === 1 ? match.team2.name : match.team1.name}
                  </h3>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left py-2">Bowler</th>
                          <th className="text-right py-2">O</th>
                          <th className="text-right py-2">M</th>
                          <th className="text-right py-2">R</th>
                          <th className="text-right py-2">W</th>
                          <th className="text-right py-2">Econ</th>
                        </tr>
                      </thead>
                      <tbody>
                        {(selectedInnings === 1 
                          ? match.result.innings1.stats.bowling 
                          : match.result.innings2.stats.bowling
                        ).map((player, idx) => (
                          <tr key={idx} className="border-b hover:bg-gray-50">
                            <td className="py-2 cursor-pointer text-blue-600" onClick={() => setSelectedPlayer(player)}>
                              {player.name}
                            </td>
                            <td className="text-right py-2">{player.overs}</td>
                            <td className="text-right py-2">{player.maidens}</td>
                            <td className="text-right py-2">{player.runs}</td>
                            <td className="text-right py-2">{player.wickets}</td>
                            <td className="text-right py-2">{player.economy?.toFixed(2)}</td>
                          </tr>
                        ))}
                        {/* Bowling Summary Row */}
                        <tr className="border-t-2 font-semibold bg-gray-50">
                          <td className="py-2">Totals</td>
                          <td className="text-right py-2">
                            {(selectedInnings === 1 
                              ? match.result.innings1.stats.bowling 
                              : match.result.innings2.stats.bowling
                            ).reduce((sum, player) => sum + (player.overs || 0), 0)}
                          </td>
                          <td className="text-right py-2">
                            {(selectedInnings === 1 
                              ? match.result.innings1.stats.bowling 
                              : match.result.innings2.stats.bowling
                            ).reduce((sum, player) => sum + (player.maidens || 0), 0)}
                          </td>
                          <td className="text-right py-2">
                            {selectedInnings === 1 ? match.result.team1Score : match.result.team2Score}
                          </td>
                          <td className="text-right py-2">
                            {(selectedInnings === 1 
                              ? match.result.innings1.stats.bowling 
                              : match.result.innings2.stats.bowling
                            ).reduce((sum, player) => sum + (player.wickets || 0), 0)}
                          </td>
                          <td className="text-right py-2">
                            {((selectedInnings === 1 ? match.result.team1Score : match.result.team2Score) / 
                              (selectedInnings === 1 
                                ? match.result.innings1.stats.bowling 
                                : match.result.innings2.stats.bowling
                              ).reduce((sum, player) => sum + (player.overs || 0), 0)).toFixed(2)}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'graph' && (
            <div className="space-y-6">
              {/* Run Progression Graph */}
              <div>
                <h3 className="text-lg font-bold mb-6">Run Progression</h3>
                <div className="h-[400px]">
                  <Line
                    data={getRunProgressionData()}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        },
                        title: {
                          display: false
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Runs'
                          }
                        },
                        x: {
                          title: {
                            display: true,
                            text: 'Overs'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>

              {/* Wickets Graph */}
              <div>
                <h3 className="text-lg font-bold mb-6">Fall of Wickets</h3>
                <div className="h-[400px]">
                  <Line
                    data={{
                      labels: match.result.innings1.stats.fallOfWickets.map(
                        w => `Over ${w.over}`
                      ),
                      datasets: [
                        {
                          label: match.team1.name,
                          data: match.result.innings1.stats.fallOfWickets.map(
                            w => w.score
                          ),
                          borderColor: match.team1.color,
                          backgroundColor: `${match.team1.color}33`,
                          fill: false,
                          stepped: true
                        },
                        {
                          label: match.team2.name,
                          data: match.result.innings2.stats.fallOfWickets.map(
                            w => w.score
                          ),
                          borderColor: match.team2.color,
                          backgroundColor: `${match.team2.color}33`,
                          fill: false,
                          stepped: true
                        }
                      ]
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: {
                        legend: {
                          position: 'top' as const,
                        }
                      },
                      scales: {
                        y: {
                          beginAtZero: true,
                          title: {
                            display: true,
                            text: 'Score at Fall of Wicket'
                          }
                        }
                      }
                    }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Player Stats Modal */}
        {selectedPlayer && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full p-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                  <User className="w-8 h-8 text-gray-400" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selectedPlayer.name}</h3>
                  <p className="text-gray-500">Team: {match.team1.name}</p>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h4 className="font-semibold mb-2">Recent Form</h4>
                  <div className="grid grid-cols-5 gap-2">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div key={i} className="bg-gray-50 p-3 rounded text-center">
                        <div className="text-lg font-bold">{20 + Math.floor(Math.random() * 40)}</div>
                        <div className="text-xs text-gray-500">vs {TEAMS[i].short}</div>
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Tournament Stats</h4>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-blue-50 p-4 rounded">
                      <div className="text-2xl font-bold text-blue-600">438</div>
                      <div className="text-sm text-gray-600">Total Runs</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded">
                      <div className="text-2xl font-bold text-green-600">148.5</div>
                      <div className="text-sm text-gray-600">Strike Rate</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded">
                      <div className="text-2xl font-bold text-purple-600">18</div>
                      <div className="text-sm text-gray-600">Sixes</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded">
                      <div className="text-2xl font-bold text-orange-600">42</div>
                      <div className="text-sm text-gray-600">Fours</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Performance Graph</h4>
                  <div className="h-64">
                    <Line
                      data={{
                        labels: ['Match 1', 'Match 2', 'Match 3', 'Match 4', 'Match 5'],
                        datasets: [{
                          label: 'Runs Scored',
                          data: [45, 62, 38, 74, 52],
                          borderColor: '#4F46E5',
                          backgroundColor: '#4F46E533',
                          fill: true,
                          tension: 0.4
                        }]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                          legend: {
                            display: false
                          }
                        },
                        scales: {
                          y: {
                            beginAtZero: true
                          }
                        }
                      }}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <Button onClick={() => setSelectedPlayer(null)}>Close</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
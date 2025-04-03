"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { 
  BarChart3, 
  Trophy, 
  FileBarChart, 
  Flame, 
  PieChart, 
  Users, 
  CircleAlert,
  PlayCircle,
  Clock,
  Gauge,
  Target,
  Lightbulb,
  Milestone,
  Radar,
  Minimize2,
  Thermometer,
  Shield
} from "lucide-react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

// Types and interfaces
interface Team {
  id: string;
  name: string;
  shortName: string;
  logo: string;
  players: Player[];
}

interface Player {
  id: number;
  name: string;
  role: string;
  battingStyle?: string;
  bowlingStyle?: string;
  battingPosition?: number;
  isActive?: boolean;
  isBatting?: boolean;
  isBowling?: boolean;
  battingStats?: BattingStats;
  bowlingStats?: BowlingStats;
}

interface BattingStats {
  runs: number;
  balls: number;
  fours: number;
  sixes: number;
  strikeRate: number;
}

interface BowlingStats {
  overs: number;
  maidens: number;
  runs: number;
  wickets: number;
  economy: number;
}

interface MatchData {
  id: string;
  teams: {
    team1: Team;
    team2: Team;
  };
  venue: {
    name: string;
    city: string;
    country: string;
    pitchType: string;
    avgFirstInningsScore: number;
    chaseSuccessRate: number;
  };
  toss: {
    winner: string;
    decision: "bat" | "field";
  };
  currentInnings: number;
  battingTeam: string;
  bowlingTeam: string;
  score: {
    runs: number;
    wickets: number;
    overs: number;
    runRate: number;
    requiredRunRate?: number;
    projectedScore?: number;
    target?: number;
  };
  recentOvers: RecentOver[];
  matchStatus: "upcoming" | "live" | "completed";
  matchType: "t20" | "odi" | "test";
  date: string;
  result?: string;
}

interface RecentOver {
  overNumber: number;
  balls: string[];
  runs: number;
  wickets: number;
}

interface Strategy {
  id: number;
  title: string;
  description: string;
  riskLevel: "low" | "medium" | "high";
  impact: number; // 1-10
  icon: React.ReactNode;
}

interface Prediction {
  winProbability: {
    team1: number;
    team2: number;
  };
  projectedScore: number;
  keyMoments: string[];
  recommendedStrategy: Strategy;
}

// Mock data - would be replaced with API calls in a real app
const teams: Record<string, Team> = {
  CSK: {
    id: "CSK",
    name: "Chennai Super Kings",
    shortName: "CSK",
    logo: "/dhoni.jpg", // Using the requested image
    players: [
      { id: 1, name: "MS Dhoni", role: "Wicket-keeper" },
      { id: 2, name: "Ruturaj Gaikwad", role: "Batsman" },
      { id: 3, name: "Ravindra Jadeja", role: "All-rounder" },
      { id: 4, name: "Deepak Chahar", role: "Bowler" },
      { id: 5, name: "Moeen Ali", role: "All-rounder" },
      { id: 6, name: "Ambati Rayudu", role: "Batsman" },
      { id: 7, name: "Dwayne Bravo", role: "All-rounder" },
      { id: 8, name: "Shivam Dube", role: "All-rounder" },
      { id: 9, name: "Mitchell Santner", role: "All-rounder" },
      { id: 10, name: "Shardul Thakur", role: "Bowler" },
      { id: 11, name: "Tushar Deshpande", role: "Bowler" }
    ]
  },
  MI: {
    id: "MI",
    name: "Mumbai Indians",
    shortName: "MI",
    logo: "/dhoni.jpg", // Using the requested image
    players: [
      { id: 12, name: "Rohit Sharma", role: "Batsman" },
      { id: 13, name: "Ishan Kishan", role: "Wicket-keeper" },
      { id: 14, name: "Suryakumar Yadav", role: "Batsman" },
      { id: 15, name: "Jasprit Bumrah", role: "Bowler" },
      { id: 16, name: "Kieron Pollard", role: "All-rounder" },
      { id: 17, name: "Hardik Pandya", role: "All-rounder" },
      { id: 18, name: "Krunal Pandya", role: "All-rounder" },
      { id: 19, name: "Trent Boult", role: "Bowler" },
      { id: 20, name: "Rahul Chahar", role: "Bowler" },
      { id: 21, name: "Quinton de Kock", role: "Wicket-keeper" },
      { id: 22, name: "Saurabh Tiwary", role: "Batsman" }
    ]
  }
};

// Initially empty match data to be filled in
const defaultMatchData: MatchData = {
  id: "1",
  teams: {
    team1: teams.CSK,
    team2: teams.MI
  },
  venue: {
    name: "M.A. Chidambaram Stadium",
    city: "Chennai",
    country: "India",
    pitchType: "Dry, favors spin",
    avgFirstInningsScore: 167,
    chaseSuccessRate: 42
  },
  toss: {
    winner: "CSK",
    decision: "bat"
  },
  currentInnings: 1,
  battingTeam: "CSK",
  bowlingTeam: "MI",
  score: {
    runs: 0,
    wickets: 0,
    overs: 0,
    runRate: 0,
    projectedScore: 0
  },
  recentOvers: [],
  matchStatus: "upcoming",
  matchType: "t20",
  date: new Date().toISOString()
};

// Sample strategies based on different game scenarios
const strategyBank: Strategy[] = [
  {
    id: 1,
    title: "Target Middle Overs",
    description: "Focus on rotating strike in middle overs (7-15) to maintain momentum without losing wickets",
    riskLevel: "low",
    impact: 7,
    icon: <Target className="h-5 w-5 text-orange-500" />
  },
  {
    id: 2,
    title: "Pace Attack",
    description: "Attack pace bowlers in the powerplay to capitalize on fielding restrictions",
    riskLevel: "medium",
    impact: 8,
    icon: <Flame className="h-5 w-5 text-red-500" />
  },
  {
    id: 3,
    title: "Spin Caution",
    description: "Take a cautious approach against spinners on this pitch, focus on singles and twos",
    riskLevel: "low",
    impact: 6,
    icon: <Minimize2 className="h-5 w-5 text-blue-500" />
  },
  {
    id: 4,
    title: "Death Overs Assault",
    description: "Target specific bowlers in death overs (16-20) for maximum runs",
    riskLevel: "high",
    impact: 9,
    icon: <Milestone className="h-5 w-5 text-purple-500" />
  },
  {
    id: 5,
    title: "Wicket Preservation",
    description: "Focus on preserving wickets for the final 5 overs to launch an assault",
    riskLevel: "medium",
    impact: 7,
    icon: <Shield className="h-5 w-5 text-green-500" />
  },
  {
    id: 6,
    title: "NRR Boost",
    description: "Push for quick runs to improve net run rate even if target is achievable at lower rate",
    riskLevel: "high",
    impact: 6,
    icon: <Gauge className="h-5 w-5 text-yellow-500" />
  }
];

// Function to generate live suggestions based on match state
const generateLiveSuggestions = (match: MatchData) => {
  // Get current match state
  const { score, currentInnings, battingTeam, bowlingTeam } = match;
  const { runs, wickets, overs, requiredRunRate, target } = score;
  const currentOver = Math.floor(overs);
  const ballsInOver = Math.round((overs - currentOver) * 10);
  
  const suggestions = [];
  
  // First innings strategies
  if (currentInnings === 1) {
    // Powerplay (1-6 overs)
    if (currentOver < 6) {
      suggestions.push({
        title: "Powerplay acceleration",
        description: `Capitalize on field restrictions. Aim for ${Math.round(45 + Math.random() * 10)}-${Math.round(55 + Math.random() * 10)} runs in powerplay.`,
        priority: "high",
        icon: <Flame className="h-5 w-5 text-red-500" />
      });
    }
    
    // Middle overs (7-15)
    if (currentOver >= 6 && currentOver < 15) {
      if (wickets <= 2) {
        suggestions.push({
          title: "Build platform",
          description: "Solid foundation established. Can take calculated risks against weaker bowlers.",
          priority: "medium",
          icon: <Target className="h-5 w-5 text-orange-500" />
        });
      } else if (wickets >= 3 && wickets <= 5) {
        suggestions.push({
          title: "Consolidate",
          description: "Rebuild innings with singles and twos. Avoid further wicket loss.",
          priority: "high",
          icon: <Shield className="h-5 w-5 text-green-500" />
        });
      } else {
        suggestions.push({
          title: "Maximize remaining batters",
          description: "Lower order should aim for 7-8 runs per over without taking excessive risks.",
          priority: "medium",
          icon: <Gauge className="h-5 w-5 text-yellow-500" />
        });
      }
    }
    
    // Death overs (16-20)
    if (currentOver >= 15) {
      if (wickets <= 4) {
        suggestions.push({
          title: "Launch assault",
          description: "Attack all bowlers. Target boundaries every over. Aim for 12+ runs per over.",
          priority: "high",
          icon: <Milestone className="h-5 w-5 text-purple-500" />
        });
      } else {
        suggestions.push({
          title: "Calculated risks",
          description: "Get to a defendable total. Every 10 runs matters. Prioritize batting all 20 overs.",
          priority: "medium",
          icon: <Target className="h-5 w-5 text-blue-500" />
        });
      }
    }
  }
  
  // Second innings strategies (chasing)
  if (currentInnings === 2 && target) {
    const remainingRuns = target - runs;
    const remainingBalls = (20 - overs) * 6;
    const requiredRate = remainingRuns / (remainingBalls / 6);
    
    if (remainingRuns <= 0) {
      suggestions.push({
        title: "Target achieved!",
        description: "Match won. Focus on net run rate improvement if possible.",
        priority: "low",
        icon: <Trophy className="h-5 w-5 text-yellow-500" />
      });
      return suggestions;
    }
    
    // Early chase (1-6 overs)
    if (currentOver < 6) {
      suggestions.push({
        title: "Set chase foundation",
        description: `Aim for ${Math.round(target * 0.3)} runs in powerplay. Keep wickets in hand.`,
        priority: "high",
        icon: <Target className="h-5 w-5 text-orange-500" />
      });
    }
    
    // Middle chase (7-15)
    if (currentOver >= 6 && currentOver < 15) {
      if (requiredRate <= 8) {
        suggestions.push({
          title: "On track",
          description: `Required rate manageable at ${requiredRate.toFixed(1)}. Keep wickets for final assault.`,
          priority: "medium",
          icon: <Target className="h-5 w-5 text-green-500" />
        });
      } else if (requiredRate > 8 && requiredRate <= 12) {
        suggestions.push({
          title: "Increase tempo",
          description: `Required rate climbing to ${requiredRate.toFixed(1)}. Need one big over.`,
          priority: "high",
          icon: <Flame className="h-5 w-5 text-orange-500" />
        });
      } else {
        suggestions.push({
          title: "Take risks now",
          description: `Required rate very high at ${requiredRate.toFixed(1)}. Must attack to stay in game.`,
          priority: "high",
          icon: <Milestone className="h-5 w-5 text-red-500" />
        });
      }
    }
    
    // Final chase (16-20)
    if (currentOver >= 15) {
      if (requiredRate <= 10) {
        suggestions.push({
          title: "Execute finish",
          description: `Need ${remainingRuns} runs from ${remainingBalls} balls. Match is winnable.`,
          priority: "high",
          icon: <Target className="h-5 w-5 text-green-500" />
        });
      } else if (requiredRate > 10 && requiredRate <= 15) {
        suggestions.push({
          title: "Target boundary bowlers",
          description: `Need ${remainingRuns} runs from ${remainingBalls} balls. Target weaker bowlers.`,
          priority: "high",
          icon: <Flame className="h-5 w-5 text-red-500" />
        });
      } else {
        suggestions.push({
          title: "Go for broke",
          description: `Need ${remainingRuns} runs from ${remainingBalls} balls. Maximum risk required.`,
          priority: "high",
          icon: <Milestone className="h-5 w-5 text-purple-500" />
        });
      }
      
      // NRR implications
      if (requiredRate > 15) {
        suggestions.push({
          title: "NRR considerations",
          description: "Even if win unlikely, minimize net run rate damage by scoring as many as possible.",
          priority: "medium",
          icon: <BarChart3 className="h-5 w-5 text-blue-500" />
        });
      }
    }
  }
  
  // Add specific player-based suggestions
  if (battingTeam === "CSK" && !suggestions.find(s => s.title.includes("Dhoni"))) {
    suggestions.push({
      title: "Dhoni strategy",
      description: "Hold MS Dhoni for death overs regardless of wickets fallen. Maximum impact in final 4 overs.",
      priority: "medium",
      icon: <Users className="h-5 w-5 text-blue-500" />
    });
  }
  
  // Return top 3 most relevant suggestions
  return suggestions.slice(0, 3);
};

// Function to generate ML-based prediction
const generatePrediction = (match: MatchData): Prediction => {
  const { score, currentInnings, battingTeam, bowlingTeam } = match;
  const { runs, wickets, overs, target } = score;
  
  // Base win probability calculation
  let team1WinProb = 50;
  let team2WinProb = 50;
  
  // First innings: projections based on current run rate and wickets
  if (currentInnings === 1) {
    const currentRunRate = overs > 0 ? runs / overs : 0;
    const projectedScore = Math.round(currentRunRate * 20);
    
    // Adjust for wickets lost - each wicket reduces projected score
    const wicketImpact = wickets * 5;
    const adjustedProjection = Math.max(100, projectedScore - wicketImpact);
    
    // Base win probability on historical first innings scores at venue
    const avgScore = match.venue.avgFirstInningsScore;
    if (adjustedProjection > avgScore + 20) {
      team1WinProb = 65;
      team2WinProb = 35;
    } else if (adjustedProjection < avgScore - 20) {
      team1WinProb = 35;
      team2WinProb = 65;
    }
    
    // Choose a relevant strategy
    const currentOver = Math.floor(overs);
    let recommendedStrategy: Strategy;
    
    if (currentOver < 6) {
      recommendedStrategy = strategyBank[1]; // Pace Attack
    } else if (currentOver >= 6 && currentOver < 15) {
      recommendedStrategy = wickets <= 2 ? strategyBank[0] : strategyBank[4]; // Target Middle Overs or Wicket Preservation
    } else {
      recommendedStrategy = strategyBank[3]; // Death Overs Assault
    }
    
    return {
      winProbability: {
        team1: battingTeam === match.teams.team1.id ? team1WinProb : team2WinProb,
        team2: battingTeam === match.teams.team1.id ? team2WinProb : team1WinProb
      },
      projectedScore: adjustedProjection,
      keyMoments: [
        "Powerplay (1-6 overs) - Set foundation",
        "Middle overs (7-15) - Build momentum",
        "Death overs (16-20) - Maximum acceleration"
      ],
      recommendedStrategy
    };
  }
  
  // Second innings: calculations based on chase situation
  if (currentInnings === 2 && target) {
    const remainingRuns = target - runs;
    const remainingBalls = (20 - overs) * 6;
    const requiredRate = remainingBalls > 0 ? (remainingRuns / (remainingBalls / 6)) : 99;
    
    if (remainingRuns <= 0) {
      return {
        winProbability: {
          team1: battingTeam === match.teams.team1.id ? 100 : 0,
          team2: battingTeam === match.teams.team1.id ? 0 : 100
        },
        projectedScore: runs,
        keyMoments: ["Chase completed successfully"],
        recommendedStrategy: strategyBank[5] // NRR Boost
      };
    }
    
    // Calculate win probability based on required rate and wickets
    let chaseWinProb = 50;
    
    if (requiredRate <= 7) {
      chaseWinProb = Math.max(30, 90 - (wickets * 8));
    } else if (requiredRate <= 10) {
      chaseWinProb = Math.max(20, 75 - (wickets * 8));
    } else if (requiredRate <= 12) {
      chaseWinProb = Math.max(10, 60 - (wickets * 8));
    } else if (requiredRate <= 15) {
      chaseWinProb = Math.max(5, 30 - (wickets * 5));
    } else {
      chaseWinProb = Math.max(1, 15 - (wickets * 2));
    }
    
    // Choose a relevant strategy
    const currentOver = Math.floor(overs);
    let recommendedStrategy: Strategy;
    
    if (requiredRate > 10) {
      recommendedStrategy = strategyBank[3]; // Death Overs Assault
    } else if (wickets >= 5) {
      recommendedStrategy = strategyBank[4]; // Wicket Preservation
    } else if (currentOver >= 15) {
      recommendedStrategy = strategyBank[3]; // Death Overs Assault
    } else {
      recommendedStrategy = strategyBank[0]; // Target Middle Overs
    }
    
    return {
      winProbability: {
        team1: battingTeam === match.teams.team1.id ? chaseWinProb : (100 - chaseWinProb),
        team2: battingTeam === match.teams.team1.id ? (100 - chaseWinProb) : chaseWinProb
      },
      projectedScore: runs + Math.min(remainingRuns, Math.round(remainingBalls * (requiredRate / 6))),
      keyMoments: [
        `Current RRR: ${requiredRate.toFixed(2)}`,
        `Needs ${remainingRuns} runs from ${remainingBalls} balls`,
        wickets <= 3 ? "Good batting depth available" : "Limited batting resources remaining"
      ],
      recommendedStrategy
    };
  }
  
  // Default prediction if no specific case applies
  return {
    winProbability: {
      team1: 50,
      team2: 50
    },
    projectedScore: match.venue.avgFirstInningsScore,
    keyMoments: ["Match not yet started"],
    recommendedStrategy: strategyBank[0] // Default strategy
  };
};

// Main match analysis dashboard component
export default function MatchAnalysisPage() {
  // State management
  const [matchData, setMatchData] = useState<MatchData>(defaultMatchData);
  const [loading, setLoading] = useState<boolean>(false);
  const [predictions, setPredictions] = useState<Prediction | null>(null);
  const [activeTab, setActiveTab] = useState<string>("overview");
  const [isInputMode, setIsInputMode] = useState<boolean>(false);
  const [manualScoreInput, setManualScoreInput] = useState({
    runs: 0,
    wickets: 0,
    overs: 0,
    balls: 0
  });
  const [ballHistory, setBallHistory] = useState<string[]>([]);
  
  // Generate predictions whenever match data changes
  useEffect(() => {
    const prediction = generatePrediction(matchData);
    setPredictions(prediction);
  }, [matchData]);
  
  // Function to add ball to history
  const addBall = (ballType: string) => {
    // Determine runs and wicket status
    let runs = 0;
    let isWicket = false;
    
    switch (ballType) {
      case "0":
        runs = 0;
        break;
      case "1":
        runs = 1;
        break;
      case "2":
        runs = 2;
        break;
      case "3":
        runs = 3;
        break;
      case "4":
        runs = 4;
        break;
      case "6":
        runs = 6;
        break;
      case "W":
        isWicket = true;
        break;
      case "WD":
        runs = 1; // Wide
        break;
      case "NB":
        runs = 1; // No ball
        break;
      case "LB":
        runs = 1; // Leg bye
        break;
      case "B":
        runs = 1; // Bye
        break;
    }
    
    // Update ball history
    setBallHistory([...ballHistory, ballType]);
    
    // Update match data
    updateMatchData(runs, isWicket);
  };
  
  // Function to update match data based on ball outcome
  const updateMatchData = (runs: number, isWicket: boolean) => {
    setMatchData(prev => {
      // Calculate new overs and balls
      const currentOverInt = Math.floor(prev.score.overs);
      const currentBallsInOver = Math.round((prev.score.overs - currentOverInt) * 10);
      const newBallsInOver = (currentBallsInOver + 1) % 6;
      const newOvers = newBallsInOver === 0 
        ? currentOverInt + 1 
        : currentOverInt + (newBallsInOver / 10);
      
      // Update recent overs
      let updatedRecentOvers = [...prev.recentOvers];
      if (newBallsInOver === 1 || prev.recentOvers.length === 0) {
        // Start a new over
        updatedRecentOvers.push({
          overNumber: currentOverInt + 1,
          balls: [],
          runs: 0,
          wickets: 0
        });
      }
      
      // Add ball to current over
      if (updatedRecentOvers.length > 0) {
        const currentOverIndex = updatedRecentOvers.length - 1;
        updatedRecentOvers[currentOverIndex].balls.push(isWicket ? "W" : runs.toString());
        updatedRecentOvers[currentOverIndex].runs += runs;
        if (isWicket) updatedRecentOvers[currentOverIndex].wickets += 1;
      }
      
      // Keep only the last 5 overs
      if (updatedRecentOvers.length > 5) {
        updatedRecentOvers = updatedRecentOvers.slice(-5);
      }
      
      // Update score and match status
      const newRuns = prev.score.runs + runs;
      const newWickets = prev.score.wickets + (isWicket ? 1 : 0);
      const newRunRate = newOvers > 0 ? newRuns / newOvers : 0;
      
      // Calculate required run rate for second innings
      let requiredRunRate = undefined;
      if (prev.currentInnings === 2 && prev.score.target) {
        const remainingRuns = prev.score.target - newRuns;
        const remainingOvers = 20 - newOvers;
        requiredRunRate = remainingOvers > 0 ? remainingRuns / remainingOvers : 99.99;
      }
      
      // Calculate projected score for first innings
      let projectedScore = undefined;
      if (prev.currentInnings === 1) {
        projectedScore = Math.round(newRunRate * 20);
        // Adjust for wickets lost
        const wicketImpact = newWickets * 5;
        projectedScore = Math.max(100, projectedScore - wicketImpact);
      }
      
      return {
        ...prev,
        matchStatus: "live",
        score: {
          ...prev.score,
          runs: newRuns,
          wickets: newWickets,
          overs: newOvers,
          runRate: parseFloat(newRunRate.toFixed(2)),
          requiredRunRate,
          projectedScore
        },
        recentOvers: updatedRecentOvers
      };
    });
  };
  
  // Handle manual score input
  const handleManualScoreSubmit = () => {
    const { runs, wickets, overs, balls } = manualScoreInput;
    const totalOvers = overs + (balls / 10);
    
    setMatchData(prev => {
      const newRunRate = totalOvers > 0 ? runs / totalOvers : 0;
      
      // Calculate required run rate for second innings
      let requiredRunRate = undefined;
      if (prev.currentInnings === 2 && prev.score.target) {
        const remainingRuns = prev.score.target - runs;
        const remainingOvers = 20 - totalOvers;
        requiredRunRate = remainingOvers > 0 ? remainingRuns / remainingOvers : 99.99;
      }
      
      // Calculate projected score for first innings
      let projectedScore = undefined;
      if (prev.currentInnings === 1) {
        projectedScore = Math.round(newRunRate * 20);
        // Adjust for wickets lost
        const wicketImpact = wickets * 5;
        projectedScore = Math.max(100, projectedScore - wicketImpact);
      }
      
      return {
        ...prev,
        matchStatus: totalOvers > 0 ? "live" : "upcoming",
        score: {
          ...prev.score,
          runs,
          wickets,
          overs: totalOvers,
          runRate: parseFloat(newRunRate.toFixed(2)),
          requiredRunRate,
          projectedScore
        }
      };
    });
    
    setIsInputMode(false);
  };
  
  // Set up second innings
  const setupSecondInnings = (target: number) => {
    setMatchData(prev => ({
      ...prev,
      currentInnings: 2,
      battingTeam: prev.bowlingTeam,
      bowlingTeam: prev.battingTeam,
      score: {
        runs: 0,
        wickets: 0,
        overs: 0,
        runRate: 0,
        requiredRunRate: target / 20,
        target
      },
      recentOvers: []
    }));
    
    setBallHistory([]);
  };
  
  // Reset match
  const resetMatch = () => {
    setMatchData(defaultMatchData);
    setBallHistory([]);
  };
  
  // Toggle match status
  const toggleMatchStatus = () => {
    setMatchData(prev => ({
      ...prev,
      matchStatus: prev.matchStatus === "upcoming" ? "live" : (prev.matchStatus === "live" ? "completed" : "upcoming")
    }));
  };
  
  // Match suggestions based on current match state
  const matchSuggestions = generateLiveSuggestions(matchData);
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-2">Match Analysis Dashboard</h1>
        <p className="text-gray-500 mb-8">Real-time cricket match analysis with ML-powered strategy suggestions</p>
        
        {/* Match Header */}
        <Card className="mb-6 overflow-hidden">
          <div className="bg-gradient-to-r from-indigo-600 to-blue-500 text-white p-4">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-4 mb-4 md:mb-0">
                <div className="flex flex-col items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-white p-1">
                    <Image 
                      src={teams[matchData.teams.team1.id].logo}
                      alt={matchData.teams.team1.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold mt-1">{matchData.teams.team1.shortName}</span>
                </div>
                
                <div className="text-xl font-bold">VS</div>
                
                <div className="flex flex-col items-center">
                  <div className="relative h-16 w-16 rounded-full overflow-hidden bg-white p-1">
                    <Image 
                      src={teams[matchData.teams.team2.id].logo}
                      alt={matchData.teams.team2.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <span className="font-bold mt-1">{matchData.teams.team2.shortName}</span>
                </div>
              </div>
              
              <div className="text-center md:text-right">
                <h2 className="text-xl font-bold">{matchData.venue.name}</h2>
                <p className="text-sm opacity-80">{matchData.venue.city}, {matchData.venue.country}</p>
                <Badge className="mt-2 bg-white text-blue-700">
                  {matchData.matchType.toUpperCase()} MATCH
                </Badge>
              </div>
            </div>
          </div>
          
          {/* Live Score Display */}
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row justify-between">
              <div>
                <div className="flex items-center space-x-3">
                  <Badge className={`
                    ${matchData.matchStatus === 'upcoming' ? 'bg-yellow-100 text-yellow-800' : ''}
                    ${matchData.matchStatus === 'live' ? 'bg-green-100 text-green-800' : ''}
                    ${matchData.matchStatus === 'completed' ? 'bg-gray-100 text-gray-800' : ''}
                  `}>
                    {matchData.matchStatus.toUpperCase()}
                  </Badge>
                  <span className="text-gray-500">
                    {new Date(matchData.date).toLocaleDateString()}
                  </span>
                </div>
                
                <div className="mt-2">
                  <span className="text-gray-600">
                    Current Innings: {matchData.currentInnings} 
                    ({matchData.currentInnings === 1 ? '1st Innings' : 'Chase'})
                  </span>
                  <div className="flex items-center mt-1">
                    <span className="font-medium">{teams[matchData.battingTeam].shortName}</span>
                    <span className="mx-2 text-gray-400">batting</span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      vs {teams[matchData.bowlingTeam].shortName}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="mt-4 md:mt-0">
                <div className="text-3xl font-bold text-gray-800">
                  {matchData.score.runs}/{matchData.score.wickets}
                </div>
                <div className="text-gray-500">
                  {Math.floor(matchData.score.overs)}.{((matchData.score.overs % 1) * 10).toFixed(0)} Overs
                </div>
                <div className="flex space-x-4 mt-1 text-sm">
                  <div>
                    <span className="text-gray-500">RR: </span>
                    <span className="font-medium">{matchData.score.runRate}</span>
                  </div>
                  
                  {matchData.currentInnings === 2 && matchData.score.requiredRunRate !== undefined && (
                    <div>
                      <span className="text-gray-500">Req RR: </span>
                      <span className="font-medium">{matchData.score.requiredRunRate.toFixed(2)}</span>
                    </div>
                  )}
                  
                  {matchData.currentInnings === 1 && matchData.score.projectedScore !== undefined && (
                    <div>
                      <span className="text-gray-500">Proj: </span>
                      <span className="font-medium">{matchData.score.projectedScore}</span>
                    </div>
                  )}
                  
                  {matchData.currentInnings === 2 && matchData.score.target !== undefined && (
                    <div>
                      <span className="text-gray-500">Target: </span>
                      <span className="font-medium">{matchData.score.target}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Recent overs */}
            {matchData.recentOvers.length > 0 && (
              <div className="mt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Recent Overs</h3>
                <div className="flex flex-wrap gap-2">
                  {matchData.recentOvers.map((over, index) => (
                    <div key={index} className="border rounded-md p-2 text-sm">
                      <div className="font-medium text-xs text-gray-500 mb-1">Over {over.overNumber}</div>
                      <div className="flex space-x-1">
                        {over.balls.map((ball, ballIndex) => (
                          <span 
                            key={ballIndex}
                            className={`
                              inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium
                              ${ball === 'W' ? 'bg-red-100 text-red-800' : ''}
                              ${ball === '4' ? 'bg-green-100 text-green-800' : ''}
                              ${ball === '6' ? 'bg-blue-100 text-blue-800' : ''}
                              ${!['W', '4', '6'].includes(ball) ? 'bg-gray-100 text-gray-800' : ''}
                            `}
                          >
                            {ball}
                          </span>
                        ))}
                      </div>
                      <div className="text-xs mt-1 text-right font-medium">
                        {over.runs} run{over.runs !== 1 ? 's' : ''}{over.wickets > 0 ? `, ${over.wickets} wkt${over.wickets !== 1 ? 's' : ''}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Admin Controls */}
            <div className="mt-6 flex flex-wrap gap-2">
              <Button 
                onClick={() => setIsInputMode(!isInputMode)}
                variant="outline"
                size="sm"
              >
                {isInputMode ? "Cancel" : "Update Score"}
              </Button>
              
              {matchData.currentInnings === 1 && matchData.score.overs > 0 && (
                <Button
                  onClick={() => setupSecondInnings(matchData.score.runs)}
                  variant="outline"
                  size="sm"
                >
                  Start Second Innings
                </Button>
              )}
              
              <Button
                onClick={toggleMatchStatus}
                variant="outline"
                size="sm"
              >
                Toggle Match Status
              </Button>
              
              <Button
                onClick={resetMatch}
                variant="outline"
                size="sm"
                className="text-red-500 border-red-300 hover:bg-red-50"
              >
                Reset Match
              </Button>
            </div>
            
            {/* Manual Score Input */}
            {isInputMode && (
              <div className="mt-4 p-4 border rounded-md bg-gray-50">
                <h3 className="font-medium mb-3">Manual Score Update</h3>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Runs</label>
                    <input
                      type="number"
                      min="0"
                      value={manualScoreInput.runs}
                      onChange={(e) => setManualScoreInput({...manualScoreInput, runs: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Wickets</label>
                    <input
                      type="number"
                      min="0"
                      max="10"
                      value={manualScoreInput.wickets}
                      onChange={(e) => setManualScoreInput({...manualScoreInput, wickets: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Overs</label>
                    <input
                      type="number"
                      min="0"
                      max="19"
                      value={manualScoreInput.overs}
                      onChange={(e) => setManualScoreInput({...manualScoreInput, overs: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-500 mb-1">Balls</label>
                    <input
                      type="number"
                      min="0"
                      max="5"
                      value={manualScoreInput.balls}
                      onChange={(e) => setManualScoreInput({...manualScoreInput, balls: parseInt(e.target.value) || 0})}
                      className="w-full p-2 border rounded-md"
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <Button onClick={handleManualScoreSubmit}>
                    Update Score
                  </Button>
                </div>
              </div>
            )}
            
            {/* Ball-by-ball input */}
            {!isInputMode && (
              <div className="mt-6">
                <h3 className="font-medium mb-3">Ball-by-Ball Input</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-2">
                  {["0", "1", "2", "3", "4", "6", "W", "WD", "NB", "LB"].map((ballType) => (
                    <Button
                      key={ballType}
                      variant="outline"
                      size="sm"
                      onClick={() => addBall(ballType)}
                      className={`
                        ${ballType === "4" ? "text-green-600 border-green-300 hover:bg-green-50" : ""}
                        ${ballType === "6" ? "text-blue-600 border-blue-300 hover:bg-blue-50" : ""}
                        ${ballType === "W" ? "text-red-600 border-red-300 hover:bg-red-50" : ""}
                      `}
                    >
                      {ballType}
                    </Button>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
        
        {/* Main Dashboard Content */}
        <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full mb-8">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="strategy">Strategy Analysis</TabsTrigger>
            <TabsTrigger value="predictions">ML Predictions</TabsTrigger>
            <TabsTrigger value="scorecard">Scorecard</TabsTrigger>
          </TabsList>
          
          <TabsContent value="overview" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Match Stats */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Match Overview</CardTitle>
                  <CardDescription>
                    Current match situation and key metrics
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="border rounded-md p-4">
                      <h3 className="text-sm text-gray-500 mb-1">Run Rate</h3>
                      <div className="text-2xl font-bold">{matchData.score.runRate.toFixed(2)}</div>
                      <Progress 
                        value={matchData.score.runRate * 10} 
                        className="h-1 mt-2" 
                      />
                    </div>
                    
                    {matchData.currentInnings === 2 && matchData.score.requiredRunRate !== undefined && (
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm text-gray-500 mb-1">Required RR</h3>
                        <div className="text-2xl font-bold">{matchData.score.requiredRunRate.toFixed(2)}</div>
                        <Progress 
                          value={Math.min(100, matchData.score.requiredRunRate * 8)} 
                          className="h-1 mt-2" 
                        />
                      </div>
                    )}
                    
                    {matchData.currentInnings === 1 && (
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm text-gray-500 mb-1">Projected Score</h3>
                        <div className="text-2xl font-bold">{matchData.score.projectedScore || "-"}</div>
                        <div className="text-xs text-gray-500 mt-1">
                          Avg 1st innings: {matchData.venue.avgFirstInningsScore}
                        </div>
                      </div>
                    )}
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-sm text-gray-500 mb-1">Wickets Left</h3>
                      <div className="text-2xl font-bold">{10 - matchData.score.wickets}</div>
                      <Progress 
                        value={(10 - matchData.score.wickets) * 10} 
                        className="h-1 mt-2" 
                      />
                    </div>
                    
                    <div className="border rounded-md p-4">
                      <h3 className="text-sm text-gray-500 mb-1">Overs Completed</h3>
                      <div className="text-2xl font-bold">
                        {Math.floor(matchData.score.overs)}.{((matchData.score.overs % 1) * 10).toFixed(0)}
                      </div>
                      <Progress 
                        value={(matchData.score.overs / 20) * 100} 
                        className="h-1 mt-2" 
                      />
                    </div>
                    
                    {matchData.currentInnings === 2 && matchData.score.target && (
                      <div className="border rounded-md p-4">
                        <h3 className="text-sm text-gray-500 mb-1">Runs Needed</h3>
                        <div className="text-2xl font-bold">
                          {matchData.score.target - matchData.score.runs > 0 
                            ? matchData.score.target - matchData.score.runs 
                            : "Won!"}
                        </div>
                        <Progress 
                          value={(matchData.score.runs / matchData.score.target) * 100} 
                          className="h-1 mt-2" 
                        />
                      </div>
                    )}
                  </div>
                  
                  {/* Pitch and Venue Info */}
                  <div className="mt-6 border-t pt-4">
                    <h3 className="font-medium mb-2">Pitch & Venue Analysis</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex space-x-2 items-start">
                        <Thermometer className="h-5 w-5 text-orange-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Pitch Condition</h4>
                          <p className="text-sm text-gray-600">{matchData.venue.pitchType}</p>
                        </div>
                      </div>
                      
                      <div className="flex space-x-2 items-start">
                        <BarChart3 className="h-5 w-5 text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="font-medium">Chase Success Rate</h4>
                          <p className="text-sm text-gray-600">{matchData.venue.chaseSuccessRate}% at this venue</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Live Suggestions */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Lightbulb className="h-5 w-5 text-yellow-500 mr-2" />
                    Live Suggestions
                  </CardTitle>
                  <CardDescription>
                    ML-powered match insights
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {matchSuggestions.length > 0 ? (
                      matchSuggestions.map((suggestion, index) => (
                        <div key={index} className={`
                          p-3 rounded-md border
                          ${suggestion.priority === 'high' ? 'border-red-200 bg-red-50' : ''}
                          ${suggestion.priority === 'medium' ? 'border-orange-200 bg-orange-50' : ''}
                          ${suggestion.priority === 'low' ? 'border-green-200 bg-green-50' : ''}
                        `}>
                          <div className="flex items-center mb-1">
                            {suggestion.icon}
                            <h3 className={`
                              font-medium ml-2
                              ${suggestion.priority === 'high' ? 'text-red-700' : ''}
                              ${suggestion.priority === 'medium' ? 'text-orange-700' : ''}
                              ${suggestion.priority === 'low' ? 'text-green-700' : ''}
                            `}>
                              {suggestion.title}
                            </h3>
                          </div>
                          <p className="text-sm text-gray-600">{suggestion.description}</p>
                        </div>
                      ))
                    ) : (
                      <div className="text-center py-6 text-gray-500">
                        No suggestions available yet. Start the match to see real-time analysis.
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="strategy" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Strategy Analysis */}
              <Card className="md:col-span-2">
                <CardHeader>
                  <CardTitle>Match Strategies</CardTitle>
                  <CardDescription>
                    AI-powered strategies based on current match situation
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {predictions && (
                    <div>
                      <h3 className="font-medium mb-4">Recommended Primary Strategy</h3>
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg mb-6">
                        <div className="flex items-center mb-2">
                          {predictions.recommendedStrategy.icon}
                          <h4 className="text-lg font-medium ml-2 text-blue-700">
                            {predictions.recommendedStrategy.title}
                          </h4>
                          <Badge className="ml-auto" variant="outline">
                            {predictions.recommendedStrategy.riskLevel.toUpperCase()} RISK
                          </Badge>
                        </div>
                        <p className="text-blue-600 mb-3">
                          {predictions.recommendedStrategy.description}
                        </p>
                        <div className="flex items-center">
                          <span className="text-sm text-blue-500 mr-2">Impact Score:</span>
                          <div className="flex-1">
                            <Progress 
                              value={predictions.recommendedStrategy.impact * 10}
                              className="h-2"
                            />
                          </div>
                          <span className="ml-2 font-medium text-blue-700">
                            {predictions.recommendedStrategy.impact}/10
                          </span>
                        </div>
                      </div>
                      
                      <h3 className="font-medium mb-4">Alternative Strategies</h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {strategyBank
                          .filter(s => s.id !== predictions.recommendedStrategy.id)
                          .slice(0, 4)
                          .map(strategy => (
                            <div 
                              key={strategy.id}
                              className="p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center mb-2">
                                {strategy.icon}
                                <h4 className="font-medium ml-2">{strategy.title}</h4>
                                <Badge 
                                  className={`
                                    ml-auto text-xs
                                    ${strategy.riskLevel === 'low' ? 'bg-green-100 text-green-800' : ''}
                                    ${strategy.riskLevel === 'medium' ? 'bg-orange-100 text-orange-800' : ''}
                                    ${strategy.riskLevel === 'high' ? 'bg-red-100 text-red-800' : ''}
                                  `}
                                >
                                  {strategy.riskLevel}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600 mb-2">{strategy.description}</p>
                              <div className="flex items-center text-xs">
                                <span className="text-gray-500">Impact:</span>
                                <Progress 
                                  value={strategy.impact * 10}
                                  className="h-1.5 ml-2 flex-1"
                                />
                                <span className="ml-2 font-medium">{strategy.impact}/10</span>
                              </div>
                            </div>
                          ))
                        }
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Key Moments */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Milestone className="h-5 w-5 text-purple-500 mr-2" />
                    Key Moments
                  </CardTitle>
                  <CardDescription>
                    Critical phases in this match
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {predictions ? (
                    <div className="space-y-4">
                      {predictions.keyMoments.map((moment, index) => (
                        <div key={index} className="flex items-start space-x-3">
                          <div className="flex-shrink-0 h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-medium">
                            {index + 1}
                          </div>
                          <div className="flex-1 border-b pb-3">
                            <p>{moment}</p>
                          </div>
                        </div>
                      ))}
                      
                      {matchData.currentInnings === 2 && matchData.score.target && (
                        <div className="mt-6 pt-4 border-t">
                          <h3 className="font-medium mb-2">Chase Breakdown</h3>
                          <div className="space-y-2">
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Required Run Rate:</span>
                              <span className="font-medium">
                                {matchData.score.requiredRunRate?.toFixed(2) || "-"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Runs Needed:</span>
                              <span className="font-medium">
                                {matchData.score.target - matchData.score.runs > 0 
                                  ? matchData.score.target - matchData.score.runs 
                                  : "Target achieved"}
                              </span>
                            </div>
                            <div className="flex justify-between items-center">
                              <span className="text-sm">Balls Remaining:</span>
                              <span className="font-medium">
                                {Math.round((20 - matchData.score.overs) * 6)}
                              </span>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      No key moments identified yet. Start the match to see analysis.
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* NRR Impact Analysis */}
              <Card className="md:col-span-3">
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="h-5 w-5 text-blue-500 mr-2" />
                    Net Run Rate Impact Analysis
                  </CardTitle>
                  <CardDescription>
                    How this match affects team standings
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Team 1 NRR */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white border mr-3">
                          <Image 
                            src={teams[matchData.teams.team1.id].logo}
                            alt={matchData.teams.team1.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{teams[matchData.teams.team1.id].name}</h3>
                          <p className="text-sm text-gray-500">Current NRR: +0.425</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>If win by big margin:</span>
                            <span className="font-medium text-green-600">+0.523</span>
                          </div>
                          <Progress value={85} className="h-1.5" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>If win by small margin:</span>
                            <span className="font-medium text-green-600">+0.452</span>
                          </div>
                          <Progress value={65} className="h-1.5" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>If lose by big margin:</span>
                            <span className="font-medium text-red-600">+0.325</span>
                          </div>
                          <Progress value={35} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                    
                    {/* Team 2 NRR */}
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center mb-3">
                        <div className="relative h-10 w-10 rounded-full overflow-hidden bg-white border mr-3">
                          <Image 
                            src={teams[matchData.teams.team2.id].logo}
                            alt={matchData.teams.team2.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div>
                          <h3 className="font-medium">{teams[matchData.teams.team2.id].name}</h3>
                          <p className="text-sm text-gray-500">Current NRR: -0.125</p>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>If win by big margin:</span>
                            <span className="font-medium text-green-600">+0.023</span>
                          </div>
                          <Progress value={60} className="h-1.5" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>If win by small margin:</span>
                            <span className="font-medium text-green-600">-0.052</span>
                          </div>
                          <Progress value={45} className="h-1.5" />
                        </div>
                        
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span>If lose by big margin:</span>
                            <span className="font-medium text-red-600">-0.225</span>
                          </div>
                          <Progress value={20} className="h-1.5" />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                    <h3 className="font-medium text-blue-800 mb-2">NRR Strategy Recommendations</h3>
                    <ul className="space-y-2 text-blue-700">
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          {matchData.teams.team1.shortName} should aim to win by at least 20 runs to improve their playoff chances.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          {matchData.teams.team2.shortName} needs to win with at least 2 overs to spare to move up in the standings.
                        </span>
                      </li>
                      <li className="flex items-start">
                        <span className="mr-2">•</span>
                        <span>
                          In chase, scoring boundary every over will significantly boost NRR even in defeat.
                        </span>
                      </li>
                    </ul>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="predictions" className="mt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Win Probability */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Trophy className="h-5 w-5 text-yellow-500 mr-2" />
                    Win Probability
                  </CardTitle>
                  <CardDescription>
                    ML-predicted match outcome
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {predictions ? (
                    <>
                      <div className="flex items-center justify-center mb-6">
                        <div className="relative w-48 h-48">
                          {/* This would be a real chart in production */}
                          <div className="absolute inset-0 rounded-full border-8 border-gray-100"></div>
                          <div 
                            className="absolute inset-0 rounded-full border-8 border-transparent border-t-blue-500 border-r-blue-500"
                            style={{ 
                              transform: `rotate(${(predictions.winProbability.team1 / 100) * 360}deg)` 
                            }}
                          ></div>
                          <div className="absolute inset-0 flex items-center justify-center flex-col">
                            <span className="text-3xl font-bold text-blue-600">
                              {predictions.winProbability.team1}%
                            </span>
                            <span className="text-sm text-gray-500">Win probability</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="border rounded-md p-3">
                          <div className="flex items-center mb-2">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white border mr-2">
                              <Image 
                                src={teams[matchData.teams.team1.id].logo}
                                alt={matchData.teams.team1.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-sm font-medium">{teams[matchData.teams.team1.id].shortName}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Win chance:</span>
                            <span className="font-medium">{predictions.winProbability.team1}%</span>
                          </div>
                          <Progress 
                            value={predictions.winProbability.team1} 
                            className="h-1.5 mt-1" 
                          />
                        </div>
                        
                        <div className="border rounded-md p-3">
                          <div className="flex items-center mb-2">
                            <div className="relative h-8 w-8 rounded-full overflow-hidden bg-white border mr-2">
                              <Image 
                                src={teams[matchData.teams.team2.id].logo}
                                alt={matchData.teams.team2.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="text-sm font-medium">{teams[matchData.teams.team2.id].shortName}</div>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-sm">Win chance:</span>
                            <span className="font-medium">{predictions.winProbability.team2}%</span>
                          </div>
                          <Progress 
                            value={predictions.winProbability.team2} 
                            className="h-1.5 mt-1" 
                          />
                        </div>
                      </div>
                      
                      <div className="mt-4 border-t pt-4">
                        <h3 className="font-medium mb-1">Prediction Factors</h3>
                        <ul className="space-y-1 text-sm text-gray-600">
                          <li>• Current run rate vs required run rate</li>
                          <li>• Wickets in hand and batting depth</li>
                          <li>• Historical performance at this venue</li>
                          <li>• Team form and head-to-head record</li>
                        </ul>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      Predictions will appear once the match begins.
                    </div>
                  )}
                </CardContent>
              </Card>
              
              {/* Score Projection */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <FileBarChart className="h-5 w-5 text-green-500 mr-2" />
                    Score Projection
                  </CardTitle>
                  <CardDescription>
                    AI-predicted final score
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {predictions ? (
                    <>
                      <div className="text-center mb-6">
                        <div className="text-5xl font-bold text-green-600">
                          {predictions.projectedScore}
                        </div>
                        <p className="text-gray-500 mt-1">Projected final score</p>
                        
                        {matchData.currentInnings === 1 && (
                          <div className="mt-3 flex items-center justify-center text-sm">
                            <Badge className="bg-gray-100 text-gray-700 font-normal">
                              Avg. at venue: {matchData.venue.avgFirstInningsScore}
                            </Badge>
                            {predictions.projectedScore > matchData.venue.avgFirstInningsScore ? (
                              <Badge className="ml-2 bg-green-100 text-green-700 font-normal">
                                +{predictions.projectedScore - matchData.venue.avgFirstInningsScore} runs
                              </Badge>
                            ) : predictions.projectedScore < matchData.venue.avgFirstInningsScore ? (
                              <Badge className="ml-2 bg-red-100 text-red-700 font-normal">
                                {predictions.projectedScore - matchData.venue.avgFirstInningsScore} runs
                              </Badge>
                            ) : (
                              <Badge className="ml-2 bg-yellow-100 text-yellow-700 font-normal">
                                On par
                              </Badge>
                            )}
                          </div>
                        )}
                        
                        {matchData.currentInnings === 2 && matchData.score.target && (
                          <div className="mt-4 flex items-center justify-center">
                            <Badge 
                              className={`
                                text-sm font-normal px-3 py-1
                                ${predictions.projectedScore >= matchData.score.target 
                                  ? 'bg-green-100 text-green-700' 
                                  : 'bg-red-100 text-red-700'
                                }
                              `}
                            >
                              {predictions.projectedScore >= matchData.score.target 
                                ? `Will chase target with ~${Math.round((predictions.projectedScore - matchData.score.target) / 6)} overs to spare` 
                                : `Will fall short by ~${matchData.score.target - predictions.projectedScore} runs`
                              }
                            </Badge>
                          </div>
                        )}
                      </div>
                      
                      <div className="border rounded-lg p-4">
                        <h3 className="font-medium mb-3">Over-by-Over Projection</h3>
                        <div className="space-y-3">
                          {[5, 10, 15, 20].map(over => {
                            // Simple projection calculation
                            const currentOver = Math.floor(matchData.score.overs);
                            const projectedRunsAtOver = over > currentOver
                              ? matchData.score.runs + Math.round((over - currentOver) * 8)
                              : matchData.score.runs;
                                
                            return (
                              <div key={over}>
                                <div className="flex justify-between text-sm mb-1">
                                  <span>After {over} overs:</span>
                                  <span className="font-medium">
                                    {projectedRunsAtOver} runs
                                  </span>
                                </div>
                                <Progress 
                                  value={(projectedRunsAtOver / predictions.projectedScore) * 100} 
                                  className="h-1.5" 
                                />
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div className="text-center py-6 text-gray-500">
                      Projections will appear once the match begins.
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="scorecard" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Live Scorecard</CardTitle>
                <CardDescription>
                  Ball-by-ball match details and player stats
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-center py-6 text-gray-500">
                  The complete scorecard feature will track detailed player performance with batting and bowling statistics.
                </p>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
} 
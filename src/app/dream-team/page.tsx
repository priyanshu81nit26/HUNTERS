"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { 
  Trophy,
  Users,
  BarChart3,
  AlertCircle,
  ArrowLeftRight,
  Calendar
} from "lucide-react";
import { 
  Card, 
  CardHeader, 
  CardContent, 
  CardTitle, 
  CardDescription,
  CardFooter
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { TEAMS } from "../schedule/page";

// Player interface
interface Player {
  id: number;
  name: string;
  team: string;
  isCaptain: boolean;
  role: string;
  imageUrl: string;
  pickedByUsers?: number;
  isCaptainPick?: boolean;
  isViceCaptainPick?: boolean;
  // Player performance metrics for ML prediction
  performanceScore?: number;
}

// Match interface
interface Match {
  id: number;
  team1: string;
  team2: string;
  date: Date;
  time: string;
  venue: string;
  city: string;
}

// ML Model Prediction interface
interface TeamPrediction {
  winPercentage: number;
  averageScore: number;
  expectedWickets: number;
  strongestDepartment: string;
  weakestDepartment: string;
}

// List of roles for players
const ROLES = [
  "Batsman",
  "Bowler",
  "All-rounder",
  "Wicket-keeper"
];

// CSV data for all players from IPL_2025_Complete_Squads_Full.csv
const ALL_PLAYERS: Player[] = [
  // Chennai Super Kings
  { id: 1, name: "Ruturaj Gaikwad", team: "CSK", isCaptain: true, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  { id: 2, name: "MS Dhoni", team: "CSK", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 92 },
  { id: 3, name: "Ravindra Jadeja", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 88 },
  { id: 4, name: "Shivam Dube", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 78 },
  { id: 5, name: "Matheesha Pathirana", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  { id: 6, name: "Noor Ahmad", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 7, name: "Ravichandran Ashwin", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 87 },
  { id: 8, name: "Devon Conway", team: "CSK", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 80 },
  { id: 9, name: "Syed Khaleel Ahmed", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 76 },
  { id: 10, name: "Rachin Ravindra", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 11, name: "Rahul Tripathi", team: "CSK", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 12, name: "Vijay Shankar", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 76 },
  { id: 13, name: "Sam Curran", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 84 },
  { id: 14, name: "Shaik Rashid", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 73 },
  { id: 15, name: "Anshul Kamboj", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 70 },
  { id: 16, name: "Mukesh Choudhary", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 17, name: "Deepak Hooda", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 78 },
  { id: 18, name: "Gurjanpreet Singh", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 71 },
  { id: 19, name: "Nathan Ellis", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 80 },
  { id: 20, name: "Jamie Overton", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 77 },
  { id: 21, name: "Kamlesh Nagarkoti", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 72 },
  { id: 22, name: "Ramakrishnan Ghosh", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 71 },
  { id: 23, name: "Shreyas Gopal", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 24, name: "Vansh Bedi", team: "CSK", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 69 },
  { id: 25, name: "Andre Siddarth", team: "CSK", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 70 },
  
  // Mumbai Indians
  { id: 26, name: "Hardik Pandya", team: "MI", isCaptain: true, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 86 },
  { id: 27, name: "Jasprit Bumrah", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 93 },
  { id: 28, name: "Rohit Sharma", team: "MI", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 89 },
  { id: 29, name: "Tilak Verma", team: "MI", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 30, name: "Trent Boult", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 87 },
  { id: 31, name: "Naman Dhir", team: "MI", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 73 },
  { id: 32, name: "Robin Minz", team: "MI", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 72 },
  { id: 33, name: "Karn Sharma", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 76 },
  { id: 34, name: "Ryan Rickelton", team: "MI", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 35, name: "Deepak Chahar", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 81 },
  { id: 36, name: "Will Jacks", team: "MI", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 80 },
  { id: 37, name: "Ashwani Kumar", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 72 },
  { id: 38, name: "Mitchell Santner", team: "MI", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  { id: 39, name: "Reece Topley", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 80 },
  { id: 40, name: "Shrijith Krishnan", team: "MI", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 71 },
  { id: 41, name: "Raj Angad Bawa", team: "MI", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 74 },
  { id: 42, name: "Venkat Satyanarayana Raju", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 72 },
  { id: 43, name: "Bevon Jacobs", team: "MI", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 73 },
  { id: 44, name: "Arjun Tendulkar", team: "MI", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 45, name: "Vignesh Puthhur", team: "MI", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 71 },
  { id: 46, name: "Suryakumar Yadav", team: "MI", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 88 },
  
  // Kolkata Knight Riders
  { id: 47, name: "Ajinkya Rahane", team: "KKR", isCaptain: true, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 80 },
  { id: 48, name: "Rinku Singh", team: "KKR", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 84 },
  { id: 49, name: "Quinton de Kock", team: "KKR", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 88 },
  { id: 50, name: "Rahmanullah Gurbaz", team: "KKR", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 51, name: "Angkrish Raghuvanshi", team: "KKR", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 73 },
  { id: 52, name: "Venkatesh Iyer", team: "KKR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  { id: 53, name: "Ramandeep Singh", team: "KKR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 54, name: "Andre Russell", team: "KKR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 91 },
  { id: 55, name: "Anrich Nortje", team: "KKR", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  { id: 56, name: "Harshit Rana", team: "KKR", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 76 },
  { id: 57, name: "Sunil Narine", team: "KKR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 89 },
  { id: 58, name: "Varun Chakaravarthy", team: "KKR", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 59, name: "Vaibhav Arora", team: "KKR", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 60, name: "Mayank Markande", team: "KKR", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 77 },
  { id: 61, name: "Rovman Powell", team: "KKR", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 81 },
  { id: 62, name: "Manish Pandey", team: "KKR", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 63, name: "Spencer Johnson", team: "KKR", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 78 },
  { id: 64, name: "Luvnith Sisodia", team: "KKR", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 72 },
  { id: 65, name: "Anukul Roy", team: "KKR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 74 },
  { id: 66, name: "Moeen Ali", team: "KKR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 84 },
  
  // Royal Challengers Bengaluru
  { id: 67, name: "Rajat Patidar", team: "RCB", isCaptain: true, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 81 },
  { id: 68, name: "Virat Kohli", team: "RCB", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 94 },
  { id: 69, name: "Yash Dayal", team: "RCB", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 77 },
  { id: 70, name: "Josh Hazlewood", team: "RCB", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 86 },
  { id: 71, name: "Phil Salt", team: "RCB", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  { id: 72, name: "Jitesh Sharma", team: "RCB", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 73, name: "Liam Livingstone", team: "RCB", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  { id: 74, name: "Rasikh Dar", team: "RCB", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 74 },
  { id: 75, name: "Suyash Sharma", team: "RCB", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 76, name: "Krunal Pandya", team: "RCB", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  { id: 77, name: "Bhuvneshwar Kumar", team: "RCB", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 84 },
  { id: 78, name: "Swapnil Singh", team: "RCB", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 76 },
  { id: 79, name: "Tim David", team: "RCB", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 80, name: "Romario Shepherd", team: "RCB", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  
  // Sunrisers Hyderabad
  { id: 100, name: "Pat Cummins", team: "SRH", isCaptain: true, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 90 },
  { id: 101, name: "Travis Head", team: "SRH", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 87 },
  { id: 102, name: "Abhishek Sharma", team: "SRH", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 103, name: "Heinrich Klassen", team: "SRH", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  { id: 104, name: "Nitish Reddy", team: "SRH", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 76 },
  
  // Rajasthan Royals
  { id: 120, name: "Sanju Samson", team: "RR", isCaptain: true, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 86 },
  { id: 121, name: "Yashasvi Jaiswal", team: "RR", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 89 },
  { id: 122, name: "Riyan Parag", team: "RR", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 78 },
  { id: 123, name: "Dhruv Jurel", team: "RR", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 75 },
  { id: 124, name: "Shimron Hetmyer", team: "RR", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  
  // Lucknow Super Giants
  { id: 140, name: "Rishabh Pant", team: "LSG", isCaptain: true, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 87 },
  { id: 141, name: "Nicholas Pooran", team: "LSG", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 84 },
  { id: 142, name: "David Miller", team: "LSG", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 143, name: "Aiden Markram", team: "LSG", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 82 },
  { id: 144, name: "Mitchell Marsh", team: "LSG", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  
  // Punjab Kings
  { id: 160, name: "Shreyas Iyer", team: "PBKS", isCaptain: true, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 161, name: "Yuzvendra Chahal", team: "PBKS", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  { id: 162, name: "Liam Livingstone", team: "PBKS", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 163, name: "Kagiso Rabada", team: "PBKS", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 87 },
  { id: 164, name: "Shikhar Dhawan", team: "PBKS", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 81 },
  
  // Delhi Capitals
  { id: 180, name: "Axar Patel", team: "DC", isCaptain: true, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 84 },
  { id: 181, name: "Kuldeep Yadav", team: "DC", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 182, name: "Prithvi Shaw", team: "DC", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 81 },
  { id: 183, name: "Mitchell Marsh", team: "DC", isCaptain: false, role: "All-rounder", imageUrl: "/dhoni.jpg", performanceScore: 83 },
  { id: 184, name: "Anrich Nortje", team: "DC", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 85 },
  
  // Gujarat Titans
  { id: 200, name: "Shubman Gill", team: "GT", isCaptain: true, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 88 },
  { id: 201, name: "Rashid Khan", team: "GT", isCaptain: false, role: "Bowler", imageUrl: "/dhoni.jpg", performanceScore: 92 },
  { id: 202, name: "Jos Buttler", team: "GT", isCaptain: false, role: "Wicket-keeper", imageUrl: "/dhoni.jpg", performanceScore: 90 },
  { id: 203, name: "Sai Sudharshan", team: "GT", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 79 },
  { id: 204, name: "Shahrukh Khan", team: "GT", isCaptain: false, role: "Batsman", imageUrl: "/dhoni.jpg", performanceScore: 78 }
];

// Mock schedule data instead of fetching from API
const getMockScheduleData = (): Match => {
  // Today's date (or a fixed date for testing)
  const today = new Date();
  
  // Get random match for today from CSK vs MI (most popular)
  return {
    id: 1,
    team1: "CSK",
    team2: "MI",
    date: today,
    time: "7:30 PM IST",
    venue: "M. A. Chidambaram Stadium",
    city: "Chennai"
  };
};

// Updated fetchTodaysMatch to use mock data instead of API
const fetchTodaysMatch = async (): Promise<Match | null> => {
  try {
    // Instead of API call, use mock data
    return getMockScheduleData();
  } catch (error) {
    console.error('Error fetching today\'s match:', error);
    return null;
  }
};

// ML Recommendation interface - New type for ML team recommendations
interface MLRecommendation {
  recommendedTeam: Player[];
  captain: Player;
  viceCaptain: Player;
  winProbability: number;
  strategyNotes: string[];
}

// ML Model Team Recommendation function - New function
const getMLRecommendedTeam = (team1: string, team2: string): MLRecommendation => {
  // Filter players from the two teams
  const team1Players = ALL_PLAYERS.filter(player => player.team === team1);
  const team2Players = ALL_PLAYERS.filter(player => player.team === team2);
  
  // Sort players by performance score descending
  const sortedTeam1 = [...team1Players].sort((a, b) => 
    (b.performanceScore || 0) - (a.performanceScore || 0)
  );
  
  const sortedTeam2 = [...team2Players].sort((a, b) => 
    (b.performanceScore || 0) - (a.performanceScore || 0)
  );
  
  // Select top 6 players from team1 and top 5 from team2 (or vice versa)
  // This balances the team while prioritizing high performers
  let recommendedTeam: Player[] = [];
  
  if (Math.random() > 0.5) {
    recommendedTeam = [...sortedTeam1.slice(0, 6), ...sortedTeam2.slice(0, 5)];
  } else {
    recommendedTeam = [...sortedTeam1.slice(0, 5), ...sortedTeam2.slice(0, 6)];
  }
  
  // Ensure we have the required role distribution (at least 1 wicket-keeper, 3-5 batsmen, 1-3 all-rounders, 3-5 bowlers)
  const roleCount = {
    "Wicket-keeper": recommendedTeam.filter(p => p.role === "Wicket-keeper").length,
    "Batsman": recommendedTeam.filter(p => p.role === "Batsman").length,
    "All-rounder": recommendedTeam.filter(p => p.role === "All-rounder").length,
    "Bowler": recommendedTeam.filter(p => p.role === "Bowler").length
  };
  
  // If role requirements aren't met, adjust the team
  if (roleCount["Wicket-keeper"] < 1) {
    // Replace lowest performance player with a wicket-keeper
    const lowestPerformer = recommendedTeam.sort((a, b) => 
      (a.performanceScore || 0) - (b.performanceScore || 0)
    )[0];
    
    const bestWicketkeeper = [...team1Players, ...team2Players]
      .filter(p => p.role === "Wicket-keeper")
      .sort((a, b) => (b.performanceScore || 0) - (a.performanceScore || 0))[0];
    
    if (bestWicketkeeper) {
      recommendedTeam = recommendedTeam.filter(p => p.id !== lowestPerformer.id);
      recommendedTeam.push(bestWicketkeeper);
    }
  }
  
  // Select captain and vice-captain based on performance scores
  const sortedByPerformance = [...recommendedTeam].sort((a, b) => 
    (b.performanceScore || 0) - (a.performanceScore || 0)
  );
  
  const captain = sortedByPerformance[0];
  const viceCaptain = sortedByPerformance[1];
  
  // Calculate win probability based on team composition
  let winProbability = 75; // Base probability
  
  // Factor 1: Team balance (team1 vs team2 players)
  const team1Count = recommendedTeam.filter(p => p.team === team1).length;
  const team2Count = recommendedTeam.filter(p => p.team === team2).length;
  
  // Balanced team gets bonus
  if (Math.abs(team1Count - team2Count) <= 2) {
    winProbability += 5;
  }
  
  // Factor 2: Captain and Vice-Captain performance
  winProbability += (((captain.performanceScore || 0) + (viceCaptain.performanceScore || 0)) / 200) * 10;
  
  // Factor 3: Overall team performance average
  const avgPerformance = recommendedTeam.reduce((sum, player) => 
    sum + (player.performanceScore || 0), 0
  ) / recommendedTeam.length;
  
  winProbability += (avgPerformance / 100) * 10;
  
  // Cap at 95%
  winProbability = Math.min(95, winProbability);
  
  // Generate strategy notes
  const strategyNotes = [
    `Team balance: ${team1Count} ${team1} players, ${team2Count} ${team2} players`,
    `Captain selection is a high-performer with consistent results`,
    `Team includes ${roleCount["Batsman"]} batsmen, ${roleCount["Bowler"]} bowlers, ${roleCount["All-rounder"]} all-rounders, and ${roleCount["Wicket-keeper"]} wicket-keeper(s)`,
    `This team composition has a ${winProbability.toFixed(1)}% probability of ranking in top contests`
  ];
  
  return {
    recommendedTeam,
    captain,
    viceCaptain,
    winProbability,
    strategyNotes
  };
};

// Generate test match data (for fallback)
const getTestMatches = (): Match[] => {
  // Simplified array of a few matches to choose from
  return [
        {
          id: 1,
      team1: "CSK",
      team2: "MI",
      date: new Date(),
      time: "7:30 PM IST",
      venue: "M. A. Chidambaram Stadium",
      city: "Chennai"
        },
        {
          id: 2,
      team1: "RCB",
      team2: "KKR",
      date: new Date(Date.now() + 86400000), // Tomorrow
      time: "7:30 PM IST",
      venue: "M. Chinnaswamy Stadium",
      city: "Bengaluru"
        },
        {
          id: 3,
      team1: "SRH",
      team2: "DC",
      date: new Date(Date.now() + 172800000), // Day after tomorrow
      time: "3:30 PM IST",
      venue: "Rajiv Gandhi International Stadium",
      city: "Hyderabad"
    }
  ];
};

export default function DreamTeamPage() {
  // State for match and teams
  const [matches, setMatches] = useState<Match[]>([]);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null);
  const [team1Players, setTeam1Players] = useState<Player[]>([]);
  const [team2Players, setTeam2Players] = useState<Player[]>([]);
  
  // State for selected team and players
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [dreamTeam, setDreamTeam] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [captain, setCaptain] = useState<Player | null>(null);
  const [viceCaptain, setViceCaptain] = useState<Player | null>(null);
  
  // ML prediction states
  const [teamPrediction, setTeamPrediction] = useState<TeamPrediction | null>(null);
  const [showPrediction, setShowPrediction] = useState<boolean>(false);
  const [isPredicting, setIsPredicting] = useState<boolean>(false);
  
  // New state for ML recommendation
  const [mlRecommendation, setMlRecommendation] = useState<MLRecommendation | null>(null);
  const [usingRecommendedTeam, setUsingRecommendedTeam] = useState<boolean>(false);
  
  // Load today's match from API
  useEffect(() => {
    const loadTodaysMatch = async () => {
      setIsLoading(true);
      
      // Try to fetch today's match from mocked function
      const todayMatch = await fetchTodaysMatch();
      
      if (todayMatch) {
        // If we got a match, use it
        setMatches([todayMatch]);
        selectMatch(todayMatch);
      } else {
        // Fallback to test matches if mock fails
        const testMatches = getTestMatches();
        setMatches(testMatches);
        if (testMatches.length > 0) {
          selectMatch(testMatches[0]);
        }
      }
      
      setIsLoading(false);
    };
    
    loadTodaysMatch();
  }, []);

  // Handle match selection and generate ML recommended team
  const selectMatch = (match: Match) => {
    setSelectedMatch(match);
    setDreamTeam([]);
    setCaptain(null);
    setViceCaptain(null);
    setShowPrediction(false);
    setTeamPrediction(null);
    
    // Filter players for team 1
    const team1PlayersData = ALL_PLAYERS.filter(player => player.team === match.team1);
    setTeam1Players(team1PlayersData);
    
    // Filter players for team 2
    const team2PlayersData = ALL_PLAYERS.filter(player => player.team === match.team2);
    setTeam2Players(team2PlayersData);
    
    // Generate ML recommendation for this match
    const recommendation = getMLRecommendedTeam(match.team1, match.team2);
    setMlRecommendation(recommendation);
  };
  
  // Apply ML recommended team
  const applyRecommendedTeam = () => {
    if (mlRecommendation) {
      setDreamTeam(mlRecommendation.recommendedTeam);
      setCaptain(mlRecommendation.captain);
      setViceCaptain(mlRecommendation.viceCaptain);
      setUsingRecommendedTeam(true);
      
      // Auto-run prediction
      setTimeout(() => {
        predictTeamPerformance();
      }, 500);
    }
  };
  
  // ML prediction function - updated to focus on dream 11 contest winning probability
  const predictTeamPerformance = () => {
    if (dreamTeam.length !== 11 || !captain || !viceCaptain) {
      return;
    }
    
    setIsPredicting(true);
    setShowPrediction(false);
    
    // Simulate API call delay
    setTimeout(() => {
      // UPDATED: Focus on contest winning probability
      // Calculate factors that influence winning dream 11 contests
      
      // Factor 1: Captain & Vice-Captain performance (highest impact)
      const captainScore = (captain.performanceScore || 75) * 2; // Captain points are doubled
      const vcScore = (viceCaptain.performanceScore || 75) * 1.5; // VC points are 1.5x
      
      // Factor 2: Overall team quality
      const totalPerformanceScore = dreamTeam.reduce((sum, player) => {
        return sum + (player.performanceScore || 75);
      }, 0);
      
      // Factor 3: Team balance (team1 vs team2)
      const team1Count = dreamTeam.filter(p => p.team === selectedMatch?.team1).length;
      const team2Count = dreamTeam.filter(p => p.team === selectedMatch?.team2).length;
      
      // Factor 4: Role distribution
      const batsmen = dreamTeam.filter(p => p.role === "Batsman").length;
      const bowlers = dreamTeam.filter(p => p.role === "Bowler").length;
      const allRounders = dreamTeam.filter(p => p.role === "All-rounder").length;
      const wicketKeepers = dreamTeam.filter(p => p.role === "Wicket-keeper").length;
      
      // Calculate base win percentage
      let baseWinPercentage = (
        (captainScore + vcScore) / 300 * 40 + // 40% weight to captain/vc
        (totalPerformanceScore / (11 * 100)) * 100 * 0.3 + // 30% weight to overall team
        (wicketKeepers >= 1 && wicketKeepers <= 4 ? 10 : 0) + // Bonus for good WK count
        (batsmen >= 3 && batsmen <= 5 ? 10 : 0) + // Bonus for good batsmen count
        (bowlers >= 3 && bowlers <= 5 ? 10 : 0) + // Bonus for good bowlers count
        (allRounders >= 3 && allRounders <= 5 ? 10 : 0) // Bonus for good all-rounders count
      );
      
      // Team balance bonus (crucial for dream 11)
      if (Math.abs(team1Count - team2Count) <= 2) {
        baseWinPercentage += 10; // Big bonus for balanced team
      } else if (Math.abs(team1Count - team2Count) <= 4) {
        baseWinPercentage += 5; // Smaller bonus for somewhat balanced team
      }
      
      // Random factor to simulate unpredictability
      const randomFactor = Math.random() * 8 - 4; // Random -4 to +4
      
      // Final win percentage with caps
      let winPercentage = Math.min(95, Math.max(30, baseWinPercentage + randomFactor));
      
      // Compare to ML recommendation if using custom team
      if (mlRecommendation && !usingRecommendedTeam) {
        const recommendationQuality = mlRecommendation.winProbability;
        const comparisonText = winPercentage > recommendationQuality 
          ? "Your team outperforms our AI recommendation!"
          : "Our AI recommendation still has a higher win probability.";
          
        // Set prediction with comparison
        setTeamPrediction({
          winPercentage: Math.round(winPercentage),
          averageScore: Math.round(160 + (winPercentage - 50) * 1.5), // Less important for dream 11
          expectedWickets: Math.round(6 + (winPercentage - 50) / 10), // Less important for dream 11
          strongestDepartment: determineStrongestDepartment(), 
          weakestDepartment: determineWeakestDepartment()
        });
      } else {
        // Regular prediction
        setTeamPrediction({
          winPercentage: Math.round(winPercentage),
          averageScore: Math.round(160 + (winPercentage - 50) * 1.5),
          expectedWickets: Math.round(6 + (winPercentage - 50) / 10),
          strongestDepartment: determineStrongestDepartment(),
          weakestDepartment: determineWeakestDepartment()
        });
      }
      
      setIsPredicting(false);
      setShowPrediction(true);
    }, 1500);
  };
  
  // Helper functions for prediction
  const determineStrongestDepartment = () => {
    const batsmen = dreamTeam.filter(p => p.role === "Batsman");
    const bowlers = dreamTeam.filter(p => p.role === "Bowler");
    const allRounders = dreamTeam.filter(p => p.role === "All-rounder");
    
    const batsmenScore = batsmen.reduce((sum, player) => sum + (player.performanceScore || 75), 0) / (batsmen.length || 1);
    const bowlersScore = bowlers.reduce((sum, player) => sum + (player.performanceScore || 75), 0) / (bowlers.length || 1);
    const allRoundersScore = allRounders.reduce((sum, player) => sum + (player.performanceScore || 75), 0) / (allRounders.length || 1);
    
    const scores = [
      { department: "Batting", score: batsmenScore },
      { department: "Bowling", score: bowlersScore },
      { department: "All-round", score: allRoundersScore }
    ];
    
    scores.sort((a, b) => b.score - a.score);
    return scores[0].department;
  };
  
  const determineWeakestDepartment = () => {
    const batsmen = dreamTeam.filter(p => p.role === "Batsman");
    const bowlers = dreamTeam.filter(p => p.role === "Bowler");
    const allRounders = dreamTeam.filter(p => p.role === "All-rounder");
    
    const batsmenScore = batsmen.reduce((sum, player) => sum + (player.performanceScore || 75), 0) / (batsmen.length || 1);
    const bowlersScore = bowlers.reduce((sum, player) => sum + (player.performanceScore || 75), 0) / (bowlers.length || 1);
    const allRoundersScore = allRounders.reduce((sum, player) => sum + (player.performanceScore || 75), 0) / (allRounders.length || 1);
    
    const scores = [
      { department: "Batting", score: batsmenScore },
      { department: "Bowling", score: bowlersScore },
      { department: "All-round", score: allRoundersScore }
    ];
    
    scores.sort((a, b) => a.score - b.score);
    return scores[0].department;
  };
  
  // Handle role filter change
  const handleRoleChange = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter(r => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };
  
  // Add player to dream team
  const addToDreamTeam = (player: Player) => {
    if (dreamTeam.length < 11 && !dreamTeam.find(p => p.id === player.id)) {
      setDreamTeam([...dreamTeam, player]);
      // Reset prediction when team changes
      setShowPrediction(false);
      setTeamPrediction(null);
    }
  };
  
  // Remove player from dream team
  const removeFromDreamTeam = (playerId: number) => {
    setDreamTeam(dreamTeam.filter(p => p.id !== playerId));
    
    // Remove player from captain/vice-captain if needed
    if (captain?.id === playerId) setCaptain(null);
    if (viceCaptain?.id === playerId) setViceCaptain(null);
    
    // Reset prediction when team changes
    setShowPrediction(false);
    setTeamPrediction(null);
  };
  
  // Set player as captain
  const setPlayerAsCaptain = (player: Player) => {
    setCaptain(player);
    if (viceCaptain?.id === player.id) {
      setViceCaptain(null);
    }
    // Reset prediction when captain changes
    setShowPrediction(false);
    setTeamPrediction(null);
  };
  
  // Set player as vice-captain
  const setPlayerAsViceCaptain = (player: Player) => {
    setViceCaptain(player);
    if (captain?.id === player.id) {
      setCaptain(null);
    }
    // Reset prediction when vice-captain changes
    setShowPrediction(false);
    setTeamPrediction(null);
  };
  
  // Filter players by selected roles
  const filteredTeam1Players = selectedRoles.length > 0
    ? team1Players.filter(player => selectedRoles.includes(player.role))
    : team1Players;
    
  const filteredTeam2Players = selectedRoles.length > 0
    ? team2Players.filter(player => selectedRoles.includes(player.role))
    : team2Players;
  
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">IPL 2025 Dream Team Builder</h1>
        
        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="flex flex-col items-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
              <p className="mt-4 text-lg">Loading today&apos;s match...</p>
            </div>
          </div>
        ) : selectedMatch ? (
          <>
            {/* Today's Match Card */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Calendar className="mr-2 h-5 w-5" />
                  Today&apos;s Match
                </CardTitle>
                <CardDescription>
                  Build your dream team from today&apos;s match players
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 border rounded-lg shadow-sm bg-white">
                  <div className="flex flex-col md:flex-row items-center justify-between">
                    <div className="flex items-center mb-4 md:mb-0">
                      <div className="flex flex-col items-center mr-6">
                        <Badge className="mb-2 px-4 py-2 text-lg">{selectedMatch.team1}</Badge>
                        <div className="text-sm text-gray-500">{team1Players.find(p => p.isCaptain)?.name || "Captain"}</div>
                      </div>
                      
                      <div className="flex flex-col items-center mx-4">
                        <div className="text-xl font-bold text-gray-700">VS</div>
                        <div className="text-sm text-gray-500 mt-2">
                          {new Date(selectedMatch.date).toLocaleDateString()}
                          </div>
                        <div className="text-sm text-gray-500">{selectedMatch.time}</div>
                          </div>
                      
                      <div className="flex flex-col items-center ml-6">
                        <Badge className="mb-2 px-4 py-2 text-lg">{selectedMatch.team2}</Badge>
                        <div className="text-sm text-gray-500">{team2Players.find(p => p.isCaptain)?.name || "Captain"}</div>
                        </div>
                      </div>
                      
                    <div className="text-center md:text-right">
                      <div className="text-sm text-gray-500">Venue</div>
                      <div className="font-medium">{selectedMatch.venue}</div>
                      <div className="text-sm text-gray-500">{selectedMatch.city}</div>
                        </div>
                        </div>
                </div>
                
                {/* ML Recommendation Button */}
                {mlRecommendation && (
                  <div className="mt-4">
                    <Button 
                      onClick={applyRecommendedTeam} 
                      className="w-full bg-indigo-600 hover:bg-indigo-700"
                      disabled={usingRecommendedTeam}
                    >
                      {usingRecommendedTeam ? "Using AI Recommended Team" : "Use AI Recommended Team"}
                    </Button>
                    
                    {mlRecommendation && (
                      <div className="mt-2 text-sm text-center text-gray-600">
                        Our AI recommends a team with {mlRecommendation.winProbability.toFixed(1)}% chance to win contests
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
            
            {/* Role Filter */}
            <div className="mb-6">
              <h2 className="text-lg font-medium mb-2">Filter by Role</h2>
              <div className="flex flex-wrap gap-2">
                {ROLES.map((role) => (
                  <Badge 
                    key={role}
                    variant={selectedRoles.includes(role) ? "default" : "outline"}
                    className="cursor-pointer"
                    onClick={() => handleRoleChange(role)}
                  >
                    {role}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Dream Team Stats - CONTEST FOCUS */}
            <Card className="mb-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center justify-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Dream 11 Contest Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                        <div className="flex justify-between items-center">
                    <span>Players Selected:</span>
                    <Badge variant={dreamTeam.length === 11 ? "default" : "outline"}>
                      {dreamTeam.length}/11
                    </Badge>
                        </div>
                  <div className="flex justify-between items-center">
                    <span>Captain (2x points):</span>
                    <span className="text-sm">{captain ? captain.name : "Not Selected"}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>Vice Captain (1.5x points):</span>
                    <span className="text-sm">{viceCaptain ? viceCaptain.name : "Not Selected"}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span>{selectedMatch.team1}:</span>
                    <Badge variant="outline">{dreamTeam.filter(p => p.team === selectedMatch.team1).length} players</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span>{selectedMatch.team2}:</span>
                    <Badge variant="outline">{dreamTeam.filter(p => p.team === selectedMatch.team2).length} players</Badge>
                  </div>
                  
                  {teamPrediction && (
                    <div className="mt-4 pt-4 border-t">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-indigo-700">Contest Win Chance:</span>
                        <Badge variant="default" className="bg-indigo-600">
                          {teamPrediction.winPercentage}%
                        </Badge>
                      </div>
                      <div className="mt-2">
                        <Progress 
                          value={teamPrediction.winPercentage} 
                          className="h-2 bg-slate-200"
                        />
                      </div>
                    </div>
                  )}
                  
                  {dreamTeam.length === 11 && captain && viceCaptain && !teamPrediction && (
                    <Button
                      onClick={predictTeamPerformance}
                      disabled={isPredicting}
                      className="w-full mt-2"
                      variant="outline"
                    >
                      {isPredicting ? "Analyzing..." : "Analyze Contest Chances"}
                    </Button>
                  )}
                    </div>
              </CardContent>
            </Card>
            
            {/* Two Teams Side by Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              {/* Team 1 Players */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    {selectedMatch.team1} Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {filteredTeam1Players.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        No players found matching selected roles
                      </div>
                    ) : (
                      filteredTeam1Players.map((player) => {
                        const isSelected = dreamTeam.some(p => p.id === player.id);
                        return (
                      <div
                        key={player.id}
                            className={`flex items-center p-3 bg-white rounded-lg border ${
                              isSelected ? "border-green-400 bg-green-50" : "border-gray-200"
                            }`}
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
                              <div className="flex items-center">
                          <h4 className="text-sm font-medium">{player.name}</h4>
                                {player.isCaptain && (
                                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">C</Badge>
                                )}
                          </div>
                              <div className="text-xs text-gray-500">
                                {player.role}
                        </div>
                      </div>
                            {isSelected ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => removeFromDreamTeam(player.id)}
                              >
                                Remove
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={dreamTeam.length >= 11}
                                onClick={() => addToDreamTeam(player)}
                              >
                                Add
                              </Button>
                            )}
                          </div>
                        );
                      })
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Team 2 Players */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5" />
                    {selectedMatch.team2} Players
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
                    {filteredTeam2Players.length === 0 ? (
                      <div className="text-center py-6 text-gray-500">
                        No players found matching selected roles
                      </div>
                    ) : (
                      filteredTeam2Players.map((player) => {
                        const isSelected = dreamTeam.some(p => p.id === player.id);
                        return (
                      <div
                        key={player.id}
                            className={`flex items-center p-3 bg-white rounded-lg border ${
                              isSelected ? "border-green-400 bg-green-50" : "border-gray-200"
                            }`}
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
                              <div className="flex items-center">
                          <h4 className="text-sm font-medium">{player.name}</h4>
                                {player.isCaptain && (
                                  <Badge className="ml-2 bg-yellow-100 text-yellow-800">C</Badge>
                                )}
                          </div>
                              <div className="text-xs text-gray-500">
                                {player.role}
                        </div>
                      </div>
                            {isSelected ? (
                              <Button 
                                variant="destructive" 
                                size="sm"
                                onClick={() => removeFromDreamTeam(player.id)}
                              >
                                Remove
                              </Button>
                            ) : (
                              <Button 
                                variant="outline" 
                                size="sm"
                                disabled={dreamTeam.length >= 11}
                                onClick={() => addToDreamTeam(player)}
                              >
                                Add
                              </Button>
                            )}
                  </div>
                        );
                      })
                    )}
                </div>
              </CardContent>
            </Card>
          </div>
          
            {/* Dream Team Display */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Trophy className="mr-2 h-5 w-5 text-yellow-500" />
                  Your Dream Team XI
                </CardTitle>
                <CardDescription>
                  Customize your team by selecting a captain and vice-captain
                </CardDescription>
              </CardHeader>
              <CardContent>
                {dreamTeam.length === 0 ? (
                  <div className="text-center py-8 text-gray-500">
                    Your dream team is empty. Add players from both teams above.
                  </div>
                ) : (
                  <div className="space-y-6">
                    {/* Team ML Predictions */}
                    {dreamTeam.length === 11 && showPrediction && teamPrediction && (
                      <Card className="border-2 border-indigo-200 bg-gradient-to-br from-white to-indigo-50 mb-6">
                        <CardHeader className="pb-2">
                          <CardTitle className="text-center text-lg text-indigo-700">
                            ML Performance Prediction
                          </CardTitle>
                          <CardDescription className="text-center text-indigo-500">
                            Based on player statistics and team composition
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-6">
                            {/* Win Percentage */}
                            <div className="text-center">
                              <h3 className="text-3xl font-bold text-indigo-700 mb-1">
                                {teamPrediction.winPercentage}% 
                              </h3>
                              <p className="text-sm text-indigo-600 font-medium">
                                Predicted Win Percentage
                              </p>
                              <div className="mt-2">
                                <Progress 
                                  value={teamPrediction.winPercentage} 
                                  className="h-2 bg-indigo-100"
                                />
                              </div>
                              <p className="mt-1 text-xs text-indigo-500">
                                {teamPrediction.winPercentage < 40 ? 'Low chance of winning' :
                                 teamPrediction.winPercentage < 65 ? 'Moderate chance of winning' :
                                 teamPrediction.winPercentage < 80 ? 'Good chance of winning' :
                                 'Excellent chance of winning'}
                              </p>
                                </div>
                            
                            {/* Performance Metrics */}
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
                                <h4 className="text-sm font-medium text-indigo-700 mb-1">Expected Score</h4>
                                <p className="text-2xl font-bold text-indigo-800">{teamPrediction.averageScore}</p>
                                <p className="text-xs text-indigo-500 mt-1">Average runs per match</p>
                              </div>
                              <div className="bg-white rounded-lg p-3 shadow-sm border border-indigo-100">
                                <h4 className="text-sm font-medium text-indigo-700 mb-1">Expected Wickets</h4>
                                <p className="text-2xl font-bold text-indigo-800">{teamPrediction.expectedWickets}</p>
                                <p className="text-xs text-indigo-500 mt-1">Average wickets per match</p>
                              </div>
                            </div>
                            
                            {/* Team Analysis */}
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-indigo-100 mt-4">
                              <h4 className="text-sm font-medium text-indigo-700 mb-3">Team Analysis</h4>
                              <div className="space-y-2">
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-indigo-700">Strongest Department:</span>
                                  <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
                                    {teamPrediction.strongestDepartment}
                                  </Badge>
                              </div>
                                <div className="flex justify-between items-center">
                                  <span className="text-xs text-indigo-700">Needs Improvement:</span>
                                  <Badge className="bg-amber-100 text-amber-800 hover:bg-amber-100">
                                    {teamPrediction.weakestDepartment}
                                  </Badge>
                            </div>
                            
                                {/* Team Distribution */}
                              <div className="flex justify-between items-center">
                                  <span className="text-xs text-indigo-700">Team Distribution:</span>
                                  <div className="flex items-center space-x-2">
                                    <Badge className="bg-blue-100 text-blue-800">{selectedMatch.team1}: {dreamTeam.filter(p => p.team === selectedMatch.team1).length}</Badge>
                                    <Badge className="bg-purple-100 text-purple-800">{selectedMatch.team2}: {dreamTeam.filter(p => p.team === selectedMatch.team2).length}</Badge>
                              </div>
                            </div>
                          </div>
                      </div>
                    </div>
                        </CardContent>
                        <CardFooter className="pt-0">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => setShowPrediction(false)}
                            className="w-full text-indigo-700 border-indigo-200 hover:bg-indigo-50"
                          >
                            Hide Analysis
                          </Button>
                        </CardFooter>
                      </Card>
                    )}
                    
                    {/* Required team setup message */}
                    {dreamTeam.length > 0 && dreamTeam.length < 11 && (
                      <div className="flex items-center p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 mb-4">
                        <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                        <p className="text-sm">
                          You need to select {11 - dreamTeam.length} more player{dreamTeam.length === 10 ? '' : 's'} 
                          to complete your team and see performance predictions.
                        </p>
                              </div>
                    )}
                    
                    {dreamTeam.length === 11 && (!captain || !viceCaptain) && (
                      <div className="flex items-center p-4 rounded-lg bg-amber-50 border border-amber-200 text-amber-700 mb-4">
                        <AlertCircle className="h-5 w-5 mr-2 text-amber-500" />
                        <p className="text-sm">
                          Please select a captain and vice-captain to see team predictions.
                        </p>
                              </div>
                    )}
                    
                    {/* Selected Players */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
                      {dreamTeam.map((player) => (
                          <div
                            key={player.id}
                            className={`flex flex-col p-4 bg-white rounded-lg border shadow-sm ${
                            captain?.id === player.id 
                                ? "border-yellow-400 ring-2 ring-yellow-200" 
                              : viceCaptain?.id === player.id
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
                            <div>
                              <h4 className="font-medium">{player.name}</h4>
                              <div className="flex items-center space-x-1 text-sm text-gray-500">
                                <Badge variant="outline" className="px-1 py-0 text-xs">
                                  {player.team}
                                </Badge>
                                  <span>•</span>
                                  <span>{player.role}</span>
                                </div>
                              </div>
                            </div>
                            
                          <div className="flex space-x-2 mt-auto">
                            <Button 
                              variant={captain?.id === player.id ? "default" : "outline"} 
                              size="sm"
                              className="flex-1"
                              onClick={() => setPlayerAsCaptain(player)}
                            >
                              C
                            </Button>
                            <Button 
                              variant={viceCaptain?.id === player.id ? "default" : "outline"} 
                              size="sm"
                              className="flex-1"
                              onClick={() => setPlayerAsViceCaptain(player)}
                            >
                              VC
                            </Button>
                            <Button 
                              variant="destructive" 
                              size="sm"
                              onClick={() => removeFromDreamTeam(player.id)}
                            >
                              X
                            </Button>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </>
        ) : (
          <Card>
            <CardContent className="py-12">
              <div className="text-center">
                <h3 className="text-xl font-medium text-gray-700 mb-2">No Match Today</h3>
                <p className="text-gray-500">There are no matches scheduled for today.</p>
                <p className="text-gray-500 mt-2">Please check back later for the next match.</p>
          </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
} 
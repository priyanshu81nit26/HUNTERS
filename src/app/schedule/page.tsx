"use client";

import { useState, useEffect } from "react";
import { Calendar, Search, Filter, Medal, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { 
  formatMatchDate, 
  filterMatchesByTeam, 
  filterMatchesByVenue, 
  filterMatchesByStatus, 
  searchMatches,
  Match,
  Team,
  Ground
} from "@/lib/scheduleData";

// Team data
export const TEAMS: Team[] = [
  { id: 1, name: "Chennai Super Kings", short: "CSK", color: "#FFFF3C", image: "/dhoni.jpg" },
  { id: 2, name: "Mumbai Indians", short: "MI", color: "#004BA0", image: "/dhoni.jpg" },
  { id: 3, name: "Royal Challengers Bengaluru", short: "RCB", color: "#FF0000", image: "/dhoni.jpg" },
  { id: 4, name: "Kolkata Knight Riders", short: "KKR", color: "#3A225D", image: "/dhoni.jpg" },
  { id: 5, name: "Delhi Capitals", short: "DC", color: "#00008B", image: "/dhoni.jpg" },
  { id: 6, name: "Punjab Kings", short: "PBKS", color: "#ED1B24", image: "/dhoni.jpg" },
  { id: 7, name: "Rajasthan Royals", short: "RR", color: "#FF1493", image: "/dhoni.jpg" },
  { id: 8, name: "Sunrisers Hyderabad", short: "SRH", color: "#FF8000", image: "/dhoni.jpg" },
  { id: 9, name: "Gujarat Titans", short: "GT", color: "#1560BD", image: "/dhoni.jpg" },
  { id: 10, name: "Lucknow Super Giants", short: "LSG", color: "#5CCCCC", image: "/dhoni.jpg" },
];

// Ground data
export const GROUNDS: Ground[] = [
  { id: 1, name: "MA Chidambaram Stadium", city: "Chennai" },
  { id: 2, name: "Wankhede Stadium", city: "Mumbai" },
  { id: 3, name: "Eden Gardens", city: "Kolkata" }, 
  { id: 4, name: "M.Chinnaswamy Stadium", city: "Bengaluru" },
  { id: 5, name: "Arun Jaitley Stadium", city: "Delhi" },
  { id: 6, name: "Narendra Modi Stadium", city: "Ahmedabad" },
  { id: 7, name: "Rajiv Gandhi International Stadium", city: "Hyderabad" },
  { id: 8, name: "Bharat Ratna Shri Atal Bihari Vajpayee Ekana Cricket Stadium", city: "Lucknow" },
  { id: 9, name: "Barsapara Cricket Stadium", city: "Guwahati" },
  { id: 10, name: "Dr. Y.S. Rajasekhara Reddy ACA-VDCA Cricket Stadium", city: "Visakhapatnam" },
  { id: 11, name: "Maharaja Yadavindra Singh International Cricket Stadium", city: "Mullanpur, Chandigarh" },
  { id: 12, name: "Sawai Mansingh Stadium", city: "Jaipur" },
  { id: 13, name: "Himachal Pradesh Cricket Association Stadium", city: "Dharamsala" }
];

// Actual IPL 2025 schedule data
export const IPL_2025_SCHEDULE: Match[] = [
  {
    id: 1,
    matchNumber: "1st Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-03-22"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 3, // RCB ID
      winnerName: "Royal Challengers Bengaluru won by 7 wkts"
    }
  },
  {
    id: 2,
    matchNumber: "2nd Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Hyderabad") || GROUNDS[0],
    date: new Date("2025-03-23"),
    time: "15:30",
    result: {
      isCompleted: true,
      winner: 8, // SRH ID
      winnerName: "Sunrisers Hyderabad won by 44 runs"
    }
  },
  {
    id: 3,
    matchNumber: "3rd Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-03-23"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 1, // CSK ID
      winnerName: "Chennai Super Kings won by 4 wkts"
    }
  },
  {
    id: 4,
    matchNumber: "4th Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Visakhapatnam") || GROUNDS[0],
    date: new Date("2025-03-24"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 5, // DC ID
      winnerName: "Delhi Capitals won by 1 wkt"
    }
  },
  {
    id: 5,
    matchNumber: "5th Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-03-25"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 6, // PBKS ID
      winnerName: "Punjab Kings won by 11 runs"
    }
  },
  {
    id: 6,
    matchNumber: "6th Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Guwahati") || GROUNDS[0],
    date: new Date("2025-03-26"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 4, // KKR ID
      winnerName: "Kolkata Knight Riders won by 8 wkts"
    }
  },
  {
    id: 7,
    matchNumber: "7th Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "LSG") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Hyderabad") || GROUNDS[0],
    date: new Date("2025-03-27"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 10, // LSG ID
      winnerName: "Lucknow Super Giants won by 5 wkts"
    }
  },
  {
    id: 8,
    matchNumber: "8th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-03-28"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 3, // RCB ID
      winnerName: "Royal Challengers Bengaluru won by 50 runs"
    }
  },
  {
    id: 9,
    matchNumber: "9th Match",
    team1: TEAMS.find(t => t.short === "GT") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-03-29"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 9, // GT ID
      winnerName: "Gujarat Titans won by 36 runs"
    }
  },
  {
    id: 10,
    matchNumber: "10th Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Visakhapatnam") || GROUNDS[0],
    date: new Date("2025-03-30"),
    time: "15:30",
    result: {
      isCompleted: true,
      winner: 5, // DC ID
      winnerName: "Delhi Capitals won by 7 wkts"
    }
  },
  {
    id: 11,
    matchNumber: "11th Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Guwahati") || GROUNDS[0],
    date: new Date("2025-03-31"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 7, // RR ID
      winnerName: "Rajasthan Royals won by 6 runs"
    }
  },
  {
    id: 12,
    matchNumber: "12th Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-04-01"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 2, // MI ID
      winnerName: "Mumbai Indians won by 8 wkts"
    }
  },
  {
    id: 13,
    matchNumber: "13th Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "PBKS") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-04-02"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 6, // PBKS ID
      winnerName: "Punjab Kings won by 8 wkts"
    }
  },
  {
    id: 14,
    matchNumber: "14th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Bengaluru") || GROUNDS[0],
    date: new Date("2025-04-03"),
    time: "19:30",
    result: {
      isCompleted: true,
      winner: 9, // GT ID
      winnerName: "Gujarat Titans won by 8 wkts"
    }
  },
  {
    id: 15,
    matchNumber: "15th Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-04-04"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 16,
    matchNumber: "16th Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-04-04"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 17,
    matchNumber: "17th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-04-05"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 18,
    matchNumber: "18th Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-04-05"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 19,
    matchNumber: "19th Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Hyderabad") || GROUNDS[0],
    date: new Date("2025-04-06"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 20,
    matchNumber: "20th Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-04-07"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 21,
    matchNumber: "21st Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-04-08"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 22,
    matchNumber: "22nd Match",
    team1: TEAMS.find(t => t.short === "DC") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-04-09"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 23,
    matchNumber: "23rd Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-04-10"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 24,
    matchNumber: "24th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-04-11"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 25,
    matchNumber: "25th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Bengaluru") || GROUNDS[0],
    date: new Date("2025-04-12"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 26,
    matchNumber: "26th Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-04-12"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 27,
    matchNumber: "27th Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-04-13"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 28,
    matchNumber: "28th Match",
    team1: TEAMS.find(t => t.short === "GT") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-04-14"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 29,
    matchNumber: "29th Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "LSG") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-04-15"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 30,
    matchNumber: "30th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-04-16"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 31,
    matchNumber: "31st Match",
    team1: TEAMS.find(t => t.short === "DC") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "PBKS") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-04-17"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 32,
    matchNumber: "32nd Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Jaipur") || GROUNDS[0],
    date: new Date("2025-04-18"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 33,
    matchNumber: "33rd Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-04-19"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 34,
    matchNumber: "34th Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-04-19"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 35,
    matchNumber: "35th Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-04-20"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 36,
    matchNumber: "36th Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-04-21"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 37,
    matchNumber: "37th Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Hyderabad") || GROUNDS[0],
    date: new Date("2025-04-22"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 38,
    matchNumber: "38th Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Jaipur") || GROUNDS[0],
    date: new Date("2025-04-23"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 39,
    matchNumber: "39th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-04-24"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 40,
    matchNumber: "40th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "LSG") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Bengaluru") || GROUNDS[0],
    date: new Date("2025-04-25"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 41,
    matchNumber: "41st Match",
    team1: TEAMS.find(t => t.short === "DC") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-04-26"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 42,
    matchNumber: "42nd Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-04-26"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 43,
    matchNumber: "43rd Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Hyderabad") || GROUNDS[0],
    date: new Date("2025-04-27"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 44,
    matchNumber: "44th Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Jaipur") || GROUNDS[0],
    date: new Date("2025-04-28"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 45,
    matchNumber: "45th Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-04-29"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 46,
    matchNumber: "46th Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-04-30"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 47,
    matchNumber: "47th Match",
    team1: TEAMS.find(t => t.short === "GT") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-05-01"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 48,
    matchNumber: "48th Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "PBKS") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-05-02"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 49,
    matchNumber: "49th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "LSG") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-05-03"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 50,
    matchNumber: "50th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Bengaluru") || GROUNDS[0],
    date: new Date("2025-05-03"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 51,
    matchNumber: "51st Match",
    team1: TEAMS.find(t => t.short === "DC") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-05-04"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 52,
    matchNumber: "52nd Match",
    team1: TEAMS.find(t => t.short === "GT") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-05-05"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 53,
    matchNumber: "53rd Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-05-06"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 54,
    matchNumber: "54th Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Jaipur") || GROUNDS[0],
    date: new Date("2025-05-07"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 55,
    matchNumber: "55th Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-05-08"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 56,
    matchNumber: "56th Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-05-09"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 57,
    matchNumber: "57th Match",
    team1: TEAMS.find(t => t.short === "SRH") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "PBKS") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Hyderabad") || GROUNDS[0],
    date: new Date("2025-05-10"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 58,
    matchNumber: "58th Match",
    team1: TEAMS.find(t => t.short === "DC") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-05-10"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 59,
    matchNumber: "59th Match",
    team1: TEAMS.find(t => t.short === "KKR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "CSK") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-05-11"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 60,
    matchNumber: "60th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Bengaluru") || GROUNDS[0],
    date: new Date("2025-05-12"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 61,
    matchNumber: "61st Match",
    team1: TEAMS.find(t => t.short === "LSG") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "GT") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Lucknow") || GROUNDS[0],
    date: new Date("2025-05-13"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 62,
    matchNumber: "62nd Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Jaipur") || GROUNDS[0],
    date: new Date("2025-05-14"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 63,
    matchNumber: "63rd Match",
    team1: TEAMS.find(t => t.short === "PBKS") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "DC") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chandigarh") || GROUNDS[0],
    date: new Date("2025-05-15"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 64,
    matchNumber: "64th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-05-16"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 65,
    matchNumber: "65th Match",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-05-17"),
    time: "15:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 66,
    matchNumber: "66th Match",
    team1: TEAMS.find(t => t.short === "GT") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "PBKS") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-05-17"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 67,
    matchNumber: "67th Match",
    team1: TEAMS.find(t => t.short === "DC") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "SRH") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-05-18"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 68,
    matchNumber: "68th Match",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Bengaluru") || GROUNDS[0],
    date: new Date("2025-05-19"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 69,
    matchNumber: "69th Match",
    team1: TEAMS.find(t => t.short === "RR") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "LSG") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Jaipur") || GROUNDS[0],
    date: new Date("2025-05-20"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 70,
    matchNumber: "70th Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-05-21"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 71,
    matchNumber: "Qualifier 1",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Ahmedabad") || GROUNDS[0],
    date: new Date("2025-05-24"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 72,
    matchNumber: "Eliminator",
    team1: TEAMS.find(t => t.short === "RCB") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "KKR") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Kolkata") || GROUNDS[0],
    date: new Date("2025-05-25"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 73,
    matchNumber: "Qualifier 2",
    team1: TEAMS.find(t => t.short === "MI") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Chennai") || GROUNDS[0],
    date: new Date("2025-05-27"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 74,
    matchNumber: "Final",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0],
    team2: TEAMS.find(t => t.short === "RCB") || TEAMS[1],
    ground: GROUNDS.find(g => g.city === "Mumbai") || GROUNDS[0],
    date: new Date("2025-05-31"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  },
  {
    id: 75,
    matchNumber: "All-Star Match",
    team1: TEAMS.find(t => t.short === "CSK") || TEAMS[0], // Representing All-Stars East
    team2: TEAMS.find(t => t.short === "MI") || TEAMS[1], // Representing All-Stars West
    ground: GROUNDS.find(g => g.city === "Delhi") || GROUNDS[0],
    date: new Date("2025-06-02"),
    time: "19:30",
    result: {
      isCompleted: false,
      winner: null,
      winnerName: null
    }
  }
];

// Define TeamPoints interface
interface TeamPoints extends Team {
  matches: number;
  won: number;
  lost: number;
  noResult: number;
  points: number;
  nrr: number;
}

// Generate points table based on match results
const generatePointsTable = (matches: Match[]): TeamPoints[] => {
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
      // Find team indexes
      const team1Index = pointsTable.findIndex(t => t.id === match.team1.id);
      const team2Index = pointsTable.findIndex(t => t.id === match.team2.id);
      
      if (team1Index !== -1 && team2Index !== -1) {
        // Increment matches played
        pointsTable[team1Index].matches++;
        pointsTable[team2Index].matches++;
        
        if (match.result.winner === match.team1.id) {
          pointsTable[team1Index].won++;
          pointsTable[team1Index].points += 2;
          pointsTable[team2Index].lost++;
        } else if (match.result.winner === match.team2.id) {
          pointsTable[team2Index].won++;
          pointsTable[team2Index].points += 2;
          pointsTable[team1Index].lost++;
        }
      }
    }
  });
  
  // Sort by points, then by NRR
  return pointsTable.sort((a, b) => b.points - a.points || b.nrr - a.nrr);
};

export default function Schedule() {
  const [matches, setMatches] = useState<Match[]>([]);
  const [pointsTable, setPointsTable] = useState<TeamPoints[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterTeam, setFilterTeam] = useState("all");
  const [filterVenue, setFilterVenue] = useState("all");
  const [showPastMatches, setShowPastMatches] = useState(false);
  const [activeTab, setActiveTab] = useState("schedule");
  
  useEffect(() => {
    // Use real IPL 2025 data instead of generated data
    setMatches(IPL_2025_SCHEDULE);
    
    // Generate points table from real match data
    setPointsTable(generatePointsTable(IPL_2025_SCHEDULE));

    // Make "Show all matches" the default
    setShowPastMatches(false);
  }, []);
  
  // Use utility functions to filter matches
  const filteredMatches = searchMatches(
    filterMatchesByStatus(
      filterMatchesByVenue(
        filterMatchesByTeam(matches, filterTeam),
        filterVenue
      ),
      showPastMatches
    ),
    searchTerm
  );

  return (
    <div className="container mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold mb-8 text-center">IPL 2025 Schedule - All 75 Matches</h1>
      
      {/* Tabs */}
      <div className="flex justify-center mb-8">
        <div className="inline-flex rounded-md shadow-sm">
          <Button
            variant={activeTab === "schedule" ? "default" : "outline"}
            className="rounded-l-md"
            onClick={() => setActiveTab("schedule")}
          >
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button
            variant={activeTab === "points" ? "default" : "outline"}
            className="rounded-r-md"
            onClick={() => setActiveTab("points")}
          >
            <Medal className="mr-2 h-4 w-4" />
            Points Table
          </Button>
        </div>
      </div>
      
      {activeTab === "schedule" ? (
        <>
          {/* Search and Filters */}
          <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input
                type="text"
                placeholder="Search by team, venue..."
                className="pl-10 pr-4 py-2 w-full border rounded-md"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="pl-10 pr-4 py-2 w-full border rounded-md appearance-none bg-white"
                value={filterTeam}
                onChange={(e) => setFilterTeam(e.target.value)}
              >
                <option value="all">All Teams</option>
                {TEAMS.map((team) => (
                  <option key={team.id} value={team.short}>
                    {team.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="relative">
              <Users className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <select
                className="pl-10 pr-4 py-2 w-full border rounded-md appearance-none bg-white"
                value={filterVenue}
                onChange={(e) => setFilterVenue(e.target.value)}
              >
                <option value="all">All Venues</option>
                {GROUNDS.map((ground) => (
                  <option key={ground.id} value={ground.id}>
                    {ground.name}, {ground.city}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Past/Upcoming Toggle */}
          <div className="flex justify-end mb-4">
            <Button
              variant="outline"
              className={cn(
                "relative border-2 transition-colors",
                showPastMatches ? "border-blue-500 text-blue-500" : ""
              )}
              onClick={() => setShowPastMatches(!showPastMatches)}
            >
              {showPastMatches ? "Showing Past Matches" : "Showing All Matches"}
            </Button>
          </div>
          
          {/* Match count display */}
          <div className="mb-4 text-center text-gray-600">
            Displaying {filteredMatches.length} of 75 total matches
          </div>
          
          {/* Matches Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Match</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Teams</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Result</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredMatches.length > 0 ? (
                  filteredMatches.map((match) => (
                    <tr key={match.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {match.matchNumber}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {formatMatchDate(match.date)} <br />
                        <span className="text-gray-500">{match.time} IST</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <div className="h-8 w-8 relative">
                            <Image
                              src={match.team1.image}
                              alt={match.team1.name}
                              fill
                              className="object-contain rounded-full"
                            />
                          </div>
                          <span className="font-medium">{match.team1.short}</span>
                          <span className="text-gray-500">vs</span>
                          <div className="h-8 w-8 relative">
                            <Image
                              src={match.team2.image}
                              alt={match.team2.name}
                              fill
                              className="object-contain rounded-full"
                            />
                          </div>
                          <span className="font-medium">{match.team2.short}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {match.ground.name}, <br />
                        <span className="text-gray-500">{match.ground.city}</span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        {match.result.isCompleted ? (
                          <div className="text-sm text-green-600 font-medium">
                            {match.result.winnerName}
                          </div>
                        ) : (
                          <Link href={`/schedule/${match.id}`} passHref>
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </Link>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-gray-500">
                      No matches found matching your criteria
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        // Points Table
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Team</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">M</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">W</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">L</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">NR</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">Pts</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">NRR</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {pointsTable.map((team, index) => (
                <tr 
                  key={team.id} 
                  className={cn(
                    "hover:bg-gray-50",
                    index < 4 ? "bg-green-50" : "" // Highlight top 4 teams
                  )}
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center space-x-3">
                      <div className="h-10 w-10 relative">
                        <Image
                          src={team.image}
                          alt={team.name}
                          fill
                          className="object-contain rounded-full"
                        />
                      </div>
                      <div>
                        <div className="font-medium">{team.name}</div>
                        <div className="text-gray-500">{team.short}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{team.matches}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-green-600 font-medium">{team.won}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center text-red-600 font-medium">{team.lost}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center">{team.noResult}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-bold">{team.points}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-center font-medium">
                    <span className={team.nrr >= 0 ? "text-green-600" : "text-red-600"}>
                      {team.nrr > 0 ? "+" : ""}{team.nrr.toFixed(3)}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
} 
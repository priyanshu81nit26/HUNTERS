import { TEAMS, GROUNDS } from "@/app/schedule/page";

// Define Team and Ground types to avoid undefined issues
export type Team = {
  id: number;
  name: string;
  short: string;
  color: string;
  image: string;
};

export type Ground = {
  id: number;
  name: string;
  city: string;
};

// Define types
export interface Match {
  id: number;
  matchNumber: string;
  team1: Team;
  team2: Team;
  ground: Ground;
  date: Date;
  time: string;
  result: {
    isCompleted: boolean;
    winner: number | null;
    winnerName: string | null;
  };
}

// Function to fetch IPL 2025 schedule data
export async function getIPLSchedule(): Promise<Match[]> {
  // This could be fetched from an API in the future
  // For now, we'll use the data from the schedule page
  // You can replace this with an actual API call later
  
  // Import the schedule data from the page component
  const { IPL_2025_SCHEDULE } = await import("@/app/schedule/page");
  return IPL_2025_SCHEDULE;
}

// Filter matches by team
export function filterMatchesByTeam(matches: Match[], teamCode: string): Match[] {
  if (teamCode === "all") return matches;
  return matches.filter(
    (match) => match.team1?.short === teamCode || match.team2?.short === teamCode
  );
}

// Filter matches by venue
export function filterMatchesByVenue(matches: Match[], venueId: string): Match[] {
  if (venueId === "all") return matches;
  const venueIdNum = parseInt(venueId);
  return matches.filter((match) => match.ground?.id === venueIdNum);
}

// Filter matches by status (past/upcoming)
export function filterMatchesByStatus(matches: Match[], showPastOnly: boolean): Match[] {
  if (!showPastOnly) return matches;
  return matches.filter((match) => match.result?.isCompleted);
}

// Search matches by terms
export function searchMatches(matches: Match[], searchTerm: string): Match[] {
  if (!searchTerm) return matches;
  
  const searchLower = searchTerm.toLowerCase();
  return matches.filter(match => {
    const matchTeam1Name = match.team1?.name.toLowerCase() || "";
    const matchTeam2Name = match.team2?.name.toLowerCase() || "";
    const matchVenueName = match.ground?.name.toLowerCase() || "";
    const matchVenueCity = match.ground?.city.toLowerCase() || "";
    const matchDate = match.date ? new Date(match.date).toLocaleDateString() : "";
    
    return (
      matchTeam1Name.includes(searchLower) || 
      matchTeam2Name.includes(searchLower) || 
      matchVenueName.includes(searchLower) ||
      matchVenueCity.includes(searchLower) ||
      matchDate.includes(searchLower)
    );
  });
}

// Format date for display
export function formatMatchDate(date: Date): string {
  return new Date(date).toLocaleDateString("en-US", {
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

// Get team details by ID
export function getTeamById(teamId: number) {
  return TEAMS.find(team => team.id === teamId);
} 
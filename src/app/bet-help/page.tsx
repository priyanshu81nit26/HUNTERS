"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Trophy,
  Timer,
  Circle
} from "lucide-react";

// Current match information
const currentMatch = {
  team1: "Mumbai Indians",
  team2: "Chennai Super Kings",
  venue: "Wankhede Stadium, Mumbai",
  date: "March 21, 2025",
  currentScore: "145/4",
  currentOver: "16.2",
  currentRunRate: "8.87",
  requiredRunRate: "N/A",
  battingTeam: "Mumbai Indians",
  bowlingTeam: "Chennai Super Kings"
};

// OverPrediction component with animations
function OverPrediction({ setIsLoading }: { setIsLoading: (loading: boolean) => void }) {
  const currentOverNum = parseFloat(currentMatch.currentOver);
  
  // Prediction calculations with more realistic ranges based on current match state
  const runsInOver = Math.round(Math.random() * (14 - 4) + 4); // 4-14 runs per over
  const sixesInOver = Math.random() > 0.7 ? 1 : 0; // 30% chance of six
  const wicketsInOver = Math.random() > 0.85 ? 1 : 0; // 15% chance of wicket
  const boundariesInOver = Math.round(Math.random() * 2); // 0-2 boundaries

  // Auto-refresh predictions every 30 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      // Force component re-render
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 500);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6">
      {/* Teams Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Trophy className="h-5 w-5 text-blue-500" />
          <div>
            <span className="font-bold text-foreground">{currentMatch.battingTeam}</span>
            <span className="text-muted-foreground mx-2">vs</span>
            <span className="text-muted-foreground">{currentMatch.bowlingTeam}</span>
          </div>
        </div>
        <div className="text-sm text-muted-foreground">
          Over {Math.ceil(currentOverNum)}
        </div>
      </div>

      {/* Prediction Questions */}
      <div className="space-y-6">
        {/* Runs Question */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-sm font-medium text-foreground">How many runs in this over?</h3>
          <motion.div 
            className="bg-accent/30 p-4 rounded-lg flex items-center justify-between"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.3 }}
          >
            <span className="text-2xl font-bold text-blue-500">{runsInOver}</span>
            <motion.div 
              className="h-2 w-24 bg-muted rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="h-full bg-blue-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(runsInOver/14) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.2 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Sixes Question */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <h3 className="text-sm font-medium text-foreground">Will there be a six?</h3>
          <motion.div 
            className="bg-accent/30 p-4 rounded-lg flex items-center justify-between"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.5 }}
          >
            <span className="text-2xl font-bold text-green-500">{sixesInOver ? "YES" : "NO"}</span>
            <motion.div 
              className="h-2 w-24 bg-muted rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="h-full bg-green-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: sixesInOver ? "80%" : "20%" }}
                transition={{ duration: 0.8, delay: 0.4 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Wickets Question */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-sm font-medium text-foreground">Will there be a wicket?</h3>
          <motion.div 
            className="bg-accent/30 p-4 rounded-lg flex items-center justify-between"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.7 }}
          >
            <span className="text-2xl font-bold text-red-500">{wicketsInOver ? "YES" : "NO"}</span>
            <motion.div 
              className="h-2 w-24 bg-muted rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="h-full bg-red-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: wicketsInOver ? "90%" : "15%" }}
                transition={{ duration: 0.8, delay: 0.6 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Boundaries Question */}
        <motion.div 
          className="space-y-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h3 className="text-sm font-medium text-foreground">How many boundaries?</h3>
          <motion.div 
            className="bg-accent/30 p-4 rounded-lg flex items-center justify-between"
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.2, delay: 0.9 }}
          >
            <span className="text-2xl font-bold text-purple-500">{boundariesInOver}</span>
            <motion.div 
              className="h-2 w-24 bg-muted rounded-full overflow-hidden"
              initial={{ width: 0 }}
              animate={{ width: "6rem" }}
              transition={{ duration: 0.8 }}
            >
              <motion.div 
                className="h-full bg-purple-500 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${(boundariesInOver/2) * 100}%` }}
                transition={{ duration: 0.8, delay: 0.8 }}
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}

type OverScore = {
  score: string;
  runRate: number;
};

type OverScores = {
  [key: string]: OverScore;
};

const matchPredictions = {
  overScores: {
    '5': { score: "45/1", runRate: 9.0 },
    '10': { score: "92/2", runRate: 9.2 },
    '15': { score: "138/3", runRate: 9.2 },
    '20': { score: "186/5", runRate: 9.3 }
  } as OverScores,
  firstInningsScore: {
    predicted: "186-195",
    confidence: 78,
    factors: ["Pitch favors batting", "Strong top order", "Dew factor minimal"]
  },
  matchWinner: {
    team: "Mumbai Indians",
    winProbability: 65,
    keyFactors: ["Better batting depth", "Home advantage", "Historical record"]
  },
  sixesPrediction: {
    team: "Mumbai Indians",
    predictedCount: 12,
    confidence: 72,
    topHitter: "Suryakumar Yadav"
  },
  wicketsPrediction: {
    team: "Chennai Super Kings",
    predictedCount: 7,
    confidence: 68,
    topBowler: "Ravindra Jadeja"
  },
  playerPerformance: {
    topScorer: {
      name: "Suryakumar Yadav",
      predictedScore: "75-85",
      confidence: 82
    },
    topBowler: {
      name: "Ravindra Jadeja",
      predictedWickets: "2-3",
      confidence: 75
    },
    playerOfMatch: {
      name: "Suryakumar Yadav",
      probability: 35,
      reason: "Strong current form and historical performance at venue"
    }
  }
};

export default function BetHelpPage() {
  const [selectedOvers, setSelectedOvers] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="pt-16 pb-10 min-h-screen bg-background">
      <div className="container mx-auto p-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">Over Predictions</h1>
          <span className="text-muted-foreground">Real-time predictions for the current over</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Panel - Over Predictions */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Current Over Analysis</CardTitle>
                <CardDescription>
                  <span className="flex items-center justify-between">
                    <span className="text-xs mt-1 flex items-center">
                      <Timer className="h-3 w-3 mr-1" /> Live Predictions
                    </span>
                    <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded animate-pulse">
                      LIVE
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                    <span className="text-muted-foreground">Analyzing current over...</span>
                  </div>
                ) : (
                  <OverPrediction setIsLoading={setIsLoading} />
                )}
              </CardContent>
            </Card>
          </div>

          {/* Middle Panel - Live Scoreboard */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader className="bg-accent/50">
                <div className="flex justify-between items-center">
                  <CardTitle>Live Scoreboard</CardTitle>
                  <span className="px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded animate-pulse">
                    LIVE
                  </span>
                </div>
                <CardDescription>
                  <span>{currentMatch.team1} vs {currentMatch.team2}</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-4">
                {isLoading ? (
                  <div className="flex flex-col items-center justify-center py-10">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mb-3"></div>
                    <span className="text-muted-foreground">Loading match data...</span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="border-b border-border pb-3">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold text-foreground">{currentMatch.team1}</span>
                        <span className="font-bold text-foreground">145/4</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        16.2 overs | Current RR: 8.87 | Required RR: N/A
                      </span>
                    </div>
                    
                    <div className="space-y-1 text-sm">
                      <div className="flex justify-between">
                        <span className="text-foreground">Suryakumar Yadav*</span>
                        <span className="text-foreground">68 (42)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-foreground">Hardik Pandya*</span>
                        <span className="text-foreground">34 (22)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Rohit Sharma</span>
                        <span className="text-muted-foreground">22 (18)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Tilak Varma</span>
                        <span className="text-muted-foreground">14 (10)</span>
                      </div>
                    </div>
                    
                    <div className="border-t border-border pt-3 mt-3">
                      <div className="text-sm space-y-1">
                        <div className="flex justify-between">
                          <span className="text-foreground">Bowling</span>
                          <span className="text-foreground">O-M-R-W</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Deepak Chahar*</span>
                          <span className="text-foreground">3.2-0-28-1</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-foreground">Ravindra Jadeja</span>
                          <span className="text-foreground">4-0-22-2</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="bg-muted p-2 rounded-md text-xs text-center text-muted-foreground">
                      Last 5 balls: 1 4 W 2 6
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Right Panel - Detailed Predictions */}
          <div className="lg:col-span-1">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle>Match Predictions</CardTitle>
                <CardDescription>
                  <span className="flex items-center justify-between">
                    <span>Comprehensive match analysis</span>
                    <span className="px-2 py-1 bg-blue-500 text-white text-xs font-semibold rounded">
                      AI POWERED
                    </span>
                  </span>
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6 max-h-[600px] overflow-y-auto pr-1">
                  {/* Over Score Predictor */}
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">Score Predictor</h3>
                      <Select 
                        value={selectedOvers} 
                        onValueChange={setSelectedOvers}
                      >
                        <SelectTrigger className="w-[100px]">
                          <SelectValue placeholder="Over" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            {[5, 10, 15, 20].map(over => (
                              <SelectItem key={over} value={over.toString()}>
                                Over {over}
                              </SelectItem>
                            ))}
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {selectedOvers && (
                      <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-accent/30 p-4 rounded-lg space-y-2"
                      >
                        <div className="flex justify-between items-center">
                          <span className="text-lg font-bold text-foreground">
                            {matchPredictions.overScores[selectedOvers].score}
                          </span>
                          <span className="text-sm text-muted-foreground">
                            RR: {matchPredictions.overScores[selectedOvers].runRate}
                          </span>
                        </div>
                      </motion.div>
                    )}
                  </div>

                  {/* First Innings Score */}
                  <motion.div 
                    className="space-y-3 border-t pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                  >
                    <h3 className="font-semibold text-foreground">First Innings Score</h3>
                    <div className="bg-accent/30 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-blue-500">
                          {matchPredictions.firstInningsScore.predicted}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-blue-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${matchPredictions.firstInningsScore.confidence}%` }}
                            />
                          </div>
                          <span className="text-sm text-blue-500">
                            {matchPredictions.firstInningsScore.confidence}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {matchPredictions.firstInningsScore.factors.map((factor, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Circle className="h-1 w-1" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Match Winner */}
                  <motion.div 
                    className="space-y-3 border-t pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  >
                    <h3 className="font-semibold text-foreground">Match Winner</h3>
                    <div className="bg-accent/30 p-4 rounded-lg space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-lg font-bold text-green-500">
                          {matchPredictions.matchWinner.team}
                        </span>
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-20 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-green-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${matchPredictions.matchWinner.winProbability}%` }}
                            />
                          </div>
                          <span className="text-sm text-green-500">
                            {matchPredictions.matchWinner.winProbability}%
                          </span>
                        </div>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {matchPredictions.matchWinner.keyFactors.map((factor, i) => (
                          <div key={i} className="flex items-center gap-2">
                            <Circle className="h-1 w-1" />
                            <span>{factor}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>

                  {/* Team Predictions */}
                  <motion.div 
                    className="space-y-3 border-t pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                  >
                    <h3 className="font-semibold text-foreground">Team Predictions</h3>
                    <div className="space-y-3">
                      {/* Sixes */}
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Most Sixes</span>
                          <span className="text-sm text-purple-500 font-medium">
                            {matchPredictions.sixesPrediction.predictedCount} sixes
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {matchPredictions.sixesPrediction.team} ({matchPredictions.sixesPrediction.confidence}% confidence)
                        </div>
                        <div className="text-xs text-purple-500 mt-1">
                          Top hitter: {matchPredictions.sixesPrediction.topHitter}
                        </div>
                      </div>

                      {/* Wickets */}
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Most Wickets</span>
                          <span className="text-sm text-red-500 font-medium">
                            {matchPredictions.wicketsPrediction.predictedCount} wickets
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {matchPredictions.wicketsPrediction.team} ({matchPredictions.wicketsPrediction.confidence}% confidence)
                        </div>
                        <div className="text-xs text-red-500 mt-1">
                          Top bowler: {matchPredictions.wicketsPrediction.topBowler}
                        </div>
                      </div>
                    </div>
                  </motion.div>

                  {/* Player Predictions */}
                  <motion.div 
                    className="space-y-3 border-t pt-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                  >
                    <h3 className="font-semibold text-foreground">Player Predictions</h3>
                    <div className="space-y-3">
                      {/* Top Scorer */}
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Top Scorer</span>
                          <span className="text-sm text-orange-500 font-medium">
                            {matchPredictions.playerPerformance.topScorer.predictedScore} runs
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {matchPredictions.playerPerformance.topScorer.name}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <div className="h-1 w-16 bg-muted rounded-full overflow-hidden">
                            <motion.div 
                              className="h-full bg-orange-500 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${matchPredictions.playerPerformance.topScorer.confidence}%` }}
                            />
                          </div>
                          <span className="text-xs text-orange-500">
                            {matchPredictions.playerPerformance.topScorer.confidence}%
                          </span>
                        </div>
                      </div>

                      {/* Player of Match */}
                      <div className="bg-accent/30 p-4 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium">Player of Match</span>
                          <span className="text-sm text-yellow-500 font-medium">
                            {matchPredictions.playerPerformance.playerOfMatch.probability}% probability
                          </span>
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {matchPredictions.playerPerformance.playerOfMatch.name}
                        </div>
                        <div className="text-xs text-yellow-500 mt-1">
                          {matchPredictions.playerPerformance.playerOfMatch.reason}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
} 
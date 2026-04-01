import { durationFormatter } from "human-readable";

//
// Exported type definitions...
//
export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;

    // turnCount: number;
    //keep timestamps each time the turn is chaged
    //for example: ["2024-06-01T12:00:00Z", "2024-06-01T12:05:00Z", ...]
    turnEndTimestamps: string[];
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
    shortestTurn: string;
    longestTurn: string;
    avgTurnsPerGame: string;
};

export type LeaderboardEntry = {
    wins: number;
    losses: number;
    avg: string;
    name: string;
};

//
// Exported functions...
//
export const getGeneralFacts = (games: GameResult[]): GeneralFacts => {

    if (games.length === 0) {
        return {
            lastPlayed: "N/A",
            totalGames: 0,
            shortestGame: "N/A",
            longestGame: "N/A",
            shortestTurn: "N/A",
            longestTurn: "N/A",
            avgTurnsPerGame: "N/A"
        };
    }

    const now = Date.now();

    const gamesLastPlayedAgoInMilliseconds = games.map(
        x => now - Date.parse(x.end)
    );

    const mostRecentlyPlayedInMilliseconds = Math.min(
        ...gamesLastPlayedAgoInMilliseconds
    );

    const gameDurationsInMilliseconds = games.map(
        x => Date.parse(x.end) - Date.parse(x.start)
    );

    const totalTurns = games.reduce(
        (acc, x) => acc + (x.turnEndTimestamps?.length || 0),
        0,
    );

    const [shortestTurnMs, longestTurnMs] = getLongestAndShortestTurns(games);

    return {
        lastPlayed: `${formatLastPlayed(
            mostRecentlyPlayedInMilliseconds
        )} ago`,
        totalGames: games.length,
        shortestGame: formatDuration(
            Math.min(...gameDurationsInMilliseconds) 
        ),
        longestGame: formatDuration(
            Math.max(...gameDurationsInMilliseconds) 
        ),
        shortestTurn: formatDuration(shortestTurnMs),
        longestTurn: formatDuration(longestTurnMs),
        avgTurnsPerGame: (totalTurns / games.length).toFixed(2),
    };
};

export const getLongestAndShortestTurns = (
    games: GameResult[]
): [shortestDuration: number, longestDuration: number] => {
    
    const allTurnDurations = games.flatMap(game => {
        const timestamps = [game.start, ...(game.turnEndTimestamps || [])];
        return timestamps.slice(0, -1).map((ts, i) =>
            Date.parse(timestamps[i + 1]) - Date.parse(ts)
        );
    });

    if (allTurnDurations.length === 0) {
        return [0, 0];
    }

    return [Math.min(...allTurnDurations), Math.max(...allTurnDurations)];
};

export const getLeaderboard = (
    games: GameResult[]
): LeaderboardEntry[] => getPreviousPlayers(games)
    .map(
        x => ({
            ...getLeaderboardEntry(
                games,
                x,
            )
        })
    )
    .sort(
        (a, b) => a.avg == b.avg
            ? a.wins == 0 && b.wins == 0
                ? (a.wins + a.losses) - (b.wins + b.losses)
                : (b.wins + b.losses) - (a.wins + a.losses)
            : Number.parseFloat(b.avg) - Number.parseFloat(a.avg)
    )
;

export const getPreviousPlayers = (
    games: GameResult[]
) => games 
    .flatMap(
        x => x.players
    )
    .filter(
        (x, i, a) => i == a.findIndex(
            y => y == x
        )
    )
    .sort(
        (a, b) => a.localeCompare(b)
    )
;

//
// Helper functions...
//
const formatDuration = durationFormatter<string>();

const formatLastPlayed = durationFormatter<string>(
    {
        allowMultiples: [
            "y",
            "mo",
            "d",
        ],
    }
);

const getLeaderboardEntry = (
    games: GameResult[],
    player: string,
): LeaderboardEntry => {

    const countOfWins = games.filter(
        x => x.winner == player
    ).length;

    const totalGames = games.filter(
        x => x.players.some(
            y => y == player
        )
    ).length;

    const avg = totalGames > 0
        ? countOfWins / totalGames
        : 0
    ;

    return {
        wins: countOfWins,
        losses: totalGames - countOfWins,
        avg: `${avg.toFixed(3)}`,
        name: player
    };
};

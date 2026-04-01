import { durationFormatter } from "human-readable";

//
// Exported type definitions...
//
export type GameResult = {
    winner: string;
    players: string[];

    start: string;
    end: string;

    // Keep timestamps each time the turn is changed...
    // For example: ["20260401T13:12:22:234", "20260401T13:15:22:234"]
    turnEndTimestamps: string[];
};

export type GeneralFacts = {
    lastPlayed: string;
    totalGames: number;
    shortestGame: string;
    longestGame: string;
    avgTurnsPerGame: string;
    shortestTurn: string;
    longestTurn: string;
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
            avgTurnsPerGame: "N/A",
            shortestTurn: "N/A",
            longestTurn: "N/A",
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
        (acc, x) => acc + x.turnEndTimestamps.length,
        0,
    );
    // console.log(
    //     gamesLastPlayedAgoInMilliseconds
    // );

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
        avgTurnsPerGame: (totalTurns / games.length).toFixed(2),
        ...getTurnDurations(games),
    };
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

const getTurnDurations = (games: GameResult[]): Pick<GeneralFacts, "shortestTurn" | "longestTurn"> => {
    const allTurnDurations = games.flatMap(game => {
        if (game.turnEndTimestamps.length === 0) {
            return [];
        }

        return [
            Date.parse(game.turnEndTimestamps[0]) - Date.parse(game.start),
            ...game.turnEndTimestamps.slice(1).map((timestamp, index) =>
                Date.parse(timestamp) - Date.parse(game.turnEndTimestamps[index])
            ),
        ];
    });

    if (allTurnDurations.length === 0) {
        return { shortestTurn: "N/A", longestTurn: "N/A" };
    }

    return {
        shortestTurn: formatDuration(Math.min(...allTurnDurations)),
        longestTurn: formatDuration(Math.max(...allTurnDurations)),
    };
};

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



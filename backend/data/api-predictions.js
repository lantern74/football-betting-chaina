const axios = require("axios");
const { getFixtureID } = require("./api-headtohead"); // Adjust the path as needed

async function getPredictions() {
    try {
        // Get fixture IDs from getFixtureID
        const fixtureIDs = await getFixtureID();
        console.log("Original Fixture IDs:", fixtureIDs);

        // Map through all fixture IDs to ensure each ID has a corresponding win percentage
        const winPercents = await Promise.all(
            fixtureIDs.map(async (fixtureID) => {
                if (fixtureID === 'NULL') {
                    // Handle 'NULL' fixtureID with default values
                    return { fixtureID, homeWinPercent: "33%", awayWinPercent: "33%" };
                }

                const options = {
                    method: 'GET',
                    url: 'https://v3.football.api-sports.io/predictions',
                    params: { fixture: fixtureID },
                    headers: {
                        'x-rapidapi-host': 'v3.football.api-sports.io',
                        'x-rapidapi-key': '43984110ca9979e5fbc3d812d6808265'
                    }
                };

                try {
                    const response = await axios.request(options); // Await the axios request
                    const data = response.data;

                    if (data.response && data.response.length > 0) {
                        const homeWinPercent = data.response[0]?.predictions?.percent?.home || "33%";
                        const awayWinPercent = data.response[0]?.predictions?.percent?.away || "33%";
                        return { fixtureID, homeWinPercent, awayWinPercent }; // Return prediction data
                    } else {
                        return { fixtureID, homeWinPercent: "33%", awayWinPercent: "33%" };
                    }
                } catch (error) {
                    console.error(`Error fetching prediction for fixture ${fixtureID}:`, error.message);
                    return { fixtureID, homeWinPercent: "33%", awayWinPercent: "33%" }; // Return fallback data on error
                }
            })
        );

        console.log("Win Percentages:", winPercents); // Log all win percentages
        return winPercents; // Return the array of predictions
    } catch (error) {
        console.error("Error fetching predictions:", error.message);
        return []; // Return an empty array on error
    }
}

module.exports = { getPredictions };

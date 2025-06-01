import axios from "axios";
import { db } from "./firebase.js";
import { ref, set } from "firebase/database";

async function fetchSessionResults(year, roundNumber, session) {
  const BASE_URL = `https://api.jolpi.ca/ergast/f1/${year}/${roundNumber}/${session}.json`;
  try {
    const res = await axios.get(BASE_URL);
    const race = res.data?.MRData?.RaceTable?.Races?.[0];

    if (!race) {
      console.log("No qualifying results found");
      return [];
    }

    let results = [];

    if (session === "qualifying") {
      results = race.QualifyingResults?.map((entry) => ({
        position: parseInt(entry.position),
        driver_number: entry.driver?.permanentNumber || "N/A",
        driver_name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
        constructor: entry.Constructor?.name || "Unknown",
        Q1: entry.Q1 || null,
        Q2: entry.Q2 || null,
        Q3: entry.Q3 || null,
      })) || [];
    } else if (session === "results") {
        results =
          race.Results?.map((entry) => ({
            position: parseInt(entry.position),
            driver_number: entry.driver?.permanentNumber || "N/A",
            driver_name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
            constructor: entry.Constructor?.name || "Unknown",
            grid: entry.grid,
            laps: entry.laps,
            status: entry.status,
            time: entry.Time?.time || null,
            fastest_lap_rank: entry.FastestLap?.rank || null,
            fastest_lap_time: entry.FastestLap?.Time?.time || null,
                    })) || [];
    } else {
      console.log(`Unspported session type: ${session}`);
    }

    return results;

  } catch (err) {
    console.error(`Error fetching ${year} - ${roundNumber} - ${session} results:`, err.message);
    return [];
  }
}

async function uploadToFirebase(sessionMeta, sessionResults) {
  const { year, roundNumber, session } = sessionMeta;

  const resultRef = ref(
    db,
    `results/${roundNumber} - ${year} : ${session == "results" ? "race" : session}`
  );

  const payload = {
    roundNumber: roundNumber,
    year: year,
    sessionType: session,
    results: sessionResults,
  };

  await set(resultRef, payload);
  console.log(`Session ${roundNumber} - ${year} : ${session == "results" ? "race" : session} uploaded.`);
}

export async function runJob(year, roundNumber, session) {
  try {
    const results = await fetchSessionResults(year, roundNumber, session);
    if (results.length === 0) {
      console.log("No results to upload.");
      return;
    }

    console.log(results);
    await uploadToFirebase({ year, roundNumber, session }, results);
  } catch (err) {
    console.error("Upload failed", err.message);
  }
}

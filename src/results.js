import axios from "axios";
import { db } from "./firebase.js";
import { ref, set } from "firebase/database";

async function fetchQualifyingResults(year, round) {
  const BASE_URL = `https://api.jolpi.ca/ergast/f1/${year}/${round}/qualifying.json`;
  try {
    const res = await axios.get(BASE_URL);
    const results = res.data?.MRData?.RaceTable?.Races?.[0]?.QualifyingResults;

    if (!results) {
      console.log("No qualifying results found");
      return [];
    }

    return results.map((entry) => ({
      position: parseInt(entry.position),
      driver_number: entry.Driver?.permanentNumber || "N/A",
      driver_name: `${entry.Driver.givenName} ${entry.Driver.familyName}`,
      constructor: entry.Constructor?.name || "Unknown",
      Q1: entry.Q1 || null,
      Q2: entry.Q2 || null,
      Q3: entry.Q3 || null,
    }));
  } catch (err) {
    console.error("Error fetching qualifying results:", err.message);
    return [];
  }
}

async function uploadToFirebase(sessionMeta, sessionResults) {
  const { country, year, name, round } = sessionMeta;

  const resultRef = ref(db, `results/${country}_${year}/${name}_${round}`);

  const payload = {
    session_country: country,
    session_year: year,
    session_name: name,
    session_round: round,
    results: sessionResults,
  };

  await set(resultRef, payload);
  console.log(`Session ${country} - ${year} uploaded.`);
}

export async function runJob(year, round, country, name) {
  try {
    const results = await fetchQualifyingResults(year, round);
    if (results.length === 0) {
      console.log("No results to upload.");
      return;
    }

    console.log(results);
    await uploadToFirebase({ year, round, country, name }, results);
  } catch (err) {
    console.error("Upload failed", err.message);
  }
}

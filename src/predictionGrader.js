import { ref, onValue, get, child } from "firebase/database";
import { db } from "./firebase";

export async function gradePrediction(formID) {
    const snapshotForm = await get(ref(db, `formSubmissions/${formID}`));
    if(!snapshotForm.exists()) {
        console.log("That Form does not Exist");
        return 0;
    }
    const formData = snapshotForm.val();
    const year = formData.year;
    const sessionType = formData.sessionType;
    const roundNumber = formData.roundNumber;

    const snapshotRace = await get(ref(db, `results/${roundNumber} - ${year} : ${sessionType}`));
    if(!snapshotRace.exists()) {
        console.log("Those Results does not exist");
        return 0;
    }

    const resultData = snapshotRace.val();

    console.log(resultData);

}
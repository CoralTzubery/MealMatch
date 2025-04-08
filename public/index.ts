import { initMatches } from "./matches";
import { initMeals } from "./meals";

export async function initApp(root: HTMLPreElement) {
    const container = document.createElement("div");

    const loadMatchesBtn = document.createElement("button");
    loadMatchesBtn.textContent =  "Load Matches";
    loadMatchesBtn.className = "load-btn";
    loadMatchesBtn.onclick = () => initMatches(container);

    const loadMealsBtn = document.createElement("button");
    loadMealsBtn.textContent = "Load Meals";
    loadMealsBtn.className = "load-bth";
    loadMealsBtn.onclick = () => initMeals(container);

    root.replaceChildren(loadMatchesBtn, loadMealsBtn ,container);
}

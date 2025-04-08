import { initMatches } from "./matches";

export async function initApp(root: HTMLPreElement) {
    const container = document.createElement("div");

    const loadMatchedBtn = document.createElement("button");
    loadMatchedBtn.textContent =  "Load Matches";
    loadMatchedBtn.className = "load-btn";
    loadMatchedBtn.onclick = () => initMatches(container);

    root.replaceChildren(loadMatchedBtn, container);
}

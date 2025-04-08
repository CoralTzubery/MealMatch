type Match = {
    _id: string;
    rating?: number;
    comment?: string;
    meal: { _id: string; name: string } | null;
    workout: { _id: string; name: string } | null;
 }

export async function initApp(root: HTMLPreElement) {
    root.textContent = "";

    const button = document.createElement("button");
    button.textContent = "Load Matches";
    button.className = "load-btn";

    const list = document.createElement("ul");
    list.id = "matches-list";

    button.addEventListener("click", async () => {
        try {
            const res = await fetch("/api/matches", { credentials: "include" });

            if (!res.ok) {
                throw new Error("Faild to fetch matches");
            }

            const matches: Match[] = await res.json();
            list.innerHTML = "";

            if (matches.length === 0 ) {
                const noMatches = document.createElement("li");
                noMatches.textContent = "No matches found";
                list.appendChild(noMatches);
                return;
            }

            matches.forEach((match) => {
                const meal = match.meal?.name ?? "Unknown meal";
                const workout = match.workout?.name ?? "Unknown workout";
                const item = document.createElement("li");
                
                item.innerHTML = `
                <strong>${meal}</strong> + <strong>${workout}</strong></br>
                Rating: ${match.rating ?? "-"}</br>
                <em>${match.comment ?? ""}</em>
                `;
                
                list.appendChild(item);
            });
        } catch (error) {
            list.innerHTML = "<li class = 'error'>Error loading matches</li>";
            console.error(error);
        }
    });

    root.appendChild(button);
    root.appendChild(list);
}

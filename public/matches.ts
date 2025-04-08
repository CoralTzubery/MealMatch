type Match = {
    _id: string;
    rating?: number;
    comment?: string;
    meal: { _id: string; name: string } | null;
    workout: { _id: string; name: string } | null;
 };

export async function initMatches(container: HTMLElement) {
    container.innerHTML = "<p>Loading matches</p>"

    try {
        const res = await fetch("/api/matches", { credentials: "include" });

        if (!res.ok) {
            throw new Error("Faild to fetch matches");
        }

        const matches: Match[] = await res.json();

        const list = document.createElement("ul");
        list.id = "matches-list";

        if (matches.length === 0 ) {
            list.innerHTML = "<li>No matches found</li>";
        } else {
            for (const match of matches) {
                const item = document.createElement("li");
                const meal = match.meal?.name ?? "Unknown meal";
                const workout = match.workout?.name ?? "Unknown workout";

                item.innerHTML = `
                <strong>${meal}</strong> + <strong>${workout}</strong></br>
                Rating: ${match.rating ?? "-"}</br>
                <em>${match.comment ?? ""}</em>
                `;
                list.appendChild(item);
            }
        }

        container.replaceChildren(list);
    } catch (error) {
        container.innerHTML = "<li class = 'error'>Error loading matches</li>";
        console.error(error);
    }
}
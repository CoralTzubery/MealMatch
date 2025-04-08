type Meal = {
    _id: string;
    name: string;
    category: string;
    ingredients: string[];
    description?: string;
};

export async function initMeals(container: HTMLElement) {
    container.innerHTML = "<p>Loading meals</p>";
    
    try {
        const res = await fetch("/api/meals", { credentials: "include" });

        if (!res.ok) {
            throw new Error("Failed to fetch meals");
        }

        const meals: Meal[] = await res.json();
        const list = document.createElement("ul");
        list.id = "meals-list";

        if (meals.length === 0) {
            list.innerHTML = "<li>No meals found</li>";
        } else {
            for (const meal of meals) {
                const item = document.createElement("li");
                item.innerHTML = `
                <strong>${meal.name}</strong> (${meal.category})</br>
                Ingredients: ${meal.ingredients.join(", ")}</br>
                ${meal.description ?? ""}
                `;
                list.appendChild(item);
            }
        }
         
        container.replaceChildren(list);
    } catch (error) {
        container.innerHTML = `<p class = "error">Error loading meals</p>`;
        console.error(error);
    }
}
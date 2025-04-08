type Match = {
  _id: string;
  rating?: number;
  comment?: string;
  meal: { _id: string; name: string } | null;
  workout: { _id: string; name: string } | null;
};

type Meal = {
    _id: string;
    name: string;
    category: string;
    ingredients: string[];
    description?: string;
}

type Workout = {
    _id: string;
    name: string;
    duration: number;
    difficulty: string;
}

export async function initApp(root: HTMLPreElement) {
    const container = document.createElement("div");

    const loadMatchesBtn = document.createElement("button");
    loadMatchesBtn.textContent = "Load Matches";
    loadMatchesBtn.className = "load-btn";
    loadMatchesBtn.onclick = () => loadMatches(container); 

    const loadMealsBtn = document.createElement("button");
    loadMealsBtn.textContent = "Load Meals";
    loadMealsBtn.className = "load-btn";
    loadMealsBtn.onclick = () => loadMeals(container);

    const loadWorkoutsBtn = document.createElement("button");
    loadWorkoutsBtn.textContent = "Load Workouts";
    loadWorkoutsBtn.className = "load-btn";
    loadWorkoutsBtn.onclick = () => loadWorkouts(container);

    root.replaceChildren(loadMatchesBtn, loadMealsBtn, loadWorkoutsBtn, container);
}

async function loadMatches(container: HTMLElement) {
    container.innerHTML = "<p>Loading matches</p>"

    try {
        const res = await fetch("/api/matches", { credentials: "include" });
        
        if (!res.ok) {
            throw new Error("Failed to fetch matches");
        }

        const matches: Match[] = await res.json();
        const list = document.createElement("ul");

        if (matches.length === 0) {
            list.innerHTML = "<li>No matches found</li>";
        } else {
            for (const match of matches) {
                const item = document.createElement("li");
                const meal = match.meal?.name ?? "Unknown meal";
                const workout = match.workout?.name ?? "Unknown workout";

                item.innerHTML = `
                <strong>${meal}</strong> + <strong>${workout}</strong><br />
                Rating: ${match.rating ?? "-"}<br />
                <em>${match.comment ?? ""}</em>
                `;
                list.appendChild(item);
            }
        }
        container.replaceChildren(list);
    } catch (error) {
        container.innerHTML = `<p class="error">Error loading matches</p>`;
        console.error(error);
    }
}

async function loadMeals(container: HTMLElement) {
    container.innerHTML = "<p>Loading meals</p>";
    
    try {
      const res = await fetch("/api/meals", { credentials: "include" });
      
      if (!res.ok) {
        throw new Error("Failed to fetch meals");
      }
  
      const meals: Meal[] = await res.json();
      const list = document.createElement("ul");
  
      if (meals.length === 0) {
        list.innerHTML = "<li>No meals found</li>";
      } else {
        for (const meal of meals) {
          const item = document.createElement("li");
          item.innerHTML = `
            <strong>${meal.name}</strong> (${meal.category})<br />
            Ingredients: ${meal.ingredients.join(", ")}<br />
            ${meal.description ?? ""}
          `;
          list.appendChild(item);
        }
      }
  
      container.replaceChildren(list);
    } catch (error) {
      container.innerHTML = `<p class="error">Error loading meals</p>`;
      console.error(error);
    }
  }

  async function loadWorkouts(container: HTMLElement) {
    container.innerHTML = "<p>Loading workouts</p>";
    
    try {
      const res = await fetch("/api/workouts", { credentials: "include" });
      
      if (!res.ok) {
        throw new Error("Failed to fetch workouts");
      }
  
      const workouts: Workout[] = await res.json();
      const list = document.createElement("ul");
  
      if (workouts.length === 0) {
        list.innerHTML = "<li>No workouts found</li>";
      } else {
        for (const workout of workouts) {
          const item = document.createElement("li");
          item.innerHTML = `
          <strong>${workout.name}</strong><br />
          Duration: ${workout.duration} minutes<br />
          Difficulty: ${workout.difficulty}
          `;
          list.appendChild(item);
        }
      }
  
      container.replaceChildren(list);
    } catch (error) {
      container.innerHTML = `<p class="error">Error loading workouts</p>`;
      console.error(error);
    }
  }
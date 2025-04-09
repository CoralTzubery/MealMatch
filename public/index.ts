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
    const loginForm = document.createElement("form");

    loginForm.innerHTML = `
      <h2>Login</h2>
      <label>
        Username: <input type="text" name="username" required />
      </label><br />
      <label>
        Password: <input type="password" name="password" required />
      </label><br />
      <button type="submit">Login</button>
    `;

    const logoutBtn = document.createElement("button");
    logoutBtn.textContent = "Logout";
    logoutBtn.style.display = "none";
    logoutBtn.onclick = async () => {
        await fetch("/api/login/logout", { method: "POST", credentials: "include" });
        alert("Logged out");
        window.location.reload();
    };

    loginForm.onsubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData(loginForm);
        const username = formData.get("username") as string;
        const password = formData.get("password") as string;

        const res = await fetch("/api/login", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            alert("Login successful!");
            window.location.reload();
        } else {
            alert("Login failed");
        }
    };

    try {
        const sessionRes = await fetch("/api/users/me", { credentials: "include" });

        if (sessionRes.ok) {
            const user = await sessionRes.json();
            const welcome = document.createElement("p");
            welcome.textContent = `Welcome, ${user.username}!`;

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

            const showMealFormBtn = document.createElement("button");
            showMealFormBtn.textContent = "Add Meal";
            showMealFormBtn.className = "load-btn";
            showMealFormBtn.onclick = () => renderMealForm(container);

            logoutBtn.style.display = "inline";

            container.append(
                welcome,
                loadMatchesBtn,
                loadMealsBtn,
                loadWorkoutsBtn,
                showMealFormBtn,
                logoutBtn
            );
        } else {
            container.appendChild(loginForm);
        }
    } catch {
        container.appendChild(loginForm);
    }

    root.replaceChildren(container);
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

function renderMealForm(container: HTMLElement) {
    container.innerHTML = "";
    const form = document.createElement("form");

    form.innerHTML = `
    <h2>Add New Meal</h2>
    <label>
        Name:
        <input type="text" name="name" required />
    </label><br />
    <label>
        Category:
        <input type="text" name="category" required /> 
    </lable><br />
    <label>
        Ingredients:
        <input type="text" name="ingredients" required />
    </lable><br />
    <label>
        Description:
        <textarea name="description"></textarea>
    </lable><br />
    <button type="submit">Save</button>
    `;

    const successMsg = document.createElement("p");
    successMsg.className = "success-msg";
    successMsg.style.color = "green";

    form.addEventListener("submit", async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const ingredientsRaw = formData.get("ingredients");
        const ingredients =
            typeof ingredientsRaw === "string"
                ? ingredientsRaw.split(",").map((s) => s.trim())
                : [];

        const data = {
            name: formData.get("name") as string,
            category: formData.get("category") as string,
            ingredients,
            description: formData.get("description") as string,
        };

        try {
            const res = await fetch("/api/meals", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            if (!res.ok) {
                throw new Error("Failed to create a meal");
            }

            successMsg.textContent = "Meal added successfully!";
            container.prepend(successMsg);

            setTimeout(() => {
                loadMeals(container);
            }, 2000);
        } catch (error) {
            console.error(error);
        }
    });

    container.appendChild(form);
}
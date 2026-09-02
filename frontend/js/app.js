const vehicleList = document.getElementById("vehicle-list");

if (vehicleList) {

    const token = localStorage.getItem("access_token");

    fetch("http://127.0.0.1:8000/api/vehicles/", {
        headers: {
            "Authorization": `Bearer ${token}`
        }
    })
        .then(response => response.json())
        .then(data => {

            vehicleList.innerHTML = "";

            data.forEach(vehicle => {

                const card = document.createElement("div");

                card.className = "vehicle-card";

                card.innerHTML = `
                    <h3>${vehicle.name}</h3>
                    <p>Type: ${vehicle.vehicle_type}</p>
                    <p>Price: NPR ${vehicle.price_per_day} / day</p>
                    <button>Book Vehicle</button>
                `;

                vehicleList.appendChild(card);
            });

        })
        .catch(error => {

            console.log(error);
            vehicleList.innerHTML = "<p>Could not load vehicles.</p>";

        });
}


const loginForm = document.getElementById("login-form");

if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;
        const message = document.getElementById("login-message");

        fetch("http://127.0.0.1:8000/api/users/login/", {
            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                email: email,
                password: password
            })
        })
        .then(response => response.json())
        .then(data => {

            if (data.access) {

                localStorage.setItem("access_token", data.access);

                message.textContent = "Login successful!";

                window.location.href = "vehicles.html";

            } else {

                message.textContent = data.detail || "Login failed.";

            }

        })
        .catch(error => {

            console.log(error);
            message.textContent = "Something went wrong.";

        });
    });
}
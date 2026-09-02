
// ==========================================
// VEHICLE LISTING AND FILTERING
// ==========================================

const vehicleList = document.getElementById("vehicle-list");
const filterButton = document.getElementById("filter-button");


function loadVehicles() {

    const token = localStorage.getItem("access_token");

    let url = "http://127.0.0.1:8000/api/vehicles/";


    const searchInput = document.getElementById("search");
    const typeInput = document.getElementById("vehicle-type");
    const locationInput = document.getElementById("location");


    let params = [];


    // Search by vehicle name or brand
    if (searchInput && searchInput.value.trim() !== "") {

        params.push(
            "search=" +
            encodeURIComponent(searchInput.value.trim())
        );

    }


    // Filter by vehicle type
    if (typeInput && typeInput.value !== "") {

        params.push(
            "vehicle_type=" +
            encodeURIComponent(typeInput.value)
        );

    }


    // Filter by location
    if (locationInput && locationInput.value.trim() !== "") {

        params.push(
            "location=" +
            encodeURIComponent(locationInput.value.trim())
        );

    }


    // Add filters to URL
    if (params.length > 0) {

        url += "?" + params.join("&");

    }


    // Show loading message
    if (vehicleList) {

        vehicleList.innerHTML =
            "<p>Loading vehicles...</p>";

    }


    // Send request to Django API
    fetch(url, {

        method: "GET",

        headers: {

            "Authorization": `Bearer ${token}`

        }

    })


        // Convert response to JSON
        .then(response => {

            if (response.status === 401) {

                throw new Error(
                    "You must login to view vehicles."
                );

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to load vehicles."
                );

            }


            return response.json();

        })


        // Display vehicles
        .then(data => {

            vehicleList.innerHTML = "";


            // Check if no vehicles were found
            if (data.length === 0) {

                vehicleList.innerHTML =
                    "<p>No vehicles found.</p>";

                return;

            }


            // Create a card for every vehicle
            data.forEach(vehicle => {

                const card =
                    document.createElement("div");


                card.className =
                    "vehicle-card";


                card.innerHTML = `
                    <h3>${vehicle.name}</h3>

                    <p>
                        Type:
                        ${vehicle.vehicle_type}
                    </p>

                    <p>
                        Price:
                        NPR ${vehicle.price_per_day}
                        / day
                    </p>

                    <button
                        class="book-button"
                        data-id="${vehicle.id}"
                    >
                        Book Vehicle
                    </button>
                `;


                vehicleList.appendChild(card);

            });


            // Add booking button events
            const bookButtons =
                document.querySelectorAll(".book-button");


            bookButtons.forEach(button => {

                button.addEventListener(
                    "click",
                    function() {

                        const vehicleId =
                            this.getAttribute("data-id");


                        localStorage.setItem(
                            "selected_vehicle",
                            vehicleId
                        );


                        window.location.href =
                            "booking.html";

                    }
                );

            });

        })


        // Handle errors
        .catch(error => {

            console.log(error);


            vehicleList.innerHTML =
                `<p>${error.message}</p>`;

        });

}


// Load vehicles when vehicles page opens
if (vehicleList) {

    loadVehicles();

}


// Search/filter button
if (filterButton) {

    filterButton.addEventListener(
        "click",
        function() {

            loadVehicles();

        }
    );

}


// Allow pressing Enter in search fields
const searchInput =
    document.getElementById("search");


if (searchInput) {

    searchInput.addEventListener(
        "keypress",
        function(event) {

            if (event.key === "Enter") {

                loadVehicles();

            }

        }
    );

}


// ==========================================
// LOGIN
// ==========================================

const loginForm =
    document.getElementById("login-form");


if (loginForm) {

    loginForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const email =
                document.getElementById("email").value;


            const password =
                document.getElementById("password").value;


            const message =
                document.getElementById(
                    "login-message"
                );


            message.textContent =
                "Logging in...";


            fetch(
                "http://127.0.0.1:8000/api/users/login/",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json"

                    },

                    body: JSON.stringify({

                        email: email,

                        password: password

                    })

                }
            )


                // Convert response to JSON
                .then(response => {

                    return response.json();

                })


                // Handle login response
                .then(data => {

                    if (data.access) {

                        // Save JWT access token
                        localStorage.setItem(
                            "access_token",
                            data.access
                        );


                        // Save refresh token if provided
                        if (data.refresh) {

                            localStorage.setItem(
                                "refresh_token",
                                data.refresh
                            );

                        }


                        message.textContent =
                            "Login successful!";


                        // Go to vehicles page
                        window.location.href =
                            "vehicles.html";

                    }


                    else {

                        message.textContent =
                            data.detail ||
                            "Login failed.";

                    }

                })


                // Handle login errors
                .catch(error => {

                    console.log(error);


                    message.textContent =
                        "Something went wrong.";

                });

        }
    );

}


// ==========================================
// LOGOUT
// ==========================================

const logoutButton =
    document.getElementById("logout-button");


if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        function() {

            localStorage.removeItem(
                "access_token"
            );


            localStorage.removeItem(
                "refresh_token"
            );


            localStorage.removeItem(
                "selected_vehicle"
            );


            window.location.href =
                "login.html";

        }
    );

}


// ==========================================
// CHECK LOGIN STATUS
// ==========================================

const token =
    localStorage.getItem("access_token");


const currentPage =
    window.location.pathname;


if (
    currentPage.includes("vehicles.html") &&
    !token
) {

    window.location.href =
        "login.html";

}


// ==========================================
// NAVIGATION LOGIN / LOGOUT
// ==========================================

const loginLink =
    document.querySelector(
        'a[href="login.html"]'
    );


if (loginLink && token) {

    loginLink.textContent =
        "Logout";


    loginLink.href =
        "#";


    loginLink.addEventListener(
        "click",
        function(event) {

            event.preventDefault();


            localStorage.removeItem(
                "access_token"
            );


            localStorage.removeItem(
                "refresh_token"
            );


            localStorage.removeItem(
                "selected_vehicle"
            );


            window.location.href =
                "login.html";

        }
    );

}


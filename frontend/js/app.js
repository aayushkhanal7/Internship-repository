
// ==========================================
// VEHICLE LISTING AND FILTERING
// ==========================================

const vehicleList = document.getElementById("vehicle-list");
const filterButton = document.getElementById("filter-button");


function loadVehicles() {

    const token = localStorage.getItem("access_token");

    let url = "http://127.0.0.1:8000/api/vehicles/";


    const searchInput =
        document.getElementById("search");

    const typeInput =
        document.getElementById("vehicle-type");

    const locationInput =
        document.getElementById("location");


    let params = [];


    // Search by vehicle name or brand
    if (
        searchInput &&
        searchInput.value.trim() !== ""
    ) {

        params.push(
            "search=" +
            encodeURIComponent(
                searchInput.value.trim()
            )
        );

    }


    // Filter by vehicle type
    if (
        typeInput &&
        typeInput.value !== ""
    ) {

        params.push(
            "vehicle_type=" +
            encodeURIComponent(
                typeInput.value
            )
        );

    }


    // Filter by location
    if (
        locationInput &&
        locationInput.value.trim() !== ""
    ) {

        params.push(
            "location=" +
            encodeURIComponent(
                locationInput.value.trim()
            )
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

            "Authorization":
                `Bearer ${token}`

        }

    })

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
            document.querySelectorAll(
                ".book-button"
            );


        bookButtons.forEach(button => {

            button.addEventListener(
                "click",
                function() {

                    const vehicleId =
                        this.getAttribute(
                            "data-id"
                        );


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
                document.getElementById(
                    "email"
                ).value;


            const password =
                document.getElementById(
                    "password"
                ).value;


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
    document.getElementById(
        "logout-button"
    );


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
    localStorage.getItem(
        "access_token"
    );


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


// ==========================================
// BOOKING PAGE
// ==========================================

const selectedVehicle =
    document.getElementById(
        "selected-vehicle"
    );


if (selectedVehicle) {

    const token =
        localStorage.getItem(
            "access_token"
        );


    const vehicleId =
        localStorage.getItem(
            "selected_vehicle"
        );


    if (!token) {

        window.location.href =
            "login.html";

    }


    if (!vehicleId) {

        selectedVehicle.innerHTML =
            "<p>No vehicle selected.</p>";

    }


    else {

        fetch(
            `http://127.0.0.1:8000/api/vehicles/${vehicleId}/`,
            {

                method: "GET",

                headers: {

                    "Authorization":
                        `Bearer ${token}`

                }

            }
        )

        .then(response => {

            if (response.status === 401) {

                throw new Error(
                    "Your login session has expired. Please login again."
                );

            }


            if (!response.ok) {

                throw new Error(
                    "Failed to load vehicle."
                );

            }


            return response.json();

        })

        .then(vehicle => {

            selectedVehicle.innerHTML = `

                <h2>${vehicle.name}</h2>

                <p>
                    Type:
                    ${vehicle.vehicle_type}
                </p>

                <p>
                    Price:
                    NPR ${vehicle.price_per_day}
                    / day
                </p>

            `;

        })

        .catch(error => {

            console.log(error);


            selectedVehicle.innerHTML =
                `<p>${error.message}</p>`;

        });

    }

}


// ==========================================
// CREATE BOOKING
// ==========================================

const bookingForm =
    document.getElementById(
        "booking-form"
    );


if (bookingForm) {

    bookingForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const token =
                localStorage.getItem(
                    "access_token"
                );


            const vehicleId =
                localStorage.getItem(
                    "selected_vehicle"
                );


            const startDate =
                document.getElementById(
                    "start-date"
                ).value;


            const endDate =
                document.getElementById(
                    "end-date"
                ).value;


            const message =
                document.getElementById(
                    "booking-message"
                );


            message.textContent =
                "Creating booking...";


            fetch(
                "http://127.0.0.1:8000/api/bookings/",
                {

                    method: "POST",

                    headers: {

                        "Content-Type":
                            "application/json",

                        "Authorization":
                            `Bearer ${token}`

                    },

                    body: JSON.stringify({

                        vehicle: vehicleId,

                        start_date: startDate,

                        end_date: endDate

                    })

                }
            )

            .then(response => {

                return response.json().then(data => ({

                    status: response.status,

                    data: data

                }));

            })

            .then(result => {

                const data = result.data;


                // Successful booking
                if (result.status === 201) {

                    message.textContent =
                        "Booking created successfully!";

                }


                // Django validation error
                else if (data.non_field_errors) {

                    message.textContent =
                        data.non_field_errors[0];

                }


                // Other API error
                else if (data.detail) {

                    message.textContent =
                        data.detail;

                }


                // Other validation errors
                else {

                    const errors =
                        Object.values(data);

                    if (errors.length > 0) {

                        message.textContent =
                            errors[0];

                    }

                    else {

                        message.textContent =
                            "Booking failed.";

                    }

                }

            })

            .catch(error => {

                console.log(error);


                message.textContent =
                    "Something went wrong.";

            });

        }
    );

}


// ==========================================
// REGISTER
// ==========================================

const registerForm =
    document.getElementById("register-form");


if (registerForm) {

    registerForm.addEventListener(
        "submit",
        function(event) {

            event.preventDefault();


            const firstName =
                document.getElementById("first-name").value;

            const lastName =
                document.getElementById("last-name").value;

            const email =
                document.getElementById("register-email").value;

            const password =
                document.getElementById("register-password").value;

            const message =
                document.getElementById(
                    "register-message"
                );


            message.textContent =
                "Creating account...";


            fetch(
                "http://127.0.0.1:8000/api/users/register/",
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({

                        first_name: firstName,

                        last_name: lastName,

                        email: email,

                        password: password

                    })
                }
            )


            .then(response => {

                return response.json();

            })


            .then(data => {

                if (data.id) {

                    message.textContent =
                        "Registration successful!";

                }

                else {

                    const errors =
                        Object.values(data);

                    if (errors.length > 0) {

                        message.textContent =
                            errors[0];

                    }

                    else {

                        message.textContent =
                            "Registration failed.";

                    }

                }

            })


            .catch(error => {

                console.log(error);

                message.textContent =
                    "Something went wrong.";

            });

        }
    );

}

// ==========================================
// MY BOOKINGS
// ==========================================

const bookingList =
    document.getElementById("booking-list");


if (bookingList) {

    const token = localStorage.getItem("access_token");

    if (!token) {

        bookingList.innerHTML =
            "<p>Please login to view your bookings.</p>";

    }

    else {

        fetch(
            "http://127.0.0.1:8000/api/bookings/",
            {
                method: "GET",

                headers: {
                    "Authorization":
                        "Bearer " + token
                }
            }
        )

        .then(response => {

            if (!response.ok) {
                throw new Error("Failed to load bookings.");
            }

            return response.json();

        })

        .then(data => {

            if (data.length === 0) {

                bookingList.innerHTML =
                    "<p>You have no bookings yet.</p>";

                return;
            }


            bookingList.innerHTML = "";


            data.forEach(booking => {

                const bookingItem =
                    document.createElement("div");

                bookingItem.className =
                    "booking-item";

                bookingItem.innerHTML = `

                    <h3>
                        ${booking.vehicle_name}
                    </h3>

                    <p>
                        Start Date:
                        ${booking.start_date}
                    </p>

                    <p>
                        End Date:
                        ${booking.end_date}
                    </p>

                    <p>
                        Total Price:
                        NPR ${booking.total_price}
                    </p>

                    <p>
                        Status:
                        ${booking.status}
                    </p>

                `;


                if (booking.status !== "CANCELLED") {

                    const cancelButton =
                        document.createElement("button");

                    cancelButton.textContent =
                        "Cancel Booking";


                    cancelButton.addEventListener(
                        "click",
                        function() {

                            const confirmCancel =
                                confirm(
                                    "Are you sure you want to cancel this booking?"
                                );


                            if (!confirmCancel) {
                                return;
                            }


                            fetch(
                                `http://127.0.0.1:8000/api/bookings/${booking.id}/cancel/`,
                                {
                                    method: "POST",

                                    headers: {
                                        "Authorization":
                                            "Bearer " + token
                                    }
                                }
                            )

                            .then(response => {

                                if (!response.ok) {
                                    throw new Error(
                                        "Failed to cancel booking."
                                    );
                                }

                                return response.json();

                            })

                            .then(data => {

                                alert(
                                    "Booking cancelled successfully."
                                );

                                location.reload();

                            })

                            .catch(error => {

                                console.log(error);

                                alert(
                                    "Unable to cancel booking."
                                );

                            });

                        }
                    );


                    bookingItem.appendChild(
                        cancelButton
                    );

                }


                bookingList.appendChild(
                    bookingItem
                );

            });

        })

        .catch(error => {

            console.log(error);

            bookingList.innerHTML =
                "<p>Unable to load bookings.</p>";

        });

    }

}
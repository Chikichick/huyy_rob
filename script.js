// ==========================================
// OH AKING SINTA FOOT MASSAGE
// JAVASCRIPT
// ==========================================


// ================================
// MOBILE NAVIGATION
// ================================

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        if (navMenu.classList.contains("active")) {
            menuToggle.textContent = "✕";
        } else {
            menuToggle.textContent = "☰";
        }

    });


    // Close mobile menu when clicking a link

    const navLinks = document.querySelectorAll("#navMenu a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");
            menuToggle.textContent = "☰";

        });

    });

}


// ================================
// BOOKING FORM
// ================================

const bookingForm = document.getElementById("bookingForm");
const bookingMessage = document.getElementById("bookingMessage");

if (bookingForm && bookingMessage) {

    bookingForm.addEventListener("submit", async function (event) {

        event.preventDefault();

        const name = document.getElementById("customerName").value.trim();
        const phone = document.getElementById("customerPhone").value.trim();
        const service = document.getElementById("service").value;
        const date = document.getElementById("bookingDate").value;


        // Check required fields

        if (
            name === "" ||
            phone === "" ||
            service === "" ||
            date === ""
        ) {

            bookingMessage.textContent =
                "Please complete all the required fields.";

            bookingMessage.className =
                "booking-message error";

            return;
        }


        // Check Philippine phone number

        const phonePattern = /^(09|\+639)\d{9}$/;

        if (!phonePattern.test(phone)) {

            bookingMessage.textContent =
                "Please enter a valid Philippine mobile number.";

            bookingMessage.className =
                "booking-message error";

            return;
        }


        // Check booking date

        const selectedDate = new Date(date);
        const today = new Date();

        today.setHours(0, 0, 0, 0);

        if (selectedDate < today) {

            bookingMessage.textContent =
                "Please choose a future date.";

            bookingMessage.className =
                "booking-message error";

            return;
        }


        // Disable button while sending

        const submitButton =
            bookingForm.querySelector("button[type='submit']");

        if (submitButton) {
            submitButton.disabled = true;
            submitButton.textContent = "Sending...";
        }


        try {

            const response = await fetch(
                bookingForm.action,
                {
                    method: "POST",
                    body: new FormData(bookingForm),
                    headers: {
                        "Accept": "application/json"
                    }
                }
            );


            if (response.ok) {

                const readableDate =
                    selectedDate.toLocaleDateString(
                        "en-PH",
                        {
                            year: "numeric",
                            month: "long",
                            day: "numeric"
                        }
                    );


                bookingMessage.innerHTML = `
                    <strong>Booking Request Received!</strong>
                    <br><br>
                    Thank you, <strong>${name}</strong>!
                    <br>
                    Service:
                    <strong>${service}</strong>
                    <br>
                    Preferred date:
                    <strong>${readableDate}</strong>
                    <br><br>
                    We will contact you at
                    <strong>${phone}</strong>
                    to confirm your booking.
                `;

                bookingMessage.className =
                    "booking-message success";

                bookingForm.reset();

            } else {

                bookingMessage.textContent =
                    "Something went wrong. Please try again.";

                bookingMessage.className =
                    "booking-message error";

            }

        } catch (error) {

            bookingMessage.textContent =
                "Unable to send your booking. Please check your internet connection and try again.";

            bookingMessage.className =
                "booking-message error";

        }


        // Restore button

        if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = "Request Booking";
        }

    });

}


// ================================
// SET MINIMUM BOOKING DATE
// ================================

const bookingDate =
    document.getElementById("bookingDate");

if (bookingDate) {

    const today = new Date();

    const year = today.getFullYear();

    const month =
        String(today.getMonth() + 1).padStart(2, "0");

    const day =
        String(today.getDate()).padStart(2, "0");

    bookingDate.min =
        `${year}-${month}-${day}`;

}


// ================================
// SCROLL ANIMATION
// ================================

const animatedElements =
    document.querySelectorAll(
        ".service-card, .promo-card, .benefit, .about-content"
    );


if ("IntersectionObserver" in window) {

    const observer =
        new IntersectionObserver(
            function (entries) {

                entries.forEach(function (entry) {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("show");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.15
            }
        );


    animatedElements.forEach(function (element) {

        element.classList.add("hidden");

        observer.observe(element);

    });

} else {

    animatedElements.forEach(function (element) {

        element.classList.add("show");

    });

}


// ================================
// ONLINE CHAT
// ================================

const chatButton =
    document.getElementById("chatButton");

const chatBox =
    document.getElementById("chatBox");

const closeChat =
    document.getElementById("closeChat");

const chatForm =
    document.getElementById("chatForm");


if (chatButton && chatBox) {

    // OPEN CHAT

    chatButton.addEventListener("click", function () {

        chatBox.classList.add("active");

        const firstInput =
            chatBox.querySelector("input");

        if (firstInput) {
            setTimeout(function () {
                firstInput.focus();
            }, 200);
        }

    });

}


if (closeChat && chatBox) {

    // CLOSE CHAT

    closeChat.addEventListener("click", function () {

        chatBox.classList.remove("active");

    });

}


// ================================
// SEND CHAT MESSAGE TO FORMSPREE
// ================================

if (chatForm && chatBox) {

    chatForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const submitButton =
                chatForm.querySelector(
                    "button[type='submit']"
                );

            const originalText =
                submitButton
                    ? submitButton.textContent
                    : "Send Message";


            if (submitButton) {

                submitButton.disabled = true;
                submitButton.textContent = "Sending...";

            }


            try {

                const response = await fetch(
                    chatForm.action,
                    {
                        method: "POST",
                        body: new FormData(chatForm),
                        headers: {
                            "Accept": "application/json"
                        }
                    }
                );


                if (response.ok) {

                    chatForm.innerHTML = `
                        <div
                            style="
                                text-align:center;
                                padding:20px 5px;
                            "
                        >

                            <div
                                style="
                                    font-size:35px;
                                    margin-bottom:10px;
                                "
                            >
                                ✓
                            </div>

                            <strong>
                                Message Sent!
                            </strong>

                            <p
                                style="
                                    margin-top:8px;
                                    font-size:13px;
                                "
                            >
                                Thank you for contacting
                                Oh Aking Sinta.
                                We'll get back to you soon.
                            </p>

                            <button
                                type="button"
                                id="newChatButton"
                                style="
                                    margin-top:15px;
                                    border:none;
                                    background:#9B5264;
                                    color:white;
                                    padding:10px 18px;
                                    border-radius:10px;
                                    cursor:pointer;
                                "
                            >
                                Send Another Message
                            </button>

                        </div>
                    `;


                    const newChatButton =
                        document.getElementById(
                            "newChatButton"
                        );


                    if (newChatButton) {

                        newChatButton.addEventListener(
                            "click",
                            function () {

                                location.reload();

                            }
                        );

                    }

                } else {

                    if (submitButton) {

                        submitButton.disabled = false;
                        submitButton.textContent =
                            originalText;

                    }

                    alert(
                        "Sorry, your message could not be sent. Please try again."
                    );

                }

            } catch (error) {

                if (submitButton) {

                    submitButton.disabled = false;
                    submitButton.textContent =
                        originalText;

                }

                alert(
                    "Unable to send your message. Please check your internet connection and try again."
                );

            }

        }
    );

}
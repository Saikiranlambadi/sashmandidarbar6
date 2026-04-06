// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
    
    // Set minimum date to today
    const dateInput = document.getElementById('date');
    if (dateInput) {
        const today = new Date().toISOString().split('T')[0];
        dateInput.min = today;
        
        // Set max date to 3 months from now
        const threeMonthsLater = new Date();
        threeMonthsLater.setMonth(threeMonthsLater.getMonth() + 3);
        dateInput.max = threeMonthsLater.toISOString().split('T')[0];
    }
    
    // Set default time to current time + 1 hour (rounded)
    const timeInput = document.getElementById('time');
    if (timeInput) {
        const now = new Date();
        now.setHours(now.getHours() + 1);
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        timeInput.value = `${hours}:${minutes}`;
    }
    
    // Form validation functions
    function validateName(name) {
        if (!name || name.trim().length < 2) {
            return 'Please enter a valid name (minimum 2 characters)';
        }
        if (name.trim().length > 50) {
            return 'Name cannot exceed 50 characters';
        }
        if (!/^[a-zA-Z\s\-']+$/.test(name.trim())) {
            return 'Name can only contain letters, spaces, hyphens, and apostrophes';
        }
        return null;
    }
    
    function validateEmail(email) {
        if (!email) {
            return 'Email address is required';
        }
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return 'Please enter a valid email address (e.g., name@example.com)';
        }
        return null;
    }
    
    function validateMobile(mobile) {
        if (!mobile) {
            return 'Mobile number is required';
        }
        // Remove any non-digit characters
        const cleanMobile = mobile.replace(/\D/g, '');
        if (cleanMobile.length < 10 || cleanMobile.length > 15) {
            return 'Please enter a valid mobile number (10-15 digits)';
        }
        return null;
    }
    
    function validateDate(date) {
        if (!date) {
            return 'Please select a date';
        }
        const selectedDate = new Date(date);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            return 'Please select a future date';
        }
        return null;
    }
    
    function validateTime(time) {
        if (!time) {
            return 'Please select a time';
        }
        const [hours, minutes] = time.split(':');
        const selectedTime = parseInt(hours) + parseInt(minutes) / 60;
        
        if (selectedTime < 11 || selectedTime > 22) {
            return 'Please select a time between 11:00 AM and 10:00 PM';
        }
        return null;
    }
    
    function validateGuests(guests) {
        if (!guests) {
            return 'Please select number of guests';
        }
        if (guests < 1 || guests > 20) {
            return 'Number of guests must be between 1 and 20';
        }
        return null;
    }
    
    // Show error message
    function showError(elementId, message) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        
        if (errorElement) {
            errorElement.textContent = message;
            errorElement.style.display = 'block';
        }
        if (inputElement) {
            inputElement.classList.add('error');
        }
    }
    
    // Hide error message
    function hideError(elementId) {
        const errorElement = document.getElementById(elementId);
        const inputElement = document.getElementById(elementId.replace('Error', ''));
        
        if (errorElement) {
            errorElement.style.display = 'none';
            errorElement.textContent = '';
        }
        if (inputElement) {
            inputElement.classList.remove('error');
        }
    }
    
    // Real-time validation
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const mobileInput = document.getElementById('mobile');
    const dateInputField = document.getElementById('date');
    const timeInputField = document.getElementById('time');
    const guestsSelect = document.getElementById('guests');
    
    if (nameInput) {
        nameInput.addEventListener('blur', function() {
            const error = validateName(this.value);
            if (error) {
                showError('nameError', error);
            } else {
                hideError('nameError');
            }
        });
        
        nameInput.addEventListener('input', function() {
            hideError('nameError');
        });
    }
    
    if (emailInput) {
        emailInput.addEventListener('blur', function() {
            const error = validateEmail(this.value);
            if (error) {
                showError('emailError', error);
            } else {
                hideError('emailError');
            }
        });
        
        emailInput.addEventListener('input', function() {
            hideError('emailError');
        });
    }
    
    if (mobileInput) {
        mobileInput.addEventListener('blur', function() {
            const error = validateMobile(this.value);
            if (error) {
                showError('mobileError', error);
            } else {
                hideError('mobileError');
            }
        });
        
        mobileInput.addEventListener('input', function() {
            hideError('mobileError');
        });
    }
    
    if (dateInputField) {
        dateInputField.addEventListener('change', function() {
            const error = validateDate(this.value);
            if (error) {
                showError('dateError', error);
            } else {
                hideError('dateError');
            }
        });
    }
    
    if (timeInputField) {
        timeInputField.addEventListener('change', function() {
            const error = validateTime(this.value);
            if (error) {
                showError('timeError', error);
            } else {
                hideError('timeError');
            }
        });
    }
    
    if (guestsSelect) {
        guestsSelect.addEventListener('change', function() {
            const error = validateGuests(this.value);
            if (error) {
                showError('guestsError', error);
            } else {
                hideError('guestsError');
            }
        });
    }
    
    // Form submission
    const reservationForm = document.getElementById('reservationForm');
    
    if (reservationForm) {
        reservationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const mobile = document.getElementById('mobile').value;
            const date = document.getElementById('date').value;
            const time = document.getElementById('time').value;
            const guests = document.getElementById('guests').value;
            const specialRequests = document.getElementById('specialRequests').value;
            
            // Validate all fields
            const nameError = validateName(name);
            const emailError = validateEmail(email);
            const mobileError = validateMobile(mobile);
            const dateError = validateDate(date);
            const timeError = validateTime(time);
            const guestsError = validateGuests(guests);
            
            // Show errors if any
            if (nameError) showError('nameError', nameError);
            if (emailError) showError('emailError', emailError);
            if (mobileError) showError('mobileError', mobileError);
            if (dateError) showError('dateError', dateError);
            if (timeError) showError('timeError', timeError);
            if (guestsError) showError('guestsError', guestsError);
            
            // If no errors, process reservation
            if (!nameError && !emailError && !mobileError && !dateError && !timeError && !guestsError) {
                
                // Format reservation details
                const reservationDetails = {
                    name: name,
                    email: email,
                    mobile: mobile,
                    date: formatDate(date),
                    time: formatTime(time),
                    guests: guests,
                    specialRequests: specialRequests || 'None',
                    reservationTime: new Date().toLocaleString()
                };
                
                // Log to console (for testing)
                console.log('Reservation Details:', reservationDetails);
                
                // Use local Express API when running locally (any port), else use Netlify Functions
                const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                const apiUrl = isLocal ? '/api/submit' : '/.netlify/functions/submit';
                
                // Send to backend API
                fetch(apiUrl, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: reservationDetails.name,
                        email: reservationDetails.email,
                        phone: reservationDetails.mobile,
                        message: `Reservation for ${reservationDetails.guests} guests on ${reservationDetails.date} at ${reservationDetails.time}. Special requests: ${reservationDetails.specialRequests}`
                    })
                })
                .then(res => res.json())
                .then(response => {
                    if (response.success) {
                        // Display in modal
                        displayReservationDetails(reservationDetails);
                        
                        // Show success modal
                        showModal();
                        
                        // Reset form
                        reservationForm.reset();
                    } else {
                        alert('There was an error submitting your reservation. Please try again later.');
                    }
                })
                .catch(error => {
                    console.error('Error submitting reservation:', error);
                    alert('There was an error connecting to the server. Please try again later.');
                });
                
                // Reset date and time to defaults
                if (dateInputField) {
                    const today = new Date().toISOString().split('T')[0];
                    dateInputField.value = '';
                }
                if (timeInputField) {
                    const now = new Date();
                    now.setHours(now.getHours() + 1);
                    const hours = String(now.getHours()).padStart(2, '0');
                    const minutes = String(now.getMinutes()).padStart(2, '0');
                    timeInputField.value = `${hours}:${minutes}`;
                }
                
                // Hide all error messages
                hideError('nameError');
                hideError('emailError');
                hideError('mobileError');
                hideError('dateError');
                hideError('timeError');
                hideError('guestsError');
            }
        });
    }
    
    // Helper function to format date
    function formatDate(dateString) {
        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    }
    
    // Helper function to format time
    function formatTime(timeString) {
        const [hours, minutes] = timeString.split(':');
        const hour = parseInt(hours);
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const hour12 = hour % 12 || 12;
        return `${hour12}:${minutes} ${ampm}`;
    }
    
    // Display reservation details in modal
    function displayReservationDetails(details) {
        const detailsContainer = document.getElementById('reservationDetails');
        if (detailsContainer) {
            detailsContainer.innerHTML = `
                <p><strong>Name:</strong> ${details.name}</p>
                <p><strong>Email:</strong> ${details.email}</p>
                <p><strong>Mobile:</strong> ${details.mobile}</p>
                <p><strong>Date:</strong> ${details.date}</p>
                <p><strong>Time:</strong> ${details.time}</p>
                <p><strong>Guests:</strong> ${details.guests} ${details.guests == 1 ? 'Guest' : 'Guests'}</p>
                <p><strong>Special Requests:</strong> ${details.specialRequests}</p>
                <p><strong>Reservation ID:</strong> RES-${Date.now().toString().slice(-8)}</p>
            `;
        }
    }
    
    // Show modal
    function showModal() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'block';
            
            // Close modal when clicking outside
            window.onclick = function(event) {
                if (event.target === modal) {
                    closeModal();
                }
            };
        }
    }
    
    // Close modal function (make it global for inline onclick)
    window.closeModal = function() {
        const modal = document.getElementById('successModal');
        if (modal) {
            modal.style.display = 'none';
        }
    };
    
    // Sticky navigation on scroll
    let lastScrollTop = 0;
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.background = 'rgba(0, 0, 0, 0.98)';
            navbar.style.padding = '0.5rem 0';
        } else {
            navbar.style.background = 'rgba(0, 0, 0, 0.95)';
            navbar.style.padding = '1rem 0';
        }
        
        lastScrollTop = scrollTop;
    });
});

// Add some additional functionality for better UX
document.addEventListener('DOMContentLoaded', function() {
    // Add loading animation on form submit
    const submitBtn = document.querySelector('.btn-submit');
    if (submitBtn) {
        submitBtn.addEventListener('click', function(e) {
            // Only add animation if form is valid
            const form = document.getElementById('reservationForm');
            if (form.checkValidity()) {
                this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...';
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-check-circle"></i> Make Reservation';
                }, 1500);
            }
        });
    }
    
    // Auto-dismiss modal after 5 seconds
    window.autoCloseModal = function() {
        setTimeout(() => {
            const modal = document.getElementById('successModal');
            if (modal && modal.style.display === 'block') {
                closeModal();
            }
        }, 5000);
    };
    
    // Override showModal to include auto-close
    const originalShowModal = window.showModal;
    if (originalShowModal) {
        window.showModal = function() {
            originalShowModal();
            autoCloseModal();
        };
    }
});
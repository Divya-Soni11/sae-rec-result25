// // Enhanced recruitment data with more details
// const recruitmentData = [
//     {
//         name: "John Doe",
//         phone: "1234567890",
//         domains: ["Software", "Robotics"],
//         email: "john.doe@example.com",
//         applicationId: "SAE2025001"
//     },
//     {
//         name: "Jane Smith",
//         phone: "9876543210",
//         domains: ["Motorsports"],
//         email: "jane.smith@example.com",
//         applicationId: "SAE2025002"
//     },
//     {
//         name: "Alice Johnson",
//         phone: "5556667777",
//         domains: ["Aerospace", "Software"],
//         email: "alice.johnson@example.com",
//         applicationId: "SAE2025003"
//     },
//     {
//         name: "Bob Brown",
//         phone: "1112223333",
//         domains: [],
//         email: "bob.brown@example.com",
//         applicationId: "SAE2025004"
//     },
//     {
//         name: "Charlie Wilson",
//         phone: "4445556666",
//         domains: ["Robotics", "Aerospace"],
//         email: "charlie.wilson@example.com",
//         applicationId: "SAE2025005"
//     }
// ];

// import { response } from "express";



// 3-Hour Countdown Timer
function initializeCountdown() {
    const hoursElement = document.getElementById('hours');
    const minutesElement = document.getElementById('minutes');
    const secondsElement = document.getElementById('seconds');
    const countdownSection = document.querySelector('.countdown-section');
    const searchSection = document.getElementById('searchSection');
    const countdownMessage = document.querySelector('.countdown-message');
    
    // Set countdown to 3 hours (3 * 60 * 60 seconds)
    let totalSeconds = 2*60*60;
    
    function updateCountdown() {
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;
        
        // Update display with leading zeros
        hoursElement.textContent = hours.toString().padStart(2, '0');
        minutesElement.textContent = minutes.toString().padStart(2, '0');
        secondsElement.textContent = seconds.toString().padStart(2, '0');
        
        // Add animation to seconds
        secondsElement.classList.add('changing');
        setTimeout(() => secondsElement.classList.remove('changing'), 500);
        
        // Visual warnings based on time left
        if (totalSeconds <= 3600) { // Last hour
            countdownSection.classList.add('countdown-warning');
            countdownMessage.textContent = '⏰ Only 1 hour left! Get ready!';
        }
        
        if (totalSeconds <= 600) { // Last 10 minutes
            countdownSection.classList.add('countdown-urgent');
            countdownMessage.textContent = '🚀 Almost there! Results in 10 minutes!';
        }
        
        if (totalSeconds <= 60) { // Last minute
            countdownMessage.textContent = '🎯 Final countdown! Almost live!';
        }
        
        totalSeconds--;
        
        // When countdown reaches 0
        if (totalSeconds < 0) {
            countdownFinished();
        }
    }
    
    // Update immediately and then every second
    updateCountdown();
    const countdownInterval = setInterval(updateCountdown, 1000);
    
    // Store interval to clear later
    window.countdownInterval = countdownInterval;
}

function countdownFinished() {
    clearInterval(window.countdownInterval);
    
    const countdownSection = document.querySelector('.countdown-section');
    const searchSection = document.getElementById('searchSection');
    const countdownMessage = document.querySelector('.countdown-message');
    
    searchSection.style.display = 'block';
    // Final animation
    countdownSection.classList.add('countdown-finished');
    
    // Big celebration
    createConfetti();
    
    // Update message
    countdownMessage.innerHTML = '🎉 <strong>RESULTS ARE LIVE!</strong> 🎉<br>Check your selection status now!';
    
    // Show celebration message in form
    const formContainer = document.querySelector('.form-container');
    if (formContainer && !document.querySelector('.celebration-message')) {
        const celebrationMsg = document.createElement('div');
        celebrationMsg.className = 'celebration-message';
        celebrationMsg.innerHTML = '🎊 Results are now available! Enter your details to check your selection.';
        celebrationMsg.style.cssText = `
            background: linear-gradient(135deg, #00b09b, #96c93d);
            color: white;
            padding: 15px;
            border-radius: 10px;
            text-align: center;
            margin-bottom: 20px;
            font-weight: bold;
            font-size: 1.1em;
        `;
        formContainer.insertBefore(celebrationMsg, formContainer.firstChild);
    }
}

// Start countdown when page loads
document.addEventListener('DOMContentLoaded', function() {
    // Your existing initialization code
    initializeParticles();
    initializeStatsCounter();
    initializeDomainCards();
    initializeSocialCards();
    initializeFormAnimations();
    addPageLoadAnimations();
    initializeConfetti();
    
    // Start the 3-hour countdown
    setTimeout(initializeCountdown, 1000);
});

// DOM Elements
const searchForm = document.getElementById('searchForm');
const resultsSection = document.getElementById('resultsSection');
const resultTitle = document.getElementById('resultTitle');
const resultContent = document.getElementById('resultContent');

// Particles.js initialization
function initializeParticles() {
    if (typeof particlesJS !== 'undefined') {
        particlesJS('particles-js', {
            particles: {
                number: { 
                    value: 80, 
                    density: { 
                        enable: true, 
                        value_area: 800 
                    } 
                },
                color: { 
                    value: "#4a90e2" 
                },
                shape: { 
                    type: "circle" 
                },
                opacity: { 
                    value: 0.5, 
                    random: true 
                },
                size: { 
                    value: 3, 
                    random: true 
                },
                line_linked: {
                    enable: true,
                    distance: 150,
                    color: "#4a90e2",
                    opacity: 0.2,
                    width: 1
                },
                move: {
                    enable: true,
                    speed: 2,
                    direction: "none",
                    random: true,
                    straight: false,
                    out_mode: "out",
                    bounce: false
                }
            },
            interactivity: {
                detect_on: "canvas",
                events: {
                    onhover: { 
                        enable: true, 
                        mode: "repulse" 
                    },
                    onclick: { 
                        enable: true, 
                        mode: "push" 
                    },
                    resize: true
                }
            }
        });
    }
}

// Stats counter animation
function initializeStatsCounter() {
    const statNumbers = document.querySelectorAll('.stat-number');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const statNumber = entry.target;
                const target = parseInt(statNumber.getAttribute('data-target'));
                animateValue(statNumber, 0, target, 2000);
                observer.unobserve(statNumber);
            }
        });
    }, { threshold: 0.5 });

    statNumbers.forEach(stat => observer.observe(stat));
}

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        // Append "+" if value reached and target is one of those with plus sign
        const plusTargets = [250, 80];
        element.textContent = value.toLocaleString() + (value === end && plusTargets.includes(end) ? '+' : '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Domain cards interaction
function initializeDomainCards() {
    const domainCards = document.querySelectorAll('.domain-card');
    
    domainCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click effect
        card.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            }, 150);
        });
    });
}

// Social Media Interactions
function initializeSocialCards() {
    const socialCards = document.querySelectorAll('.social-card');
    
    socialCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-8px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
        
        // Add click animation with ripple effect
        card.addEventListener('click', function(e) {
            createRippleEffect(this, e);
            
            // Track social media clicks
            const platform = this.classList.contains('instagram') ? 'Instagram' :
                           this.classList.contains('linkedin') ? 'LinkedIn' : 'YouTube';
            console.log(`Social media click: ${platform}`);
        });
    });
}

// Form animations and interactions
function initializeFormAnimations() {
    const inputs = document.querySelectorAll('.form-group input');
    
    inputs.forEach(input => {
        // Add focus animations
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
        
        // Add input validation styling
        input.addEventListener('input', function() {
            if (this.value) {
                this.parentElement.classList.add('has-value');
            } else {
                this.parentElement.classList.remove('has-value');
            }
        });
    });
}

// Page load animations
function addPageLoadAnimations() {
    const animatedElements = document.querySelectorAll('.animate__animated');
    
    animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Add sequential loading animation
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 500);
}

// Confetti initialization
function initializeConfetti() {
    // Confetti will be created when someone gets selected
    console.log('Confetti system ready! 🎉');
}

// Form submission handler
searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('name').value.trim();
    const phone = document.getElementById('phone').value.trim();
    
    checkSelection(name, phone);
});

// Enhanced selection check with animations
function checkSelection(name, phone) {
    const submitButton = searchForm.querySelector('button');
    const buttonText = submitButton.querySelector('.btn-text');
    
    // Show loading state with animation
    buttonText.textContent = 'Checking...';
    submitButton.disabled = true;
    submitButton.style.opacity = '0.8';
    
    // Add loading animation to button
    const loadingParticles = submitButton.querySelector('.btn-particles');
    if (loadingParticles) {
        loadingParticles.style.display = 'block';
        loadingParticles.innerHTML = '';
        createLoadingParticles(loadingParticles);
    }

    fetch('https://sae-rec-result25.vercel.app/api/sae/results',{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, phone: Number(phone) }) // phone as number
    })
    .then(response => response.json())
    .then(data => {
     
    console.log('API response:', data);
    // then handle as needed


        if (data.message === 'selected') {
            displayResult(data, name); // show selected
        } else if (data.message === 'rejected') {
            displayResult(data, name); // show not selected
        } else if (data.message === 'entered Name does not match!') {
            showNotification('Entered name does not match!', 'error');
            displayResult(null, name);
        } else {
            showNotification(data.message || 'Unexpected response', 'error');
            displayResult(null, name);
        }
    })
    .catch(error => {
        showNotification('API error: ' + error.message, 'error');
        displayResult(null, name);
    })
    .finally(() => {
        // Reset button state
        setTimeout(() => {
            buttonText.textContent = 'Check Result';
            submitButton.disabled = false;
            submitButton.style.opacity = '1';
            if (loadingParticles) {
                loadingParticles.style.display = 'none';
                loadingParticles.innerHTML = '';
            }
        }, 500);
    }); 
    }

// Enhanced result display with animations
function displayResult(apiResponse, originalName) {
    resultsSection.classList.remove('hidden');
    resultsSection.classList.add('animate__fadeInUp');
    setTimeout(() => {
        resultsSection.classList.remove('animate__fadeInUp');
    }, 1000);

    if (apiResponse && apiResponse.message === "selected") {
        const displayName = apiResponse.name || originalName;
        resultTitle.textContent = `Congratulations ${displayName}!`;
        resultContent.innerHTML = `
            <div class="selection-status">
                <div class="selected">
                    <div class="celebration-header">
                        <div class="confetti-icon">🎉</div>
                        <h4>You have been selected! 🎉</h4>
                    </div>
                    <p>Welcome to the SAE UIET family! Your immense ability and passion towards joining SAE made your way to the club. We hope and expect the same from you throughout the tenure!☺️</p>
                    <br><br>
                    <p class="next-steps">
                        🚀 <strong>Next Steps:</strong> Further instructions will be communicated via email and WhatsApp group.
                    </p>
                </div>
            </div>
        `;
        triggerCelebration();
    } else if(apiResponse && apiResponse.message === "rejected") {
        const displayName = originalName || (apiResponse && apiResponse.name) || '';
        resultTitle.textContent = `Selection Status for ${displayName}`;
        resultContent.innerHTML = `
            <div class="selection-status">
                <div class="not-selected">
                    <div class="encouragement-header">
                        <div class="encourage-icon">💪</div>
                        <h4>Thank you for your interest!</h4>
                    </div>
                    <p>We appreciate your application for SAE UIET recruitment 2025.</p>
                    <p>Unfortunately, you have not been selected for this round.</p>
                    <div class="encouragement-message">
                        <p>🌟 <strong>Keep learning and growing!</strong></p>
                        <p>This is not the end of your journey. We encourage you to:</p>
                        <ul>
                            <li>Continue developing your skills</li>
                            <li>Participate in our workshops and events</li>
                            <li>Apply again in the next recruitment cycle</li>
                        </ul>
                    </div>
                    <p class="follow-advice">
                        📱 <strong>Follow our social media</strong> for updates on future opportunities!
                    </p>
                </div>
            </div>
        `;
    } else {
        resultContent.innerHTML = `<div class="selection-status">error: entered name does not match with the registered name, corresponding to entered phone no.</div>`;
    }

    setTimeout(() => {
        resultsSection.scrollIntoView({
            behavior: 'smooth',
            block: 'center'
        });
    }, 300);
}

// Celebration effects for selected students
function triggerCelebration() {
    // Create confetti effect
    createConfetti();
    
    // Add celebration sound (optional - would need audio file)
    // playCelebrationSound();
    
    // Animate the result card
    const resultCard = document.querySelector('.result-card');
    resultCard.classList.add('celebrating');
    
    // Remove celebration class after animation
    setTimeout(() => {
        resultCard.classList.remove('celebrating');
    }, 2000);
}

// Confetti effect
function createConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    confettiContainer.innerHTML = '';
    
    const colors = ['#1e3c72', '#2a5298', '#4a90e2', '#87ceeb', '#ffffff'];
    const confettiCount = 150;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti';
        confetti.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: ${colors[Math.floor(Math.random() * colors.length)]};
            top: -10px;
            left: ${Math.random() * 100}vw;
            opacity: ${Math.random() * 0.5 + 0.5};
            transform: rotate(${Math.random() * 360}deg);
            border-radius: ${Math.random() > 0.5 ? '50%' : '0'};
            animation: confetti-fall ${Math.random() * 3 + 2}s linear forwards;
            z-index: 1000;
        `;
        
        confettiContainer.appendChild(confetti);
        
        // Remove confetti after animation
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Loading particles for button
function createLoadingParticles(container) {
    const particlesCount = 8;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: white;
            border-radius: 50%;
            top: 50%;
            left: 50%;
            opacity: 0;
            animation: loading-particle 1.5s infinite;
            animation-delay: ${i * 0.2}s;
        `;
        container.appendChild(particle);
    }
}

// Ripple effect for social cards and buttons
function createRippleEffect(element, event) {
    const ripple = document.createElement('div');
    ripple.style.cssText = `
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple 0.6s linear;
        pointer-events: none;
    `;
    
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    
    element.appendChild(ripple);
    
    setTimeout(() => {
        ripple.remove();
    }, 600);
}

// Notification system
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <span class="notification-icon">${type === 'error' ? '⚠' : 'ℹ'}</span>
            <span class="notification-message">${message}</span>
        </div>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'error' ? '#f8d7da' : '#d1ecf1'};
        color: ${type === 'error' ? '#721c24' : '#0c5460'};
        padding: 15px 20px;
        border-radius: 8px;
        box-shadow: 0 5px 15px rgba(0,0,0,0.2);
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        border-left: 4px solid ${type === 'error' ? '#dc3545' : '#17a2b8'};
        max-width: 300px;
    `;
    
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Auto remove after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.parentNode.removeChild(notification);
            }
        }, 300);
    }, 5000);
}

// Additional CSS animations through JavaScript
const dynamicStyles = `
@keyframes confetti-fall {
    0% {
        transform: translateY(0) rotate(0deg);
        opacity: 1;
    }
    100% {
        transform: translateY(100vh) rotate(360deg);
        opacity: 0;
    }
}

@keyframes loading-particle {
    0% {
        transform: translate(-50%, -50%) scale(0) rotate(0deg);
        opacity: 0;
    }
    50% {
        opacity: 1;
    }
    100% {
        transform: translate(-50%, -50%) translateX(${Math.random() * 100 - 50}px) translateY(${Math.random() * 100 - 50}px) scale(1) rotate(180deg);
        opacity: 0;
    }
}

@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.body-loaded .header {
    animation-delay: 0.1s;
}

.body-loaded .search-section {
    animation-delay: 0.3s;
}

.body-loaded .domains-section {
    animation-delay: 0.5s;
}

.body-loaded .social-section {
    animation-delay: 0.7s;
}

.celebrating {
    animation: celebrate-pulse 0.5s ease-in-out 3;
}

@keyframes celebrate-pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
}

.form-group.focused .input-focus-line {
    width: 100%;
}

.form-group.has-value input {
    background: rgba(255, 255, 255, 0.95);
}

.celebration-header, .encouragement-header {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 15px;
}

.confetti-icon, .encourage-icon {
    font-size: 2em;
    margin-right: 15px;
    animation: bounce 2s infinite;
}

.selection-details {
    background: rgba(255, 255, 255, 0.5);
    padding: 15px;
    border-radius: 8px;
    margin: 15px 0;
}

.next-steps, .follow-advice {
    background: rgba(255, 255, 255, 0.3);
    padding: 12px;
    border-radius: 8px;
    margin-top: 15px;
}

.encouragement-message ul {
    text-align: left;
    margin: 10px 0;
    padding-left: 20px;
}

.encouragement-message li {
    margin: 5px 0;
}
`;

// Inject dynamic styles
const styleSheet = document.createElement('style');
styleSheet.textContent = dynamicStyles;
document.head.appendChild(styleSheet);

// Utility function to shuffle array (for randomizing test data)
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Export functions for global access (if needed)
window.SAERecruitment = {
    checkSelection,
    showNotification,
    createConfetti,
    shuffleArray
};

console.log('SAE UIET Recruitment Results 2025 - System Initialized 🚀');
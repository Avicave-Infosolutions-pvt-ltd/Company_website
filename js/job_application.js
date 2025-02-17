// Firebase Configuration
const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_AUTH_DOMAIN",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_STORAGE_BUCKET",
    messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
    appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const storage = firebase.storage();
const database = firebase.database();

// Mobile menu functionality
const initMobileMenu = () => {
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            const expanded = mobileMenuButton.getAttribute('aria-expanded') === 'true';
            mobileMenuButton.setAttribute('aria-expanded', !expanded);
            mobileMenu.classList.toggle('hidden');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when clicking a link
        mobileMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuButton.setAttribute('aria-expanded', 'false');
            });
        });
    }
};

// Job application form handling
const initJobApplicationForm = () => {
    const jobApplicationForm = document.getElementById('jobApplicationForm');

    if (jobApplicationForm) {
        jobApplicationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const errorMessage = document.getElementById('errorMessage');
            errorMessage.classList.add('hidden');

            const email = document.getElementById('email').value;
            const phone = document.getElementById('phone').value;
            const panCardFile = document.getElementById('panCard').files[0];
            const resumeFile = document.getElementById('resume').files[0];
            const privacyConsent = jobApplicationForm.querySelector('input[type="checkbox"]').checked;

            if (!privacyConsent) {
                errorMessage.textContent = 'Please accept the privacy policy to continue';
                errorMessage.classList.remove('hidden');
                return;
            }

            if (panCardFile.size > 500 * 1024) {
                errorMessage.textContent = 'PAN Card photo must be 500KB or less';
                errorMessage.classList.remove('hidden');
                return;
            }

            if (resumeFile.size > 1024 * 1024) {
                errorMessage.textContent = 'Resume must be 1MB or less';
                errorMessage.classList.remove('hidden');
                return;
            }

            try {
                const panCardRef = storage.ref(`panCards/${email}_${Date.now()}_${panCardFile.name}`);
                const panCardSnapshot = await panCardRef.put(panCardFile);
                const panCardUrl = await panCardSnapshot.ref.getDownloadURL();

                const resumeRef = storage.ref(`resumes/${email}_${Date.now()}_${resumeFile.name}`);
                const resumeSnapshot = await resumeRef.put(resumeFile);
                const resumeUrl = await resumeSnapshot.ref.getDownloadURL();

                const applicationRef = database.ref('jobApplications').push();
                await applicationRef.set({
                    email: email,
                    phone: phone,
                    panCardUrl: panCardUrl,
                    resumeUrl: resumeUrl,
                    submittedAt: firebase.database.ServerValue.TIMESTAMP
                });

                errorMessage.textContent = 'Application submitted successfully!';
                errorMessage.classList.remove('hidden');
                errorMessage.classList.remove('text-red-500');
                errorMessage.classList.add('text-green-500');

                jobApplicationForm.reset();
            } catch (error) {
                console.error('Error:', error);
                errorMessage.textContent = 'Failed to submit application. Please try again.';
                errorMessage.classList.remove('hidden');
            }
        });
    }
};
// Initialize all functionality when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initJobApplicationForm();
});
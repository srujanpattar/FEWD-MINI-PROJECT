const nmamitRegex = /^[a-zA-Z0-9._%+-]+@nmamit\.in$/i;
const storageKey = 'nmamit-hypergrid-user';
const statsKey = 'nmamit-hypergrid-stats';
const usersKey = 'nmamit-hypergrid-users';
const eventsKey = 'nmamit-hypergrid-events';
const eventRegistrationsKey = 'nmamit-hypergrid-event-registrations';

// Backend API Configuration
const API_BASE_URL = 'http://localhost:3000/api';
const USE_BACKEND = true; // Set to false to use localStorage instead

const semesterCatalog = [
    {
        title: 'Semester 1',
        vibe: 'Genesis Core',
        subjects: [
            { name: 'Engineering Mathematics I', code: 'MAT101' },
            { name: 'Engineering Physics', code: 'PHY103' },
            { name: 'Basic Electrical', code: 'EEE105' },
            { name: 'Problem Solving with C', code: 'CSE107' },
            { name: 'Graphics & Visualization', code: 'MEC109' },
            { name: 'Constitution & Ethics', code: 'HSS111' },
            { name: 'Creative Programming Lab', code: 'CSE110' },
            { name: 'Physics Experiments', code: 'PHY113' }
        ]
    },
    {
        title: 'Semester 2',
        vibe: 'Quantum Sprint',
        subjects: [
            { name: 'Engineering Mathematics II', code: 'MAT121' },
            { name: 'Chemistry of Materials', code: 'CHE123' },
            { name: 'Electronics Fundamentals', code: 'ECE125' },
            { name: 'Data Structures', code: 'CSE127' },
            { name: 'Mechanics & Statics', code: 'MEC129' },
            { name: 'Transformative English', code: 'HSS131' },
            { name: 'Electronics Lab', code: 'ECE133' },
            { name: 'Chemistry Lab', code: 'CHE135' }
        ]
    },
    {
        title: 'Semester 3',
        vibe: 'Systems Foundry',
        subjects: [
            { name: 'Discrete Mathematics', code: 'MAT201' },
            { name: 'Object Oriented Programming', code: 'CSE203' },
            { name: 'Computer Organization', code: 'CSE205' },
            { name: 'Data Communication', code: 'CSE207' },
            { name: 'Universal Human Values', code: 'HSS209' },
            { name: 'Design Thinking Lab', code: 'IDS211' },
            { name: 'OOPS Lab', code: 'CSE213' },
            { name: 'Hardware Projects', code: 'EEE215' }
        ]
    },
    {
        title: 'Semester 4',
        vibe: 'Algorithmic Pulse',
        subjects: [
            { name: 'Design & Analysis of Algorithms', code: 'CSE221' },
            { name: 'Database Systems', code: 'CSE223' },
            { name: 'Operating Systems', code: 'CSE225' },
            { name: 'Probability & Statistics', code: 'MAT227' },
            { name: 'Microprocessors', code: 'ECE229' },
            { name: 'Environmental Studies', code: 'HSS231' },
            { name: 'DBMS Lab', code: 'CSE233' },
            { name: 'Algorithms Lab', code: 'CSE235' }
        ]
    },
    {
        title: 'Semester 5',
        vibe: 'Platform Arc',
        subjects: [
            { name: 'Computer Networks', code: 'CSE301' },
            { name: 'Software Engineering', code: 'CSE303' },
            { name: 'Machine Learning Foundations', code: 'CSE305' },
            { name: 'Information Security', code: 'CSE307' },
            { name: 'Elective I', code: 'ELE309' },
            { name: 'Minor Project I', code: 'IDS311' },
            { name: 'ML Lab', code: 'CSE313' },
            { name: 'Networks Lab', code: 'CSE315' }
        ]
    },
    {
        title: 'Semester 6',
        vibe: 'Intelligence Grid',
        subjects: [
            { name: 'Distributed Systems', code: 'CSE321' },
            { name: 'Compiler Design', code: 'CSE323' },
            { name: 'Deep Learning', code: 'CSE325' },
            { name: 'Cloud Infrastructure', code: 'CSE327' },
            { name: 'Elective II', code: 'ELE329' },
            { name: 'Research Methodology', code: 'IDS331' },
            { name: 'DL Lab', code: 'CSE333' },
            { name: 'Mini Project II', code: 'IDS335' }
        ]
    },
    {
        title: 'Semester 7',
        vibe: 'Innovation Forge',
        subjects: [
            { name: 'Big Data Analytics', code: 'CSE401' },
            { name: 'Cyber Physical Systems', code: 'CSE403' },
            { name: 'Elective III', code: 'ELE405' },
            { name: 'Open Elective I', code: 'OPE407' },
            { name: 'Entrepreneurship', code: 'IDS409' },
            { name: 'Internship Review', code: 'IDS411' },
            { name: 'Capstone Lab', code: 'IDS413' },
            { name: 'Technical Seminar', code: 'IDS415' }
        ]
    },
    {
        title: 'Semester 8',
        vibe: 'Launch Window',
        subjects: [
            { name: 'AI Ethics & Policy', code: 'CSE421' },
            { name: 'Open Elective II', code: 'OPE423' },
            { name: 'Open Elective III', code: 'OPE425' },
            { name: 'Professional Elective IV', code: 'ELE427' },
            { name: 'Startup Studio', code: 'IDS429' },
            { name: 'Major Project', code: 'IDS431' },
            { name: 'Internship/Industry', code: 'IDS433' },
            { name: 'Portfolio Defense', code: 'IDS435' }
        ]
    }
];

const quickResponses = {
    senior: [
        'Pro tip: chunk the module into 25-minute focus bursts and wrap with a 5-minute recap.',
        'Lab evaluators love crisp circuit diagrams—draw before you code.',
        'Remember, Sem 4 viva questions usually start from the previous experiment log.'
    ],
    junior: [
        'Noted! I’ll mirror this plan and report back if I hit blockers.',
        'Appreciate the insight—any mnemonic for remembering the derivations?',
        'Got it. I’ll update the shared Notion doc once I try this.'
    ]
};

const sparkPrompts = [
    'What’s the fastest way to revise DAA recurrences?',
    'Any mnemonic for semiconductor energy levels?',
    'How do you structure a Sem 8 portfolio defense deck?',
    'Tips for staying consistent with major project logs?'
];

const state = {
    user: null,
    activeSemester: null,
    persona: 'junior'
};

const ui = {};

document.addEventListener('DOMContentLoaded', () => {
    cacheDom();
    bindEvents();
    renderSemesters();
    initializeStats();
    initializeDummyEvents();
    updateStatsDisplay();
    hydrateUser();
});

function cacheDom() {
    ui.signupForm = document.getElementById('signupForm');
    ui.signupName = document.getElementById('signupName');
    ui.signupEmail = document.getElementById('signupEmail');
    ui.signupPassword = document.getElementById('signupPassword');
    ui.signupRole = document.getElementById('signupRole');
    ui.signupFeedback = document.getElementById('signupFeedback');

    ui.loginForm = document.getElementById('loginForm');
    ui.loginEmail = document.getElementById('loginEmail');
    ui.loginPassword = document.getElementById('loginPassword');
    ui.loginFeedback = document.getElementById('loginFeedback');

    ui.portal = document.getElementById('portal');
    ui.welcomeName = document.getElementById('welcomeName');
    ui.welcomeEmail = document.getElementById('welcomeEmail');
    ui.semesterGrid = document.getElementById('semesterGrid');
    ui.semesterTitle = document.getElementById('semesterTitle');
    ui.subjectList = document.getElementById('subjectList');
    ui.toast = document.getElementById('toast');
    ui.logoutBtn = document.getElementById('logoutBtn');
    ui.chatForm = document.getElementById('chatForm');
    ui.chatMessage = document.getElementById('chatMessage');
    ui.chatWindow = document.getElementById('chatWindow');
    ui.personaRadios = document.querySelectorAll('input[name="persona"]');
    ui.sparkPrompt = document.getElementById('sparkPrompt');
    ui.addSemesterForm = document.getElementById('addSemesterForm');
    ui.renameSubjectForm = document.getElementById('renameSubjectForm');
    ui.addSubjectForm = document.getElementById('addSubjectForm');
    ui.removeSubjectForm = document.getElementById('removeSubjectForm');
    ui.newSemesterName = document.getElementById('newSemesterName');
    ui.newSemesterVibe = document.getElementById('newSemesterVibe');
    ui.addSemesterFeedback = document.getElementById('addSemesterFeedback');
    ui.semesterSelectRename = document.getElementById('semesterSelectRename');
    ui.subjectSelectRename = document.getElementById('subjectSelectRename');
    ui.newSubjectName = document.getElementById('newSubjectName');
    ui.renameSubjectFeedback = document.getElementById('renameSubjectFeedback');
    ui.semesterSelectAddSubject = document.getElementById('semesterSelectAddSubject');
    ui.newSubjectTitle = document.getElementById('newSubjectTitle');
    ui.newSubjectCode = document.getElementById('newSubjectCode');
    ui.addSubjectFeedback = document.getElementById('addSubjectFeedback');
    ui.semesterSelectRemoveSubject = document.getElementById('semesterSelectRemoveSubject');
    ui.subjectSelectRemove = document.getElementById('subjectSelectRemove');
    ui.removeSubjectFeedback = document.getElementById('removeSubjectFeedback');
    ui.adminPanel = document.getElementById('admin');
    ui.attendanceForm = document.getElementById('attendanceForm');
    ui.classesHappened = document.getElementById('classesHappened');
    ui.classesAttended = document.getElementById('classesAttended');
    ui.attendancePercentage = document.getElementById('attendancePercentage');
    ui.attendanceStatus = document.getElementById('attendanceStatus');
    ui.hero = document.getElementById('hero');
    ui.footer = document.getElementById('footer');
    ui.landingPage = document.getElementById('landing');
    ui.activeUsers = document.getElementById('activeUsers');
    ui.notesUploaded = document.getElementById('notesUploaded');
    ui.totalRegistrations = document.getElementById('totalRegistrations');
    ui.authSection = document.getElementById('access');
    ui.eventsGrid = document.getElementById('eventsGrid');
    ui.addEventBtn = document.getElementById('addEventBtn');
    ui.eventFormModal = document.getElementById('eventFormModal');
    ui.eventForm = document.getElementById('eventForm');
    ui.eventId = document.getElementById('eventId');
    ui.eventName = document.getElementById('eventName');
    ui.eventType = document.getElementById('eventType');
    ui.eventDescription = document.getElementById('eventDescription');
    ui.eventDate = document.getElementById('eventDate');
    ui.eventLocation = document.getElementById('eventLocation');
    ui.eventLink = document.getElementById('eventLink');
    ui.eventFormTitle = document.getElementById('eventFormTitle');
    ui.eventSubmitBtn = document.getElementById('eventSubmitBtn');
    ui.closeEventForm = document.getElementById('closeEventForm');
    ui.cancelEventForm = document.getElementById('cancelEventForm');
}

function bindEvents() {
    ui.signupForm.addEventListener('submit', handleSignup);
    ui.loginForm.addEventListener('submit', handleLogin);
    ui.logoutBtn.addEventListener('click', handleLogout);
    ui.chatForm.addEventListener('submit', handleChatSubmit);
    ui.personaRadios.forEach(radio =>
        radio.addEventListener('change', (event) => {
            state.persona = event.target.value;
        })
    );
    ui.sparkPrompt.addEventListener('click', injectPrompt);

    ui.addSemesterForm.addEventListener('submit', handleAddSemester);
    ui.renameSubjectForm.addEventListener('submit', handleRenameSubject);
    ui.addSubjectForm.addEventListener('submit', handleAddSubject);
    ui.removeSubjectForm.addEventListener('submit', handleRemoveSubject);

    ui.semesterSelectRename.addEventListener('change', () => {
        populateSubjectSelect(ui.subjectSelectRename, ui.semesterSelectRename.value);
    });
    ui.semesterSelectRemoveSubject.addEventListener('change', () => {
        populateSubjectSelect(ui.subjectSelectRemove, ui.semesterSelectRemoveSubject.value);
    });

    ui.attendanceForm.addEventListener('submit', handleAttendanceCalculate);
    ui.classesHappened.addEventListener('input', () => handleAttendanceCalculate(null));
    ui.classesAttended.addEventListener('input', () => handleAttendanceCalculate(null));

    // Show auth section when Sign Up or Login buttons are clicked
    document.querySelectorAll('a[href="#access"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            if (ui.authSection) {
                ui.authSection.classList.remove('hidden');
                ui.authSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        });
    });

    // Event management
    if (ui.addEventBtn) {
        ui.addEventBtn.addEventListener('click', () => openEventForm());
    }
    if (ui.closeEventForm) {
        ui.closeEventForm.addEventListener('click', () => closeEventForm());
    }
    if (ui.cancelEventForm) {
        ui.cancelEventForm.addEventListener('click', () => closeEventForm());
    }
    if (ui.eventForm) {
        ui.eventForm.addEventListener('submit', handleEventSubmit);
    }
    if (ui.eventFormModal) {
        ui.eventFormModal.addEventListener('click', (e) => {
            if (e.target === ui.eventFormModal) {
                closeEventForm();
            }
        });
    }
}

function hydrateUser() {
    const stored = localStorage.getItem(storageKey);
    if (!stored) {
        // Show landing page if no user is logged in
        if (ui.landingPage) ui.landingPage.classList.remove('hidden');
        return;
    }
    try {
        const user = JSON.parse(stored);
        if (user?.email && nmamitRegex.test(user.email)) {
            state.user = user;
            showPortal();
        } else {
            if (ui.landingPage) ui.landingPage.classList.remove('hidden');
        }
    } catch {
        localStorage.removeItem(storageKey);
        if (ui.landingPage) ui.landingPage.classList.remove('hidden');
    }
}

async function handleSignup(event) {
    event.preventDefault();
    const name = ui.signupName.value.trim();
    const email = ui.signupEmail.value.trim();
    const password = ui.signupPassword.value;
    const role = ui.signupRole.value;

    if (!nmamitRegex.test(email)) {
        ui.signupFeedback.textContent = 'Only emails ending with @nmamit.in are accepted.';
        return;
    }

    if (password.length < 8) {
        ui.signupFeedback.textContent = 'Password must be at least 8 characters.';
        return;
    }

    if (!role) {
        ui.signupFeedback.textContent = 'Please select an access level.';
        return;
    }

    if (USE_BACKEND) {
        // Use backend API
        try {
            ui.signupFeedback.textContent = 'Registering...';
            const response = await fetch(`${API_BASE_URL}/signup`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name, email, password, role })
            });

            const data = await response.json();

            if (data.success) {
                ui.signupFeedback.textContent = 'Signup successful. You can log in now.';
                showToast('Access badge created. Proceed to login.', 'success');
                
                // Store user in users list for stats
                const usersList = JSON.parse(localStorage.getItem(usersKey) || '[]');
                if (!usersList.find(u => u.email === email)) {
                    usersList.push({ email, name, role, registeredAt: new Date().toISOString() });
                    localStorage.setItem(usersKey, JSON.stringify(usersList));
                }
                
                updateStats();
                updateStatsDisplay();
                return;
            } else {
                ui.signupFeedback.textContent = data.message || 'Signup failed. Please try again.';
                return;
            }
        } catch (error) {
            // Silently fall back to localStorage without showing errors
            console.log('Backend unavailable, using localStorage');
        }
    }
    
    // Fallback to localStorage (either USE_BACKEND is false or backend failed)
    {
        // Fallback to localStorage
        const user = { name, email, password, role };
        localStorage.setItem(storageKey, JSON.stringify(user));
        
        // Store user in users list
        const usersList = JSON.parse(localStorage.getItem(usersKey) || '[]');
        if (!usersList.find(u => u.email === email)) {
            usersList.push({ email, name, role, registeredAt: new Date().toISOString() });
            localStorage.setItem(usersKey, JSON.stringify(usersList));
        }
        
        // Update stats
        updateStats();
        updateStatsDisplay();
        
        ui.signupFeedback.textContent = 'Signup successful. You can log in now.';
        showToast('Access badge created. Proceed to login.', 'success');
    }
}

async function handleLogin(event) {
    event.preventDefault();
    const email = ui.loginEmail.value.trim();
    const password = ui.loginPassword.value;

    if (!nmamitRegex.test(email)) {
        ui.loginFeedback.textContent = 'Use a valid @nmamit.in email.';
        return;
    }

    if (USE_BACKEND) {
        // Use backend API
        try {
            ui.loginFeedback.textContent = 'Logging in...';
            const response = await fetch(`${API_BASE_URL}/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password })
            });

            const data = await response.json();

            if (data.success) {
                // Store user data (without password) in state and localStorage
                state.user = data.user;
                localStorage.setItem(storageKey, JSON.stringify(data.user));
                
                ui.loginFeedback.textContent = '';
                showPortal();
                showToast('HyperGrid unlocked.', 'success');
                return;
            } else {
                ui.loginFeedback.textContent = data.message || 'Login failed. Please try again.';
                return;
            }
        } catch (error) {
            // Silently fall back to localStorage without showing errors
            console.log('Backend unavailable, using localStorage');
        }
    }
    
    // Fallback to localStorage (either USE_BACKEND is false or backend failed)
    {
        const stored = localStorage.getItem(storageKey);
        if (!stored) {
            ui.loginFeedback.textContent = 'No signup detected. Register your badge first.';
            return;
        }

        const user = JSON.parse(stored);
        if (user.email !== email || user.password !== password) {
            ui.loginFeedback.textContent = 'Credentials mismatch. Try again.';
            return;
        }

        state.user = user;
        ui.loginFeedback.textContent = '';
        showPortal();
        showToast('HyperGrid unlocked.', 'success');
    }
}

function showPortal() {
    if (!state.user) return;
    ui.welcomeName.textContent = state.user.name || 'Cadet';
    ui.welcomeEmail.textContent = state.user.email;
    
    // Hide landing page and auth section, show all sections after login
    ui.landingPage.classList.add('hidden');
    ui.authSection.classList.add('hidden');
    ui.hero.classList.remove('hidden');
    ui.portal.classList.remove('hidden');
    ui.footer.classList.remove('hidden');
    
    // Update active users count
    updateStats();
    updateStatsDisplay();
    
    ui.semesterTitle.textContent = 'Select a semester';
    ui.subjectList.innerHTML = '';
    state.activeSemester = null;
    
    // Show/hide admin panel based on role (default to student if no role)
    const userRole = state.user.role || 'student';
    if (userRole === 'admin') {
        ui.adminPanel.classList.remove('hidden');
        ui.addEventBtn.style.display = 'block';
        ui.addEventBtn.classList.remove('ghost');
        ui.addEventBtn.classList.add('btn-add');
    } else {
        ui.adminPanel.classList.add('hidden');
        ui.addEventBtn.style.display = 'none';
    }
    
    // Render events
    renderEvents();
}

function handleLogout() {
    state.user = null;
    
    // Show landing page, hide auth section and all other sections on logout
    ui.landingPage.classList.remove('hidden');
    ui.authSection.classList.add('hidden');
    ui.hero.classList.add('hidden');
    ui.portal.classList.add('hidden');
    ui.adminPanel.classList.add('hidden');
    ui.footer.classList.add('hidden');
    
    // Update stats
    updateStats();
    updateStatsDisplay();
    
    ui.loginForm.reset();
    ui.signupForm.reset();
    ui.loginFeedback.textContent = '';
    ui.signupFeedback.textContent = '';
    showToast('Logged out securely.', 'success');
}

function renderSemesters() {
    ui.semesterGrid.innerHTML = '';
    semesterCatalog.forEach((sem, index) => {
        const card = document.createElement('button');
        card.className = 'semester-card';
        card.innerHTML = `
            <span>${sem.vibe}</span>
            <strong>${sem.title}</strong>
        `;
        card.addEventListener('click', () => selectSemester(index, card));
        ui.semesterGrid.appendChild(card);
    });
    refreshAdminControls();
    if (Number.isInteger(state.activeSemester) && semesterCatalog[state.activeSemester]) {
        const activeCard = ui.semesterGrid.children[state.activeSemester];
        if (activeCard) {
            activeCard.classList.add('active');
            renderSubjects(semesterCatalog[state.activeSemester]);
            ui.semesterTitle.textContent = semesterCatalog[state.activeSemester].title;
        }
    }
}

function selectSemester(index, cardRef) {
    state.activeSemester = index;
    [...ui.semesterGrid.children].forEach(card => card.classList.remove('active'));
    cardRef.classList.add('active');

    const semester = semesterCatalog[index];
    ui.semesterTitle.textContent = semester.title;
    renderSubjects(semester);
}

function renderSubjects(semester) {
    ui.subjectList.innerHTML = '';
    if (!semester.subjects.length) {
        const empty = document.createElement('li');
        empty.className = 'empty-state';
        empty.textContent = 'No courses yet for this semester. Use the admin panel to add some.';
        ui.subjectList.appendChild(empty);
        return;
    }
    semester.subjects.forEach((subject, subjectIndex) => {
        const item = document.createElement('li');
        const btn = document.createElement('button');
        btn.innerHTML = `
            <div>
                <strong>${subject.name}</strong>
                <small>${subject.code}</small>
            </div>
            <span>Download ⤓</span>
        `;
        btn.addEventListener('click', () => downloadMaterial(semester, subject, subjectIndex));
        item.appendChild(btn);
        ui.subjectList.appendChild(item);
    });
}

function downloadMaterial(semester, subject, slot) {
    const resourceSheet = [
        `NMAMIT HyperGrid Material Capsule`,
        `Semester : ${semester.title}`,
        `Subject  : ${subject.name} (${subject.code})`,
        `Bundle ID: HG-${semesterCatalog.indexOf(semester) + 1}${slot + 1}`,
        '',
        'Contents:',
        '- Lecture capsules PDF',
        '- Problem bank with annotated solutions',
        '- Lab checklist & viva prompts',
        '- Quick formula sheet',
        '- Faculty-curated references'
    ].join('\n');

    const blob = new Blob([resourceSheet], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement('a');
    anchor.href = url;
    anchor.download = `${subject.code}-${subject.name.replace(/\s+/g, '-').toLowerCase()}.txt`;
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    URL.revokeObjectURL(url);

    showToast(`${subject.name} material is downloading.`, 'success');
}

function showToast(message, variant = 'success') {
    ui.toast.textContent = message;
    ui.toast.classList.remove('hidden', 'success', 'error');
    ui.toast.classList.add(variant);
    setTimeout(() => {
        ui.toast.classList.add('hidden');
    }, 2800);
}

function handleChatSubmit(event) {
    event.preventDefault();
    const message = ui.chatMessage.value.trim();
    if (!message) return;
    pushMessage(state.persona, message);
    ui.chatMessage.value = '';
    respondAsOpposite();
}

function pushMessage(role, message) {
    const bubble = document.createElement('div');
    bubble.className = `message ${role}`;
    bubble.textContent = message;
    ui.chatWindow.appendChild(bubble);
    ui.chatWindow.scrollTop = ui.chatWindow.scrollHeight;
}

function respondAsOpposite() {
    const responder = state.persona === 'junior' ? 'senior' : 'junior';
    const replies = quickResponses[responder];
    const reply = replies[Math.floor(Math.random() * replies.length)];
    setTimeout(() => pushMessage(responder, reply), 600);
}

function injectPrompt() {
    const sample = sparkPrompts[Math.floor(Math.random() * sparkPrompts.length)];
    if (!ui.chatMessage.value) {
        ui.chatMessage.value = sample;
    } else {
        pushMessage(state.persona, ui.chatMessage.value);
        ui.chatMessage.value = sample;
    }
    ui.chatMessage.focus();
}

function handleAddSemester(event) {
    event.preventDefault();
    
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can add semesters.', 'error');
        return;
    }
    
    const name = ui.newSemesterName.value.trim();
    const vibe = ui.newSemesterVibe.value.trim() || 'New Orbit';
    if (!name) {
        ui.addSemesterFeedback.textContent = 'Enter a semester name.';
        return;
    }
    semesterCatalog.push({
        title: name,
        vibe,
        tags: [],
        subjects: []
    });
    ui.addSemesterForm.reset();
    ui.addSemesterFeedback.textContent = 'Semester inserted.';
    showToast(`${name} added to HyperGrid.`, 'success');
    renderSemesters();
}

function handleRenameSubject(event) {
    event.preventDefault();
    
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can rename courses.', 'error');
        return;
    }
    
    const semesterIndex = parseInt(ui.semesterSelectRename.value, 10);
    const subjectIndex = parseInt(ui.subjectSelectRename.value, 10);
    const newName = ui.newSubjectName.value.trim();
    if (!Number.isInteger(semesterIndex) || !Number.isInteger(subjectIndex)) return;
    if (!newName) {
        ui.renameSubjectFeedback.textContent = 'Provide a new course name.';
        return;
    }
    const semester = semesterCatalog[semesterIndex];
    if (!semester || !semester.subjects[subjectIndex]) return;
    semester.subjects[subjectIndex].name = newName;
    ui.newSubjectName.value = '';
    ui.renameSubjectFeedback.textContent = 'Course name updated.';
    showToast(`Course renamed to ${newName}.`, 'success');
    renderSemesters();
}

function handleAddSubject(event) {
    event.preventDefault();
    
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can add courses.', 'error');
        return;
    }
    
    const semesterIndex = parseInt(ui.semesterSelectAddSubject.value, 10);
    const title = ui.newSubjectTitle.value.trim();
    const code = ui.newSubjectCode.value.trim();
    if (!Number.isInteger(semesterIndex)) return;
    if (!title || !code) {
        ui.addSubjectFeedback.textContent = 'Enter both course title and code.';
        return;
    }
    const semester = semesterCatalog[semesterIndex];
    semester.subjects.push({
        name: title,
        code,
        mood: 'Custom',
        faculty: 'Admin',
        tags: ['Admin added'],
        notes: [],
        links: []
    });
    ui.addSubjectForm.reset();
    ui.addSubjectFeedback.textContent = 'Course added.';
    showToast(`${title} added to ${semester.title}.`, 'success');
    renderSemesters();
}

function handleRemoveSubject(event) {
    event.preventDefault();
    
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can remove courses.', 'error');
        return;
    }
    
    const semesterIndex = parseInt(ui.semesterSelectRemoveSubject.value, 10);
    const subjectIndex = parseInt(ui.subjectSelectRemove.value, 10);
    if (!Number.isInteger(semesterIndex) || !Number.isInteger(subjectIndex)) return;
    const semester = semesterCatalog[semesterIndex];
    if (!semester || !semester.subjects[subjectIndex]) return;
    const [removed] = semester.subjects.splice(subjectIndex, 1);
    ui.removeSubjectFeedback.textContent = `${removed.name} removed.`;
    showToast(`${removed.name} removed from ${semester.title}.`, 'success');
    renderSemesters();
}

function refreshAdminControls() {
    if (!ui.semesterSelectRename) return;
    if (!semesterCatalog.length) {
        ui.semesterSelectRename.innerHTML = '';
        ui.semesterSelectAddSubject.innerHTML = '';
        ui.semesterSelectRemoveSubject.innerHTML = '';
        ui.subjectSelectRename.innerHTML = '';
        ui.subjectSelectRemove.innerHTML = '';
        return;
    }
    const semesterOptions = semesterCatalog
        .map((sem, index) => `<option value="${index}">${sem.title}</option>`)
        .join('');

    [ui.semesterSelectRename, ui.semesterSelectAddSubject, ui.semesterSelectRemoveSubject].forEach(select => {
        if (!select) return;
        const previous = select.value;
        select.innerHTML = semesterOptions;
        if (previous && semesterCatalog[previous]) {
            select.value = previous;
        }
    });

    populateSubjectSelect(ui.subjectSelectRename, ui.semesterSelectRename.value);
    populateSubjectSelect(ui.subjectSelectRemove, ui.semesterSelectRemoveSubject.value);
}

function populateSubjectSelect(selectEl, semesterIndex) {
    if (!selectEl) return;
    const idx = parseInt(semesterIndex, 10);
    const semester = semesterCatalog[idx];
    if (!semester) {
        selectEl.innerHTML = '';
        return;
    }
    const subjectOptions = semester.subjects
        .map((subject, index) => `<option value="${index}">${subject.name}</option>`)
        .join('');
    selectEl.innerHTML = subjectOptions;
}

function handleAttendanceCalculate(event) {
    if (event && event.preventDefault) {
        event.preventDefault();
    }
    
    const happened = parseFloat(ui.classesHappened.value);
    const attended = parseFloat(ui.classesAttended.value);
    
    // Reset if inputs are empty or invalid
    if (isNaN(happened) || isNaN(attended) || happened < 0 || attended < 0) {
        ui.attendancePercentage.textContent = '--';
        ui.attendanceStatus.textContent = '';
        ui.attendanceStatus.className = 'result-status';
        return;
    }
    
    // Validate that attended doesn't exceed happened
    if (attended > happened) {
        ui.attendancePercentage.textContent = 'Error';
        ui.attendanceStatus.textContent = 'Attended cannot exceed total classes';
        ui.attendanceStatus.className = 'result-status error';
        return;
    }
    
    // Calculate percentage
    const percentage = (attended / happened) * 100;
    const roundedPercentage = Math.round(percentage * 100) / 100; // Round to 2 decimal places
    
    ui.attendancePercentage.textContent = `${roundedPercentage}%`;
    
    // Set status based on percentage
    if (roundedPercentage > 85) {
        ui.attendanceStatus.textContent = 'oh oh seems like you are sincere student';
        ui.attendanceStatus.className = 'result-status success';
    } else if (roundedPercentage >= 75) {
        ui.attendanceStatus.textContent = 'Get ready to pay 500 rupess';
        ui.attendanceStatus.className = 'result-status warning';
    } else {
        ui.attendanceStatus.textContent = 'lets meet in Summer Sem';
        ui.attendanceStatus.className = 'result-status error';
    }
}

function initializeStats() {
    const stats = JSON.parse(localStorage.getItem(statsKey) || '{}');
    if (!stats.totalRegistrations) {
        stats.totalRegistrations = 0;
    }
    if (!stats.notesUploaded) {
        stats.notesUploaded = 0;
    }
    localStorage.setItem(statsKey, JSON.stringify(stats));
}

function updateStats() {
    const usersList = JSON.parse(localStorage.getItem(usersKey) || '[]');
    const currentUser = state.user ? state.user.email : null;
    
    // Set fixed values for display
    const activeUsers = 80;
    
    // Set fixed total registrations
    const totalRegistrations = 169;
    
    // Get notes uploaded (count all subjects across all semesters)
    const notesUploaded = semesterCatalog.reduce((total, sem) => total + sem.subjects.length, 0);
    
    const stats = {
        activeUsers,
        totalRegistrations,
        notesUploaded
    };
    
    localStorage.setItem(statsKey, JSON.stringify(stats));
    return stats;
}

function updateStatsDisplay() {
    const stats = updateStats();
    if (ui.activeUsers) ui.activeUsers.textContent = stats.activeUsers;
    if (ui.totalRegistrations) ui.totalRegistrations.textContent = stats.totalRegistrations;
    if (ui.notesUploaded) ui.notesUploaded.textContent = stats.notesUploaded;
}

// Events Management Functions
function initializeDummyEvents() {
    const existingEvents = getEvents();
    if (existingEvents.length > 0) return; // Don't overwrite if events already exist
    
    const dummyEvents = [
        {
            id: '1',
            name: 'AI Innovation Hackathon 2024',
            type: 'hackathon',
            description: 'Build innovative AI solutions using machine learning and deep learning. Prizes worth ₹50,000. Open to all engineering students.',
            date: '2024-03-15',
            location: 'NMAMIT Campus, Nitte',
            link: 'https://example.com/hackathon1'
        },
        {
            id: '2',
            name: 'Web Development Workshop',
            type: 'workshop',
            description: 'Learn modern web development with React, Node.js, and MongoDB. Hands-on sessions with industry experts.',
            date: '2024-03-20',
            location: 'Online',
            link: 'https://example.com/workshop1'
        },
        {
            id: '3',
            name: 'Code Sprint Competition',
            type: 'competition',
            description: 'Competitive programming contest with 5 rounds. Test your algorithmic skills and win exciting prizes.',
            date: '2024-03-25',
            location: 'NMAMIT Computer Lab',
            link: null
        },
        {
            id: '4',
            name: 'Blockchain & Cryptocurrency Seminar',
            type: 'seminar',
            description: 'Understanding blockchain technology, smart contracts, and the future of decentralized systems. Guest speaker from industry.',
            date: '2024-04-01',
            location: 'NMAMIT Auditorium',
            link: 'https://example.com/seminar1'
        },
        {
            id: '5',
            name: 'Cybersecurity Hackathon',
            type: 'hackathon',
            description: 'Focus on cybersecurity challenges, ethical hacking, and network security. Teams of 2-4 members allowed.',
            date: '2024-04-10',
            location: 'NMAMIT Campus',
            link: 'https://example.com/hackathon2'
        },
        {
            id: '6',
            name: 'IoT Innovation Challenge',
            type: 'competition',
            description: 'Design and implement IoT solutions for smart campus. Hardware and software components provided. Registration fee: ₹500.',
            date: '2024-04-15',
            location: 'NMAMIT Electronics Lab',
            link: null
        }
    ];
    
    saveEvents(dummyEvents);
}

function getEvents() {
    return JSON.parse(localStorage.getItem(eventsKey) || '[]');
}

function saveEvents(events) {
    localStorage.setItem(eventsKey, JSON.stringify(events));
}

function renderEvents() {
    const events = getEvents();
    const userRole = state.user?.role || 'student';
    
    if (!ui.eventsGrid) return;
    
    ui.eventsGrid.innerHTML = '';
    
    if (events.length === 0) {
        const empty = document.createElement('div');
        empty.className = 'empty-events';
        empty.textContent = 'No events available. Check back later!';
        ui.eventsGrid.appendChild(empty);
        return;
    }
    
    events.forEach((event, index) => {
        const eventCard = document.createElement('article');
        eventCard.className = 'event-card';
        eventCard.innerHTML = `
            <div class="event-header">
                <div>
                    <span class="event-type">${event.type}</span>
                    <h4>${event.name}</h4>
                </div>
                ${userRole === 'admin' ? `
                    <div class="event-actions">
                        <button class="ghost edit-event" data-index="${index}">Edit</button>
                        <button class="ghost delete-event" data-index="${index}">Delete</button>
                    </div>
                ` : ''}
            </div>
            <p class="event-description">${event.description}</p>
            <div class="event-details">
                <div class="event-detail">
                    <span class="detail-icon">📅</span>
                    <span>${new Date(event.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                </div>
                <div class="event-detail">
                    <span class="detail-icon">📍</span>
                    <span>${event.location}</span>
                </div>
            </div>
            ${userRole === 'student' ? `
                <button class="register-event-btn" data-index="${index}">
                    ${isRegisteredForEvent(event.id) ? '✓ Registered' : 'Register'}
                </button>
            ` : ''}
            ${event.link ? `
                <a href="${event.link}" target="_blank" class="event-link">External Link ↗</a>
            ` : ''}
        `;
        
        if (userRole === 'student') {
            const registerBtn = eventCard.querySelector('.register-event-btn');
            if (registerBtn) {
                registerBtn.addEventListener('click', () => handleEventRegistration(event.id, index));
            }
        }
        
        if (userRole === 'admin') {
            const editBtn = eventCard.querySelector('.edit-event');
            const deleteBtn = eventCard.querySelector('.delete-event');
            if (editBtn) editBtn.addEventListener('click', () => openEventForm(index));
            if (deleteBtn) deleteBtn.addEventListener('click', () => deleteEvent(index));
        }
        
        ui.eventsGrid.appendChild(eventCard);
    });
}

function isRegisteredForEvent(eventId) {
    const registrations = JSON.parse(localStorage.getItem(eventRegistrationsKey) || '{}');
    const userEmail = state.user?.email;
    return userEmail && registrations[eventId]?.includes(userEmail);
}

function handleEventRegistration(eventId, index) {
    if (!state.user) {
        showToast('Please log in to register for events.', 'error');
        return;
    }
    
    const registrations = JSON.parse(localStorage.getItem(eventRegistrationsKey) || '{}');
    const userEmail = state.user.email;
    
    if (!registrations[eventId]) {
        registrations[eventId] = [];
    }
    
    if (registrations[eventId].includes(userEmail)) {
        // Unregister
        registrations[eventId] = registrations[eventId].filter(email => email !== userEmail);
        showToast('Registration cancelled.', 'success');
    } else {
        // Register
        registrations[eventId].push(userEmail);
        showToast('Successfully registered for event!', 'success');
    }
    
    localStorage.setItem(eventRegistrationsKey, JSON.stringify(registrations));
    renderEvents();
}

function openEventForm(index = null) {
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can add or edit events.', 'error');
        return;
    }
    
    if (index !== null) {
        const events = getEvents();
        const event = events[index];
        ui.eventId.value = event.id;
        ui.eventName.value = event.name;
        ui.eventType.value = event.type;
        ui.eventDescription.value = event.description;
        ui.eventDate.value = event.date;
        ui.eventLocation.value = event.location;
        ui.eventLink.value = event.link || '';
        ui.eventFormTitle.textContent = 'Edit Event';
        ui.eventSubmitBtn.textContent = 'Update Event';
    } else {
        ui.eventForm.reset();
        ui.eventId.value = '';
        ui.eventFormTitle.textContent = 'Add New Event';
        ui.eventSubmitBtn.textContent = 'Add Event';
    }
    ui.eventFormModal.classList.remove('hidden');
}

function closeEventForm() {
    ui.eventFormModal.classList.add('hidden');
    ui.eventForm.reset();
    ui.eventId.value = '';
}

function handleEventSubmit(event) {
    event.preventDefault();
    
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can add or edit events.', 'error');
        closeEventForm();
        return;
    }
    
    const events = getEvents();
    const eventId = ui.eventId.value;
    const eventData = {
        id: eventId || Date.now().toString(),
        name: ui.eventName.value.trim(),
        type: ui.eventType.value,
        description: ui.eventDescription.value.trim(),
        date: ui.eventDate.value,
        location: ui.eventLocation.value.trim(),
        link: ui.eventLink.value.trim() || null
    };
    
    if (eventId) {
        // Update existing event
        const index = events.findIndex(e => e.id === eventId);
        if (index !== -1) {
            events[index] = eventData;
            showToast('Event updated successfully.', 'success');
        }
    } else {
        // Add new event
        events.push(eventData);
        showToast('Event added successfully.', 'success');
    }
    
    saveEvents(events);
    renderEvents();
    closeEventForm();
}

function deleteEvent(index) {
    // Check if user is admin
    const userRole = state.user?.role || 'student';
    if (userRole !== 'admin') {
        showToast('Only admins can delete events.', 'error');
        return;
    }
    
    if (!confirm('Are you sure you want to delete this event?')) return;
    
    const events = getEvents();
    events.splice(index, 1);
    saveEvents(events);
    renderEvents();
    showToast('Event deleted.', 'success');
}

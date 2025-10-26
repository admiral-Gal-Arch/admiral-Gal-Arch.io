document.addEventListener('DOMContentLoaded', () => {
    const ideaBtn = document.getElementById('generate-idea-btn');
    const ideaContainer = document.getElementById('idea-container');
    const ideaLoader = document.getElementById('idea-loader');
    const ideaContent = document.getElementById('idea-content');

    const adviceModal = document.getElementById('advice-modal');
    const modalContentBox = document.getElementById('modal-content-box');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalTitle = document.getElementById('modal-title');
    const modalLoader = document.getElementById('modal-loader');
    const modalAdviceContent = document.getElementById('modal-advice-content');

    const trackAdviceButtons = document.querySelectorAll('[data-track]');

    const callGeminiAPI = async (prompt) => {
        // IMPORTANT: Replace with your actual API key
        const apiKey = "";
        const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
            });

            if (!response.ok) {
                throw new Error(`API Error: ${response.status}`);
            }
            const result = await response.json();

            if (result.candidates && result.candidates.length > 0 && result.candidates[0].content.parts.length > 0) {
                return result.candidates[0].content.parts[0].text;
            } else {
                return "Sorry, I couldn't generate a response. Please try again.";
            }
        } catch (error) {
            console.error("Gemini API call failed:", error);
            return `An error occurred. Please check the console for details. Make sure you have a valid API key.`;
        }
    };

    if (ideaBtn) {
        ideaBtn.addEventListener('click', async () => {
            ideaContainer.classList.remove('hidden');
            ideaLoader.classList.remove('hidden');
            ideaContent.classList.add('hidden');

            const prompt = "You are an inspiring hackathon idea generator. Based on a space-themed hackathon called 'The Galactic Archives' which uses APIs from NASA, SpaceX, and the ISS, generate a unique and creative project idea. The idea should be suitable for one of three tracks: 'The Astrogator\\'s AI', 'The Celestial Cartographer', or 'Alien Artifacts Division'. Format the response as simple HTML with a h4 tag for a catchy title, and p tags for a one-sentence summary, the suggested track, and a brief description of how it would work.";

            const responseText = await callGeminiAPI(prompt);

            ideaContent.innerHTML = responseText;
            ideaLoader.classList.add('hidden');
            ideaContent.classList.remove('hidden');
        });
    }

    const openModal = () => {
        adviceModal.classList.remove('opacity-0', 'pointer-events-none');
        modalContentBox.classList.remove('scale-95');
    };

    const closeModal = () => {
        adviceModal.classList.add('opacity-0', 'pointer-events-none');
        modalContentBox.classList.add('scale-95');
    };

    trackAdviceButtons.forEach(button => {
        button.addEventListener('click', async (e) => {
            const track = e.target.dataset.track;
            modalTitle.textContent = `✨ ${track} Track Advisor`;
            modalLoader.classList.remove('hidden');
            modalAdviceContent.classList.add('hidden');
            openModal();

            let prompt = "";
            if (track === 'AI') {
                prompt = "You are an expert AI/ML mentor. For a hackathon track called 'The Astrogator\\'s AI' using NASA and SpaceX data, provide three specific, actionable tips for a student team to create a standout project. Focus on unique model ideas, data sourcing, and potential challenges. Format as simple HTML with p tags for each tip.";
            } else if (track === 'Visualization') {
                prompt = "You are an expert data visualization mentor. For a hackathon track called 'The Celestial Cartographer' using NASA and SpaceX data, provide three specific, actionable tips for a student team. Focus on unique visualization techniques, data storytelling, and interactivity. Format as simple HTML with p tags for each tip.";
            } else if (track === 'Creative') {
                prompt = "You are an expert creative technology mentor. For a hackathon track called 'Alien Artifacts Division' using NASA and SpaceX data, provide three specific, actionable tips for a student team. Focus on novelty, user engagement, and combining different APIs in surprising ways. Format as simple HTML with p tags for each tip.";
            }

            const responseText = await callGeminiAPI(prompt);
            modalAdviceContent.innerHTML = responseText;
            modalLoader.classList.add('hidden');
            modalAdviceContent.classList.remove('hidden');
        });
    });

    closeModalBtn.addEventListener('click', closeModal);
    adviceModal.addEventListener('click', (e) => {
        if (e.target === adviceModal) {
            closeModal();
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const institutions = [
        "University of Aberdeen", "Abertay University", "Aberystwyth University", "Anglia Ruskin University", 
        "Arden University", "Aston University", "Bangor University", "University of Bath", 
        "Bath Spa University", "University of Bedfordshire", "Birkbeck, University of London", 
        "University of Birmingham", "Birmingham City University", "University College Birmingham", 
        "Bishop Grosseteste University", "University of Bolton", "Arts University Bournemouth", 
        "Bournemouth University", "BPP University", "University of Bradford", "University of Brighton", 
        "University of Bristol", "Brunel University London", "University of Buckingham", 
        "Buckinghamshire New University", "University of Cambridge", "Canterbury Christ Church University", 
        "Cardiff University", "Cardiff Metropolitan University", "University of Chester", 
        "University of Chichester", "City, University of London", "Coventry University", "Cranfield University", 
        "University for the Creative Arts", "University of Cumbria", "De Montfort University", 
        "University of Derby", "University of Dundee", "Durham University", "University of East Anglia", 
        "University of East London", "Edge Hill University", "The University of Edinburgh", 
        "Edinburgh Napier University", "University of Essex", "University of Exeter", "Falmouth University", 
        "University of Glasgow", "Glasgow Caledonian University", "University of Gloucestershire", 
        "Goldsmiths, University of London", "University of Greenwich", "Harper Adams University", 
        "Hartpury University", "Heriot-Watt University", "University of Hertfordshire", 
        "University of the Highlands and Islands", "University of Huddersfield", "University of Hull", 
        "Imperial College London", "Keele University", "University of Kent", "King's College London", 
        "Kingston University", "University of Central Lancashire", "Lancaster University", 
        "University of Leeds", "Leeds Arts University", "Leeds Beckett University", "Leeds Trinity University", 
        "University of Leicester", "University of Lincoln", "University of Liverpool", 
        "Liverpool Hope University", "Liverpool John Moores University", "London Metropolitan University", 
        "London School of Economics and Political Science", "London South Bank University", 
        "Loughborough University", "University of Manchester", "Manchester Metropolitan University", 
        "Middlesex University", "Newcastle University", "Newman University, Birmingham", 
        "University of Northampton", "Northumbria University", "Norwich University of the Arts", 
        "University of Nottingham", "Nottingham Trent University", "The Open University", 
        "University of Oxford", "Oxford Brookes University", "Plymouth Marjon University", 
        "University of Plymouth", "Arts University Plymouth", "University of Portsmouth", 
        "Queen Margaret University, Edinburgh", "Queen Mary University of London", 
        "Queen's University Belfast", "Ravensbourne University London", "University of Reading", 
        "Regent's University London", "The Robert Gordon University", "Roehampton University", 
        "Royal Agricultural University", "Royal Holloway, University of London", "University of Salford", 
        "University of Sheffield", "Sheffield Hallam University", "SOAS University of London", 
        "Solent University", "University of St Andrews", "St Mary's University, Twickenham", 
        "Staffordshire University", "University of Stirling", "University of Strathclyde", 
        "University of Suffolk", "University of Sunderland", "University of Surrey", "University of Sussex", 
        "Swansea University", "Teesside University", "University of the Arts London", "Ulster University", 
        "The University of Law", "University College London", "University of Wales", 
        "University of Wales Trinity Saint David", "University of Warwick", "University of West London", 
        "University of the West of England", "University of the West of Scotland", 
        "University of Westminster", "University of Winchester", "University of Wolverhampton", 
        "University of Worcester", "Wrexham University", "University of York", "York St John University",
        "Abingdon and Witney College", "Barnet and Southgate College", "Basingstoke College of Technology",
        "Bedford College", "Bexhill College", "Birkenhead Sixth Form College", "Birmingham Metropolitan College",
        "Blackburn College", "Blackpool and The Fylde College", "Bolton College", "Boston College",
        "Bradford College", "Bridgwater and Taunton College", "Brighton, Hove & Sussex Sixth Form College",
        "Brockenhurst College", "Burnley College", "Burton and South Derbyshire College", "Bury College",
        "Calderdale College", "Cambridge Regional College", "The Chesterfield College", "Chichester College Group",
        "City College Norwich", "City College Plymouth", "City of Bristol College", "City of Liverpool College",
        "Colchester Institute", "Coventry College", "Craven College", "Croydon College",
        "Darlington College", "Derby College", "Doncaster College and University Centre", "Dudley College of Technology",
        "East Kent Colleges Group", "Eastleigh College", "Exeter College", "Farnborough College of Technology",
        "Gateshead College", "Gloucestershire College", "Grantham College", "Grimsby Institute",
        "Halesowen College", "Harlow College", "Hartlepool College of Further Education", "Havant and South Downs College",
        "Heart of Worcestershire College", "Hereford College of Arts", "Hertford Regional College", "Hopwood Hall College",
        "Hugh Baird College", "Hull College", "Isle of Wight College", "Kendal College",
        "Kingston Maurward College", "Kirklees College", "Knowsley Community College", "Lambeth College",
        "Leeds City College", "Leicester College", "Lincoln College", "Loughborough College",
        "Macclesfield College", "The Manchester College", "Middlesbrough College", "Milton Keynes College",
        "Nelson and Colne College", "New College Durham", "New College Swindon", "Newcastle College",
        "North Hertfordshire College", "North Lindsey College", "North Warwickshire and South Leicestershire College",
        "Northampton College", "Northern School of Art", "Norwich City College of Further and Higher Education",
        "Nottingham College", "Oldham College", "Peterborough College", "Petroc",
        "Preston College", "Redcar & Cleveland College", "Reigate College", "Richmond upon Thames College",
        "Rotherham College of Arts and Technology", "Salford City College", "Sandwell College",
        "Scarborough Sixth Form College", "Selby College", "Sheffield College", "Shrewsbury Colleges Group",
        "Solihull College & University Centre", "South & City College Birmingham", "South Devon College",
        "South Essex College", "South Gloucestershire and Stroud College", "South Staffordshire College",
        "South Tyneside College", "Southampton City College", "Southport College", "St Helens College",
        "Stockport College", "Stoke-on-Trent College", "Suffolk New College", "Sunderland College",
        "Tameside College", "Trafford College", "Truro and Penwith College", "Tyne Metropolitan College",
        "Wakefield College", "Walsall College", "Warrington & Vale Royal College", "West College Scotland",
        "West Kent and Ashford College", "West Suffolk College", "Weston College", "Wigan & Leigh College",
        "Wiltshire College & University Centre", "Wirral Metropolitan College", "Yeovil College"
    ].sort();

    const universitySelect = document.getElementById('university');
    const form = document.getElementById('registration-form');
    const emailInput = document.getElementById('email');
    const emailError = document.getElementById('email-error');
    const fullNameInput = document.getElementById('full-name');
    const successMessage = document.getElementById('success-message');
    const genericErrorMessage = document.getElementById('generic-error-message');
    const errorText = document.getElementById('error-text');
    const submitButton = document.getElementById('submit-button');
    
    function populateInstitutions() {
        universitySelect.innerHTML = '<option value="" disabled selected>Select your institution</option>';
        institutions.forEach(inst => {
            const option = document.createElement('option');
            option.value = inst;
            option.textContent = inst;
            universitySelect.appendChild(option);
        });
    }

    function validateEmail() {
        const emailValue = emailInput.value.trim();
        if (emailValue === '' || emailValue.endsWith('.ac.uk')) {
            emailError.classList.add('hidden');
            return true;
        } else {
            emailError.classList.remove('hidden');
            return false;
        }
    }
    
    function hideMessages() {
        successMessage.classList.add('hidden');
        genericErrorMessage.classList.add('hidden');
        emailError.classList.add('hidden');
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        hideMessages();

        const isEmailValid = validateEmail();
        const isFullNameValid = fullNameInput.value.trim() !== '';
        const isUniversityValid = universitySelect.value !== '';
        
        if (isEmailValid && isFullNameValid && isUniversityValid) {
            submitButton.disabled = true;
            submitButton.textContent = "Registering...";
            
            // Simulate a successful network request
            setTimeout(() => {
                console.log('Form submitted with:', {
                    fullName: fullNameInput.value,
                    email: emailInput.value,
                    university: universitySelect.value
                });

                successMessage.classList.remove('hidden');
                form.reset();
                submitButton.disabled = false;
                submitButton.textContent = "Register Now";
            }, 1500);

        } else {
            errorText.textContent = "Please fill out all fields correctly and try again.";
            genericErrorMessage.classList.remove('hidden');
            if (!isEmailValid) emailError.classList.remove('hidden');
        }
    });
    
    emailInput.addEventListener('input', validateEmail);

    // Initial setup
    populateInstitutions();
});
/* ==========================================================
   Career Exploration Assessment - PRODUCTION ENGINE SYSTEM
========================================================== */

// TIMER TRACKING CRITICAL GLOBAL STATE VARIABLES
let assessmentStartTime = null;
let assessmentEndTime = null;
let assessmentTimeTaken = 0; 

let currentQuestion = 0;
let answers = {};
let studentInfo = {};
let currentLanguageMode = "english"; // Default 'english'

const STORAGE_KEY = "career_discovery_assessment_v3";
const ADMIN_DB_KEY = "career_discovery_admin_records_db";
const ADMIN_PASSWORD = "TNMS2026";

/* SYSTEM TEXT LOCALIZATION DICTIONARY ENGINE */
const uiLocalizationMap = {
    tamil: {
        page_title: "தொழில்நெறி கண்டறியும் மதிப்பீட்டு முறைமை",
        loader_text: "அறிக்கை தயாரிப்பு...",
        admin_login_title: "நிர்வாகி உள்நுழைவு",
        admin_placeholder: "கடவுச்சொல்லை உள்ளிடவும்",
        admin_login_btn: "உள்நுழை",
        admin_cancel_btn: "ரத்துசெய்",
        hero_title: "தொழில் வழிகாட்டல் திறன் கண்டறிதல் மதிப்பீட்டு அமைப்பு",
        hero_subtitle: "உங்கள் திறன்களை கண்டறியுங்கள், உங்கள் கற்றல் சுயவிவரத்தைப் புரிந்துகொள்ளுங்கள், மற்றும் உங்களுக்கு ஏற்ற தொழில் வாய்ப்புகளை ஆராயுங்கள்.",
        welcome_badge: "🎯 உங்கள் திறன்களைக் கண்டறியுங்கள்",
        welcome_title_main: "உங்கள் திறன்களைக் கண்டறியுங்கள். உங்கள் எதிர்காலத்தை வடிவமைக்கவும்.",
        welcome_desc: "உங்கள் திறன்களைப் புரிந்துகொண்டு, உங்களுக்கான தொழில்நெறிகளை ஆராய்ந்து, உங்கள் எதிர்காலப் பயணத்தைத் திட்டமிடுங்கள்.",
        feat_1_title: "100 கேள்விகள்", feat_1_desc: "எளிமையான வினாக்கள்",
        feat_2_title: "நுண்ணறிவு பகுப்பாய்வு", feat_2_desc: "பல்வகை அறிவுத்திறன்",
        feat_3_title: "தொழில் பரிந்துரைகள்", feat_3_desc: "பொருத்தமான வாய்ப்புகள்",
        feat_4_title: "PDF அறிக்கை", feat_4_desc: "பதிவிறக்கம் செய்யும் வசதி",
        start_journey_btn: "உங்கள் பயணத்தைத் தொடங்குங்கள் →",
        reg_title: "மாணவர் பதிவு",
        label_name: "மாணவர் பெயர்",
        label_emis: "இ.எம்.ஐ.எஸ் (EMIS) எண்",
        label_standard: "வகுப்பு",
        opt_select: "தேர்வு செய்க",
        label_medium: "பயிற்று மொழி",
        opt_select_medium: "தேர்வு செய்க",
        label_school: "பள்ளியின் பெயர்",
        label_district: "மாவட்டத்தின் பெயர்",
        opt_select_district: "மாவட்டத்தைத் தேர்வு செய்க",
        start_assessment_btn: "மதிப்பீட்டைத் தொடங்கு",
        answered_txt: "பதிலளிக்கப்பட்டவை",
        btn_prev: "← முந்தையது",
        btn_next: "அடுத்தது →",
        btn_submit: "அறிக்கை பெறுக",
        btn_download_report: "PDF அறிக்கையைப் பதிவிறக்கவும்",
        admin_login_link: "நிர்வாகி உள்நுழைவு"
    },
    english: {
        page_title: "Career Discovery Assessment System",
        loader_text: "Generating Assessment Report...",
        admin_login_title: "Administrator Login",
        admin_placeholder: "Enter Password",
        admin_login_btn: "Login",
        admin_cancel_btn: "Cancel",
        hero_title: "Career Discovery Assessment System",
        hero_subtitle: "Discover your strengths, understand your learning profile, and Explore you career Pathways",
        welcome_title_main: "Discover Your Strengths. Shape Your Future.",
        welcome_desc: "Understand your abilities, explore careers, and plan your future journey.",
        feat_1_title: "100 Questions", feat_1_desc: "Simple and intuitive",
        feat_2_title: "Intelligence Analysis", feat_2_desc: "Multiple Intelligences",
        feat_3_title: "Career Matches", feat_3_desc: "Best options for you",
        feat_4_title: "PDF Report", feat_4_desc: "Personalized dossier",
        start_journey_btn: "Click for registration →",
        reg_title: "Student Registration",
        label_name: "Student Name",
        label_emis: "EMIS No",
        label_standard: "Standard",
        opt_select: "Select",
        label_medium: "Medium",
        opt_select_medium: "Select Medium",
        label_school: "School Name",
        label_district: "District Name",
        opt_select_district: "Select District",
        start_assessment_btn: "Start Assessment",
        answered_txt: "Answered",
        btn_prev: "← Previous",
        btn_next: "Next →",
        btn_submit: "Generate Report",
        btn_download_report: "Download PDF Report",
        admin_login_link: "Admin Login"
    }
};

/* EXTENDED META LOCALIZATION TRANSLATION REFERENCES FOR DOMAIN FEEDBACKS */
const learnBestTranslations = {
    linguistic: {
        english: "Through reading articles, verbal discussions, structural essay composing, and engaging speech debates.",
        tamil: "கட்டுரைகளை வாசிப்பதன் மூலமும், வாய்மொழி விவாதங்கள், முறையான கட்டுரை எழுதுதல் மற்றும் பேச்சுப் போட்டிகளில் ஈடுபடுவதன் மூலமும்."
    },
    logical: {
        english: "Through step-by-step schematic pattern calculation, resolving math equations, and logical algorithmic computing puzzles.",
        tamil: "படிப்படியான திட்டவட்டமான கணக்கீடுகள், கணித சமன்பாடுகளைத் தீர்ப்பது மற்றும் தருக்க வழிமுறை கணினி புதிர்கள் மூலமும்."
    },
    spatial: {
        english: "Using visual schematic reference blueprints, infographics layout templates, diagrams, and illustrative mind maps.",
        tamil: "காட்சி சார்ந்த குறிப்பு வரைபடங்கள், தகவல் வரைபடங்கள், விளக்கப்படங்கள் மற்றும் விளக்க மன வரைபடங்களைப் பயன்படுத்துவதன் மூலமும்."
    },
    bodily: {
        english: "By physical movement execution, active tactile model manipulation, lab experiments, and hands-on operational trial practices.",
        tamil: "உடல் இயக்கச் செயல்பாடுகள், நேரடி தொடு உணர்வு மாதிரிகள் கையாளுதல், ஆய்வக சோதனைகள் மற்றும் நடைமுறை பயிற்சி மூலமும்."
    },
    musical: {
        english: "By integrating melodic rhythmic loops, sound audio tracking elements, mnemonic tone rhymes, and acoustic pattern intervals.",
        tamil: "இசை தாள சுழற்சிகள், ஒலி அலை கூறுகள், நினைவக தொனி பாடல்கள் மற்றும் ஒலி வடிவ இடைவெளிகளை ஒருங்கிணைப்பதன் மூலமும்."
    },
    interpersonal: {
        english: "Through interactive shared workshop collaboration, group team project tasks, peer training, and dialogue exchange circles.",
        tamil: "பரஸ்பர கூட்டுப் பணிமனைகள், குழு திட்டப்பணிகள், சக மாணவர் பயிற்சி மற்றும் கூட்டு உரையாடல் பரிமாற்ற வட்டங்கள் மூலமும்."
    },
    intrapersonal: {
        english: "Via solitary independent modular exploration, quiet contemplative self-analysis logs, and customized goal tracking pathways.",
        tamil: "தனிப்பட்ட சுயாதீன ஆய்வுத் தொகுதிகள், அமைதியான சுயபகுப்பாய்வு பதிவுகள் மற்றும் தனிப்பயனாக்கப்பட்ட இலக்கு கண்காணிப்பு வழிகள் மூலமும்."
    },
    naturalistic: {
        english: "Inside open natural ecological settings, processing biological species classification taxonomy, and context field research trips.",
        tamil: "இயற்கையான சுற்றுச்சூழல் அமைப்புகள், உயிரியல் இனங்களின் வகைப்பாடு மற்றும் கள ஆராய்ச்சிப் பயணங்கள் மூலமும்."
    }
};

const skillsDevelopTranslations = {
    linguistic: { english: "Advanced Editorial Synthesis, Verbal Presentational Expression, Rhetorical Persuasion Articulation.", tamil: "மேம்பட்ட தலையங்கத் தொகுப்பு, வாய்மொழி விளக்கக்காட்சி வெளிப்பாடு, சொல்லாட்சித் திறன்." },
    logical: { english: "Algorithmic Debugging Computations, Quantative Statistical Analytics, Deductive Proof Verification.", tamil: "நிரலாக்க பிழைதிருத்த கணக்கீடுகள், புள்ளிவிவர பகுப்பாய்வு, அனுமான சரிபார்ப்பு." },
    spatial: { english: "Architectural Drafting Blueprinting, Dynamic Layout Interface Modeling, Spatial Prototyping.", tamil: "கட்டிடக்கலை வரைவு வரைபடங்கள், இடைமுக வடிவமைப்பு மாதிரியாக்கம், முப்பரிமாண முன்மாதிரி உருவாக்கம்." },
    bodily: { english: "Tactile Structural Craftsmanship, Precision Kinesthetic Dexterity, Instrumental Mechanics Calibration.", tamil: "தொடு உணர்வு சார்ந்த கைவினைத்திறன், துல்லியமான உடல் இயக்கத்திறன், கருவி இயக்கவியல் அளவுத்திருத்தம்." },
    musical: { english: "Acoustic Pitch Harmonization, Rhythmic Arrangement Composition, Sonic Frequency Discrimination.", tamil: "ஒலியியல் சுருதி ஒத்திசைவு, தாள அமைப்பு உருவாக்கம், ஒலி அதிர்வெண் வேறுபாடு அறிதல்." },
    interpersonal: { english: "Mediation Conflict Arbitration, Synergistic Team Leadership, Empathic Relationship Facilitation.", tamil: "சமரசம் மற்றும் முரண்பாடுகளைத் தீர்த்தல், கூட்டு குழு தலைமை, கூட்டுறவு உறவு மேம்பாடு." },
    intrapersonal: { english: "Strategic Behavioral Regulation, Objective Self-Performance Auditing, Metacognitive Mapping.", tamil: "வியூக நடத்தை ஒழுங்குமுறை, சுய செயல்திறன் தணிக்கை, மெட்டா-அறிவாற்றல் வரைபடம்." },
    naturalistic: { english: "Ecological Specimen Classification, Environmental Impact Analytics, Biological Habitat Diagnostics.", tamil: "சுற்றுச்சூழல் மாதிரி வகைப்பாடு, சுற்றுச்சூழல் தாக்க பகுப்பாய்வு, உயிரியல் வாழ்விடக் கண்டறிதல்." }
};

function runUIElementsLocalization() {
    const activeTextSet = uiLocalizationMap[currentLanguageMode];
    
    document.querySelectorAll("[data-localize]").forEach(element => {
        const key = element.getAttribute("data-localize");
        if (activeTextSet[key]) {
            element.textContent = activeTextSet[key];
        }
    });

    document.querySelectorAll("[data-localize-placeholder]").forEach(element => {
        const key = element.getAttribute("data-localize-placeholder");
        if (activeTextSet[key]) {
            element.setAttribute("placeholder", activeTextSet[key]);
        }
    });
}

/* PSYCHOMETRIC DOMAIN METADATA CONFIGURATION */
const domains = [
    { id: "linguistic", name: "Reading & Speaking / வாசிப்பு மற்றும் பேச்சு", englishName: "Reading & Speaking", tamilName: "வாசிப்பு மற்றும் பேச்சு", icon: "📚" },
    { id: "logical", name: "Problem Solving / சிக்கல் தீர்த்தல்", englishName: "Problem Solving", tamilName: "சிக்கல் தீர்த்தல்", icon: "🧩" },
    { id: "spatial", name: "Creativity & Design / படைப்பாற்றல் மற்றும் வடிவமைப்பு", englishName: "Creativity & Design", tamilName: "படைப்பாற்றல் மற்றும் வடிவமைப்பு", icon: "🎨" },
    { id: "bodily", name: "Hands-on Skills / உடல் இயக்கத் திறன்கள்", englishName: "Hands-on Skills", tamilName: "உடல் இயக்கத் திறன்கள்", icon: "⚽" },
    { id: "musical", name: "Music & Rhythm / இசை மற்றும் தாளம்", englishName: "Music & Rhythm", tamilName: "இசை மற்றும் தாளம்", icon: "🎵" },
    { id: "interpersonal", name: "Working with People / பிறருடன் பழகுதல்", englishName: "Working with People", tamilName: "பிறருடன் பழகுதல்", icon: "🤝" },
    { id: "intrapersonal", name: "Self Awareness / சுய விழிப்புணர்வு", englishName: "Self Awareness", tamilName: "சுய விழிப்புணர்வு", icon: "🌟" },
    { id: "naturalistic", name: "Nature & Environment / இயற்கை மற்றும் சுற்றுச்சூழல்", englishName: "Nature & Environment", tamilName: "இயற்கை மற்றும் சுற்றுச்சூழல்", icon: "🌿" }
];

const careerClusters = [
    {
        id: "engineering",
        name: "Engineering & Technology",
        icon: "⚙️",
        description: "Suitable for students who enjoy logical thinking, innovation, mathematics, technology, and problem solving.",
        descriptionTamil: "தருக்க சிந்தனை, புத்தாக்கம், கணிதம், தொழில்நுட்பம் மற்றும் சிக்கல்களைத் தீர்ப்பதில் ஆர்வமுள்ள மாணவர்களுக்கு இது மிகவும் பொருத்தமானது.",
        intelligences: { logical: 5, spatial: 4, bodily: 2, intrapersonal: 2 },
        schoolGroups: ["Mathematics + Physics + Chemistry + Computer Science", "Mathematics + Physics + Chemistry + Biology"],
        entranceExams: ["JEE Main", "JEE Advanced", "State Engineering Counselling"],
        degreePrograms: ["B.E", "B.Tech"],
        careers: ["Software Engineer", "Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Electronics Engineer", "Robotics Engineer"]
    },
    {
        id: "computer_science",
        name: "Computer Science & AI",
        icon: "💻",
        description: "Recommended for students interested in software, AI, coding, and emerging technologies.",
        descriptionTamil: "மென்பொருள், செயற்கை நுண்ணறிவு (AI), கணினி நிரலாக்கம் மற்றும் வளர்ந்து வரும் தொழில்நுட்பங்களில் ஆர்வமுள்ள மாணவர்களுக்குப் பரிந்துரைக்கப்படுகிறது.",
        intelligences: { logical: 5, intrapersonal: 4, spatial: 3, linguistic: 2 },
        schoolGroups: ["Mathematics + Physics + Chemistry + Computer Science"],
        entranceExams: ["JEE", "University Entrance Exams"],
        degreePrograms: ["B.Tech Computer Science", "BCA", "B.Sc Computer Science", "AI & Data Science"],
        careers: ["Software Developer", "AI Engineer", "Data Scientist", "Cyber Security Analyst", "Machine Learning Engineer"]
    },
    {
        id: "medicine",
        name: "Medicine & Healthcare",
        icon: "🩺",
        description: "Ideal for students who enjoy biology, helping others, and healthcare careers.",
        descriptionTamil: "உயிரியல், மற்றவர்களுக்கு உதவுதல் மற்றும் மருத்துவத் துறை சார்ந்த பணிகளில் ஆர்வமுள்ள மாணவர்களுக்கு இது மிகவும் உகந்தது.",
        intelligences: { logical: 4, interpersonal: 5, intrapersonal: 3, naturalistic: 3 },
        schoolGroups: ["Biology + Physics + Chemistry", "Biology + Physics + Chemistry + Mathematics"],
        entranceExams: ["NEET"],
        degreePrograms: ["MBBS", "BDS", "B.Sc Nursing", "Allied Health Sciences", "Pharmacy"],
        careers: ["Doctor", "Dentist", "Nurse", "Physiotherapist", "Pharmacist"]
    },
    {
        id: "agriculture",
        name: "Agriculture & Environmental Science",
        icon: "🌿",
        description: "Suitable for students interested in agriculture, sustainability, environment, and natural sciences.",
        descriptionTamil: "விவசாயம், நிலையான வளர்ச்சி, சுற்றுச்சூழல் மற்றும் இயற்கை அறிவியலில் ஆர்வமுள்ள மாணவர்களுக்குப் பொருத்தமானது.",
        intelligences: { naturalistic: 5, logical: 3, bodily: 2 },
        schoolGroups: ["Biology + Agriculture", "Biology + Mathematics", "Biology + Computer Science"],
        entranceExams: ["ICAR", "State Agriculture Admissions"],
        degreePrograms: ["B.Sc Agriculture", "B.Sc Forestry", "B.Sc Environmental Science"],
        careers: ["Agricultural Scientist", "Environmental Scientist", "Forest Officer", "Wildlife Biologist"]
    },
    {
        id: "law",
        name: "Law & Public Administration",
        icon: "⚖️",
        description: "Recommended for students with strong communication and reasoning abilities.",
        descriptionTamil: "சிறந்த தகவல் தொடர்பு மற்றும் பகுத்தறியும் திறன் கொண்ட மாணவர்களுக்குப் பரிந்துரைக்கப்படும் ஒரு சிறந்த துறை.",
        intelligences: { linguistic: 5, interpersonal: 4, logical: 3 },
        schoolGroups: ["Commerce", "Humanities", "Mathematics Group"],
        entranceExams: ["CLAT", "AILET"],
        degreePrograms: ["BA LLB", "BBA LLB", "LLB"],
        careers: ["Lawyer", "Judge", "Legal Advisor", "Civil Servant"]
    },
    {
        id: "business",
        name: "Business & Management",
        icon: "📈",
        description: "Suitable for students interested in commerce, finance, management, and entrepreneurship.",
        descriptionTamil: "வணிகம், நிதி மேலாண்மை, நிர்வாகம் மற்றும் தொழில்முனைவோர் ஆவதில் ஆர்வமுள்ள மாணவர்களுக்கு ஏற்றது.",
        intelligences: { interpersonal: 4, logical: 4, intrapersonal: 3, linguistic: 2 },
        schoolGroups: ["Commerce + Accountancy", "Commerce + Computer Applications"],
        entranceExams: ["CUET", "University Admissions"],
        degreePrograms: ["B.Com", "BBA", "Finance", "Management"],
        careers: ["Entrepreneur", "Business Analyst", "Accountant", "Financial Consultant"]
    },
    {
        id: "design",
        name: "Design & Architecture",
        icon: "🎨",
        description: "Ideal for creative students interested in visual design, architecture, and innovation.",
        descriptionTamil: "காட்சி வடிவமைப்பு, கட்டிடக்கலை மற்றும் புத்தாக்கத்தில் ஆர்வமுள்ள ஆக்கப்பூர்வமான மாணவர்களுக்கு உகந்தது.",
        intelligences: { spatial: 5, intrapersonal: 3, bodily: 2 },
        schoolGroups: ["Mathematics + Design", "Mathematics + Computer Science"],
        entranceExams: ["NIFT","NATA", "UCEED", "NID DAT"],
        degreePrograms: ["B.Arch", "B.Des", "Interior Design", "Animation"],
        careers: ["Architect", "Graphic Designer", "UI/UX Designer", "Animator"]
    },
    {
        id: "media",
        name: "Media & Communication",
        icon: "🎙️",
        description: "Suitable for students interested in writing, communication, journalism, and content creation.",
        descriptionTamil: "எழுதுதல், தகவல் தொடர்பு, இதழியல் மற்றும் உள்ளடக்க உருவாக்கத்தில் (Content creation) ஆர்வமுள்ள மாணவர்களுக்குப் பொருத்தமானது.",
        intelligences: { linguistic: 5, interpersonal: 4, spatial: 2 },
        schoolGroups: ["Humanities", "Commerce"],
        entranceExams: ["CUET", "University Admissions"],
        degreePrograms: ["Journalism", "Mass Communication", "Digital Media"],
        careers: ["Journalist", "Content Creator", "News Anchor", "Public Relations Officer"]
    }
];

const secondaryPathwayChoices = {
    engineering: "Maths + Physics + Chemistry + Computer Science or Biology + Maths + Physics + Chemistry",
    "Engineering & Technology": "Maths + Physics + Chemistry + Computer Science or Biology + Maths + Physics + Chemistry",
    computer_science: "Maths + Physics + Chemistry + Computer Science",
    "Computer Science & AI": "Maths + Physics + Chemistry + Computer Science",
    "Computer Science, AI & Digital Technologies": "Maths + Physics + Chemistry + Computer Science",
    "Science, Research & Innovation": "Biology + Maths + Physics + Chemistry or Maths + Physics + Chemistry + Computer Science",
    medicine: "Biology + Maths + Physics + Chemistry",
    "Medicine & Healthcare": "Biology + Maths + Physics + Chemistry",
    "Medicine & Clinical Sciences": "Biology + Maths + Physics + Chemistry",
    "Allied Health & Paramedical Sciences": "Biology + Physics + Chemistry + Computer Science or Biology + Maths + Physics + Chemistry",
    agriculture: "Biology + Maths + Physics + Chemistry",
    "Agriculture & Environmental Science": "Biology + Maths + Physics + Chemistry",
    "Agriculture, Food Technology & Rural Development": "Biology + Maths + Physics + Chemistry",
    "Environment, Sustainability & Earth Sciences": "Biology + Maths + Physics + Chemistry",
    "Architecture, Planning & Built Environment": "Maths + Physics + Chemistry + Computer Science or Biology + Maths + Physics + Chemistry",
    design: "Maths + Physics + Chemistry + Computer Science or Biology + Physics + Chemistry + Computer Science",
    "Design & Architecture": "Maths + Physics + Chemistry + Computer Science or Biology + Physics + Chemistry + Computer Science",
    "Design & Creative Technologies": "Maths + Physics + Chemistry + Computer Science or Biology + Physics + Chemistry + Computer Science",
    "Commerce, Finance & Accounting": "Commerce + Accounts + Business Maths + Economics",
    business: "Commerce + Accounts + Business Maths + Economics",
    "Business & Management": "Commerce + Accounts + Business Maths + Economics",
    "Management & Entrepreneurship": "Commerce + Accounts + Business Maths + Economics",
    "Economics, Public Policy & Development Studies": "Commerce + Accounts + Business Maths + Economics",
    law: "Commerce + Accounts + Business Maths + Economics or Biology + Maths + Physics + Chemistry",
    "Law & Public Administration": "Commerce + Accounts + Business Maths + Economics or Biology + Maths + Physics + Chemistry",
    "Law, Governance & Justice": "Commerce + Accounts + Business Maths + Economics or Biology + Maths + Physics + Chemistry",
    "Public Services, Defence & Security": "Biology + Maths + Physics + Chemistry or Commerce + Accounts + Business Maths + Economics",
    "Education, Psychology & Human Development": "Biology + Maths + Physics + Chemistry or Commerce + Accounts + Business Maths + Economics",
    "Humanities & Liberal Arts": "Commerce + Accounts + Business Maths + Economics",
    media: "Commerce + Accounts + Business Maths + Economics or Maths + Physics + Chemistry + Computer Science",
    "Media & Communication": "Commerce + Accounts + Business Maths + Economics or Maths + Physics + Chemistry + Computer Science",
    "Media, Communication & Journalism": "Commerce + Accounts + Business Maths + Economics or Maths + Physics + Chemistry + Computer Science",
    "Hospitality, Tourism, Sports & Service Industries": "Commerce + Accounts + Business Maths + Economics"
};

const responseOptions = [
    { score: 1, tamil: "😕 என்னைப் போல இல்லை", english: "😕 Not Like Me" },
    { score: 2, tamil: "🙂 சிறிதளவு என்னைப் போல", english: "🙂 A Little Like Me" },
    { score: 3, tamil: "😊 பெரும்பாலும் என்னைப் போல", english: "😊 Mostly Like Me" },
    { score: 4, tamil: "🤩 மிகவும் என்னைப் போல", english: "🤩 Very Much Like Me" }
];

const schoolData = {
    "Chennai": ["Chennai District Government Model School"],
    "Tiruvallur": ["Tiruvallur District Government Model School"],
    "Salem": ["Salem District Government Model School"],
    "Coimbatore": ["Coimbatore District Government Model School"],
    "Viluppuram": ["Viluppuram District Government Model School"]
};

/* SYSTEM QUESTIONS MATRIX COLLECTION WITH BILINGUAL SUPPORT */
const questions = [
    // LINGUISTIC
    { id: 1, domain: "linguistic", english: "I enjoy reading books, stories, or articles in my free time.", tamil: "நான் எனது ஓய்வு நேரத்தில் புத்தகங்கள், கதைகள் அல்லது கட்டுரைகளைப் படிப்பதை விரும்புகிறேன்." },
    { id: 2, domain: "linguistic", english: "I like expressing my thoughts through writing.", tamil: "எனது எண்ணங்களை எழுதுவதன் மூலம் வெளிப்படுத்த எனக்குப் பிடிக்கும்." },
    { id: 3, domain: "linguistic", english: "I enjoy telling stories or explaining ideas to others.", tamil: "மற்றவர்களுக்குக் கதைகள் சொல்ல அல்லது யோசனைகளை விளக்க நான் விரும்புகிறேன்." },
    { id: 4, domain: "linguistic", english: "Learning new words and their meanings interests me.", tamil: "புதிய சொற்களையும் அவற்றின் அர்த்தங்களையும் கற்றுக்கொள்வதில் எனக்கு ஆர்வம் உண்டு." },
    { id: 5, domain: "linguistic", english: "I feel confident speaking in front of a class or audience.", tamil: "வகுப்பறை அல்லது பார்வையாளர்களுக்கு முன்னால் நம்பிக்கையுடன் பேசுவேன்." },
    { id: 6, domain: "linguistic", english: "I enjoy debates or discussions on different topics.", tamil: "பல்வேறு தலைப்புகளில் விவாதங்கள் அல்லது கலந்துரையாடல்களில் பங்கேற்பதை விரும்புகிறேன்." },
    { id: 7, domain: "linguistic", english: "I can remember information better by reading it.", tamil: "தகவல்களைப் படிப்பதன் மூலம் என்னால் எளிதாக நினைவில் வைக்க முடியும்." },
    { id: 8, domain: "linguistic", english: "I like writing poems, essays, or creative stories.", tamil: "கவிதைகள், கட்டுரைகள் அல்லது கற்பனைக் கதைகள் எழுத எனக்குப் பிடிக்கும்." },
    { id: 9, domain: "linguistic", english: "People often appreciate my communication skills.", tamil: "மக்கள் பெரும்பாலும் எனது தகவல் தொடர்புத் திறனைப் பாராட்டுகிறார்கள்." },
    { id: 10, domain: "linguistic", english: "I enjoy learning new languages.", tamil: "புதிய மொழிகளைக் கற்றுக்கொள்வதில் நான் மகிழ்ச்சியடைகிறேன்." },
    { id: 11, domain: "linguistic", english: "I prefer assignments that involve reading or writing.", tamil: "வாசிப்பது அல்லது எழுதுவது தொடர்பான பணிகளை நான் அதிகம் விரும்புகிறேன்." },
    { id: 12, domain: "linguistic", english: "I can explain complex ideas in a simple way.", tamil: "கடினமான கருத்துக்களையும் என்னால் எளிமையாக விளக்க முடியும்." },
    { id: 13, domain: "linguistic", english: "I enjoy participating in speeches, quizzes, or literary events.", tamil: "பேச்சுப் போட்டிகள், வினாடி-வினா அல்லது இலக்கிய நிகழ்வுகளில் பங்கேற்பதை விரும்புகிறேன்." },
    // LOGICAL
    { id: 14, domain: "logical", english: "I enjoy solving puzzles and brain teasers.", tamil: "புதிர்கள் மற்றும் மூளைக்கு வேலை கொடுக்கும் கணக்குகளை விடுவிப்பதை நான் விரும்புகிறேன்." },
    { id: 15, domain: "logical", english: "I like finding patterns in numbers or ideas.", tamil: "எண்கள் அல்லது கருத்துக்களில் உள்ள பொதுவான வடிவங்கள்/அமைப்புகளைக் கண்டறிய எனக்குப் பிடிக்கும்." },
    { id: 16, domain: "logical", english: "I enjoy mathematics and calculations.", tamil: "நான் கணிதம் மற்றும் கணக்கீடுகளைச் செய்வதை விரும்புகிறேன்." },
    { id: 17, domain: "logical", english: "I solve problems step by step.", tamil: "பிரச்சனைகளுக்கு நான் படிப்படியாகத் தீர்வு காண்பேன்." },
    { id: 18, domain: "logical", english: "I enjoy science experiments.", tamil: "அறிவியல் சோதனைகளைச் செய்வதில் நான் மகிழ்ச்சியடைகிறேன்." },
    { id: 19, domain: "logical", english: "I enjoy strategy games.", tamil: "திட்டமிட்டு விளையாடும் உத்தி விளையாட்டுகளை நான் விரும்புகிறேன்." },
    { id: 20, domain: "logical", english: "I can identify mistakes in information.", tamil: "தகவல்களில் உள்ள பிழைகளை என்னால் எளிதில் அடையாளம் காண முடியும்." },
    { id: 21, domain: "logical", english: "I enjoy coding or learning about computers.", tamil: "கணினி நிரலாக்கம் (Coding) அல்லது கணினிகளைப் பற்றிக் கற்றுக்கொள்வதை விரும்புகிறேன்." },
    { id: 22, domain: "logical", english: "I analyse information before making decisions.", tamil: "முடிவுகளை எடுப்பதற்கு முன் தகவல்களைச் சீராகப் பகுப்பாய்வு செய்வேன்." },
    { id: 23, domain: "logical", english: "I enjoy understanding how machines work.", tamil: "இயந்திரங்கள் எவ்வாறு செயல்படுகின்றன என்பதைப் புரிந்துகொள்வதில் எனக்கு விருப்பம் உண்டு." },
    { id: 24, domain: "logical", english: "I break large problems into smaller tasks.", tamil: "பெரிய சிக்கல்களைச் சிறிய பகுதிகளாகப் பிரித்துத் தீர்ப்பேன்." },
    { id: 25, domain: "logical", english: "I often ask why and how things happen.", tamil: "விஷயங்கள் ஏன், எப்படி நடக்கின்றன என்று நான் அடிக்கடி கேள்வி எழுப்புவேன்." },
    { id: 26, domain: "logical", english: "I enjoy critical thinking activities.", tamil: "தீர்க்கமாகச் சிந்திக்கும் (Critical thinking) செயல்பாடுகளை நான் விரும்புகிறேன்." },
    // SPATIAL
    { id: 27, domain: "spatial", english: "I enjoy drawing or sketching.", tamil: "நான் வரைவது அல்லது ஓவியம் தீட்டுவதை விரும்புகிறேன்." },
    { id: 28, domain: "spatial", english: "I can imagine objects from different angles.", tamil: "பொருட்களை வெவ்வேறு கோணங்களில் என்னால் கற்பனை செய்து பார்க்க முடியும்." },
    { id: 29, domain: "spatial", english: "I enjoy visual puzzles and mazes.", tamil: "காட்சிப் புதிர்கள் மற்றும் பிரமை (Mazes) விளையாட்டுகளை விரும்புகிறேன்." },
    { id: 30, domain: "spatial", english: "I enjoy decorating or arranging spaces.", tamil: "இடங்களை அலங்கரிப்பது அல்லது ஒழுங்கமைப்பது எனக்குப் பிடிக்கும்." },
    { id: 31, domain: "spatial", english: "I learn better through pictures and diagrams.", tamil: "படங்கள் மற்றும் வரைபடங்கள் மூலம் என்னால் சிறப்பாகக் கற்றுக்கொள்ள முடிகிறது." },
    { id: 32, domain: "spatial", english: "I notice colours, shapes, and designs easily.", tamil: "வண்ணங்கள், வடிவங்கள் மற்றும் வடிவமைப்புக்களை நான் எளிதில் கவனிப்பேன்." },
    { id: 33, domain: "spatial", english: "I enjoy photography or digital art.", tamil: "புகைப்படம் எடுத்தல் அல்லது டிஜிட்டல் கலையில் எனக்கு ஆர்வம் உண்டு." },
    { id: 34, domain: "spatial", english: "I can visualize routes and locations easily.", tamil: "வழிகள் மற்றும் இடங்களை என்னால் எளிதில் மனக்கண்ணில் கொண்டுவர முடியும்." },
    { id: 35, domain: "spatial", english: "I enjoy building models or crafts.", tamil: "மாதிரிகள் (Models) அல்லது கைவினைப் பொருட்கள் செய்வதை விரும்புகிறேன்." },
    { id: 36, domain: "spatial", english: "I enjoy thinking of creative ideas.", tamil: "படைப்பாற்றல் மிக்க புதிய யோசனைகளைச் சிந்திப்பதை நான் விரும்புகிறேன்." },
    { id: 37, domain: "spatial", english: "I enjoy architecture and design-related subjects.", tamil: "கட்டிடக்கலை மற்றும் வடிவமைப்பு தொடர்பான பாடங்களை நான் விரும்புகிறேன்." },
    { id: 38, domain: "spatial", english: "I often think in pictures.", tamil: "நான் பல நேரங்களில் காட்சிகளாகவோ அல்லது படங்களாகவோ சிந்திப்பேன்." },
    { id: 39, domain: "spatial", english: "I enjoy presenting ideas visually.", tamil: "கருத்துக்களைக் காட்சி வடிவில் வழங்குவதை நான் விரும்புகிறேன்." },
    // BODILY-KINESTHETIC
    { id: 40, domain: "bodily", english: "I enjoy sports and physical activities.", tamil: "நான் விளையாட்டுகள் மற்றும் உடல் செயல்பாடுகளை விரும்புகிறேன்." },
    { id: 41, domain: "bodily", english: "I learn better by doing rather than reading.", tamil: "படிப்பதை விடச் செய்து பார்ப்பதன் மூலம் நான் நன்றாகக் கற்றுக்கொள்கிறேன்." },
    { id: 42, domain: "bodily", english: "I enjoy building or fixing things.", tamil: "பொருட்களை உருவாக்குவது அல்லது பழுதுபார்ப்பதை நான் விரும்புகிறேன்." },
    { id: 43, domain: "bodily", english: "I enjoy activities requiring coordination.", tamil: "உடல் உறுப்புகளின் ஒருங்கிணைப்பு தேவைப்படும் செயல்பாடுகளை நான் விரும்புகிறேன்." },
    { id: 44, domain: "bodily", english: "I enjoy dance, drama, or acting.", tamil: "நடனம், நாடகம் அல்லது நடிப்பை நான் விரும்புகிறேன்." },
    { id: 45, domain: "bodily", english: "I prefer practical demonstrations.", tamil: "செய்முறை விளக்கங்களை (Practical demonstrations) நான் அதிகம் விரும்புகிறேன்." },
    { id: 46, domain: "bodily", english: "I enjoy hands-on projects.", tamil: "நேரடியாகக் கைகளால் செய்து பார்க்கும் திட்டப்பணிகளை விரும்புகிறேன்." },
    { id: 47, domain: "bodily", english: "I learn physical skills quickly.", tamil: "உடல் சார்ந்த திறன்களை நான் விரைவாகக் கற்றுக்கொள்வேன்." },
    { id: 48, domain: "bodily", english: "I enjoy outdoor adventure activities.", tamil: "வெளிப்புற சாகச நடவடிக்கைகளில் ஈடுபடுவதை நான் விரும்புகிறேன்." },
    { id: 49, domain: "bodily", english: "I like using tools and equipment.", tamil: "கருவிகள் மற்றும் உபகரணங்களைப் பயன்படுத்த எனக்குப் பிடிக்கும்." },
    { id: 50, domain: "bodily", english: "I feel energetic when physically active.", tamil: "உடல் ரீதியாக சுறுசுறுப்பாக இருக்கும்போது நான் அதிக ஆற்றலுடன் உணர்கிறேன்." },
    // MUSICAL
    { id: 51, domain: "musical", english: "I enjoy listening to music regularly.", tamil: "நான் வழக்கமாக இசை கேட்பதை விரும்புகிறேன்." },
    { id: 52, domain: "musical", english: "I can easily recognize different tunes and melodies.", tamil: "வெவ்வேறு மெட்டுகள் மற்றும் இசையமைப்புகளை என்னால் எளிதில் அடையாளம் காண முடியும்." },
    { id: 53, domain: "musical", english: "I enjoy singing songs.", tamil: "பாடல் பாடுவதை நான் விரும்புகிறேன்." },
    { id: 54, domain: "musical", english: "I like learning musical instruments.", tamil: "இசைக் கருவிகளைக் கற்றுக்கொள்ள எனக்கு விருப்பம் உண்டு." },
    { id: 55, domain: "musical", english: "I can remember songs easily.", tamil: "பாடல்களை என்னால் எளிதில் நினைவில் வைத்துக் கொள்ள முடியும்." },
    { id: 56, domain: "musical", english: "I often tap rhythms while studying or working.", tamil: "படிக்கும்போதோ அல்லது வேலை செய்யும்போதோ நான் அடிக்கடி தாளம் போடுவேன்." },
    { id: 57, domain: "musical", english: "I enjoy participating in music-related activities.", tamil: "இசை தொடர்பான செயல்பாடுகளில் பங்கேற்பதை விரும்புகிறேன்." },
    { id: 58, domain: "musical", english: "Music helps me concentrate or relax.", tamil: "இசை எனக்குக் கவனத்தை ஒருமுகப்படுத்த அல்லது ஓய்வெடுக்க உதவுகிறது." },
    { id: 59, domain: "musical", english: "I can identify differences in musical sounds.", tamil: "இசை ஒலிகளில் உள்ள வேறுபாடுகளை என்னால் கண்டறிய முடியும்." },
    { id: 60, domain: "musical", english: "I enjoy creating or composing music.", tamil: "இசையை உருவாக்க அல்லது இசையமைக்க நான் விரும்புகிறேன்." },
    { id: 61, domain: "musical", english: "I enjoy learning about different styles of music.", tamil: "பல்வேறு இசை வடிவங்களைப் பற்றிக் கற்றுக்கொள்வதில் எனக்கு விருப்பம் உண்டு." },
    { id: 62, domain: "musical", english: "I notice rhythm and beat in songs quickly.", tamil: "பாடல்களில் உள்ள லயம் மற்றும் தாளத்தை நான் விரைவாகக் கவனிப்பேன்." },
    { id: 63, domain: "musical", english: "I enjoy performing music in front of others.", tamil: "மற்றவர்களுக்கு முன்னால் இசை நிகழ்ச்சிகளை நடத்த நான் விரும்புகிறேன்." },
    // INTERPERSONAL
    { id: 64, domain: "interpersonal", english: "I enjoy working with classmates on group activities.", tamil: "வகுப்புத் தோழர்களுடன் குழுச் செயல்பாடுகளில் இணைந்து பணியாற்றுவதை விரும்புகிறேன்." },
    { id: 65, domain: "interpersonal", english: "People often come to me for help or advice.", tamil: "மக்கள் பெரும்பாலும் உதவி அல்லது ஆலோசனைக்காக என்னிடம் வருகிறார்கள்." },
    { id: 66, domain: "interpersonal", english: "I find it easy to make new friends.", tamil: "புதிய நண்பர்களை உருவாக்குவது எனக்கு எளிதாக உள்ளது." },
    { id: 67, domain: "interpersonal", english: "I enjoy helping others learn new things.", tamil: "மற்றவர்கள் புதிய விஷயங்களைக் கற்றுக்கொள்ள உதவுவதில் நான் மகிழ்ச்சியடைகிறேன்." },
    { id: 68, domain: "interpersonal", english: "I enjoy team sports and group projects.", tamil: "கூட்டு விளையாட்டுகள் மற்றும் குழு திட்டப்பணிகளை (Group projects) நான் விரும்புகிறேன்." },
    { id: 69, domain: "interpersonal", english: "I can understand how others are feeling.", tamil: "மற்றவர்கள் என்ன உணர்கிறார்கள் என்பதை என்னால் புரிந்து கொள்ள முடிகிறது." },
    { id: 70, domain: "interpersonal", english: "I enjoy organizing activities or events.", tamil: "செயல்பாடுகள் அல்லது நிகழ்ச்சிகளை ஏற்பாடு செய்வதை நான் விரும்புகிறேன்." },
    { id: 71, domain: "interpersonal", english: "I prefer discussing ideas with others.", tamil: "கருத்துக்களை மற்றவர்களுடன் கலந்துரையாட நான் விரும்புகிறேன்." },
    { id: 72, domain: "interpersonal", english: "I can resolve disagreements peacefully.", tamil: "கருத்து வேறுபாடுகளை என்னால் அமைதியான முறையில் தீர்க்க முடியும்." },
    { id: 73, domain: "interpersonal", english: "I enjoy motivating people.", tamil: "மக்களை ஊக்குவிப்பதில் நான் மகிழ்ச்சியடைகிறேன்." },
    { id: 74, domain: "interpersonal", english: "I am comfortable leading a group discussion.", tamil: "குழு விவாதத்தை வழிநடத்துவதில் நான் தடையின்றி உணர்கிறேன்." },
    { id: 75, domain: "interpersonal", english: "I enjoy volunteering and community activities.", tamil: "தன்னார்வத் தொண்டு மற்றும் சமூகச் செயல்பாடுகளில் ஈடுபடுவதை விரும்புகிறேன்." },
    { id: 76, domain: "interpersonal", english: "Teamwork usually produces better results.", tamil: "கூட்டு முயற்சி (Teamwork) எப்போதும் சிறந்த முடிவுகளைத் தரும் என்று நம்புகிறேன்." },
    // INTRAPERSONAL
    { id: 77, domain: "intrapersonal", english: "I understand my strengths and weaknesses.", tamil: "எனது பலம் மற்றும் பலவீனங்களை நான் தெளிவாகப் புரிந்து வைத்துள்ளேன்." },
    { id: 78, domain: "intrapersonal", english: "I set goals and work towards achieving them.", tamil: "நான் இலக்குகளை நிர்ணயித்து அவற்றை அடைய உழைக்கிறேன்." },
    { id: 79, domain: "intrapersonal", english: "I often think about my future plans.", tamil: "எனது எதிர்காலத் திட்டங்களைப் பற்றி நான் அடிக்கடி சிந்திப்பேன்." },
    { id: 80, domain: "intrapersonal", english: "I understand my emotions well.", tamil: "எனது உணர்ச்சிகளை நான் நன்றாகப் புரிந்து கொள்கிறேன்." },
    { id: 81, domain: "intrapersonal", english: "I make important decisions after self-reflection.", tamil: "சுயசிந்தனைக்குப் பிறகே நான் முக்கியமான முடிவுகளை எடுப்பேன்." },
    { id: 82, domain: "intrapersonal", english: "I stay calm while working independently.", tamil: "தனித்துச் செயல்படும்போது நான் அமைதியாக இருப்பேன்." },
    { id: 83, domain: "intrapersonal", english: "I learn from my mistakes.", tamil: "நான் செய்த தவறுகளில் இருந்து பாடம் கற்றுக்கொள்கிறேன்." },
    { id: 84, domain: "intrapersonal", english: "I know which study methods suit me best.", tamil: "எந்த படிப்பு முறை எனக்குச் சிறப்பாகப் பொருந்தும் என்பதை நான் அறிவேன்." },
    { id: 85, domain: "intrapersonal", english: "I stay calm during difficult situations.", tamil: "கடினமான சூழ்நிலைகளிலும் நான் அமைதியாக இருப்பேன்." },
    { id: 86, domain: "intrapersonal", english: "I regularly evaluate my progress.", tamil: "எனது முன்னேற்றத்தை நான் தொடர்ந்து மதிப்பீடு செய்வேன்." },
    { id: 87, domain: "intrapersonal", english: "I confidently express my opinions.", tamil: "எனது கருத்துக்களை நான் நம்பிக்கையுடன் வெளிப்படுத்துவேன்." },
    { id: 88, domain: "intrapersonal", english: "I take responsibility for my actions.", tamil: "எனது செயல்களுக்கு நானே பொறுப்பேற்கிறேன்." },
    // NATURALISTIC
    { id: 89, domain: "naturalistic", english: "I enjoy spending time in nature.", tamil: "இயற்கையோடு நேரத்தைக் கழிக்க நான் விரும்புகிறேன்." },
    { id: 90, domain: "naturalistic", english: "I enjoy learning about plants and animals.", tamil: "தாவரங்கள் மற்றும் விலங்குகளைப் பற்றிக் கற்றுக்கொள்வதை நான் விரும்புகிறேன்." },
    { id: 91, domain: "naturalistic", english: "I notice differences among plants, animals, and natural objects.", tamil: "தாவரங்கள், விலங்குகள் மற்றும் இயற்கை பொருட்களுக்கு இடையே உள்ள வேறுபாடுகளை நான் எளிதில் கவனிப்பேன்." },
    { id: 92, domain: "naturalistic", english: "I enjoy gardening or taking care of plants.", tamil: "தோட்டம் வளர்ப்பது அல்லது தாவரங்களைப் பராமரிப்பதை நான் விரும்புகிறேன்." },
    { id: 93, domain: "naturalistic", english: "I am interested in protecting the environment.", tamil: "சுற்றுச்சூழலைப் பாதுகாப்பதில் எனக்கு அதிக ஆர்வம் உண்டு." },
    { id: 94, domain: "naturalistic", english: "I enjoy visiting wildlife parks, zoos, and science museums.", tamil: "வனவிலங்கு பூங்காக்கள், மிருகக்காட்சிசாலைகள் மற்றும் அறிவியல் அருங்காட்சியகங்களுக்குச் செல்வதை விரும்புகிறேன்." },
    { id: 95, domain: "naturalistic", english: "I enjoy observing weather and natural phenomena.", tamil: "வானிலை மற்றும் இயற்கை நிகழ்வுகளைக் கவனிப்பதை நான் விரும்புகிறேன்." },
    { id: 96, domain: "naturalistic", english: "I enjoy sorting and classifying objects.", tamil: "பொருட்களை அவற்றின் பண்புகளுக்கேற்ப வரிசைப்படுத்த மற்றும் வகைப்படுத்த எனக்குப் பிடிக்கும்." },
    { id: 97, domain: "naturalistic", english: "I enjoy documentaries about nature and wildlife.", tamil: "இயற்கை மற்றும் வனவிலங்குகள் பற்றிய ஆவணப்படங்களைப் பார்ப்பதை விரும்புகிறேன்." },
    { id: 98, domain: "naturalistic", english: "I feel relaxed when I spend time outdoors.", tamil: "இயற்கையான வெளிப்புற இடங்களில் நேரத்தைச் செலவிடும்போது நான் நிம்மதியாக உணர்கிறேன்." },
    { id: 99, domain: "naturalistic", english: "I enjoy participating in environmental activities.", tamil: "சுற்றுச்சூழல் விழிப்புணர்வு செயல்பாடுகளில் பங்கேற்பதை விரும்புகிறேன்." },
    { id: 100, domain: "naturalistic", english: "I am curious about ecosystems and how nature works.", tamil: "சுற்றுச்சூழல் அமைப்புகள் (Ecosystems) மற்றும் இயற்கை எவ்வாறு செயல்படுகிறது என்பதை அறிய நான் ஆர்வமாக உள்ளேன்." }
];

/* MAP IMAGES AUTOMATICALLY ON INIT */
questions.forEach(q => {
    q.image = `images/Q${q.id}.jpg`;
});

/* DOM TARGET BINDINGS */
const studentEmis = document.getElementById("studentEmis");
const studentName = document.getElementById("studentName");
const studentClass = document.getElementById("studentClass");
const studentMedium = document.getElementById("studentMedium");
const studentSchool = document.getElementById("studentSchool");
const studentDistrict = document.getElementById("studentDistrict");

const welcomeCard = document.getElementById("welcomeCard");
const registrationCard = document.getElementById("registrationCard");
const quizInterfaceContainer = document.getElementById("quizInterfaceContainer");
const openRegistrationBtn = document.getElementById("openRegistrationBtn");
const startAssessmentBtn = document.getElementById("startAssessmentBtn");

const questionsContainer = document.getElementById("questions");
const progressBar = document.getElementById("progressBar");
const answeredCount = document.getElementById("answeredCount");
const progressPercentage = document.getElementById("progressPercentage");
const totalQuestionsElement = document.getElementById("totalQuestions");

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const submitBtn = document.getElementById("submitBtn");
const loader = document.getElementById("loader");

const reportContainer = document.getElementById("report");
const reportBody = document.getElementById("reportBody");

const studentWorkflowContainer = document.getElementById("studentWorkflowContainer");
const adminSection = document.getElementById("adminSection");
const adminTableBody = document.getElementById("adminTableBody");
const adminInspectionPanel = document.getElementById("adminInspectionPanel");
const adminInspectionBody = document.getElementById("adminInspectionBody");
const adminDashboardSummary = document.getElementById("adminDashboardSummary");
const districtSplitPanel = document.getElementById("districtSplitPanel");

const langBtnEn = document.getElementById("langBtnEn");
const langBtnTa = document.getElementById("langBtnTa");

function initializeDistrictSchoolDropdowns() {
    const district = document.getElementById("studentDistrict");
    const school = document.getElementById("studentSchool");
    if (!district || !school) return;

    Object.keys(schoolData).forEach(item => {
        const option = document.createElement("option");
        option.value = item;
        option.textContent = item;
        district.appendChild(option);
    });

    district.addEventListener("change", () => {
        const selectPrompt = currentLanguageMode === "tamil" ? "பள்ளியைத் தேர்வு செய்க" : "Select School";
        school.innerHTML = `<option value="">${selectPrompt}</option>`;
        const schools = schoolData[district.value] || [];
        schools.forEach(item => {
            const option = document.createElement("option");
            option.value = item;
            option.textContent = item;
            school.appendChild(option);
        });
    });
}

/* STATE EXTRACTOR HELPERS */
function loadStudentInfo() {
    studentInfo = {
        name: studentName ? studentName.value.trim() : "",
        emis: studentEmis ? studentEmis.value.trim() : "",
        class: studentClass ? studentClass.value : "",
        medium: studentMedium ? studentMedium.value : "",
        school: studentSchool ? studentSchool.value.trim() : "",
        district: studentDistrict ? studentDistrict.value.trim() : ""
    };
}

function updateProgress() {
    const completed = Object.keys(answers).length;
    const total = questions.length;
    const percentage = Math.round((completed / total) * 100);

    if (answeredCount) answeredCount.textContent = completed;
    if (progressPercentage) progressPercentage.textContent = percentage + "%";
    if (progressBar) progressBar.style.width = percentage + "%";
    if (totalQuestionsElement) totalQuestionsElement.textContent = total;
}

function getDomain(domainId) { return domains.find(d => d.id === domainId); }
function getDomainName(domainId) { 
    const d = getDomain(domainId); 
    if (!d) return domainId;
    return currentLanguageMode === "tamil" ? d.tamilName : d.englishName;
}
function getDomainIcon(domainId) { const d = getDomain(domainId); return d ? d.icon : "⭐"; }

function getSecondaryChoice(stream) {
    return secondaryPathwayChoices[stream.id] ||
        secondaryPathwayChoices[stream.name] ||
        (stream.schoolGroups || []).join(" or ");
}

/* INTERACTIVE RENDER MODULE */
function renderQuestion() {
    if (!questionsContainer) return;
    const question = questions[currentQuestion];
    if (!question) return;

    questionsContainer.innerHTML = "";
    const selectedAnswer = answers[question.id];

    const questionCard = document.createElement("div");
    questionCard.className = "question-card";
    
    let compiledContent = `<h2 class="question-title-tamil">${currentLanguageMode === "tamil" ? question.tamil : question.english}</h2>`;

    let metaLabelText = currentLanguageMode === "tamil" ? `வினா ${currentQuestion + 1} (மொத்தம் ${questions.length})` : `Question ${currentQuestion + 1} of ${questions.length}`;

    questionCard.innerHTML = `
        <div class="question-meta">
            <div>${metaLabelText}</div>
            <div>${getDomainIcon(question.domain)} ${getDomainName(question.domain)}</div>
        </div>
        <div class="question-shell">
            <div class="question-layout">
                <div class="question-content">
                    ${compiledContent}
                </div>
                <div class="question-image">
                    <img src="${question.image}" alt="Question Graphic Reference" onerror="this.src='images/default.jpg'">
                </div>
            </div>
            <div class="options-grid" id="optionsGrid"></div>
        </div>
    `;
    questionsContainer.appendChild(questionCard);

    const optionsGrid = document.getElementById("optionsGrid");
    responseOptions.forEach(option => {
        const optionCard = document.createElement("label");
        optionCard.className = "option-card";
        optionCard.setAttribute("tabindex", "0"); 
        
        let labelContent = `<span class="option-label-tamil">${currentLanguageMode === "tamil" ? option.tamil : option.english}</span>`;

        optionCard.innerHTML = `
            <input type="radio" name="assessmentAnswer" value="${option.score}" ${selectedAnswer === option.score ? "checked" : ""} tabIndex="-1">
            <div class="option-text-container">
                ${labelContent}
            </div>
        `;
        
        optionCard.addEventListener("keydown", (e) => {
            if (e.key === " " || e.key === "Enter") {
                e.preventDefault();
                const inputElement = optionCard.querySelector('input[type="radio"]');
                inputElement.checked = true;
                inputElement.dispatchEvent(new Event('change'));
            }
        });

        optionsGrid.appendChild(optionCard);
    });

    document.querySelectorAll('input[name="assessmentAnswer"]').forEach(input => {
        input.addEventListener("change", function () {
            answers[question.id] = Number(this.value);
            updateProgress();
            saveAssessment();
            
            setTimeout(() => {
                if (currentQuestion < questions.length - 1) {
                    currentQuestion++;
                    saveAssessment();
                    renderQuestion();
                    updateProgress();
                } else {
                    updateNavigationButtons();
                }
            }, 300);
        });
    });

    updateNavigationButtons();
}

function updateNavigationButtons() {
    if (prevBtn) prevBtn.disabled = (currentQuestion === 0);
    if (nextBtn) nextBtn.style.display = (currentQuestion === questions.length - 1) ? "none" : "inline-block";
    if (submitBtn) submitBtn.style.display = (currentQuestion === questions.length - 1) ? "inline-block" : "none";
}

function nextQuestion() {
    const question = questions[currentQuestion];
    if (answers[question.id] === undefined) {
        const errorMsg = currentLanguageMode === "tamil" ? "தொடர்வதற்கு முன் ஒரு பதிலைத் தேர்ந்தெடுக்கவும்." : "Please select an answer before continuing.";
        alert(errorMsg);
        return;
    }
    if (currentQuestion < questions.length - 1) {
        currentQuestion++;
        saveAssessment();
        renderQuestion();
        updateProgress();
    }
}

function previousQuestion() {
    if (currentQuestion > 0) {
        currentQuestion--;
        saveAssessment();
        renderQuestion();
        updateProgress();
    }
}

if (prevBtn) prevBtn.addEventListener("click", previousQuestion);
if (nextBtn) nextBtn.addEventListener("click", nextQuestion);

/* CACHE CONTEXT DATA SYNCERS */
function saveAssessment() {
    loadStudentInfo();
    const data = { currentQuestion, answers, studentInfo, assessmentStartTime, currentLanguageMode };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function restoreAssessment() {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (!savedData) {
        updateActiveLanguageButtons();
        runUIElementsLocalization();
        return;
    }
    try {
        const data = JSON.parse(savedData);
        currentQuestion = data.currentQuestion || 0;
        answers = data.answers || {};
        studentInfo = data.studentInfo || {};
        if(data.assessmentStartTime) assessmentStartTime = data.assessmentStartTime;
        if(data.currentLanguageMode) currentLanguageMode = data.currentLanguageMode;

        if (studentName && studentInfo.name) studentName.value = studentInfo.name;
        if (studentEmis && studentInfo.emis) studentEmis.value = studentInfo.emis;
        if (studentClass && studentInfo.class) studentClass.value = studentInfo.class;
        if (studentMedium && studentInfo.medium) studentMedium.value = studentInfo.medium;
        if (studentSchool && studentInfo.school) studentSchool.value = studentInfo.school;
        if (studentDistrict && studentInfo.district) studentDistrict.value = studentInfo.district;
        
        updateActiveLanguageButtons();
        runUIElementsLocalization();
    } catch (e) { console.error("Restore baseline index failure:", e); }
}

/* SCORING ARCHITECTURE MATH PLATFORM */
function calculateIntelligenceScoresFromSet(answersSet) {
    const scores = { linguistic: 0, logical: 0, spatial: 0, bodily: 0, musical: 0, interpersonal: 0, intrapersonal: 0, naturalistic: 0 };
    const maxScores = { linguistic: 0, logical: 0, spatial: 0, bodily: 0, musical: 0, interpersonal: 0, intrapersonal: 0, naturalistic: 0 };

    questions.forEach(q => {
        const answer = answersSet[q.id] || 0;
        scores[q.domain] += answer;
        maxScores[q.domain] += 4; 
    });

    const percentages = {};
    Object.keys(scores).forEach(domain => {
        percentages[domain] = maxScores[domain] > 0 ? Math.round((scores[domain] / maxScores[domain]) * 100) : 0;
    });
    return { raw: scores, max: maxScores, percentage: percentages };
}

function getStrengthLevel(score) {
    if (score >= 85) return "Exceptional";
    if (score >= 70) return "Very Strong";
    if (score >= 55) return "Strong";
    if (score >= 40) return "Moderate";
    return "Emerging";
}

function getTopStrengths(scores) {
    return Object.entries(scores.percentage).map(([domainId, score]) => {
        const d = domains.find(x => x.id === domainId);
        return { id: domainId, name: d.name, icon: d.icon, score, level: getStrengthLevel(score) };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
}

function calculateCareerMatches(intelligenceScores) {
    const results = careerClusters.map(cluster => {
        let totalScore = 0; 
        let totalWeight = 0;
        let breakdownLog = [];

        Object.entries(cluster.intelligences).forEach(([domainId, weight]) => {
            const domainScore = intelligenceScores.percentage[domainId] || 0;
            totalScore += domainScore * weight; 
            totalWeight += weight;
            breakdownLog.push({
                domain: getDomainName(domainId),
                score: domainScore,
                weight: weight
            });
        });
        if (cluster.id === "design" && intelligenceScores.percentage.spatial >= 75) {
            totalScore += 50;
        }
        if (cluster.id === "media" && intelligenceScores.percentage.linguistic >= 75) {
            totalScore += 50;
        }
        
        const matchScore = totalWeight > 0 ? Math.min(Math.round(totalScore / totalWeight), 100) : 0;
        return { ...cluster, matchScore, breakdownLog, totalScore, totalWeight };
    });
    return results.sort((a, b) => b.matchScore - a.matchScore);
}

function buildReportDataFromSet(info, answersSet) {
    const intelligenceScores = calculateIntelligenceScoresFromSet(answersSet);
    const topStrengths = getTopStrengths(intelligenceScores);
    const topStreams = calculateCareerMatches(intelligenceScores).slice(0,3);

    return {
        student: info,
        answers: answersSet,
        intelligenceScores,
        topStrengths,
        recommendedStreams: topStreams
    };
}

function commitRecordToAdminDatabase(info, answersSet) {
    try {
        const rawDb = localStorage.getItem(ADMIN_DB_KEY);
        let currentDb = rawDb ? JSON.parse(rawDb) : [];

        if(info.emis) {
            currentDb = currentDb.filter(record => record.student.emis !== info.emis);
        }

        const intelligenceScores = calculateIntelligenceScoresFromSet(answersSet);
        const careerMatches = calculateCareerMatches(intelligenceScores);

        currentDb.push({
            timestamp: new Date().toLocaleString(),
            student: info,
            startTime: assessmentStartTime,
            endTime: assessmentEndTime,
            timeTaken: assessmentTimeTaken,
            scoresBreakdown: intelligenceScores,
            careerMatches: careerMatches,
            rawAnswers: answersSet
        });

        localStorage.setItem(ADMIN_DB_KEY, JSON.stringify(currentDb));
    } catch (error) {
        console.error("Critical logs synchronization write fault:", error);
    }
}

function validateAssessment() {
    loadStudentInfo();
    if (!studentInfo.name || !studentInfo.emis || !studentInfo.class || !studentInfo.medium || !studentInfo.school || !studentInfo.district) {
        const errorMsg = currentLanguageMode === "tamil" ? "அறிக்கையை உருவாக்குவதற்கு முன் அனைத்து சுயவிவரப் பதிவுப் புலங்களையும் பூர்த்தி செய்யவும்." : "Please complete all profile registration fields before generating the report.";
        alert(errorMsg);
        return false;
    }
    const answeredTotal = Object.keys(answers).length;
    if (answeredTotal < questions.length) {
        const errorMsg = currentLanguageMode === "tamil" ? `மதிப்பீடு முழுமையடையவில்லை. நீங்கள் 100 வினாக்களில் ${answeredTotal} வினாக்களுக்கு மட்டுமே பதிலளித்துள்ளீர்கள்.` : `Evaluation incomplete. You have answered ${answeredTotal} out of ${questions.length} questions.`;
        alert(errorMsg);
        return false;
    }
    return true;
}

function generateReport() { 
    if (!validateAssessment()) return;
    saveAssessment();
    if (loader) loader.classList.remove("hidden");
    
    assessmentEndTime = Date.now();
    if (!assessmentStartTime) assessmentStartTime = assessmentEndTime - (12 * 60000); 
    
    assessmentTimeTaken = Math.round((assessmentEndTime - assessmentStartTime) / 60000);
    if (assessmentTimeTaken <= 0) assessmentTimeTaken = 1;

    setTimeout(() => {
        commitRecordToAdminDatabase(studentInfo, answers);
        const reportData = buildReportDataFromSet(studentInfo, answers);
        displayReportHTML(reportData, reportBody);
        
        localStorage.removeItem(STORAGE_KEY);
        
        if (loader) loader.classList.add("hidden");
        const assessmentSection = document.getElementById("assessmentSection");
        if(assessmentSection) assessmentSection.style.display = "none";
        if(reportContainer) reportContainer.classList.remove("hidden");
        reportContainer.scrollIntoView({ behavior: "smooth" });
    }, 1000);
}

if (submitBtn) submitBtn.addEventListener("click", generateReport);

/* DYNAMIC HTML STUDENT REPORT GENERATION */
function displayReportHTML(reportData, targetContainer) {
    const intelligenceScores = reportData.intelligenceScores;
    
    const profileSorted = Object.entries(intelligenceScores.percentage).map(([id, pct]) => {
        const d = domains.find(x => x.id === id);
        return { id, name: d ? d.englishName : id, icon: getDomainIcon(id), score: pct };
    }).sort((a,b) => b.score - a.score);

    const primaryDomainId = reportData.topStrengths[0].id;
    const secondaryDomainId = reportData.topStrengths[1].id;

    const learnBestText = `${learnBestTranslations[primaryDomainId].english} As well as ${learnBestTranslations[secondaryDomainId].english}`;
    const skillsText1 = skillsDevelopTranslations[primaryDomainId].english;
    const skillsText2 = skillsDevelopTranslations[secondaryDomainId].english;

    let html = `
        <div class="report-header">
            <div class="profile-card">
                <h2>Student Profile</h2>
                <div class="profile-grid">
                    <div class="profile-item">
                        <div class="profile-label">Name</div>
                        <div class="profile-value">${reportData.student.name}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">EMIS No</div>
                        <div class="profile-value">${reportData.student.emis || "N/A"}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">Standard</div>
                        <div class="profile-value">${reportData.student.class}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">Medium</div>
                        <div class="profile-value">${reportData.student.medium || "N/A"}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">School</div>
                        <div class="profile-value">${reportData.student.school}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">District</div>
                        <div class="profile-value">${reportData.student.district}</div>
                    </div>
                    <div class="profile-item">
                        <div class="profile-label">Assessment Date</div>
                        <div class="profile-value">${new Date().toLocaleDateString()}</div>
                    </div>
                </div>
            </div>
            <div class="about-card">
                <h2>About This Report</h2>
                <p>This automated verification dossier charts multi-tier intelligence scoring criteria based upon Howard Gardner's cognitive framework metrics to evaluate individual aptitudes across key vocational clusters.</p>
            </div>
        </div>

        <div class="report-section">
            <h2>Intelligence Profile Summary</h2>
            <div class="intelligence-list">
    `;

    profileSorted.forEach(item => {
        html += `
            <div class="intelligence-row">
                <div class="intelligence-name">${item.icon} ${item.name}</div>
                <div class="bar-track">
                    <div class="bar-fill" style="width:${item.score}%"></div>
                </div>
                <div class="intelligence-score">${item.score}%</div>
            </div>
        `;
    });

    html += `
            </div>
        </div>

        <div class="report-section">
            <h2>Top 3 Core Areas and Strengths</h2>
            <div class="strength-grid">
    `;

    reportData.topStrengths.forEach((strength, index) => {
        const d = domains.find(x => x.id === strength.id);
        const englishStrengthName = d ? d.englishName : strength.name;
        
        html += `
            <div class="strength-card">
                <div class="strength-rank">${index + 1}</div>
                <div class="strength-title">${strength.icon} ${englishStrengthName}</div>
                <div class="strength-percent">${strength.score}%</div>
                <div style="font-size:12px; margin-top:5px; color:var(--muted); font-weight:600; text-transform: uppercase;">${strength.level} Capacity</div>
            </div>
        `;
    });

    html += `
            </div>
        </div>

        <div class="report-section">
            <h2>Learning Style Summary</h2>
            <div class="summary-box">
                Based upon your top psychometric results, you absorb complex information best using mechanisms related to <strong>${domains.find(x => x.id === primaryDomainId).englishName}</strong> and <strong>${domains.find(x => x.id === secondaryDomainId).englishName}</strong> frameworks.
            </div>
            
            <div class="report-subsection-title">1. How you learn best:</div>
            <ul class="report-list-bullets">
                <li>${learnBestText}</li>
            </ul>

            <div class="report-subsection-title">2. The skills you develop:</div>
            <ul class="report-list-bullets">
                <li>${skillsText1}</li>
                <li>${skillsText2}</li>
            </ul>
        </div>

        <div class="report-section">
            <h2>Top 3 Recommended Career Clusters</h2>
            <div class="career-grid">
    `;

    reportData.recommendedStreams.forEach((stream, index) => {
        const streamDescriptionText = stream.description;
        html += `
            <div class="career-card">
                <div class="career-title">
                    <h3>${index + 1}. ${stream.icon} ${stream.name}</h3>
                    <span class="match-score">Score: ${stream.matchScore}%</span>
                </div>
                <div class="career-description">${streamDescriptionText}</div>
                
                <div class="pathway-layout">
                    <div class="pathway-left">
                        <strong>Job roles</strong>
                        <ul>
                            ${stream.careers.map(c => `<li>${c}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="pathway-right">
                        <h4>Educational Pathways</h4>
                        <ul>
                            <li><strong>Higher Secondary Group:</strong> ${getSecondaryChoice(stream)}</li>
                            <li><strong>Entrance Exams:</strong> ${stream.entranceExams.join(", ")}</li>
                            <li><strong>Degrees:</strong> ${stream.degreePrograms.join(", ")}</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    });

    html += `
            </div>
        </div>

        <div class="report-section">
            <h2>Parent Guidance Matrix</h2>
            <div class="guidance-box">
                Encourage continuous independent experimentation inside the student's highest-scoring talent areas. Educational decisions should incorporate these structural parameters alongside personal academic interest trends.
            </div>
        </div>
    `;

    targetContainer.innerHTML = html;
}

/* ADMIN WORKFLOW & CALCULATIONS BREAKDOWN PANEL */
function enterAdminView() {
    if(studentWorkflowContainer) studentWorkflowContainer.classList.add("hidden");
    if(adminSection) adminSection.classList.remove("hidden");
    if(adminInspectionPanel) adminInspectionPanel.classList.add("hidden");
    renderAdminTable();
}

function exitAdminView() {
    if(adminSection) adminSection.classList.add("hidden");
    if(studentWorkflowContainer) studentWorkflowContainer.classList.remove("hidden");
}

function getAdminRecords() {
    const rawDb = localStorage.getItem(ADMIN_DB_KEY);
    return rawDb ? JSON.parse(rawDb) : [];
}

function getDistrictSummary(records) {
    return records.reduce((summary, record) => {
        const district = record.student && record.student.district ? record.student.district : "Not Specified";
        summary[district] = (summary[district] || 0) + 1;
        return summary;
    }, {});
}

function renderAdminDashboard(records) {
    if (!adminDashboardSummary || !districtSplitPanel) return;

    const districtSummary = getDistrictSummary(records);
    const districtCount = Object.keys(districtSummary).length;

    adminDashboardSummary.innerHTML = `
        <div class="admin-stat-card passive">
            <span class="admin-stat-label">Total Students Attended</span>
            <span class="admin-stat-value">${records.length}</span>
        </div>
        <div class="admin-stat-card passive">
            <span class="admin-stat-label">Districts Covered</span>
            <span class="admin-stat-value">${districtCount}</span>
            <span class="admin-stat-note">Based on completed assessments</span>
        </div>
        <button type="button" class="admin-export-btn" onclick="downloadAdminExcel()">
            Download Excel
        </button>
    `;

    const rows = Object.entries(districtSummary)
        .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
        .map(([district, count]) => `
            <tr>
                <td>${district}</td>
                <td>${count}</td>
            </tr>
        `).join("");

    districtSplitPanel.innerHTML = `
        <div class="admin-panel-title">
            <h3>District Wise Split</h3>
            <span>${records.length} total student(s)</span>
        </div>
        <table class="district-split-table">
            <thead>
                <tr>
                    <th>District</th>
                    <th>Students Attended</th>
                </tr>
            </thead>
            <tbody>
                ${rows || `<tr><td colspan="2">No district data available.</td></tr>`}
            </tbody>
        </table>
    `;
}

window.toggleDistrictSplit = function() {
    if (districtSplitPanel) districtSplitPanel.classList.toggle("hidden");
};

function xmlEscape(value) {
    return String(value ?? "")
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;");
}

function excelCell(value) {
    const isNumber = typeof value === "number" && Number.isFinite(value);
    return `<Cell><Data ss:Type="${isNumber ? "Number" : "String"}">${xmlEscape(value)}</Data></Cell>`;
}

function excelRow(values) {
    return `<Row>${values.map(excelCell).join("")}</Row>`;
}

function buildExcelWorksheet(name, rows) {
    return `
        <Worksheet ss:Name="${xmlEscape(name).slice(0, 31)}">
            <Table>${rows.map(excelRow).join("")}</Table>
        </Worksheet>
    `;
}

function getTopDomain(record) {
    const sorted = Object.entries(record.scoresBreakdown.percentage).sort((a, b) => b[1] - a[1]);
    return sorted[0] || ["", ""];
}

window.downloadAdminExcel = function() {
    const records = getAdminRecords();
    if (records.length === 0) {
        alert("No student records available to export.");
        return;
    }

    const newestFirst = [...records].reverse();
    const districtSummary = getDistrictSummary(records);

    const studentRows = [
        [
            "S.No", "Name", "EMIS No", "Standard", "Medium", "District", "School", "Time Taken (min)",
            "Top Domain", "Top Domain %",
            "Top 1 Cluster", "Top 1 Cluster %", "Top 1 Stream",
            "Top 2 Cluster", "Top 2 Cluster %", "Top 2 Stream",
            "Top 3 Cluster", "Top 3 Cluster %", "Top 3 Stream",
            "Submitted Date"
        ],
        ...newestFirst.map((record, index) => {
            const [topDomain, topDomainPct] = getTopDomain(record);
            const topCareers = record.careerMatches ? record.careerMatches.slice(0, 3) : [];
            return [
                index + 1,
                record.student.name,
                record.student.emis || "",
                record.student.class || "",
                record.student.medium || "",
                record.student.district || "",
                record.student.school || "",
                record.timeTaken || 1,
                getDomainName(topDomain),
                topDomainPct,
                topCareers[0] ? topCareers[0].name : "",
                topCareers[0] ? topCareers[0].matchScore : "",
                topCareers[0] ? getSecondaryChoice(topCareers[0]) : "",
                topCareers[1] ? topCareers[1].name : "",
                topCareers[1] ? topCareers[1].matchScore : "",
                topCareers[1] ? getSecondaryChoice(topCareers[1]) : "",
                topCareers[2] ? topCareers[2].name : "",
                topCareers[2] ? topCareers[2].matchScore : "",
                topCareers[2] ? getSecondaryChoice(topCareers[2]) : "",
                record.timestamp || ""
            ];
        })
    ];

    const recommendationRows = [
        ["S.No", "Name", "EMIS", "District", "Rank", "Top Cluster", "Cluster Match %", "Top Stream"],
        ...newestFirst.flatMap((record, index) => (record.careerMatches || []).slice(0, 3).map((cluster, rankIndex) => [
            index + 1,
            record.student.name,
            record.student.emis || "",
            record.student.district || "",
            rankIndex + 1,
            cluster.name || "",
            cluster.matchScore || "",
            getSecondaryChoice(cluster)
        ]))
    ];

    const districtRows = [
        ["District", "Students Attended"],
        ...Object.entries(districtSummary)
            .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
            .map(([district, count]) => [district, count])
    ];

    const domainRows = [
        ["S.No", "Name", "EMIS", "District", "Domain", "Raw Score", "Maximum Score", "Percentage"],
        ...newestFirst.flatMap((record, index) => domains.map(domain => [
            index + 1,
            record.student.name,
            record.student.emis || "",
            record.student.district || "",
            domain.name,
            record.scoresBreakdown.raw[domain.id] || 0,
            record.scoresBreakdown.max[domain.id] || 0,
            record.scoresBreakdown.percentage[domain.id] || 0
        ]))
    ];

    const responseRows = [
        ["S.No", "Name", "EMIS", "District", "Question ID", "Domain", "Question", "Score"],
        ...newestFirst.flatMap((record, index) => questions.map(question => [
            index + 1,
            record.student.name,
            record.student.emis || "",
            record.student.district || "",
            question.id,
            getDomainName(question.domain),
            question.english,
            record.rawAnswers[question.id] || ""
        ]))
    ];

    const workbook = `<?xml version="1.0"?>
<?mso-application progid="Excel.Sheet"?>
<Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40">
    ${buildExcelWorksheet("Student Records", studentRows)}
    ${buildExcelWorksheet("Top Recommendations", recommendationRows)}
    ${buildExcelWorksheet("District Split", districtRows)}
    ${buildExcelWorksheet("Domain Scores", domainRows)}
    ${buildExcelWorksheet("Question Responses", responseRows)}
</Workbook>`;

    const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Career_Assessment_Admin_Data_${new Date().toISOString().slice(0, 10)}.xls`;
    document.body.appendChild(link);
    link.click();
    link.remove();
    URL.revokeObjectURL(url);
};

function renderAdminTable() {
    if (!adminTableBody) return;
    adminTableBody.innerHTML = "";
    
    const dbRecords = getAdminRecords();
    renderAdminDashboard(dbRecords);

    if (dbRecords.length === 0) {
        adminTableBody.innerHTML = `<tr><td colspan="9" style="text-align:center; color:var(--muted); padding:40px; font-weight:600;">No student records found in local storage database.</td></tr>`;
        return;
    }

    [...dbRecords].reverse().forEach((record, index) => {
        const sortedPercentages = Object.entries(record.scoresBreakdown.percentage).sort((a,b) => b[1] - a[1]);
        const topVectorKey = sortedPercentages[0][0];
        const topVectorPct = sortedPercentages[0][1];
        const absoluteIndex = dbRecords.length - 1 - index;
        
        const row = document.createElement("tr");
        row.innerHTML = `
            <td class="serial-cell">${index + 1}</td>
            <td class="admin-name-cell"><strong>${record.student.name}</strong></td>
            <td>${record.student.emis || "<span class='calc-pill'>N/A</span>"}</td>
            <td class="admin-class-cell"><span>${record.student.class || "N/A"}</span></td>
            <td class="school-district-cell">
                <div class="district-name">${record.student.district}</div>
                <div class="school-name">${record.student.school}</div>
            </td>
            <td><strong style="color:var(--primary);">${record.timeTaken || 1} min</strong></td>
            <td>
                <span style="font-weight:700;">${getDomainIcon(topVectorKey)} ${getDomainName(topVectorKey)}</span>
                <span style="color:var(--success); font-weight:800;">(${topVectorPct}%)</span>
            </td>
            <td>
                <div class="calc-pill-box">
                    ${sortedPercentages.slice(0, 3).map(([k, v]) => `<div class="calc-pill">${getDomainIcon(k)} ${k.substring(0,4)}:${v}%</div>`).join("")}
                </div>
                <div style="font-size:10px; color:var(--muted); margin-top:4px;">Date: ${record.timestamp.split(",")[0]}</div>
            </td>
            <td>
                <button class="view-btn" onclick="inspectStudentFile(${absoluteIndex})">Open Portfolio</button>
            </td>
        `;
        adminTableBody.appendChild(row);
    });
}

window.inspectStudentFile = function(index) {
    const rawDb = localStorage.getItem(ADMIN_DB_KEY);
    if(!rawDb) return;
    const dbRecords = JSON.parse(rawDb);
    const record = dbRecords[index];
    if(!record) return;

    if(adminInspectionPanel) adminInspectionPanel.classList.remove("hidden");
    
    let scoreRowsHTML = "";
    Object.keys(record.scoresBreakdown.raw).forEach(domain => {
        const raw = record.scoresBreakdown.raw[domain];
        const max = record.scoresBreakdown.max[domain] || 52;
        const pct = record.scoresBreakdown.percentage[domain];
        scoreRowsHTML += `
            <tr>
                <td><strong>${getDomainIcon(domain)} ${getDomainName(domain)}</strong> (<code>${domain}</code>)</td>
                <td>${raw}</td>
                <td>${max}</td>
                <td><strong style="color:var(--primary);">${pct}%</strong></td>
            </tr>
        `;
    });

    let careerRowsHTML = "";
    record.careerMatches.forEach(cluster => {
        let formulaParts = [];
        let productParts = [];
        cluster.breakdownLog.forEach(log => {
            formulaParts.push(`[${log.domain} (${log.score}%) × Weight ${log.weight}]`);
            productParts.push(`(${log.score} × ${log.weight})`);
        });
        
        careerRowsHTML += `
            <div style="padding:12px; border-bottom:1px solid #cbd5e1;">
                <div style="display:flex; justify-content:between; font-weight:700; font-size:14px; margin-bottom:6px;">
                    <div style="flex-grow:1;">${cluster.icon} ${cluster.name}</div>
                    <div style="color:var(--success);">${cluster.matchScore}% Match</div>
                </div>
                <div class="math-formula-box">
                    <strong>Formula Mapping:</strong> Sum(${formulaParts.join(" + ")}) / Total Weight (${cluster.totalWeight})<br>
                    <strong>Calculation:</strong> (${productParts.join(" + ")}) / ${cluster.totalWeight} = <strong>${cluster.matchScore}%</strong>
                </div>
            </div>
        `;
    });

    let questionRowsHTML = "";
    questions.forEach(q => {
        const studentAnswer = record.rawAnswers[q.id] || "Unanswered";
        questionRowsHTML += `
            <tr>
                <td style="text-align:center;"><strong>Q${q.id}</strong></td>
                <td><span class="calc-pill">${getDomainIcon(q.domain)} ${q.domain}</span></td>
                <td>${q.english}</td>
                <td style="text-align:center; background:#f8fafc;"><strong>${studentAnswer}</strong></td>
            </tr>
        `;
    });

    if(adminInspectionBody) {
        adminInspectionBody.innerHTML = `
            <div style="display:grid; grid-template-columns:1fr 1fr; gap:20px; margin-bottom:20px;">
                <div class="profile-card" style="margin:0;">
                    <h4 style="margin-bottom:10px; color:var(--primary-dark);">Student Portfolio</h4>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>Name:</strong> ${record.student.name}</p>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>EMIS No:</strong> ${record.student.emis || "N/A"}</p>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>Target Structure:</strong> Standard ${record.student.class} | ${record.student.medium || "N/A"} Medium | ${record.student.district}</p>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>School:</strong> ${record.student.school}</p>
                </div>
                <div class="profile-card" style="margin:0; background:#f8fafc;">
                    <h4 style="margin-bottom:10px; color:#475569;">System Audit Metrics</h4>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>Timestamp:</strong> ${record.timestamp}</p>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>Session Start Time:</strong> ${new Date(record.startTime).toLocaleTimeString()}</p>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>Session Completion Time:</strong> ${new Date(record.endTime).toLocaleTimeString()}</p>
                    <p style="font-size:13px; margin-bottom:4px;"><strong>Total Active Duration:</strong> <span style="color:var(--primary); font-weight:700;">${record.timeTaken || 1} Minute(s)</span></p>
                </div>
            </div>

            <div class="admin-diagnostic-section">
                <h4>1. Multiple Intelligence Raw Score Breakdown</h4>
                <table class="diagnostic-table">
                    <thead>
                        <tr>
                            <th>Cognitive Domain</th>
                            <th>Raw Score Sum</th>
                            <th>Maximum Cap Value</th>
                            <th>Calculated Percentage</th>
                        </tr>
                    </thead>
                    <tbody>${scoreRowsHTML}</tbody>
                </table>
            </div>

            <div class="admin-diagnostic-section">
                <h4>2. Career Cluster Weighted Equation Matrices</h4>
                <div style="background:white; border:1px solid #cbd5e1; border-radius:8px; max-height:320px; overflow-y:auto;">
                    ${careerRowsHTML}
                </div>
            </div>

            <div class="admin-diagnostic-section">
                <h4>3. Response Matrix Checklist Summary</h4>
                <div style="background:white; border:1px solid #cbd5e1; border-radius:8px; max-height:350px; overflow-y:auto;">
                    <table class="diagnostic-table" style="margin:0;">
                        <thead>
                            <tr>
                                <th style="width:60px; text-align:center;">Item ID</th>
                                <th style="width:140px;">Domain Group</th>
                                <th>Psychometric Statement Target Text</th>
                                <th style="width:80px; text-align:center;">Score Choice</th>
                            </tr>
                        </thead>
                        <tbody>${questionRowsHTML}</tbody>
                    </table>
                </div>
            </div>
        `;
    }
    
    if(adminInspectionPanel) adminInspectionPanel.scrollIntoView({ behavior: "smooth" });
};

function showRegistration() {
    if (welcomeCard) welcomeCard.classList.add("hidden");
    if (registrationCard) registrationCard.classList.remove("hidden");
    registrationCard.scrollIntoView({ behavior: "smooth", block: "start" });
}

function handleStartWorkflow() {
    loadStudentInfo();
    if(!/^\d{11}$/.test(studentInfo.emis)){
        const errorEmis = currentLanguageMode === "tamil" ? "சரியான 11-இலக்க EMIS எண்ணை உள்ளிடவும்" : "Please enter a valid 11-digit EMIS No";
        alert(errorEmis);
        return;
    }
    if (!studentInfo.name || !studentInfo.class || !studentInfo.medium || !studentInfo.school || !studentInfo.district) {
        const errorFields = currentLanguageMode === "tamil" ? "தொடர்வதற்கு முன் அனைத்து மாணவர் பதிவு புலங்களையும் பூர்த்தி செய்யவும்." : "Please complete all Student Registration fields before continuing.";
        alert(errorFields);
        return;
    }
    
    assessmentStartTime = Date.now();
    saveAssessment();

    if (registrationCard) registrationCard.classList.add("hidden");
    if (welcomeCard) welcomeCard.classList.add("hidden");
    if (quizInterfaceContainer) quizInterfaceContainer.classList.remove("hidden");
    renderQuestion();
    updateProgress();
    quizInterfaceContainer.scrollIntoView({ behavior: "smooth", block: "start" });
}

function executePremiumPDFDownload() {
    const reportElement = document.getElementById("reportCaptureBounds");
    loadStudentInfo();
    
    if (!reportElement) {
        alert("System cannot process printing layout reference framework bounds currently.");
        return;
    }
    
    const formattedFilename = `${studentInfo.name.replace(/\s+/g, '_')}_Report.pdf`;
    
    const optimalOptions = {
        margin:       [10, 10, 10, 10],
        filename:     formattedFilename,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2, useCORS: true, letterRendering: true, scrollY: 0, scrollX: 0 },
        jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' },
        pagebreak:    { mode: ['avoid-all', 'css', 'legacy'] }
    };
    
    if (loader) loader.classList.remove("hidden");
    
    html2pdf().set(optimalOptions).from(reportElement).save().then(() => {
        if (loader) loader.classList.add("hidden");
    }).catch(err => {
        console.error("PDF engine failure:", err);
        if (loader) loader.classList.add("hidden");
        window.print(); 
    });
}

function updateActiveLanguageButtons() {
    if (currentLanguageMode === "tamil") {
        langBtnTa.classList.add("active");
        langBtnEn.classList.remove("active");
    } else {
        langBtnEn.classList.add("active");
        langBtnTa.classList.remove("active");
    }
}

/* DOM INTERACTIVE PRE-BINDINGS CONTROLLER */
document.addEventListener("DOMContentLoaded", () => {
    initializeDistrictSchoolDropdowns();
    restoreAssessment();
    updateProgress();

    if (openRegistrationBtn) openRegistrationBtn.addEventListener("click", showRegistration);
    if (startAssessmentBtn) startAssessmentBtn.addEventListener("click", handleStartWorkflow);

    const setupLangBtn = (btnElement, language) => {
        if (btnElement) {
            btnElement.addEventListener("click", function() {
                currentLanguageMode = language;
                saveAssessment();
                updateActiveLanguageButtons();
                runUIElementsLocalization();
                
                const districtSelect = document.getElementById("studentDistrict");
                if (districtSelect) districtSelect.dispatchEvent(new Event("change"));

                if(quizInterfaceContainer && !quizInterfaceContainer.classList.contains("hidden")) {
                    renderQuestion();
                }
            });
        }
    };

    setupLangBtn(langBtnEn, "english");
    setupLangBtn(langBtnTa, "tamil");

    const adminLoginLink = document.getElementById("adminLoginLink");
    const adminLoginModal = document.getElementById("adminLoginModal");
    const adminPasswordInput = document.getElementById("adminPassword");
    const adminLoginBtn = document.getElementById("adminLoginBtn");
    const closeAdminLoginBtn = document.getElementById("closeAdminLoginBtn");
    
    if(adminLoginLink && adminLoginModal) {
        adminLoginLink.addEventListener("click", (e) => {
            e.preventDefault();
            adminPasswordInput.value = "";
            adminLoginModal.classList.remove("hidden");
            adminPasswordInput.focus();
        });
    }
    
    if(closeAdminLoginBtn && adminLoginModal) {
        closeAdminLoginBtn.addEventListener("click", () => {
            adminLoginModal.classList.add("hidden");
        });
    }
    
    if(adminLoginBtn) {
        adminLoginBtn.addEventListener("click", () => {
            if(adminPasswordInput && adminPasswordInput.value === ADMIN_PASSWORD) {
                adminLoginModal.classList.add("hidden");
                enterAdminView();
            } else {
                const errorPass = currentLanguageMode === "tamil" ? "தவறான கடவுச்சொல்" : "Invalid Password";
                alert(errorPass);
            }
        });
    }

    if (adminPasswordInput) {
        adminPasswordInput.addEventListener("keyup", (event) => {
            if (event.key === "Enter") {
                if(adminPasswordInput.value === ADMIN_PASSWORD) {
                    adminLoginModal.classList.add("hidden");
                    enterAdminView();
                } else {
                    const errorPass = currentLanguageMode === "tamil" ? "தவறான கடவுச்சொல்" : "Invalid Password";
                    alert(errorPass);
                }
            }
        });
    }

    const printBtn = document.getElementById("printBtn");
    if (printBtn) {
        printBtn.addEventListener("click", executePremiumPDFDownload);
    }
    
    if (Object.keys(answers).length > 0) {
        if (welcomeCard) welcomeCard.classList.add("hidden");
        if (registrationCard) registrationCard.classList.add("hidden");
        if (quizInterfaceContainer) quizInterfaceContainer.classList.remove("hidden");
        renderQuestion();
    }
    
    console.log("Career Exploration Assessment System Engine Initialized Securely.");
});
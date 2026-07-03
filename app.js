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
        welcome_badge: "🎯 உங்களை அறிந்துகொள்ளுங்கள். உங்கள் எதிர்காலத்தை வடிவமைக்கவும்.",
        welcome_title_main: "தொழில்நெறி கண்டறியும் மதிப்பீட்டு முறைமைக்கு வரவேர்கிறோம்",
        welcome_desc_1: "ஒவ்வொரு மாணவரும் தனித்துவமானவர்கள். நம் ஒவ்வொருவருக்கும் வெவ்வேறு பலங்கள், திறமைகள் மற்றும் ஆர்வங்கள் உள்ளன. சில மாணவர்கள் சிக்கல்களைத் தீர்ப்பதில் மகிழ்ச்சியடைகிறார்கள், சிலர் மனிதர்களுடன் இணைந்து பணியாற்றுவதை விரும்புகிறார்கள், சிலர் ஆக்கப்பூர்வமாக இருக்கிறார்கள், மற்றவர்கள் இயற்கை, விளையாட்டு, இசை அல்லது தகவல் தொடர்புகளை விரும்புகிறார்கள்.",
        welcome_desc_2: "இந்த மதிப்பீடு ஒவ்வொருவரும் வெவ்வேறு வழிகளில் புத்திசாலிகள் என்ற கருத்தின் அடிப்படையில் அமைந்துள்ளது. எட்டு முதன்மையான மற்றும் வெவ்வேறு வகையான நுண்ணறிவுகளில் உங்கள் பலங்களைக் கண்டறிய இது உதவுகிறது:",
        how_it_works_title: "இந்த மதிப்பீடு எவ்வாறு செயல்படுகிறது?",
        feat_1_title: "80 எளிய கூற்றுகள்", feat_1_desc: "உங்களைப் பற்றிய 80 எளிய கூற்றுகளுக்கு நீங்கள் பதிலளிப்பீர்கள்.",
        feat_2_title: "உங்கள் பலங்கள்", feat_2_desc: "எட்டு நுண்ணறிவுத் துறைகளிலும் உங்கள் பலங்களைப் புரிந்துகொள்ள உங்கள் பதில்கள் எங்களுக்கு உதவும்.",
        feat_3_title: "18 தொழில் தொகுப்புகள்", feat_3_desc: "இந்த பலங்கள் பொறியியல், மருத்துவம், கணினி அறிவியல், விவசாயம், சட்டம், வடிவமைப்பு, வணிகம் போன்ற 18 தொழில் தொகுப்புகளுடன் பொருத்தப்படும்.",
        report_includes_title: "இதன் அடிப்படையில், பின்வருவனவற்றை உள்ளடக்கிய தொழில்நெறி கண்டறியும் அறிக்கையைப் பெறுவீர்கள்:",
        report_item_1: "✨ உங்கள் வலுவான நுண்ணறிவுத் துறைகள்",
        report_item_2: "📖 உங்கள் விருப்பமான கற்றல் பாணி",
        report_item_3: "💼 உங்கள் பலத்திற்கு மிகவும் பொருத்தமான தொழில் தொகுப்புகள்",
        report_item_4: "🎓 நீங்கள் ஆராயக்கூடிய கல்வி வழிகள்",
        report_item_5: "🌱 நீங்கள் கற்றுக்கொள்ளவும் வளரவும் உதவும் பரிந்துரைகள்",
        before_begin_title: "நீங்கள் தொடங்குவதற்கு முன்",
        begin_item_1: "இந்த மதிப்பீட்டில் 80 கூற்றுகள் உள்ளன.",
        begin_item_2: "இதை முடிக்க சுமார் 20-25 நிமிடங்கள் ஆகும்.",
        begin_item_3: "ஒவ்வொரு கூற்றையும் கவனமாகப் படியுங்கள்.",
        begin_item_4: "உங்களைச் சிறந்த முறையில் விவரிக்கும் பதிலைத் தேர்ந்தெடுக்கவும்.",
        begin_item_5: "மதிப்பீட்டை நீங்களாகவே பூர்த்தி செய்யவும்.",
        begin_item_6: "இதில் மதிப்பெண்களோ அல்லது தேர்ச்சி/தோல்வி முடிவுகளோ இல்லை.",
        begin_item_7: "சரியான அல்லது தவறான பதில்கள் எதுவும் இல்லை, இது ஒரு தேர்வு அல்ல.",
        remember_title: "நினைவில் கொள்க",
        remember_item_1: "✔ நேர்மையாக பதிலளிக்கவும்.",
        remember_item_2: "✔ உங்களைச் சிறந்த முறையில் விவரிக்கும் விருப்பத்தைத் தேர்ந்தெடுக்கவும்.",
        remember_item_3: "✔ சரியான அல்லது தவறான பதில்கள் என்று எதுவுமில்லை.",
        remember_item_4: "✔ உங்கள் பதில்கள் எவ்வளவு நேர்மையாக இருக்கிறதோ, அவ்வளவு சிறந்த முறையில் உங்கள் அறிக்கை உங்கள் பலங்களைப் பிரதிபலிக்கும்.",
        wish_luck_text: "எங்கள் மனமார்ந்த நல்வாழ்த்துகள்! நீங்கள் தயாராக இருக்கும்போது கீழே உள்ள பொத்தானை அழுத்தவும்.",
        start_journey_btn: "மதிப்பீட்டைத் தொடங்கவும்",
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
        start_assessment_btn: "அடுத்தது →",
        answered_txt: "பதிலளிக்கப்பட்டவை",
        btn_prev: "← முந்தையது",
        btn_next: "அடுத்தது →",
        btn_submit: "அறிக்கை பெறுக",
        btn_download_report: "PDF அறிக்கையைப் பதிவிறக்கவும்",
        admin_login_link: "நிர்வாகி உள்நுழைவு"
    },
    english: {
        page_title: "Career Exploration Assessment",
        loader_text: "Generating Assessment Report...",
        admin_login_title: "Administrator Login",
        admin_placeholder: "Enter Password",
        admin_login_btn: "Login",
        admin_cancel_btn: "Cancel",
        hero_title: "Career Exploration Assessment",
        hero_subtitle: "🎯 Know Yourself. Explore Your Future",
        welcome_title_main: "Welcome to the Career Exploration Assessment",
        welcome_desc_1: "Every student is unique. Each one of us has different strengths, talents, and interests. Some students enjoy solving problems, some enjoy working with people, some are creative, while others enjoy nature, sports, music, or communication.",
        welcome_desc_2: "This assessment is based on the idea that everyone is intelligent in different ways. It helps you discover your strengths across eight primary and different types of intelligence:",
        how_it_works_title: "How Does This Assessment Work?",
        feat_1_title: "80 Simple Statements", feat_1_desc: "You will answer 80 simple statements about yourself.",
        feat_2_title: "Your Strengths", feat_2_desc: "Your responses will help us understand your strengths in each of the eight intelligence areas.",
        feat_3_title: "18 Career Clusters", feat_3_desc: "These strengths are then matched with 18 career clusters such as Engineering, Medicine, Computer Science, Agriculture, Law, Design, Commerce, and many more.",
        report_includes_title: "Based on this, you will receive a Career Exploration Report that includes:",
        report_item_1: "✨ Your strongest intelligence areas",
        report_item_2: "📖 Your preferred learning style",
        report_item_3: "💼 Career clusters that best match your strengths",
        report_item_4: "🎓 Educational pathways you can explore",
        report_item_5: "🌱 Suggestions to help you learn and grow",
        before_begin_title: "Before You Begin",
        begin_item_1: "This assessment contains 80 statements.",
        begin_item_2: "It will take about 20–25 minutes to complete.",
        begin_item_3: "Read each statement carefully.",
        begin_item_4: "Choose the answer that best describes you.",
        begin_item_5: "Complete the assessment on your own.",
        begin_item_6: "There are no marks or pass/fail results.",
        begin_item_7: "There are no right or wrong answers, and this is not an exam.",
        remember_title: "Remember",
        remember_item_1: "✔ Answer honestly.",
        remember_item_2: "✔ Choose the option that best describes you.",
        remember_item_4: "✔ The more honest your answers, the better your Career Exploration Report will reflect your strengths.",
        wish_luck_text: "We wish you all the very best! Click 'Start Assessment' when you are ready.",
        start_journey_btn: "Start Assessment",
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
        start_assessment_btn: "Next →",
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
        intelligences: { logical: 5, spatial: 4, bodily: 2, intrapersonal: 2 },
        schoolGroups: ["Mathematics + Physics + Chemistry + Computer Science", "Mathematics + Physics + Chemistry + Biology"],
        entranceExams: ["JEE Main", "JEE Advanced", "State Engineering Counselling"],
        degreePrograms: ["B.E", "B.Tech"],
        careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Electronics Engineer", "Robotics Engineer", "Aerospace Engineer", "Mechatronics Engineer", "Manufacturing Engineer", "Renewable Energy Engineer", "Industrial Engineer"]
    },
    {
        id: "computer_science",
        name: "Computer Science & Digital Technologies",
        icon: "💻",
        description: "Recommended for students interested in software, AI, coding, and emerging technologies.",
        intelligences: { logical: 5, intrapersonal: 4, spatial: 3, linguistic: 2 },
        schoolGroups: ["Mathematics + Physics + Chemistry + Computer Science"],
        entranceExams: ["JEE", "University Entrance Exams"],
        degreePrograms: ["B.Tech Computer Science", "BCA", "B.Sc Computer Science", "AI & Data Science"],
        careers: ["Software Developer", "Artificial Intelligence Engineer", "Data Scientist", "Cybersecurity Analyst", "Cloud Engineer", "Machine Learning Engineer", "Mobile App Developer", "Full Stack Developer", "UI/UX Designer", "Blockchain Developer"]
    },
    {
        id: "science_research",
        name: "Science & Research",
        icon: "🔬",
        description: "Your responses show curiosity and a desire to understand how things work. You may enjoy asking questions, exploring ideas, and discovering new knowledge.",
        intelligences: { logical: 5, naturalistic: 4, intrapersonal: 3 },
        schoolGroups: ["Mathematics, Physics, Chemistry, Biology", "Mathematics, Physics, Chemistry"],
        entranceExams: ["IISER Aptitude Test (IAT)", "NEST", "CUET"],
        degreePrograms: ["B.Sc.", "BS-MS Integrated Programme", "Integrated M.Sc.", "B.Tech. (Research Programmes)"],
        careers: ["Research Scientist", "Physicist", "Chemist", "Biotechnologist", "Microbiologist", "Environmental Scientist", "Food Scientist", "Clinical Research Associate", "Space Scientist", "Materials Scientist"]
    },
    {
        id: "medicine",
        name: "Medicine",
        icon: "🩺",
        description: "Based on your responses, you may enjoy learning about science while helping others lead healthier lives.",
        intelligences: { naturalistic: 3, logical: 4, interpersonal: 5 },
        schoolGroups: ["Biology, Physics, Chemistry (PCB)"],
        entranceExams: ["NEET-UG"],
        degreePrograms: ["MBBS", "BDS", "BAMS", "BHMS", "BSMS"],
        careers: ["Doctor", "Surgeon", "Paediatrician", "Psychiatrist", "Cardiologist", "Radiologist", "Dermatologist", "Anaesthesiologist", "Public Health Specialist", "Medical Researcher"]
    },
    {
        id: "paramedical",
        name: "Paramedical & Allied Health Sciences",
        icon: "🏥",
        description: "Your responses suggest that you enjoy supporting and caring for others. You may enjoy practical work that makes a positive difference in people's lives.",
        intelligences: { interpersonal: 5, bodily: 4, logical: 3 },
        schoolGroups: ["Biology, Physics, Chemistry (PCB)"],
        entranceExams: ["NEET (for selected programmes)", "AIIMS Nursing", "AIIMS Paramedical", "NIMHANS Paramedical", "CUET"],
        degreePrograms: ["B.Sc. Allied Health Sciences", "Bachelor of Physiotherapy (BPT)", "B.Sc. Medical Laboratory Technology", "B.Sc. Radiography", "B.Optom"],
        careers: ["Physiotherapist", "Medical Laboratory Technologist", "Radiographer", "Occupational Therapist", "Optometrist", "Audiologist", "Dialysis Technologist", "Emergency Medical Technician", "Operation Theatre Technologist", "Nutritionist"]
    },
    {
        id: "agriculture",
        name: "Agriculture & Food Technology",
        icon: "🌾",
        description: "Your responses suggest an interest in nature, farming, food, and sustainable living.",
        intelligences: { naturalistic: 5, logical: 3, bodily: 4 },
        schoolGroups: ["Biology, Physics, Chemistry", "Mathematics, Physics, Chemistry", "Agriculture (where offered)"],
        entranceExams: ["ICAR AIEEA", "CUET", "State Agricultural University Entrance Examinations"],
        degreePrograms: ["B.Sc. Agriculture", "B.Tech. Food Technology", "B.Sc. Horticulture", "B.Sc. Forestry", "B.F.Sc."],
        careers: ["Agricultural Officer", "Agricultural Scientist", "Food Technologist", "Horticulturist", "Dairy Technologist", "Agribusiness Manager", "Soil Scientist", "Seed Technologist", "Fisheries Officer", "Farm Manager"]
    },
    {
        id: "environment",
        name: "Environment & Sustainability",
        icon: "🌿",
        description: "Based on your responses, you care about nature and protecting the environment. You may enjoy finding solutions to environmental challenges and promoting sustainable living.",
        intelligences: { naturalistic: 5, logical: 4, intrapersonal: 3 },
        schoolGroups: ["Biology, Physics, Chemistry", "Mathematics, Physics, Chemistry"],
        entranceExams: ["CUET", "ICAR AIEEA", "JEE Main (for Environmental Engineering)"],
        degreePrograms: ["B.Sc. Environmental Science", "B.Tech. Environmental Engineering", "B.Sc. Forestry", "B.Sc. Wildlife Science", "B.Sc. Earth Sciences"],
        careers: ["Environmental Engineer", "Sustainability Consultant", "Wildlife Biologist", "Forest Officer", "Climate Change Analyst", "Conservation Scientist", "Environmental Planner", "GIS Specialist", "Renewable Energy Consultant", "Waste Management Specialist"]
    },
    {
        id: "architecture",
        name: "Architecture & Planning",
        icon: "🏛️",
        description: "Based on your responses, you may enjoy visualising ideas, designing spaces, and combining creativity with practical thinking. This field offers opportunities to shape the places where people live and work.",
        intelligences: { spatial: 5, logical: 4, bodily: 2 },
        schoolGroups: ["Mathematics, Physics, Chemistry"],
        entranceExams: ["NATA", "JEE Main (Paper 2)"],
        degreePrograms: ["Bachelor of Architecture (B.Arch.)", "Bachelor of Planning (B.Plan.)"],
        careers: ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect", "Town Planner", "Urban Designer", "Construction Manager", "BIM Specialist", "Quantity Surveyor", "Sustainable Building Consultant"]
    },
    {
        id: "design",
        name: "Design",
        icon: "🎨",
        description: "Based on your responses, you show creativity and enjoy expressing ideas in new and innovative ways. You may enjoy creating designs that are both attractive and useful.",
        intelligences: { spatial: 5, intrapersonal: 3, bodily: 2 },
        schoolGroups: ["Any Higher Secondary Group (depending on the institution and specialization)"],
        entranceExams: ["UCEED", "NID DAT", "NIFT Entrance Examination", "CUET (for selected institutions)"],
        degreePrograms: ["Bachelor of Design (B.Des.)", "Bachelor of Fine Arts (BFA)", "Bachelor of Fashion Technology (BFTech)", "Bachelor of Interior Design", "Bachelor of Visual Communication"],
        careers: ["Graphic Designer", "Product Designer", "Fashion Designer", "Interior Designer", "UX/UI Designer", "Animation Artist", "Game Designer", "Industrial Designer", "Jewellery Designer", "Visual Communication Designer"]
    },
    {
        id: "commerce",
        name: "Commerce, Finance & Accounting",
        icon: "📊",
        description: "Based on your responses, you may enjoy working with numbers, understanding business, and making informed decisions. This field offers opportunities to manage finances and support the growth of organisations.",
        intelligences: { logical: 5, intrapersonal: 3, linguistic: 2 },
        schoolGroups: ["Commerce", "Commerce with Mathematics", "Mathematics, Physics, Chemistry"],
        entranceExams: ["CUET", "CA Foundation", "CMA Foundation", "CS Executive Entrance Test (CSEET)"],
        degreePrograms: ["B.Com.", "B.Com. (Accounting & Finance)", "Bachelor of Business Administration (BBA)", "Bachelor of Economics", "Integrated CA/CMA/CS Pathways"],
        careers: ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Auditor", "Banking Officer", "Tax Consultant", "Cost Accountant", "Financial Planner", "Risk Analyst", "Accountant"]
    },
    {
        id: "management",
        name: "Management",
        icon: "💼",
        description: "Based on your responses, you may enjoy organising activities, leading teams, and working with people. You may also enjoy planning, decision-making, and solving business challenges.",
        intelligences: { interpersonal: 5, intrapersonal: 4, linguistic: 3 },
        schoolGroups: ["Commerce", "Commerce with Mathematics", "Mathematics, Physics, Chemistry", "Any stream"],
        entranceExams: ["CUET", "IPMAT (Integrated Programme in Management)", "JIPMAT"],
        degreePrograms: ["Bachelor of Business Administration (BBA)", "Bachelor of Management Studies (BMS)", "Integrated Programme in Management (IPM)", "B.Com.", "Bachelor of Entrepreneurship"],
        careers: ["Business Manager", "Marketing Manager", "Human Resource Manager", "Operations Manager", "Project Manager", "Product Manager", "Business Analyst", "Entrepreneur", "Retail Manager", "Supply Chain Manager"]
    },
    {
        id: "economics",
        name: "Economics & Public Policy",
        icon: "📈",
        description: "Based on your responses, you may enjoy understanding society, the economy, and how decisions affect people's lives. You may be interested in solving social and economic challenges.",
        intelligences: { logical: 5, intrapersonal: 3, linguistic: 2 },
        schoolGroups: ["Commerce", "Commerce with Mathematics", "Humanities", "Mathematics, Physics, Chemistry"],
        entranceExams: ["CUET"],
        degreePrograms: ["B.Sc. Economics", "B.A. Economics", "B.A. Public Policy", "B.A. Development Studies", "BBA"],
        careers: ["Economist", "Policy Analyst", "Development Consultant", "Economic Researcher", "Public Policy Consultant", "CSR Manager", "Programme Officer", "Social Impact Analyst", "Urban Policy Planner", "Development Officer"]
    },
    {
        id: "law",
        name: "Law",
        icon: "⚖️",
        description: "Based on your responses, you may enjoy communication, logical reasoning, and understanding different viewpoints. You may also enjoy solving problems fairly and standing up for justice.",
        intelligences: { linguistic: 5, logical: 5, interpersonal: 4 },
        schoolGroups: ["Any Higher Secondary Group"],
        entranceExams: ["CLAT", "AILET", "SLAT", "LSAT (where applicable)", "CUET (for selected universities)"],
        degreePrograms: ["B.A. LL.B.", "B.B.A. LL.B.", "B.Com. LL.B.", "B.Sc. LL.B.", "LL.B."],
        careers: ["Advocate", "Corporate Lawyer", "Judge", "Legal Advisor", "Public Prosecutor", "Legal Officer", "Compliance Officer", "Cyber Law Specialist", "Intellectual Property Lawyer", "Legal Researcher"]
    },
    {
        id: "public_services",
        name: "Public Services",
        icon: "🏛️",
        description: "Based on your responses, you may enjoy serving society, taking responsibility, and making a positive difference in people's lives. This field offers opportunities to contribute to the nation through public service.",
        intelligences: { intrapersonal: 5, interpersonal: 4, linguistic: 3 },
        schoolGroups: ["Any Higher Secondary Group"],
        entranceExams: ["NDA (after Class XII)", "CDS (after graduation)", "UPSC Civil Services Examination (after graduation)", "State Public Service Commission Examinations (after graduation)"],
        degreePrograms: ["Any Bachelor's Degree (eligible for most Civil Services)", "B.A. Public Administration", "B.A. Political Science", "B.A. History", "B.Com./B.Sc./B.Tech. (all are eligible)"],
        careers: ["IAS Officer", "IPS Officer", "Indian Forest Service Officer", "Defence Officer", "Police Officer", "Fire & Rescue Officer", "Revenue Officer", "Panchayat Development Officer", "Government Administrative Officer", "Disaster Management Officer"]
    },
    {
        id: "education",
        name: "Education & Human Development",
        icon: "🎓",
        description: "Based on your responses, you may enjoy helping others learn, grow, and achieve their potential. You may find satisfaction in guiding, teaching, and supporting people.",
        intelligences: { interpersonal: 5, linguistic: 4, intrapersonal: 3 },
        schoolGroups: ["Any Higher Secondary Group"],
        entranceExams: ["NCET", "NCERT - CEE", "CUET"],
        degreePrograms: ["B.A.B.Ed.", "B.Sc.B.Ed.", "B.El.Ed.", "B.A. Psychology"],
        careers: ["School Teacher", "College Professor", "Special Educator", "School Counsellor", "Educational Psychologist", "Curriculum Developer", "Corporate Trainer", "Instructional Designer", "Child Development Specialist", "Education Administrator"]
    },
    {
        id: "humanities",
        name: "Humanities & Liberal Arts",
        icon: "🎭",
        description: "Based on your responses, you may enjoy understanding people, society, culture, languages, and history. You may like exploring ideas and thinking about the world from different perspectives.",
        intelligences: { linguistic: 5, interpersonal: 4, intrapersonal: 4 },
        schoolGroups: ["Humanities", "Commerce", "Any Higher Secondary Group"],
        entranceExams: ["CUET"],
        degreePrograms: ["B.A.", "B.A. History", "B.A. Sociology", "B.A. Political Science", "B.A. Psychology", "B. Social Work"],
        careers: ["Historian", "Archaeologist", "Sociologist", "Political Scientist", "Anthropologist", "Psychologist", "Writer", "Editor", "Social Researcher", "Social Worker"]
    },
    {
        id: "media",
        name: "Media & Communication",
        icon: "🎙️",
        description: "Based on your responses, you may enjoy expressing ideas, telling stories, and connecting with people. You may be creative and confident in sharing information through different forms of communication.",
        intelligences: { linguistic: 5, interpersonal: 4, spatial: 2 },
        schoolGroups: ["Any Higher Secondary Group"],
        entranceExams: ["CUET", "IIMC Entrance Examination (when applicable)"],
        degreePrograms: ["B.A. Journalism", "B.A. Mass Communication", "B.A. Visual Communication", "Bachelor of Multimedia", "Bachelor of Film Studies"],
        careers: ["Journalist", "News Anchor", "Content Creator", "Public Relations Officer", "Film Director", "Script Writer", "Video Producer", "Advertising Executive", "Social Media Manager", "Corporate Communications Specialist"]
    },
    {
        id: "hospitality",
        name: "Hospitality, Tourism & Sports",
        icon: "🏨",
        description: "Based on your responses, you may enjoy working with people, creating memorable experiences, and working in dynamic environments. You may also enjoy teamwork, communication, and service.",
        intelligences: { interpersonal: 5, bodily: 4, linguistic: 3 },
        schoolGroups: ["Any Higher Secondary Group"],
        entranceExams: ["NCHM JEE", "CUET", "IGNTU-ICI Joint Entrance Examination", "IITTM Admission Test (IIAT)"],
        degreePrograms: ["B.Sc. Hospitality & Hotel Administration", "Bachelor of Hotel Management (BHM)", "BBA Tourism & Travel Management", "BBA in Culinary Arts", "Bachelor of Physical Education (B.P.Ed.)", "Bachelor of Sports Management"],
        careers: ["Hotel Manager", "Chef", "Tourism Manager", "Travel Consultant", "Event Manager", "Sports Manager", "Fitness Trainer", "Sports Coach", "Airline Cabin Crew", "Resort Manager"]
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
    // SECTION A — LINGUISTIC INTELLIGENCE (Questions 1–10)
    { id: 1, domain: "linguistic", english: "I enjoy reading books, articles, or stories.", tamil: "நான் புத்தகங்கள், கட்டுரைகள் அல்லது கதைகளைப் படிப்பதை விரும்புகிறேன்." },
    { id: 2, domain: "linguistic", english: "I can explain ideas clearly to others.", tamil: "என்னால் மற்றவர்களுக்கு கருத்துக்களை தெளிவாக விளக்க முடியும்." },
    { id: 3, domain: "linguistic", english: "I enjoy participating in debates or speeches.", tamil: "நான் விவாதங்கள் அல்லது பேச்சுப்போட்டிகளில் பங்கேற்பதை விரும்புகிறேன்." },
    { id: 4, domain: "linguistic", english: "I like learning new words and meanings.", tamil: "நான் புதிய சொற்களையும் அவற்றின் அர்த்தங்களையும் கற்றுக்கொள்ள விரும்புகிறேன்." },
    { id: 5, domain: "linguistic", english: "I enjoy writing essays, poems, or stories.", tamil: "நான் கட்டுரைகள், கவிதைகள் அல்லது கதைகள் எழுதுவதை விரும்புகிறேன்." },
    { id: 6, domain: "linguistic", english: "I enjoy storytelling.", tamil: "நான் கதைகள் சொல்வதை விரும்புகிறேன்." },
    { id: 7, domain: "linguistic", english: "I enjoy language-based subjects.", tamil: "நான் மொழி சார்ந்த பாடங்களை விரும்புகிறேன்." },
    { id: 8, domain: "linguistic", english: "I can learn multiple languages easily.", tamil: "என்னால் பல மொழிகளை எளிதாகக் கற்றுக்கொள்ள முடியும்." },
    { id: 9, domain: "linguistic", english: "I enjoy giving presentations.", tamil: "நான் விளக்கக்காட்சிகளை (Presentations) வழங்குவதை விரும்புகிறேன்." },
    { id: 10, domain: "linguistic", english: "I can convince others using words.", tamil: "வார்த்தைகளைப் பயன்படுத்தி என்னால் மற்றவர்களை சமாதானப்படுத்தவோ அல்லது நம்பவைக்கவோ முடியும்." },
    
    // SECTION B — LOGICAL–MATHEMATICAL INTELLIGENCE (Questions 11–20)
    { id: 11, domain: "logical", english: "I enjoy solving puzzles and logical problems.", tamil: "புதிர்கள் மற்றும் தர்க்கரீதியான சிக்கல்களைத் தீர்ப்பதை நான் விரும்புகிறேன்." },
    { id: 12, domain: "logical", english: "I like mathematics and numerical calculations.", tamil: "நான் கணிதம் மற்றும் எண்கணிதக் கணக்கீடுகளை விரும்புகிறேன்." },
    { id: 13, domain: "logical", english: "I can identify patterns easily.", tamil: "என்னால் வடிவங்களை (Patterns) எளிதாகக் கண்டறிய முடியும்." },
    { id: 14, domain: "logical", english: "I enjoy science experiments.", tamil: "நான் அறிவியல் சோதனைகளைச் செய்வதை விரும்புகிறேன்." },
    { id: 15, domain: "logical", english: "I think step-by-step while solving problems.", tamil: "சிக்கல்களைத் தீர்க்கும்போது நான் படிப்படியாகச் சிந்திப்பேன்." },
    { id: 16, domain: "logical", english: "I enjoy coding or computer-based problem solving.", tamil: "நான் கணினி நிரலாக்கம் (Coding) அல்லது கணினி சார்ந்த சிக்கல்களைத் தீர்ப்பதை விரும்புகிறேன்." },
    { id: 17, domain: "logical", english: "I am curious about how machines or systems work.", tamil: "இயந்திரங்கள் அல்லது அமைப்புகள் எவ்வாறு செயல்படுகின்றன என்பதை அறிய நான் ஆர்வமாக உள்ளேன்." },
    { id: 18, domain: "logical", english: "I enjoy analysing data and facts.", tamil: "தரவுகள் (Data) மற்றும் உண்மைகளைப் பகுப்பாய்வு செய்வதை நான் விரும்புகிறேன்." },
    { id: 19, domain: "logical", english: "I ask 'why' and 'how' frequently.", tamil: "நான் அடிக்கடி 'ஏன்' மற்றும் 'எப்படி' என்று கேள்வி கேட்பேன்." },
    { id: 20, domain: "logical", english: "I like finding solutions to difficult problems.", tamil: "கடினமான பிரச்சினைகளுக்கு தீர்வு காண்பதை நான் விரும்புகிறேன்." },
    
    // SECTION C — SPATIAL INTELLIGENCE (Questions 21–30)
    { id: 21, domain: "spatial", english: "I enjoy drawing or sketching.", tamil: "நான் வரைவது அல்லது ஓவியம் தீட்டுவதை விரும்புகிறேன்." },
    { id: 22, domain: "spatial", english: "I can imagine things visually in my mind.", tamil: "என்னால் விஷயங்களை என் மனதில் காட்சியாக கற்பனை செய்ய முடியும்." },
    { id: 23, domain: "spatial", english: "I enjoy designing posters or models.", tamil: "நான் சுவரொட்டிகள் (Posters) அல்லது மாதிரிகளை வடிவமைப்பதை விரும்புகிறேன்." },
    { id: 24, domain: "spatial", english: "I can read maps and directions easily.", tamil: "என்னால் வரைபடங்களையும் (Maps) வழிகளையும் எளிதாகப் புரிந்து கொள்ள முடியும்." },
    { id: 25, domain: "spatial", english: "I notice colours, shapes, and patterns around me.", tamil: "என்னைச் சுற்றியுள்ள வண்ணங்கள், வடிவங்கள் மற்றும் அமைப்புகளை நான் எளிதில் கவனிப்பேன்." },
    { id: 26, domain: "spatial", english: "I enjoy photography or videography.", tamil: "நான் புகைப்படம் அல்லது வீடியோ எடுப்பதை விரும்புகிறேன்." },
    { id: 27, domain: "spatial", english: "I can assemble objects using diagrams.", tamil: "விளக்கப்படங்களைப் (Diagrams) பயன்படுத்தி என்னால் பொருட்களை ஒன்றிணைக்க முடியும்." },
    { id: 28, domain: "spatial", english: "I like visual learning methods.", tamil: "நான் காட்சி வழி கற்றல் முறைகளை (Visual learning) விரும்புகிறேன்." },
    { id: 29, domain: "spatial", english: "I can understand graphs and charts easily.", tamil: "என்னால் வரைபடங்கள் (Graphs) மற்றும் அட்டவணைகளை (Charts) எளிதாகப் புரிந்து கொள்ள முடியும்." },
    { id: 30, domain: "spatial", english: "I enjoy creative design work.", tamil: "நான் ஆக்கப்பூர்வமான வடிவமைப்பு வேலைகளை விரும்புகிறேன்." },
    
    // SECTION D — BODILY–KINESTHETIC INTELLIGENCE (Questions 31–40)
    { id: 31, domain: "bodily", english: "I enjoy sports and physical activities.", tamil: "நான் விளையாட்டுகள் மற்றும் உடல் செயல்பாடுகளை விரும்புகிறேன்." },
    { id: 32, domain: "bodily", english: "I learn better through practical activities.", tamil: "செய்முறைச் செயல்பாடுகள் மூலம் நான் சிறப்பாகக் கற்றுக்கொள்கிறேன்." },
    { id: 33, domain: "bodily", english: "I enjoy working with tools or equipment.", tamil: "நான் கருவிகள் அல்லது உபகரணங்களுடன் வேலை செய்வதை விரும்புகிறேன்." },
    { id: 34, domain: "bodily", english: "I enjoy dance, acting, or stage performance.", tamil: "நான் நடனம், நடிப்பு அல்லது மேடை நிகழ்ச்சிகளை விரும்புகிறேன்." },
    { id: 35, domain: "bodily", english: "I have good coordination and body control.", tamil: "நான் சிறந்த உடல் ஒருங்கிணைப்பு மற்றும் கட்டுப்பாட்டைக் கொண்டுள்ளேன்." },
    { id: 36, domain: "bodily", english: "I enjoy field work and outdoor activities.", tamil: "நான் களப்பணி மற்றும் வெளிப்புற செயல்பாடுகளை விரும்புகிறேன்." },
    { id: 37, domain: "bodily", english: "I like practical lab activities.", tamil: "நான் ஆய்வக செய்முறை செயல்பாடுகளை விரும்புகிறேன்." },
    { id: 38, domain: "bodily", english: "I enjoy creating things with my hands.", tamil: "என் கைகளால் பொருட்களை உருவாக்குவதை நான் விரும்புகிறேன்." },
    { id: 39, domain: "bodily", english: "I can learn physical skills quickly.", tamil: "உடல் சார்ந்த திறன்களை என்னால் விரைவாகக் கற்றுக்கொள்ள முடியும்." },
    { id: 40, domain: "bodily", english: "I enjoy participating in competitions and activities.", tamil: "போட்டிகள் மற்றும் செயல்பாடுகளில் பங்கேற்பதை நான் விரும்புகிறேன்." },
    
    // SECTION E — MUSICAL INTELLIGENCE (Questions 41–50)
    { id: 41, domain: "musical", english: "I enjoy listening to music regularly.", tamil: "நான் வழக்கமாக இசை கேட்பதை விரும்புகிறேன்." },
    { id: 42, domain: "musical", english: "I can identify different tunes or rhythms.", tamil: "வெெவேறு மெட்டுகள் அல்லது தாளங்களை என்னால் அடையாளம் காண முடியும்." },
    { id: 43, domain: "musical", english: "I enjoy singing or playing instruments.", tamil: "நான் பாடுவதை அல்லது இசைக் கருவிகளை இசைப்பதை விரும்புகிறேன்." },
    { id: 44, domain: "musical", english: "I remember songs easily.", tamil: "பாடல்களை என்னால் எளிதில் நினைவில் வைத்துக் கொள்ள முடியும்." },
    { id: 45, domain: "musical", english: "I feel emotionally connected to music.", tamil: "நான் இசையோடு உணர்வுப்பூர்வமாக இணைந்திருப்பதாக உணர்கிறேன்." },
    { id: 46, domain: "musical", english: "I enjoy creating beats or rhythms.", tamil: "நான் புதிய தாளங்கள் அல்லது லயங்களை உருவாக்குவதை விரும்புகிறேன்." },
    { id: 47, domain: "musical", english: "I notice sounds around me carefully.", tamil: "என்னைச் சுற்றியுள்ள ஒலிகளை நான் கவனமாகக் கவனிப்பேன்." },
    { id: 48, domain: "musical", english: "I enjoy cultural or musical performances.", tamil: "நான் கலாச்சார அல்லது இசை நிகழ்ச்சிகளை விரும்புகிறேன்." },
    { id: 49, domain: "musical", english: "I can focus better with music.", tamil: "இசை கேட்கும்போது என்னால் சிறப்பாகக் கவனம் செலுத்த முடிகிறது." },
    { id: 50, domain: "musical", english: "I enjoy learning through rhythm or songs.", tamil: "நான் தாளம் அல்லது பாடல்கள் மூலம் கற்றுக்கொள்வதை விரும்புகிறேன்." },
    
    // SECTION F — INTERPERSONAL INTELLIGENCE (Questions 51–60)
    { id: 51, domain: "interpersonal", english: "I enjoy working in teams.", tamil: "நான் குழுக்களாக இணைந்து பணியாற்றுவதை விரும்புகிறேன்." },
    { id: 52, domain: "interpersonal", english: "My friends often seek my advice.", tamil: "என் நண்பர்கள் பெரும்பாலும் என்னிடம் ஆலோசனை அல்லது உதவி கேட்பார்கள்." },
    { id: 53, domain: "interpersonal", english: "I can understand others’ emotions easily.", tamil: "மற்றவர்களின் உணர்வுகளை என்னால் எளிதாகப் புரிந்து கொள்ள முடியும்." },
    { id: 54, domain: "interpersonal", english: "I enjoy helping people solve problems.", tamil: "மக்களின் பிரச்சினைகளைத் தீர்க்க உதவுவதில் நான் மகிழ்ச்சியடைகிறேன்." },
    { id: 55, domain: "interpersonal", english: "I can lead group activities confidently.", tamil: "என்னால் குழு செயல்பாடுகளை நம்பிக்கையுடன் வழிநடத்த முடியும்." },
    { id: 56, domain: "interpersonal", english: "I can communicate comfortably with different types of people.", tamil: "பல்வேறு வகையான மக்களுடன் என்னால் வசதியாகத் தொடர்பு கொள்ள முடியும்." },
    { id: 57, domain: "interpersonal", english: "I enjoy organizing events or activities.", tamil: "நிகழ்ச்சிகள் அல்லது செயல்பாடுகளை ஏற்பாடு செய்வதை நான் விரும்புகிறேன்." },
    { id: 58, domain: "interpersonal", english: "I can resolve conflicts between people.", tamil: "மக்களுக்கு இடையே ஏற்படும் கருத்து வேறுபாடுகளை என்னால் தீர்க்க முடியும்." },
    { id: 59, domain: "interpersonal", english: "I enjoy teaching or guiding others.", tamil: "மற்றவர்களுக்குக் கற்பிப்பதை அல்லது வழிகாட்டுவதை நான் விரும்புகிறேன்." },
    { id: 60, domain: "interpersonal", english: "I enjoy social service and community work.", tamil: "நான் சமூக சேவை மற்றும் சமூக நலப் பணிகளில் ஈடுபடுவதை விரும்புகிறேன்." },
    
    // SECTION G — INTRAPERSONAL INTELLIGENCE (Questions 61–70)
    { id: 61, domain: "intrapersonal", english: "I understand my strengths and weaknesses clearly.", tamil: "எனது பலம் மற்றும் பலவீனங்களை நான் தெளிவாகப் புரிந்து வைத்துள்ளேன்." },
    { id: 62, domain: "intrapersonal", english: "I spend time reflecting on my goals.", tamil: "எனது இலக்குகளைப் பற்றிச்சிந்திப்பதற்காக நான் நேரத்தைச் செலவிடுகிறேன்." },
    { id: 63, domain: "intrapersonal", english: "I can work independently without supervision.", tamil: "கண்காணிப்பு இல்லாமலேயே என்னால் தனித்துச் செயல்பட முடியும்." },
    { id: 64, domain: "intrapersonal", english: "I stay motivated even during difficulties.", tamil: "கடினமான சூழ்நிலைகளிலும் நான் ஊக்கத்துடன் இருப்பேன்." },
    { id: 65, domain: "intrapersonal", english: "I make decisions carefully.", tamil: "நான் முடிவுகளை கவனமாக எடுப்பேன்." },
    { id: 66, domain: "intrapersonal", english: "I know what interests me most.", tamil: "எனக்கு எது மிகவும் பிடிக்கும்/ஆர்வமூட்டும் என்பதை நான் அறிவேன்." },
    { id: 67, domain: "intrapersonal", english: "I remain calm during stressful situations.", tamil: "மனஅழுத்தம் நிறைந்த சூழ்நிலைகளிலும் நான் அமைதியாக இருப்பேன்." },
    { id: 68, domain: "intrapersonal", english: "I like planning my future.", tamil: "எனது எதிர்காலத்தைத் திட்டமிடுவதை நான் விரும்புகிறேன்." },
    { id: 69, domain: "intrapersonal", english: "I am disciplined in completing tasks.", tamil: "பணிகளை முடிப்பதில் நான் ஒழுங்குமுறையுடன் செயல்படுவேன்." },
    { id: 70, domain: "intrapersonal", english: "I learn from my mistakes.", tamil: "நான் செய்த தவறுகளில் இருந்து பாடம் கற்றுக்கொள்கிறேன்." },
    
    // SECTION H — NATURALISTIC INTELLIGENCE (Questions 71–80)
    { id: 71, domain: "naturalistic", english: "I enjoy spending time in nature.", tamil: "இயற்கையோடு நேரத்தைக் கழிக்க நான் விரும்புகிறேன்." },
    { id: 72, domain: "naturalistic", english: "I am interested in plants, animals, or farming.", tamil: "தாவரங்கள், விலங்குகள் அல்லது விவசாயத்தில் எனக்கு ஆர்வம் உண்டு." },
    { id: 73, domain: "naturalistic", english: "I notice environmental changes around me.", tamil: "என்னைச் சுற்றியுள்ள சுற்றுச்சூழல் மாற்றங்களை நான் கவனிப்பேன்." },
    { id: 74, domain: "naturalistic", english: "I enjoy gardening or agricultural activities.", tamil: "தோட்டம் வளர்ப்பது அல்லது விவசாயச் செயல்பாடுகளை நான் விரும்புகிறேன்." },
    { id: 75, domain: "naturalistic", english: "I care about environmental protection.", tamil: "சுற்றுச்சூழலைப் பாதுகாப்பதில் நான் அக்கறை கொண்டுள்ளேன்." },
    { id: 76, domain: "naturalistic", english: "I enjoy learning about weather and climate.", tamil: "வானிலை மற்றும் காலநிலை பற்றிக் கற்றுக்கொள்வதை நான் விரும்புகிறேன்." },
    { id: 77, domain: "naturalistic", english: "I like observing living things closely.", tamil: "உயிரினங்களை உற்று நோக்குவதை நான் விரும்புகிறேன்." },
    { id: 78, domain: "naturalistic", english: "I am curious about natural resources.", tamil: "இயற்கை வளங்களைப் பற்றி அறிய நான் ஆர்வமாக உள்ளேன்." },
    { id: 79, domain: "naturalistic", english: "I enjoy science topics related to nature.", tamil: "இயற்கை தொடர்பான அறிவியல் தலைப்புகளை நான் விரும்புகிறேன்." },
    { id: 80, domain: "naturalistic", english: "I enjoy rural development or community development activities.", tamil: "கிராமப்புற மேம்பாடு அல்லது சமூக மேம்பாட்டுச் செயல்பாடுகளை நான் விரும்புகிறேன்." }
];

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
                    <img src="${question.image}" alt="Question Graphic Reference" onerror="this.src='/images/default.jpg'">
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
    if (score >= 80) return "Very Strong";
    if (score >= 60) return "Strong";
    return "Moderate";
}

function getTopStrengths(scores) {
    return Object.entries(scores.percentage).map(([domainId, score]) => {
        const d = domains.find(x => x.id === domainId);
        return { id: domainId, name: d.name, icon: d.icon, score, level: getStrengthLevel(score) };
    }).sort((a, b) => b.score - a.score).slice(0, 3);
}

function calculateCareerMatches(intelligenceScores) {
    const streamMappers = [
        { id: "engineering", name: "Engineering & Technology", icon: "⚙️", intelligences: { logical: 5, spatial: 4, bodily: 2 } },
        { id: "computer_science", name: "Computer Science & Digital Technologies", icon: "💻", intelligences: { logical: 5, intrapersonal: 4, spatial: 3 } },
        { id: "science_research", name: "Science & Research", icon: "🔬", intelligences: { logical: 5, naturalistic: 4, intrapersonal: 3 } },
        { id: "medicine", name: "Medicine", icon: "🩺", intelligences: { naturalistic: 3, logical: 4, interpersonal: 5 } },
        { id: "paramedical", name: "Paramedical & Allied Health Sciences", icon: "🏥", intelligences: { interpersonal: 5, bodily: 4, logical: 3 } },
        { id: "agriculture", name: "Agriculture & Food Technology", icon: "🌾", intelligences: { naturalistic: 5, logical: 3, bodily: 4 } },
        { id: "environment", name: "Environment & Sustainability", icon: "🌿", intelligences: { naturalistic: 5, logical: 4, intrapersonal: 3 } },
        { id: "architecture", name: "Architecture & Planning", icon: "🏛️", intelligences: { spatial: 5, logical: 4, bodily: 2 } },
        { id: "design", name: "Design", icon: "🎨", intelligences: { spatial: 5, intrapersonal: 3, bodily: 2 } },
        { id: "commerce", name: "Commerce, Finance & Accounting", icon: "📊", intelligences: { logical: 5, intrapersonal: 3, linguistic: 2 } },
        { id: "management", name: "Management", icon: "💼", intelligences: { interpersonal: 5, intrapersonal: 4, linguistic: 3 } },
        { id: "economics", name: "Economics & Public Policy", icon: "📈", intelligences: { logical: 5, intrapersonal: 3, linguistic: 2 } },
        { id: "law", name: "Law", icon: "⚖️", intelligences: { linguistic: 5, logical: 5, interpersonal: 4 } },
        { id: "public_services", name: "Public Services", icon: "🏛️", intelligences: { intrapersonal: 5, interpersonal: 4, linguistic: 3 } },
        { id: "education", name: "Education & Human Development", icon: "🎓", intelligences: { interpersonal: 5, linguistic: 4, intrapersonal: 3 } },
        { id: "humanities", name: "Humanities & Liberal Arts", icon: "🎭", intelligences: { linguistic: 5, interpersonal: 4, intrapersonal: 4 } },
        { id: "media", name: "Media & Communication", icon: "🎙️", intelligences: { linguistic: 5, interpersonal: 4, spatial: 2 } },
        { id: "hospitality", name: "Hospitality, Tourism & Sports", icon: "🏨", intelligences: { interpersonal: 5, bodily: 4, linguistic: 3 } }
    ];

    const results = streamMappers.map(cluster => {
        let totalScore = 0; 
        let totalWeight = 0;
        let breakdownLog = [];

        Object.entries(cluster.intelligences).forEach(([domainId, weight]) => {
            const domainScore = intelligenceScores.percentage[domainId] || 50;
            totalScore += domainScore * weight; 
            totalWeight += weight;
            breakdownLog.push({
                domain: getDomainName(domainId),
                score: domainScore,
                weight: weight
            });
        });
        
        const matchScore = totalWeight > 0 ? Math.min(Math.round(totalScore / totalWeight), 100) : 0;
        return { ...cluster, matchScore, breakdownLog, totalScore, totalWeight };
    });
    return results.sort((a, b) => b.matchScore - a.matchScore);
}

function buildReportDataFromSet(info, answersSet) {
    const intelligenceScores = calculateIntelligenceScoresFromSet(answersSet);
    const topStrengths = getTopStrengths(intelligenceScores);
    const topStreams = calculateCareerMatches(intelligenceScores).slice(0, 3);

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
    if (!studentInfo.name || !studentInfo.class || !studentInfo.medium || !studentInfo.school || !studentInfo.district) {
        const errorMsg = currentLanguageMode === "tamil" ? "அறிக்கையை உருவாக்குவதற்கு முன் அனைத்து சுயவிவரப் பதிவுப் புலங்களையும் பூர்த்தி செய்யவும்." : "Please complete all profile registration fields before generating the report.";
        alert(errorMsg);
        return false;
    }
    const answeredTotal = Object.keys(answers).length;
    if (answeredTotal < questions.length) {
        const errorMsg = currentLanguageMode === "tamil" ? `மதிப்பீடு முழுமையடையவில்லை. நீங்கள் 80 வினாக்களில் ${answeredTotal} வினாக்களுக்கு மட்டுமே பதிலளித்துள்ளீர்கள்.` : `Evaluation incomplete. You have answered ${answeredTotal} out of ${questions.length} questions.`;
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

    function getCustomAssociationText(domainId, score) {
        let association = "";
        let text = "";
        
        if (score >= 80) {
            association = "Very Strong Association";
        } else if (score >= 60) {
            association = "Strong Association";
        } else {
            association = "Moderate Association";
        }

        const texts = {
            linguistic: {
                "Very Strong Association": "You enjoy expressing your ideas through speaking and writing. You like reading, learning new words, listening to others, and communicating your thoughts clearly.",
                "Strong Association": "You communicate your ideas confidently and enjoy reading, writing, and learning new words. You are comfortable expressing yourself and can communicate effectively in most situations.",
                "Moderate Association": "You can express your ideas and understand language-based activities when needed, but reading, writing, or speaking may not be your preferred interests. With regular practice, your communication skills can become stronger."
            },
            logical: {
                "Very Strong Association": "You enjoy solving problems, identifying patterns, and thinking logically. You like analysing information, asking questions, and finding practical solutions.",
                "Strong Association": "You enjoy solving problems and using logical thinking in different situations. You are comfortable analysing information, recognising patterns, and making well-reasoned decisions.",
                "Moderate Association": "You can solve problems and think logically when needed, but analytical tasks may not always be your preferred choice. With regular practice, you can strengthen your reasoning and problem-solving skills."
            },
            spatial: {
                "Very Strong Association": "You enjoy thinking visually and imagining how things look or fit together. You may like drawing, designing, building, or understanding maps and diagrams.",
                "Strong Association": "You are comfortable using visual thinking to understand ideas and solve problems. You enjoy activities such as drawing, designing, creating, or working with maps and diagrams.",
                "Moderate Association": "You can understand and use visual information when needed, but creative and design-based activities may not always be your preferred choice. With practice, you can develop stronger visual thinking and design skills."
            },
            bodily: {
                "Very Strong Association": "You enjoy learning by doing and using your hands to complete tasks. You like building, creating, experimenting, playing sports, or participating in physical activities.",
                "Strong Association": "You are comfortable using hands-on methods to learn and solve problems. You enjoy practical activities, movement, and working with tools or materials.",
                "Moderate Association": "You can perform practical and physical tasks when needed, but hands-on activities may not always be your preferred way of learning. With practice, you can improve your coordination and practical skills."
            },
            musical: {
                "Very Strong Association": "You enjoy music and easily recognise rhythms, melodies, and sounds. You may like singing, playing musical instruments, listening to music, or creating your own tunes.",
                "Strong Association": "You enjoy music and appreciate different rhythms and melodies. You are comfortable participating in musical activities such as singing, listening, or learning an instrument.",
                "Moderate Association": "You enjoy music occasionally and can recognise basic rhythms and melodies, but musical activities may not always be your preferred interest. With practice, you can develop stronger musical skills and appreciation."
            },
            interpersonal: {
                "Very Strong Association": "You enjoy working with others and understand their thoughts and feelings. You like helping people, collaborating in teams, and communicating effectively in different situations.",
                "Strong Association": "You work well with others and are comfortable communicating, cooperating, and building positive relationships. You enjoy participating in group activities and supporting those around you.",
                "Moderate Association": "You can work with others and communicate when needed, but group interactions may not always be your preferred choice. With practice, you can develop stronger teamwork and communication skills."
            },
            intrapersonal: {
                "Very Strong Association": "You have a good understanding of your thoughts, feelings, strengths, and goals. You enjoy reflecting on your experiences and making decisions that match your values and interests.",
                "Strong Association": "You are aware of your strengths and areas for improvement. You can reflect on your experiences and make thoughtful decisions about your learning and personal growth.",
                "Moderate Association": "You understand yourself in many situations, but self-reflection may not always come naturally. With regular reflection and goal setting, you can strengthen your self-awareness and personal development."
            },
            naturalistic: {
                "Very Strong Association": "You enjoy exploring nature and learning about plants, animals, and the environment. You like observing the natural world, recognising patterns in nature, and caring for living things.",
                "Strong Association": "You appreciate nature and enjoy learning about the environment. You are interested in observing plants, animals, and natural surroundings, and you care about protecting them.",
                "Moderate Association": "You understand and appreciate nature when needed, but activities related to the environment may not always be your preferred interest. With more exposure, you can develop a stronger connection with the natural world."
            }
        };

        text = texts[domainId] ? texts[domainId][association] : "";
        return { association, text };
    }

    function getLearningStyleNotes(domainId) {
        const styles = {
            linguistic: "You learn best when you read, write, listen, discuss, and express your ideas. Activities such as reading books, storytelling, presentations, debates, and writing can help you understand and remember new concepts.",
            logical: "You learn best when you solve problems, analyse information, identify patterns, and understand how things work. Puzzles, experiments, mathematical activities, and logical reasoning help you learn effectively.",
            spatial: "You learn best through pictures, diagrams, models, maps, videos, and visual demonstrations. Drawing, designing, and using visual aids can make learning easier and more enjoyable.",
            bodily: "You learn best through hands-on activities, practical experiences, movement, and doing things yourself. Projects, experiments, sports, role plays, and model building help you understand concepts better.",
            musical: "You learn best when lessons include music, rhythm, sounds, or patterns. Songs, rhymes, musical activities, and listening can help you remember and understand new information.",
            interpersonal: "You learn best when you work with others, share ideas, and participate in group activities. Discussions, teamwork, peer learning, and collaborative projects help you learn effectively.",
            intrapersonal: "You learn best when you have time to think, reflect, and work independently. Setting personal goals, self-study, and quiet reflection help you understand and apply new knowledge.",
            naturalistic: "You learn best by exploring nature and connecting what you learn to the world around you. Activities such as observing plants and animals, outdoor learning, field visits, environmental projects, and hands-on experiences help you understand and remember concepts more effectively."
        };
        return styles[domainId] || "";
    }

    const extendedCareerMaster = {
        "engineering": {
            description: "Based on your responses, you show strengths that are well suited to this career field. You may enjoy solving problems, understanding how things work, and creating practical solutions.",
            subDescription: "This career field offers opportunities to design, build, improve, and innovate across areas such as engineering, manufacturing, robotics, electronics, and new technologies.",
            careers: ["Mechanical Engineer", "Civil Engineer", "Electrical Engineer", "Electronics Engineer", "Robotics Engineer", "Aerospace Engineer", "Mechatronics Engineer", "Manufacturing Engineer", "Renewable Energy Engineer", "Industrial Engineer"],
            group: "Mathematics, Physics, Chemistry (MPC) or Mathematics, Physics, Chemistry, Computer Science (MPCS)",
            exams: ["JEE Main", "JEE Advanced", "State Engineering Entrance Examinations", "CUET (for participating universities)", "Tamil Nadu Engineering Admissions Counseling with XII Board Exam Marks"],
            degrees: ["B.E.", "B.Tech.", "Integrated M.Tech.", "Dual Degree Programmes"],
            parentGuidance: "Encourage your child to develop problem-solving and analytical skills through science, mathematics, and hands-on activities. Support participation in science exhibitions, robotics clubs, innovation challenges, and STEM competitions to build curiosity and confidence."
        },
        "computer_science": {
            description: "Your responses suggest that you enjoy logical thinking, technology, and solving problems in a systematic way.",
            subDescription: "This career field offers opportunities to create software, develop apps, build websites, analyse data, work with artificial intelligence, and develop digital solutions.",
            careers: ["Software Developer", "Artificial Intelligence Engineer", "Data Scientist", "Cybersecurity Analyst", "Cloud Engineer", "Machine Learning Engineer", "Mobile App Developer", "Full Stack Developer", "UI/UX Designer", "Blockchain Developer"],
            group: "Mathematics, Physics, Chemistry, Computer Science or Mathematics, Physics, Chemistry",
            exams: ["JEE Main", "JEE Advanced", "CUET", "State Engineering Entrance Examinations"],
            degrees: ["B.Tech. Computer Science & Engineering", "B.Tech. Artificial Intelligence & Data Science", "B.Tech. Information Technology", "B.Sc. Computer Science", "Bachelor of Computer Applications (BCA)"],
            parentGuidance: "Encourage your child to explore coding, digital tools, and technology-based learning. Support participation in coding competitions, hackathons, robotics clubs, and online learning platforms to build confidence and practical skills."
        },
        "science_research": {
            description: "Your responses show curiosity and a desire to understand how things work. You may enjoy asking questions, exploring ideas, and discovering new knowledge.",
            subDescription: "This career field offers opportunities to conduct research, perform experiments, develop new technologies, and contribute to scientific discoveries.",
            careers: ["Research Scientist", "Physicist", "Chemist", "Biotechnologist", "Microbiologist", "Environmental Scientist", "Food Scientist", "Clinical Research Associate", "Space Scientist", "Materials Scientist"],
            group: "Mathematics, Physics, Chemistry, Biology or Mathematics, Physics, Chemistry or Biology, Physics, Chemistry",
            exams: ["IISER Aptitude Test (IAT)", "NEST", "CUET", "JEE Main (for selected programmes)"],
            degrees: ["B.Sc.", "BS-MS Integrated Programme", "Integrated M.Sc.", "B.Tech. (Research Programmes)"],
            parentGuidance: "Encourage your child's curiosity by supporting science projects, experiments, exhibitions, and reading beyond textbooks. Appreciate questions and encourage independent thinking."
        },
        "medicine": {
            description: "Based on your responses, you may enjoy learning about science while helping others lead healthier lives.",
            subDescription: "This career field offers opportunities to diagnose illnesses, treat patients, promote good health, and improve the well-being of individuals and communities.",
            careers: ["Doctor", "Surgeon", "Paediatrician", "Psychiatrist", "Cardiologist", "Radiologist", "Dermatologist", "Anaesthesiologist", "Public Health Specialist", "Medical Researcher"],
            group: "Biology, Physics, Chemistry (PCB)",
            exams: ["NEET-UG"],
            degrees: ["MBBS", "BDS", "BAMS", "BHMS", "BSMS"],
            parentGuidance: "Support your child in developing strong study habits, compassion, and perseverance. Encourage healthy routines, scientific curiosity, and a commitment to helping others."
        },
        "paramedical": {
            description: "Your responses suggest that you enjoy supporting and caring for others. You may enjoy practical work that makes a positive difference in people's lives.",
            subDescription: "This career field offers opportunities in healthcare services such as medical laboratories, physiotherapy, radiology, emergency care, and rehabilitation.",
            careers: ["Physiotherapist", "Medical Laboratory Technologist", "Radiographer", "Occupational Therapist", "Optometrist", "Audiologist", "Dialysis Technologist", "Emergency Medical Technician", "Operation Theatre Technologist", "Nutritionist"],
            group: "Biology, Physics, Chemistry (PCB)",
            exams: ["NEET (for selected programmes)", "AIIMS Nursing", "AIIMS Paramedical", "NIMHANS Paramedical", "CUET", "State Entrance Examinations", "Institution-specific Entrance Tests", "Tamil Nadu Paramedical Counseling with XII Board Exam marks"],
            degrees: ["B.Sc. Allied Health Sciences", "Bachelor of Physiotherapy (BPT)", "B.Sc. Medical Laboratory Technology", "B.Sc. Radiography", "B.Optom"],
            parentGuidance: "Help your child understand the many career opportunities available in healthcare beyond medicine. Encourage empathy, discipline, and participation in health awareness programmes."
        },
        "agriculture": {
            description: "Your responses suggest an interest in nature, farming, food, and sustainable living.",
            subDescription: "This career field offers opportunities to improve agriculture, develop better food products, increase food production, and support rural development.",
            careers: ["Agricultural Officer", "Agricultural Scientist", "Food Technologist", "Horticulturist", "Dairy Technologist", "Agribusiness Manager", "Soil Scientist", "Seed Technologist", "Fisheries Officer", "Farm Manager"],
            group: "Biology, Physics, Chemistry or Mathematics, Physics, Chemistry or Agriculture (where offered)",
            exams: ["ICAR AIEEA", "CUET", "State Agricultural University Entrance Examinations", "Tamil Nadu Agriculture Counseling with XII Board Exam marks"],
            degrees: ["B.Sc. Agriculture", "B.Tech. Food Technology", "B.Sc. Horticulture", "B.Sc. Forestry", "B.F.Sc."],
            parentGuidance: "Encourage your child to appreciate agriculture, sustainability, and food systems. Exposure to farming, gardening, and environmental activities can help build lasting interest."
        },
        "environment": {
            description: "Based on your responses, you care about nature and protecting the environment. You may enjoy finding solutions to environmental challenges and promoting sustainable living.",
            subDescription: "This career field offers engineering and diagnostic structural spaces tailored to environmental assessment pathways.",
            careers: ["Environmental Engineer", "Sustainability Consultant", "Wildlife Biologist", "Forest Officer", "Climate Change Analyst", "Conservation Scientist", "Environmental Planner", "GIS Specialist", "Renewable Energy Consultant", "Waste Management Specialist"],
            group: "Biology, Physics, Chemistry or Mathematics, Physics, Chemistry",
            exams: ["CUET", "ICAR AIEEA", "JEE Main (for Environmental Engineering)"],
            degrees: ["B.Sc. Environmental Science", "B.Tech. Environmental Engineering", "B.Sc. Forestry", "B.Sc. Wildlife Science", "B.Sc. Earth Sciences"],
            parentGuidance: "Support your child's interest in nature through eco-clubs, field visits, environmental campaigns, and outdoor activities that promote conservation and sustainability."
        },
        "architecture": {
            description: "Based on your responses, you may enjoy visualising ideas, designing spaces, and combining creativity with practical thinking. This field offers opportunities to shape the places where people live and work.",
            subDescription: "This field includes highly structured architectural layouts, urban master-planning systems, and internal structural design metrics.",
            careers: ["Architect", "Urban Planner", "Interior Designer", "Landscape Architect", "Town Planner", "Urban Designer", "Construction Manager", "BIM Specialist", "Quantity Surveyor", "Sustainable Building Consultant"],
            group: "Mathematics, Physics, Chemistry",
            exams: ["NATA", "JEE Main (Paper 2)"],
            degrees: ["Bachelor of Architecture (B.Arch.)", "Bachelor of Planning (B.Plan.)"],
            parentGuidance: "Encourage your child's creativity through drawing, model making, design activities, and observation of buildings and public spaces. Appreciate both creativity and practical thinking."
        },
        "design": {
            description: "Based on your responses, you show creativity and enjoy expressing ideas in new and innovative ways. You may enjoy creating designs that are both attractive and useful.",
            subDescription: "This field offers opportunities across industrial branding systems, visual UI/UX templates, and structural fine arts specialization.",
            careers: ["Graphic Designer", "Product Designer", "Fashion Designer", "Interior Designer", "UX/UI Designer", "Animation Artist", "Game Designer", "Industrial Designer", "Jewellery Designer", "Visual Communication Designer"],
            group: "Any Higher Secondary Group (depending on the institution and specialization). Mathematics is recommended for certain design programmes.",
            exams: ["UCEED", "NID DAT", "NIFT Entrance Examination", "CUET (for selected institutions)", "Institution-specific Entrance Examinations"],
            degrees: ["Bachelor of Design (B.Des.)", "Bachelor of Fine Arts (BFA)", "Bachelor of Fashion Technology (BFTech)", "Bachelor of Interior Design", "Bachelor of Visual Communication"],
            parentGuidance: "Encourage your child's creativity through art, design, photography, digital tools, and creative projects. Appreciate original ideas and provide opportunities to participate in exhibitions, competitions, and workshops."
        },
        "commerce": {
            description: "Based on your responses, you may enjoy working with numbers, understanding business, and making informed decisions. This field offers opportunities to manage finances and support the growth of organisations.",
            subDescription: "This path maps professional finance operations across corporate accounting frameworks, audit structures, and global banking setups.",
            careers: ["Chartered Accountant", "Financial Analyst", "Investment Banker", "Auditor", "Banking Officer", "Tax Consultant", "Cost Accountant", "Financial Planner", "Risk Analyst", "Accountant"],
            group: "Commerce or Commerce with Mathematics or Mathematics, Physics, Chemistry",
            exams: ["CUET", "CA Foundation", "CMA Foundation", "CS Executive Entrance Test (CSEET)"],
            degrees: ["B.Com.", "B.Com. (Accounting & Finance)", "Bachelor of Business Administration (BBA)", "Bachelor of Economics", "Integrated CA/CMA/CS Pathways"],
            parentGuidance: "Help your child develop financial awareness and business understanding. Encourage responsible money management, logical thinking, and participation in business and entrepreneurship activities."
        },
        "management": {
            description: "Based on your responses, you may enjoy organising activities, leading teams, and working with people. You may also enjoy planning, decision-making, and solving business challenges.",
            subDescription: "This standard operations workspace maps executive leadership parameters across retail management, corporate governance, and entrepreneurial systems.",
            careers: ["Business Manager", "Marketing Manager", "Human Resource Manager", "Operations Manager", "Project Manager", "Product Manager", "Business Analyst", "Entrepreneur", "Retail Manager", "Supply Chain Manager"],
            group: "Commerce or Commerce with Mathematics or Mathematics, Physics, Chemistry or Any stream",
            exams: ["CUET", "IPMAT (Integrated Programme in Management)", "JIPMAT", "Institution-specific Entrance Examinations"],
            degrees: ["Bachelor of Business Administration (BBA)", "Bachelor of Management Studies (BMS)", "Integrated Programme in Management (IPM)", "B.Com.", "Bachelor of Entrepreneurship"],
            parentGuidance: "Encourage leadership, teamwork, communication, and decision-making. Give your child opportunities to organise events, take responsibility, and develop confidence."
        },
        "economics": {
            description: "Based on your responses, you may enjoy understanding society, the economy, and how decisions affect people's lives. You may be interested in solving social and economic challenges.",
            subDescription: "This pipeline covers structured economic evaluation models, policy design criteria, and socio-economic developmental strategies.",
            careers: ["Economist", "Policy Analyst", "Development Consultant", "Economic Researcher", "Public Policy Consultant", "CSR Manager", "Programme Officer", "Social Impact Analyst", "Urban Policy Planner", "Development Officer"],
            group: "Commerce or Commerce with Mathematics or Humanities or Mathematics, Physics, Chemistry",
            exams: ["CUET", "Institution-specific Entrance Examinations"],
            degrees: ["B.A. Economics", "B.Sc. Economics", "B.A. Public Policy", "B.A. Development Studies", "BBA"],
            parentGuidance: "Encourage your child to read newspapers, discuss current affairs, and understand social and economic issues. Help them develop analytical thinking and awareness of the world around them."
        },
        "law": {
            description: "Based on your responses, you may enjoy communication, logical reasoning, and understanding different viewpoints. You may also enjoy solving problems fairly and standing up for justice.",
            subDescription: "This maps modern judicial paths across regulatory systems, compliance logic fields, and dynamic defense representation options.",
            careers: ["Advocate", "Corporate Lawyer", "Judge", "Legal Advisor", "Public Prosecutor", "Legal Officer", "Compliance Officer", "Cyber Law Specialist", "Intellectual Property Lawyer", "Legal Researcher"],
            group: "Any Higher Secondary Group",
            exams: ["CLAT", "AILET", "SLAT", "LSAT (where applicable)", "CUET (for selected universities)"],
            degrees: ["B.A. LL.B.", "B.B.A. LL.B.", "B.Com. LL.B.", "B.Sc. LL.B.", "LL.B."],
            parentGuidance: "Encourage your child to read widely, express ideas confidently, and participate in debates, discussions, and public speaking activities. Help them develop confidence, fairness, and critical thinking."
        },
        "public_services": {
            description: "Based on your responses, you may enjoy serving society, taking responsibility, and making a positive difference in people's lives. This field offers opportunities to contribute to the nation through public service.",
            subDescription: "This domain offers paths within defense forces, civilian administration boards, and administrative disaster management networks.",
            careers: ["IAS Officer", "IPS Officer", "Indian Forest Service Officer", "Defence Officer", "Police Officer", "Fire & Rescue Officer", "Revenue Officer", "Panchayat Development Officer", "Government Administrative Officer", "Disaster Management Officer"],
            group: "Any Higher Secondary Group",
            exams: ["NDA (after Class XII)", "CDS (after graduation)", "UPSC Civil Services Examination (after graduation)", "State Public Service Commission Examinations (after graduation)"],
            degrees: ["Any Bachelor's Degree (eligible for most Civil Services)", "B.A. Public Administration", "B.A. Political Science", "B.A. History", "B.Com./B.Sc./B.Tech. (all are eligible)"],
            parentGuidance: "Encourage discipline, leadership, honesty, and a sense of responsibility. Motivate your child to participate in community service, leadership activities, and discussions on national and social issues."
        },
        "education": {
            description: "Based on your responses, you may enjoy helping others learn, grow, and achieve their potential. You may find satisfaction in guiding, teaching, and supporting people.",
            subDescription: "This sector handles active teaching frameworks, standard institutional curriculum architecture, and corporate psychological coaching models.",
            careers: ["School Teacher", "College Professor", "Special Educator", "School Counsellor", "Educational Psychologist", "Curriculum Developer", "Corporate Trainer", "Instructional Designer", "Child Development Specialist", "Education Administrator"],
            group: "Any Higher Secondary Group",
            exams: ["NCET", "NCERT - CEE", "CUET", "Institution-specific Entrance Examinations"],
            degrees: ["B.A.B.Ed.", "B.Sc.B.Ed.", "B.El.Ed.", "B.A. Psychology"],
            parentGuidance: "Encourage your child to help others, communicate confidently, and enjoy learning. Appreciate patience, empathy, and leadership qualities that will help them grow in this field."
        },
        "humanities": {
            description: "Based on your responses, you may enjoy understanding people, society, culture, languages, and history. You may like exploring ideas and thinking about the world from different perspectives.",
            subDescription: "This features deep social research streams, archaeological exploration paradigms, and active community social assistance operations.",
            careers: ["Historian", "Archaeologist", "Sociologist", "Political Scientist", "Anthropologist", "Psychologist", "Writer", "Editor", "Social Researcher", "Social Worker"],
            group: "Humanities or Commerce or Any Higher Secondary Group",
            exams: ["CUET", "Institution-specific Entrance Examinations"],
            degrees: ["B.A.", "B.A. History", "B.A. Sociology", "B.A. Political Science", "B.A. Psychology", "B. Social Work"],
            parentGuidance: "Encourage reading, writing, discussions, and curiosity about society, culture, and history. Support participation in literary, cultural, and social activities."
        },
        "media": {
            description: "Based on your responses, you may enjoy expressing ideas, telling stories, and connecting with people. You may be creative and confident in sharing information through different forms of communication.",
            subDescription: "This covers digital layout communication platforms, multi-channel editorial coordination operations, and public broadcast operations.",
            careers: ["Journalist", "News Anchor", "Content Creator", "Public Relations Officer", "Film Director", "Script Writer", "Video Producer", "Advertising Executive", "Social Media Manager", "Corporate Communications Specialist"],
            group: "Any Higher Secondary Group",
            exams: ["CUET", "IIMC Entrance Examination (when applicable)", "Institution-specific Entrance Examinations"],
            degrees: ["B.A. Journalism", "B.A. Mass Communication", "B.A. Visual Communication", "Bachelor of Multimedia", "Bachelor of Film Studies"],
            parentGuidance: "Encourage your child to develop communication, creativity, and presentation skills. Support opportunities in writing, public speaking, photography, theatre, filmmaking, and digital media."
        },
        "hospitality": {
            description: "Based on your responses, you may enjoy working with people, creating memorable experiences, and working in dynamic environments. You may also enjoy teamwork, communication, and service.",
            subDescription: "This space features highly globalized tourist support operations, culinary operational centers, and commercial athletics administration layouts.",
            careers: ["Hotel Manager", "Chef", "Tourism Manager", "Travel Consultant", "Event Manager", "Sports Manager", "Fitness Trainer", "Sports Coach", "Airline Cabin Crew", "Resort Manager"],
            group: "Any Higher Secondary Group",
            exams: ["NCHM JEE", "CUET", "IGNTU-ICI Joint Entrance Examination", "IITTM Admission Test (IIAT)", "Institution-specific Entrance Examinations"],
            degrees: ["B.Sc. Hospitality & Hotel Administration", "Bachelor of Hotel Management (BHM)", "BBA Tourism & Travel Management", "BBA in Culinary Arts", "Bachelor of Physical Education (B.P.Ed.)", "Bachelor of Sports Management"],
            parentGuidance: "Encourage your child to build communication, teamwork, leadership, and customer service skills. Participation in sports, cultural programmes, volunteering, and event management activities can help them gain valuable experience."
        }
    };

    const domainImageIndexMap = {
        linguistic: 1, logical: 2, spatial: 3, bodily: 4,
        musical: 5, interpersonal: 6, intrapersonal: 7, naturalistic: 8
    };
    const primaryImgNumber = domainImageIndexMap[primaryDomainId] || 1;

    // Helper functions to calculate radar chart points inside an inline vector space layout framework
    const labels = ["Linguistic", "Logical", "Spatial", "Bodily", "Musical", "Interpersonal", "Intrapersonal", "Naturalistic"];
    const keys = ["linguistic", "logical", "spatial", "bodily", "musical", "interpersonal", "intrapersonal", "naturalistic"];
    const center = 150;
    const radius = 100;
    const angles = keys.map((_, idx) => (idx * 2 * Math.PI) / 8 - Math.PI / 2);

    let gridCircles = "";
    for (let r = 20; r <= 100; r += 20) {
        gridCircles += `<circle cx="${center}" cy="${center}" r="${r}" fill="none" stroke="#e2e8f0" stroke-width="1" />`;
    }

    let webLines = "";
    angles.forEach(angle => {
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        webLines += `<line x1="${center}" y1="${center}" x2="${x}" y2="${y}" stroke="#cbd5e1" stroke-width="1" />`;
    });

    const pointCoordinates = keys.map((key, idx) => {
        const scorePct = intelligenceScores.percentage[key] || 0;
        const currentRadius = (scorePct / 100) * radius;
        const x = center + currentRadius * Math.cos(angles[idx]);
        const y = center + currentRadius * Math.sin(angles[idx]);
        return `${x},${y}`;
    }).join(" ");

    let textLabels = "";
    labels.forEach((label, idx) => {
        const offsetRadius = radius + 22;
        const x = center + offsetRadius * Math.cos(angles[idx]);
        const y = center + offsetRadius * Math.sin(angles[idx]);
        let textAnchor = "middle";
        if (Math.cos(angles[idx]) > 0.1) textAnchor = "start";
        else if (Math.cos(angles[idx]) < -0.1) textAnchor = "end";
        textLabels += `<text x="${x}" y="${y + 4}" text-anchor="${textAnchor}" fill="#475569" font-size="11" font-weight="700">${label}</text>`;
    });

    let html = `
        <div class="report-section" style="padding: 24px; margin-bottom: 24px;">
            <h2 style="color:var(--primary-dark); margin-bottom: 18px; font-size:22px; font-weight:800;">Student Profile</h2>
            <div class="profile-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 14px;">
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

        <div class="report-section" style="padding: 24px; margin-bottom: 24px;">
            <h2 style="color:var(--primary-dark); margin-bottom: 14px; font-size:22px; font-weight:800;">About This Report</h2>
            <p style="font-size: 14.5px; color: #475569; line-height: 1.6; margin-bottom: 10px;">This report is based on your responses to the Career Exploration Assessment. It helps you understand your strengths, how you learn best, and the career fields that may suit your abilities and interests.</p>
            <p style="font-size: 14.5px; color: #475569; line-height: 1.6; margin-bottom: 10px;">This report is based on Howard Gardner's Multiple Intelligences Framework, which recognises that every student has unique strengths and talents. It highlights your strongest areas and suggests career clusters that best align with your overall profile.</p>
            <p style="font-size: 14.5px; color: #475569; line-height: 1.6;">This report is intended to guide and support you in exploring educational and career opportunities.</p>
        </div>

        <div class="report-section" style="padding: 24px; margin-bottom: 24px;">
            <h2 style="color:var(--primary-dark); margin-bottom: 14px; font-size:22px; font-weight:800;">How to Use This Report</h2>
            <ul class="report-list-bullets" style="list-style-type: square; padding-left: 20px;">
                <li>Use this report as a guide to understand yourself better and explore different career possibilities.</li>
                <li>Reflect on your strengths and learning preferences.</li>
                <li>Explore the recommended career clusters and educational pathways.</li>
                <li>Discuss your report with your parents, teachers, or career counsellor.</li>
                <li>Take part in activities and learning opportunities that help you build your interests and skills.</li>
            </ul>
            <div class="summary-box" style="margin-top:15px; background:#f0fdf4; border-left:5px solid #16a34a; color:#14532d;">
                <strong>Remember:</strong> Your interests, effort, learning experiences, and opportunities will continue to shape your future. This report is a guide to help you make informed choices and confidently explore the possibilities ahead.
            </div>
        </div>

        <div class="report-section">
            <h2>Intelligence Profile Summary</h2>
            <div style="display: flex; flex-direction: row; flex-wrap: wrap; align-items: center; justify-content: center; gap: 40px; margin-top: 15px;">
                <div class="intelligence-list" style="flex: 1; min-width: 300px;">
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
                <div style="flex: 0 0 320px; display: flex; align-items: center; justify-content: center; background: #f8fafc; padding: 15px; border-radius: 16px; border: 1px solid #e2e8f0;">
                    <svg width="320" height="300" viewBox="0 0 320 300">
                        ${gridCircles}
                        ${webLines}
                        <polygon points="${pointCoordinates}" fill="rgba(37, 99, 235, 0.25)" stroke="#2563eb" stroke-width="2.5" />
                        ${textLabels}
                    </svg>
                </div>
            </div>
        </div>

        <div class="report-section">
            <h2>Learning Style Summary</h2>
            <div style="display: flex; flex-direction: row; justify-content: space-between; align-items: stretch; gap: 24px;">
                <div style="flex: 1; display: flex; flex-direction: column; gap: 16px;">
                    <div class="summary-box" style="margin: 0; background:#eff6ff; border-left:5px solid #2563eb; padding:16px; border-radius:12px; font-size:14.5px; color:#1e40af; font-weight:500;">
                        Based upon your top psychometric results, you absorb complex information best using mechanisms related to <strong>${domains.find(x => x.id === primaryDomainId).englishName}</strong>.
                    </div>
                    <div>
                        <div class="report-subsection-title" style="margin-top:0; font-weight:700; color:var(--primary-dark); margin-bottom: 8px;">How you learn best:</div>
                        <div style="background:#ffffff; padding:16px; border-radius:12px; border:1px solid #e2e8f0; font-size:14.5px; color:#334155; line-height:1.6; border-left: 4px solid #cbd5e1;">
                            ${getLearningStyleNotes(primaryDomainId)}
                        </div>
                    </div>
                </div>
                <div style="flex: 0 0 260px; display: flex; align-items: center; justify-content: center;">
                    <img src="/images/Int${primaryImgNumber}.jpg" alt="Learning Style Graphic" style="width: 100%; height: 100%; min-height: 200px; object-fit: cover; border-radius: 16px; border: 2px solid #cbd5e1; box-shadow: 0 4px 12px rgba(0,0,0,0.06);" onerror="this.src='/images/default.jpg'">
                </div>
            </div>
        </div>

        <div class="report-section">
            <h2>Top 3 Core Areas and Strengths</h2>
            <div class="strength-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 20px;">
    `;

    reportData.topStrengths.forEach((strength, index) => {
        const d = domains.find(x => x.id === strength.id);
        const englishStrengthName = d ? d.englishName : strength.name;
        const assocData = getCustomAssociationText(strength.id, strength.score);
        
        html += `
            <div class="strength-card" style="display: flex; flex-direction: column; justify-content: space-between; height: 100%;">
                <div>
                    <div class="strength-rank">${index + 1}</div>
                    <div class="strength-title" style="font-weight:700; font-size:16px;">${strength.icon} ${englishStrengthName}</div>
                    <div class="strength-percent" style="margin: 8px 0; font-size:24px; font-weight:800; color:var(--primary);">${strength.score}%</div>
                    <div style="font-size:11px; margin-bottom:10px; color:#1e40af; font-weight:700; text-transform: uppercase; letter-spacing:0.5px;">${assocData.association}</div>
                </div>
                <p style="font-size:13px; color:#475569; line-height:1.5; text-align:left; background:#f8fafc; padding:10px; border-radius:8px; border:1px solid #e2e8f0;">${assocData.text}</p>
            </div>
        `;
    });

    html += `
            </div>
            <p style="font-size:12.5px; color:var(--muted); font-style:italic; margin-top:20px; text-align:center;">
                <strong>End note:</strong> Everyone has strengths in all eight areas. This report highlights the areas where your strengths are most evident based on your responses. These strengths can continue to grow with learning and experience.
            </p>
        </div>

        <div class="report-section">
            <h2>Top 3 Recommended Career Clusters</h2>
            <div class="career-grid">
    `;

    reportData.recommendedStreams.forEach((stream, index) => {
        const metaProfile = extendedCareerMaster[stream.id] || {
            description: "Based on your responses, you show strengths that are well suited to this career field.",
            subDescription: stream.description,
            careers: stream.careers,
            group: getSecondaryChoice(stream),
            exams: stream.entranceExams,
            degrees: stream.degreePrograms,
            parentGuidance: "Encourage independent exploration inside the student's highest-scoring talent areas."
        };

        html += `
            <div class="career-card" style="margin-bottom: 20px;">
                <div class="career-title">
                    <h3>${index + 1}. ${stream.icon} ${stream.name}</h3>
                    <span class="match-score">Score: ${stream.matchScore}%</span>
                </div>
                
                <div class="career-description" style="margin-bottom: 12px;">
                    <p style="font-weight: 600; color: #1e293b; margin-bottom: 4px;">${metaProfile.description}</p>
                    <p style="color: #475569; font-size:14px;">${metaProfile.subDescription}</p>
                </div>
                
                <div class="pathway-layout">
                    <div class="pathway-left">
                        <strong>Career Opportunities</strong>
                        <ul style="display: grid; grid-template-columns: 1fr 1fr; gap: 4px; padding-left: 15px;">
                            ${metaProfile.careers.map(c => `<li style="font-size:13px; color:#334155;">${c}</li>`).join("")}
                        </ul>
                    </div>
                    <div class="pathway-right" style="font-size:13px;">
                        <h4>Educational Pathway</h4>
                        <ul style="list-style:none; padding:0;">
                            <li style="padding:4px 0;"><strong>Recommended Higher Secondary Group(s):</strong> ${metaProfile.group}</li>
                            <li style="padding:4px 0;"><strong>Entrance Examinations:</strong> ${Array.isArray(metaProfile.exams) ? metaProfile.exams.join(", ") : metaProfile.exams}</li>
                            <li style="padding:4px 0;"><strong>Degree Programmes:</strong> ${Array.isArray(metaProfile.degrees) ? metaProfile.degrees.join(", ") : metaProfile.degrees}</li>
                        </ul>
                    </div>
                </div>

                <div style="margin-top:15px; padding:12px 16px; background:#fffdf5; border-left:4px solid #eab308; border-radius:8px; font-size:13px; color:#713f12;">
                    <strong>Guidance for Parents:</strong> ${metaProfile.parentGuidance}
                </div>
            </div>
        `;
    });

    html += `
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
    if(adminSection) adminSection.style.display = "none";
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

    const workbook = `xml version="1.0"
?mso-application progid="Excel.Sheet"
Workbook xmlns="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:o="urn:schemas-microsoft-com:office:office"
 xmlns:x="urn:schemas-microsoft-com:office:excel"
 xmlns:ss="urn:schemas-microsoft-com:office:spreadsheet"
 xmlns:html="http://www.w3.org/TR/REC-html40"
    \${buildExcelWorksheet("Student Records", studentRows)}
    \${buildExcelWorksheet("Top Recommendations", recommendationRows)}
    \${buildExcelWorksheet("District Split", districtRows)}
    \${buildExcelWorksheet("Domain Scores", domainRows)}
    \${buildExcelWorksheet("Question Responses", responseRows)}
/Workbook`;

    const blob = new Blob([workbook], { type: "application/vnd.ms-excel;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `Career_Assessment_Admin_Data_\${new Date().toISOString().slice(0, 10)}.xls`;
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
        const max = record.scoresBreakdown.max[domain] || 40; 
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
    
    // Clean and generate file name using student's name value parameters
    const safeStudentName = studentInfo.name ? studentInfo.name.trim().replace(/[^a-zA-Z0-9]/g, '_') : 'Student';
    const formattedFilename = `${safeStudentName}_Report.pdf`;
    
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

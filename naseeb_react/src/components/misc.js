import React from "react";

export const getMultiples = (f, t) => 
   [...(Array(Math.floor(t / f)))]
   .map((_, i) => f * (i + 1));

export const countryList = [
	"Afghanistan",
	"Albania",
	"Algeria",
	"American Samoa",
	"Andorra",
	"Angola",
	"Anguilla",
	"Antarctica",
	"Antigua and Barbuda",
	"Argentina",
	"Armenia",
	"Aruba",
	"Australia",
	"Austria",
	"Azerbaijan",
	"Bahamas (the)",
	"Bahrain",
	"Bangladesh",
	"Barbados",
	"Belarus",
	"Belgium",
	"Belize",
	"Benin",
	"Bermuda",
	"Bhutan",
	"Bolivia (Plurinational State of)",
	"Bonaire, Sint Eustatius and Saba",
	"Bosnia and Herzegovina",
	"Botswana",
	"Bouvet Island",
	"Brazil",
	"British Indian Ocean Territory (the)",
	"Brunei Darussalam",
	"Bulgaria",
	"Burkina Faso",
	"Burundi",
	"Cabo Verde",
	"Cambodia",
	"Cameroon",
	"Canada",
	"Cayman Islands (the)",
	"Central African Republic (the)",
	"Chad",
	"Chile",
	"China",
	"Christmas Island",
	"Cocos (Keeling) Islands (the)",
	"Colombia",
	"Comoros (the)",
	"Congo (the Democratic Republic of the)",
	"Congo (the)",
	"Cook Islands (the)",
	"Costa Rica",
	"Croatia",
	"Cuba",
	"Curaçao",
	"Cyprus",
	"Czechia",
	"Côte d'Ivoire",
	"Denmark",
	"Djibouti",
	"Dominica",
	"Dominican Republic (the)",
	"Ecuador",
	"Egypt",
	"El Salvador",
	"Equatorial Guinea",
	"Eritrea",
	"Estonia",
	"Eswatini",
	"Ethiopia",
	"Falkland Islands (the) [Malvinas]",
	"Faroe Islands (the)",
	"Fiji",
	"Finland",
	"France",
	"French Guiana",
	"French Polynesia",
	"French Southern Territories (the)",
	"Gabon",
	"Gambia (the)",
	"Georgia",
	"Germany",
	"Ghana",
	"Gibraltar",
	"Greece",
	"Greenland",
	"Grenada",
	"Guadeloupe",
	"Guam",
	"Guatemala",
	"Guernsey",
	"Guinea",
	"Guinea-Bissau",
	"Guyana",
	"Haiti",
	"Heard Island and McDonald Islands",
	"Holy See (the)",
	"Honduras",
	"Hong Kong",
	"Hungary",
	"Iceland",
	"India",
	"Indonesia",
	"Iran (Islamic Republic of)",
	"Iraq",
	"Ireland",
	"Isle of Man",
	"Israel",
	"Italy",
	"Jamaica",
	"Japan",
	"Jersey",
	"Jordan",
	"Kazakhstan",
	"Kenya",
	"Kiribati",
	"Korea (the Democratic People's Republic of)",
	"Korea (the Republic of)",
	"Kuwait",
	"Kyrgyzstan",
	"Lao People's Democratic Republic (the)",
	"Latvia",
	"Lebanon",
	"Lesotho",
	"Liberia",
	"Libya",
	"Liechtenstein",
	"Lithuania",
	"Luxembourg",
	"Macao",
	"Madagascar",
	"Malawi",
	"Malaysia",
	"Maldives",
	"Mali",
	"Malta",
	"Marshall Islands (the)",
	"Martinique",
	"Mauritania",
	"Mauritius",
	"Mayotte",
	"Mexico",
	"Micronesia (Federated States of)",
	"Moldova (the Republic of)",
	"Monaco",
	"Mongolia",
	"Montenegro",
	"Montserrat",
	"Morocco",
	"Mozambique",
	"Myanmar",
	"Namibia",
	"Nauru",
	"Nepal",
	"Netherlands (the)",
	"New Caledonia",
	"New Zealand",
	"Nicaragua",
	"Niger (the)",
	"Nigeria",
	"Niue",
	"Norfolk Island",
	"Northern Mariana Islands (the)",
	"Norway",
	"Oman",
	"Pakistan",
	"Palau",
	"Palestine, State of",
	"Panama",
	"Papua New Guinea",
	"Paraguay",
	"Peru",
	"Philippines (the)",
	"Pitcairn",
	"Poland",
	"Portugal",
	"Puerto Rico",
	"Qatar",
	"Republic of North Macedonia",
	"Romania",
	"Russian Federation (the)",
	"Rwanda",
	"Réunion",
	"Saint Barthélemy",
	"Saint Helena, Ascension and Tristan da Cunha",
	"Saint Kitts and Nevis",
	"Saint Lucia",
	"Saint Martin (French part)",
	"Saint Pierre and Miquelon",
	"Saint Vincent and the Grenadines",
	"Samoa",
	"San Marino",
	"Sao Tome and Principe",
	"Saudi Arabia",
	"Senegal",
	"Serbia",
	"Seychelles",
	"Sierra Leone",
	"Singapore",
	"Sint Maarten (Dutch part)",
	"Slovakia",
	"Slovenia",
	"Solomon Islands",
	"Somalia",
	"South Africa",
	"South Georgia and the South Sandwich Islands",
	"South Sudan",
	"Spain",
	"Sri Lanka",
	"Sudan (the)",
	"Suriname",
	"Svalbard and Jan Mayen",
	"Sweden",
	"Switzerland",
	"Syrian Arab Republic",
	"Taiwan",
	"Tajikistan",
	"Tanzania, United Republic of",
	"Thailand",
	"Timor-Leste",
	"Togo",
	"Tokelau",
	"Tonga",
	"Trinidad and Tobago",
	"Tunisia",
	"Turkey",
	"Turkmenistan",
	"Turks and Caicos Islands (the)",
	"Tuvalu",
	"Uganda",
	"Ukraine",
	"United Arab Emirates (the)",
	"United Kingdom of Great Britain and Northern Ireland (the)",
	"United States Minor Outlying Islands (the)",
	"United States of America (the)",
	"Uruguay",
	"Uzbekistan",
	"Vanuatu",
	"Venezuela (Bolivarian Republic of)",
	"Viet Nam",
	"Virgin Islands (British)",
	"Virgin Islands (U.S.)",
	"Wallis and Futuna",
	"Western Sahara",
	"Yemen",
	"Zambia",
	"Zimbabwe",
	"Åland Islands"
];

const zodiacsigns = ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpius", "Sagittarius", "Capricornus", "Aquarius", "Pisces"]

const packages = [
    "Bronze", 
    "Silver", 
    "Gold",
    "Platinum",
    "Diamond"
]

const religions = [
    "Christian",
    "Muslim",
    "Buddhist", 
    "Hindu",
    "Traditional Africa",
    "Atheist",
    "Other"
]

const womanreligions = ["Christian", "Muslim", "Traditional African Religion", "Atheist", "Other"]

const womanethnicities = [
    "African",
    "European", 
    "Asian",
    "Oriental", 
    "Mixed Race",
    "Other"
]

export const femalequestions = [
    {section: "Basic Information", question: "Gender", type:"choice", fieldid:'gender1', answers:["Male", "Female"], pick:1},
    {section: "Basic Information", question: "Package", type:"choice", fieldid:'package1', answers:packages, pick:1},
    {section: "Basic Information", question: "First Name", type:"text", fieldid:'firstname1', answers:[]},
    {section: "Basic Information", question: "Middle Name", type:"text", fieldid:'middlename1', answers:[]},
    {section: "Basic Information", question: "Last Name", type:"text", fieldid:'lastname1', answers:[]},
    {section: "Basic Information", question: "Age", type:"text", fieldid:'age1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Zodiac Sign", type:"choice", fieldid:'zodiacsign1', answers:zodiacsigns},
    {section: "Basic Information", question: "Height (Feet)", type:"age", fieldid:'heightinfeet1', answers:[], min:1, max:10},
    {section: "Basic Information", question: "Height (Inches)", type:"age", fieldid:'heightininches1', answers:[], min:1, max:11},
    {section: "Basic Information", question: "Weight (Kilograms)", type:"age", fieldid:'weight1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Phone Number Country Code", type:"text", fieldid:'phonenumbercountrycode1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Phone Number", type:"text", fieldid:'phonenumber1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Email", type:"text", fieldid:'EMAIL', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Password", type:"pass", fieldid:'password', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    // {section: "Basic Information", question: "Confirm Password", type:"pass", fieldid:'confirmpassword', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Country Of Residence", type:"text", fieldid:'country1', answers:[]},
    {section: "Basic Information", question: "Current City", type:"text", fieldid:'city1', answers:[]},
    {section: "Basic Information", question: "Relationship Status", type:"choice", fieldid:'relationshipstatus1', answers:["Single", "Divorced", "Married"]},
    {section: "Basic Information", question: "Ethnic Background", type:"choice", fieldid:'ethnicity1', answers:womanethnicities},
    {section: "Basic Information", question: "Religion", type:"choice", fieldid:'religion1', answers:womanreligions},
    {section: "General Preferences", question: "Minimum age", type:"age", fieldid:'minage1', answers:getMultiples(1,100)},
    {section: "General Preferences", question: "Maximum age", type:"age", fieldid:'maxage1', answers:getMultiples(1,100)},
    {section: "General Preferences", question: "Country of Origin for spouse (Pick up to 4)", type:"choice", pick:4, fieldid:'significantothercountryoforigin1', answers:countryList},
    {section: "General Preferences", question: "Religion of spouse (Pick up to 3)", type:"choice", fieldid:'significantotherreligion1', pick:3, answers:religions},
    {section: "Education and Career", question: "Current Occupation", type:"text", fieldid:'currentoccupation1', answers:["Continuing Scholar", "Employed (Full-time)", "Employed (Part-time)", "Self-employed", "Unemployed", "Homemaker", "Retired", "Other"]},
    {section: "Education and Career", question: "Would you consider relocating for marriage?", type:"choice", fieldid:'relocateformarriage1', answers:["Yes", "No", "Maybe"]},
    {section: "Financial Background", question: "What is your current income level?", type:"choice", fieldid:'financialbackground1', answers:["No income", "Below average income", "Average income", "Above average income", "Prefer not to say"]},
    {
        section: "Financial Background",
        question: "Do you have any financial obligations? (e.g., loans, supporting family, etc.)",
        type: "choice",
        fieldid: "financialobligations1",
        answers: ["Yes", "No", "Prefer not to say"]
    },
    {
        section: "Financial Background",
        question: "Are you looking for financial support from a potential spouse?",
        type: "choice",
        fieldid: "financialsupport1",
        answers: ["Yes", "No", "Maybe"]
    },
    {
        section: "Financial Background",
        question: "How do you manage your finances?",
        type: "choice",
        fieldid: "financialmanagement1",
        answers: ["I budget regularly", "I have some savings but don't budget", "I live paycheck to paycheck", "I have no specific financial management plan", "Other"]
    },
    {
        section: "Family Background",
        question: "Do you have children?",
        type: "choice",
        fieldid: "children1",
        answers: ["Yes", "No"]
    },
    {
        section: "Family Background",
        question: "If yes, how many?",
        type: "choice",
        fieldid: "howmanychildren2",
        answers: ["1", "2", "3", "4+", "Prefer not to say"]
    },
    {
        section: "Family Background",
        question: "Are you open to having more children?",
        type: "choice",
        fieldid: "morechildren3",
        answers: ["Yes", "No", "Maybe"]
    },
    {
        section: "Family Background",
        question: "Marital Status:",
        type: "choice",
        fieldid: "familybackground4",
        answers: ["Never Married", "Divorced", "Widowed"]
    },
    {
        section: "Lifestyle and Interests",
        question: "How would you describe your lifestyle?",
        type: "choice",
        fieldid: "describelifestyle1",
        answers: ["Very Active (Exercise regularly, outdoor activities)", "Moderately Active (Occasional exercise, enjoys walks)", "Sedentary (Prefers indoor activities, less physically active)"]
    },
    {
        section: "Lifestyle and Interests",
        question: "Hobbies/Interests: (Select all that apply)",
        type: "choice",
        pick:10,
        fieldid: "hobbiesplusinterests2",
        answers: ["Cooking", "Traveling", "Reading", "Music", "Dancing", "Sports", "Arts & Crafts", "Other"]
    },
    {
        section: "Lifestyle and Interests",
        question: "Do you smoke?",
        type: "choice",
        fieldid: "doyousmoke3",
        answers: ["Yes", "No", "Occasionally"]
    },
    {
        section: "Lifestyle and Interests",
        question: "Do you drink alcohol?",
        type: "choice",
        fieldid: "doyousmoke3",
        answers: ["Yes", "No", "Occasionally"]
    },
    {
        section: "Mental Health and Therapy",
        question: "Have you ever sought therapy or counseling?",
        type: "choice",
        fieldid: "mentalhealthandtherapy1",
        answers: ["Yes", "No", "Prefer not to say"]
    },
    {
        section: "Mental Health and Therapy",
        question: "How would you describe your current mental health?",
        type: "choice",
        fieldid: "mentalhealth2",
        answers: ["Excellent", "Good", "Fair", "Poor", "Prefer not to say"]
    },
    {
        section: "Mental Health and Therapy",
        question: "Are you open to seeking therapy or counseling if needed?",
        type: "choice",
        fieldid: "mentalhealthandtherapyopenness3",
        answers: ["Yes", "No", "Maybe"]
    },
    {
        section: "Mental Health and Therapy",
        question: "How important is mental health awareness to you?",
        type: "choice",
        fieldid: "mentalhealthawarnessimportance4",
        answers: ["Very important", "Somewhat important", "Not important", "I haven’t thought about it"]
    },
    {
        section: "Personal and Relationship Goals",
        question: "What are your personal goals for the next 5 years? (Select all that apply)",
        type: "choice",
        fieldid: "personalrelationshipgoals5years1",
        pick:10,
        answers: ["Advancing in my career", "Starting a business", "Traveling", "Furthering my education", "Starting or expanding my family", "Improving my health and wellness", "Other"]
    },  
    {
        section: "Personal and Relationship Goals",
        question: "What are your goals in a marriage? (Select all that apply)",
        type: "choice",
        fieldid: "personalmarriagegoals2",
        pick:10,
        answers: ["Building a family", "Emotional connection", "Financial stability", "Shared life experiences", "Supporting each other's growth", "Living a traditional lifestyle", "Partnering in business or financial endeavors", "Other"]
    },
    {
        section: "Personal and Relationship Goals",
        question: "How important is it for your partner to support your personal goals?",
        type: "choice",
        fieldid: "partnerpersonalgoals3",
        answers: ["Very important", "Somewhat important", "Not important", "I prefer to pursue my goals independently"]
    },
    {
        section: "Relationship Preferences",
        question: "What are you looking for in a potential spouse? (Select all that apply)",
        type: "choice",
        fieldid: "relationshippreferences1",
        pick:5,
        answers: ["Love and companionship", "Financial stability", "Shared religious beliefs", "A family-oriented partner", "Physical attraction", "Intellectual connection", "Shared cultural values", "Emotional support", "Other"]
    },
    {
    section: "Relationship Preferences",
    question: "What level of education do you prefer in a potential spouse?",
    type: "choice",
    fieldid: "relationshippreferenceseducation3",
    answers: ["High School", "Vocational Training", "Bachelor’s Degree", "Master’s Degree", "Doctorate", "Irrelevant"]
    },
    {
    section: "Relationship Preferences",
    question: "What qualities are most important to you in a partner? (Select up to 3)",
    type: "choice",
    fieldid: "relationshippreferencesqualities5",
    pick:3,
    answers: ["Honesty", "Loyalty", "Ambition", "Sense of Humor", "Kindness", "Physical appearance", "Communication skills", "Shared interests", "Other"]
    },
    {
    section: "Personality and Character",
    question: "How would you like your partner to approach conflict?",
    type: "choice",
    fieldid: "personalityandcharacterconflict6",
    answers: ["Calmly discuss and resolve issues together", "Give space and come back to the issue later", "Prefer not to address conflicts directly", "Other"]
    },
    {
    section: "Personality and Character",
    question: "What type of sense of humor do you prefer in a partner?",
    type: "choice",
    fieldid: "personalityandcharactercharacter7",
    answers: ["Light-hearted and playful", "Sarcastic and witty", "Dry and subtle", "Doesn’t matter, as long as they can make me laugh", "Other"]
    },
    {
    section: "Personality and Character",
    question: "How important is emotional intelligence in your partner?",
    type: "choice",
    fieldid: "personalityandcharacterempathy8",
    answers: ["Very important", "Somewhat important", "Not very important", "I haven’t thought about it"]
    },
    {
    section: "Personality and Character",
    question: "How important is physical appearance to you in a partner?",
    type: "choice",
    fieldid: "personalityandcharacterappearance9",
    answers: ["Very important", "Somewhat important", "Not important", "I focus more on personality"]
    },
    {
    section: "Personality and Character",
    question: "What is your partner's ideal temperament?",
    type: "choice",
    fieldid: "personalityandcharactertemperament10",
    answers: ["Calm and patient", "Energetic and outgoing", "Reserved and introspective", "Adventurous and spontaneous", "Other"]
    },
    {
    section: "Lifestyle and Interests",
    question: "How active do you want your partner to be?",
    type: "choice",
    fieldid: "lifestyleandinterestsactivity11",
    answers: ["Very Active (Enjoys regular exercise and outdoor activities)", "Moderately Active (Occasional exercise, enjoys walks)", "Sedentary (Prefers indoor activities, less physically active)", "No preference"]
    },
    {
    section: "Lifestyle and Interests",
    question: "What kind of hobbies or interests would you like your partner to have? (Select all that apply)",
    type: "choice",
    fieldid: "lifestyleandinterestshobbies12",
    pick: 7,
    answers: ["Cooking", "Traveling", "Reading", "Music", "Dancing", "Sports", "Arts & Crafts", "Technology and Gadgets", "Politics", "Environmental issues", "Social causes", "Other"]
    },
    {
    section: "Lifestyle and Interests",
    question: "How do you feel about your partner’s smoking habits?",
    type: "choice",
    fieldid: "lifestyleandinterestssmking13",
    answers: ["Must be a non-smoker", "Occasional smoking is okay", "Regular smoking is acceptable", "No preference"]
    },
    {
    section: "Lifestyle and Interests",
    question: "How do you feel about your partner’s drinking habits?",
    type: "choice",
    fieldid: "lifestyleandinterestsalcohol14",
    answers: ["Must not drink alcohol", "Social drinking is okay", "Regular drinking is acceptable", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "What is your preferred income level for your partner?",
    type: "choice",
    fieldid: "financialandcareerexpectationsincomelevel1",
    answers: ["Must have a high income", "Comfortable, above-average income", "Average income is fine", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "How important is your partner’s financial stability to you?",
    type: "choice",
    fieldid: "financialandcareerexpectationsstability2",
    answers: ["Very important", "Somewhat important", "Not important", "I can provide financial stability"]
    },
    {
    section: "Financial and Career Expectations",
    question: "Would you prefer your partner to be the main breadwinner?",
    type: "choice",
    fieldid: "financialandcareerexpectationsbreadwinner3",
    answers: ["Yes, I prefer a traditional arrangement", "No, I prefer equal contribution", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "How do you feel about your partner’s career ambition?",
    type: "choice",
    fieldid: "financialandcareerexpectationsambition4",
    answers: ["Must be very ambitious and career-driven", "Moderately ambitious, work-life balance is important", "Not very important, as long as they have a stable job", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "Would you support your partner if they decided to change careers?",
    type: "choice",
    fieldid: "financialandcareerexpectationscareerchange5",
    answers: ["Yes, as long as it makes them happy", "Yes, but only if it’s financially viable", "No, I prefer stability in a career", "No preference"]
    },
    // Section: Family and Future Plans
    {
        section: "Family and Future Plans",
        question: "Is it important for your partner to want children?",
        type: "choice",
        fieldid: "familyandfutureplanswantchildren1",
        answers: ["Yes", "No", "Maybe", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How important is your partner’s relationship with their family?",
        type: "choice",
        fieldid: "familyandfutureplansfamilyrelationship2",
        answers: ["Very important, family comes first", "Somewhat important, but boundaries are key", "Not very important", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "Would you like your partner to share childcare responsibilities equally?",
        type: "choice",
        fieldid: "familyandfutureplanschildcare3",
        answers: ["Yes", "No, I prefer to take on most childcare responsibilities", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How do you feel about your partner’s role in household duties?",
        type: "choice",
        fieldid: "familyandfutureplanshouseholdduties4",
        answers: ["Should be shared equally", "Should be based on who has more time", "I prefer to handle most of the household duties", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How important is it for your partner to support your personal goals?",
        type: "choice",
        fieldid: "familyandfutureplanspersonalgoals5",
        answers: ["Very important", "Somewhat important", "Not important", "I prefer to pursue my goals independently"]
    },
    {
        section: "Family and Future Plans",
        question: "Would you prefer your partner to have the same cultural background?",
        type: "choice",
        fieldid: "familyandfutureplansculturalbackground6",
        answers: ["Yes", "No", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How do you feel about your partner's openness to new experiences and cultures?",
        type: "choice",
        fieldid: "familyandfutureplansopenness7",
        answers: ["Must be very open and curious", "Somewhat open", "Prefer them to be more traditional", "No preference"]
    },
    // Section: Compatibility and Long-Term Vision
    {
        section: "Compatibility and Long-Term Vision",
        question: "What is your vision for your life together with your partner? (Select all that apply)",
        type: "choice",
        pick:10,
        fieldid: "compatibilityandlongtermvision1",
        answers: ["Building a family", "Traveling the world", "Starting a business together", "Living a quiet, simple life", "Pursuing shared hobbies and passions", "Supporting each other’s personal growth", "Other"]
    },
    {
        section: "Compatibility and Long-Term Vision",
        question: "How important is it for your partner to have similar life goals?",
        type: "choice",
        fieldid: "compatibilityandlongtermvisionsimilarlifegoals2",
        answers: ["Very important", "Somewhat important", "Not important, opposites attract", "No preference"]
    },
    {
        section: "Compatibility and Long-Term Vision",
        question: "Would you be open to discussing and compromising on different life goals with your partner?",
        type: "choice",
        fieldid: "compatibilityandlongtermvisioncompromise3",
        answers: ["Yes", "No", "Maybe"]
    },  
    // Section: Additional Information
    {
        section: "Additional Information",
        question: "What is your ideal type of wedding?",
        type: "text",
        fieldid: "additionalinformationanythingelse1",
        answers: ["Traditional", "Religious", "Civil Ceremony", "Destination Wedding", "Simple and Intimate", "Grand and Luxurious", "Other"]
    },
    {
        section: "To Future Spouse",
        question: "What would you like to say to them:",
        type: "longtext",
        fieldid: "futurespouse1",
        answers: []
    },
    {
        section: "Images",
        question: "Your first profile picture:",
        type: "image",
        fieldid: "futurespouse1",
        answers: []
    },
    {
        section: "Images",
        question: "Your second profile picture (option):",
        type: "image",
        fieldid: "futurespouse1",
        answers: []
    },
    {
        section: "Images",
        question: "Your third profile picture (option):",
        type: "image",
        fieldid: "futurespouse1",
        answers: []
    },
    {
        section: "Captcha",
        question: "Please verify your human:",
        type: "captcha",
        fieldid: "captcha1",
        answers: []
    },
]

export const femaleeditquestions = [
    {section: "Basic Information", question: "Gender", type:"choice", fieldid:'gender1', answers:["Male", "Female"], pick:1},
    {section: "Basic Information", question: "First Name", type:"text", fieldid:'firstname1', answers:[]},
    {section: "Basic Information", question: "Middle Name", type:"text", fieldid:'middlename1', answers:[]},
    {section: "Basic Information", question: "Last Name", type:"text", fieldid:'lastname1', answers:[]},
    {section: "Basic Information", question: "Age", type:"text", fieldid:'age1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Zodiac Sign", type:"choice", fieldid:'zodiacsign1', answers:zodiacsigns},
    {section: "Basic Information", question: "Height (Feet)", type:"age", fieldid:'heightinfeet1', answers:[], min:1, max:10},
    {section: "Basic Information", question: "Height (Inches)", type:"age", fieldid:'heightininches1', answers:[], min:1, max:11},
    {section: "Basic Information", question: "Weight (Kilograms)", type:"age", fieldid:'weight1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Phone Number Country Code", type:"text", fieldid:'phonenumbercountrycode1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Phone Number", type:"text", fieldid:'phonenumber1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Email", type:"text", fieldid:'EMAIL', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Country Of Residence", type:"text", fieldid:'country1', answers:[]},
    {section: "Basic Information", question: "Current City", type:"text", fieldid:'city1', answers:[]},
    {section: "Basic Information", question: "Relationship Status", type:"choice", fieldid:'relationshipstatus1', answers:["Single", "Divorced", "Married"]},
    {section: "Basic Information", question: "Ethnic Background", type:"choice", fieldid:'ethnicity1', answers:womanethnicities},
    {section: "Basic Information", question: "Religion", type:"choice", fieldid:'religion1', answers:womanreligions},
    {section: "General Preferences", question: "Minimum age", type:"age", fieldid:'minage1', answers:getMultiples(1,100)},
    {section: "General Preferences", question: "Maximum age", type:"age", fieldid:'maxage1', answers:getMultiples(1,100)},
    {section: "General Preferences", question: "Country of Origin for spouse (Pick up to 4)", type:"choice", pick:4, fieldid:'significantothercountryoforigin1', answers:countryList},
    {section: "General Preferences", question: "Religion of spouse (Pick up to 3)", type:"choice", fieldid:'significantotherreligion1', pick:3, answers:religions},
    {section: "Education and Career", question: "Current Occupation", type:"text", fieldid:'currentoccupation1', answers:["Continuing Scholar", "Employed (Full-time)", "Employed (Part-time)", "Self-employed", "Unemployed", "Homemaker", "Retired", "Other"]},
    {section: "Education and Career", question: "Would you consider relocating for marriage?", type:"choice", fieldid:'relocateformarriage1', answers:["Yes", "No", "Maybe"]},
    {section: "Financial Background", question: "What is your current income level?", type:"choice", fieldid:'financialbackground1', answers:["No income", "Below average income", "Average income", "Above average income", "Prefer not to say"]},
    {
        section: "Financial Background",
        question: "Do you have any financial obligations? (e.g., loans, supporting family, etc.)",
        type: "choice",
        fieldid: "financialobligations1",
        answers: ["Yes", "No", "Prefer not to say"]
    },
    {
        section: "Financial Background",
        question: "Are you looking for financial support from a potential spouse?",
        type: "choice",
        fieldid: "financialsupport1",
        answers: ["Yes", "No", "Maybe"]
    },
    {
        section: "Financial Background",
        question: "How do you manage your finances?",
        type: "choice",
        fieldid: "financialmanagement1",
        answers: ["I budget regularly", "I have some savings but don't budget", "I live paycheck to paycheck", "I have no specific financial management plan", "Other"]
    },
    {
        section: "Family Background",
        question: "Do you have children?",
        type: "choice",
        fieldid: "children1",
        answers: ["Yes", "No"]
    },
    {
        section: "Family Background",
        question: "If yes, how many?",
        type: "choice",
        fieldid: "howmanychildren2",
        answers: ["1", "2", "3", "4+", "Prefer not to say"]
    },
    {
        section: "Family Background",
        question: "Are you open to having more children?",
        type: "choice",
        fieldid: "morechildren3",
        answers: ["Yes", "No", "Maybe"]
    },
    {
        section: "Family Background",
        question: "Marital Status:",
        type: "choice",
        fieldid: "familybackground4",
        answers: ["Never Married", "Divorced", "Widowed"]
    },
    {
        section: "Lifestyle and Interests",
        question: "How would you describe your lifestyle?",
        type: "choice",
        fieldid: "describelifestyle1",
        answers: ["Very Active (Exercise regularly, outdoor activities)", "Moderately Active (Occasional exercise, enjoys walks)", "Sedentary (Prefers indoor activities, less physically active)"]
    },
    {
        section: "Lifestyle and Interests",
        question: "Hobbies/Interests: (Select all that apply)",
        type: "choice",
        pick:10,
        fieldid: "hobbiesplusinterests2",
        answers: ["Cooking", "Traveling", "Reading", "Music", "Dancing", "Sports", "Arts & Crafts", "Other"]
    },
    {
        section: "Lifestyle and Interests",
        question: "Do you smoke?",
        type: "choice",
        fieldid: "doyousmoke3",
        answers: ["Yes", "No", "Occasionally"]
    },
    {
        section: "Lifestyle and Interests",
        question: "Do you drink alcohol?",
        type: "choice",
        fieldid: "doyousmoke3",
        answers: ["Yes", "No", "Occasionally"]
    },
    {
        section: "Mental Health and Therapy",
        question: "Have you ever sought therapy or counseling?",
        type: "choice",
        fieldid: "mentalhealthandtherapy1",
        answers: ["Yes", "No", "Prefer not to say"]
    },
    {
        section: "Mental Health and Therapy",
        question: "How would you describe your current mental health?",
        type: "choice",
        fieldid: "mentalhealth2",
        answers: ["Excellent", "Good", "Fair", "Poor", "Prefer not to say"]
    },
    {
        section: "Mental Health and Therapy",
        question: "Are you open to seeking therapy or counseling if needed?",
        type: "choice",
        fieldid: "mentalhealthandtherapyopenness3",
        answers: ["Yes", "No", "Maybe"]
    },
    {
        section: "Mental Health and Therapy",
        question: "How important is mental health awareness to you?",
        type: "choice",
        fieldid: "mentalhealthawarnessimportance4",
        answers: ["Very important", "Somewhat important", "Not important", "I haven’t thought about it"]
    },
    {
        section: "Personal and Relationship Goals",
        question: "What are your personal goals for the next 5 years? (Select all that apply)",
        type: "choice",
        fieldid: "personalrelationshipgoals5years1",
        pick:10,
        answers: ["Advancing in my career", "Starting a business", "Traveling", "Furthering my education", "Starting or expanding my family", "Improving my health and wellness", "Other"]
    },  
    {
        section: "Personal and Relationship Goals",
        question: "What are your goals in a marriage? (Select all that apply)",
        type: "choice",
        fieldid: "personalmarriagegoals2",
        pick:10,
        answers: ["Building a family", "Emotional connection", "Financial stability", "Shared life experiences", "Supporting each other's growth", "Living a traditional lifestyle", "Partnering in business or financial endeavors", "Other"]
    },
    {
        section: "Personal and Relationship Goals",
        question: "How important is it for your partner to support your personal goals?",
        type: "choice",
        fieldid: "partnerpersonalgoals3",
        answers: ["Very important", "Somewhat important", "Not important", "I prefer to pursue my goals independently"]
    },
    {
        section: "Relationship Preferences",
        question: "What are you looking for in a potential spouse? (Select all that apply)",
        type: "choice",
        fieldid: "relationshippreferences1",
        pick:5,
        answers: ["Love and companionship", "Financial stability", "Shared religious beliefs", "A family-oriented partner", "Physical attraction", "Intellectual connection", "Shared cultural values", "Emotional support", "Other"]
    },
    {
    section: "Relationship Preferences",
    question: "What level of education do you prefer in a potential spouse?",
    type: "choice",
    fieldid: "relationshippreferenceseducation3",
    answers: ["High School", "Vocational Training", "Bachelor’s Degree", "Master’s Degree", "Doctorate", "Irrelevant"]
    },
    {
    section: "Relationship Preferences",
    question: "What qualities are most important to you in a partner? (Select up to 3)",
    type: "choice",
    fieldid: "relationshippreferencesqualities5",
    pick:3,
    answers: ["Honesty", "Loyalty", "Ambition", "Sense of Humor", "Kindness", "Physical appearance", "Communication skills", "Shared interests", "Other"]
    },
    {
    section: "Personality and Character",
    question: "How would you like your partner to approach conflict?",
    type: "choice",
    fieldid: "personalityandcharacterconflict6",
    answers: ["Calmly discuss and resolve issues together", "Give space and come back to the issue later", "Prefer not to address conflicts directly", "Other"]
    },
    {
    section: "Personality and Character",
    question: "What type of sense of humor do you prefer in a partner?",
    type: "choice",
    fieldid: "personalityandcharactercharacter7",
    answers: ["Light-hearted and playful", "Sarcastic and witty", "Dry and subtle", "Doesn’t matter, as long as they can make me laugh", "Other"]
    },
    {
    section: "Personality and Character",
    question: "How important is emotional intelligence in your partner?",
    type: "choice",
    fieldid: "personalityandcharacterempathy8",
    answers: ["Very important", "Somewhat important", "Not very important", "I haven’t thought about it"]
    },
    {
    section: "Personality and Character",
    question: "How important is physical appearance to you in a partner?",
    type: "choice",
    fieldid: "personalityandcharacterappearance9",
    answers: ["Very important", "Somewhat important", "Not important", "I focus more on personality"]
    },
    {
    section: "Personality and Character",
    question: "What is your partner's ideal temperament?",
    type: "choice",
    fieldid: "personalityandcharactertemperament10",
    answers: ["Calm and patient", "Energetic and outgoing", "Reserved and introspective", "Adventurous and spontaneous", "Other"]
    },
    {
    section: "Lifestyle and Interests",
    question: "How active do you want your partner to be?",
    type: "choice",
    fieldid: "lifestyleandinterestsactivity11",
    answers: ["Very Active (Enjoys regular exercise and outdoor activities)", "Moderately Active (Occasional exercise, enjoys walks)", "Sedentary (Prefers indoor activities, less physically active)", "No preference"]
    },
    {
    section: "Lifestyle and Interests",
    question: "What kind of hobbies or interests would you like your partner to have? (Select all that apply)",
    type: "choice",
    fieldid: "lifestyleandinterestshobbies12",
    pick: 7,
    answers: ["Cooking", "Traveling", "Reading", "Music", "Dancing", "Sports", "Arts & Crafts", "Technology and Gadgets", "Politics", "Environmental issues", "Social causes", "Other"]
    },
    {
    section: "Lifestyle and Interests",
    question: "How do you feel about your partner’s smoking habits?",
    type: "choice",
    fieldid: "lifestyleandinterestssmking13",
    answers: ["Must be a non-smoker", "Occasional smoking is okay", "Regular smoking is acceptable", "No preference"]
    },
    {
    section: "Lifestyle and Interests",
    question: "How do you feel about your partner’s drinking habits?",
    type: "choice",
    fieldid: "lifestyleandinterestsalcohol14",
    answers: ["Must not drink alcohol", "Social drinking is okay", "Regular drinking is acceptable", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "What is your preferred income level for your partner?",
    type: "choice",
    fieldid: "financialandcareerexpectationsincomelevel1",
    answers: ["Must have a high income", "Comfortable, above-average income", "Average income is fine", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "How important is your partner’s financial stability to you?",
    type: "choice",
    fieldid: "financialandcareerexpectationsstability2",
    answers: ["Very important", "Somewhat important", "Not important", "I can provide financial stability"]
    },
    {
    section: "Financial and Career Expectations",
    question: "Would you prefer your partner to be the main breadwinner?",
    type: "choice",
    fieldid: "financialandcareerexpectationsbreadwinner3",
    answers: ["Yes, I prefer a traditional arrangement", "No, I prefer equal contribution", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "How do you feel about your partner’s career ambition?",
    type: "choice",
    fieldid: "financialandcareerexpectationsambition4",
    answers: ["Must be very ambitious and career-driven", "Moderately ambitious, work-life balance is important", "Not very important, as long as they have a stable job", "No preference"]
    },
    {
    section: "Financial and Career Expectations",
    question: "Would you support your partner if they decided to change careers?",
    type: "choice",
    fieldid: "financialandcareerexpectationscareerchange5",
    answers: ["Yes, as long as it makes them happy", "Yes, but only if it’s financially viable", "No, I prefer stability in a career", "No preference"]
    },
    // Section: Family and Future Plans
    {
        section: "Family and Future Plans",
        question: "Is it important for your partner to want children?",
        type: "choice",
        fieldid: "familyandfutureplanswantchildren1",
        answers: ["Yes", "No", "Maybe", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How important is your partner’s relationship with their family?",
        type: "choice",
        fieldid: "familyandfutureplansfamilyrelationship2",
        answers: ["Very important, family comes first", "Somewhat important, but boundaries are key", "Not very important", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "Would you like your partner to share childcare responsibilities equally?",
        type: "choice",
        fieldid: "familyandfutureplanschildcare3",
        answers: ["Yes", "No, I prefer to take on most childcare responsibilities", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How do you feel about your partner’s role in household duties?",
        type: "choice",
        fieldid: "familyandfutureplanshouseholdduties4",
        answers: ["Should be shared equally", "Should be based on who has more time", "I prefer to handle most of the household duties", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How important is it for your partner to support your personal goals?",
        type: "choice",
        fieldid: "familyandfutureplanspersonalgoals5",
        answers: ["Very important", "Somewhat important", "Not important", "I prefer to pursue my goals independently"]
    },
    {
        section: "Family and Future Plans",
        question: "Would you prefer your partner to have the same cultural background?",
        type: "choice",
        fieldid: "familyandfutureplansculturalbackground6",
        answers: ["Yes", "No", "No preference"]
    },
    {
        section: "Family and Future Plans",
        question: "How do you feel about your partner's openness to new experiences and cultures?",
        type: "choice",
        fieldid: "familyandfutureplansopenness7",
        answers: ["Must be very open and curious", "Somewhat open", "Prefer them to be more traditional", "No preference"]
    },
    // Section: Compatibility and Long-Term Vision
    {
        section: "Compatibility and Long-Term Vision",
        question: "What is your vision for your life together with your partner? (Select all that apply)",
        type: "choice",
        pick:10,
        fieldid: "compatibilityandlongtermvision1",
        answers: ["Building a family", "Traveling the world", "Starting a business together", "Living a quiet, simple life", "Pursuing shared hobbies and passions", "Supporting each other’s personal growth", "Other"]
    },
    {
        section: "Compatibility and Long-Term Vision",
        question: "How important is it for your partner to have similar life goals?",
        type: "choice",
        fieldid: "compatibilityandlongtermvisionsimilarlifegoals2",
        answers: ["Very important", "Somewhat important", "Not important, opposites attract", "No preference"]
    },
    {
        section: "Compatibility and Long-Term Vision",
        question: "Would you be open to discussing and compromising on different life goals with your partner?",
        type: "choice",
        fieldid: "compatibilityandlongtermvisioncompromise3",
        answers: ["Yes", "No", "Maybe"]
    },  
    // Section: Additional Information
    {
        section: "Additional Information",
        question: "What is your ideal type of wedding?",
        type: "text",
        fieldid: "additionalinformationanythingelse1",
        answers: ["Traditional", "Religious", "Civil Ceremony", "Destination Wedding", "Simple and Intimate", "Grand and Luxurious", "Other"]
    },
    {
        section: "To Future Spouse",
        question: "What would you like to say to them:",
        type: "longtext",
        fieldid: "futurespouse1",
        answers: []
    },
]

export const malequestions = [
    {section: "Basic Information", question: "Full Name", type:"text", fieldid:'fullname1', answers:[], sectionshow:true},
    {section: "Basic Information", question: "Package", type:"choice", fieldid:'package1', answers:packages, pick:1}, 
    {section: "Basic Information", question: "Age", type:"age", fieldid:'age1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Height (Feet)", type:"age", fieldid:'heightinfeet1', answers:[], min:1, max:10},
    {section: "Basic Information", question: "Height (Inches)", type:"age", fieldid:'heightininches1', answers:[], min:1, max:11},
    {section: "Basic Information", question: "Weight (Kilograms)", type:"age", fieldid:'weight1', answers:["Under 20", "20-25", "26-30", "31-35", "36-40", "41-45", "Over 45"]},
    {section: "Basic Information", question: "Country Of Residence", type:"text", fieldid:'country1', answers:[]},
    {section: "Basic Information", question: "Current City", type:"text", fieldid:'city1', answers:[]},
    {section: "Basic Information", question: "Relationship Status", type:"choice", fieldid:'relationshipstatus1', answers:["Single", "Divorced", "Married", "Widowed"]},
    {section: "Basic Information", question: "Ethnic Background", type:"text", fieldid:'ethnicity1', answers:["Nordic", "Indo-European", "Turkish", "Kurdish", "Hungarian", "German", "French", "English"]},
    // {section: "Basic Information", question: "Religion", type:"choice", fieldid:'religion1', answers:religions},
    {
        section: "Basic Information",
        question: "Do you have children?",
        type: "choice",
        fieldid: "children1",
        answers: ["Yes", "No"]
    },
    {
        section: "Basic Information",
        question: "If yes, how many?",
        type: "choice",
        fieldid: "howmanychildren2",
        pastanswer:"Yes",
        answers: ["1", "2", "3", "4+", "Prefer not to say"]
    },
    // {
    //     section: "Family Background",
    //     question: "Are you open to having more children?",
    //     type: "choice",
    //     fieldid: "morechildren3",
    //     answers: ["Yes", "No", "Maybe"],
    // },
    {section: "Education and Career", question: "Current Occupation", type:"text", fieldid:'currentoccupation1', sectionshow:true, answers:["Continuing Scholar", "Employed (Full-time)", "Employed (Part-time)", "Self-employed", "Unemployed", "Homemaker", "Retired", "Other"]},
    {section: "General Preferences", question: "Minimum age", type:"age", fieldid:'minage1', answers:getMultiples(1,100), sectionshow:true},
    {section: "General Preferences", question: "Maximum age", type:"age", fieldid:'maxage1', answers:getMultiples(1,100)},
    {
        section: "To Future Spouse",
        question: "What would you like to say:",
        type: "longtext",
        fieldid: "futurespouse1",
        answers: [],
        sectionshow:true
    },
    // {
    //     section: "Family Background of Spouse",
    //     question: "Marital Status:",
    //     type: "choice",
    //     fieldid: "familybackground4",
    //     answers: ["Never Married", "Divorced", "Widowed", "Irrelevant"]
    // },
    {
    section: "Relationship Preferences",
    question: "What level of education do you prefer in a potential spouse?",
    type: "choice",
    fieldid: "relationshippreferenceseducation3",
    answers: ["High School", "Vocational Training", "Bachelor’s Degree", "Master’s Degree", "Doctorate", "Irrelevant"],
    sectionshow:true
    },
    {
        section: "Images",
        question: "Guys profile picture:",
        type: "image",
        fieldid: "futurespouse1",
        answers: []
    },
]

export function makeid(length) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function getRandom(items) {
    var item = items[Math.floor(Math.random()*items.length)]; 
    return item
}

export function makeidnumber(length) {
    let result = '';
    const characters = '0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
}

export function fillerprofiledata() {
    const pass = makeid(34)
    const data = {
        EMAIL: `${makeid(10)}@${makeid(10)}.com`,
        password:pass,
        confirmpassword:pass,
        phonenumber1:makeidnumber(10),
        gender1:"Male",
        zodiacsign1:getRandom(zodiacsigns),
        relationshippreferencereligion4: "Christian",
        familybackground4: "Irrelevant",
        religion1: "Christian"
    }
    return data
}

export function turntoacronym(str) {
    if (str) {
        console.log("The thing acronymed:", str)
        var matches = str.match(/\b(\w)/g); // ['J','S','O','N']
        var acronym = matches.join(''); // JSON
        return acronym
    } else {
        return false
    }
    
}

export var Base64 = {

    // private property
    _keyStr : "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",

    // public method for encoding
    encode : function (input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;

        input = Base64._utf8_encode(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
            this._keyStr.charAt(enc1) + this._keyStr.charAt(enc2) +
            this._keyStr.charAt(enc3) + this._keyStr.charAt(enc4);
        }
        return output;
    },

    // public method for decoding
    decode : function (input) {
        var output = "";
        var chr1, chr2, chr3;
        var enc1, enc2, enc3, enc4;
        var i = 0;

        input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

        while (i < input.length) {

            enc1 = this._keyStr.indexOf(input.charAt(i++));
            enc2 = this._keyStr.indexOf(input.charAt(i++));
            enc3 = this._keyStr.indexOf(input.charAt(i++));
            enc4 = this._keyStr.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 != 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 != 64) {
                output = output + String.fromCharCode(chr3);
            }
        }

        output = Base64._utf8_decode(output);

        return output;
    },

    // private method for UTF-8 encoding
    _utf8_encode : function (string) {
        var string = string || ""
        var string = string.replace(/\r\n/g,"\n");
        var utftext = "";

        for (var n = 0; n < string.length; n++) {

            var c = string.charCodeAt(n);

            if (c < 128) {
                utftext += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            }
            else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }
        }
        return utftext;
    },

    // private method for UTF-8 decoding
    _utf8_decode(utftext) {
        var string = "";
        var i = 0;
        var c = 0, c1 = 0, c2 = 0, c3 = 0;
      
        while (i < utftext.length) {
          c = utftext.charCodeAt(i);
      
          if (c < 128) {
            string += String.fromCharCode(c);
            i++;
          } else if (c > 191 && c < 224) {
            c2 = utftext.charCodeAt(i + 1);
            string += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
            i += 2;
          } else {
            c2 = utftext.charCodeAt(i + 1);
            c3 = utftext.charCodeAt(i + 2);
            string += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
            i += 3;
          }
        }
      
        return string;
      }
      
}

export function SmartImageComponent(props) {
    const [loading, setLoading] = React.useState(true)
    const [usebackup, setUseBackup] = React.useState(false)

    const cssclasses = props.cssclasses || ""
    const imageobjectcss = props.imageobjectcss || {}

    function testImage(URL) {
        var tester=new Image();
        tester.onload=imageFound;
        tester.onerror=imageNotFound;
        tester.src=URL;
    }
    
    function imageFound() {
        setLoading(false)
    }
    
    function imageNotFound() {
        console.log(props.src+' was not found.');
        if (props.backup) {
            setUseBackup(true)
            setLoading(false)
        }
    }
    
    React.useEffect(function() {
        testImage(props.src);
    }, [])

    if (!usebackup) {
        return <img 
                src={props.src} alt={props.id} 
                style={!loading ? imageobjectcss : {display: 'none'}} 
                onLoad={() => setLoading(false)} className={cssclasses}
                onClick={() => props.onClickFunction()}
            />
    } else {
        const theurl = "https://images.unsplash.com/photo-1549880338-65ddcdfd017b?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=400&fit=max&ixid=eyJhcHBfaWQiOjE0NTg5fQ"
        return <img 
                src={theurl} alt={props.id} 
                style={!loading ? imageobjectcss : {display: 'none'}} 
                onLoad={() => setLoading(false)} className={cssclasses}
                onClick={() => props.onClickFunction()}
            />
    }
}

export function shuffleArray(array) {
    for (var i = array.length - 1; i >= 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}

export function timestamptodate(UNIX_timestamp) {
    // Create a new JavaScript Date object based on the timestamp
    // multiplied by 1000 so that the argument is in milliseconds, not seconds
    var date = new Date(UNIX_timestamp * 1000);

    // Hours part from the timestamp
    var hours = date.getHours();

    // Minutes part from the timestamp
    var minutes = "0" + date.getMinutes();

    // Seconds part from the timestamp
    var seconds = "0" + date.getSeconds();

    // Will display time in 10:30:23 format
    var formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);

    console.log(formattedTime);
    return formattedTime
}

export function calculateDaysHoursMinutes(startTimestamp, endTimestamp) {
    // Convert timestamps from seconds to milliseconds
    const msDifference = (endTimestamp - startTimestamp) * 1000;
  
    // Define time units in milliseconds
    const msPerDay = 24 * 60 * 60 * 1000;
    const msPerHour = 60 * 60 * 1000;
    const msPerMinute = 60 * 1000;
  
    // Calculate days, hours, and minutes
    const days = Math.floor(msDifference / msPerDay);
    const hours = Math.floor((msDifference % msPerDay) / msPerHour);
    const minutes = Math.floor((msDifference % msPerHour) / msPerMinute);
  
    return `${days} days ${hours} hrs ${minutes} mins`;
}
  
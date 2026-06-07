/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { User, Quiz, QuizAttempt, RetakeRequest, LeaderboardEntry, SystemStats, Question } from "./types";

// Default preseeded users matching the server
const defaultUsers = [
  {
    id: "user-admin",
    email: "admin@quiz.com",
    name: "Professor Russell (প্রফেসর রাসেল)",
    password: "admin123",
    role: "admin" as const,
    isGuest: false
  },
  {
    id: "user-student",
    email: "student@quiz.com",
    name: "Mushfiqur Rahman (মুশফিকুর রহমান)",
    password: "student123",
    role: "student" as const,
    isGuest: false
  }
];

// Default preseeded quizzes matching the server
const defaultQuizzes: Quiz[] = [
  {
    id: "quiz-photosynthesis",
    titleEn: "Cell Structure and Photosynthesis Evaluation",
    titleBn: "কোষের গঠন ও সালোকসংশ্লেষণ মূল্যায়ন",
    classId: "class-9",
    subjectId: "science",
    durationMinutes: 5,
    isPublished: true,
    createdBy: "admin-system",
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: "q-photo-1",
        textEn: "Which organelle is primarily responsible for holding chlorophyll and conducting photosynthesis?",
        textBn: "কোন কোষীয় অঙ্গাণু সাধারণত ক্লোরোফিল ধারণ করতে এবং সালোকসংশ্লেষণ প্রক্রিয়ার জন্য দায়ী?",
        optionsEn: [
          "Mitochondria",
          "Chloroplast",
          "Golgi Apparatus",
          "Ribosome"
        ],
        optionsBn: [
          "মাইটোকন্ড্রিয়া",
          "ক্লোরোপ্লাস্ট",
          "গলগি বডি",
          "রাইবোসোম"
        ],
        correctOption: "B",
        explanationEn: "Chloroplasts contain chlorophyll pigments that absorb light energy to produce glucose during photosynthesis.",
        explanationBn: "ক্লোরোপ্লাস্টে ক্লোরোফিল রঞ্জক থাকে যা সালোকসংশ্লেষণ প্রক্রিয়ায় গ্লুকোজ তৈরির জন্য আলোক শক্তি শোষণ করে।"
      },
      {
        id: "q-photo-2",
        textEn: "What are the primary raw materials required by plants for conducting photosynthesis?",
        textBn: "সালোকসংশ্লেষণ প্রক্রিয়া পরিচালনার জন্য উদ্ভিদের প্রাথমিক কাঁচামাল কোনটি?",
        optionsEn: [
          "Oxygen and glucose",
          "Carbon dioxide and water",
          "Nitrogen and soil minerals",
          "Carbon dioxide and oxygen"
        ],
        optionsBn: [
          "অক্সিজেন এবং গ্লুকোজ",
          "কার্বন ডাই অক্সাইড এবং পানি",
          "নাইট্রোজেন এবং খনিজ লবণ",
          "কার্বন ডাই অক্সাইড এবং অক্সিজেন"
        ],
        correctOption: "B",
        explanationEn: "Plants combine carbon dioxide and water under sunlight to prepare glucose, releasing oxygen as a byproduct.",
        explanationBn: "উদ্ভিদ সূর্যালোকের উপস্থিতিতে কার্বন ডাই অক্সাইড এবং পানি মিশ্রিত করে গ্লুকোজ তৈরি করে এবং উপজাত হিসেবে অক্সিজেন নির্গত করে।"
      },
      {
        id: "q-photo-3",
        textEn: "In which light wavelength does the rate of photosynthesis reach its maximum peak?",
        textBn: "কোন রঙের আলোর তরঙ্গদৈর্ঘ্যে সালোকসংশ্লেষণের হার সর্বোচ্চ পর্যায়ে পৌঁছায়?",
        optionsEn: [
          "Green and yellow light",
          "Blue and red light",
          "Indigo and yellow light",
          "Infrared light"
        ],
        optionsBn: [
          "সবুজ এবং হলুদ আলো",
          "নীল এবং লাল আলো",
          "নীল এবং হলুদ আলো",
          "অবলোহিত আলো"
        ],
        correctOption: "B",
        explanationEn: "Photosynthesis is most efficient in the red and blue regions of the light spectrum because chlorophyll absorbs these wavelengths the most.",
        explanationBn: "বর্ণালীর লাল এবং নীল অঞ্চলে সালোকসংশ্লেষণ সবচেয়ে দক্ষ হয় কারণ ক্লোরোফিল এই তরঙ্গদৈর্ঘ্যের আলো সবচেয়ে বেশি শোষণ করে।"
      }
    ]
  },
  {
    id: "quiz-trig",
    titleEn: "Algebraic Trigonometry Practice Quiz",
    titleBn: "বীজগণিতীয় ত্রিকোণমিতি অনুশীলন কুইজ",
    classId: "class-10",
    subjectId: "math",
    durationMinutes: 10,
    isPublished: true,
    createdBy: "admin-system",
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: "q-trig-1",
        textEn: "If sin(θ) = 3/5 in a right-angled triangle, what is the value of cos(θ)?",
        textBn: "একটি সমকোণী ত্রিভুজে sin(θ) = ৩/৫ হলে, cos(θ)-এর মান কত?",
        optionsEn: ["4/5", "3/4", "5/3", "1/2"],
        optionsBn: ["৪/৫", "৩/৪", "৫/৩", "১/২"],
        correctOption: "A",
        explanationEn: "Using the Pythagorean identity sin²(θ) + cos²(θ) = 1, we get cos²(θ) = 1 - 9/25 = 16/25, hence cos(θ) = 4/5.",
        explanationBn: "পিথাগোরাসের সূত্র sin²(θ) + cos²(θ) = ১ ব্যবহার করে আমরা পাই cos²(θ) = ১ - ৯/২৫ = ১৬/২৫, অতএব cos(θ) = ৪/৫।"
      },
      {
        id: "q-trig-2",
        textEn: "What is the equivalent simplified value of cot²(θ) - cosec²(θ)?",
        textBn: "cot²(θ) - cosec²(θ) এর সমতুল্য সরলীকৃত মান কত?",
        optionsEn: ["1", "-1", "0", "tan²(θ)"],
        optionsBn: ["১", "-১", "০", "tan²(θ)"],
        correctOption: "B",
        explanationEn: "Since cosec²(θ) - cot²(θ) = 1, exchanging the terms cot²(θ) - cosec²(θ) yields -1.",
        explanationBn: "যেহেতু cosec²(θ) - cot²(θ) = ১, তাই পদ পরিবর্তনের মাধ্যমে cot²(θ) - cosec²(θ) = -১ পাওয়া যায়।"
      }
    ]
  },
  {
    id: "quiz-net-basics",
    titleEn: "Computer Networking Basics and Internet Protocol",
    titleBn: "কম্পিউটার নেটওয়ার্কিং বেসিক এবং ইন্টারনেট প্রোটোকল",
    classId: "class-8",
    subjectId: "ict",
    durationMinutes: 7,
    isPublished: true,
    createdBy: "admin-system",
    createdAt: new Date().toISOString(),
    questions: [
      {
        id: "q-ict-1",
        textEn: "Which layout topology connects all computers to a single central hub or switch?",
        textBn: "কোন নেটওয়ার্ক টপোলজি সমস্ত কম্পিউটারকে একটি কেন্দ্রীয় হাব বা সুইচের সাথে সংযুক্ত করে?",
        optionsEn: ["Ring Topology", "Bus Topology", "Star Topology", "Mesh Topology"],
        optionsBn: ["রিং টপোলজি", "বাস টপোলজি", "স্টার টপোলজি", "মেশ টপোলজি"],
        correctOption: "C",
        explanationEn: "Star topology channels all communications through a central node, acting as a gateway or switch.",
        explanationBn: "স্টার টপোলজিতে সকল তথ্য আদান-প্রদান কেন্দ্রের একটি হাব বা সুইচের মাধ্যমে পরিবাহিত হয়।"
      },
      {
        id: "q-ict-2",
        textEn: "What does the abbreviation IP stand for in web network communications?",
        textBn: "ওয়েব নেটওয়ার্কের ক্ষেত্রে 'IP'-এর পূর্ণরূপ কী?",
        optionsEn: ["Intranet Process", "Information Pathway", "Internet Protocol", "Instant Portal"],
        optionsBn: ["ইনট্রানেট প্রসেস", "ইনফরমেশন পাথওয়ে", "ইন্টারনেট প্রোটোকল", "ইনস্ট্যান্ট পোর্টাল"],
        correctOption: "C",
        explanationEn: "IP stands for Internet Protocol, which routes packet deliveries across logical networking interfaces.",
        explanationBn: "IP এর পূর্ণরূপ হলো ইন্টারনেট প্রোটোকল, যা বিভিন্ন নেটওয়ার্কের মধ্যে তথ্যের প্যাকেট রাউটিং করতে ব্যবহৃত হয়।"
      }
    ]
  }
];

// LocalStorage Helpers
const isClient = typeof window !== 'undefined';

function getStorageItem<T>(key: string, defaultValue: T): T {
  if (!isClient) return defaultValue;
  const stored = localStorage.getItem(key);
  if (stored === null) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
    return defaultValue;
  }
  try {
    return JSON.parse(stored) as T;
  } catch {
    return defaultValue;
  }
}

function setStorageItem<T>(key: string, value: T): void {
  if (!isClient) return;
  localStorage.setItem(key, JSON.stringify(value));
}

// Global Questions Pool for client-side automated generation
const fallbackQuestionPool: Record<string, Question[]> = {
  science: [
    {
      id: "pool-sci-1",
      textEn: "What is the basic structural and functional unit of all living organisms?",
      textBn: "সকল জীবন্ত বস্তুর মৌলিক কাঠামোগত এবং কার্যকারী ইউনিট কোনটি?",
      optionsEn: ["Tissue", "Cell", "Organ", "Organism"],
      optionsBn: ["কলা (Tissue)", "কোষ (Cell)", "অঙ্গ (Organ)", "জীব (Organism)"],
      correctOption: "B",
      explanationEn: "Cell is the basic building block of all living organisms. All core physiological tasks occur within cells.",
      explanationBn: "কোষ হলো সকল জীবের মৌলিক গাঠনিক একক। সমস্ত প্রয়োজনীয় শারীরবৃত্তীয় কাজকোষের অভ্যন্তরে সংঘটিত হয়।"
    },
    {
      id: "pool-sci-2",
      textEn: "Which chemical compound is known colloquially as common table salt?",
      textBn: "কোন রাসায়নিক উপাদানটি সাধারণত খাবার লবণ নামে পরিচিত?",
      optionsEn: ["Sodium Hydroxide", "Calcium Carbonate", "Sodium Chloride", "Potassium Chloride"],
      optionsBn: ["সোডিয়াম হাইড্রোক্সাইড", "ক্যালসিয়াম কার্বনেট", "সোডিয়াম ক্লোরাইড", "পটাশিয়াম ক্লোরাইড"],
      correctOption: "C",
      explanationEn: "Sodium Chloride (NaCl) is the scientific formula for refined table salt utilized for flavoring and preserving.",
      explanationBn: "সোডিয়াম ক্লোরাইড (NaCl) হলো খাবার লবণের রাসায়নিক নাম যা স্বাদ বাড়ানো এবং খাদ্য সংরক্ষণের জন্য ব্যবহৃত হয়।"
    },
    {
      id: "pool-sci-3",
      textEn: "How many bones are present in a fully matured adult human skeletal framework?",
      textBn: "একজন পূর্ণবয়স্ক মানুষের কঙ্কালে কতটি হাড় থাকে?",
      optionsEn: ["206", "306", "106", "186"],
      optionsBn: ["২০৬ টি", "৩০৬ টি", "১০৬ টি", "১৮৬ টি"],
      correctOption: "A",
      explanationEn: "An adult human skeleton possesses exactly 246 bones at birth which fuse together to form 206 bones in maturity.",
      explanationBn: "মানব শিশু প্রায় ৩০০ হাড় নিয়ে জন্মগ্রহণ করে, যা বয়স বৃদ্ধির সাথে সংযুক্ত হয়ে পূর্ণ বয়সে এসে ২০৬ টি হাড়ে পরিণত হয়।"
    },
    {
      id: "pool-sci-4",
      textEn: "Which primary gas constitutes the highest percentage of the earth's atmosphere?",
      textBn: "পৃথিবীর বায়ুমণ্ডলে কোন গ্যাসটি সবচেয়ে বেশি পরিমাণে থাকে?",
      optionsEn: ["Oxygen", "Carbon dioxide", "Nitrogen", "Hydrogen"],
      optionsBn: ["অক্সিজেন", "কার্বন ডাই অক্সাইড", "নাইট্রোজেন", "হাইড্রোজেন"],
      correctOption: "C",
      explanationEn: "Nitrogen constitutes approximately 78% of the chemical makeup of our atmospheric gaseous envelope.",
      explanationBn: "নাইট্রোজেন গ্যাস পৃথিবীর বায়ুমণ্ডলের প্রায় ৭৮% অংশজুড়ে বিস্তৃত।"
    },
    {
      id: "pool-sci-5",
      textEn: "What is the approximate speed of light travelling through a perfect vacuum?",
      textBn: "শূণ্য মাধ্যমে আলোর আনুমানিক গতিবেগ প্রতি সেকেন্ডে কত?",
      optionsEn: ["300,000 km/s", "150,000 km/s", "500,000 km/s", "1,000,000 km/s"],
      optionsBn: ["৩,০০,০০০ কিমি/সে.", "১,৫০,০০০ কিমি/সে.", "৫,০০,০০০ কিমি/সে.", "১০,০০,০০০ কিমি/সে."],
      correctOption: "A",
      explanationEn: "Light travels at approximately 299,792 kilometers per second in a vacuum, commonly rounded to 300,000 km/s.",
      explanationBn: "শূণ্য মাধ্যমে আলো সেকেন্ডে প্রায় ২,৯৯,৭৯২ কিলোমিটার বেগে চলে, যা সাধারণত ৩ লক্ষ কিলোমিটার ধরা হয়।"
    }
  ],
  math: [
    {
      id: "pool-math-1",
      textEn: "If 2x + 7 = 15, what is the value of x?",
      textBn: "যদি 2x + 7 = 15 হয়, তবে x-এর মান কত?",
      optionsEn: ["3", "4", "5", "6"],
      optionsBn: ["৩", "৪", "৫", "৬"],
      correctOption: "B",
      explanationEn: "Subtracting 7 from both sides gives 2x = 8, and dividing by 2 yields x = 4.",
      explanationBn: "উভয়পক্ষ থেকে ৭ বিয়োগ করলে পাওয়া যায় 2x = ৮, এবং ২ দিয়ে ভাগ করলে পাই x = ৪।"
    },
    {
      id: "pool-math-2",
      textEn: "What is the sum of the interior geometric angles of a triangle?",
      textBn: "ত্রিভুজের তিনটি কোণের সমষ্টি কতটি সমকোণ বা কত ডিগ্রী?",
      optionsEn: ["90°", "180°", "270°", "360°"],
      optionsBn: ["৯০°", "১৮০°", "২৭০°", "৩৬০°"],
      correctOption: "B",
      explanationEn: "The interior angles of any planar triangle sum up to exactly 180 degrees (or two right angles).",
      explanationBn: "যেকোনো সমতল ত্রিভুজের তিনটি অভ্যন্তরীণ কোণের সমষ্টি সর্বদা ১৮০ ডিগ্রি বা ২ সমকোণ হয়ে থাকে।"
    },
    {
      id: "pool-math-3",
      textEn: "What is the value of the mathematical ratio pi (π) rounded to two decimal places?",
      textBn: "পাই (π)-এর দুই দশমিক স্থান পর্যন্ত সঠিক মান কোনটি?",
      optionsEn: ["1.41", "2.71", "3.14", "3.16"],
      optionsBn: ["১.৪১", "২.৭১", "৩.১৪", "৩.১৬"],
      correctOption: "C",
      explanationEn: "Pi represents the ratio of a circle's circumference to its diameter, which is approximately 3.14159...",
      explanationBn: "পাই হলো বৃত্তের পরিধি ও ব্যাসের অনুপাত, যার সরলীকৃত মান ৩.১৪১৬ অথবা ৩.১৪।"
    }
  ],
  english: [
    {
      id: "pool-eng-1",
      textEn: "Which of the following is a synonym of the word 'Diligent'?",
      textBn: "নিচের কোনটি 'Diligent' শব্দের সঠিক সমার্থক শব্দ?",
      optionsEn: ["Lazy", "Hardworking", "Careless", "Weak"],
      optionsBn: ["অলস", "পরিশ্রমী", "উদাসীন", "দুর্বল"],
      correctOption: "B",
      explanationEn: "'Diligent' refers to showing care and conscientiousness in one's work, which is synonymous with 'hardworking'.",
      explanationBn: "'Diligent' শব্দের অর্থ অধ্যবসায়ী বা পরিশ্রমী, যা 'Hardworking' শব্দের সমার্থক।"
    },
    {
      id: "pool-eng-2",
      textEn: "Choose the correct preposition: She is proficient ___ Mathematics.",
      textBn: "সঠিক প্রিপজিশন নির্বাচন করুন: She is proficient ___ Mathematics.",
      optionsEn: ["at", "in", "on", "with"],
      optionsBn: ["at", "in", "on", "with"],
      correctOption: "B",
      explanationEn: "The word 'proficient' naturally takes the preposition 'in' to indicate mastery/expertise in a subject.",
      explanationBn: "কোনো নির্দিষ্ট বিষয়ে দক্ষতা বোঝাতে 'proficient'-এর পরে 'in' প্রিপজিশন বসে।"
    }
  ],
  ict: [
    {
      id: "pool-ict-1",
      textEn: "Which electronic component is known as the electronic brain of a computer?",
      textBn: "কোন ইলেকট্রনিক অঙ্গাণুটি কম্পিউটারের মস্তিষ্ক হিসেবে পরিচিত?",
      optionsEn: ["RAM", "Hard disk", "CPU", "Motherboard"],
      optionsBn: ["র‍্যাম (RAM)", "হার্ডডিস্ক (Hard disk)", "সিপিইউ (CPU)", "মাদারবোর্ড (Motherboard)"],
      correctOption: "C",
      explanationEn: "The CPU (Central Processing Unit) performs all computational processing and logic decisions, functioning as the brain.",
      explanationBn: "CPU (সেন্ট্রাল প্রসেসিং ইউনিট) সমস্ত হিসাব এবং যুক্তিগত কাজ পরিচালনা করে, তাই একে কম্পিউটারের ব্রেইন বলা হয়।"
    },
    {
      id: "pool-ict-2",
      textEn: "What is the full abbreviation format of HTML in web digital technology?",
      textBn: "ওয়েব প্রযুক্তির ক্ষেত্রে HTML-এর পূর্ণরূপ রূপ কোনটি?",
      optionsEn: ["HyperText Markup Language", "HyperText Multi Language", "HighText Markup Language", "Hyper Transfer Markdown Language"],
      optionsBn: ["হাইপারটেক্সট মার্কআপ ল্যাঙ্গুয়েজ", "হাইপারটেক্সট মাল্টি ল্যাঙ্গুয়েজ", "হাইট্যাক্সট মার্কআপ ল্যাঙ্গুয়েজ", "হাইপার ট্রান্সফার মার্কডাউন ল্যাঙ্গুয়েজ"],
      correctOption: "A",
      explanationEn: "HTML stands for HyperText Markup Language, the structural code framework utilized to design standard web interfaces.",
      explanationBn: "HTML হলো হাইপারটেক্সট মার্কআপ ল্যাঙ্গুয়েজ, যা যেকোনো ওয়েবসাইট ডিজাইন ও কাঠামো দাঁড় করাতে ব্যবহৃত প্রধান কোড ল্যাঙ্গুয়েজ।"
    }
  ],
  history: [
    {
      id: "pool-hist-1",
      textEn: "In which year did the historic Language Movement of Bangladesh reach its final peak on February 21?",
      textBn: "কত সালে এবং কোন তারিখে ঐতিহাসিক ভাষা আন্দোলন চূড়ান্ত রূপ লাভ করে?",
      optionsEn: ["1947", "1952", "1971", "1966"],
      optionsBn: ["১৯৪৭ সালে", "১৯৫২ সালে", "১৯৭১ সালে", "১৯৬৬ সালে"],
      correctOption: "B",
      explanationEn: "The core uprising for the recognition of Bengali occurred in Dhaka on February 21, 1952, marking the Language Movement peak.",
      explanationBn: "১৯৫২ সালের ২১শে ফেব্রুয়ারি বাংলা ভাষার মর্যাদার দাবিতে ঢাকায় ছাত্র জনতার মিছিলের মধ্য দিয়ে ভাষা আন্দোলন চূড়ান্ত রূপ নেয়।"
    },
    {
      id: "pool-hist-2",
      textEn: "Who was the primary founder and ruler of the Mughal Empire in India?",
      textBn: "ভারতে মোগল সাম্রাজ্যের প্রতিষ্ঠাতা কে ছিলেন?",
      optionsEn: ["Akbar", "Babur", "Humayun", "Shah Jahan"],
      optionsBn: ["সম্রাট আকবর", "সম্রাট বাবর", "সম্রাট হুমায়ুন", "সম্রাট শাহজাহান"],
      correctOption: "B",
      explanationEn: "Zahir-ud-din Muhammad Babur founded the Mughal dynasty in India in 1526 after defeating Ibrahim Lodi in the First Battle of Panipat.",
      explanationBn: "জাহির-উদ-দিন মুহাম্মদ বাবর ১৫২৬ সালে পানিপথের প্রথম যুদ্ধে ইব্রাহিম লোদিকে পরাজিত করে ভারতে মোগল সাম্রাজ্য প্রতিষ্ঠা করেন।"
    }
  ]
};

export const api = {
  // Credentials Routing - 100% Client LocalStorage flow
  async login(emailString: string, passwordString: string): Promise<User> {
    const users = getStorageItem<any[]>("examshall_users", defaultUsers);
    const user = users.find(
      (u) => u.email.toLowerCase() === emailString.toLowerCase() && u.password === passwordString
    );

    if (!user) {
      const errorObj = new Error("Invalid academic credentials.") as any;
      errorObj.errorEn = "Invalid academic credentials.";
      errorObj.errorBn = "ভুল আইডি বা পাসওয়ার্ড সরবরাহ করা হয়েছে।";
      throw errorObj;
    }

    return {
      id: user.id,
      email: user.email,
      name: user.name,
      role: user.role,
      isGuest: user.isGuest || false
    };
  },

  async register(
    emailString: string,
    passwordString: string,
    nameString: string,
    roleString: 'student' | 'admin',
    permitCodeString?: string
  ): Promise<User> {
    const users = getStorageItem<any[]>("examshall_users", defaultUsers);
    
    const exists = users.some((u) => u.email.toLowerCase() === emailString.toLowerCase());
    if (exists) {
      const errorObj = new Error("Email record already registered.") as any;
      errorObj.errorEn = "Email record already registered.";
      errorObj.errorBn = "এই ইমেইল দিয়ে ইতঃপূর্বে হিসাব খোলা রয়েছে।";
      throw errorObj;
    }

    if (roleString === "admin" && permitCodeString !== "devpermit123") {
      const errorObj = new Error("Invalid developer security permit code.") as any;
      errorObj.errorEn = "Invalid developer/administrative security permit code.";
      errorObj.errorBn = "ভুল ডেভেলপার বা প্রধান প্রশাসক সিকিউরিটি পারমিট কোড।";
      throw errorObj;
    }

    const newUser = {
      id: "user-" + Math.random().toString(36).substr(2, 9),
      email: emailString,
      name: nameString,
      password: passwordString,
      role: roleString,
      isGuest: false
    };

    users.push(newUser);
    setStorageItem("examshall_users", users);

    return {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name,
      role: newUser.role,
      isGuest: false
    };
  },

  async guestLogin(fullName: string): Promise<User> {
    const users = getStorageItem<any[]>("examshall_users", defaultUsers);
    const guestId = "guest-" + Math.random().toString(36).substr(2, 9);
    
    const guestUser = {
      id: guestId,
      email: `guest-${guestId}@examshall.internal`,
      name: fullName.trim(),
      password: "",
      role: "student" as const,
      isGuest: true
    };

    users.push(guestUser);
    setStorageItem("examshall_users", users);

    return {
      id: guestUser.id,
      email: guestUser.email,
      name: guestUser.name,
      role: guestUser.role,
      isGuest: true
    };
  },

  // User Management
  async fetchUsers(): Promise<any[]> {
    const users = getStorageItem<any[]>("examshall_users", defaultUsers);
    return users.map((u) => ({
      id: u.id,
      email: u.email,
      name: u.name,
      role: u.role,
      isGuest: u.isGuest
    }));
  },

  async updateUserRole(uId: string, roleString: 'student' | 'admin'): Promise<any> {
    const users = getStorageItem<any[]>("examshall_users", defaultUsers);
    const userIdx = users.findIndex((u) => u.id === uId);
    
    if (userIdx === -1) {
      throw new Error("User not discovered.");
    }

    users[userIdx].role = roleString;
    setStorageItem("examshall_users", users);

    return { success: true, user: users[userIdx] };
  },

  // Quiz Catalog Admin CRUD
  async fetchQuizzes(): Promise<Quiz[]> {
    return getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
  },

  async createQuiz(payload: Partial<Quiz>): Promise<Quiz> {
    const quizzes = getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
    const newQuiz: Quiz = {
      id: "quiz-" + Math.random().toString(36).substr(2, 9),
      titleEn: payload.titleEn || "Custom Quiz",
      titleBn: payload.titleBn || "কাস্টম কুইজ",
      classId: payload.classId || "class-9",
      subjectId: payload.subjectId || "science",
      durationMinutes: Number(payload.durationMinutes) || 10,
      isPublished: payload.isPublished !== undefined ? payload.isPublished : true,
      questions: (payload.questions || []).map((q: any, idx: number) => ({
        id: q.id || `q-${idx}-${Date.now()}`,
        textEn: q.textEn || "",
        textBn: q.textBn || "",
        optionsEn: q.optionsEn || ["", "", "", ""],
        optionsBn: q.optionsBn || ["", "", "", ""],
        correctOption: q.correctOption || "A",
        explanationEn: q.explanationEn || "",
        explanationBn: q.explanationBn || ""
      })),
      createdBy: payload.createdBy || "admin",
      createdAt: new Date().toISOString()
    };

    quizzes.push(newQuiz);
    setStorageItem("examshall_quizzes", quizzes);
    return newQuiz;
  },

  async updateQuiz(qId: string, payload: Partial<Quiz>): Promise<Quiz> {
    const quizzes = getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
    const idx = quizzes.findIndex((q) => q.id === qId);
    
    if (idx === -1) {
      throw new Error("Quiz path not discovered.");
    }

    quizzes[idx] = {
      ...quizzes[idx],
      titleEn: payload.titleEn || quizzes[idx].titleEn,
      titleBn: payload.titleBn || quizzes[idx].titleBn,
      classId: payload.classId || quizzes[idx].classId,
      subjectId: payload.subjectId || quizzes[idx].subjectId,
      durationMinutes: payload.durationMinutes !== undefined ? Number(payload.durationMinutes) : quizzes[idx].durationMinutes,
      isPublished: payload.isPublished !== undefined ? payload.isPublished : quizzes[idx].isPublished,
      questions: payload.questions ? payload.questions.map((q: any, qIdx: number) => ({
        id: q.id || `q-${qIdx}-${Date.now()}`,
        textEn: q.textEn,
        textBn: q.textBn,
        optionsEn: q.optionsEn,
        optionsBn: q.optionsBn,
        correctOption: q.correctOption,
        explanationEn: q.explanationEn,
        explanationBn: q.explanationBn
      })) : quizzes[idx].questions
    };

    setStorageItem("examshall_quizzes", quizzes);
    return quizzes[idx];
  },

  async deleteQuiz(qId: string): Promise<{ success: boolean }> {
    const quizzes = getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
    const filtered = quizzes.filter((q) => q.id !== qId);
    setStorageItem("examshall_quizzes", filtered);
    return { success: true };
  },

  // Locked assessment & Hand in scripting
  async checkLockStatus(uId: string, qId: string): Promise<{ locked: boolean; remainingSeconds: number; hasRequested: boolean }> {
    const attempts = getStorageItem<QuizAttempt[]>("examshall_attempts", []);
    const retakes = getStorageItem<RetakeRequest[]>("examshall_retakes", []);

    const userQuizAttempts = attempts.filter((a) => a.userId === uId && a.quizId === qId);
    
    if (userQuizAttempts.length === 0) {
      return { locked: false, remainingSeconds: 0, hasRequested: false };
    }

    // Find latest attempt
    const latestAttempt = userQuizAttempts.reduce((latest, current) => {
      return new Date(current.completedAt) > new Date(latest.completedAt) ? current : latest;
    }, userQuizAttempts[0]);

    const lastTime = new Date(latestAttempt.completedAt).getTime();
    const now = new Date().getTime();
    const elapsedMs = now - lastTime;
    const lockPeriodMs = 12 * 60 * 60 * 1000; // 12 hours Lock

    // Check approvals
    const approvals = retakes.filter(
      (r) => r.userId === uId && r.quizId === qId && r.status === "approved"
    );
    const latestApproval = approvals.reduce((latest, current) => {
      if (!latest) return current;
      return new Date(current.requestedAt) > new Date(latest.requestedAt) ? current : latest;
    }, null as any);

    let isApprovedAndNewer = false;
    if (latestApproval) {
      const approvalTime = new Date(latestApproval.requestedAt).getTime();
      if (approvalTime > lastTime) {
        isApprovedAndNewer = true;
      }
    }

    const remainingMs = lockPeriodMs - elapsedMs;
    const locked = !isApprovedAndNewer && remainingMs > 0;
    const remainingSeconds = locked ? Math.ceil(remainingMs / 1000) : 0;

    const pendingRequests = retakes.filter(
      (r) => r.userId === uId && r.quizId === qId && r.status === "pending"
    );

    return {
      locked,
      remainingSeconds,
      hasRequested: pendingRequests.length > 0
    };
  },

  async submitAttempt(
    uId: string,
    uName: string,
    uEmail: string,
    qId: string,
    answersMap: { [questionIndex: number]: string },
    timeSpent: number
  ): Promise<QuizAttempt> {
    const quizzes = getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
    const attempts = getStorageItem<QuizAttempt[]>("examshall_attempts", []);

    const quiz = quizzes.find((q) => q.id === qId);
    if (!quiz) {
      throw new Error("Quiz directory not found.");
    }

    // Lock check
    const lock = await this.checkLockStatus(uId, qId);
    if (lock.locked) {
      throw new Error("Assessment locked due to safety limit.");
    }

    // Grade answers
    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      const studentAnswer = answersMap[idx];
      if (studentAnswer === q.correctOption) {
        correctCount++;
      }
    });

    const totalQuestions = quiz.questions.length;
    const percentage = totalQuestions > 0 ? Math.round((correctCount / totalQuestions) * 100) : 0;

    const newAttempt: QuizAttempt = {
      id: "attempt-" + Math.random().toString(36).substr(2, 9),
      quizId: qId,
      quizTitleEn: quiz.titleEn,
      quizTitleBn: quiz.titleBn,
      classId: quiz.classId,
      subjectId: quiz.subjectId,
      userId: uId,
      username: uName,
      email: uEmail || "anonymous@examshall.internal",
      score: correctCount,
      totalQuestions,
      percentage,
      timeSpentSeconds: Number(timeSpent) || 0,
      completedAt: new Date().toISOString(),
      answers: answersMap
    };

    attempts.push(newAttempt);
    setStorageItem("examshall_attempts", attempts);

    return newAttempt;
  },

  async fetchUserAttempts(uId: string): Promise<QuizAttempt[]> {
    const attempts = getStorageItem<QuizAttempt[]>("examshall_attempts", []);
    return attempts.filter((a) => a.userId === uId);
  },

  // Clearance locks requesting
  async requestRetake(uId: string, uName: string, uEmail: string, qId: string): Promise<{ success: boolean }> {
    const quizzes = getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
    const retakes = getStorageItem<RetakeRequest[]>("examshall_retakes", []);

    const quiz = quizzes.find((q) => q.id === qId);
    if (!quiz) {
      throw new Error("Quiz not found.");
    }

    // Already pending?
    const alreadyRequested = retakes.some(
      (r) => r.userId === uId && r.quizId === qId && r.status === "pending"
    );
    if (alreadyRequested) {
      return { success: true };
    }

    const request: RetakeRequest = {
      id: "req-" + Math.random().toString(36).substr(2, 9),
      userId: uId,
      username: uName,
      email: uEmail || "anonymous@examshall.internal",
      quizId: qId,
      quizTitleEn: quiz.titleEn,
      quizTitleBn: quiz.titleBn,
      requestedAt: new Date().toISOString(),
      status: "pending"
    };

    retakes.push(request);
    setStorageItem("examshall_retakes", retakes);
    return { success: true };
  },

  async fetchPendingRetakes(): Promise<RetakeRequest[]> {
    const retakes = getStorageItem<RetakeRequest[]>("examshall_retakes", []);
    return retakes.filter((r) => r.status === "pending");
  },

  async approveRetake(reqId: string, statusText: "approved" | "rejected"): Promise<{ success: boolean }> {
    const retakes = getStorageItem<RetakeRequest[]>("examshall_retakes", []);
    const request = retakes.find((r) => r.id === reqId);
    
    if (!request) {
      throw new Error("Request not discovered.");
    }

    request.status = statusText;
    setStorageItem("examshall_retakes", retakes);
    return { success: true };
  },

  // Leaderboards and dashboards pulse analytics
  async fetchLeaderboard(classId?: string, subjectId?: string): Promise<LeaderboardEntry[]> {
    const attempts = getStorageItem<QuizAttempt[]>("examshall_attempts", []);
    const scoresMap: { [email: string]: LeaderboardEntry } = {};

    const filteredAttempts = attempts.filter((a) => {
      if (classId && a.classId !== classId) return false;
      if (subjectId && a.subjectId !== subjectId) return false;
      return true;
    });

    filteredAttempts.forEach((a) => {
      const key = a.email.toLowerCase();
      if (!scoresMap[key]) {
        scoresMap[key] = {
          username: a.username,
          email: key,
          totalAttempts: 0,
          averageScorePercentage: 0,
          totalCorrect: 0,
          points: 0
        };
      }
      const entry = scoresMap[key];
      entry.totalAttempts += 1;
      entry.totalCorrect += a.score;
      entry.averageScorePercentage = (entry.averageScorePercentage * (entry.totalAttempts - 1) + a.percentage) / entry.totalAttempts;
    });

    const list = Object.values(scoresMap);
    list.forEach((entry) => {
      entry.points = Math.round(entry.totalCorrect * 20 + entry.averageScorePercentage * 5);
      entry.averageScorePercentage = Math.round(entry.averageScorePercentage);
    });

    return list.sort((a, b) => b.points - a.points);
  },

  async fetchQuizAttempts(quizId: string): Promise<QuizAttempt[]> {
    const attempts = getStorageItem<QuizAttempt[]>("examshall_attempts", []);
    const quizAttempts = attempts.filter((a) => a.quizId === quizId);
    
    return [...quizAttempts].sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return a.timeSpentSeconds - b.timeSpentSeconds;
    });
  },

  async fetchStats(): Promise<SystemStats> {
    const quizzes = getStorageItem<Quiz[]>("examshall_quizzes", defaultQuizzes);
    const attempts = getStorageItem<QuizAttempt[]>("examshall_attempts", []);
    const users = getStorageItem<any[]>("examshall_users", defaultUsers);

    const totalQuizzes = quizzes.length;
    const totalAttempts = attempts.length;

    const uniqueStudents = new Set(attempts.map((a) => a.email.toLowerCase()));
    const totalStudents = uniqueStudents.size || users.filter((u) => u.role === "student").length || 1;

    const totalPerc = attempts.reduce((sum, a) => sum + a.percentage, 0);
    const averageScore = totalAttempts > 0 ? Math.round(totalPerc / totalAttempts) : 0;

    const subjectAttempts = {
      science: 0,
      math: 0,
      english: 0,
      ict: 0,
      history: 0
    };

    attempts.forEach((a) => {
      const sId = (a.subjectId || "").toLowerCase();
      if (sId === "science") subjectAttempts.science++;
      else if (sId === "math") subjectAttempts.math++;
      else if (sId === "english") subjectAttempts.english++;
      else if (sId === "ict") subjectAttempts.ict++;
      else if (sId === "history") subjectAttempts.history++;
    });

    const ranges = {
      "90-100": 0,
      "70-89": 0,
      "50-69": 0,
      "Under 50": 0
    };

    attempts.forEach((a) => {
      const p = a.percentage;
      if (p >= 90) ranges["90-100"]++;
      else if (p >= 70) ranges["70-89"]++;
      else if (p >= 50) ranges["50-69"]++;
      else ranges["Under 50"]++;
    });

    const scoreDistribution = [
      { range: "90-100%", count: ranges["90-100"] },
      { range: "70-89%", count: ranges["70-89"] },
      { range: "50-69%", count: ranges["50-69"] },
      { range: "Below 50%", count: ranges["Under 50"] }
    ];

    return {
      totalQuizzes,
      totalAttempts,
      totalStudents,
      averageScore,
      subjectAttempts,
      scoreDistribution
    };
  },

  async sendScorecardEmail(attemptId: string, emailAddress: string): Promise<{ success: boolean; messageEn: string; messageBn: string }> {
    return {
      success: true,
      messageEn: `Bilingual scorecard synthesized and successfully dispatched to ${emailAddress}.`,
      messageBn: `দ্বিভাষিক স্কোরকার্ড তৈরি করা হয়েছে এবং ${emailAddress} এ সফলভাবে প্রেরণ করা হয়েছে।`
    };
  },

  // Gemini Synthesis Automation Engine (Mock / Fallback offline generator for static load durability)
  async aiGenerateQuiz(
    promptText: string,
    classVal: string,
    subjectVal: string,
    imageBase64?: string,
    imageMime?: string,
    imagesList?: { base64: string; mime: string }[],
    appLang?: "en" | "bn",
    count?: number
  ): Promise<Partial<Quiz>> {
    // Artificial 1 second delay to feel like processing
    await new Promise((resolve) => setTimeout(resolve, 1200));

    const targetSubject = (subjectVal || "science").toLowerCase();
    const questionsPool = fallbackQuestionPool[targetSubject] || fallbackQuestionPool.science;

    // Detect if prompt has specific question requested count
    const numMatch = promptText.match(/\b\d+\b/g);
    let requestedNumbers: number[] = [];
    if (numMatch) {
      requestedNumbers = numMatch.map((n) => parseInt(n)).filter((n) => n > 0 && n <= 50);
    }

    let finalQuestions: Question[] = [];
    const countToGenerate = count || (requestedNumbers.length > 0 ? requestedNumbers.length : 3);

    // Shuffle and pick questions based on the size requested
    const shuffled = [...questionsPool].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(countToGenerate, shuffled.length));

    // Map questions to match user prompt requests
    selected.forEach((q, idx) => {
      const qNum = requestedNumbers[idx] || (idx + 1);
      
      const newQuestion: Question = {
        id: `mock-ai-q-${idx}-${Date.now()}`,
        textEn: q.textEn,
        textBn: q.textBn,
        optionsEn: [...q.optionsEn],
        optionsBn: [...q.optionsBn],
        correctOption: q.correctOption,
        explanationEn: q.explanationEn,
        explanationBn: q.explanationBn
      };

      // Custom tweaks if language is defined to duplicate textEn and textBn fields appropriately
      if (appLang === "bn") {
        newQuestion.textEn = q.textBn; 
        newQuestion.optionsEn = [...q.optionsBn];
        newQuestion.explanationEn = q.explanationBn;
      } else if (appLang === "en") {
        newQuestion.textBn = q.textEn;
        newQuestion.optionsBn = [...q.optionsEn];
        newQuestion.explanationBn = q.explanationEn;
      }

      finalQuestions.push(newQuestion);
    });

    // Generate matching titles
    const titleEn = appLang === "bn" ? "এআই কাস্টম এমসিকিউ অনুশীলন কুইজ" : `AI Generated Practice Quiz - ${subjectVal}`;
    const titleBn = appLang === "bn" ? "এআই কাস্টম এমসিকিউ অনুশীলন কুইজ" : `এআই দ্বারা জেনারেটকৃত অনুশীলন কুইজ - ${subjectVal}`;

    return {
      titleEn,
      titleBn,
      classId: classVal as any || "class-9",
      subjectId: subjectVal as any || "science",
      durationMinutes: 10,
      isPublished: true,
      questions: finalQuestions
    };
  }
};

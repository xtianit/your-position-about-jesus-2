import logo from "./assets/logo.png";
import Header from "./components/Header";
import { useState, useEffect } from "react";
import {
    BookOpen,
    Award,
    CheckCircle,
    Edit2,
    Save,
    X,
    Clock,
    Plus,
    Lock,
    Unlock,
} from "lucide-react";

interface PaystackResponse {
    reference: string;
    status: string;
    message: string;
    trans: string;
    transaction: string;
    trxref: string;
}

declare global {
    interface Window {
        PaystackPop: {
            setup: (config: {
                key: string;
                email: string;
                amount: number;
                currency: string;
                reference: string;
                onClose: () => void;
                callback: (response: PaystackResponse) => void;
            }) => { openIframe: () => void };
        };
    }
}

type BibleVersions = {
    KJV: string;
    NKJV: string;
    NIV: string;
    ESV: string;
    AMP: string;
    NLT: string;
};

type ScriptureDB = Record<string, BibleVersions>;

const initialScriptureDB: ScriptureDB = {
    "Mark 14:37": {
        KJV: "37 And he cometh, and findeth them sleeping, and saith unto Peter, Simon, sleepest thou? couldest not thou watch one hour?",
        NKJV: '37 Then He came and found them sleeping, and said to Peter, "Simon, are you sleeping? Could you not watch one hour?"',
        NIV: '37 Then he returned to his disciples and found them sleeping. "Simon," he said to Peter, "are you asleep? Couldn\'t you keep watch for one hour?"',
        ESV: '37 And he came and found them sleeping, and he said to Peter, "Simon, are you asleep? Could you not watch one hour?"',
        AMP: '37 Then He came [back] and found them sleeping, and said to Peter, "Simon, are you asleep? Were you unable to keep watch for one hour?"',
        NLT: '37 Then he returned and found the disciples asleep. He said to Peter, "Simon, are you asleep? Couldn\'t you watch with me even one hour?"',
    },
    "Matthew 13:24-30": {
        KJV: "24 Another parable put he forth unto them, saying, The kingdom of heaven is likened unto a man which sowed good seed in his field: 25 But while men slept, his enemy came and sowed tares among the wheat, and went his way. 26 But when the blade was sprung up, and brought forth fruit, then appeared the tares also. 27 So the servants of the householder came and said unto him, Sir, didst not thou sow good seed in thy field? from whence then hath it tares? 28 He said unto them, An enemy hath done this. The servants said unto him, Wilt thou then that we go and gather them up? 29 But he said, Nay; lest while ye gather up the tares, ye root up also the wheat with them. 30 Let both grow together until the harvest: and in the time of harvest I will say to the reapers, Gather ye together first the tares, and bind them in bundles to burn them: but gather the wheat into my barn.",
        NKJV: "24 Another parable He put forth to them, saying: \"The kingdom of heaven is like a man who sowed good seed in his field; 25 but while men slept, his enemy came and sowed tares among the wheat and went his way. 26 But when the grain had sprouted and produced a crop, then the tares also appeared. 27 So the servants of the owner came and said to him, 'Sir, did you not sow good seed in your field? How then does it have tares?' 28 He said to them, 'An enemy has done this.' The servants said to him, 'Do you want us then to go and gather them up?' 29 But he said, 'No, lest while you gather up the tares you also uproot the wheat with them. 30 Let both grow together until the harvest, and at the time of harvest I will say to the reapers, \"First gather together the tares and bind them in bundles to burn them, but gather the wheat into my barn.\"'\"",
        NIV: "24 Jesus told them another parable: \"The kingdom of heaven is like a man who sowed good seed in his field. 25 But while everyone was sleeping, his enemy came and sowed weeds among the wheat, and went away. 26 When the wheat sprouted and formed heads, then the weeds also appeared. 27 The owner's servants came to him and said, 'Sir, didn't you sow good seed in your field? Where then did the weeds come from?' 28 'An enemy did this,' he replied. The servants asked him, 'Do you want us to go and pull them up?' 29 'No,' he answered, 'because while you are pulling the weeds, you may uproot the wheat with them. 30 Let both grow together until the harvest. At that time I will tell the harvesters: First collect the weeds and tie them in bundles to be burned; then gather the wheat and bring it into my barn.'\"",
        ESV: "24 He put another parable before them, saying, \"The kingdom of heaven may be compared to a man who sowed good seed in his field, 25 but while his men were sleeping, his enemy came and sowed weeds among the wheat and went away. 26 So when the plants came up and bore grain, then the weeds appeared also. 27 And the servants of the master of the house came and said to him, 'Master, did you not sow good seed in your field? How then does it have weeds?' 28 He said to them, 'An enemy has done this.' So the servants said to him, 'Then do you want us to go and gather them?' 29 But he said, 'No, lest in gathering the weeds you root up the wheat along with them. 30 Let both grow together until the harvest, and at harvest time I will tell the reapers, \"Gather the weeds first and bind them in bundles to be burned, but gather the wheat into my barn.\"'\"",
        AMP: "24 Jesus gave them another parable [to consider], saying, \"The kingdom of heaven is like a man who sowed good seed in his field. 25 But while his men were sleeping, his enemy came and sowed weeds [resembling wheat] among the wheat, and went away. 26 So when the plants sprouted and formed grain, the weeds appeared also. 27 The servants of the owner came to him and said, 'Sir, did you not sow good and clean seed in your field? Then how does it have weeds in it?' 28 He replied to them, 'An enemy has done this.' The servants asked him, 'Then do you want us to go and pull them out?' 29 But he said, 'No; because as you pull out the weeds [in the act of gathering them], you may uproot the wheat with them. 30 Let them grow together until the harvest, and at harvest time I will tell the reapers, \"First gather the weeds and tie them in bundles to be burned; but gather the wheat into my barn.\"'\"",
        NLT: "24 Here is another story Jesus told: \"The Kingdom of Heaven is like a farmer who planted good seed in his field. 25 But that night as the workers slept, his enemy came and planted weeds among the wheat, then slipped away. 26 When the crop began to grow and produce grain, the weeds also grew. 27 The farmer's workers went to him and said, 'Sir, the field where you planted that good seed is full of weeds! Where did they come from?' 28 'An enemy has done this!' the farmer exclaimed. 'Should we pull out the weeds?' his workers asked. 29 'No,' he replied, 'you'll uproot the wheat if you do. 30 Let both grow together until the harvest. Then I will tell the harvesters to sort out the weeds, tie them into bundles, and burn them, and to put the wheat in the barn.'\"",
    },
    "Matthew 13:24-25": {
        KJV: "24 Another parable put he forth unto them, saying, The kingdom of heaven is likened unto a man which sowed good seed in his field: 25 But while men slept, his enemy came and sowed tares among the wheat, and went his way.",
        NKJV: '24 Another parable He put forth to them, saying: "The kingdom of heaven is like a man who sowed good seed in his field; 25 but while men slept, his enemy came and sowed tares among the wheat and went his way."',
        NIV: '24 Jesus told them another parable: "The kingdom of heaven is like a man who sowed good seed in his field. 25 But while everyone was sleeping, his enemy came and sowed weeds among the wheat, and went away."',
        ESV: '24 He put another parable before them, saying, "The kingdom of heaven may be compared to a man who sowed good seed in his field, 25 but while his men were sleeping, his enemy came and sowed weeds among the wheat and went away."',
        AMP: '24 Jesus gave them another parable [to consider], saying, "The kingdom of heaven is like a man who sowed good seed in his field. 25 But while his men were sleeping, his enemy came and sowed weeds [resembling wheat] among the wheat, and went away."',
        NLT: '24 Here is another story Jesus told: "The Kingdom of Heaven is like a farmer who planted good seed in his field. 25 But that night as the workers slept, his enemy came and planted weeds among the wheat, then slipped away."',
    },
    "Matthew 13:25": {
        KJV: "25 But while men slept, his enemy came and sowed tares among the wheat, and went his way.",
        NKJV: "25 But while men slept, his enemy came and sowed tares among the wheat and went his way.",
        NIV: "25 But while everyone was sleeping, his enemy came and sowed weeds among the wheat, and went away.",
        ESV: "25 But while his men were sleeping, his enemy came and sowed weeds among the wheat and went away.",
        AMP: "25 But while his men were sleeping, his enemy came and sowed weeds [resembling wheat] among the wheat, and went away.",
        NLT: "25 But that night as the workers slept, his enemy came and planted weeds among the wheat, then slipped away.",
    },

    "Matthew 24:43": {
        KJV: "43 But know this, that if the goodman of the house had known in what watch the thief would come, he would have watched, and would not have suffered his house to be broken up.",
        NKJV: "43 But know this, that if the master of the house had known what hour the thief would come, he would have watched and not allowed his house to be broken into.",
        NIV: "43 But understand this: If the owner of the house had known at what time of night the thief was coming, he would have kept watch and would not have let his house be broken into.",
        ESV: "43 But know this, that if the master of the house had known in what part of the night the thief was coming, he would have stayed awake and would not have let his house be broken into.",
        AMP: "43 But understand this: If the head of the house had known what time of the night the thief was coming, he would have been on the alert and would not have allowed his house to be broken into.",
        NLT: "43 Understand this: If a homeowner knew exactly when a burglar was coming, he would keep watch and not permit his house to be broken into.",
    },
    "Matthew 13:24": {
        KJV: "24 Another parable put he forth unto them, saying, The kingdom of heaven is likened unto a man which sowed good seed in his field:",
        NKJV: "24 Another parable He put forth to them, saying: 'The kingdom of heaven is like a man who sowed good seed in his field;'",
        NIV: "24 Jesus told them another parable: 'The kingdom of heaven is like a man who sowed good seed in his field.'",
        ESV: "24 He put another parable before them, saying, 'The kingdom of heaven may be compared to a man who sowed good seed in his field,'",
        AMP: "24 Jesus gave them another parable [to consider], saying, 'The kingdom of heaven is like a man who sowed good seed in his field.'",
        NLT: "24 Here is another story Jesus told: 'The Kingdom of Heaven is like a farmer who planted good seed in his field.'",
    },

    "Mark 14:38": {
        KJV: "38 Watch ye and pray, lest ye enter into temptation. The spirit truly is ready, but the flesh is weak.",
        NKJV: "38 Watch and pray, lest you enter into temptation. The spirit indeed is willing, but the flesh is weak.",
        NIV: "38 Watch and pray so that you will not fall into temptation. The spirit is willing, but the flesh is weak.",
        ESV: "38 Watch and pray that you may not enter into temptation. The spirit indeed is willing, but the flesh is weak.",
        AMP: "38 Keep actively watching and praying that you may not come into temptation; the spirit is willing, but the body is weak.",
        NLT: "38 Keep watch and pray, so that you will not give in to temptation. For the spirit is willing, but the body is weak!",
    },
    "Proverbs 6:9-11": {
        KJV: "9 How long wilt thou sleep, O sluggard? when wilt thou arise out of thy sleep? 10 Yet a little sleep, a little slumber, a little folding of the hands to sleep: 11 So shall thy poverty come as one that travelleth, and thy want as an armed man.",
        NKJV: "9 How long will you slumber, O sluggard? When will you rise from your sleep? 10 A little sleep, a little slumber, A little folding of the hands to sleep— 11 So shall your poverty come on you like a prowler, And your need like an armed man.",
        NIV: "9 How long will you lie there, you sluggard? When will you get up from your sleep? 10 A little sleep, a little slumber, a little folding of the hands to rest— 11 and poverty will come on you like a thief and scarcity like an armed man.",
        ESV: "9 How long will you lie there, O sluggard? When will you arise from your sleep? 10 A little sleep, a little slumber, a little folding of the hands to rest, 11 and poverty will come upon you like a robber, and want like an armed man.",
        AMP: '9 How long will you lie down, O lazy one? When will you arise from your sleep [and learn self-discipline]? 10 "Yet a little sleep, a little slumber, A little folding of the hands to lie down and rest"— 11 So your poverty will come like an approaching prowler who walks [slowly, but surely] And your need [will come] like an armed man [making you helpless].',
        NLT: "9 But you, lazybones, how long will you sleep? When will you wake up? 10 A little extra sleep, a little more slumber, a little folding of the hands to rest— 11 then poverty will pounce on you like a bandit; scarcity will attack you like an armed robber.",
    },
    "Isaiah 59:16": {
        KJV: "16 And he saw that there was no man, and wondered that there was no intercessor: therefore his arm brought salvation unto him; and his righteousness, it sustained him.",
        NKJV: "16 He saw that there was no man, And wondered that there was no intercessor; Therefore His own arm brought salvation for Him; And His own righteousness, it sustained Him.",
        NIV: "16 He saw that there was no one, he was appalled that there was no one to intervene; so his own arm achieved salvation for him, and his own righteousness sustained him.",
        ESV: "16 He saw that there was no man, and wondered that there was no one to intercede; then his own arm brought him salvation, and his righteousness upheld him.",
        AMP: "16 He saw that there was no man [to plead for truth and right], And He was amazed that there was no one to intercede [on behalf of truth and right]; Therefore His own arm brought salvation to Him, And His own righteousness sustained Him.",
        NLT: "16 He was amazed to see that no one intervened to help the oppressed. So he himself stepped in to save them with his strong arm, and his justice sustained him.",
    },
    "Matthew 13:28-30": {
        KJV: "28 He said unto them, An enemy hath done this. The servants said unto him, Wilt thou then that we go and gather them up? 29 But he said, Nay; lest while ye gather up the tares, ye root up also the wheat with them. 30 Let both grow together until the harvest: and in the time of harvest I will say to the reapers, Gather ye together first the tares, and bind them in bundles to burn them: but gather the wheat into my barn.",
        NKJV: "28 He said to them, 'An enemy has done this.' The servants said to him, 'Do you want us then to go and gather them up?' 29 But he said, 'No, lest while you gather up the tares you also uproot the wheat with them. 30 Let both grow together until the harvest, and at the time of harvest I will say to the reapers, \"First gather together the tares and bind them in bundles to burn them, but gather the wheat into my barn.\"'",
        NIV: "28 'An enemy did this,' he replied. The servants asked him, 'Do you want us to go and pull them up?' 29 'No,' he answered, 'because while you are pulling the weeds, you may uproot the wheat with them. 30 Let both grow together until the harvest. At that time I will tell the harvesters: First collect the weeds and tie them in bundles to be burned; then gather the wheat and bring it into my barn.'",
        ESV: "28 He said to them, 'An enemy has done this.' So the servants said to him, 'Then do you want us to go and gather them?' 29 But he said, 'No, lest in gathering the weeds you root up the wheat along with them. 30 Let both grow together until the harvest, and at harvest time I will tell the reapers, \"Gather the weeds first and bind them in bundles to be burned, but gather the wheat into my barn.\"'",
        AMP: "28 He replied to them, 'An enemy has done this.' The servants asked him, 'Then do you want us to go and pull them out?' 29 But he said, 'No; because as you pull out the weeds [in the act of gathering them], you may uproot the wheat with them. 30 Let them grow together until the harvest; and at harvest time I will tell the reapers, \"First gather the weeds and tie them in bundles to be burned; but gather the wheat into my barn.\"'",
        NLT: "28 'An enemy has done this!' the farmer exclaimed. 'Should we pull out the weeds?' his workers asked. 29 'No,' he replied, 'you’ll uproot the wheat if you do. 30 Let both grow together until the harvest. Then I will tell the harvesters to sort out the weeds, tie them into bundles, and burn them, and to put the wheat in the barn.'",
    },
};

const quizQuestions = [
    {
        q: "According to Mark 14:37, what did Jesus ask Peter?",
        a: [
            "Could you not watch one hour?",
            "Why are you afraid?",
            "Do you love me?",
            "Where is your faith?",
        ],
        correct: 0,
    },
    {
        q: "What happened while men slept in the parable?",
        a: [
            "The enemy sowed tares among the wheat",
            "The harvest was stolen",
            "A storm destroyed the crops",
            "Angels protected the field",
        ],
        correct: 0,
    },
    {
        q: "What is the main aim of this lesson?",
        a: [
            "To awaken Christians who have lost consciousness of eminent dangers",
            "To teach about farming techniques",
            "To explain the benefits of physical rest",
            "To condemn all forms of sleep",
        ],
        correct: 0,
    },
    {
        q: "What is the objective of this lesson?",
        a: [
            "That the believer may be equipped and ready to undo the wiles of the enemy",
            "To help Christians sleep better at night",
            "To teach proper prayer postures",
            "To explain dream interpretation",
        ],
        correct: 0,
    },
    {
        q: "According to the lesson, when is the enemy's advantage period?",
        a: [
            "During times of sleep, rest, and unreadiness",
            "During prayer meetings",
            "During worship services",
            "During fasting periods",
        ],
        correct: 0,
    },
    {
        q: "Why was there no immediate solution after the tares were sown?",
        a: [
            "Removing the tares would uproot the wheat as well",
            "The servants were too lazy",
            "The farmer didn't care",
            "There were no tools available",
        ],
        correct: 0,
    },
    {
        q: "According to Matthew 24:43, what would the good man do if he knew when the thief would come?",
        a: [
            "He would have watched and prevented the break-in",
            "He would have called the police",
            "He would have hidden his possessions",
            "He would have moved to another house",
        ],
        correct: 0,
    },
    {
        q: "What does the lesson warn will happen if you sleep spiritually?",
        a: [
            "Your good intentions, family, jobs, business, health and portion will be corrupted",
            "You will become physically stronger",
            "You will gain more wisdom",
            "Nothing will happen",
        ],
        correct: 0,
    },
];

const SundaySchoolApp = () => {
    const [showPaymentGate, setShowPaymentGate] = useState(true);
    const [isPaid, setIsPaid] = useState(false);
    const [activeTab, setActiveTab] = useState("intro");
    const [darkMode, setDarkMode] = useState(true);
    const [fontSize, setFontSize] = useState(16);
    const [loading, setLoading] = useState(false);
    const [appLoading, setAppLoading] = useState(true);
    const [loadingProgress, setLoadingProgress] = useState(0);
    const [scriptureDB, setScriptureDB] =
        useState<ScriptureDB>(initialScriptureDB);
    const [selectedVerse, setSelectedVerse] = useState<string | null>(null);
    const [bibleVersion, setBibleVersion] =
        useState<keyof BibleVersions>("KJV");
    const [showVerseModal, setShowVerseModal] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [newVerse, setNewVerse] = useState<{
        reference: string;
        versions: BibleVersions;
    }>({
        reference: "",
        versions: { KJV: "", NKJV: "", NIV: "", ESV: "", AMP: "", NLT: "" },
    });
    const [verseLoading, setVerseLoading] = useState(false);
    const [quizActive, setQuizActive] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(50);
    const [showResults, setShowResults] = useState(false);
    const [faithRating, setFaithRating] = useState(5);
    const [commitments, setCommitments] = useState<
        Array<{ text: string; date: string }>
    >([]);
    const [commitmentInput, setCommitmentInput] = useState("");
    const [editingContent, setEditingContent] = useState<string | null>(null);

    type SubPoint = { title: string; content: string; scripture?: string };
    type LessonPoint = {
        title: string;
        content: string;
        scriptures: string[];
        subPoints: SubPoint[];
    };
    type ContentData = {
        lessonDate: string;
        lessonTitle: string;
        memoryVerse: string;
        memoryVerseRef: string;
        introduction: string;
        introScriptures: string[];
        aims: string;
        objectives: string;
        lessonIntro: string;
        lessonPoints: LessonPoint[];
        conclusion: string;
        conclusionScriptures: string[];
        prayerPoints: string[];
    };

    const [contentData, setContentData] = useState<ContentData>({
        lessonDate: "March 22, 2015",
        lessonTitle: "The Sleep That Endangers",
        memoryVerse:
            "And he cometh and findeth them sleeping, and saith unto Peter, Simon, sleepest thou? couldest not thou watch one hour? — Mark 14:37",
        memoryVerseRef: "Mark 14:37",
        introduction:
            "Sleep is a temporary state of unconsciousness of the body. Therefore nobody is aware of his environment while asleep. This is the advantage period of the evil ones to invade unsuspecting humanity. Jesus declared that the Good man (A reasonable person) will prevent the thief if he knows his hour of attack — Matt 24:43. Unfortunately, many Christians are neither watching nor careful for Satan's next proposed hit because of the relative peace and comfort they enjoy resulting from previous efforts or grace. If one sleeps with fire on the now, he will be engulfed later.",
        introScriptures: ["Matthew 24:43"],
        aims: "To awaken Christians that have lost consciousness of eminent dangers in the present world they were delivered from.",
        objectives:
            "That the believer may be equipped and ready to undo the wiles of the enemy.",
        lessonIntro:
            "A man planted good seed in his farm and while all were asleep at due time the enemy. Corrupted the farm with his seed. Removing the evil seed was predicted to be more dangerous than leaving it with the product. Consequently, the good seed and the owner suffered the unforeseen.",
        lessonPoints: [
            {
                title: "While Men Sleep (Vs 25)",
                content:
                    "Having defined what sleep is we need to appreciate the fact that there are three types of sleep. The sleep of Death, Carnal rest and unawareness of environment. This lesson is referring more to the last two. The time of sleep is the time of rest, unreadiness, weakness, no watch, etc and that is why it is the enemy's advantage period. Evil is always infused at this period into mankind.",
                scriptures: ["Matthew 13:25"],
                subPoints: [],
            },
            {
                title: "Time of Sleep (Vs 25)",
                content:
                    "Sleep is unavoidable and there is a time when everybody sleeps but Jesus revealed that it is the opportune time of Satan. You may be justified to sleep as others either physically or mentally but refuse to sleep then because an enemy is watching for opportunity.",
                scriptures: ["Matthew 13:25"],
                subPoints: [],
            },
            {
                title: "Good Intention Corrupted (Vs 24)",
                content:
                    "This man no doubt had good intentions for planting his seed but it was the occasion of sleep that allowed for the corrupting of the seed and far. Don't allow your good intentions, family, jobs or business, health and portion to be corrupted through sleep.",
                scriptures: ["Matthew 13:24"],
                subPoints: [],
            },
            {
                title: "No Immediate Solution (Vs 28–30)",
                content:
                    "There was no immediate solution after the enemy sowed his tare among the good seed. The good seed had to strive to survive the hostility of the tares until the harvest time because of sleep. You don't want that to be your portion.",
                scriptures: ["Matthew 13:28-30"],
                subPoints: [],
            },
            {
                title: "Watching for Yourself (Mark 14:38)",
                content:
                    "When men sleep only you can watch for yourself or else your portion will be corrupted. Isa 59:16. This man sowed and went to sleep but it was his work that was corrupted. See vs 24–25.",
                scriptures: ["Mark 14:38", "Isaiah 59:16", "Matthew 13:24-25"],
                subPoints: [],
            },
        ],
        conclusion:
            "There are dangers of sleeping just because others do. Stay awake at odd hours to protect your own. Prov 6:9–11.",
        conclusionScriptures: ["Proverbs 6:9-11"],
        prayerPoints: [
            "Lord, awaken my spirit to the dangers that surround me. Help me to stay vigilant and alert at all times.",
            "Father, give me the grace to watch and pray even when others around me are sleeping spiritually.",
            "Holy Spirit, open my eyes to see the enemy's schemes before they manifest. Let me not be caught unaware.",
            "Lord, protect my family, business, health, and all that concerns me from the corruption that comes during times of spiritual sleep.",
            "Father, help me to be a watchman for my own soul. Give me the strength to stay awake when others sleep, that I may guard what You have entrusted to me.",
        ],
    });

    const formatScriptureText = (text: string) => {
        const parts = text.split(/(\d+)/);
        return parts.map((part, index) => {
            if (/^\d+$/.test(part)) {
                return (
                    <strong key={index} className="font-bold">
                        {part}
                    </strong>
                );
            }
            return <span key={index}>{part}</span>;
        });
    };

    useEffect(() => {
        const interval = setInterval(() => {
            setLoadingProgress((prev) => {
                if (prev >= 100) {
                    clearInterval(interval);
                    setTimeout(() => setAppLoading(false), 500);
                    return 100;
                }
                return prev + 10;
            });
        }, 200);
        return () => clearInterval(interval);
    }, []);

    const toggleTheme = () => setDarkMode(!darkMode);
    const adjustFontSize = (delta: number) =>
        setFontSize((prev) => Math.min(Math.max(prev + delta, 12), 24));
    const handleTabChange = (tab: string) => {
        setLoading(true);
        setTimeout(() => {
            setActiveTab(tab);
            setLoading(false);
        }, 500);
    };

    const showBibleVersions = (reference: string) => {
        setSelectedVerse(reference);
        setShowVerseModal(true);
        setVerseLoading(true);
        setTimeout(() => setVerseLoading(false), 800);
    };

    const changeBibleVersion = (version: keyof BibleVersions) => {
        setVerseLoading(true);
        setTimeout(() => {
            setBibleVersion(version);
            setVerseLoading(false);
        }, 600);
    };

    const addNewScripture = () => {
        if (
            newVerse.reference &&
            Object.values(newVerse.versions).some((v) => v !== "")
        ) {
            setScriptureDB((prev) => ({
                ...prev,
                [newVerse.reference]: newVerse.versions,
            }));
            setNewVerse({
                reference: "",
                versions: {
                    KJV: "",
                    NKJV: "",
                    NIV: "",
                    ESV: "",
                    AMP: "",
                    NLT: "",
                },
            });
            setEditMode(false);
        }
    };

    const updateVerseVersion = (version: keyof BibleVersions, text: string) => {
        setNewVerse((prev) => ({
            ...prev,
            versions: { ...prev.versions, [version]: text },
        }));
    };

    useEffect(() => {
        let timer: ReturnType<typeof setInterval> | undefined;
        if (quizActive && timeLeft > 0 && !showResults) {
            timer = setInterval(() => {
                setTimeLeft((prev) => {
                    if (prev <= 1) {
                        endQuiz();
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);
        }
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [quizActive, timeLeft, showResults]);

    const startQuiz = () => {
        setQuizActive(true);
        setCurrentQuestion(0);
        setScore(0);
        setTimeLeft(50);
        setShowResults(false);
    };

    const checkAnswer = (choice: number) => {
        if (!quizActive || showResults) return;
        const correct = quizQuestions[currentQuestion].correct === choice;
        const timeBonus = Math.floor(timeLeft / 10);
        const points = correct ? 10 + timeBonus : 0;
        if (correct) setScore((prev) => prev + points);
        if (currentQuestion < quizQuestions.length - 1) {
            setTimeout(() => setCurrentQuestion((prev) => prev + 1), 1000);
        } else {
            setTimeout(() => endQuiz(), 1000);
        }
    };

    const endQuiz = () => {
        setQuizActive(false);
        setShowResults(true);
    };

    const addCommitment = () => {
        if (commitmentInput.trim()) {
            setCommitments((prev) => [
                ...prev,
                {
                    text: commitmentInput,
                    date: new Date().toLocaleDateString(),
                },
            ]);
            setCommitmentInput("");
        }
    };

    useEffect(() => {
        const handleKeyPress = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.shiftKey && e.key === "M") {
                e.preventDefault();
                handleTabChange("manage");
            }
            if (e.ctrlKey && e.shiftKey && e.key === "E") {
                e.preventDefault();
                setEditingContent(editingContent ? null : activeTab);
            }
        };
        window.addEventListener("keydown", handleKeyPress);
        return () => window.removeEventListener("keydown", handleKeyPress);
    }, [editingContent, activeTab]);

    const updateContent = (field: string, value: string) =>
        setContentData((prev) => ({ ...prev, [field]: value }));
    const updateLessonPoint = (index: number, field: string, value: string) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === index ? { ...point, [field]: value } : point
            ),
        }));
    };
    const updatePrayerPoint = (index: number, value: string) => {
        setContentData((prev) => ({
            ...prev,
            prayerPoints: prev.prayerPoints.map((prayer, i) =>
                i === index ? value : prayer
            ),
        }));
    };
    const updateLessonSubPoint = (
        pointIndex: number,
        subIndex: number,
        field: string,
        value: string
    ) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: point.subPoints.map((sub, j) =>
                              j === subIndex ? { ...sub, [field]: value } : sub
                          ),
                      }
                    : point
            ),
        }));
    };
    const addLessonSubPoint = (pointIndex: number) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: [
                              ...point.subPoints,
                              {
                                  title: "New Point",
                                  content: "",
                                  scripture: "",
                              },
                          ],
                      }
                    : point
            ),
        }));
    };
    const deleteLessonSubPoint = (pointIndex: number, subIndex: number) => {
        setContentData((prev) => ({
            ...prev,
            lessonPoints: prev.lessonPoints.map((point, i) =>
                i === pointIndex
                    ? {
                          ...point,
                          subPoints: point.subPoints.filter(
                              (_, j) => j !== subIndex
                          ),
                      }
                    : point
            ),
        }));
    };
    const addPrayerPoint = () =>
        setContentData((prev) => ({
            ...prev,
            prayerPoints: [...prev.prayerPoints, "New prayer point..."],
        }));

    const PAYSTACK_PUBLIC_KEY =
        "pk_test_bed97038ebcf74b30219ed0500cfffc6e80948f1";
    const PAYMENT_AMOUNT = 500000;

    const handlePaystackSuccess = (reference: unknown) => {
        console.log("Payment successful:", reference);
        setIsPaid(true);
        setShowPaymentGate(false);
    };

    const handlePaystackClose = () => console.log("Payment closed");

    const initializePaystack = () => {
        if (!window.PaystackPop) {
            alert("Paystack script not loaded!");
            return;
        }
        const paystack = window.PaystackPop.setup({
            key: PAYSTACK_PUBLIC_KEY,
            email: "user@example.com",
            amount: PAYMENT_AMOUNT,
            currency: "NGN",
            reference: "SSA_" + Math.floor(Math.random() * 1000000000 + 1),
            onClose: () => handlePaystackClose(),
            callback: (transaction: PaystackResponse) =>
                handlePaystackSuccess(transaction),
        });
        paystack.openIframe();
    };

    const handleFreePlan = () => {
        setShowPaymentGate(false);
        setIsPaid(false);
    };

    const themeClasses = darkMode
        ? "bg-gradient-to-br from-gray-900 via-blue-900 to-green-900 text-white"
        : "bg-gradient-to-br from-amber-50 via-orange-50 to-rose-100 text-gray-900";

    if (appLoading) {
        return (
            <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="relative mb-8">
                        <div className="w-32 h-32 mx-auto bg-white rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-20 h-20 object-contain"
                            />
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-32 h-32 rounded-full border-4 border-white/30 animate-ping"></div>
                        </div>
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div
                                className="w-40 h-40 rounded-full border-4 border-white/20 animate-ping"
                                style={{ animationDelay: "0.3s" }}
                            ></div>
                        </div>
                    </div>
                    <h1 className="text-3xl md:text-4xl font-bold text-white mb-2">
                        Life Gate Ministries Worldwide
                    </h1>
                    <p className="text-xl text-white/90 mb-8">
                        Sunday School Lesson
                    </p>
                    <div className="text-white/80 mb-6 text-lg animate-pulse">
                        Loading Sunday School Lesson...
                    </div>
                    <div className="w-64 mx-auto bg-white/20 rounded-full h-3 overflow-hidden backdrop-blur-sm">
                        <div
                            className="h-full bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full transition-all duration-300 ease-out shadow-lg"
                            style={{ width: `${loadingProgress}%` }}
                        ></div>
                    </div>
                    <p className="text-white/70 mt-3 text-sm">
                        {loadingProgress}%
                    </p>
                </div>
            </div>
        );
    }

    if (showPaymentGate) {
        return (
            <div
                className={`min-h-screen ${themeClasses} flex items-center justify-center p-4 relative overflow-hidden`}
            >
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl -top-48 -left-48 animate-pulse"></div>
                    <div
                        className="absolute w-96 h-96 bg-blue-500/30 rounded-full blur-3xl -bottom-48 -right-48 animate-pulse"
                        style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                        className="absolute w-64 h-64 bg-pink-500/20 rounded-full blur-3xl top-1/2 left-1/2 animate-pulse"
                        style={{ animationDelay: "2s" }}
                    ></div>
                </div>
                <div className="max-w-4xl w-full relative z-10">
                    <div className="text-center mb-12">
                        <div className="w-24 h-24 mx-auto mb-6 bg-white/10 backdrop-blur-xl rounded-full flex items-center justify-center shadow-2xl border border-white/20">
                            <img
                                src={logo}
                                alt="Logo"
                                className="w-16 h-16 object-contain"
                            />
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                            Sunday School Lesson
                        </h1>
                        <p className="text-xl opacity-80">
                            The Sleep That Endangers
                        </p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition duration-300 shadow-2xl">
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">
                                        Free Access
                                    </h3>
                                    <Unlock
                                        className="text-green-400"
                                        size={32}
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold mb-2">
                                        ₦0
                                    </p>
                                    <p className="opacity-70">View Only Mode</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400"
                                        />
                                        <span>Read all lesson content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-green-400"
                                        />
                                        <span>Take interactive quizzes</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X size={20} className="text-red-400" />
                                        <span className="opacity-50">
                                            No content editing
                                        </span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <X size={20} className="text-red-400" />
                                        <span className="opacity-50">
                                            No scripture management
                                        </span>
                                    </li>
                                </ul>
                                <button
                                    onClick={handleFreePlan}
                                    className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 rounded-xl font-semibold text-white shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    Continue Free
                                </button>
                            </div>
                        </div>
                        <div className="group relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-40 transition duration-500"></div>
                            <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-8 hover:bg-white/15 transition duration-300 shadow-2xl">
                                <div className="absolute -top-3 -right-3 bg-gradient-to-r from-yellow-400 to-orange-500 text-gray-900 px-4 py-1 rounded-full text-sm font-bold shadow-lg">
                                    BEST VALUE
                                </div>
                                <div className="flex items-center justify-between mb-6">
                                    <h3 className="text-2xl font-bold">
                                        Premium Access
                                    </h3>
                                    <Lock
                                        className="text-purple-400"
                                        size={32}
                                    />
                                </div>
                                <div className="mb-6">
                                    <p className="text-4xl font-bold mb-2">
                                        ₦5,000
                                    </p>
                                    <p className="opacity-70">Full Access</p>
                                </div>
                                <ul className="space-y-3 mb-8">
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Everything in Free</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Edit all lesson content</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Manage Bible scriptures</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Save your commitments</span>
                                    </li>
                                    <li className="flex items-center gap-2">
                                        <CheckCircle
                                            size={20}
                                            className="text-purple-400"
                                        />
                                        <span>Priority support</span>
                                    </li>
                                </ul>
                                <button
                                    onClick={initializePaystack}
                                    className="w-full py-4 bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-xl font-semibold text-white shadow-lg transform hover:scale-105 transition duration-300"
                                >
                                    Unlock Premium
                                </button>
                            </div>
                        </div>
                    </div>
                    <p className="text-center mt-8 opacity-70 text-sm">
                        Secure payment powered by Paystack • All transactions
                        are encrypted
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div
            className={`min-h-screen ${themeClasses} transition-all duration-500 relative`}
            style={{ fontSize: `${fontSize}px` }}
        >
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute w-96 h-96 bg-purple-500/20 rounded-full blur-3xl top-0 left-1/4 animate-pulse"></div>
                <div
                    className="absolute w-96 h-96 bg-blue-500/20 rounded-full blur-3xl bottom-0 right-1/4 animate-pulse"
                    style={{ animationDelay: "1s" }}
                ></div>
            </div>
            <Header
                logo={logo}
                contentData={contentData}
                fontSize={fontSize}
                adjustFontSize={adjustFontSize}
                darkMode={darkMode}
                toggleTheme={toggleTheme}
            />
            <div className="container mx-auto px-4 py-8 max-w-6xl relative z-10">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                    {contentData.lessonTitle}
                </h2>
                <div className="flex gap-2 mb-6 overflow-x-auto flex-nowrap md:flex-wrap justify-start md:justify-center scrollbar-hide backdrop-blur-sm bg-white/5 p-2 rounded-2xl border border-white/10">
                    {[
                        "intro",
                        "lesson",
                        "conclusion",
                        "application",
                        "quiz",
                        "prayer",
                    ].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => handleTabChange(tab)}
                            className={`px-6 py-3 rounded-xl font-semibold transition-all flex-shrink-0 ${
                                activeTab === tab
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                    : darkMode
                                    ? "bg-white/10 backdrop-blur-md hover:bg-white/20 border border-white/10"
                                    : "bg-black/10 backdrop-blur-md hover:bg-black/20 border border-black/10"
                            }`}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                    {isPaid && (
                        <button
                            onClick={() => handleTabChange("manage")}
                            className={`px-2 py-3 rounded-xl font-semibold transition-all flex-shrink-0 opacity-0 hover:opacity-10 ${
                                activeTab === "manage"
                                    ? "bg-gradient-to-r from-purple-500 to-pink-600 text-white shadow-lg scale-105"
                                    : "bg-white/10 backdrop-blur-md"
                            }`}
                            title="Admin"
                            style={{ width: "40px" }}
                        >
                            <Edit2 size={16} className="mx-auto" />
                        </button>
                    )}
                </div>
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-blue-600"></div>
                    </div>
                )}
                {!loading && (
                    <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl shadow-2xl p-6 md:p-8">
                        {activeTab === "intro" && (
                            <div className="space-y-6">
                                {editingContent === "intro" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-blue-900/30"
                                            : "bg-blue-50"
                                    } p-6 rounded-lg border-l-4 border-blue-600`}
                                >
                                    <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                                        <BookOpen className="text-blue-600" />{" "}
                                        Memory Verse
                                    </h3>
                                    {editingContent === "intro" ? (
                                        <textarea
                                            value={contentData.memoryVerse}
                                            onChange={(e) =>
                                                updateContent(
                                                    "memoryVerse",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-4 py-2 rounded-lg border text-xl italic mb-4 ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                            rows={2}
                                        />
                                    ) : (
                                        <blockquote className="text-xl italic mb-4">
                                            "{contentData.memoryVerse}"
                                        </blockquote>
                                    )}
                                    <button
                                        onClick={() =>
                                            showBibleVersions(
                                                contentData.memoryVerseRef
                                            )
                                        }
                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    >
                                        <BookOpen size={16} />
                                        Read {contentData.memoryVerseRef}
                                    </button>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        Text: Matthew 13:24-30
                                    </h3>
                                    <div className="flex gap-2 flex-wrap">
                                        <button
                                            onClick={() =>
                                                showBibleVersions(
                                                    "Matthew 13:24-30"
                                                )
                                            }
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                        >
                                            <BookOpen size={16} />
                                            Read Matthew 13:24-30
                                        </button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-2xl font-bold mb-3">
                                        Introduction
                                    </h3>
                                    {editingContent === "intro" ? (
                                        <textarea
                                            value={contentData.introduction}
                                            onChange={(e) =>
                                                updateContent(
                                                    "introduction",
                                                    e.target.value
                                                )
                                            }
                                            className={`w-full px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                            rows={6}
                                        />
                                    ) : (
                                        <p className="leading-relaxed">
                                            {contentData.introduction}
                                        </p>
                                    )}
                                    <div className="mt-4 flex flex-wrap gap-2">
                                        {contentData.introScriptures.map(
                                            (scripture) => (
                                                <button
                                                    key={scripture}
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            scripture
                                                        )
                                                    }
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                >
                                                    <BookOpen size={14} />
                                                    {scripture}
                                                </button>
                                            )
                                        )}
                                    </div>
                                </div>
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-green-900/30"
                                            : "bg-green-50"
                                    } p-6 rounded-lg`}
                                >
                                    <h3 className="text-xl font-bold mb-3">
                                        Aims and Objectives
                                    </h3>
                                    <div className="space-y-3">
                                        <div>
                                            <strong className="text-green-700 dark:text-green-400">
                                                AIMS:
                                            </strong>
                                            {editingContent === "intro" ? (
                                                <textarea
                                                    value={contentData.aims}
                                                    onChange={(e) =>
                                                        updateContent(
                                                            "aims",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-3 py-2 rounded-lg border mt-2 ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                    rows={3}
                                                />
                                            ) : (
                                                <p>{contentData.aims}</p>
                                            )}
                                        </div>
                                        <div>
                                            <strong className="text-green-700 dark:text-green-400">
                                                OBJECTIVES:
                                            </strong>
                                            {editingContent === "intro" ? (
                                                <textarea
                                                    value={
                                                        contentData.objectives
                                                    }
                                                    onChange={(e) =>
                                                        updateContent(
                                                            "objectives",
                                                            e.target.value
                                                        )
                                                    }
                                                    className={`w-full px-3 py-2 rounded-lg border mt-2 ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                    rows={2}
                                                />
                                            ) : (
                                                <p>{contentData.objectives}</p>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "lesson" && (
                            <div className="space-y-6">
                                {editingContent === "lesson" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">
                                    Lesson Content
                                </h3>
                                {editingContent === "lesson" ? (
                                    <textarea
                                        value={contentData.lessonIntro}
                                        onChange={(e) =>
                                            updateContent(
                                                "lessonIntro",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border mb-4 ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={3}
                                    />
                                ) : (
                                    <p className="leading-relaxed mb-4">
                                        {contentData.lessonIntro}
                                    </p>
                                )}
                                <div className="space-y-6">
                                    {contentData.lessonPoints.map(
                                        (section, idx) => (
                                            <div
                                                key={idx}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-700"
                                                        : "bg-gray-50"
                                                } p-5 rounded-lg`}
                                            >
                                                {editingContent === "lesson" ? (
                                                    <>
                                                        <input
                                                            type="text"
                                                            value={
                                                                section.title
                                                            }
                                                            onChange={(e) =>
                                                                updateLessonPoint(
                                                                    idx,
                                                                    "title",
                                                                    e.target
                                                                        .value
                                                                )
                                                            }
                                                            className={`w-full px-3 py-2 rounded-lg border mb-3 text-xl font-semibold ${
                                                                darkMode
                                                                    ? "bg-gray-800 border-gray-600"
                                                                    : "bg-white border-gray-300"
                                                            }`}
                                                        />
                                                        {section.content && (
                                                            <textarea
                                                                value={
                                                                    section.content
                                                                }
                                                                onChange={(e) =>
                                                                    updateLessonPoint(
                                                                        idx,
                                                                        "content",
                                                                        e.target
                                                                            .value
                                                                    )
                                                                }
                                                                className={`w-full px-3 py-2 rounded-lg border mb-3 ${
                                                                    darkMode
                                                                        ? "bg-gray-800 border-gray-600"
                                                                        : "bg-white border-gray-300"
                                                                }`}
                                                                rows={3}
                                                            />
                                                        )}
                                                        <div className="ml-6 space-y-3 mt-3">
                                                            {section.subPoints.map(
                                                                (
                                                                    subPoint,
                                                                    subIdx
                                                                ) => (
                                                                    <div
                                                                        key={
                                                                            subIdx
                                                                        }
                                                                        className={`${
                                                                            darkMode
                                                                                ? "bg-gray-800"
                                                                                : "bg-white"
                                                                        } p-3 rounded-lg`}
                                                                    >
                                                                        <div className="flex justify-between items-start mb-2">
                                                                            <span className="text-sm font-bold text-yellow-600">
                                                                                {String.fromCharCode(
                                                                                    97 +
                                                                                        subIdx
                                                                                )}

                                                                                .
                                                                            </span>
                                                                            <button
                                                                                onClick={() =>
                                                                                    deleteLessonSubPoint(
                                                                                        idx,
                                                                                        subIdx
                                                                                    )
                                                                                }
                                                                                className="text-red-600 hover:text-red-800"
                                                                            >
                                                                                <X
                                                                                    size={
                                                                                        16
                                                                                    }
                                                                                />
                                                                            </button>
                                                                        </div>
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                subPoint.title
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "title",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Sub-point title"
                                                                            className={`w-full px-3 py-1 rounded border mb-2 text-sm font-semibold ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                        />
                                                                        <textarea
                                                                            value={
                                                                                subPoint.content
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "content",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Sub-point content"
                                                                            className={`w-full px-3 py-1 rounded border mb-2 text-sm ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                            rows={
                                                                                2
                                                                            }
                                                                        />
                                                                        <input
                                                                            type="text"
                                                                            value={
                                                                                subPoint.scripture ||
                                                                                ""
                                                                            }
                                                                            onChange={(
                                                                                e
                                                                            ) =>
                                                                                updateLessonSubPoint(
                                                                                    idx,
                                                                                    subIdx,
                                                                                    "scripture",
                                                                                    e
                                                                                        .target
                                                                                        .value
                                                                                )
                                                                            }
                                                                            placeholder="Scripture reference (optional)"
                                                                            className={`w-full px-3 py-1 rounded border text-sm ${
                                                                                darkMode
                                                                                    ? "bg-gray-700 border-gray-600"
                                                                                    : "bg-gray-50 border-gray-300"
                                                                            }`}
                                                                        />
                                                                    </div>
                                                                )
                                                            )}
                                                            <button
                                                                onClick={() =>
                                                                    addLessonSubPoint(
                                                                        idx
                                                                    )
                                                                }
                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm flex items-center gap-1"
                                                            >
                                                                <Plus
                                                                    size={14}
                                                                />{" "}
                                                                Add Sub-point
                                                            </button>
                                                        </div>
                                                    </>
                                                ) : (
                                                    <>
                                                        <h4 className="text-xl font-semibold mb-2">
                                                            {idx + 1}.{" "}
                                                            {section.title}
                                                        </h4>
                                                        {section.content && (
                                                            <p className="leading-relaxed mb-3">
                                                                {
                                                                    section.content
                                                                }
                                                            </p>
                                                        )}
                                                        {section.scriptures &&
                                                            section.scriptures
                                                                .length > 0 && (
                                                                <div className="mt-3 flex flex-wrap gap-2">
                                                                    {section.scriptures.map(
                                                                        (
                                                                            scripture
                                                                        ) => (
                                                                            <button
                                                                                key={
                                                                                    scripture
                                                                                }
                                                                                onClick={() =>
                                                                                    showBibleVersions(
                                                                                        scripture
                                                                                    )
                                                                                }
                                                                                className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition flex items-center gap-2 text-sm"
                                                                            >
                                                                                <BookOpen
                                                                                    size={
                                                                                        14
                                                                                    }
                                                                                />
                                                                                {
                                                                                    scripture
                                                                                }
                                                                            </button>
                                                                        )
                                                                    )}
                                                                </div>
                                                            )}
                                                        {section.subPoints &&
                                                            section.subPoints
                                                                .length > 0 && (
                                                                <ol className="list-[lower-alpha] ml-6 space-y-3 mt-3">
                                                                    {section.subPoints.map(
                                                                        (
                                                                            subPoint,
                                                                            subIdx
                                                                        ) => (
                                                                            <li
                                                                                key={
                                                                                    subIdx
                                                                                }
                                                                            >
                                                                                <strong>
                                                                                    {
                                                                                        subPoint.title
                                                                                    }

                                                                                    :
                                                                                </strong>{" "}
                                                                                {
                                                                                    subPoint.content
                                                                                }
                                                                                {subPoint.scripture && (
                                                                                    <button
                                                                                        onClick={() => {
                                                                                            if (
                                                                                                subPoint.scripture
                                                                                            )
                                                                                                showBibleVersions(
                                                                                                    subPoint.scripture
                                                                                                );
                                                                                        }}
                                                                                        className="ml-2 text-blue-600 hover:text-blue-800 text-sm"
                                                                                    >
                                                                                        📖
                                                                                        Read{" "}
                                                                                        {
                                                                                            subPoint.scripture
                                                                                        }
                                                                                    </button>
                                                                                )}
                                                                            </li>
                                                                        )
                                                                    )}
                                                                </ol>
                                                            )}
                                                    </>
                                                )}
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === "conclusion" && (
                            <div className="space-y-4">
                                {editingContent === "conclusion" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-4">
                                    Conclusion
                                </h3>
                                {editingContent === "conclusion" ? (
                                    <textarea
                                        value={contentData.conclusion}
                                        onChange={(e) =>
                                            updateContent(
                                                "conclusion",
                                                e.target.value
                                            )
                                        }
                                        className={`w-full px-4 py-2 rounded-lg border text-lg ${
                                            darkMode
                                                ? "bg-gray-800 border-gray-600"
                                                : "bg-white border-gray-300"
                                        }`}
                                        rows={4}
                                    />
                                ) : (
                                    <p className="text-lg leading-relaxed">
                                        {contentData.conclusion}
                                    </p>
                                )}
                                {contentData.conclusionScriptures &&
                                    contentData.conclusionScriptures.length >
                                        0 && (
                                        <div className="mt-4 flex flex-wrap gap-2">
                                            {contentData.conclusionScriptures.map(
                                                (scripture) => (
                                                    <button
                                                        key={scripture}
                                                        onClick={() =>
                                                            showBibleVersions(
                                                                scripture
                                                            )
                                                        }
                                                        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2 text-sm"
                                                    >
                                                        <BookOpen size={14} />
                                                        {scripture}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    )}
                            </div>
                        )}
                        {activeTab === "application" && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold mb-4">
                                    Personal Application
                                </h3>
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-gray-700"
                                            : "bg-gradient-to-r from-blue-50 to-indigo-50"
                                    } p-6 rounded-lg`}
                                >
                                    <h4 className="text-xl font-semibold mb-4">
                                        Spiritual Vigilance Assessment
                                    </h4>
                                    <p className="mb-4">
                                        How vigilant are you in watching and
                                        praying against spiritual sleep?
                                    </p>
                                    <div className="flex items-center gap-4">
                                        <input
                                            type="range"
                                            min="1"
                                            max="10"
                                            value={faithRating}
                                            onChange={(e) =>
                                                setFaithRating(
                                                    Number(e.target.value)
                                                )
                                            }
                                            className="flex-1"
                                        />
                                        <span className="text-2xl font-bold text-blue-600">
                                            {faithRating}/10
                                        </span>
                                    </div>
                                    <p className="mt-3 text-sm italic">
                                        {faithRating >= 8
                                            ? "Excellent vigilance! Keep watching!"
                                            : faithRating >= 5
                                            ? "Good awareness! Stay alert!"
                                            : "Increase your watchfulness!"}
                                    </p>
                                </div>
                                <div
                                    className={`${
                                        darkMode
                                            ? "bg-gray-700"
                                            : "bg-white border border-gray-200"
                                    } p-6 rounded-lg`}
                                >
                                    <h4 className="text-xl font-semibold mb-4">
                                        Personal Commitments
                                    </h4>
                                    <div className="flex flex-col sm:flex-row gap-2 mb-4">
                                        <input
                                            type="text"
                                            value={commitmentInput}
                                            onChange={(e) =>
                                                setCommitmentInput(
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your commitment..."
                                            className={`flex-1 px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                            onKeyPress={(e) =>
                                                e.key === "Enter" &&
                                                addCommitment()
                                            }
                                        />
                                        <button
                                            onClick={addCommitment}
                                            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition flex items-center justify-center gap-2 w-full sm:w-auto"
                                        >
                                            <Save size={16} /> Save
                                        </button>
                                    </div>
                                    <div className="space-y-2">
                                        {commitments.map((commitment, idx) => (
                                            <div
                                                key={idx}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-800"
                                                        : "bg-gray-50"
                                                } p-3 rounded-lg flex items-start gap-3`}
                                            >
                                                <CheckCircle
                                                    className="text-green-600 mt-1"
                                                    size={20}
                                                />
                                                <div className="flex-1">
                                                    <p>{commitment.text}</p>
                                                    <p className="text-xs opacity-70 mt-1">
                                                        {commitment.date}
                                                    </p>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {activeTab === "quiz" && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">
                                        Speed Quiz Challenge
                                    </h3>
                                    {quizActive && (
                                        <div className="flex gap-4 items-center">
                                            <div className="flex items-center gap-2">
                                                <Clock className="text-blue-600" />
                                                <span className="text-xl font-bold">
                                                    {timeLeft}s
                                                </span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Award className="text-yellow-600" />
                                                <span className="text-xl font-bold">
                                                    {score}
                                                </span>
                                            </div>
                                        </div>
                                    )}
                                </div>
                                {!quizActive && !showResults && (
                                    <div className="text-center py-12">
                                        <Award
                                            size={64}
                                            className="mx-auto mb-4 text-yellow-600"
                                        />
                                        <h4 className="text-2xl font-bold mb-4">
                                            Ready to Test Your Knowledge?
                                        </h4>
                                        <p className="mb-6 text-lg">
                                            Answer quickly for bonus points!
                                        </p>
                                        <button
                                            onClick={startQuiz}
                                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-xl font-semibold transition transform hover:scale-105"
                                        >
                                            Start Quiz
                                        </button>
                                    </div>
                                )}
                                {quizActive && !showResults && (
                                    <div>
                                        <div
                                            className={`${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-blue-50"
                                            } p-6 rounded-lg mb-6`}
                                        >
                                            <h4 className="text-xl font-semibold mb-4">
                                                Question {currentQuestion + 1}{" "}
                                                of {quizQuestions.length}
                                            </h4>
                                            <p className="text-lg mb-6">
                                                {
                                                    quizQuestions[
                                                        currentQuestion
                                                    ].q
                                                }
                                            </p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {quizQuestions[
                                                    currentQuestion
                                                ].a.map((answer, idx) => (
                                                    <button
                                                        key={idx}
                                                        onClick={() =>
                                                            checkAnswer(idx)
                                                        }
                                                        className={`${
                                                            darkMode
                                                                ? "bg-gray-800 hover:bg-gray-900"
                                                                : "bg-white hover:bg-gray-50"
                                                        } p-4 rounded-lg border-2 border-blue-600 transition transform hover:scale-105 text-left`}
                                                    >
                                                        <span className="font-bold text-blue-600 mr-2">
                                                            {String.fromCharCode(
                                                                65 + idx
                                                            )}
                                                            .
                                                        </span>
                                                        {answer}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                )}
                                {showResults && (
                                    <div className="text-center space-y-6">
                                        <Award
                                            size={80}
                                            className="mx-auto text-yellow-600"
                                        />
                                        <h4 className="text-3xl font-bold">
                                            Quiz Complete!
                                        </h4>
                                        <div
                                            className={`${
                                                darkMode
                                                    ? "bg-gray-700"
                                                    : "bg-gradient-to-r from-blue-50 to-indigo-50"
                                            } p-8 rounded-lg`}
                                        >
                                            <p className="text-5xl font-bold text-blue-600 mb-2">
                                                {score}
                                            </p>
                                            <p className="text-xl">
                                                Final Score
                                            </p>
                                            <p className="mt-4 text-lg">
                                                {score >= 100
                                                    ? "Outstanding! Excellent knowledge!"
                                                    : score >= 60
                                                    ? "Great work! Keep studying!"
                                                    : "Good effort! Review the lesson."}
                                            </p>
                                        </div>
                                        <button
                                            onClick={startQuiz}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg transition"
                                        >
                                            Try Again
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {activeTab === "prayer" && (
                            <div className="space-y-4">
                                {editingContent === "prayer" && (
                                    <div className="bg-yellow-100 dark:bg-yellow-900/30 border border-yellow-400 rounded-lg p-3 mb-4 flex items-center justify-between">
                                        <span className="flex items-center gap-2">
                                            <Edit2
                                                size={16}
                                                className="text-yellow-700"
                                            />
                                            <span className="text-yellow-700 dark:text-yellow-400 font-semibold">
                                                Edit Mode Active
                                            </span>
                                        </span>
                                        <button
                                            onClick={() =>
                                                setEditingContent(null)
                                            }
                                            className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-1 rounded text-sm"
                                        >
                                            Done Editing
                                        </button>
                                    </div>
                                )}
                                <h3 className="text-2xl font-bold mb-6">
                                    Prayer Points
                                </h3>
                                {contentData.prayerPoints.map((prayer, idx) => (
                                    <div
                                        key={idx}
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-gradient-to-r from-purple-50 to-pink-50"
                                        } p-6 rounded-lg border-l-4 border-purple-600`}
                                    >
                                        {editingContent === "prayer" ? (
                                            <textarea
                                                value={prayer}
                                                onChange={(e) =>
                                                    updatePrayerPoint(
                                                        idx,
                                                        e.target.value
                                                    )
                                                }
                                                className={`w-full px-3 py-2 rounded-lg border ${
                                                    darkMode
                                                        ? "bg-gray-800 border-gray-600"
                                                        : "bg-white border-gray-300"
                                                }`}
                                                rows={3}
                                            />
                                        ) : (
                                            <p className="text-lg leading-relaxed">
                                                {prayer}
                                            </p>
                                        )}
                                    </div>
                                ))}
                                {editingContent === "prayer" && (
                                    <button
                                        onClick={addPrayerPoint}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg transition flex items-center gap-2"
                                    >
                                        <Plus size={16} /> Add Prayer Point
                                    </button>
                                )}
                            </div>
                        )}
                        {activeTab === "manage" && isPaid && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="text-2xl font-bold">
                                        Manage Scriptures
                                    </h3>
                                    <button
                                        onClick={() => setEditMode(!editMode)}
                                        className={`${
                                            editMode
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-green-600 hover:bg-green-700"
                                        } text-white px-4 py-2 rounded-lg transition flex items-center gap-2`}
                                    >
                                        {editMode ? (
                                            <>
                                                <X size={16} /> Cancel
                                            </>
                                        ) : (
                                            <>
                                                <Edit2 size={16} /> Add New
                                            </>
                                        )}
                                    </button>
                                </div>
                                {editMode && (
                                    <div
                                        className={`${
                                            darkMode
                                                ? "bg-gray-700"
                                                : "bg-blue-50"
                                        } p-6 rounded-lg space-y-4`}
                                    >
                                        <input
                                            type="text"
                                            value={newVerse.reference}
                                            onChange={(e) =>
                                                setNewVerse({
                                                    ...newVerse,
                                                    reference: e.target.value,
                                                })
                                            }
                                            placeholder="Scripture Reference (e.g., John 3:16)"
                                            className={`w-full px-4 py-2 rounded-lg border ${
                                                darkMode
                                                    ? "bg-gray-800 border-gray-600"
                                                    : "bg-white border-gray-300"
                                            }`}
                                        />
                                        {(
                                            [
                                                "KJV",
                                                "NKJV",
                                                "NIV",
                                                "ESV",
                                                "AMP",
                                                "NLT",
                                            ] as const
                                        ).map((version) => (
                                            <div key={version}>
                                                <label className="block font-semibold mb-2">
                                                    {version}
                                                </label>
                                                <textarea
                                                    value={
                                                        newVerse.versions[
                                                            version
                                                        ] || ""
                                                    }
                                                    onChange={(e) =>
                                                        updateVerseVersion(
                                                            version,
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder={`Enter ${version} text...`}
                                                    rows={3}
                                                    className={`w-full px-4 py-2 rounded-lg border ${
                                                        darkMode
                                                            ? "bg-gray-800 border-gray-600"
                                                            : "bg-white border-gray-300"
                                                    }`}
                                                />
                                            </div>
                                        ))}
                                        <button
                                            onClick={addNewScripture}
                                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition flex items-center gap-2"
                                        >
                                            <Save size={16} /> Save Scripture
                                        </button>
                                    </div>
                                )}
                                <div className="space-y-3">
                                    {Object.keys(scriptureDB).map(
                                        (reference) => (
                                            <div
                                                key={reference}
                                                className={`${
                                                    darkMode
                                                        ? "bg-gray-700"
                                                        : "bg-white border border-gray-200"
                                                } p-4 rounded-lg`}
                                            >
                                                <h4 className="font-bold text-lg mb-2">
                                                    {reference}
                                                </h4>
                                                <button
                                                    onClick={() =>
                                                        showBibleVersions(
                                                            reference
                                                        )
                                                    }
                                                    className="text-blue-600 hover:text-blue-800 text-sm"
                                                >
                                                    View All Versions →
                                                </button>
                                            </div>
                                        )
                                    )}
                                </div>
                            </div>
                        )}
                        {activeTab === "manage" && !isPaid && (
                            <div className="text-center py-12">
                                <Lock
                                    size={64}
                                    className="mx-auto mb-4 text-purple-400"
                                />
                                <h3 className="text-2xl font-bold mb-4">
                                    Premium Feature
                                </h3>
                                <p className="mb-6">
                                    Upgrade to Premium to access scripture
                                    management
                                </p>
                                <button
                                    onClick={() => setShowPaymentGate(true)}
                                    className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white px-8 py-3 rounded-xl font-semibold"
                                >
                                    Unlock Now
                                </button>
                            </div>
                        )}
                    </div>
                )}
            </div>
            {showVerseModal && selectedVerse && (
                <div
                    className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50"
                    onClick={() => setShowVerseModal(false)}
                >
                    <div
                        className={`${
                            darkMode ? "bg-gray-800" : "bg-white"
                        } rounded-xl shadow-2xl max-w-4xl w-full max-h-[85vh] overflow-hidden`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-6 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex justify-between items-center">
                                <h3 className="text-2xl font-bold">
                                    {selectedVerse}
                                </h3>
                                <button
                                    onClick={() => setShowVerseModal(false)}
                                    className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
                                >
                                    <X size={24} />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-2 p-4 border-b border-gray-200 dark:border-gray-700 overflow-x-auto">
                            {(
                                [
                                    "KJV",
                                    "NKJV",
                                    "NIV",
                                    "ESV",
                                    "AMP",
                                    "NLT",
                                ] as const
                            ).map((version) => (
                                <button
                                    key={version}
                                    onClick={() => changeBibleVersion(version)}
                                    disabled={verseLoading}
                                    className={`px-4 py-2 rounded-lg font-semibold transition whitespace-nowrap ${
                                        bibleVersion === version
                                            ? "bg-blue-600 text-white"
                                            : darkMode
                                            ? "bg-gray-700 hover:bg-gray-600 text-gray-300"
                                            : "bg-gray-100 hover:bg-gray-200 text-gray-700"
                                    } ${
                                        verseLoading
                                            ? "opacity-50 cursor-not-allowed"
                                            : ""
                                    }`}
                                >
                                    {version}
                                </button>
                            ))}
                        </div>
                        <div
                            className="p-6 overflow-y-auto"
                            style={{ maxHeight: "calc(85vh - 180px)" }}
                        >
                            {verseLoading ? (
                                <div className="flex flex-col items-center justify-center py-12">
                                    <div className="relative w-16 h-16 mb-4">
                                        <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
                                        <div className="absolute inset-0 border-4 border-blue-600 rounded-full border-t-transparent animate-spin"></div>
                                    </div>
                                    <p className="text-gray-500 animate-pulse">
                                        Loading scripture...
                                    </p>
                                </div>
                            ) : selectedVerse &&
                              scriptureDB[selectedVerse] &&
                              scriptureDB[selectedVerse][bibleVersion] ? (
                                <div className="text-lg leading-relaxed animate-fadeIn">
                                    {formatScriptureText(
                                        scriptureDB[selectedVerse][bibleVersion]
                                    )}
                                </div>
                            ) : (
                                <p className="text-gray-500 italic">
                                    Translation not available
                                </p>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SundaySchoolApp;

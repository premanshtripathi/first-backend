import mongoose from "mongoose";
import dotenv from "dotenv";
import { faker } from "@faker-js/faker";
import bcrypt from "bcrypt";
import { DB_NAME } from "./constants.js";
import { User } from "./models/user.model.js";
import { Video } from "./models/video.model.js";

// Load env variables
dotenv.config({
    path: './.env'
});


// --- REALISTIC DATA DATASETS ---
const videoTopics = [
    "JavaScript Mastery Course",
    "Python for Data Science",
    "MERN Stack Full Tutorial",
    "Docker & Kubernetes Crash Course",
    "Machine Learning Basics",
    "How to Build a REST API",
    "Next.js vs React - What to Choose?",
    "System Design Interview Prep",
    "Elden Ring Gameplay Walkthrough",
    "Valorant Rank Push Highlights",
    "My Day in Life as a Software Engineer",
    "Travel Vlog: Trip to Japan",
    "Cooking Masterclass: Italian Pasta",
    "Tech Review: iPhone 16 Pro",
    "Crypto Trading for Beginners"
];

const videoDescriptions = [
    "In this video, we dive deep into the core concepts. Perfect for beginners and advanced users.",
    "Watch me play this intense level! Don't forget to like and subscribe.",
    "A complete step-by-step guide to building scalable applications.",
    "Vlogging my journey through the city. The food was amazing!",
    "Reviewing the latest gadget in the market. Is it worth the price?",
    "Coding a real-world project from scratch using modern best practices."
];

// --- CATEGORY 1: JAVASCRIPT & BACKEND ---

const jsTitles = [
  "Advanced Node.js: Event Loop Explained",
  "Mastering Asynchronous JavaScript: Promises vs Async/Await",
  "Build a REST API with Express and MongoDB",
  "Understanding MongoDB Aggregation Pipelines",
  "React vs Next.js: Which one to choose in 2026?",
  "Complete MERN Stack Crash Course - Part 1",
  "How to implement JWT Authentication in Node.js",
  "Socket.io Tutorial: Real-time Chat Application",
  "Dockerizing a Node.js Application",
  "Kubernetes for Beginners: Deploying your first cluster",
  "System Design: How to design a URL Shortener",
  "Optimizing React Performance with useMemo and useCallback",
  "Redux Toolkit: State Management Made Easy",
  "GraphQL vs REST: What is better for your API?",
  "Building Microservices with Node.js and RabbitMQ",
  "TypeScript for Beginners: Types, Interfaces, and Generics",
  "Debugging Node.js Applications like a Pro",
  "File Uploads in Node.js using Multer and Cloudinary",
  "Payment Gateway Integration (Stripe/Razorpay) in MERN",
  "WebSockets vs HTTP Polling: When to use what?",
  "Redis Caching Strategy for High Performance APIs",
  "Securing your Node.js API: Best Practices",
  "Server-Side Rendering (SSR) with Next.js 14",
  "Deploying MERN App to AWS EC2 (Step by Step)",
  "Introduction to CI/CD Pipelines with GitHub Actions",
  "JavaScript Closures and Hoisting Interview Questions",
  "Designing a Scalable Database Schema in MongoDB",
  "Handling Large Datasets with MongoDB Streams",
  "Creating Custom Middleware in Express.js",
  "Testing Node.js Apps with Jest and Supertest",
  "Building a Video Streaming Server with Node.js",
  "OAuth2 and Google Login Implementation",
  "Understanding the 'this' keyword in JavaScript",
  "Prototypal Inheritance in JavaScript Explained",
  "Clean Code Principles for JavaScript Developers",
  "Error Handling Best Practices in Express.js",
  "Rate Limiting and Throttling APIs in Node.js",
  "Introduction to Graph Databases (Neo4j)",
  "Scaling Node.js Applications with Clustering",
  "Zero to Hero: Full Stack Developer Roadmap 2026"
];

const jsDescriptions = [
  "In this video, we dive deep into the internal architecture of Node.js.",
  "Learn how to handle asynchronous operations effectively without callback hell.",
  "A step-by-step guide to building a production-ready API from scratch.",
  "Unlock the power of data manipulation using MongoDB's aggregation framework.",
  "Comparing the two most popular frontend technologies to help you decide.",
  "The ultimate guide to building full-stack applications using the MERN stack.",
  "Secure your application using JSON Web Tokens and best security practices.",
  "Learn how to build real-time features like chat and notifications.",
  "Containerize your application for consistent deployment across environments.",
  "Orchestrate your containers and manage scalable applications with K8s.",
  "Prepare for your system design interviews with this classic problem.",
  "Tips and tricks to make your React applications faster and smoother.",
  "Simplify your state management logic with the latest Redux tools.",
  "An objective comparison of API architectural styles.",
  "Breaking down a monolith into scalable microservices.",
  "Add static typing to your JavaScript code for better maintainability.",
  "Learn how to use the debugger and solve complex bugs efficiently.",
  "Handle file uploads securely and store them in the cloud.",
  "Monetize your application by integrating secure payment solutions.",
  "Understanding real-time communication protocols for the web.",
  "Speed up your API response times significantly using Redis caching.",
  "Protect your data and users from common web vulnerabilities.",
  "Improve SEO and initial load times with server-side rendering.",
  "Go live with your application on the world's leading cloud platform.",
  "Automate your testing and deployment workflows effortlessly.",
  "Common interview questions explained with practical examples.",
  "How to structure your data for efficiency and scalability.",
  "Process millions of records without crashing your server memory.",
  "Write reusable and modular code for your Express applications.",
  "Ensure your code works as expected with automated testing.",
  "Build your own YouTube clone backend with video streaming capabilities.",
  "Allow users to sign in with their existing social accounts.",
  "Demystifying one of the most confusing concepts in JavaScript.",
  "Understanding how objects inherit properties and methods in JS.",
  "Write code that is easy to read, understand, and maintain.",
  "Gracefully handle errors and provide meaningful responses to users.",
  "Protect your API from abuse and denial of service attacks.",
  "Explore the world of connected data and relationship-based queries.",
  "Utilize multi-core systems to improve your application's throughput.",
  "Your complete guide to becoming a hired developer this year."
];

// --- CATEGORY 2: GAMING & ESPORTS ---

const gamingTitles = [
  "GTA VI Leaked Gameplay Analysis - Is it Real?",
  "Minecraft Hardcore Survival: 100 Days Challenge",
  "Valorant Road to Radiant: Insane Reyna Ace",
  "Elden Ring: Malenia No Damage Boss Fight (Level 1)",
  "Call of Duty Warzone 3: Best Loadout for High Kills",
  "League of Legends World Championship Finals Highlights",
  "Building the Ultimate $5000 Gaming PC Setup 2026",
  "Counter-Strike 2: Global Elite Rank Up Match",
  "The Witcher 3: Next-Gen Update Full Walkthrough Part 1",
  "Cyberpunk 2077: Phantom Liberty Ending Explained",
  "Roblox Blox Fruits: How to get the new mythical fruit",
  "Apex Legends Season 22: New Legend Abilities Revealed",
  "God of War Ragnarok: Valhalla DLC All Cutscenes",
  "Fortnite Chapter 6 Battle Pass Review - Worth it?",
  "Speedrun: Super Mario Odyssey Any% in 58 Minutes",
  "Honkai Star Rail: Best F2P Team Builds Guide",
  "Genshin Impact: Pulling for the Archon (100 Wishes)",
  "Overwatch 2 Competitive: Tank Diff moments",
  "Rust: Surviving a Zerg Raid Solo - intense gameplay",
  "Escape from Tarkov: The Wiggle That Betrayed Me",
  "Baldur's Gate 3: Evil Playthrough - Dark Urge Story",
  "FIFA 26 / EA FC 26: Ultimate Team Pack Opening",
  "Resident Evil 4 Remake: Professional Mode S+ Rank Guide",
  "Hollow Knight Silksong: Release Date Finally Announced?",
  "Top 10 Open World Games to Play in 2026",
  "RTX 5090 vs RTX 4090: Is the upgrade worth it?",
  "Palworld: Catching the Legendary Pals Guide",
  "Final Fantasy VII Rebirth: Cloud vs Sephiroth Final Battle",
  "Among Us: The Impostor with 1000 IQ Plays",
  "Rocket League: Grand Champion Mechanical Progression",
  "Sea of Thieves: Stealing the Chest of Legends",
  "Terraria Master Mode: Moon Lord Boss Fight",
  "Dota 2: The International 2025 Winning Moments",
  "Stardew Valley 1.7 Update: Everything New",
  "Assassin's Creed Red (Japan): Gameplay Trailer Reaction",
  "Destiny 2: The Final Shape Raid World First Race",
  "Dark Souls 3: beating the game with a Guitar Hero controller",
  "Red Dead Redemption 2: 50 Details You Missed",
  "Civilization VII: winning a science victory on Deity",
  "Street Fighter 6: Evo 2025 Grand Finals"
];

const gamingDescriptions = [
  "Analyzing every frame of the leaked footage to see what we can expect from Rockstar's next masterpiece.",
  "Can I survive in a world where one mistake means game over? Watch the journey.",
  "Climbing the ranked ladder with some incredible plays and funny moments.",
  "Testing my patience and skill against the hardest boss in the game without taking a single hit.",
  "Dominate the lobby with this broken weapon setup before it gets patched!",
  "The most intense moments from the biggest esports tournament of the year.",
  "Assembling the most powerful components money can buy for 4K 240Hz gaming.",
  "Tactical shooter gameplay focusing on aim, strategy, and team communication.",
  "Returning to the path with enhanced graphics and new quests in this legendary RPG.",
  "Diving back into Night City to uncover the secrets of the new expansion.",
  "A complete guide on obtaining the rarest items in the game without spending Robux.",
  "Checking out the new meta and balance changes in the latest season update.",
  "Experience the emotional conclusion to Kratos and Atreus's Norse saga.",
  "Reviewing all the new skins, emotes, and map changes in the latest battle pass.",
  "Trying to break the world record with optimized movement and glitches.",
  "Free-to-play friendly strategies to clear the hardest content in the game.",
  "Testing my luck with the gacha system. Will I get the 5-star character?",
  "High-level competitive matches showcasing tank synergy and counters.",
  "Defending my base against a massive clan in this survival sandbox game.",
  "The harsh reality of trust and betrayal in extraction shooters.",
  "Making all the worst choices to see how the story changes.",
  "Opening high-tier packs to find the best players for my squad.",
  "A step-by-step walkthrough to achieve the highest rank in the hardest difficulty.",
  "Discussing the latest rumors and news about the highly anticipated sequel.",
  "Recommendations for massive worlds you can get lost in for hundreds of hours.",
  "Benchmarking the latest graphics cards to see raw performance differences.",
  "Locations and strategies to capture the strongest creatures in the game.",
  "The epic showdown we've all been waiting for in high definition.",
  "Deceiving the crew and venting away in this social deduction game.",
  "Mastering aerial control and ball physics to score incredible goals.",
  "A pirate adventure involving stealth, combat, and high-value loot.",
  "Facing the final boss with end-game gear in the hardest difficulty setting.",
  "The million-dollar plays that decided the championship.",
  "Exploring the new crops, events, and NPCs added in the latest patch.",
  "Reacting live to the world premiere of the new historical RPG.",
  "Watch our team attempt to solve the complex puzzles of the new raid first.",
  "A unique challenge run proving skill matters more than the controller.",
  "Hidden secrets and easter eggs that show the insane attention to detail.",
  "Strategizing turn by turn to overtake rival civilizations technologically.",
  "The highest level of fighting game mechanics on display."
];

// --- CATEGORY 3: VLOGS, LIFESTYLE & TECH REVIEWS ---

const vlogTitles = [
  "A Day in the Life of a Software Engineer at Google",
  "I Quit My 9-5 Job to Travel the World",
  "iPhone 17 Pro Max Unboxing & First Impressions",
  "My 5 AM Morning Routine for Extreme Productivity",
  "Japan Travel Vlog: Tokyo Street Food Tour",
  "Dream Desk Setup Tour 2026 (Minimalist & Aesthetic)",
  "What I Eat in a Day: Healthy & Budget Friendly",
  "Samsung Galaxy S26 Ultra vs iPhone 17 Pro - Camera Test",
  "Solo Camping in Heavy Rain (ASMR) - No Talking",
  "Why I Stopped Using Social Media for 30 Days",
  "Buying My Dream Car at 22! (Porsche 911)",
  "College Move-In Day Vlog: Dorm Room Tour",
  "Exploring Abandoned Places at Night (Gone Wrong)",
  "My Skincare Routine for Clear Glowing Skin",
  "How I Organize My Entire Life on Notion",
  "Living in a Van for 24 Hours: The Harsh Reality",
  "Surprising My Girlfriend with a Trip to Paris",
  "Cooking a 5-Star Gordon Ramsay Meal for $10",
  "Q&A: How Much Money Do I Make on YouTube?",
  "Pack With Me for a 3-Month Europe Trip",
  "Apartment Hunting in New York City: $3000 Budget",
  "Storytime: I Got Scammed in Bali (Watch Before You Go)",
  "Full Body Gym Workout Routine (Push Pull Legs)",
  "Building a Tiny House from Scratch - Part 1",
  "10 Things I Regret Buying in My 20s",
  "Weekend Trip to the Mountains: Cozy Cabin Vibes",
  "Study With Me 4 Hours (Pomodoro Timer) - Lofi Music",
  "Cleaning My Depression Room: Extreme Makeover",
  "Thrifting for Vintage Clothes in London",
  "Reacting to My Old Cringe Videos from 2015",
  "How to Start a Business with $0 in 2026",
  "Visiting the Most Expensive Hotel in Dubai ($20k/Night)",
  "Street Photography POV: capturing strangers in NYC",
  "Testing Viral Amazon Gadgets Under $50",
  "My Heavy Metal Detox Journey: Health Update",
  "Vlogmas Day 1: Decorating the Christmas Tree",
  "Trying the World's Spiciest Noodles Challenge",
  "My Honest Review of the Apple Vision Pro 2",
  "Moving into my First Apartment Alone!",
  "7 Habits That Changed My Life Forever"
];

const vlogDescriptions = [
  "Come along with me as I show you what a typical day looks like behind the scenes.",
  "Everything you need to know before buying this product. Is it worth the hype?",
  "The most relaxing experience ever, sounds of nature included. Wear headphones.",
  "Answering all your burning questions about my career, income, and personal life.",
  "Join me on this adventure as we explore hidden gems and local culture.",
  "A detailed look at my workspace and the gear I use daily to stay productive.",
  "Trying out the most popular food spots in the city. The sushi was incredible!",
  "My honest thoughts after using this device as my daily driver for one month.",
  "Sharing my secrets to staying organized and managing time effectively.",
  "The truth about living on the road that no one tells you. It's not always glamorous.",
  "Watch till the end for a special surprise announcement!",
  "Links to all the products mentioned are in the description below.",
  "If you enjoyed this video, please hit that like button and subscribe for more!",
  "Taking a break from the chaos to reconnect with nature.",
  "A step-by-step tutorial on how I edit my photos for Instagram."
];

// --- CATEGORY 4: ENTERTAINMENT (MUSIC & MOVIES) ---

const entertainmentTitles = [
  "Taylor Swift - The Eras Tour (Official Concert Film)",
  "Marvel Studios' Avengers: Secret Wars - Official Trailer",
  "Lofi Hip Hop Radio - Beats to Relax/Study to",
  "Arijit Singh: Live in Mumbai - Full Concert 2026",
  "The Batman Part II - Teaser Trailer (4K)",
  "Top 10 Best Movies of All Time You Must Watch",
  "Dua Lipa - New Rules (Live at Wembley)",
  "Coldplay - Fix You (Cover by Boyce Avenue)",
  "Stranger Things Season 5 - Official First Look",
  "BTS (방탄소년단) 'Dynamite' Official MV",
  "Hans Zimmer - Interstellar Main Theme (Live Performance)",
  "Avatar 3: The Seed Bearer - Exclusive Clip",
  "Eminem - Rap God (Lyrical Video)",
  "Oscar Awards 2026: Best Moments & Highlights",
  "Justin Bieber - Peaches (Remix) ft. Usher",
  "Blackpink - How You Like That (Dance Practice Video)",
  "House of the Dragon Season 3 - Official Trailer",
  "Top 50 NCS (NoCopyrightSounds) Gaming Music Mix",
  "Ed Sheeran - Shape of You (Acoustic Version)",
  "Spider-Man: Beyond the Spider-Verse - Trailer #2",
  "The Weeknd - Blinding Lights (8D Audio)",
  "Harry Potter TV Series - Cast Reveal Announcement",
  "Piano Cover: River Flows in You (Yiruma)",
  "Funny Cat Videos Compilation 2026 (Try Not To Laugh)",
  "Best Horror Movies to Watch on Netflix Right Now",
  "Imagine Dragons - Believer (Nightcore Remix)",
  "John Wick 5 - Confirm Release Date & Cast",
  "Bollywood 90s Hit Songs Jukebox - Kumar Sanu Special",
  "Drake vs Kendrick Lamar - The Final Diss Track Analysis",
  "Billie Eilish - Bad Guy (Bass Boosted)",
  "Star Wars: New Jedi Order - Teaser Trailer",
  "Classic Rock Greatest Hits: Queen, AC/DC, Guns N' Roses",
  "Anime Opening Quiz - Guess the Anime Song",
  "Post Malone - Circles (Official Audio)",
  "Shakira - Waka Waka (World Cup 2026 Opening Ceremony)",
  "Linkin Park - Numb (4K Remastered)",
  "Disney's Frozen 3 - Official Trailer",
  "Stand-up Comedy Special: Dave Chappelle Live",
  "Reaction Video: Watching 'The Exorcist' for the First Time",
  "K-Pop Random Play Dance Challenge 2026"
];

const entertainmentDescriptions = [
  "The official music video for the hit single. Stream it now on all platforms.",
  "Watch the exclusive trailer in 4K resolution. In theaters this summer.",
  "Relaxing beats to help you focus on your studies or work. 24/7 stream.",
  "A compilation of the funniest moments from the internet. You will laugh guaranteed.",
  "Experience the magic of the live performance with high-quality audio.",
  "Reacting to the most anticipated trailer of the year. Let's break it down!",
  "Covering one of my favorite songs of all time. Hope you enjoy my version.",
  "The complete soundtrack available now. Check the description for tracklist.",
  "Behind the scenes footage of the making of the movie.",
  "Join the premiere countdown and chat with other fans live!"
];

// --- CATEGORY 5: SCIENCE, SPORTS & NEWS ---

const knowledgeTitles = [
  "Quantum Physics for 7 Year Olds | Dominic Walliman",
  "History of the Roman Empire (in 10 Minutes)",
  "SpaceX Starship Launch: Live Coverage",
  "Why is the James Webb Telescope so Important?",
  "Lionel Messi vs Cristiano Ronaldo - Who is the GOAT?",
  "Cricket World Cup 2027: India vs Pakistan Highlights",
  "The Math Behind Bitcoin and Blockchain Explained",
  "How Car Engines Work - Internal Combustion Animation",
  "NBA Finals Game 7: Lakers vs Celtics Full Highlights",
  "Breaking News: Global Economy Update 2026",
  "National Geographic: The Secret Life of Lions",
  "Calculus 1: Limits and Derivatives Full Course",
  "Why Do We Dream? The Science of Sleep",
  "F1 Monaco Grand Prix 2026 - Best Overtakes",
  "Human Anatomy: The Circulatory System 3D",
  "BBC Earth: Deep Ocean Mysteries Revealed",
  "Understanding Black Holes: Event Horizon Explained",
  "Tennis: Wimbledon Final 2026 Match Point",
  "The Future of AI: Will Robots Replace Humans?",
  "Geography Now! India - Country Profile",
  "How to Solve a Rubik's Cube (Beginner Method)",
  "The Cold War: US vs USSR Documentary Part 1",
  "English Premier League: Top 10 Goals of the Season",
  "Physics: Newton's Laws of Motion with Examples",
  "Mars Colonization: When Will Humans Go?",
  "UFC 320: Main Event Knockout Reaction",
  "Chemistry: The Periodic Table Song (Updated)",
  "Psychology 101: Understanding Human Behavior",
  "Olympics 2028 Los Angeles: Opening Ceremony Leaks",
  "Climate Change: What Can We Actually Do?",
  "How Airplanes Fly: Aerodynamics Explained",
  "Stock Market for Beginners: How to Invest in 2026",
  "WWE WrestleMania 42: Surprise Returns",
  "Ancient Egypt: The Mystery of the Pyramids",
  "Super Bowl LXI Halftime Show Performance",
  "Philosophy: Stoicism as a Philosophy of Life",
  "Biology: Mitosis vs Meiosis Cell Division",
  "Chess: Magnus Carlsen vs AI - Who Wins?",
  "Formula 1: How Pit Stops Work in 2 Seconds",
  "World War II: The Battle of Stalingrad Animated"
];

const knowledgeDescriptions = [
  "Breaking down complex topics into simple, easy-to-understand explanations.",
  "Catch all the action from the match with these extended highlights.",
  "A documentary exploring the history and science behind this phenomenon.",
  "Live updates from the ground as the situation unfolds.",
  "Learn the fundamentals of this subject in this comprehensive crash course.",
  "An in-depth analysis of the strategies used by the top players.",
  "Visualizing the concepts with 3D animations and real-world examples.",
  "Discussion on the latest political and economic developments.",
  "The inspiring story of how this athlete reached the top of their sport.",
  "Exploring the universe and the laws of physics that govern it."
];

// Arrays ko merge kar lo
const allTitles = [
    ...videoTopics,
    ...jsTitles,
    ...gamingTitles,
    ...vlogTitles,
    ...entertainmentTitles,
    ...knowledgeTitles
];

const allDescriptions = [
    ...videoDescriptions,
    ...jsDescriptions,
    ...gamingDescriptions,
    ...vlogDescriptions,
    ...entertainmentDescriptions,
    ...knowledgeDescriptions
];

// Helper to pick random item
// Random Thumbnails to make UI look better
const thumbnails = [
    "https://images.unsplash.com/photo-1611162617474-5b21e879e113", // Tech
    "https://images.unsplash.com/photo-1593640408182-31c70c8268f5", // PC
    "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4", // Nature
    "https://images.unsplash.com/photo-1542204165-65bf26472b9b", // Movie
    "https://images.unsplash.com/photo-1550745165-9bc0b252726f"  // Gaming
];

// Helper function
const getRandomItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

const seedData = async () => {
    try {
        if (!process.env.MONGODB_URI) {
            console.error("❌ MONGODB_URI is missing in .env file");
            process.exit(1);
        }

        await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log("🌱 Database Connected!");

        // 1. CLEANUP
        console.log("🧹 Clearing old data...");
        await User.deleteMany({});
        await Video.deleteMany({});

        // 2. CREATE USERS
        console.log("👤 Generating Users...");
        
        // Pre-hashed password for "password123" (so that login works and insertMany is fast)
        // Note: insertMany does not trigger pre-save hooks, that is why we are sending pre-hashed password
        const hashedPassword = await bcrypt.hash("password123", 10); 

        const users = [];
        for (let i = 0; i < 50; i++) {
            users.push({
                username: faker.internet.username().toLowerCase(), 
                email: faker.internet.email(),
                fullname: faker.person.fullName(),
                password: hashedPassword,
                avatar: faker.image.avatar(),
                avatarPublicId: faker.string.uuid(),
                coverImage: faker.image.url(),
                coverImagePublicId: faker.string.uuid(),
                watchHistory: []
            });
        }

        const savedUsers = await User.insertMany(users);
        console.log(`✅ ${savedUsers.length} Users Created!`);

        // 3. CREATE VIDEOS
        console.log("📹 Generating Videos...");
        const videos = [];
        const sampleVideoUrl = "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";

        savedUsers.forEach((user) => {
            // Randomly assign 15 to 30 videos per user
            const videoCount = faker.number.int({ min: 15, max: 30 });

            for (let j = 0; j < videoCount; j++) {
                const titleBase = getRandomItem(allTitles);
                const descBase = getRandomItem(allDescriptions);
                const randomThumb = getRandomItem(thumbnails);
                const isShort = Math.random() > 0.85; // 15% chances of shorts, to decide duration of videos

                videos.push({
                    title: `${titleBase} ${faker.helpers.arrayElement(['- Full Guide', '| 4K', 'Official', 'Part ' + (j + 1)])}`,
                    description: `${descBase} \n\nIn this video, we explore ${titleBase}. Topics: ${faker.lorem.words(5)}.`,
                    videoFileUrl: sampleVideoUrl,
                    videoPublicId: faker.string.uuid(), // Schema requirement
                    thumbnailUrl: randomThumb,
                    thumbnailPublicId: faker.string.uuid(), // Schema requirement
                    duration: isShort ? faker.number.int({ min: 15, max: 59 }) : faker.number.int({ min: 120, max: 3600 }),
                    views: faker.number.int({ min: 0, max: 1000000 }),
                    isPublished: true,
                    owner: user._id,
                    createdAt: faker.date.past({ years: 2 }) // Random date in last 2 years for sorting tests
                });
            }
        });

        // Batch Insert for Speed
        await Video.insertMany(videos);
        console.log(`✅ ${videos.length} Videos Created Successfully!`);
        console.log("🚀 ALL DATA SEEDED! READY TO TEST.");

        await mongoose.disconnect();
        process.exit(0);

    } catch (error) {
        console.error("❌ Seeding Failed:", error);
        await mongoose.disconnect();
        process.exit(1);
    }
};

seedData();
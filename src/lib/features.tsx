import type { ReactNode } from "react";
import type { MegaMenuGroup, MegaMenuItem, SolutionPageContent } from "@/lib/solutions";

export type FeaturePageContent = SolutionPageContent;

const svg = (paths: ReactNode) => (s: number = 18) => (
  <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
    {paths}
  </svg>
);

// ─── Megamenu data ───
export const FEATURES_GROUPS: MegaMenuGroup[] = [
  {
    title: "Content Creation",
    items: [
      {
        icon: svg(<><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M3 10h18M8 3v4M16 3v4" /><path d="M16 14l1 1 2-2" /></>),
        label: "AI Content Calendar",
        desc: "Plan, schedule and create weeks of content in minutes.",
        href: "/features/ai-content-calendar",
      },
      {
        icon: svg(<path d="M5 3v4M3 5h4M19 13v4M17 15h4M11 3l2.5 5.5L19 11l-5.5 2.5L11 19l-2.5-5.5L3 11l5.5-2.5z" />),
        label: "Content Generator",
        desc: "Engaging, on-brand social content in seconds.",
        href: "/features/content-generator",
      },
      {
        icon: svg(<><rect x="3" y="3" width="18" height="18" rx="2" /><circle cx="9" cy="9" r="2" /><path d="M21 15l-5-5L5 21" /></>),
        label: "ThreadsShot",
        desc: "Turn your Threads posts into beautiful shareable images.",
        href: "/features/threadsshot",
      },
      {
        icon: svg(<><rect x="3" y="3" width="7" height="7" rx="1" /><rect x="14" y="3" width="7" height="7" rx="1" /><rect x="3" y="14" width="7" height="7" rx="1" /><rect x="14" y="14" width="7" height="7" rx="1" /></>),
        label: "Carousel Generator",
        desc: "Professional, engaging carousels for social media.",
        href: "/features/carousel-generator",
      },
      {
        icon: svg(<path d="M13 2L4 14h7l-1 8 9-12h-7l1-8z" />),
        label: "Post Enhancer",
        desc: "Automatically improve your posts for higher engagement.",
        href: "/features/post-enhancer",
      },
    ],
  },
  {
    title: "Publishing & Scheduling",
    items: [
      {
        icon: svg(<><circle cx="6" cy="6" r="2.5" /><circle cx="18" cy="18" r="2.5" /><circle cx="18" cy="6" r="2.5" /><path d="M8 6h8M16 16l-7-7" /></>),
        label: "Cross Posting",
        desc: "Create once, publish everywhere — no tab-switching.",
        href: "/features/cross-posting",
      },
      {
        icon: svg(<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>),
        label: "Optimal Time",
        desc: "Publish at the perfect moment for maximum engagement.",
        href: "/features/optimal-time",
      },
      {
        icon: svg(<><rect x="3" y="6" width="18" height="14" rx="2" /><path d="M7 3v4M17 3v4M3 11h18M8 16h2M14 16h2" /></>),
        label: "Bulk Scheduling",
        desc: "Schedule multiple posts at once and save hours.",
        href: "/features/bulk-scheduling",
      },
      {
        icon: svg(<path d="M3 12a9 9 0 0 1 15-6.7L21 8M21 3v5h-5M21 12a9 9 0 0 1-15 6.7L3 16M3 21v-5h5" />),
        label: "Recurring Posts",
        desc: "Automate regular content with smart scheduling.",
        href: "/features/recurring-posts",
      },
      {
        icon: svg(<><circle cx="12" cy="13" r="8" /><path d="M12 9v4l2.5 2.5M9 2h6M12 5V2" /></>),
        label: "Auto Scheduling",
        desc: "Let AI pick the best publishing times for your posts.",
        href: "/features/auto-scheduling",
      },
    ],
  },
  {
    title: "AI & Intelligence",
    items: [
      {
        icon: svg(<><path d="M21 12a9 9 0 1 1-3.5-7.1L21 3v5h-5" /><path d="M9 12h.01M12 12h.01M15 12h.01" /></>),
        label: "Ask The Agentcy",
        desc: "Your always-on content strategist obsessed with growth.",
        href: "/features/ask-the-agentcy",
      },
      {
        icon: svg(<path d="M4 20V10M10 20V4M16 20v-7M22 20H2" />),
        label: "AI Insights & Analytics",
        desc: "Deep understanding of how your content performs.",
        href: "/features/ai-insights",
      },
      {
        icon: svg(<><path d="M20 12l-7 7a2 2 0 0 1-2.8 0L3 11.7V4h7.7L20 12.5a2 2 0 0 1 0 2.8z" /><circle cx="7" cy="8" r="1.2" /></>),
        label: "Smart Tag",
        desc: "Auto-categorize and boost reach with AI-powered tags.",
        href: "/features/smart-tag",
      },
      {
        icon: svg(<path d="M3 17l6-6 4 4 8-8M14 7h7v7" />),
        label: "Trend Signals",
        desc: "Stay ahead with real-time insights on trending topics.",
        href: "/features/trend-signals",
      },
      {
        icon: svg(<path d="M7 8c-2 0-3 1.5-3 3.5S5 15 7 15c0 2 1 3 3 3M17 8c2 0 3 1.5 3 3.5S19 15 17 15c0 2-1 3-3 3" />),
        label: "Capture Essence",
        desc: "Extract the core message from any content for social posts.",
        href: "/features/capture-essence",
      },
    ],
  },
  {
    title: "Management & Collaboration",
    items: [
      {
        icon: svg(<><path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><circle cx="12" cy="13" r="2.5" /></>),
        label: "Media Library",
        desc: "Organize and access all your visual content in one place.",
        href: "/features/media-library",
      },
      {
        icon: svg(<><path d="M14 3H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" /><path d="M14 3v6h6M8 13h8M8 17h6" /></>),
        label: "Post Templates",
        desc: "Create consistent content with customizable templates.",
        href: "/features/post-templates",
      },
      {
        icon: svg(<><rect x="3" y="3" width="18" height="18" rx="2" /><path d="M8 12l3 3 5-6" /></>),
        label: "Post Review",
        desc: "Streamline content approval with smart review flows.",
        href: "/features/post-review",
      },
      {
        icon: svg(<><path d="M21 11.5a8 8 0 0 1-12.3 6.7L3 20l1.8-5.7A8 8 0 1 1 21 11.5z" /><path d="M9 11h.01M13 11h.01M17 11h.01" /></>),
        label: "Auto Replies",
        desc: "Never keep your audience waiting with smart auto-replies.",
        href: "/features/auto-replies",
      },
      {
        icon: svg(<><path d="M9 18h6M10 22h4" /><path d="M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.2 1 2V17h6v-.3c0-.8.4-1.5 1-2A7 7 0 0 0 12 2z" /></>),
        label: "Post Suggestions",
        desc: "Never run out of ideas with AI-powered suggestions.",
        href: "/features/post-suggestions",
      },
    ],
  },
];

// ─── Per-slug page content ───
export const FEATURE_PAGES: Record<string, FeaturePageContent> = {
  "ai-content-calendar": {
    tagline: "A calendar that fills itself.",
    intro:
      "Drop your goals, your voice, and your platforms. The Agentcy plans, drafts, and queues weeks of content automatically — you just approve.",
    benefits: [
      { title: "Drag-and-drop month view", desc: "See every brand, channel, and post in one place. Reorder with a flick." },
      { title: "AI fills the gaps", desc: "Empty slots auto-populate with on-brand drafts based on your strategy." },
      { title: "Lock and forget", desc: "Approved posts lock in. Everything else stays editable until publish." },
    ],
    painPoints: [
      "Sunday night arrives and the calendar is still blank.",
      "You promised three posts a week and shipped one.",
      "Every platform has its own scheduler, and none of them talk to each other.",
    ],
    proofQuote: {
      quote: "I went from a blank calendar every Sunday to a month of posts ready to ship by Friday.",
      author: "Renata B.",
      role: "Solo creator, fitness niche",
    },
    accent: "violet",
  },
  "content-generator": {
    tagline: "Brand-on copy in seconds, not hours.",
    intro:
      "Describe what you want — or paste a link, transcript, or article. Get on-brand drafts across every platform without rewriting from scratch.",
    benefits: [
      { title: "Voice-trained drafts", desc: "Trained on your past posts so every output sounds like you, not generic AI." },
      { title: "Multi-platform variants", desc: "One brief, optimized variants for X, Instagram, LinkedIn, TikTok, and more." },
      { title: "One-click regenerate", desc: "Don't love it? Tweak the angle, tone, or length and regenerate instantly." },
    ],
    painPoints: [
      "ChatGPT outputs sound like a press release nobody asked for.",
      "Rewriting AI drafts takes longer than writing the post yourself.",
      "Brand voice drifts a little more with every freelancer or tool.",
    ],
    proofQuote: {
      quote: "It is the first AI generator that actually sounds like me. I rewrite maybe 10% before publishing.",
      author: "Felix O.",
      role: "Indie founder",
    },
    accent: "violet",
  },
  "threadsshot": {
    tagline: "Turn Threads posts into shareable images.",
    intro:
      "Your best Threads deserve a longer shelf life. Auto-generate beautifully formatted post screenshots ready to share on Instagram, X, and LinkedIn.",
    benefits: [
      { title: "Pixel-perfect templates", desc: "Designed by humans, generated by AI — never another grainy screenshot." },
      { title: "Brand color presets", desc: "Pick your palette once. Every export matches your visual identity." },
      { title: "One-click cross-post", desc: "Send straight to Instagram, X, or LinkedIn without leaving the queue." },
    ],
    painPoints: [
      "Your best Threads die twelve hours after they post.",
      "Manual screenshots look amateur next to designed posts.",
      "There is no easy way to give a great Threads post a second life.",
    ],
    proofQuote: {
      quote: "My best Threads now go viral on Instagram a week later. Same content, three platforms.",
      author: "Cassie P.",
      role: "Creator, 180K followers",
    },
    accent: "violet",
  },
  "carousel-generator": {
    tagline: "Carousels that actually get swipes.",
    intro:
      "Type a topic and get a fully designed multi-slide carousel — hook, body, closer — built to convert. Edit any slide before publishing.",
    benefits: [
      { title: "Hook-tested templates", desc: "First slide built around proven hooks that earn the second swipe." },
      { title: "Auto layout", desc: "Text, images, and pacing handled for you. No fighting with grid systems." },
      { title: "Instant on-brand styling", desc: "Brand fonts and colors applied to every slide — no manual cleanup." },
    ],
    painPoints: [
      "Building a single carousel in Canva eats an hour.",
      "Slide two has the highest drop-off — and you do not know why.",
      "You skip carousels entirely because the design polish takes too long.",
    ],
    proofQuote: {
      quote: "Carousels used to be my biggest content bottleneck. Now I publish three a week without thinking.",
      author: "Marcus T.",
      role: "B2B creator, LinkedIn",
    },
    accent: "violet",
  },
  "post-enhancer": {
    tagline: "One click. Better post. Higher reach.",
    intro:
      "Your draft is good. Let The Agentcy make it sharper — better hooks, tighter copy, smarter CTAs — without losing your voice.",
    benefits: [
      { title: "Hook A/B suggestions", desc: "Three rewritten openers ranked by predicted engagement." },
      { title: "Tighten without flattening", desc: "Cuts filler while preserving the rhythm and tone of your voice." },
      { title: "CTA optimizer", desc: "Suggests stronger asks based on what is working in your niche this week." },
    ],
    painPoints: [
      "Drafts go live without polish because you ran out of time.",
      "Weak hooks bury your best ideas after one scroll.",
      "Engagement swings wildly between posts and you cannot tell why.",
    ],
    proofQuote: {
      quote: "Average post engagement up 38% in two weeks. Same posts, sharper edges.",
      author: "Idris K.",
      role: "Newsletter operator",
    },
    accent: "violet",
  },
  "cross-posting": {
    tagline: "Write once. Publish everywhere.",
    intro:
      "One post auto-adapts to every platform — character limits, hashtag styles, image ratios, link previews. No tab-switching. No copy-paste.",
    benefits: [
      { title: "Platform-aware variants", desc: "Each platform gets the right format, length, and tone — automatically." },
      { title: "Image auto-resize", desc: "Vertical, square, landscape — generated from one source asset." },
      { title: "Link unfurl preview", desc: "See exactly how each link will render before you ship." },
    ],
    painPoints: [
      "Five tabs, five tools, the same post pasted five times.",
      "Hashtags break on platforms that handle them differently.",
      "Images get cropped in ways you only notice after publishing.",
    ],
    proofQuote: {
      quote: "I post to seven platforms in the time it used to take me to post to one.",
      author: "Sara M.",
      role: "Marketing lead, Series A startup",
    },
    accent: "cyan",
  },
  "optimal-time": {
    tagline: "Publish when your audience is actually awake.",
    intro:
      "The Agentcy learns when your followers engage and queues every post for its highest-impact moment — automatically, per platform, per audience.",
    benefits: [
      { title: "Per-audience timing", desc: "Different audiences, different peak windows — handled separately." },
      { title: "Per-platform optimization", desc: "Your X audience and your LinkedIn audience are not the same people." },
      { title: "Auto re-queue", desc: "Missed a slot? The next-best time is locked in automatically." },
    ],
    painPoints: [
      "You post when you have time — which is when your audience is asleep.",
      "Reach swings 80% between posts and you cannot explain it.",
      "Peak windows pass while you are still picking the right photo.",
    ],
    proofQuote: {
      quote: "Same content, double the reach. The only thing that changed was when it went live.",
      author: "Kenji A.",
      role: "Tech educator",
    },
    accent: "cyan",
  },
  "bulk-scheduling": {
    tagline: "A month of posts, queued in fifteen minutes.",
    intro:
      "Upload, paste, or generate dozens of posts at once. Map them to a calendar in one drag, and let The Agentcy publish them when the time is right.",
    benefits: [
      { title: "CSV and paste import", desc: "Drop a sheet, a doc, or a wall of text — we parse the rest." },
      { title: "Drag-grid scheduling", desc: "Spread posts across days and platforms with a single gesture." },
      { title: "Save as recurring sequence", desc: "Turn a great batch into a reusable monthly template." },
    ],
    painPoints: [
      "Scheduling one post at a time burns hours every week.",
      "Calendar gaps appear every Friday because you ran out of steam.",
      "Batch days never actually happen — there is always something more urgent.",
    ],
    proofQuote: {
      quote: "Sundays are mine again. I batch a month in one sitting.",
      author: "Naomi V.",
      role: "Coach and creator",
    },
    accent: "cyan",
  },
  "recurring-posts": {
    tagline: "Evergreen content on autopilot.",
    intro:
      "Your best-performing posts deserve a second life — and a third. Set them to recur on a smart schedule that respects your audience and avoids repetition.",
    benefits: [
      { title: "Per-platform cadence", desc: "Repost monthly on LinkedIn, weekly on X — without writing the rules yourself." },
      { title: "Auto-rewrite for variety", desc: "Each rerun gets a fresh hook so it does not feel like a repost." },
      { title: "Pause around launches", desc: "Recurring queues automatically yield when you are running a campaign." },
    ],
    painPoints: [
      "Your best posts get a single shot at reach, then disappear.",
      "Manual reposting feels lazy and your audience notices.",
      "There is no system to track what evergreen content has been reused when.",
    ],
    proofQuote: {
      quote: "Half my impressions now come from posts I wrote six months ago.",
      author: "Theo R.",
      role: "Solo SaaS founder",
    },
    accent: "cyan",
  },
  "auto-scheduling": {
    tagline: "AI picks the slot. You stay in flow.",
    intro:
      "Skip the calendar dance. Mark a post as ready and Auto Scheduling drops it into the next high-impact slot — balanced across platforms and time of day.",
    benefits: [
      { title: "Smart slot fill", desc: "Empty calendar gaps get filled automatically with your best-fit content." },
      { title: "Per-platform balance", desc: "No accidental cluster of three Reels in one afternoon." },
      { title: "Timezone aware", desc: "If your audience is in three regions, your queue respects them." },
    ],
    painPoints: [
      "You spend more time picking publish times than writing posts.",
      "Launches overlap with regular content and dilute both.",
      "Calendar Tetris fatigue is real and it kills creative momentum.",
    ],
    proofQuote: {
      quote: "I stopped thinking about scheduling. The Agentcy got it right every time.",
      author: "Vera L.",
      role: "Director of marketing, agency client",
    },
    accent: "cyan",
  },
  "ask-the-agentcy": {
    tagline: "Your always-on content strategist.",
    intro:
      "An AI strategist trained on your account, audience, and niche. Ask it anything — what to post, why a post flopped, how to hit your next milestone.",
    benefits: [
      { title: "Live performance Q&A", desc: "Ask why a post worked or what to ship next — get specific, accountable answers." },
      { title: "Niche-aware advice", desc: "Knows your space, your competitors, and what is performing this week." },
      { title: "Proactive growth nudges", desc: "Surfaces opportunities before you think to ask for them." },
    ],
    painPoints: [
      "Content decisions are made on gut feeling because there is no one to ask.",
      "It is midnight and you have a question only a strategist could answer.",
      "There is no clear path from where you are to your next milestone.",
    ],
    proofQuote: {
      quote: "It is like having a head of content on Slack 24/7. Without the salary.",
      author: "Damon H.",
      role: "Indie newsletter founder",
    },
    accent: "pink",
  },
  "ai-insights": {
    tagline: "Analytics that tell you what to do next.",
    intro:
      "Numbers without action are noise. The Agentcy reads your performance and tells you exactly which post types, times, and topics deserve more attention.",
    benefits: [
      { title: "Cross-platform unified view", desc: "Every account, every metric, in one dashboard — no more tab juggling." },
      { title: "Pattern detection", desc: "Surfaces what is actually moving the needle, not just what is loud." },
      { title: "Weekly action briefs", desc: "Three concrete moves to make this week, ranked by predicted impact." },
    ],
    painPoints: [
      "Your dashboard is full of numbers and empty of direction.",
      "Metrics live in five different tools, none of which agree.",
      "You read your analytics weekly and your behavior never changes.",
    ],
    proofQuote: {
      quote: "First analytics tool I actually open more than once a week.",
      author: "Rita C.",
      role: "Brand marketer",
    },
    accent: "pink",
  },
  "smart-tag": {
    tagline: "Tags that grow your reach, not your guesswork.",
    intro:
      "The Agentcy auto-tags every post with the hashtags, keywords, and topics most likely to surface it. No more stale lists from 2022.",
    benefits: [
      { title: "Per-platform optimization", desc: "Different tag strategies for X, Instagram, LinkedIn, and TikTok." },
      { title: "Stale-tag detection", desc: "Warns when a tag has stopped pulling reach so you can refresh." },
      { title: "Competitor-driven discovery", desc: "Surfaces tags from accounts winning in your niche this month." },
    ],
    painPoints: [
      "You copy-paste the same hashtag list you saved in 2022.",
      "You have no idea which of those tags actually do anything.",
      "Reach has plateaued and tags are a black box.",
    ],
    proofQuote: {
      quote: "Discoverability up 60%. I have not manually picked a hashtag in months.",
      author: "Nuria F.",
      role: "Lifestyle creator",
    },
    accent: "pink",
  },
  "trend-signals": {
    tagline: "Catch trends before they peak.",
    intro:
      "Real-time signals from your niche, surfaced before the topic saturates. Get drafted angles in your voice — ready to publish in minutes.",
    benefits: [
      { title: "Niche-specific detection", desc: "Trends that matter in your space, not the generic global feed." },
      { title: "AI-drafted angles", desc: "Three takes per trend, each in your voice, ready to refine." },
      { title: "Saturation warnings", desc: "Get a heads-up before everyone is posting the same hot take." },
    ],
    painPoints: [
      "You catch trends three days late, when the post would have hit hardest on day one.",
      "Everyone in your niche posts the same exact take and yours gets buried.",
      "Manual trend hunting eats your morning before you write a single word.",
    ],
    proofQuote: {
      quote: "Three of my top posts this quarter came directly from Trend Signals alerts.",
      author: "Pablo S.",
      role: "Crypto and tech creator",
    },
    accent: "pink",
  },
  "capture-essence": {
    tagline: "From any source to social-ready, instantly.",
    intro:
      "Drop a link, transcript, PDF, or video. The Agentcy extracts the core ideas and turns them into a week of posts, threads, and clips.",
    benefits: [
      { title: "Works on any source", desc: "Articles, podcasts, videos, PDFs, even raw notes — we parse it all." },
      { title: "Multi-format output", desc: "One source becomes posts, threads, carousels, and short clips." },
      { title: "Voice preserved", desc: "Outputs sound like you, not the source material's author." },
    ],
    painPoints: [
      "Long-form content dies after one social post and a forgotten link.",
      "Manually clipping a podcast for social takes hours per episode.",
      "Key insights stay buried in transcripts nobody re-reads.",
    ],
    proofQuote: {
      quote: "One podcast becomes 24 posts in five minutes. I record more, write less.",
      author: "Gigi A.",
      role: "Podcast host",
    },
    accent: "pink",
  },
  "media-library": {
    tagline: "Every asset, finally findable.",
    intro:
      "All your photos, videos, logos, and brand assets in one searchable home — auto-tagged, version-controlled, and ready to use in any post.",
    benefits: [
      { title: "AI auto-tagging", desc: "Search by who is in the photo, what is happening, or which campaign it belongs to." },
      { title: "Reusable asset blocks", desc: "Save logos, intros, outros, and stickers as one-click blocks." },
      { title: "Version history", desc: "See every edit, restore any version, share a clean link with stakeholders." },
    ],
    painPoints: [
      "Assets are scattered across Drive, Dropbox, Figma, and someone's DMs.",
      "You cannot find that one logo file when a deadline is in 30 minutes.",
      "The same photo gets used twice in a week because nobody saw the first one.",
    ],
    proofQuote: {
      quote: "I have not asked 'where did I save that?' in three months.",
      author: "Owen J.",
      role: "Brand designer in-house",
    },
    accent: "emerald",
  },
  "post-templates": {
    tagline: "Your best post, on tap.",
    intro:
      "Save any winning post as a template. Reuse the structure, swap the content, keep your voice — without starting from scratch each time.",
    benefits: [
      { title: "One-click reuse", desc: "Open a template, fill in the new angle, ship — three minutes end to end." },
      { title: "Auto-fill brand voice", desc: "Templates respect your tone, vocabulary, and CTA style automatically." },
      { title: "Team-shared library", desc: "Standardize what works across your whole team or client roster." },
    ],
    painPoints: [
      "You rebuild the same post layout from scratch every Monday.",
      "Team members write in subtly different styles and brand drifts.",
      "The template library you started in Notion is two months out of date.",
    ],
    proofQuote: {
      quote: "We standardized on 12 templates. Output tripled and the brand finally feels consistent.",
      author: "Imani D.",
      role: "Head of social, DTC brand",
    },
    accent: "emerald",
  },
  "post-review": {
    tagline: "Approvals without the email chain.",
    intro:
      "A clean review flow with comments, threaded feedback, and one-click approvals. Stakeholders see exactly what will go live, on every platform.",
    benefits: [
      { title: "Per-platform previews", desc: "What clients see is what publishes — no more 'wait, that is not how it looked'." },
      { title: "Threaded comments", desc: "Feedback lives on the post, not in a Slack thread you cannot find later." },
      { title: "Client-ready link sharing", desc: "Share a clean preview without giving up account access." },
    ],
    painPoints: [
      "Approval threads live across email, Loom, Notion, and a WhatsApp group.",
      "Clients reply with screenshots, emojis, and 'can you make it pop more'.",
      "Revisions get lost and the wrong version goes live.",
    ],
    proofQuote: {
      quote: "Review cycles dropped from three days to three hours.",
      author: "Léa M.",
      role: "Account manager, content agency",
    },
    accent: "emerald",
  },
  "auto-replies": {
    tagline: "Never leave a comment unanswered.",
    intro:
      "AI-generated replies that sound like you, ready to send with one tap. Keep momentum on every post without living in the comments tab.",
    benefits: [
      { title: "Voice-trained replies", desc: "Suggested responses match your tone — never generic 'Thanks!' spam." },
      { title: "One-tap send", desc: "Approve and publish in a second. Triage 50 comments in under five minutes." },
      { title: "Spam and troll triage", desc: "Auto-filter low-signal noise so you only see what is worth your time." },
    ],
    painPoints: [
      "Your best comments go ignored for hours and momentum dies.",
      "The first 60 minutes after publishing are the most important — and you are in a meeting.",
      "Engagement obligations burn out the creator faster than the content does.",
    ],
    proofQuote: {
      quote: "Comment engagement doubled. I am replying without burning my evenings.",
      author: "Yara N.",
      role: "Lifestyle and food creator",
    },
    accent: "emerald",
  },
  "post-suggestions": {
    tagline: "Never face a blank cursor again.",
    intro:
      "Personalized post ideas every morning — based on your niche, voice, audience, and what is working right now. Pick, edit, ship.",
    benefits: [
      { title: "Morning ideas digest", desc: "Five fresh, on-brand ideas waiting in your inbox by 8am." },
      { title: "Trend-aware", desc: "Suggestions tied to what is actually moving in your space this week." },
      { title: "One-click expand", desc: "Pick an idea and get a full draft, ready to refine and publish." },
    ],
    painPoints: [
      "The idea well dries up by mid-week, and posting cadence breaks.",
      "You end up posting the same topics on repeat and your audience notices.",
      "Forced posting kills your voice — every post starts to sound performative.",
    ],
    proofQuote: {
      quote: "I open the app, pick three ideas, ship by lunch. Posting is a habit again.",
      author: "Reza T.",
      role: "Operator and B2B creator",
    },
    accent: "emerald",
  },
};

// ─── Helpers ───
export function getFeatureItemBySlug(slug: string): { item: MegaMenuItem; group: MegaMenuGroup } | null {
  for (const group of FEATURES_GROUPS) {
    const item = group.items.find((i) => i.href === `/features/${slug}`);
    if (item) return { item, group };
  }
  return null;
}

export function getAllFeatureSlugs(): string[] {
  return FEATURES_GROUPS.flatMap((g) => g.items).map((i) => i.href.replace("/features/", ""));
}

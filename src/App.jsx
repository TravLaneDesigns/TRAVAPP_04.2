import React, { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Car,
  Grid3X3,
  HelpCircle,
  Info,
  Map,
  Music,
  NotebookTabs,
  RotateCcw,
  Scissors,
  Settings,
  Shuffle,
  Star,
  Trophy,
  Type,
  Volume2,
  VolumeX,
} from "lucide-react";
import { loadSaveData, saveData } from "./utils/storage";

const SAVE_KEY = "fun-always-road-trip-v1";

const WORD_BANKS = {
  Animals: ["giraffe", "elephant", "dolphin", "penguin", "turtle", "hamster", "raccoon", "falcon"],
  Food: ["pizza", "sandwich", "cupcake", "pretzel", "popcorn", "taco", "waffle", "nachos"],
  "Movies & TV": ["batman", "frozen", "spongebob", "shrek", "avatar", "bluey", "highlander", "ghostbusters", "star trek", "doctor who"],
  Travel: ["highway", "suitcase", "dashboard", "license", "vacation", "turnpike", "airport", "postcard"],
  Random: ["radio", "bridge", "motel", "billboard", "reststop", "snacks", "flashlight", "compass"],
};

const GAME_MODES = ["1v1", "1 vs AI", "Local Multiplayer"];

const RPS_CHOICES = [
  { id: "rock", label: "Rock", icon: "✊" },
  { id: "paper", label: "Paper", icon: "📄" },
  { id: "scissors", label: "Scissors", icon: "✂️" },
];

const TWENTY_QUESTIONS_PROMPTS = [
  "Think of an animal. Everyone else gets 20 yes-or-no questions.",
  "Think of a movie or TV character. Everyone else gets 20 yes-or-no questions.",
  "Think of a place. Everyone else gets 20 yes-or-no questions.",
  "Think of an object you would find in a car. Everyone else gets 20 yes-or-no questions.",
  "Think of a food. Everyone else gets 20 yes-or-no questions.",
  "Think of anything. Everyone else gets 20 yes-or-no questions.",
];

const PAPER_VARIANTS = Array.from({ length: 10 }).map((_, i) => {
  const a = 10 + i * 8;
  const b = 85 - i * 5;
  const c = 22 + i * 6;
  return `radial-gradient(circle at ${a % 92}% ${c % 90}%, rgba(255,255,255,.32), transparent 18%), radial-gradient(circle at ${b % 92}% ${80 - (i * 7) % 70}%, rgba(120,80,20,.15), transparent 24%), linear-gradient(${35 + i * 17}deg, transparent 0 48%, rgba(0,0,0,.07) 49%, transparent 52%)`;
});

const STICKERS = [
  { id: "roadRookie", icon: "🚗", name: "Road Rookie", rule: "Play 1 game", unlocked: (stats) => stats.gamesPlayed >= 1 },
  { id: "firstVictory", icon: "⭐", name: "First Victory", rule: "Win 1 game", unlocked: (stats) => stats.totalWins >= 1 },
  { id: "backseatBoss", icon: "🎒", name: "Backseat Boss", rule: "Play 10 games", unlocked: (stats) => stats.gamesPlayed >= 10 },
  { id: "tttTitan", icon: "❌", name: "Tic-Tac-Toe Titan", rule: "Win 10 Tic-Tac-Toe games", unlocked: (stats) => stats.tictactoeWins >= 10 },
  { id: "hangmanHero", icon: "🪢", name: "Hangman Hero", rule: "Solve 10 words", unlocked: (stats) => stats.hangmanSolved >= 10 },
  { id: "boxBoss", icon: "⬜", name: "Box Boss", rule: "Win 5 Dots & Boxes games", unlocked: (stats) => stats.dotsWins >= 5 },
  { id: "questionWizard", icon: "❓", name: "Question Wizard", rule: "Play 10 rounds", unlocked: (stats) => stats.questionsPlayed >= 10 },
  { id: "rpsChampion", icon: "✂️", name: "RPS Champion", rule: "Win 25 rounds", unlocked: (stats) => stats.rpsWins >= 25 },
  { id: "dinoDriver", icon: "🦖", name: "Dino Driver", rule: "Play 25 games", unlocked: (stats) => stats.gamesPlayed >= 25 },
  { id: "roadWarrior", icon: "🌟", name: "Road Warrior", rule: "Play 100 games", unlocked: (stats) => stats.gamesPlayed >= 100 },
];

const RULES = {
  tictactoe: ["Players take turns placing X's and O's.", "Get 3 in a row to win.", "Rows, columns, and diagonals count.", "If the board fills up, it is a draw."],
  hangman: ["Guess the hidden word one letter at a time.", "Correct letters appear in the word.", "Wrong letters add strikes.", "Solve the word before 6 wrong guesses."],
  dots: ["Take turns drawing lines between dots.", "Complete the fourth side of a box to claim it.", "Claiming a box gives you another turn.", "Most boxes wins."],
  questions: ["One player thinks of something.", "Everyone else asks yes-or-no questions.", "You get 20 questions total.", "Guess before the questions run out."],
  rps: ["Rock crushes scissors.", "Scissors cuts paper.", "Paper covers rock.", "Win more rounds than your opponent."],
};

const DEFAULT_SETTINGS = {
  muted: false,
  sfxVolume: 70,
  musicVolume: 35,
  contentRating: "PG-13",
  paperMode: "Random",
  lockedPaper: 0,
};

const DEFAULT_STATS = {
  ownerName: "",
  gamesPlayed: 0,
  totalWins: 0,
  tictactoeWins: 0,
  aiVictories: 0,
  hangmanSolved: 0,
  dotsWins: 0,
  questionsPlayed: 0,
  rpsWins: 0,
  rpsLosses: 0,
  rpsTies: 0,
  boxesClaimed: 0,
  xp: 0,
roadTokens: 0,
stickerCredits: 0,
fartFragments: 0,

statesCollected: [],
landmarksCollected: [],
secretAchievements: [],

dailyGoalsCompleted: 0,
appOpens: 0,
journalOpens: 0,
stickersCollected: 0,
};
const STATES = [
  const STATES = [
  {
    id: "PA",
    name: "Pennsylvania",
    nickname: "Keystone State",
    capital: "Harrisburg",
    statehood: "December 12, 1787",
    bird: "Ruffed Grouse",
    flower: "Mountain Laurel",
    funFact: "Home to Independence Hall and the Liberty Bell."
  },
  {
    id: "OH",
    name: "Ohio",
    nickname: "Buckeye State",
    capital: "Columbus",
    statehood: "March 1, 1803",
    bird: "Northern Cardinal",
    flower: "Scarlet Carnation",
    funFact: "Home of the Rock and Roll Hall of Fame."
  },
  {
    id: "NY",
    name: "New York",
    nickname: "Empire State",
    capital: "Albany",
    statehood: "July 26, 1788",
    bird: "Eastern Bluebird",
    flower: "Rose",
    funFact: "Home of the Statue of Liberty."
  },
  {
    id: "MD",
    name: "Maryland",
    nickname: "Old Line State",
    capital: "Annapolis",
    statehood: "April 28, 1788",
    bird: "Baltimore Oriole",
    flower: "Black-Eyed Susan",
    funFact: "Home of the U.S. Naval Academy."
  }
];
];
function Button({ children, onClick, className = "", type = "button" }) {
  return <button type={type} onClick={onClick} className={className}>{children}</button>;
}

function WobblyText({ children, className = "", marker = false }) {
  const text = String(children);
  return (
    <span className={`inline-block ${className}`}>
      {text.split("").map((char, index) => {
        if (char === " ") return <span key={index}> </span>;
        const rotate = [-5, 3, -2, 5, -4, 2][index % 6];
        const y = [-1, 2, 0, -2, 1][index % 5];
        const scale = [1.05, 0.92, 1.12, 0.98, 1.08][index % 5];
        return (
          <span
            key={index}
            className="inline-block"
            style={{
              transform: `rotate(${rotate}deg) translateY(${y}px) scale(${scale})`,
              textShadow: marker
                ? "2px 2px 0 rgba(255,255,255,.35), -1px 0 0 rgba(0,0,0,.16)"
                : "1px 1px 0 rgba(255,255,255,.35), 0 0 1px rgba(0,0,0,.25)",
              letterSpacing: marker ? "0.02em" : "0.015em",
            }}
          >
            {char}
          </span>
        );
      })}
    </span>
  );
}

function MarkerTitle({ children, className = "" }) {
  return <WobblyText marker className={`font-black uppercase ${className}`}>{children}</WobblyText>;
}

function CrayonText({ children, className = "" }) {
  if (typeof children !== "string" && typeof children !== "number") {
    return <span className={`font-black ${className}`}>{children}</span>;
  }
  return <WobblyText className={`font-black ${className}`}>{children}</WobblyText>;
}

function NotebookPage({ children, paperVariant = 0, cover = false, ownerName = "" }) {
  return (
    <main className="min-h-screen p-3 sm:p-6 text-slate-950 overflow-hidden [font-family:'Comic_Sans_MS','Comic_Neue','Trebuchet_MS',cursive]" style={{ background: "linear-gradient(135deg, #7a4d2a, #c9965b 50%, #6f4425)" }}>
      <div className="mx-auto max-w-5xl relative">
        {!cover && (
          <div className="absolute -top-2 left-8 right-8 h-7 flex justify-around z-20 pointer-events-none">
            {Array.from({ length: 11 }).map((_, i) => <div key={i} className="h-9 w-5 rounded-full border-4 border-slate-700 bg-slate-300 shadow-md" />)}
          </div>
        )}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, rotate: cover ? -3 : 0 }}
          animate={{ opacity: 1, scale: 1, rotate: cover ? -3 : 0 }}
          transition={{ type: "spring", stiffness: 120, damping: 18 }}
          className={`relative overflow-hidden ${cover ? "rounded-[2.25rem] border-[6px] border-yellow-900/50" : "rounded-[2rem] border-4 border-yellow-700/40"} shadow-2xl min-h-[calc(100vh-48px)] px-5 sm:px-10 py-10 sm:py-14`}
          style={{
            backgroundColor: cover ? "#f0c64b" : "#f8ec83",
            backgroundImage: cover
              ? "radial-gradient(circle at 20% 20%, rgba(255,255,255,.35), transparent 18%), radial-gradient(circle at 85% 82%, rgba(80,40,10,.18), transparent 24%), linear-gradient(135deg, transparent 0 70%, rgba(0,0,0,.08) 71%, transparent 74%)"
              : `${PAPER_VARIANTS[paperVariant % PAPER_VARIANTS.length]}, linear-gradient(90deg, transparent 0 72px, rgba(220,38,38,.55) 73px, transparent 75px), repeating-linear-gradient(to bottom, transparent 0px, transparent 31px, rgba(59,130,246,.42) 32px, transparent 33px)`,
          }}
        >
          {cover ? (
            <>
              <div className="absolute right-0 top-0 h-24 w-24 bg-yellow-100/80 border-l-4 border-b-4 border-yellow-900/40 rounded-bl-[2rem] shadow-inner" />
              <div className="absolute left-6 top-6 text-5xl rotate-[-12deg] drop-shadow-sm">⭐</div>
              <div className="absolute right-20 top-28 text-6xl rotate-12 drop-shadow-sm">🚗</div>
              <div className="absolute left-20 bottom-28 text-5xl rotate-6 drop-shadow-sm">😎</div>
              <div className="absolute right-16 bottom-24 text-5xl -rotate-12 drop-shadow-sm">☀️</div>
              <div className="absolute left-1/2 bottom-10 text-5xl rotate-12 opacity-70 drop-shadow-sm">✏️</div>
            </>
          ) : (
            <>
              <div className="absolute left-5 top-24 bottom-8 flex flex-col gap-7 opacity-25 pointer-events-none">
                {Array.from({ length: 14 }).map((_, i) => <div key={i} className="h-4 w-4 rounded-full bg-slate-900" />)}
              </div>
              <div className="absolute right-8 top-20 rotate-12 text-5xl opacity-25 pointer-events-none">🚗</div>
              <div className="absolute right-16 bottom-16 -rotate-12 text-5xl opacity-25 pointer-events-none">⭐</div>
              <div className="absolute left-24 bottom-8 rotate-6 text-4xl opacity-25 pointer-events-none">✏️</div>
            </>
          )}
          <div className={`relative z-10 ${cover ? "" : "pl-10 sm:pl-16"}`}>{children}</div>
          {!cover && ownerName && <p className="absolute bottom-3 right-8 text-sm font-black text-slate-700 rotate-[-2deg]">{ownerName}'s Road Trip Notebook</p>}
        </motion.div>
      </div>
    </main>
  );
}

function ScribbleButton({ children, onClick, variant = "primary", className = "" }) {
  const styles = variant === "primary" ? "bg-slate-950 text-yellow-100 hover:bg-slate-800" : "bg-yellow-100/90 text-slate-950 hover:bg-yellow-50 border-2 border-slate-950";
  return <button
    type="button"
    onClick={onClick}
    className={`rounded-2xl px-5 py-5 text-base font-black shadow-[4px_4px_0_rgba(15,23,42,.85)] active:translate-x-1 active:translate-y-1 active:shadow-none ${styles} ${className}`}
  >
    <CrayonText>{children}</CrayonText>
  </button>;
}

function HandCard({ children, className = "" }) {
  return <div className={`rounded-[1.75rem] border-[3px] border-slate-950 bg-yellow-50/60 shadow-[8px_8px_0_rgba(15,23,42,.8)] ${className}`}>{children}</div>;
}

function PenDoodle({ children, className = "" }) {
  return <span className={`inline-block drop-shadow-sm ${className}`}>{children}</span>;
}

function ModePicker({ mode, setMode }) {
  return <div className="flex flex-wrap justify-center gap-3 mb-5">{GAME_MODES.map((item) => <button key={item} onClick={() => setMode(item)} className={`rounded-2xl px-4 py-2 border-2 border-slate-950 font-black shadow-[3px_3px_0_rgba(15,23,42,.85)] ${mode === item ? "bg-slate-950 text-yellow-100" : "bg-yellow-100 text-slate-950"}`}><CrayonText>{item}</CrayonText></button>)}</div>;
}

function GameHeader({ title, setPage, onReset, rotatePaper, openRules }) {
  return (
    <div className="flex flex-wrap gap-3 justify-between items-center mb-6">
      <ScribbleButton variant="secondary" onClick={() => { rotatePaper?.(); setPage("home"); }}><ArrowLeft className="mr-2 h-4 w-4" /> Games</ScribbleButton>
      <h1 className="text-3xl sm:text-5xl text-center rotate-[-1deg] underline decoration-blue-500 underline-offset-8"><MarkerTitle>{title}</MarkerTitle></h1>
      <div className="flex gap-2">
        <ScribbleButton variant="secondary" onClick={openRules}><Info className="h-4 w-4" /></ScribbleButton>
        <ScribbleButton variant="secondary" onClick={() => { rotatePaper?.(); onReset?.(); }}><RotateCcw className="mr-2 h-4 w-4" /> Reset</ScribbleButton>
      </div>
    </div>
  );
}

function CoverPage({ openNotebook }) {
  return (
    <NotebookPage cover>
      <div className="min-h-[calc(100vh-160px)] flex flex-col items-center justify-center text-center gap-8">
        <motion.div initial={{ y: 12, rotate: -2 }} animate={{ y: [12, 4, 12], rotate: [-2, 1, -2] }} transition={{ duration: 3, repeat: Infinity }} className="space-y-2">
          <h1 className="text-6xl sm:text-8xl font-black leading-none uppercase drop-shadow-sm">
            <span className="text-blue-700 block rotate-[-4deg]"><MarkerTitle>FuN?</MarkerTitle></span>
            <span className="text-red-700 block rotate-[2deg]"><MarkerTitle>ALwaYs!</MarkerTitle></span>
            <span className="text-green-700 block rotate-[-1deg]"><MarkerTitle>RoAd TRiP!</MarkerTitle></span>
          </h1>
          <p className="text-2xl text-slate-800 rotate-[-2deg]"><CrayonText>games for the road</CrayonText></p>
        </motion.div>
        <button onClick={openNotebook} className="rounded-[2rem] border-4 border-slate-950 bg-yellow-100 px-8 py-5 text-2xl font-black shadow-[7px_7px_0_rgba(15,23,42,.85)] active:translate-x-1 active:translate-y-1 active:shadow-none rotate-[-2deg]"><MarkerTitle>OPEN NOTEBOOK</MarkerTitle></button>
        <p className="absolute bottom-5 right-8 text-sm font-black text-slate-700 rotate-[-3deg]">v1.0</p>
      </div>
    </NotebookPage>
  );
}

function OwnerPage({ ownerName, setOwnerName, finishOwner }) {
  return (
    <NotebookPage paperVariant={0}>
      <div className="min-h-[calc(100vh-180px)] flex items-center justify-center">
        <HandCard className="p-8 max-w-xl w-full text-center space-y-6 rotate-[-1deg]">
          <h1 className="text-4xl sm:text-5xl"><MarkerTitle>This notebook belongs to:</MarkerTitle></h1>
          <input value={ownerName} onChange={(e) => setOwnerName(e.target.value)} onKeyDown={(e) => e.key === "Enter" && finishOwner()} className="w-full rounded-3xl border-4 border-slate-950 bg-yellow-100 p-4 text-center text-3xl font-black" placeholder="Your name" />
          <ScribbleButton onClick={finishOwner}>Start Playing</ScribbleButton>
        </HandCard>
      </div>
    </NotebookPage>
  );
}

function Home({ setPage, paperVariant, rotatePaper, stats }) {
  const games = [
    { id: "tictactoe", title: "Tic-Tac-Toe", icon: <Grid3X3 className="h-8 w-8" />, desc: "Classic two-player grid duel." },
    { id: "hangman", title: "Hangman", icon: <Type className="h-8 w-8" />, desc: "Guess PG-13 road-trip words." },
    { id: "dots", title: "Dots & Boxes", icon: <Grid3X3 className="h-8 w-8" />, desc: "Connect dots and claim boxes." },
    { id: "questions", title: "20 Questions", icon: <HelpCircle className="h-8 w-8" />, desc: "Ask yes-or-no questions." },
    { id: "rps", title: "Rock Paper Scissors", icon: <Scissors className="h-8 w-8" />, desc: "Fast rounds with scorekeeping." },
  ];
  const unlockedCount = STICKERS.filter((s) => s.unlocked(stats)).length;
  const menuCards = [
  { id: "game", title: "G.A.M.E.", icon: <Trophy className="h-8 w-8" />, desc: "Goals, Achievements, Milestones, and Extras." },
  { id: "journal", title: "Trip Journal", icon: <NotebookTabs className="h-8 w-8" />, desc: "Stats, notes, and road memories." },
  { id: "stickers", title: "Sticker Book", icon: <Star className="h-8 w-8" />, desc: "See your unlocked stickers." },
];
  return (
    <NotebookPage paperVariant={paperVariant} ownerName={stats.ownerName}>
      <div className="space-y-8 pb-8">
        <header className="space-y-3">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border-2 border-slate-950 bg-yellow-100 p-3 rotate-[-4deg] shadow-[4px_4px_0_rgba(15,23,42,.85)]"><Car className="h-8 w-8" /></div>
              <div>
                <h1 className="text-4xl sm:text-6xl font-black tracking-tight uppercase rotate-[-1deg] leading-tight"><span className="text-blue-700"><MarkerTitle>FuN?</MarkerTitle></span><br /><span className="text-red-700"><MarkerTitle>ALwaYs!</MarkerTitle></span><br /><span className="text-green-700"><MarkerTitle>RoAd TRiP!</MarkerTitle></span></h1>
                <p className="text-slate-700 mt-1 text-lg"><CrayonText>Pick a game and have fun!</CrayonText></p>
              </div>
            </div>
            <div className="flex gap-2">
  <button onClick={() => { rotatePaper(); setPage("game"); }} className="rounded-2xl border-2 border-slate-950 bg-yellow-100 p-3 shadow-[4px_4px_0_rgba(15,23,42,.85)] rotate-[-3deg]"><Trophy className="h-7 w-7" /></button>
  <button onClick={() => { rotatePaper(); setPage("passport"); }} className="rounded-2xl border-2 border-slate-950 bg-yellow-100 p-3 shadow-[4px_4px_0_rgba(15,23,42,.85)] rotate-1"><Map className="h-7 w-7" /></button>
  <button onClick={() => { rotatePaper(); setPage("journal"); }} className="rounded-2xl border-2 border-slate-950 bg-yellow-100 p-3 shadow-[4px_4px_0_rgba(15,23,42,.85)] rotate-[-2deg]"><NotebookTabs className="h-7 w-7" /></button>
  <button onClick={() => { rotatePaper(); setPage("stickers"); }} className="rounded-2xl border-2 border-slate-950 bg-yellow-100 p-3 shadow-[4px_4px_0_rgba(15,23,42,.85)] rotate-2"><Star className="h-7 w-7" /></button>
  <button onClick={() => { rotatePaper(); setPage("settings"); }} className="rounded-2xl border-2 border-slate-950 bg-yellow-100 p-3 shadow-[4px_4px_0_rgba(15,23,42,.85)] rotate-3"><Settings className="h-7 w-7" /></button>
</div>
          </div>
          <div className="flex items-center gap-3 text-yellow-700"><Star className="fill-current" /><span className="text-slate-800"><CrayonText>🚗 road trip games • {unlockedCount}/{STICKERS.length} stickers</CrayonText></span><Star className="fill-current" /></div>
        </header>
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {games.map((game, index) => <motion.div key={game.id} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: index * 0.05 }}><button onClick={() => { rotatePaper(); setPage(game.id); }} className="group text-left w-full"><HandCard className="p-5 min-h-56 transition group-hover:-translate-y-1 group-hover:rotate-[-1deg]"><div className="rounded-2xl bg-yellow-100 border-2 border-slate-950 p-3 w-fit mb-4 rotate-[-5deg]">{game.icon}</div><h2 className="text-2xl underline decoration-blue-500 decoration-2 underline-offset-4"><CrayonText>{game.title}</CrayonText></h2><p className="text-slate-700 mt-3 text-lg"><CrayonText>{game.desc}</CrayonText></p><p className="mt-5 text-slate-950"><CrayonText>Play →</CrayonText></p></HandCard></button></motion.div>)}
        </section>
      </div>
    </NotebookPage>
  );
}

function SettingsPage({ setPage, paperVariant, rotatePaper, settings, updateSettings, resetStats }) {
  return (
    <NotebookPage paperVariant={paperVariant}>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6"><ScribbleButton variant="secondary" onClick={() => { rotatePaper(); setPage("home"); }}><ArrowLeft className="mr-2 h-4 w-4" /> Menu</ScribbleButton><h1 className="text-4xl sm:text-6xl uppercase underline decoration-blue-500 underline-offset-8"><MarkerTitle>Settings</MarkerTitle></h1><div className="w-28" /></div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8">
        <HandCard className="p-5 space-y-5"><h2 className="text-3xl flex items-center gap-2"><PenDoodle><Volume2 /></PenDoodle> <MarkerTitle>Audio</MarkerTitle></h2><button onClick={() => updateSettings({ muted: !settings.muted })} className="rounded-2xl border-4 border-slate-950 bg-yellow-100 p-4 font-black text-xl w-full flex items-center justify-center gap-3 shadow-[4px_4px_0_rgba(15,23,42,.85)]">{settings.muted ? <VolumeX /> : <Volume2 />}<CrayonText>{settings.muted ? "Muted" : "Sound On"}</CrayonText></button><label className="block text-xl"><CrayonText>Sound Effects: {settings.sfxVolume}%</CrayonText><input type="range" min="0" max="100" value={settings.sfxVolume} onChange={(e) => updateSettings({ sfxVolume: Number(e.target.value) })} className="w-full mt-2" /></label><label className="block font-black text-xl"><span className="flex items-center gap-2"><PenDoodle><Music /></PenDoodle> <CrayonText>Music: {settings.musicVolume}%</CrayonText></span><input type="range" min="0" max="100" value={settings.musicVolume} onChange={(e) => updateSettings({ musicVolume: Number(e.target.value) })} className="w-full mt-2" /></label></HandCard>
        <HandCard className="p-5 space-y-4"><h2 className="text-3xl"><MarkerTitle>Content</MarkerTitle></h2>{["Kid Safe", "PG-13", "Mature Later"].map((rating) => <button key={rating} onClick={() => rating !== "Mature Later" && updateSettings({ contentRating: rating })} className={`block w-full text-left rounded-2xl border-2 border-slate-950 px-4 py-3 font-black ${settings.contentRating === rating ? "bg-blue-200" : "bg-yellow-100"} ${rating === "Mature Later" ? "opacity-50" : ""}`}><CrayonText>{settings.contentRating === rating ? "●" : "○"} {rating}</CrayonText></button>)}</HandCard>
        <HandCard className="p-5 space-y-4"><h2 className="text-3xl"><MarkerTitle>Paper Wrinkles</MarkerTitle></h2><button onClick={() => updateSettings({ paperMode: "Random" })} className={`block w-full text-left rounded-2xl border-2 border-slate-950 px-4 py-3 font-black ${settings.paperMode === "Random" ? "bg-blue-200" : "bg-yellow-100"}`}><CrayonText>● Random</CrayonText></button><div className="grid grid-cols-2 gap-2">{Array.from({ length: 10 }).map((_, i) => <button key={i} onClick={() => updateSettings({ paperMode: `Wrinkle ${i + 1}`, lockedPaper: i })} className={`rounded-2xl border-2 border-slate-950 px-3 py-2 font-black ${settings.lockedPaper === i && settings.paperMode !== "Random" ? "bg-blue-200" : "bg-yellow-100"}`}><CrayonText>#{i + 1}</CrayonText></button>)}</div></HandCard>
        <HandCard className="p-5 space-y-4"><h2 className="text-3xl"><MarkerTitle>Notebook Extras</MarkerTitle></h2><button onClick={() => { rotatePaper(); setPage("journal"); }} className="block w-full text-left rounded-2xl border-2 border-slate-950 bg-yellow-100 px-4 py-3 font-black"><CrayonText>📔 Trip Journal</CrayonText></button><button onClick={() => { rotatePaper(); setPage("stickers"); }} className="block w-full text-left rounded-2xl border-2 border-slate-950 bg-yellow-100 px-4 py-3 font-black"><CrayonText>⭐ Sticker Book</CrayonText></button><button onClick={resetStats} className="block w-full text-left rounded-2xl border-2 border-slate-950 bg-red-100 px-4 py-3 font-black"><CrayonText>💾 Reset Stats</CrayonText></button></HandCard>
      </div>
    </NotebookPage>
  );
}
function GAMEPage({ setPage, paperVariant, rotatePaper, stats }) {
  const unlockedCount = STICKERS.filter((s) => s.unlocked(stats)).length;

  return (
    <NotebookPage paperVariant={paperVariant} ownerName={stats.ownerName}>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <ScribbleButton variant="secondary" onClick={() => { rotatePaper(); setPage("home"); }}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Menu
        </ScribbleButton>
        <h1 className="text-4xl sm:text-6xl uppercase underline decoration-blue-500 underline-offset-8">
          <MarkerTitle>G.A.M.E.</MarkerTitle>
        </h1>
        <div className="text-4xl">🏆</div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pb-8">
        <HandCard className="p-6"><h2 className="text-3xl"><MarkerTitle>Goals</MarkerTitle></h2><p className="text-xl font-black mt-3">Coming soon.</p></HandCard>
        <HandCard className="p-6"><h2 className="text-3xl"><MarkerTitle>Achievements</MarkerTitle></h2><p className="text-xl font-black mt-3">{unlockedCount}/{STICKERS.length} unlocked.</p></HandCard>
        <HandCard className="p-6"><h2 className="text-3xl"><MarkerTitle>Milestones</MarkerTitle></h2><p className="text-xl font-black mt-3">{stats.gamesPlayed} games played.</p></HandCard>
        <HandCard className="p-6"><h2 className="text-3xl"><MarkerTitle>Extras</MarkerTitle></h2><p className="text-xl font-black mt-3">Sounds, rewards, and secrets later.</p></HandCard>
      </div>
    </NotebookPage>
  );
}

function PassportPage({ setPage, paperVariant, rotatePaper, stats }) {
  const [stateIndex, setStateIndex] = useState(0);
const state = STATES[stateIndex];
  return (
    <NotebookPage paperVariant={paperVariant} ownerName={stats.ownerName}>
      <div className="flex flex-wrap justify-between items-center gap-3 mb-6">
        <ScribbleButton variant="secondary" onClick={() => { rotatePaper(); setPage("home"); }}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Menu
        </ScribbleButton>
        <h1 className="text-4xl sm:text-6xl uppercase underline decoration-blue-500 underline-offset-8">
          <MarkerTitle>Passport</MarkerTitle>
        </h1>
        <div className="text-4xl">🇺🇸</div>
      </div>

      <HandCard className="p-6 space-y-3">
<div className="flex items-center gap-3 flex-wrap">
  <button
    onClick={() => setStateIndex((stateIndex - 1 + STATES.length) % STATES.length)}
    className="rounded-xl border-2 border-slate-950 bg-yellow-100 px-3 py-1"
  >
    ◀
  </button>

  <h2 className="text-4xl">
    <MarkerTitle>{state.name}</MarkerTitle>
  </h2>

  <button
    onClick={() => setStateIndex((stateIndex + 1) % STATES.length)}
    className="rounded-xl border-2 border-slate-950 bg-yellow-100 px-3 py-1"
  >
    ▶
  </button>
</div>  <p className="text-xl font-black">Nickname: {state.nickname}</p>
  <p className="text-xl font-black">Capital: {state.capital}</p>
  <p className="text-xl font-black">Statehood: {state.statehood}</p>
  <p className="text-xl font-black">Bird: {state.bird}</p>
  <p className="text-xl font-black">Flower: {state.flower}</p>
  <p className="text-xl font-black">Fun Fact: {state.funFact}</p>
</HandCard>
    </NotebookPage>
  );
}
function StickerBook({ setPage, paperVariant, rotatePaper, stats }) {
  return <NotebookPage paperVariant={paperVariant} ownerName={stats.ownerName}><div className="flex flex-wrap justify-between items-center gap-3 mb-6"><ScribbleButton variant="secondary" onClick={() => { rotatePaper(); setPage("home"); }}><ArrowLeft className="mr-2 h-4 w-4" /> Menu</ScribbleButton><h1 className="text-4xl sm:text-6xl uppercase underline decoration-blue-500 underline-offset-8"><MarkerTitle>Sticker Book</MarkerTitle></h1><div className="text-4xl">🦖</div></div><div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 pb-8">{STICKERS.map((sticker, i) => { const unlocked = sticker.unlocked(stats); return <HandCard key={sticker.id} className={`p-5 text-center min-h-44 transition ${unlocked ? "rotate-[-1deg]" : "opacity-55 grayscale"}`}><div className="text-5xl mb-2">{unlocked ? sticker.icon : "⬜"}</div><h2 className="text-2xl"><CrayonText>{unlocked ? sticker.name : "Mystery Sticker"}</CrayonText></h2><p className="text-slate-700 mt-2"><CrayonText>{unlocked ? "Unlocked!" : sticker.rule}</CrayonText></p><p className="text-xs font-black mt-3 text-slate-500">#{i + 1}</p></HandCard>; })}</div></NotebookPage>;
}

function TripJournal({ setPage, paperVariant, rotatePaper, stats }) {
  const earned = STICKERS.filter((sticker) => sticker.unlocked(stats)).length;
  return <NotebookPage paperVariant={paperVariant} ownerName={stats.ownerName}><div className="flex flex-wrap justify-between items-center gap-3 mb-6"><ScribbleButton variant="secondary" onClick={() => { rotatePaper(); setPage("home"); }}><ArrowLeft className="mr-2 h-4 w-4" /> Menu</ScribbleButton><h1 className="text-4xl sm:text-6xl uppercase underline decoration-blue-500 underline-offset-8"><MarkerTitle>Trip Journal</MarkerTitle></h1><div className="text-4xl">🚗</div></div><div className="grid grid-cols-1 lg:grid-cols-2 gap-5 pb-8"><HandCard className="p-6 space-y-3"><h2 className="text-3xl"><MarkerTitle>Road Notes</MarkerTitle></h2><p className="text-2xl font-black">Games Played: {stats.gamesPlayed}</p>
    <p className="text-2xl font-black">
  🤖 AI Victories: {stats.aiVictories}
</p>
<p className="text-2xl font-black">Total Wins: {stats.totalWins}</p><p className="text-2xl font-black">Stickers Earned: {earned}/{STICKERS.length}</p><p className="text-2xl font-black">Road Miles: {stats.gamesPlayed * 7}</p></HandCard><HandCard className="p-6 space-y-3"><h2 className="text-3xl"><MarkerTitle>Game Stats</MarkerTitle></h2><p className="font-black text-xl">Tic-Tac-Toe Wins: {stats.tictactoeWins}</p><p className="font-black text-xl">Hangman Words Solved: {stats.hangmanSolved}</p><p className="font-black text-xl">Dots & Boxes Wins: {stats.dotsWins}</p><p className="font-black text-xl">Boxes Claimed: {stats.boxesClaimed}</p><p className="font-black text-xl">20 Questions Rounds: {stats.questionsPlayed}</p><p className="font-black text-xl">RPS Wins/Losses/Ties: {stats.rpsWins}/{stats.rpsLosses}/{stats.rpsTies}</p></HandCard><HandCard className="p-6 lg:col-span-2"><h2 className="text-3xl flex items-center gap-2"><PenDoodle><Map /></PenDoodle> <MarkerTitle>Coming Later</MarkerTitle></h2><p className="text-xl font-bold text-slate-700 mt-2">States visited, Road Trip Passport, and Interstate Explorer will live here when we build Version 1.5.</p></HandCard></div></NotebookPage>;
}

function RulesPage({ gameId, title, setPage, paperVariant, rotatePaper, ownerName }) {
  return <NotebookPage paperVariant={paperVariant} ownerName={ownerName}><div className="flex flex-wrap justify-between items-center gap-3 mb-6"><ScribbleButton variant="secondary" onClick={() => { rotatePaper(); setPage(gameId); }}><ArrowLeft className="mr-2 h-4 w-4" /> Back</ScribbleButton><h1 className="text-4xl sm:text-6xl uppercase underline decoration-blue-500 underline-offset-8"><MarkerTitle>Rules</MarkerTitle></h1><div className="text-4xl">ℹ️</div></div><HandCard className="max-w-3xl mx-auto p-8 space-y-5"><h2 className="text-4xl"><MarkerTitle>How to play {title}</MarkerTitle></h2><ul className="space-y-4 text-2xl font-black list-disc pl-8">{(RULES[gameId] || []).map((rule) => <li key={rule}><CrayonText>{rule}</CrayonText></li>)}</ul></HandCard></NotebookPage>;
}

function TicTacToe({ setPage, paperVariant, rotatePaper, addStats }) {
  const [mode, setMode] = useState("1v1"); const [board, setBoard] = useState(Array(9).fill(null)); const [xTurn, setXTurn] = useState(true); const [score, setScore] = useState({ X: 0, O: 0, draws: 0 }); const [counted, setCounted] = useState(false);
  const getWinner = (squares) => { const lines = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; for (const [a,b,c] of lines) if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) return squares[a]; return squares.every(Boolean) ? "draw" : null; };
  const winner = useMemo(() => getWinner(board), [board]);
  const bestMove = (squares) => { const empty = squares.map((v,i)=>v?null:i).filter(v=>v!==null); const tryMove = (mark) => { for (const i of empty) { const t=[...squares]; t[i]=mark; if (getWinner(t)===mark) return i; } return null; }; const cornerPool = [0,2,6,8].filter(i => !squares[i]); const randomCorner = cornerPool[Math.floor(Math.random() * cornerPool.length)]; return tryMove("O") ?? tryMove("X") ?? (!squares[4] ? 4 : null) ?? randomCorner ?? empty[Math.floor(Math.random() * empty.length)]; };
  const finishGame = (next) => { const r = getWinner(next); if (!r || counted) return; setCounted(true); setScore(s => r === "draw" ? { ...s, draws: s.draws + 1 } : { ...s, [r]: s[r] + 1 }); addStats({ gamesPlayed: 1, totalWins: r === "draw" ? 0 : 1, tictactoeWins: r === "X" ? 1 : 0 }); };
  const play = (i) => { if (board[i] || winner || (mode === "1 vs AI" && !xTurn)) return; const next = [...board]; next[i] = xTurn ? "X" : "O"; if (mode === "1 vs AI" && !getWinner(next)) next[bestMove(next)] = "O"; setBoard(next); finishGame(next); setXTurn(mode === "1 vs AI" ? true : !xTurn); };
  const resetBoard = () => { setBoard(Array(9).fill(null)); setXTurn(true); setCounted(false); }; const resetAll = () => { resetBoard(); setScore({ X: 0, O: 0, draws: 0 }); };
  return <NotebookPage paperVariant={paperVariant}><GameHeader title="Tic-Tac-Toe" setPage={setPage} onReset={resetAll} rotatePaper={rotatePaper} openRules={() => setPage("rules:tictactoe")} /><ModePicker mode={mode} setMode={(m) => { setMode(m); resetBoard(); }} /><HandCard className="max-w-xl mx-auto p-5 space-y-4"><div className="grid grid-cols-3 gap-3 text-lg font-black text-center"><div className="rounded-2xl bg-blue-200 border-2 border-slate-950 p-2">X: {score.X}</div><div className="rounded-2xl bg-yellow-100 border-2 border-slate-950 p-2">Draws: {score.draws}</div><div className="rounded-2xl bg-red-200 border-2 border-slate-950 p-2">O: {score.O}</div></div><p className="text-center text-2xl font-black">{winner === "draw" ? "It’s a draw." : winner ? `${winner === "X" ? "X" : "O"} wins!` : mode === "1 vs AI" ? "Your turn. You are X." : `Player ${xTurn ? "X" : "O"}'s turn`}</p><div className="grid grid-cols-3 gap-3 bg-slate-950 p-3 rotate-[-1deg] rounded-3xl">{board.map((cell, i) => <button key={i} onClick={() => play(i)} className="aspect-square rounded-2xl bg-yellow-100 text-6xl font-black shadow-inner hover:bg-yellow-50 transition">{cell}</button>)}</div><div className="flex justify-center"><ScribbleButton variant="secondary" onClick={() => { rotatePaper(); resetBoard(); }}>New Round</ScribbleButton></div></HandCard></NotebookPage>;
}

function Hangman({ setPage, paperVariant, rotatePaper, addStats }) {
  const [mode, setMode] = useState("1 vs AI"); const [category, setCategory] = useState("Animals");
  const newWord = (cat = category) => WORD_BANKS[cat][Math.floor(Math.random() * WORD_BANKS[cat].length)].toUpperCase();
  const [word, setWord] = useState(() => newWord("Animals")); const [secretInput, setSecretInput] = useState(""); const [setupMode, setSetupMode] = useState(false); const [guesses, setGuesses] = useState([]); const [input, setInput] = useState(""); const [counted, setCounted] = useState(false);
  const wrong = guesses.filter(g => !word.includes(g)); const won = word && word.split("").every(l => guesses.includes(l)); const lost = wrong.length >= 6;
  useEffect(() => { if (won && !counted) { setCounted(true); addStats({ gamesPlayed: 1, totalWins: 1, hangmanSolved: 1 }); } if (lost && !counted) { setCounted(true); addStats({ gamesPlayed: 1 }); } }, [won, lost, counted, addStats]);
  const reset = () => { setCounted(false); if (mode === "1 vs AI") { setWord(newWord(category)); setSetupMode(false); } else { setWord(""); setSecretInput(""); setSetupMode(true); } setGuesses([]); setInput(""); };
  const startSecret = () => { const clean = secretInput.trim().replace(/[^a-zA-Z]/g, "").toUpperCase(); if (!clean) return; setWord(clean); setSecretInput(""); setGuesses([]); setCounted(false); setSetupMode(false); };
  const changeMode = (m) => { setMode(m); setGuesses([]); setInput(""); setCounted(false); if (m === "1 vs AI") { setWord(newWord(category)); setSetupMode(false); } else { setWord(""); setSetupMode(true); } };
  const guess = () => { const l = input.trim().toUpperCase()[0]; if (!word || setupMode || !/[A-Z]/.test(l || "") || guesses.includes(l) || won || lost) return; setGuesses([...guesses, l]); setInput(""); };
  return <NotebookPage paperVariant={paperVariant}><GameHeader title="Hangman" setPage={setPage} onReset={reset} rotatePaper={rotatePaper} openRules={() => setPage("rules:hangman")} /><ModePicker mode={mode} setMode={changeMode} />{mode === "1 vs AI" && <div className="flex flex-wrap justify-center gap-2 mb-5">{Object.keys(WORD_BANKS).map(cat => <button key={cat} onClick={() => { setCategory(cat); setWord(newWord(cat)); setGuesses([]); setCounted(false); }} className={`rounded-2xl px-3 py-2 border-2 border-slate-950 font-black ${category === cat ? "bg-blue-200" : "bg-yellow-100"}`}>{cat}</button>)}</div>}<HandCard className="max-w-2xl mx-auto p-6 text-center space-y-5">{setupMode ? <div className="space-y-5"><p className="text-2xl font-black">Player 1: enter a secret word.</p><input type="password" value={secretInput} onChange={e => setSecretInput(e.target.value)} onKeyDown={e => e.key === "Enter" && startSecret()} className="text-slate-950 rounded-2xl px-4 py-3 text-xl w-full max-w-sm text-center font-black border-4 border-slate-950 bg-yellow-50" placeholder="Secret word" /><div><ScribbleButton onClick={startSecret}>Start Guessing</ScribbleButton></div></div> : <><div className="mx-auto w-40 h-44 border-4 border-slate-950 rounded-3xl bg-yellow-100/80 flex items-center justify-center text-6xl rotate-[-2deg]">{wrong.length === 0 ? "🙂" : wrong.length < 3 ? "😬" : wrong.length < 6 ? "😵" : "💀"}</div><div className="text-5xl font-black tracking-widest">{word.split("").map((l,i) => <span key={i} className="mx-1">{guesses.includes(l) ? l : "_"}</span>)}</div><p className="text-xl font-black">{mode === "1 vs AI" ? `Category: ${category}` : "Secret word mode"}</p><p className="text-xl font-black">Wrong guesses: {wrong.length} / 6</p><p className="text-slate-700 text-lg font-semibold">Used letters: {guesses.join(", ") || "None yet"}</p>{won && <p className="text-2xl font-black"><Trophy className="inline mr-2" />You won!</p>}{lost && <p className="text-2xl font-black">The word was {word}.</p>}<div className="flex gap-3 justify-center"><input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && guess()} maxLength={1} className="text-slate-950 rounded-2xl px-4 py-3 text-xl w-24 text-center font-black border-4 border-slate-950 bg-yellow-50" placeholder="A" /><ScribbleButton onClick={guess}>Guess</ScribbleButton></div></>}</HandCard></NotebookPage>;
}

function DotsAndBoxes({ setPage, paperVariant, rotatePaper, addStats }) {
  const [mode, setMode] = useState("1v1"); const dotCount = 4; const boxCount = 3;
  const makeGame = () => ({ h: Array.from({ length: dotCount }, () => Array(boxCount).fill(null)), v: Array.from({ length: boxCount }, () => Array(dotCount).fill(null)), boxes: Array.from({ length: boxCount }, () => Array(boxCount).fill(null)), turn: "Blue", score: { Blue: 0, Red: 0 }, message: "Blue goes first.", counted: false });
  const [game, setGameState] = useState(makeGame); const reset = () => setGameState(makeGame());
  const completed = (h,v,r,c) => h[r][c] && h[r+1][c] && v[r][c] && v[r][c+1];
  const claim = (kind,row,col) => setGameState(cur => { if ((kind === "h" && cur.h[row][col]) || (kind === "v" && cur.v[row][col])) return cur; const h = cur.h.map(x=>[...x]); const v = cur.v.map(x=>[...x]); const boxes = cur.boxes.map(x=>[...x]); if (kind === "h") h[row][col] = cur.turn; else v[row][col] = cur.turn; let made = 0; for (let r=0;r<boxCount;r++) for (let c=0;c<boxCount;c++) if (!boxes[r][c] && completed(h,v,r,c)) { boxes[r][c] = cur.turn; made++; } const score = { ...cur.score, [cur.turn]: cur.score[cur.turn] + made }; const full = boxes.every(line => line.every(Boolean)); const nextTurn = made ? cur.turn : cur.turn === "Blue" ? "Red" : "Blue"; let message = made ? `${cur.turn} claimed ${made} box${made > 1 ? "es" : ""} and goes again!` : `${nextTurn}'s turn.`; let counted = cur.counted; if (full) { message = score.Blue === score.Red ? "Game over. It’s a tie!" : `Game over. ${score.Blue > score.Red ? "Blue" : "Red"} wins!`; if (!counted) { counted = true; addStats({ gamesPlayed: 1, totalWins: score.Blue === score.Red ? 0 : 1, dotsWins: score.Blue > score.Red ? 1 : 0, boxesClaimed: score.Blue }); } } return { h, v, boxes, turn: nextTurn, score, message, counted }; });
  const lineClass = owner => owner === "Blue" ? "bg-blue-400" : owner === "Red" ? "bg-red-400" : "bg-slate-300 hover:bg-slate-500"; const boxClass = owner => owner === "Blue" ? "bg-blue-200" : owner === "Red" ? "bg-red-200" : "bg-yellow-50/40";
  return <NotebookPage paperVariant={paperVariant}><GameHeader title="Dots & Boxes" setPage={setPage} onReset={reset} rotatePaper={rotatePaper} openRules={() => setPage("rules:dots")} /><ModePicker mode={mode} setMode={setMode} /><HandCard className="max-w-2xl mx-auto p-6 text-center space-y-5"><div className="grid grid-cols-3 gap-3 text-xl font-black"><div className="rounded-2xl bg-blue-200 border-2 border-slate-950 p-3">Blue: {game.score.Blue}</div><div className="rounded-2xl bg-yellow-100 border-2 border-slate-950 p-3">Turn: {game.turn}</div><div className="rounded-2xl bg-red-200 border-2 border-slate-950 p-3">Red: {game.score.Red}</div></div><p className="text-xl font-black">{game.message}</p><div className="mx-auto w-fit rounded-[2rem] bg-yellow-100/90 border-4 border-slate-950 p-5 rotate-[-1deg]"><div className="grid" style={{ gridTemplateColumns: `repeat(${dotCount}, 22px)`, gridTemplateRows: `repeat(${dotCount}, 22px)`, columnGap: "52px", rowGap: "52px" }}>{Array.from({ length: dotCount * dotCount }).map((_, i) => { const r=Math.floor(i/dotCount), c=i%dotCount; return <div key={i} className="relative h-6 w-6 rounded-full bg-slate-950 z-20">{c<boxCount && <button onClick={() => claim("h",r,c)} className={`absolute left-5 top-2 h-2 w-[58px] rounded-full transition ${lineClass(game.h[r][c])}`} />}{r<boxCount && <button onClick={() => claim("v",r,c)} className={`absolute left-2 top-5 h-[58px] w-2 rounded-full transition ${lineClass(game.v[r][c])}`} />}{r<boxCount && c<boxCount && <div className={`absolute left-5 top-5 h-[58px] w-[58px] rounded-xl border border-slate-950/20 ${boxClass(game.boxes[r][c])}`}>{game.boxes[r][c] && <span className="font-black text-lg leading-[58px]">{game.boxes[r][c][0]}</span>}</div>}</div>; })}</div></div></HandCard></NotebookPage>;
}

function TwentyQuestions({ setPage, paperVariant, rotatePaper, addStats }) {
  const [mode, setMode] = useState("1v1"); const [index, setIndex] = useState(0); const [left, setLeft] = useState(20); const [counted, setCounted] = useState(false); const next = () => { if (!counted) { addStats({ gamesPlayed: 1, questionsPlayed: 1 }); } setCounted(false); setIndex(Math.floor(Math.random() * TWENTY_QUESTIONS_PROMPTS.length)); setLeft(20); };
  return <NotebookPage paperVariant={paperVariant}><GameHeader title="20 Questions" setPage={setPage} onReset={next} rotatePaper={rotatePaper} openRules={() => setPage("rules:questions")} /><ModePicker mode={mode} setMode={setMode} /><HandCard className="max-w-2xl mx-auto p-8 text-center space-y-6"><div className="rounded-[2rem] bg-yellow-100/90 border-4 border-slate-950 p-8 text-2xl sm:text-4xl font-black min-h-48 flex items-center justify-center rotate-[-1deg]">{TWENTY_QUESTIONS_PROMPTS[index]}</div><p className="text-3xl font-black">Questions left: {left}</p><div className="flex flex-wrap justify-center gap-3"><ScribbleButton onClick={() => setLeft(Math.max(0, left - 1))}>Asked One</ScribbleButton><ScribbleButton onClick={() => { if (!counted) { addStats({ gamesPlayed: 1, totalWins: 1, questionsPlayed: 1 }); setCounted(true); } }}>Guessed It!</ScribbleButton><ScribbleButton variant="secondary" onClick={() => { rotatePaper(); next(); }}><Shuffle className="mr-2 h-5 w-5" /> New Prompt</ScribbleButton></div></HandCard></NotebookPage>;
}

function RockPaperScissors({ setPage, paperVariant, rotatePaper, addStats }) {
  const [mode, setMode] = useState("1 vs AI"); const [playerPick, setPlayerPick] = useState(null); const [opponentPick, setOpponentPick] = useState(null); const [message, setMessage] = useState("Choose your weapon, road warrior."); const [score, setScore] = useState({ player: 0, opponent: 0, ties: 0 }); const [playerHistory, setPlayerHistory] = useState([]); const [opponentHistory, setOpponentHistory] = useState([]);
  const win = (p,o) => p===o ? "tie" : ((p==="rock"&&o==="scissors")||(p==="paper"&&o==="rock")||(p==="scissors"&&o==="paper")) ? "player" : "opponent";
  const beats = { rock: "scissors", paper: "rock", scissors: "paper" }; const losesTo = { rock: "paper", paper: "scissors", scissors: "rock" };
  const randomChoice = (blocked = []) => { const pool = RPS_CHOICES.map((choice) => choice.id).filter((id) => !blocked.includes(id)); const choices = pool.length ? pool : RPS_CHOICES.map((choice) => choice.id); return choices[Math.floor(Math.random() * choices.length)]; };
  const pickOpponent = (playerChoice) => { if (mode !== "1 vs AI") return randomChoice(opponentHistory.slice(-1)); const lastTwoOpponent = opponentHistory.slice(-2); const repeatedTooMuch = lastTwoOpponent.length === 2 && lastTwoOpponent[0] === lastTwoOpponent[1] ? [lastTwoOpponent[0]] : []; const lastThreePlayer = [...playerHistory.slice(-2), playerChoice]; const counts = lastThreePlayer.reduce((acc, item) => ({ ...acc, [item]: (acc[item] || 0) + 1 }), {}); const favorite = Object.entries(counts).sort((a, b) => b[1] - a[1])[0]?.[0]; const roll = Math.random(); if (favorite && roll < 0.3) return losesTo[favorite]; if (roll < 0.5) return randomChoice(repeatedTooMuch); if (roll < 0.7) return beats[playerChoice]; return randomChoice(repeatedTooMuch); };
  const play = (choice) => { const opponent = pickOpponent(choice); const result = win(choice, opponent); setPlayerPick(choice); setOpponentPick(opponent); setPlayerHistory((history) => [...history.slice(-7), choice]); setOpponentHistory((history) => [...history.slice(-7), opponent]); setScore(s => result === "tie" ? { ...s, ties: s.ties+1 } : result === "player" ? { ...s, player: s.player+1 } : { ...s, opponent: s.opponent+1 }); addStats({ gamesPlayed: 1, totalWins: result === "player" ? 1 : 0, aiVictories: mode === "1 vs AI" && result === "player" ? 1 : 0,rpsWins: result === "player" ? 1 : 0, rpsLosses: result === "opponent" ? 1 : 0, rpsTies: result === "tie" ? 1 : 0 }); setMessage(result === "tie" ? "Tie round. The notebook demands a rematch." : result === "player" ? "You win the round!" : mode === "1 vs AI" ? "AI wins the round." : "Opponent wins the round."); };
  const reset = () => { setPlayerPick(null); setOpponentPick(null); setMessage("Choose your weapon, road warrior."); setScore({ player: 0, opponent: 0, ties: 0 }); setPlayerHistory([]); setOpponentHistory([]); };
  const label = id => RPS_CHOICES.find(c=>c.id===id)?.label || "?"; const icon = id => RPS_CHOICES.find(c=>c.id===id)?.icon || "❔";
  return <NotebookPage paperVariant={paperVariant}><GameHeader title="Rock Paper Scissors" setPage={setPage} onReset={reset} rotatePaper={rotatePaper} openRules={() => setPage("rules:rps")} /><ModePicker mode={mode} setMode={setMode} /><HandCard className="max-w-3xl mx-auto p-7 text-center space-y-6"><div className="grid grid-cols-3 gap-3">{RPS_CHOICES.map(choice => <button key={choice.id} onClick={() => play(choice.id)} className="rounded-[2rem] border-4 border-slate-950 bg-yellow-100 p-5 shadow-[5px_5px_0_rgba(15,23,42,.85)] hover:-translate-y-1 transition"><div className="text-5xl sm:text-6xl">{choice.icon}</div><div className="text-xl mt-2"><CrayonText>{choice.label}</CrayonText></div></button>)}</div><div className="rounded-[2rem] border-4 border-slate-950 bg-yellow-100/80 p-5 rotate-[-1deg]"><p className="text-2xl font-black">{message}</p><div className="mt-4 grid grid-cols-2 gap-3 text-xl font-black"><div>You: {playerPick ? `${icon(playerPick)} ${label(playerPick)}` : "?"}</div><div>{mode === "1 vs AI" ? "AI" : "Opponent"}: {opponentPick ? `${icon(opponentPick)} ${label(opponentPick)}` : "?"}</div></div></div><div className="grid grid-cols-3 gap-3 text-xl font-black"><div className="rounded-2xl bg-blue-200 border-2 border-slate-950 p-3">You: {score.player}</div><div className="rounded-2xl bg-red-200 border-2 border-slate-950 p-3">Other: {score.opponent}</div><div className="rounded-2xl bg-yellow-200 border-2 border-slate-950 p-3">Ties: {score.ties}</div></div><p className="text-slate-700"><CrayonText>Coming later: Rock Paper Scissors Lizard Spock.</CrayonText></p></HandCard></NotebookPage>;
}

function loadSaved() {
  try {
    const raw = localStorage.getItem(SAVE_KEY);
    if (!raw) return null;
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export default function App() {
  const saved = loadSaved();
  const [opened, setOpened] = useState(false);
  const [ownerReady, setOwnerReady] = useState(Boolean(saved?.ownerReady));
  const [ownerName, setOwnerName] = useState(saved?.ownerName || "");
  const [page, setPage] = useState("home");
  const [paperVariant, setPaperVariant] = useState(saved?.paperVariant || 0);
  const [settings, setSettings] = useState({ ...DEFAULT_SETTINGS, ...(saved?.settings || {}) });
  const [stats, setStats] = useState({ ...DEFAULT_STATS, ...(saved?.stats || {}) });

  useEffect(() => {
    localStorage.setItem(SAVE_KEY, JSON.stringify({ ownerReady, ownerName, paperVariant, settings, stats }));
  }, [ownerReady, ownerName, paperVariant, settings, stats]);

  const updateSettings = (patch) => setSettings((current) => ({ ...current, ...patch }));
  const rotatePaper = () => settings.paperMode === "Random" ? setPaperVariant((current) => (current + 1) % PAPER_VARIANTS.length) : setPaperVariant(settings.lockedPaper);
  const addStats = (patch) => setStats((current) => { const next = { ...current }; Object.entries(patch).forEach(([key, value]) => { next[key] = (next[key] || 0) + value; }); return next; });
  const finishOwner = () => { const clean = ownerName.trim() || "Player"; setOwnerName(clean); setStats((current) => ({ ...current, ownerName: clean })); setOwnerReady(true); };
  const resetStats = () => setStats({ ...DEFAULT_STATS, ownerName: ownerName || "Player" });

  if (!opened) return <CoverPage openNotebook={() => { rotatePaper(); setOpened(true); }} />;
  if (!ownerReady) return <OwnerPage ownerName={ownerName} setOwnerName={setOwnerName} finishOwner={finishOwner} />;
  if (page.startsWith("rules:")) { const gameId = page.split(":")[1]; const titles = { tictactoe: "Tic-Tac-Toe", hangman: "Hangman", dots: "Dots & Boxes", questions: "20 Questions", rps: "Rock Paper Scissors" }; return <RulesPage gameId={gameId} title={titles[gameId]} setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} ownerName={stats.ownerName} />; }

 return (
  <>
    {page === "home" && <Home setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} stats={stats} />}
    {page === "game" && <GAMEPage setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} stats={stats} />}
    {page === "passport" && <PassportPage setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} stats={stats} />}
    {page === "settings" && <SettingsPage setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} settings={settings} updateSettings={updateSettings} resetStats={resetStats} />}
    {page === "stickers" && <StickerBook setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} stats={stats} />}
    {page === "journal" && <TripJournal setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} stats={stats} />}
    {page === "tictactoe" && <TicTacToe setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} addStats={addStats} />}
    {page === "hangman" && <Hangman setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} addStats={addStats} />}
    {page === "dots" && <DotsAndBoxes setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} addStats={addStats} />}
    {page === "questions" && <TwentyQuestions setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} addStats={addStats} />}
    {page === "rps" && <RockPaperScissors setPage={setPage} paperVariant={paperVariant} rotatePaper={rotatePaper} addStats={addStats} />}
  </>
); 
}

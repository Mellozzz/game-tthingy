import { useEffect, useRef, useState } from "react";
import confetti from "canvas-confetti";

const GAMES = [
  `100% Orange Juice`,`2014.Aftermath`,`7 Days to Die`,`9 Kings`,`AdVenture Capitalist`,`Aimlabs`,`Ale & Tale Tavern`,`Alice: Madness Returns`,`Alien: Isolation`,`Aliens: Dark Descent`,`Alone in the Dark`,`Amnesia: The Bunker`,`Among Us 3D`,`Among Us 3D: VR`,`Anger Foot`,`APE OUT`,`Apewar`,`Aragami`,`Aragami 2`,`ARC Raiders`,`ARMORED CORE VI FIRES OF RUBICON`,`The Axis Unseen`,`Balatro`,`Baldur's Gate II: Enhanced Edition`,`BALL x PIT`,`Ballionaire`,`Barony`,`Batman: Arkham Asylum GOTY Edition`,`Batman: Arkham City GOTY`,`Batman: Arkham Knight`,`Batman: Arkham Origins`,`Battle Ram`,`Bayonetta`,`Beat Saber`,`Before Your Eyes`,`Berry Bury Berry`,`BERSERK and the Band of the Hawk`,`Besiege`,`The Beast Inside`,`The Binding of Isaac`,`BioShock`,`BioShock Remastered`,`BioShock 2`,`BioShock 2 Remastered`,`BioShock Infinite`,`BLACK CLOVER: QUARTET KNIGHTS`,`The Black Masses`,`Black Mesa`,`Black Myth: Wukong`,`Blade & Sorcery`,`Blasphemous`,`Blood West`,`Bloons TD 6`,`Bloons TD Battles`,`Bomb Rush Cyberfunk`,`Bomber Crew`,`BONELAB`,`BONEWORKS`,`Booobjz`,`Borderlands GOTY`,`Borderlands GOTY Enhanced`,`Brutal Orchestra`,`Bully: Scholarship Edition`,`Buriedbornes - Dungeon RPG`,`Butcher's Creek`,`Call of Juarez Gunslinger`,`Canyon of Outlaws`,`CARRION`,`Castlevania: Lords of Shadow - Ultimate Edition`,`Castlevania: Lords of Shadow 2`,`Celeste`,`Charlie Murder`,`Chernobylite Complete Edition`,`Children of the Sun`,`Chillquarium`,`Chillquarium Demo`,`Clair Obscur: Expedition 33`,`Clicker Heroes`,`CloverPit`,`CloverPit Demo`,`CODE VEIN`,`College Kings 2 - Episode 1`,`Colony Survival`,`The Coma: Recut`,`Comedy Night`,`Company of Heroes 2`,`Cookie Clicker`,`Counter-Strike: Source`,`Creed: Rise to Glory`,`Crime Boss: Rockay City`,`Cruelty Squad`,`Cryptmaster`,`Crysis 3 Remastered`,`Cult of the Lamb`,`Cuphead`,`Curse of the Dead Gods`,`Cyberpunk 2077`,`Danganronpa 2: Goodbye Despair`,`Danganronpa Another Episode: Ultra Despair Girls`,`Danganronpa: Trigger Happy Havoc`,`Danganronpa V3: Killing Harmony`,`Dark and Darker`,`Dark Deception: Monsters & Mortals`,`Dark Messiah of Might & Magic Multi-Player`,`Dark Messiah of Might & Magic Single Player`,`The Dark Pictures Anthology: House of Ashes`,`The Dark Pictures Anthology: House of Ashes - Friend's Pass`,`The Dark Pictures Anthology: Little Hope`,`The Dark Pictures Anthology: Little Hope - Friend's Pass`,`The Dark Pictures Anthology: Man of Medan`,`The Dark Pictures Anthology: Man of Medan - Friend's Pass`,`DARK SOULS II: Scholar of the First Sin`,`DARK SOULS: REMASTERED`,`Darkest Dungeon`,`Darkest Dungeon II`,`The Darkness II`,`Darksiders Genesis`,`Darksiders II Deathinitive Edition`,`Darksiders III`,`Darkwood`,`DAVE THE DIVER`,`Dawn of Anarchy`,`de Blob`,`Dead Cells`,`Dead Estate`,`Dead Rising`,`Dead Rising 3`,`Dead Space`,`Dead Space (2008)`,`Deadzone Rogue`,`Death and Taxes`,`Death in the Water 2`,`Death Must Die`,`DEATH STRANDING DIRECTOR'S CUT`,`DEATHLOOP`,`Deep Rock Galactic`,`Delta Force`,`DELTARUNE`,`Demonologist`,`Detroit: Become Human`,`Deus Ex: Game of the Year Edition`,`Devil Daggers`,`Devil May Cry 4 Special Edition`,`Devil May Cry HD Collection`,`Diatomic`,`Dicefolk`,`DICEOMANCER`,`Digseum`,`Dinkum`,`Diplomacy is Not an Option`,`Disco Elysium`,`Dishonored`,`Dishonored 2`,`Dishonored: Death of the Outsider`,`Dispatch`,`Divinity: Original Sin 2`,`DJMAX RESPECT V`,`DmC Devil May Cry`,`Dome Keeper`,`Donut County`,`DOOM`,`DOOM 3`,`DOOM 3: BFG Edition`,`DOOM 3: Resurrection of Evil`,`DOOM Eternal`,`Dragon Eclipse`,`Dragon's Dogma: Dark Arisen`,`Drawful 2`,`Dread Templar`,`DREDGE`,`Drive for Your Life`,`Drug Dealer Simulator`,`Dungeon Clawler`,`Dungeon Tycoon`,`Dungeonborne`,`Dungeons & Degenerate Gamblers`,`Dungeons of Blood and Dream`,`Dungreed`,`DUSK`,`Dying Light 2: Reloaded Edition`,`Earth 2150: Lost Souls`,`Earth 2150: The Moon Project`,`Earth 2150 Trilogy`,`ELDEN RING`,`The Elder Scrolls III: Morrowind`,`The Elder Scrolls IV: Oblivion Game of the Year Edition (2009)`,`The Elder Scrolls IV: Oblivion Remastered`,`The Elder Scrolls V: Skyrim`,`The Elder Scrolls V: Skyrim Special Edition`,`Emily is Away <3`,`Emily is Away Too`,`ENDLESS Legend`,`The Escapists`,`The Escapists 2`,`Everhood`,`E.Y.E: Divine Cybermancy`,`Fable Anniversary`,`FACEMINER`,`Factorio`,`FAITH`,`Fallout`,`Fallout 3 - Game of the Year Edition`,`Fallout 4`,`Fallout: New Vegas`,`Far Cry 2`,`Farmer Against Potatoes Idle`,`Farming Simulator 22`,`F.E.A.R.`,`Fear & Hunger`,`Fear & Hunger 2: Termina`,`F.E.A.R.: Extraction Point`,`F.E.A.R.: Perseus Mandate`,`FINAL FANTASY VII`,`FINAL FANTASY VII REBIRTH`,`FINAL FANTASY VII REMAKE INTERGRADE`,`FINAL FANTASY XVI`,`First Class Escape: The Train of Thought`,`First Cut: Samurai Duel`,`Five Nights at Freddy's`,`Five Nights at Freddy's 4`,`FIVE NIGHTS AT FREDDY'S: HELP WANTED`,`Five Nights at Freddy's: Security Breach`,`For Honor - Public Test`,`For The King II`,`Forager`,`Forgive Me Father 2`,`Fractal Block World`,`FragPunk`,`Fran Bow`,`Friday the 13th: The Game`,`Friends vs Friends`,`From the darkness`,`FTL: Faster Than Light`,`Furi`,`Gamblers Table`,`A Game About Digging A Hole`,`A Game About Feeding A Black Hole`,`Gang Beasts`,`Garfield Kart`,`Generation Zero`,`Genital Jousting`,`A Gentlemen's Dispute`,`Ghostrunner`,`Gladiator Fights`,`Gloomwood`,`GOD EATER 3`,`God of War`,`God of War Ragnarök`,`Golden Light`,`Golf It!`,`Golf With Your Friends`,`Goofy Gorillas`,`Gotham Knights`,`Grand Theft Auto: San Andreas`,`GRAVEN`,`Graveyard Keeper`,`GRIME`,`Grounded 2`,`GUILTY GEAR -STRIVE-`,`Gunpoint`,`Hades`,`Hades II`,`HALF DEAD 2`,`HALF DEAD 3`,`Half-Life 2`,`Half-Life 2: Deathmatch`,`Half-Life: Alyx`,`Half-Life Deathmatch: Source`,`Halls of Torment`,`Halo: The Master Chief Collection`,`Hand Simulator`,`A Hat in Time`,`He is Coming`,`Heavenly Bodies`,`Heavy Rain`,`Hellsplit: Arena`,`Heretic's Fork`,`Hero Siege`,`High On Life`,`HITMAN 2`,`HITMAN World of Assassination`,`Hollow Knight`,`Hollow Knight: Silksong`,`Hotline Miami`,`Hotline Miami 2: Wrong Number`,`House Flipper`,`Hunting Simulator`,`Hurtworld`,`Hylics`,`Hyper Light Drifter`,`I Am Your Beast`,`I Have No Mouth, and I Must Scream`,`Idle Monkeylogy`,`Injustice 2`,`Inscryption`,`Internet Cafe Simulator 2`,`Into the Breach`,`Intoxicated Driver`,`Intravenous`,`Iratus: Lord of the Dead`,`Iron Lung`,`It Steals`,`The Jackbox Party Pack 3`,`The Jackbox Party Pack 7`,`Jesus Strikes Back: Judgment Day (Remastered)`,`Jet Set Radio`,`Job Simulator`,`JoJo’s Bizarre Adventure: All-Star Battle R`,`JUMP FORCE`,`Just Cause 3`,`Katana ZERO`,`Keep Driving`,`Keep on Mining!`,`Kenshi`,`killer7`,`Killing Floor`,`Killing Floor 2`,`The King is Watching`,`Kingdom Come: Deliverance`,`KinitoPET`,`Knock on the Coffin Lid`,`Labyrinth Of The Demon King`,`Labyrinthine`,`Last Oasis`,`The Last of Us Part I`,`The Last of Us Part II Remastered`,`Leaf Blower Revolution`,`Left 4 Dead`,`LEGO Batman: The Videogame`,`LEGO Batman 2: DC Super Heroes`,`LEGO Batman 3: Beyond Gotham`,`LEGO STAR WARS: The Force Awakens`,`LEGO Star Wars: The Skywalker Saga`,`LEGO The Incredibles`,`LEGO The Lord of the Rings`,`Library Of Ruina`,`Lies of P`,`Life is Strange`,`Little Nightmares`,`Little Nightmares Enhanced Edition`,`Little Nightmares II`,`A Little to the Left`,`Littlewood`,`Lobotomy Corporation`,`LOLLIPOP CHAINSAW RePOP`,`Look Outside`,`Loop Hero`,`Lootun`,`Lost Dream`,`Lost Estate Agent`,`Lost in Space`,`Lumberjacked`,`Mafia: Definitive Edition`,`Mafia II (Classic)`,`Mafia II: Definitive Edition`,`Mafia III: Definitive Edition`,`Mage Arena`,`Magicka 2`,`Magicka 2: Spell Balance Beta`,`Maniac`,`Marvel Rivals`,`Marvel's Guardians of the Galaxy`,`Marvel's Midnight Suns`,`Masks Of Deception`,`Maximum Action`,`Medieval Dynasty`,`Megabonk`,`Melvor Idle`,`Memories of a Vagabond`,`Menace from the Deep`,`Mermaid Adventures: The Frozen Time`,`The Messenger`,`METAL GEAR RISING: REVENGEANCE`,`METAL GEAR SOLID V: THE PHANTOM PAIN`,`Metal: Hellsinger`,`Metaphor: ReFantazio`,`Metro Exodus`,`Metro Exodus Enhanced Edition`,`Metro: Last Light Complete Edition`,`Mewgenics`,`Middle-earth: Shadow of Mordor`,`Middle-earth: Shadow of War`,`Midnight Murder Club`,`Mine the Gold`,`Monkey Business`,`Monster Prom`,`Monster Prom 2: Monster Camp`,`Monster Prom 3: Monster Roadtrip`,`Monster Train`,`Monster Train 2`,`MOON THIRST`,`Mortal Kombat 1`,`Mortal Kombat 11`,`Mortal Kombat X`,`Mortal Sin`,`Motordoom`,`Mount & Blade II: Bannerlord`,`Mount & Blade: Warband`,`Mullet Mad Jack`,`Murder Miners`,`Murky Divers`,`MuseSwipr`,`My Beautiful Paper Smile`,`MythForce`,`NARUTO SHIPPUDEN: Ultimate Ninja STORM 4`,`NBA 2K20`,`Necroking`,`NEEDY STREAMER OVERLOAD`,`Neon Phonk Robots`,`NieR:Automata`,`Nine Sols`,`Ninja Kiwi Archive`,`Nioh: Complete Edition`,`No, I'm not a Human`,`No More Room in Hell`,`Nodebuster`,`Noise`,`Noita`,`NO-SKIN`,`Not For Broadcast`,`Nubby's Number Factory`,`Oh Deer`,`Old Market Simulator`,`Old World`,`Omega Strikers`,`OMORI`,`One Finger Death Punch 2`,`ONE PIECE BURNING BLOOD`,`One-armed cook`,`OPERATION TEMPLE`,`Outer Wilds`,`Outlast`,`Outlast 2`,`Oxygen Not Included`,`Paint the Town Red`,`Palworld`,`Papers, Please`,`PARANOIA PLACE`,`Party Animals`,`Passant: A Chess Roguelike`,`Passpartout: The Starving Artist`,`Pathfinder: Wrath of the Righteous - Enhanced Edition`,`Pathologic 2`,`Pathologic Classic HD`,`PAYDAY: The Heist`,`PAYDAY 3`,`PC Building Simulator`,`Peggle Deluxe`,`Peglin`,`People Playground`,`Persona 3 Reload`,`Persona 4 Golden`,`Persona 5 Royal`,`Persona 5 Strikers`,`PGA TOUR 2K23`,`PICO PARK 2`,`Pikuniku`,`PILGRIM`,`Pizza Tower`,`Plague Inc: Evolved`,`Planets Under Attack`,`PolyClassic: Wild`,`The Pony Factory`,`Post Void`,`POSTAL`,`POSTAL 2`,`POSTAL 4: No Regerts`,`POSTAL: Brain Damaged`,`Predator: Hunting Grounds`,`Prey`,`Prodeus`,`Project Demigod`,`Prototype`,`PROTOTYPE 2`,`Psychonauts`,`Psychopomp GOLD`,`Punch Club`,`Quake`,`The Quarry`,`Rain World`,`Ranch Simulator`,`RATSHAKER`,`Ravenfield`,`Raw Data`,`Reigns`,`Remnant II`,`Resident Evil`,`Resident Evil 0`,`Resident Evil 2`,`Resident Evil 3`,`Resident Evil 4`,`Resident Evil 4 (2005)`,`Resident Evil 5`,`Resident Evil 6`,`Resident Evil 7 Biohazard`,`RESIDENT EVIL RESISTANCE`,`Resident Evil Revelations 2`,`Resident Evil Village`,`RetroArch`,`Reus`,`Revolution Idle`,`The Riftbreaker`,`RimWorld`,`Ring of Pain`,`Rise of the Tomb Raider`,`RISK: Global Domination`,`Risk of Rain`,`Risk of Rain 2`,`Road 96`,`Road Madness`,`RoboCop: Rogue City`,`Robotex`,`Robzawar`,`Rocket League`,`Roguebook`,`Rollerdrome`,`RONIN`,`RUINER`,`Run Run Boy`,`Rungore`,`RV There Yet`,`Saints Row 2`,`Saints Row: The Third`,`Saints Row IV`,`Salt and Sanctuary`,`Sausage Hunter`,`Save and Survive`,`SCP: 5K (Alpha Testing)`,`Scrap Mechanic`,`Secret Neighbor`,`Sekiro: Shadows Die Twice`,`Sentry Knight Tactics`,`Septerra Core`,`Serious Sam 3: BFE`,`Serious Sam Fusion 2017 (beta)`,`Shadow of the Tomb Raider`,`Shadows of Doubt`,`Shin Megami Tensei III Nocturne HD Remaster`,`ShipLord`,`Sid Meier's Civilization VI`,`Sifu`,`Sign of Silence`,`SILENT HILL 2`,`The Sims 3`,`The Sinking City Remastered`,`Sker Ritual`,`Skul: The Hero Slayer`,`Slash It 2`,`Slime Rancher`,`The Slormancer`,`Slots & Daggers`,`Sniper Elite 3`,`Sniper Elite 4`,`Sniper Ghost Warrior Contracts 2`,`Snow Clearing Driving Simulator`,`Sons Of The Forest`,`SPACE ACCIDENT`,`Spec Ops: The Line`,`Species: Artificial Life, Real Evolution`,`SpellForce: Conquest of Eo`,`SPLITGATE: Arena Reloaded`,`Spore`,`Squirrel Stapler`,`Stacklands`,`S.T.A.L.K.E.R.: Shadow of Chernobyl`,`S.T.A.L.K.E.R.: Shadow of Chernobyl - Enhanced Edition`,`The Stanley Parable: Ultra Deluxe`,`Star of Providence`,`STAR WARS Knights of the Old Republic`,`STAR WARS: The Force Unleashed Ultimate Sith Edition`,`STAR WARS: The Force Unleashed II`,`Starbound`,`Starbound - Unstable`,`Starship Troopers: Extermination`,`Starship Troopers: Terran Command`,`Stick Fight: The Game`,`Strange Brigade`,`Stumble Guys`,`Styx: Master of Shadows`,`Styx: Shards of Darkness`,`Subnautica`,`SULFUR`,`Sunkenland`,`Sunray OS`,`Super Auto Pets`,`Super Fantasy Kingdom`,`Superliminal`,`Surgeon Simulator 2`,`SurrounDead`,`Sword With Sauce`,`SWORN`,`Tainted Grail`,`Tales from the Borderlands`,`Tattletail`,`TCG Card Shop Simulator`,`Team Fortress 2`,`Teardown`,`Tears of Metal Playtest`,`TEKKEN 7`,`Terminator: Resistance`,`theHunter: Call of the Wild`,`They Are Billions`,`Thief`,`Thief Gold`,`Thief Simulator`,`This War of Mine`,`Thymesia`,`Timeloop: Sink Again Beach`,`Titan Quest Anniversary Edition`,`TOKYO GHOUL: re [CALL to EXIST]`,`Tom Clancy's Rainbow Six Siege - Test Server`,`Tomb Raider`,`Torchlight II`,`Total War: WARHAMMER II`,`Total War: WARHAMMER III`,`Totally Accurate Battle Simulator`,`Tower Wizard`,`Town of Salem`,`Town of Salem 2`,`Toy War - Cannon`,`Trashyard`,`TYRONE vs COPS`,`Ultimate Epic Battle Simulator`,`Ultimate Marvel vs. Capcom 3`,`Ultra Street Fighter IV`,`ULTRAKILL`,`Underneath`,`Underrail`,`Undertale`,`Unknown Tapes`,`Unsolved Case`,`Untrusted`,`V Rising`,`Vade Retro: Exorcist`,`Valheim`,`Vampire Hunters`,`Vampire: The Masquerade - Bloodhunt`,`Vampire: The Masquerade - Bloodlines`,`Vampyr`,`Vanquish`,`Verlet Swing`,`Viscera Cleanup Detail`,`Viscera Cleanup Detail: Santa's Rampage`,`Viscera Cleanup Detail: Shadow Warrior`,`Volcanoids`,`The Walking Dead`,`The Walking Dead: A New Frontier`,`The Walking Dead: Saints & Sinners`,`The Walking Dead: Season Two`,`The Walking Dead: The Final Season`,`Warhammer 40,000: Space Marine 2`,`Warhammer: Vermintide 2`,`Warplanes: WW1 Fighters`,`WazHack`,`We Were Here Expeditions: The FriendShip`,`Welcome to the Game II`,`White Knuckle`,`The Witcher 3: Wild Hunt`,`The Witness`,`Wizard of Legend`,`Wolfenstein II: The New Colossus`,`WORLD OF HORROR`,`WRC 10 FIA World Rally Championship`,`XCOM 2`,`Yakuza 0`,`YAPYAP`,`Yes, Your Grace`,`Your Only Move Is HUSTLE`,`Yu-Gi-Oh! Master Duel`,`Zero Hour`
];

const ITEM_HEIGHT = 60;
const REEL_HEIGHT = 200;
const SEQUENCE_LENGTH = 36;
const BOUNCE_OFFSET = 22;
const BOUNCE_DURATION = 260;

type HistoryEntry = {
  game: string;
  rating: number;
  minutes: number;
  timestamp: number;
};

type ReelSequence = {
  items: string[];
  stopIndex: number;
};

export function App() {
  const [pool, setPool] = useState<string[]>([...GAMES]);
  const [currentGame, setCurrentGame] = useState<string | null>(null);
  const [currentRating, setCurrentRating] = useState<number | null>(null);
  const [timerSeconds, setTimerSeconds] = useState<number>(30 * 60);
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [shaking, setShaking] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const [statusText, setStatusText] = useState("Press SPIN to begin.");
  const [saveStatus, setSaveStatus] = useState("");
  const [finalRow, setFinalRow] = useState<string[]>(["—", "—", "—"]);
  const [timerOverlayPosition, setTimerOverlayPosition] = useState({ x: 50, y: 50 });
  const [isDragging, setIsDragging] = useState(false);

  const reel1Ref = useRef<HTMLDivElement>(null);
  const reel2Ref = useRef<HTMLDivElement>(null);
  const reel3Ref = useRef<HTMLDivElement>(null);
  const dragOffsetRef = useRef({ x: 0, y: 0 });
  const timerIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioCtxRef = useRef<AudioContext | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("backlogHistoryFabien");
    if (raw) {
      try {
        setHistory(JSON.parse(raw));
      } catch {
        setHistory([]);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("backlogHistoryFabien", JSON.stringify(history));
  }, [history]);

  useEffect(() => {
    return () => {
      if (timerIntervalRef.current) {
        clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, []);

  const getAudioContext = () => {
    if (!audioCtxRef.current) {
      audioCtxRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return audioCtxRef.current;
  };

  const playBeep = (freq: number, duration: number) => {
    const audioCtx = getAudioContext();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.frequency.value = freq;
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    gain.gain.setValueAtTime(0.1, audioCtx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, audioCtx.currentTime + duration);
    osc.start();
    osc.stop(audioCtx.currentTime + duration);
  };

  const fillReel = (reelInner: HTMLDivElement, items: string[]) => {
    reelInner.innerHTML = "";
    items.forEach(item => {
      const div = document.createElement("div");
      div.className = "reel-item";
      div.textContent = item;
      reelInner.appendChild(div);
    });
  };

  const randomFromPool = (exclude?: string) => {
    if (!pool.length) return "";
    let candidate = pool[Math.floor(Math.random() * pool.length)];
    if (exclude && pool.length > 1) {
      while (candidate === exclude) {
        candidate = pool[Math.floor(Math.random() * pool.length)];
      }
    }
    return candidate;
  };

  const buildSequence = (winner: string, includeWinner: boolean): ReelSequence => {
    const items = Array.from({ length: SEQUENCE_LENGTH }, () => randomFromPool(winner));
    const stopIndex = SEQUENCE_LENGTH - 6 + Math.floor(Math.random() * 3);
    if (includeWinner) {
      items[stopIndex] = winner;
    }
    return { items, stopIndex };
  };

  const spinReel = (
    reelInner: HTMLDivElement,
    stopIndex: number,
    duration: number,
    delay: number
  ): Promise<void> => {
    return new Promise(resolve => {
      const targetOffset = stopIndex * ITEM_HEIGHT - (REEL_HEIGHT / 2 - ITEM_HEIGHT / 2);
      reelInner.style.transition = "none";
      reelInner.style.transform = "translateY(0px)";

      setTimeout(() => {
        reelInner.style.transition = `transform ${duration}ms cubic-bezier(0.17, 0.67, 0.38, 0.99)`;
        reelInner.style.transform = `translateY(-${targetOffset + BOUNCE_OFFSET}px)`;
      }, delay);

      setTimeout(() => {
        reelInner.style.transition = `transform ${BOUNCE_DURATION}ms ease-out`;
        reelInner.style.transform = `translateY(-${targetOffset}px)`;
      }, duration + delay);

      setTimeout(() => {
        playBeep(520, 0.08);
        resolve();
      }, duration + delay + BOUNCE_DURATION);
    });
  };

  const spinAllReels = async () => {
    if (isSpinning) return;
    if (!pool.length) {
      setStatusText("No games left. Reset the pool to keep spinning!");
      return;
    }

    setIsSpinning(true);
    setStatusText("Spinning the reels...");
    setSaveStatus("");
    setCurrentGame(null);
    setCurrentRating(null);
    setFinalRow(["…", "…", "…"]);
    resetTimer();

    playBeep(200, 0.2);

    const winner = randomFromPool();
    const winningReelIndex = Math.floor(Math.random() * 3);

    const sequences = [0, 1, 2].map(index => buildSequence(winner, index === winningReelIndex));

    if (reel1Ref.current) fillReel(reel1Ref.current, sequences[0].items);
    if (reel2Ref.current) fillReel(reel2Ref.current, sequences[1].items);
    if (reel3Ref.current) fillReel(reel3Ref.current, sequences[2].items);

    const spins: Promise<void>[] = [];
    if (reel1Ref.current) spins.push(spinReel(reel1Ref.current, sequences[0].stopIndex, 2400, 0));
    if (reel2Ref.current) spins.push(spinReel(reel2Ref.current, sequences[1].stopIndex, 3000, 250));
    if (reel3Ref.current) spins.push(spinReel(reel3Ref.current, sequences[2].stopIndex, 3600, 500));

    await Promise.all(spins);

    setShaking(true);
    setTimeout(() => setShaking(false), 450);
    playBeep(720, 0.15);
    setTimeout(() => playBeep(340, 0.2), 150);

    confetti({
      particleCount: 180,
      spread: 80,
      origin: { y: 0.6 }
    });

    setFinalRow([
      sequences[0].items[sequences[0].stopIndex],
      sequences[1].items[sequences[1].stopIndex],
      sequences[2].items[sequences[2].stopIndex]
    ]);
    setCurrentGame(winner);
    setStatusText("Play 30 minutes, then rate.");
    setIsSpinning(false);
  };

  const banGame = () => {
    if (!currentGame) return;
    setPool(prev => prev.filter(game => game !== currentGame));
    setCurrentGame(null);
    setFinalRow(["—", "—", "—"]);
    setStatusText("Game banned. Spin again.");
  };

  const startTimer = () => {
    if (timerIntervalRef.current) return;
    setIsTimerRunning(true);
    timerIntervalRef.current = setInterval(() => {
      setTimerSeconds(prev => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          timerIntervalRef.current = null;
          setIsTimerRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const stopTimer = () => {
    if (timerIntervalRef.current) {
      clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }
    setIsTimerRunning(false);
  };

  const resetTimer = () => {
    stopTimer();
    setTimerSeconds(30 * 60);
  };

  useEffect(() => {
    if (!currentGame) {
      stopTimer();
      setTimerSeconds(30 * 60);
    }
  }, [currentGame]);

  const formatTime = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
  };

  const saveRating = () => {
    if (!currentGame) {
      setSaveStatus("No game selected.");
      return;
    }
    if (!currentRating) {
      setSaveStatus("Pick a rating.");
      return;
    }
    const minutesPlayed = Math.round((30 * 60 - timerSeconds) / 60);
    const newEntry: HistoryEntry = {
      game: currentGame,
      rating: currentRating,
      minutes: minutesPlayed,
      timestamp: Date.now()
    };
    setHistory(prev => [...prev, newEntry]);
    setSaveStatus("Saved.");
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    dragOffsetRef.current = {
      x: e.clientX - timerOverlayPosition.x,
      y: e.clientY - timerOverlayPosition.y
    };
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    setTimerOverlayPosition({
      x: e.clientX - dragOffsetRef.current.x,
      y: e.clientY - dragOffsetRef.current.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, [isDragging]);

  const remainingCount = pool.length;
  const historyReversed = [...history].reverse();
  const winnerIndex = finalRow.findIndex(row => row === currentGame);

  return (
    <div className={`min-h-screen bg-[#0d0f17] text-[#f0f0f0] font-sans overflow-x-hidden p-8 ${shaking ? "shake" : ""}`}>
      <style>{`
        .reel-item {
          height: ${ITEM_HEIGHT}px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.05rem;
          font-weight: 700;
          padding: 0 1rem;
          color: #fff;
          text-shadow: 0 0 8px rgba(255, 0, 100, 0.8);
        }
        @keyframes shakeAnim {
          0% { transform: translate(0, 0); }
          20% { transform: translate(-10px, 5px); }
          40% { transform: translate(8px, -8px); }
          60% { transform: translate(-6px, 4px); }
          80% { transform: translate(4px, -4px); }
          100% { transform: translate(0, 0); }
        }
        .shake { animation: shakeAnim 0.4s ease-in-out; }
      `}</style>

      <div className="bg-[#161925] rounded-2xl p-6 mb-8 shadow-[0_0_20px_rgba(255,0,100,0.15)]">
        <h1 className="text-3xl font-bold m-0">Backlog Roulette — Carnival Mayhem</h1>
        <p className="mt-2 text-sm text-[#a3a6b3]">{statusText}</p>
      </div>

      <div className="bg-[#161925] rounded-2xl p-6 mb-8 shadow-[0_0_20px_rgba(255,0,100,0.15)] text-center">
        <div className="my-4 p-4 rounded-2xl bg-gradient-to-br from-[#1d1f2b] to-[#0e1018] shadow-[0_0_25px_rgba(255,0,100,0.2),inset_0_0_20px_rgba(255,255,255,0.05)] relative max-w-4xl mx-auto">
          <div className="flex justify-between gap-4 py-4">
            {[reel1Ref, reel2Ref, reel3Ref].map((reel, index) => (
              <div
                key={index}
                style={{ height: REEL_HEIGHT }}
                className={`w-1/3 overflow-hidden rounded-xl bg-[#0b0d14] border-[3px] border-[#ff2f6e] shadow-[0_0_15px_rgba(255,0,100,0.4)] ${isSpinning ? "ring-2 ring-[#ff2f6e]/60" : ""}`}
              >
                <div
                  ref={reel}
                  className={`relative ${isSpinning ? "blur-[1px]" : ""}`}
                ></div>
              </div>
            ))}
          </div>
          <div className="absolute top-1/2 left-0 w-full h-[60px] border-t-[3px] border-b-[3px] border-[#ffe066] shadow-[0_0_20px_#ffe066] pointer-events-none -translate-y-1/2"></div>
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-[#0b0d14] to-transparent"></div>
            <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-[#0b0d14] to-transparent"></div>
          </div>
        </div>
        <div className="mt-4 flex gap-2 justify-center flex-wrap">
          <button
            onClick={spinAllReels}
            disabled={isSpinning}
            className="bg-[#ff2f6e] text-white border-none py-2 px-5 rounded-lg text-base font-bold cursor-pointer transition duration-150 uppercase tracking-wider hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSpinning ? "Spinning..." : "SPIN"}
          </button>
          <button
            onClick={spinAllReels}
            disabled={!currentGame || isSpinning}
            className="bg-[#3b3f52] text-white border-none py-2 px-5 rounded-lg text-base font-bold cursor-pointer transition duration-150 uppercase tracking-wider hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Re‑Roll
          </button>
          <button
            onClick={banGame}
            disabled={!currentGame || isSpinning}
            className="bg-[#ff0044] text-white border-none py-2 px-5 rounded-lg text-base font-bold cursor-pointer transition duration-150 uppercase tracking-wider hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Ban Game
          </button>
        </div>
        <div className="mt-4 flex items-center justify-center gap-3 text-sm text-[#c9ccd8]">
          <span>Final Row:</span>
          {finalRow.map((item, index) => (
            <span
              key={item + index}
              className={`px-3 py-1 rounded-full bg-[#0b0d14] border ${winnerIndex === index ? "border-[#ffe066] text-[#ffe066]" : "border-transparent"}`}
            >
              {item}
            </span>
          ))}
        </div>
        <p className="mt-2 text-sm opacity-80">
          Games remaining: <span className="font-bold">{remainingCount} / {GAMES.length}</span>
        </p>
      </div>

      <div className="bg-[#161925] rounded-2xl p-6 mb-8 shadow-[0_0_20px_rgba(255,0,100,0.15)]">
        <h2 className="text-2xl font-bold mb-4 text-[#ff2f6e]">Current Game</h2>
        <div className="text-3xl font-bold mb-2">{currentGame || "No game selected"}</div>
        <p className="mb-4">{currentGame ? "Play 30 minutes, then rate." : "Press SPIN to begin."}</p>

        <div className="mb-6">
          <button
            onClick={startTimer}
            disabled={!currentGame || isTimerRunning}
            className="bg-[#ff2f6e] text-white border-none py-2 px-5 rounded-lg text-base font-bold cursor-pointer transition duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed mr-2"
          >
            Start 30 min
          </button>
          <button
            onClick={resetTimer}
            disabled={!currentGame}
            className="bg-[#3b3f52] text-white border-none py-2 px-5 rounded-lg text-base font-bold cursor-pointer transition duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Reset
          </button>
        </div>

        <div>
          <h3 className="text-xl font-bold mb-2">Rating</h3>
          <div className="flex gap-2 mb-4 flex-wrap">
            {[1, 2, 3, 4, 5].map(num => (
              <button
                key={num}
                onClick={() => setCurrentRating(num)}
                className={`bg-[#3b3f52] text-white border-none py-1 px-4 rounded text-base font-bold cursor-pointer transition duration-150 hover:scale-105 ${currentRating === num ? "bg-[#ffe066] text-black" : ""}`}
              >
                {num}
              </button>
            ))}
          </div>
          <button
            onClick={saveRating}
            disabled={!currentGame || !currentRating}
            className="bg-[#ff2f6e] text-white border-none py-2 px-5 rounded-lg text-base font-bold cursor-pointer transition duration-150 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Save Session
          </button>
          <p className="mt-2 text-sm text-[#c9ccd8]">{saveStatus}</p>
        </div>
      </div>

      <div className="bg-[#161925] rounded-2xl p-6 mb-8 shadow-[0_0_20px_rgba(255,0,100,0.15)]">
        <h2 className="text-2xl font-bold mb-4">History</h2>
        <table className="w-full border-collapse mt-4">
          <thead>
            <tr>
              <th className="py-2 px-3 border-b border-[#2a2d3a] text-left text-[#aaa] font-semibold">Game</th>
              <th className="py-2 px-3 border-b border-[#2a2d3a] text-left text-[#aaa] font-semibold">Rating</th>
              <th className="py-2 px-3 border-b border-[#2a2d3a] text-left text-[#aaa] font-semibold">Minutes</th>
              <th className="py-2 px-3 border-b border-[#2a2d3a] text-left text-[#aaa] font-semibold">When</th>
            </tr>
          </thead>
          <tbody>
            {historyReversed.map((entry, idx) => (
              <tr key={`${entry.game}-${idx}`}>
                <td className="py-2 px-3 border-b border-[#2a2d3a]">{entry.game}</td>
                <td className="py-2 px-3 border-b border-[#2a2d3a]">
                  <span className="bg-[#0b0d14] py-1 px-3 rounded-full text-sm">{entry.rating}/5</span>
                </td>
                <td className="py-2 px-3 border-b border-[#2a2d3a]">{entry.minutes} min</td>
                <td className="py-2 px-3 border-b border-[#2a2d3a]">{new Date(entry.timestamp).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {currentGame && (
        <div
          className="fixed top-12 right-12 w-56 p-4 rounded-2xl bg-white/8 backdrop-blur-md text-white shadow-[0_0_20px_rgba(255,0,100,0.3)] z-50 cursor-move"
          style={{ left: `${timerOverlayPosition.x}px`, top: `${timerOverlayPosition.y}px` }}
          onMouseDown={handleMouseDown}
        >
          <div className="text-sm opacity-80 mb-2">Backlog Timer</div>
          <div className="text-base font-bold mb-2">{currentGame}</div>
          <div
            className="text-3xl font-black text-center"
            style={{ textShadow: "0 0 10px rgba(255, 0, 100, 0.6)" }}
          >
            {formatTime(timerSeconds)}
          </div>
        </div>
      )}
    </div>
  );
}

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const NAMES_WITH_SYLLABLES = [
  { name: 'Jordan', syllables: ['Jor', 'dan'] },
  { name: 'Taylor', syllables: ['Tay', 'lor'] },
  { name: 'Morgan', syllables: ['Mor', 'gan'] },
  { name: 'Cameron', syllables: ['Cam', 'er', 'on'] },
  { name: 'Emerson', syllables: ['Em', 'er', 'son'] },
  { name: 'Avery', syllables: ['Av', 'er', 'y'] },
  { name: 'Riley', syllables: ['Ri', 'ley'] },
  { name: 'Parker', syllables: ['Par', 'ker'] },
  { name: 'Sawyer', syllables: ['Saw', 'yer'] },
  { name: 'Finley', syllables: ['Fin', 'ley'] },
  { name: 'Sullivan', syllables: ['Sul', 'li', 'van'] },
  { name: 'Bennett', syllables: ['Ben', 'nett'] },
  { name: 'Coleman', syllables: ['Cole', 'man'] },
  { name: 'Kendall', syllables: ['Ken', 'dall'] },
  { name: 'Rowan', syllables: ['Ro', 'wan'] },
  { name: 'Quincy', syllables: ['Quin', 'cy'] },
  { name: 'Harlow', syllables: ['Har', 'low'] },
  { name: 'Lennox', syllables: ['Len', 'nox'] },
  { name: 'Casey', syllables: ['Ca', 'sey'] },
  { name: 'Skyler', syllables: ['Sky', 'ler'] },
  { name: 'Reese', syllables: ['Reese'] },
  { name: 'Sage', syllables: ['Sage'] },
  { name: 'Blake', syllables: ['Blake'] },
  { name: 'Hayes', syllables: ['Hayes'] }
];

const FACE_FEATURES = [
  'Eyes', 'Nose', 'Jaw', 'Hair', 'Ears',
  'Lips', 'Eyebrows', 'Forehead', 'Cheeks', 'Chin'
];

const FACE_NAME_LEVELS = [
  { level: 1, total: 6, pass: 4 },
  { level: 2, total: 8, pass: 6 },
  { level: 3, total: 10, pass: 7 },
  { level: 4, total: 12, pass: 9 },
  { level: 5, total: 14, pass: 10 },
  { level: 6, total: 16, pass: 12 },
  { level: 7, total: 18, pass: 14 }
];

const FEATURE_POOLS = {
  nose: {
    shapes: ['bulbous', 'button', 'hawk-like', 'broad and flat', 'sharp and angular', 'upturned', 'wide-bridged'],
    colors: ['rosy pink', 'ruddy red', 'pale ivory', 'sun-freckled', 'warm bronze'],
    sizes: ['enormous', 'tiny', 'wide', 'narrow and pointed', 'oversized'],
    textures: ['smooth and rounded', 'bumpy with pores', 'freckled', 'weather-roughened'],
    sounds: ['a quiet wet sniff', 'a sharp exhale like a tiny steam vent', 'a faint soft whistle on inhale'],
    sensations: ['soft and rubbery like a squeaky toy', 'cool as a river stone', 'warm and fleshy'],
    smells: ['faint trace of sunscreen', 'old cedar cologne', 'clean soap and water']
  },
  eyes: {
    shapes: ['wide and round', 'narrow and hooded', 'deep-set under heavy brows', 'almond-shaped'],
    colors: ['pale watery grey', 'dark brown like coffee grounds', 'ice-blue', 'amber-flecked hazel'],
    sizes: ['enormous and owlish', 'small and squinting', 'startlingly large', 'tiny and deep-buried'],
    textures: ['framed by thick dark lashes', 'ringed by deep crow feet', 'shadowed by heavy lids'],
    sounds: ['a slow deliberate blink', 'a flutter of lids while thinking', 'a tiny crinkle when smiling'],
    sensations: ['you feel watched even when they look away', 'there is a magnetic pull', 'they feel cool and still']
  },
  jaw: {
    shapes: ['square and blunt', 'tapered to a soft point', 'wide and heavy', 'soft and rounded'],
    colors: ['clean-shaven pale', 'peppered with dark stubble', 'shadowed with a short beard'],
    sizes: ['enormous and jutting forward', 'petite and delicate', 'broad as a shovel head'],
    textures: ['rough with coarse stubble', 'smooth and close-shaved', 'dimpled at the center'],
    sounds: ['a slight pop when yawning', 'a faint grind while concentrating'],
    sensations: ['solid and unyielding', 'soft and slightly yielding']
  },
  hair: {
    shapes: ['tight coiled curls', 'ruler-straight curtain', 'thinning and swept over', 'wild crown'],
    colors: ['stark silver-white', 'raven black', 'warm chestnut brown', 'bright copper-orange'],
    sizes: ['close-cropped to scalp', 'tumbling past shoulders', 'buzzed nearly invisible'],
    textures: ['coarse as fraying rope', 'silky fine', 'wiry and resistant', 'soft and plush'],
    sounds: ['a faint rustle when shaking head', 'a rasp when fingers run through'],
    sensations: ['cool and smooth', 'warm from the sun', 'dense and heavy'],
    smells: ['faint shampoo', 'bergamot oil', 'warm scalp and sun']
  },
  ears: {
    shapes: ['large and low-hanging', 'small and close to the skull', 'jutting out like doors', 'round and soft-lobed'],
    colors: ['flushed pink', 'pale and translucent', 'tanned and weathered'],
    sizes: ['enormous', 'tiny and elfin', 'wide and cupped'],
    textures: ['soft and cartilaginous', 'creased with age', 'smooth and unblemished'],
    sounds: ['you imagine wind moving past them', 'a faint hum if you lean close'],
    sensations: ['soft and cool', 'oddly warm', 'pliable as kneaded dough']
  },
  lips: {
    shapes: ['thin as a paper cut', 'full and pouty', 'uneven top and bottom', 'wide and stretched'],
    colors: ['deep burgundy', 'pale and bloodless', 'natural coral pink', 'chapped at the edges'],
    sizes: ['enormous', 'barely there', 'thick and deeply pronounced'],
    textures: ['dry and flaking', 'smooth and moisturized', 'rough-edged'],
    sounds: ['a soft sticky smack while talking', 'a dry click at the corners'],
    sensations: ['dry as old parchment', 'cool and smooth', 'warm and slightly damp']
  }
};

function pick(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

function normalizeName(value) {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

const MORPH_PROMPTS = {
  nose: [
    'Now the nose slowly inflates like a bright red balloon, then deflates on a soft hiss.',
    'The bridge of the nose warms to copper and bends like soft wax before snapping back.',
    'The tip glows cherry red, grows larger, and wiggles as if it is about to speak.'
  ],
  eyes: [
    'One eye enlarges like a camera lens, focuses, and clicks as if taking your picture.',
    'The irises ripple like water rings, then sharpen into vivid glass marbles.',
    'The eyelids blink in slow motion while the eyes brighten like tiny stage lights.',
    'The eyes bulge forward and lock into an unbroken stare, then slowly settle back.'
  ],
  jaw: [
    'The jawline stretches wider like a drawer sliding open, then settles back into place.',
    'The chin grows heavier like carved stone, then softens and rounds again.',
    'The jaw shifts side to side with a gentle mechanical glide, then locks in memory.'
  ],
  hair: [
    'A patch of hair rises like wind-blown grass, changes color, then falls neatly back.',
    'The hair thickens into a dramatic wave, then untwists into its original style.',
    'Strands spiral upward like coiled springs, then relax and drape naturally again.'
  ],
  ears: [
    'One ear grows slightly larger like a listening dish, turns rosy, then returns to normal.',
    'The ear edges curl like paper in warm air, then flatten back into place.',
    'The lobe stretches like soft rubber, then gently snaps back to its original shape.'
  ],
  lips: [
    'The lips puff brighter and fuller, then purse and whisper the name in silence.',
    'The upper lip arches high like a drawn bow, then relaxes into its normal line.',
    'The lips shift to vivid red, widen into a grin, then settle into a neutral shape.',
    'A crooked smile pulls the cheeks back into a massive eerie grin before easing down.'
  ]
};

function generateVividDescription() {
  const featureKey = pick(Object.keys(FEATURE_POOLS));
  const pool = FEATURE_POOLS[featureKey];
  const featureLabel = featureKey === 'jaw' ? 'jaw and chin' : featureKey;

  const text =
    `Close your eyes. Focus immediately on the ${featureLabel}: a ${pick(pool.sizes)}, ${pick(pool.shapes)} detail in ${pick(pool.colors)} tones. ` +
    `Notice texture and feel: ${pick(pool.textures)} and ${pick(pool.sensations)}. ` +
    `Hear ${pick(pool.sounds)}.` +
    (pool.smells ? ` Catch ${pick(pool.smells)} for one breath.` : ' Take one calm breath.') +
    ` ${pick(MORPH_PROMPTS[featureKey])} ` +
    `Freeze that changing ${featureLabel} as your anchor.`;

  return { feature: featureLabel, text };
}

async function buildFaces(count) {
  const selectedNames = shuffle(NAMES_WITH_SYLLABLES).slice(0, count);
  const res = await fetch(`https://randomuser.me/api/?results=${count}&inc=picture&noinfo`);
  const data = await res.json();
  return selectedNames.map((n, i) => ({
    id: i + 1,
    name: n.name,
    imageUrl: data.results[i].picture.large
  }));
}

function FaceToName({ onExit }) {
  const savedLevel = Number(localStorage.getItem('faceToNameLevel') || '5');
  const safeLevel = FACE_NAME_LEVELS.find(l => l.level === savedLevel) || FACE_NAME_LEVELS[4];

  const [level, setLevel] = useState(safeLevel);
  const [phase, setPhase] = useState('intro');
  const [faces, setFaces] = useState([]);
  const [memorizeIndex, setMemorizeIndex] = useState(0);
  const [memorizeSeconds, setMemorizeSeconds] = useState(0);
  const [recallOrder, setRecallOrder] = useState([]);
  const [recallIndex, setRecallIndex] = useState(0);
  const [nameInput, setNameInput] = useState('');
  const [answers, setAnswers] = useState([]);
  const inputRef = useRef(null);

  useEffect(() => {
    if (phase === 'memorize' && memorizeSeconds > 0) {
      const t = setTimeout(() => setMemorizeSeconds(s => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (phase === 'memorize' && memorizeSeconds === 0) startRecall();
  }, [phase, memorizeSeconds]);

  useEffect(() => {
    if (phase === 'recall') inputRef.current?.focus();
  }, [phase, recallIndex]);

  const startLevel = async () => {
    setPhase('loading');
    const levelFaces = await buildFaces(level.total);
    setFaces(levelFaces);
    setMemorizeIndex(0);
    setMemorizeSeconds(Math.max(30, level.total * 4));
    setAnswers([]);
    setPhase('memorize');
  };

  const startRecall = () => {
    setRecallOrder(shuffle(faces));
    setRecallIndex(0);
    setNameInput('');
    setPhase('recall');
  };

  const submit = (e) => {
    e?.preventDefault();
    if (!nameInput.trim()) return;
    const current = recallOrder[recallIndex];
    const correct = normalizeName(nameInput) === normalizeName(current.name);
    setAnswers(prev => [...prev, { face: current, given: nameInput.trim(), correct }]);
    if (recallIndex + 1 < recallOrder.length) {
      setRecallIndex(i => i + 1);
      setNameInput('');
    } else {
      setPhase('results');
    }
  };

  const correct = answers.filter(a => a.correct).length;
  const passed = correct >= level.pass;

  const levelUpIfPassed = () => {
    if (!passed) return;
    const next = FACE_NAME_LEVELS.find(l => l.level === level.level + 1);
    if (next) { localStorage.setItem('faceToNameLevel', String(next.level)); setLevel(next); }
  };

  if (phase === 'loading') return <div className="training-mode"><div className="mode-header"><h2>Face → Name</h2></div><p className="instructions">Loading faces…</p></div>;

  if (phase === 'intro') return (
    <div className="training-mode">
      <div className="mode-header"><button className="back-btn" onClick={onExit}>Back</button><h2>Face → Name</h2></div>
      <div className="ml-intro-card">
        <h3>Level {level.level}</h3>
        <p>Memorize {level.total} faces and names, then type each name from the face alone. Need {level.pass} correct to advance.</p>
        <button className="btn-primary" onClick={startLevel}>Start Level {level.level}</button>
      </div>
    </div>
  );

  if (phase === 'memorize') {
    const cur = faces[memorizeIndex];
    return (
      <div className="training-mode training-wide">
        <div className="ml-top-bar">
          <span className="ml-mode-title">Memorize — Face → Name</span>
          <span>Level {level.level}</span>
          <span>Time left: {memorizeSeconds}s</span>
          <button className="btn-compact" onClick={startRecall}>Done Early</button>
        </div>
        {cur && (
          <div className="ml-main-layout">
            <div className="ml-focus-card">
              <img src={cur.imageUrl} alt={cur.name} className="ml-focus-image" />
              <div className="ml-focus-name">{cur.name}</div>
              <div className="ml-nav-row">
                <button className="btn-compact" onClick={() => setMemorizeIndex(i => Math.max(0, i - 1))} disabled={memorizeIndex === 0}>Prev</button>
                <button className="btn-compact" onClick={() => setMemorizeIndex(i => Math.min(faces.length - 1, i + 1))} disabled={memorizeIndex === faces.length - 1}>Next</button>
              </div>
            </div>
            <div className="ml-thumb-grid">
              {faces.map((f, i) => (
                <button key={f.id} className={`ml-thumb-btn${i === memorizeIndex ? ' active' : ''}`} onClick={() => setMemorizeIndex(i)}>
                  <img src={f.imageUrl} alt={f.name} className="ml-thumb-img" />
                  <span className="ml-thumb-name">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'recall') {
    const cur = recallOrder[recallIndex];
    return (
      <div className="training-mode training-wide">
        <div className="ml-top-bar">
          <span className="ml-mode-title">Face → Name</span>
          <span>{recallIndex + 1} / {recallOrder.length}</span>
        </div>
        <div className="ml-recall-card">
          <img src={cur.imageUrl} alt="Face" className="ml-focus-image" />
          <form onSubmit={submit} className="ml-input-row">
            <input ref={inputRef} value={nameInput} onChange={e => setNameInput(e.target.value)} className="syl-input" placeholder="Type the name" autoComplete="off" />
            <button type="submit" className="btn-primary">Next</button>
          </form>
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    levelUpIfPassed();
    return (
      <div className="session-complete" style={{ maxWidth: '560px' }}>
        <h2>{passed ? 'Level Cleared!' : 'Keep Training'}</h2>
        <div className="final-score"><p>{correct} / {level.total} correct</p></div>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          {answers.map((a, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <img src={a.face.imageUrl} alt="" style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover' }} />
              <div>
                <div style={{ fontWeight: 700 }}>{a.face.name}</div>
                <div style={{ fontSize: 13, color: a.correct ? 'var(--success)' : 'var(--error)' }}>You said: {a.given}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="viz-buttons" style={{ marginTop: '24px' }}>
          <button className="btn-primary" onClick={() => setPhase('intro')}>{passed ? `Level ${Math.min(level.level + 1, FACE_NAME_LEVELS.length)}` : 'Retry'}</button>
          <button className="btn-secondary" onClick={onExit}>Back to Home</button>
        </div>
      </div>
    );
  }

  return null;
}

function NameToFace({ onExit }) {
  const savedLevel = Number(localStorage.getItem('nameToFaceLevel') || '5');
  const safeLevel = FACE_NAME_LEVELS.find(l => l.level === savedLevel) || FACE_NAME_LEVELS[4];

  const [level, setLevel] = useState(safeLevel);
  const [phase, setPhase] = useState('intro');
  const [faces, setFaces] = useState([]);
  const [memorizeIndex, setMemorizeIndex] = useState(0);
  const [memorizeSeconds, setMemorizeSeconds] = useState(0);
  const [recallOrder, setRecallOrder] = useState([]);
  const [recallIndex, setRecallIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    if (phase === 'memorize' && memorizeSeconds > 0) {
      const t = setTimeout(() => setMemorizeSeconds(s => s - 1), 1000);
      return () => clearTimeout(t);
    }
    if (phase === 'memorize' && memorizeSeconds === 0) startRecall();
  }, [phase, memorizeSeconds]);

  const startLevel = async () => {
    setPhase('loading');
    const levelFaces = await buildFaces(level.total);
    setFaces(levelFaces);
    setMemorizeIndex(0);
    setMemorizeSeconds(Math.max(30, level.total * 4));
    setAnswers([]);
    setPhase('memorize');
  };

  const startRecall = () => {
    setRecallOrder(shuffle(faces));
    setRecallIndex(0);
    setPhase('recall');
  };

  const selectFace = (faceId) => {
    const prompt = recallOrder[recallIndex];
    setAnswers(prev => [...prev, { prompt, selectedId: faceId, correct: prompt.id === faceId }]);
    if (recallIndex + 1 < recallOrder.length) {
      setRecallIndex(i => i + 1);
    } else {
      setPhase('results');
    }
  };

  const correct = answers.filter(a => a.correct).length;
  const passed = correct >= level.pass;

  const levelUpIfPassed = () => {
    if (!passed) return;
    const next = FACE_NAME_LEVELS.find(l => l.level === level.level + 1);
    if (next) { localStorage.setItem('nameToFaceLevel', String(next.level)); setLevel(next); }
  };

  if (phase === 'loading') return <div className="training-mode"><div className="mode-header"><h2>Name → Face</h2></div><p className="instructions">Loading faces…</p></div>;

  if (phase === 'intro') return (
    <div className="training-mode">
      <div className="mode-header"><button className="back-btn" onClick={onExit}>Back</button><h2>Name → Face</h2></div>
      <div className="ml-intro-card">
        <h3>Level {level.level}</h3>
        <p>Memorize {level.total} faces and names, then pick the right face when shown a name. Need {level.pass} correct to advance.</p>
        <button className="btn-primary" onClick={startLevel}>Start Level {level.level}</button>
      </div>
    </div>
  );

  if (phase === 'memorize') {
    const cur = faces[memorizeIndex];
    return (
      <div className="training-mode training-wide">
        <div className="ml-top-bar">
          <span className="ml-mode-title">Memorize — Name → Face</span>
          <span>Level {level.level}</span>
          <span>Time left: {memorizeSeconds}s</span>
          <button className="btn-compact" onClick={startRecall}>Done Early</button>
        </div>
        {cur && (
          <div className="ml-main-layout">
            <div className="ml-focus-card">
              <img src={cur.imageUrl} alt={cur.name} className="ml-focus-image" />
              <div className="ml-focus-name">{cur.name}</div>
              <div className="ml-nav-row">
                <button className="btn-compact" onClick={() => setMemorizeIndex(i => Math.max(0, i - 1))} disabled={memorizeIndex === 0}>Prev</button>
                <button className="btn-compact" onClick={() => setMemorizeIndex(i => Math.min(faces.length - 1, i + 1))} disabled={memorizeIndex === faces.length - 1}>Next</button>
              </div>
            </div>
            <div className="ml-thumb-grid">
              {faces.map((f, i) => (
                <button key={f.id} className={`ml-thumb-btn${i === memorizeIndex ? ' active' : ''}`} onClick={() => setMemorizeIndex(i)}>
                  <img src={f.imageUrl} alt={f.name} className="ml-thumb-img" />
                  <span className="ml-thumb-name">{f.name}</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  if (phase === 'recall') {
    const prompt = recallOrder[recallIndex];
    return (
      <div className="training-mode training-wide">
        <div className="ml-top-bar">
          <span className="ml-mode-title">Name → Face</span>
          <span>{recallIndex + 1} / {recallOrder.length}</span>
        </div>
        <div className="ml-recall-name">Find: <strong>{prompt.name}</strong></div>
        <div className="ml-select-grid">
          {faces.map(face => (
            <button key={face.id} className="ml-select-btn" onClick={() => selectFace(face.id)}>
              <img src={face.imageUrl} alt="Face" className="ml-thumb-img" />
            </button>
          ))}
        </div>
      </div>
    );
  }

  if (phase === 'results') {
    levelUpIfPassed();
    return (
      <div className="session-complete" style={{ maxWidth: '560px' }}>
        <h2>{passed ? 'Level Cleared!' : 'Keep Training'}</h2>
        <div className="final-score"><p>{correct} / {level.total} correct</p></div>
        <div style={{ marginTop: '20px', display: 'flex', flexDirection: 'column', gap: '12px', textAlign: 'left' }}>
          {answers.map((a, i) => {
            const selected = faces.find(f => f.id === a.selectedId);
            return (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <img src={a.prompt.imageUrl} alt="" style={{ width: 48, height: 48, borderRadius: 6, objectFit: 'cover', border: a.correct ? '2px solid var(--success)' : '2px solid var(--error)' }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{a.prompt.name}</div>
                  {!a.correct && selected && <div style={{ fontSize: 13, color: 'var(--error)' }}>You picked: {selected.name}</div>}
                  {a.correct && <div style={{ fontSize: 13, color: 'var(--success)' }}>Correct!</div>}
                </div>
              </div>
            );
          })}
        </div>
        <div className="viz-buttons" style={{ marginTop: '24px' }}>
          <button className="btn-primary" onClick={() => setPhase('intro')}>{passed ? `Level ${Math.min(level.level + 1, FACE_NAME_LEVELS.length)}` : 'Retry'}</button>
          <button className="btn-secondary" onClick={onExit}>Back to Home</button>
        </div>
      </div>
    );
  }

  return null;
}

function getFeatureFromClick(xPct, yPct) {
  if (yPct < 0.18) return 'Hair';
  if ((xPct < 0.18 || xPct > 0.82) && yPct > 0.22 && yPct < 0.65) return 'Ears';
  if (yPct < 0.30) return 'Forehead';
  if (yPct < 0.42) return 'Eyebrows';
  if (yPct < 0.52) return 'Eyes';
  if (yPct < 0.63 && xPct > 0.32 && xPct < 0.68) return 'Nose';
  if (yPct < 0.72 && (xPct < 0.35 || xPct > 0.65)) return 'Cheeks';
  if (yPct < 0.76) return 'Lips';
  return 'Jaw';
}

function FaceDetailChecker({ onExit }) {
  const count = 6;
  const [faces, setFaces] = useState([]);
  const [loading, setLoading] = useState(true);
  const [index, setIndex] = useState(0);
  const [clicks, setClicks] = useState([]);
  const [flash, setFlash] = useState(null);
  const [done, setDone] = useState(false);

  useEffect(() => {
    fetch(`https://randomuser.me/api/?results=${count}&inc=picture&noinfo`)
      .then(r => r.json())
      .then(data => {
        setFaces(data.results.map((u, i) => ({ id: i, imageUrl: u.picture.large })));
        setLoading(false);
      });
  }, []);

  const handleImageClick = (e) => {
    if (flash) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const xPct = (e.clientX - rect.left) / rect.width;
    const yPct = (e.clientY - rect.top) / rect.height;
    const feature = getFeatureFromClick(xPct, yPct);

    setFlash({ xPct, yPct, feature });

    setTimeout(() => {
      setClicks(prev => [...prev, {
        imageUrl: faces[index].imageUrl,
        xPct,
        yPct,
        feature
      }]);
      setFlash(null);
      if (index + 1 < count) {
        setIndex(i => i + 1);
      } else {
        setDone(true);
      }
    }, 650);
  };

  if (done) {
    return (
      <div className="training-mode">
        <div className="mode-header">
          <button className="back-btn" onClick={onExit}>Back</button>
          <h2>What Caught Your Eye</h2>
        </div>
        <p className="instructions">Here's where your attention landed on each face.</p>
        <div className="fdc-review-grid">
          {clicks.map((c, i) => (
            <div key={i} className="fdc-review-card">
              <div className="fdc-img-wrap">
                <img src={c.imageUrl} alt="Face" className="fdc-review-img" />
                <div className="fdc-dot" style={{ left: `${c.xPct * 100}%`, top: `${c.yPct * 100}%` }} />
              </div>
              <div className="fdc-feature-label">{c.feature}</div>
            </div>
          ))}
        </div>
        <button className="btn-primary" style={{ marginTop: '24px' }} onClick={onExit}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="training-mode">
      <div className="mode-header">
        <button className="back-btn" onClick={onExit}>Back</button>
        <h2>Face Detail Checker</h2>
        <span className="progress-pill">{index + 1} / {count}</span>
      </div>

      <p className="instructions">Click the feature that stands out most.</p>
      {loading ? (
        <p className="instructions">Loading faces…</p>
      ) : (
      <div
        className="fdc-img-wrap fdc-clickable"
        onClick={handleImageClick}
        style={{ cursor: flash ? 'default' : 'crosshair' }}
      >
        <img src={faces[index].imageUrl} alt="Face" className="fdc-main-img" />
        {flash && (
          <>
            <div className="fdc-dot" style={{ left: `${flash.xPct * 100}%`, top: `${flash.yPct * 100}%` }} />
            <div className="fdc-flash-label">{flash.feature}</div>
          </>
        )}
      </div>
      )}
    </div>
  );
}

function NameBreaker({ onExit }) {
  const [items] = useState(() => shuffle(NAMES_WITH_SYLLABLES).slice(0, 7));
  const [index, setIndex] = useState(0);
  const [breaks, setBreaks] = useState(new Set());
  const [revealed, setRevealed] = useState(false);
  const [done, setDone] = useState(false);

  const current = items[index];
  const letters = current.name.split('');

  const toggleBreak = pos => {
    setBreaks(prev => {
      const next = new Set(prev);
      if (next.has(pos)) next.delete(pos);
      else next.add(pos);
      return next;
    });
  };

  const buildSyllables = () => {
    const out = [];
    let currentPart = '';
    letters.forEach((letter, i) => {
      currentPart += letter;
      if (breaks.has(i) && i < letters.length - 1) {
        out.push(currentPart);
        currentPart = '';
      }
    });
    out.push(currentPart);
    return out;
  };

  const next = () => {
    if (!revealed) {
      setRevealed(true);
      return;
    }

    if (index + 1 < items.length) {
      setIndex(i => i + 1);
      setBreaks(new Set());
      setRevealed(false);
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="session-complete">
        <h2>Done</h2>
        <p style={{ color: 'var(--text-light)', marginBottom: '24px' }}>
          You now have cleaner sound chunks to reconstruct names quickly.
        </p>
        <button onClick={onExit}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="training-mode">
      <div className="mode-header">
        <button className="back-btn" onClick={onExit}>Back</button>
        <h2>Name Breaker</h2>
        <span className="progress-pill">{index + 1} / {items.length}</span>
      </div>

      <p className="instructions">Tap separators between letters to mark syllables.</p>
      <div className="name-letters">
        {letters.map((letter, i) => (
          <React.Fragment key={i}>
            <span className="name-letter">{letter}</span>
            {i < letters.length - 1 && (
              <button
                className={`break-divider${breaks.has(i) ? ' active' : ''}`}
                onClick={() => toggleBreak(i)}
                aria-label="Toggle break"
              >
                {breaks.has(i) ? '|' : '.'}
              </button>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="syllable-preview">{buildSyllables().join(' . ')}</div>

      {revealed && (
        <div className="reveal-box">
          <p>Common breakdown: <strong>{current.syllables.join(' . ')}</strong></p>
        </div>
      )}

      <button className="btn-primary" onClick={next}>
        {!revealed ? 'Check' : index + 1 < items.length ? 'Next Name' : 'Finish'}
      </button>
    </div>
  );
}

function SyllableAssociator({ onExit }) {
  const [items] = useState(() =>
    shuffle(NAMES_WITH_SYLLABLES)
      .filter(item => item.syllables.length > 1)
      .slice(0, 5)
  );
  const [nameIndex, setNameIndex] = useState(0);
  const [syllableIndex, setSyllableIndex] = useState(0);
  const [word, setWord] = useState('');
  const [associations, setAssociations] = useState([]);
  const [done, setDone] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, [nameIndex, syllableIndex]);

  const current = items[nameIndex];
  const currentSyllable = current.syllables[syllableIndex];
  const totalSteps = items.reduce((sum, item) => sum + item.syllables.length, 0);
  const doneSteps = items.slice(0, nameIndex).reduce((sum, item) => sum + item.syllables.length, 0) + syllableIndex;

  const submit = e => {
    e.preventDefault();
    if (!word.trim()) return;

    setAssociations(prev => [
      ...prev,
      { name: current.name, syllable: currentSyllable, word: word.trim() }
    ]);

    setWord('');

    if (syllableIndex + 1 < current.syllables.length) {
      setSyllableIndex(i => i + 1);
      return;
    }

    if (nameIndex + 1 < items.length) {
      setNameIndex(i => i + 1);
      setSyllableIndex(0);
      return;
    }

    setDone(true);
  };

  if (done) {
    return (
      <div className="session-complete" style={{ maxWidth: '520px' }}>
        <h2>Your syllable hooks</h2>
        <div style={{ textAlign: 'left', marginBottom: '20px' }}>
          {items.map(item => (
            <div key={item.name} style={{ marginBottom: '12px' }}>
              <strong>{item.name}</strong>
              <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', marginTop: '8px' }}>
                {associations.filter(a => a.name === item.name).map((a, idx) => (
                  <span key={idx} className="assoc-tag">
                    <em>{a.syllable}</em> to {a.word}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <button onClick={onExit}>Back to Home</button>
      </div>
    );
  }

  return (
    <div className="training-mode">
      <div className="mode-header">
        <button className="back-btn" onClick={onExit}>Back</button>
        <h2>Syllable Associator</h2>
        <span className="progress-pill">{doneSteps + 1} / {totalSteps}</span>
      </div>

      <p className="instructions">Choose a word that sounds linked to this syllable.</p>

      <div className="name-context">
        {current.syllables.map((syl, idx) => (
          <span key={idx} className={`syl-chip${idx === syllableIndex ? ' active' : idx < syllableIndex ? ' done' : ''}`}>
            {syl}
          </span>
        ))}
      </div>

      <div className="syllable-focus">{currentSyllable}</div>

      <form onSubmit={submit}>
        <input
          ref={inputRef}
          className="syl-input"
          value={word}
          onChange={e => setWord(e.target.value)}
          placeholder={`"${currentSyllable}" sounds like...`}
          autoComplete="off"
        />
        <button type="submit" className="btn-primary" disabled={!word.trim()}>
          Confirm
        </button>
      </form>
    </div>
  );
}

function Visualizer({ onExit }) {
  const [desc, setDesc] = useState(() => generateVividDescription());
  const [phase, setPhase] = useState('idle'); // idle | speaking | pause
  const [pauseCount, setPauseCount] = useState(0);
  const activeRef = useRef(false);
  const timerRef = useRef(null);
  const speakRef = useRef(null);

  const stopAll = () => {
    activeRef.current = false;
    window.speechSynthesis?.cancel();
    clearTimeout(timerRef.current);
    timerRef.current = null;
    setPhase('idle');
    setPauseCount(0);
  };

  const scheduleNext = () => {
    if (!activeRef.current) return;
    let secs = 4;
    setPauseCount(secs);
    setPhase('pause');

    const tick = () => {
      secs--;
      if (secs <= 0) {
        if (!activeRef.current) return;
        const next = generateVividDescription();
        setDesc(next);
        setPauseCount(0);
        speakRef.current(next);
      } else {
        setPauseCount(secs);
        timerRef.current = setTimeout(tick, 1000);
      }
    };
    timerRef.current = setTimeout(tick, 1000);
  };

  const speakDesc = (descToSpeak) => {
    if (!window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(descToSpeak.text);
    utterance.rate = 0.72;
    utterance.pitch = 0.95;
    utterance.onstart = () => setPhase('speaking');
    utterance.onend = () => {
      if (activeRef.current) scheduleNext();
    };
    utterance.onerror = () => {
      if (activeRef.current) scheduleNext();
    };
    window.speechSynthesis.speak(utterance);
  };

  speakRef.current = speakDesc;

  const start = () => {
    activeRef.current = true;
    speakDesc(desc);
  };

  const resume = () => {
    activeRef.current = true;
    const next = generateVividDescription();
    setDesc(next);
    speakDesc(next);
  };

  useEffect(() => {
    return () => {
      activeRef.current = false;
      window.speechSynthesis?.cancel();
      clearTimeout(timerRef.current);
    };
  }, []);

  return (
    <div className="training-mode">
      <div className="mode-header">
        <button className="back-btn" onClick={() => { stopAll(); onExit(); }}>Back</button>
        <h2>Vivid Visualizer</h2>
      </div>

      <div className="visualizer-card">
        <div className="feature-tag">{desc.feature}</div>
        <p className="visualizer-text">{desc.text}</p>
      </div>

      <div className="viz-status">
        {phase === 'speaking' && <span className="viz-status-label">Speaking…</span>}
        {phase === 'pause' && <span className="viz-status-label">Next in {pauseCount}s</span>}
      </div>

      <div className="viz-buttons" style={{ marginTop: '20px' }}>
        {phase === 'idle' ? (
          <button className="btn-primary" onClick={start}>Start</button>
        ) : (
          <button className="btn-secondary" onClick={stopAll}>Stop</button>
        )}
        {phase === 'idle' && (
          <button className="btn-secondary" onClick={() => setDesc(generateVividDescription())}>
            New Description
          </button>
        )}
      </div>
    </div>
  );
}

export default function TrainingMode() {
  const { mode } = useParams();
  const navigate = useNavigate();
  const exit = () => navigate('/');

  const pages = {
    'face-to-name': <FaceToName onExit={exit} />,
    'name-to-face': <NameToFace onExit={exit} />,
    'face-detail-checker': <FaceDetailChecker onExit={exit} />,
    'name-breaker': <NameBreaker onExit={exit} />,
    'syllable-associator': <SyllableAssociator onExit={exit} />,
    'visualizer': <Visualizer onExit={exit} />
  };

  return pages[mode] || (
    <div className="training-mode">
      <p>Unknown mode.</p>
      <button className="btn-primary" onClick={exit}>Back to Home</button>
    </div>
  );
}

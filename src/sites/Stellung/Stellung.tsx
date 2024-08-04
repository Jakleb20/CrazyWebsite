import React, { useState, useEffect } from 'react';

const Farben = ['Rot', 'Blau', 'Grün', 'Gelb'];
const FarbenCodes: Record<string, number> = {
    'Rot': 6,
    'Blau': 8,
    'Grün': 2,
    'Gelb': 4,
};

// Mapping von deutschen Farben zu CSS Farben
const CSSFarben: Record<string, string> = {
    'Rot': 'red',
    'Blau': 'blue',
    'Grün': 'green',
    'Gelb': 'yellow',
};

// Schwierigkeitsgrade
const Schwierigkeitsgrade = ['Einfach', 'Mittel', 'Schwierig'];

const Stellung: React.FC = () => {
    const [modus, setModus] = useState<'Farbe' | 'Text'>('Farbe');
    const [aktuelleFarbe, setAktuelleFarbe] = useState<string>(Farben[Math.floor(Math.random() * Farben.length)]);
    const [text, setText] = useState<string>(Farben[Math.floor(Math.random() * Farben.length)]);
    const [feedback, setFeedback] = useState<string>('');
    const [schwierigkeitsgrad, setSchwierigkeitsgrad] = useState<string>('Einfach');
    const [richtigeAntworten, setRichtigeAntworten] = useState<number>(0);
    const [falscheAntworten, setFalscheAntworten] = useState<number>(0);
    const [sitzungLäuft, setSitzungLäuft] = useState<boolean>(false);
    const [zeitÜbrig, setZeitÜbrig] = useState<number>(60);
    const [statistikAnzeigen, setStatistikAnzeigen] = useState<boolean>(false);

    useEffect(() => {
        let timer: number | null = null;

        if (sitzungLäuft && zeitÜbrig > 0) {
            timer = window.setTimeout(() => setZeitÜbrig(zeitÜbrig - 1), 1000);
        } else if (zeitÜbrig === 0) {
            setSitzungLäuft(false);
            setStatistikAnzeigen(true);
        }

        return () => {
            if (timer) clearTimeout(timer);
        };
    }, [sitzungLäuft, zeitÜbrig]);

    const generiereNeuenZustand = () => {
        setAktuelleFarbe(Farben[Math.floor(Math.random() * Farben.length)]);
        setText(Farben[Math.floor(Math.random() * Farben.length)]);
        setFeedback('');
    };

    const handleTasteDrücken = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (!sitzungLäuft) return;

        const taste = e.key;
        const code = FarbenCodes[modus === 'Farbe' ? aktuelleFarbe : text];
        if (parseInt(taste, 10) === code) {
            setFeedback('Richtig!');
            setRichtigeAntworten(richtigeAntworten + 1);
        } else {
            setFeedback('Falsch!');
            setFalscheAntworten(falscheAntworten + 1);
        }
        generiereNeuenZustand();
    };

    const handleSitzungStarten = () => {
        setRichtigeAntworten(0);
        setFalscheAntworten(0);
        setZeitÜbrig(60);
        setStatistikAnzeigen(false);
        setSitzungLäuft(true);
        generiereNeuenZustand();
    };

    return (
        <div tabIndex={0} onKeyDown={handleTasteDrücken} style={{ textAlign: 'center', marginTop: '50px' }}>
            <div style={{ marginBottom: '20px' }}>
                <button onClick={() => setModus(modus === 'Farbe' ? 'Text' : 'Farbe')}>
                    Wechseln zu {modus === 'Farbe' ? 'Text' : 'Farbe'}
                </button>
            </div>
            <div style={{ marginBottom: '20px' }}>
                <label htmlFor="schwierigkeitsgrad">Schwierigkeitsgrad:</label>
                <select
                    id="schwierigkeitsgrad"
                    value={schwierigkeitsgrad}
                    onChange={(e) => setSchwierigkeitsgrad(e.target.value)}
                >
                    {Schwierigkeitsgrade.map((grad) => (
                        <option key={grad} value={grad}>
                            {grad}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <p>
                    Drücke die richtige Taste für {modus === 'Farbe' ? aktuelleFarbe : text}:
                </p>
                <ul>
                    <img src="../../assets/Tastaturlayout.png" alt="Tastaturlayout" style={{ width: '300px', height: 'auto' }} />
                    <li>8 für Blau</li>
                    <li>4 für Gelb</li>
                    <li>6 für Rot</li>
                    <li>2 für Grün</li>
                </ul>
            </div>
            {sitzungLäuft ? (
                <div>
                    <p>Zeit übrig: {zeitÜbrig} Sekunden</p>
                    <div style={{ marginTop: '20px' }}>
                        <h1 style={{ color: modus === 'Farbe' ? CSSFarben[aktuelleFarbe] : 'black' }}>
                            {modus === 'Text' ? text : 'Text'}
                        </h1>
                        {feedback && <p style={{ fontWeight: 'bold' }}>{feedback}</p>}
                    </div>
                </div>
            ) : (
                <button onClick={handleSitzungStarten}>Sitzung starten</button>
            )}

            {statistikAnzeigen && (
                <div style={{ marginTop: '20px', border: '1px solid black', padding: '20px', display: 'inline-block' }}>
                    <h2>Statistik</h2>
                    <p>Richtige Antworten: {richtigeAntworten}</p>
                    <p>Falsche Antworten: {falscheAntworten}</p>
                </div>
            )}
        </div>
    );
};

export default Stellung;

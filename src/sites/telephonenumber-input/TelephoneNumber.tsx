import React, { useState } from 'react';
import './TelephoneNumber.css';
import { useNavigate } from 'react-router-dom';

const TelephoneNumber: React.FC = () => {
    // Zustand für jede Eingabemethode
    const [standardNumber, setStandardNumber] = useState<string>('');
    const [sliderNumber, setSliderNumber] = useState<string>('1000000000');
    const [keyboardNumber, setKeyboardNumber] = useState<string>('');
    const [plusMinusNumber, setPlusMinusNumber] = useState<string>('1000000000');
    const [wheelNumber, setWheelNumber] = useState<string>('');
    const [maskedNumber, setMaskedNumber] = useState<string>('');
    const [randomNumber, setRandomNumber] = useState<string>('');

    const navigate = useNavigate();

    const handleStandardInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setStandardNumber(e.target.value);
    };

    const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSliderNumber(e.target.value);
    };

    const handleKeyboardClick = (value: string) => {
        setKeyboardNumber(prev => prev + value);
    };

    const handleIncrement = () => {
        setPlusMinusNumber(prev => String(Number(prev) + 1));
    };

    const handleDecrement = () => {
        setPlusMinusNumber(prev => String(Number(prev) - 1));
    };

    const handleWheelChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWheelNumber(e.target.value);
    };

    const handleMaskedChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMaskedNumber(e.target.value);
    };

    const handleRandomNumber = () => {
        setRandomNumber(String(Math.floor(Math.random() * 10000000000)));
    };

    return (
        <div className="container">
            <h1>Gib deine Telefonnummer auf kreative Arten ein</h1>
            <div className="input-methods">
                <div className="input-method">
                    <h2>1. Standard Input</h2>
                    <input
                        type="tel"
                        value={standardNumber}
                        onChange={handleStandardInputChange}
                        placeholder="Telefonnummer eingeben"
                    />
                </div>
                <div className="input-method">
                    <h2>2. Schieberegler</h2>
                    <input
                        type="range"
                        min="1000000000"
                        max="9999999999"
                        step="1"
                        value={sliderNumber}
                        onChange={handleSliderChange}
                    />
                    <p>Wert: {sliderNumber}</p>
                </div>
                <div className="input-method">
                    <h2>3. Ziffern-Tastatur</h2>
                    <div className="keyboard">
                        {['1', '2', '3', '4', '5', '6', '7', '8', '9', '0'].map(num => (
                            <button key={num} onClick={() => handleKeyboardClick(num)}>
                                {num}
                            </button>
                        ))}
                    </div>
                    <input
                        type="tel"
                        value={keyboardNumber}
                        readOnly
                    />
                </div>
                <div className="input-method">
                    <h2>4. Zahleneingabe mit Plus/Minus</h2>
                    <button onClick={handleDecrement}>-</button>
                    <input
                        type="tel"
                        value={plusMinusNumber}
                        readOnly
                    />
                    <button onClick={handleIncrement}>+</button>
                </div>
                <div className="input-method">
                    <h2>5. Wahlrad</h2>
                    <input
                        type="tel"
                        value={wheelNumber}
                        onChange={handleWheelChange}
                        placeholder="Wahlrad zum Einstellen"
                    />
                </div>
                <div className="input-method">
                    <h2>6. Maskiertes Eingabefeld</h2>
                    <input
                        type="tel"
                        value={maskedNumber}
                        onChange={handleMaskedChange}
                        placeholder="Telefonnummer maskiert"
                        pattern="\d{3}-\d{3}-\d{4}"
                    />
                    <p>Format: xxx-xxx-xxxx</p>
                </div>
                <div className="input-method">
                    <h2>7. Zufallsgenerator</h2>
                    <button onClick={handleRandomNumber}>Zufallsnummer generieren</button>
                    <input
                        type="tel"
                        value={randomNumber}
                        readOnly
                    />
                </div>
                <div className="input-method">
                    <h2>8. Zeichnen</h2>
                    <p>Zeichnen ist derzeit nicht implementiert.</p>
                </div>
                <div className="input-method">
                    <h2>9. Kopieren/Einfügen</h2>
                    <input
                        type="tel"
                        value={maskedNumber}
                        onChange={handleMaskedChange}
                        placeholder="Telefonnummer einfügen"
                    />
                </div>
                <div className="input-method">
                    <h2>10. Spracherkennung</h2>
                    <p>Spracherkennung ist derzeit nicht implementiert.</p>
                </div>
            </div>

            <button onClick={() => navigate("/")}>Back</button>
        </div>
    );
};

export default TelephoneNumber;

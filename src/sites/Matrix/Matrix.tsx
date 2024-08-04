import React, { useEffect, useRef } from 'react';
import './Matrix.css'; // Importiere das CSS für die Matrix-Komponente
import { useNavigate } from 'react-router-dom'; // Importiere den Hook zum Navigieren

const Matrix: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement | null>(null); // Referenz auf das Canvas-Element
    const navigate = useNavigate(); // Hook für die Navigation

    useEffect(() => {
        const canvas = canvasRef.current; // Hol das Canvas-Element
        if (!canvas) return; // Falls das Canvas nicht existiert, nichts tun

        const ctx = canvas.getContext('2d'); // Hol den 2D-Kontext des Canvas
        if (!ctx) return; // Falls der Kontext nicht existiert, nichts tun

        const width = canvas.width; // Canvas-Breite
        const height = canvas.height; // Canvas-Höhe
        const fontSize = 16; // Größe der Schriftart
        const columns = Math.floor(width / fontSize); // Berechne die Anzahl der Spalten
        const lines: { x: number, y: number, length: number }[] = []; // Array für die Linien

        // Initialisiere das Array der Linien mit zufälligen Längen
        for (let i = 0; i < columns; i++) {
            const length = Math.floor(Math.random() * 30) + 20; // Zufällige Länge zwischen 20 und 50
            lines.push({
                x: i * fontSize, // x-Position der Linie
                y: -length * fontSize, // y-Position der Linie (Start oben außerhalb des Canvas)
                length // Länge der Linie
            });
        }

        const draw = () => {
            ctx.clearRect(0, 0, width, height); // Lösche den gesamten Canvas-Bereich

            ctx.fillStyle = 'rgba(0, 0, 0, 0.1)'; // Setze die Hintergrundfarbe auf fast schwarz
            ctx.fillRect(0, 0, width, height); // Fülle den Canvas-Bereich mit der Hintergrundfarbe

            ctx.font = `${fontSize}px monospace`; // Setze die Schriftart und -größe

            lines.forEach(line => {
                for (let i = 0; i < line.length; i++) {
                    
                    // Berechne den Farbverlauf von weiß zu grün
                    const ratio = i / (line.length - 1); // Skaliere das Verhältnis auf [0, 1]
                    const redValue = 0; // Rot bleibt 0 (nicht verwendet)
                    const greenValue = Math.floor(255 * ratio); // Grün steigt von 0 bis 255
                    const blueValue = 0; // Blau bleibt 0 (nicht verwendet)

                    const color = `rgb(${redValue}, ${greenValue}, ${blueValue})`; // Erstelle die Farbe im RGB-Format
                    if(i == line.length - 1) {
                        ctx.fillStyle = `rgb(255, 255, 255)` // weiße farbe
                    } else {
                        ctx.fillStyle = color; // Setze die Farbe für den Text
                    }

                    const char = String.fromCharCode(Math.random() * 128); // Generiere ein zufälliges Zeichen
                    ctx.fillText(char, line.x, line.y + i * fontSize); // Zeichne das Zeichen auf das Canvas
                }

                line.y += fontSize; // Bewege die Linie nach unten

                // Wenn die Linie außerhalb des Canvas ist, setze sie zurück
                if (line.y > height) {
                    line.y = -line.length * fontSize; // Setze die y-Position auf den oberen Rand
                }
            });
        };

        const interval = setInterval(draw, 50); // Rufe die Zeichnen-Funktion alle 50 Millisekunden auf

        return () => {
            if (interval) clearInterval(interval); // Bereinige das Intervall bei der Komponentendemontage
        };
    }, []); // Leeres Abhängigkeits-Array: useEffect wird nur einmal beim Mounten der Komponente ausgeführt

    return (
        <div className="matrix-container">
            <canvas ref={canvasRef} width={window.innerWidth} height={window.innerHeight} /> {/* Canvas-Element */}
            <button onClick={() => navigate("/")}>back</button> {/* Button zum Zurücknavigieren */}
        </div>
    );
};

export default Matrix;

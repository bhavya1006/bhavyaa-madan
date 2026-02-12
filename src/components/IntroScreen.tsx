import { useEffect, useState } from "react";

type IntroScreenProps = {
    name: string;
    onStart: () => void;
    animateOut: boolean;
};

export default function IntroScreen({ name, onStart, animateOut }: IntroScreenProps) {
    const [showButton, setShowButton] = useState(false);
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowButton(true);
        }, 1400);

        const clock = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => {
            clearTimeout(timer);
            clearInterval(clock);
        };
    }, []);

    const formattedTime = time.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    const formattedDate = time.toLocaleDateString(undefined, {
        weekday: "short",
        day: "numeric",
        month: "short",
        year: "numeric",
    });

    return (
        <div className={`intro-container ${animateOut ? "zoom-out" : ""}`}>
            <div className="code-marquee">
               <div className="marquee-track">
    {Array(2).fill(`
Hello • नमस्ते • Bonjour • Hola • こんにちは • 안녕하세요 • 你好 • مرحبا • שלום • Ciao • Olá • Привет • 
Hallo • Selam • Sawubona • Shalom • Ahoj • Hej • Merhaba • Xin chào • Kumusta • Sabaidee • 
ਸਤ ਸ੍ਰੀ ਅਕਾਲ • Vanakkam • Nomoshkar • Kem cho • Salaam • Здравствуйте • 
console.log("Hello World"); • printf("Hello World"); • print("Hello World") • 
System.out.println("Hello World"); • echo "Hello World"; • 
fmt.Println("Hello World") • puts "Hello World" • 
cout << "Hello World"; • alert("Hello World"); • 
println!("Hello World"); • write("Hello World") • 
`).map((text, i) => (
      <span key={i} className="marquee-text">
        {text}
      </span>
    ))}
  </div>
            </div>
            <div className="intro-content">
                <h1 className="intro-name">{name}</h1>

                {showButton && (
                    <button className="intro-button" onClick={onStart}>
                        <span>Start</span>
                        <span className="arrow">→</span>
                    </button>
                )}
            </div>

            {/* Bottom Left - Date */}
            <div className="intro-date">{formattedDate}</div>

            {/* Bottom Right - Time */}
            <div className="intro-time">{formattedTime}</div>
        </div>
    );
}
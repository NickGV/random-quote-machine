import { useState } from "react";
import "./Quote.css";

export const QuoteComponent = () => {
    const [data, setData] = useState({
        quote: "Either you run the day, or the day runs you.",
        author: "Jim Rohn",
    });

    const fetchQuote = async () => {
        await fetch(
            "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json"
        )
            .then((resp) => {
                return resp.json();
            })
            .then((res) => {
                const quotesArray = res.quotes;
                const randomIndex = Math.floor(
                    Math.random() * quotesArray.length
                );
                const randomQuote = quotesArray[randomIndex];
                setData(randomQuote);
                changeColor();
            });
    };

    const changeColor = () => {
        const randomColor = getRandomColor();

        document.body.style.backgroundColor = randomColor;

        const elementsToUpdateColor = ["quote-icon", "text", "author"];
        const elementsToUpdateBgColor = [
            "twiter-link",
            "tumblr-link",
            "new-quote-button",
        ];
        elementsToUpdateColor.forEach((elementId) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.color = randomColor;
            }
        });
        elementsToUpdateBgColor.forEach((elementId) => {
            const element = document.getElementById(elementId);
            if (element) {
                element.style.backgroundColor = randomColor;
            }
        });
    };

    const getRandomColor = () => {
        // Generate a random hex color code
        return "#" + Math.floor(Math.random() * 16777215).toString(16);
    };

    const shareOnTwitter = () => {
        const twitterBaseUrl = "https://twitter.com/intent/tweet";
        const text = encodeURIComponent(`"${data.quote}" - ${data.author}`);
        const hashtags = encodeURIComponent("QuoteOfTheDay"); // Puedes ajustar los hashtags
        const twitterUrl = `${twitterBaseUrl}?text=${text}&hashtags=${hashtags}`;

        window.open(twitterUrl, "_blank");
    };

    const shareOnTumblr = () => {
        const tumblrBaseUrl = "https://www.tumblr.com/widgets/share/tool";
        const text = encodeURIComponent(`"${data.quote}" - ${data.author}`);
        const tags = encodeURIComponent("QuoteOfTheDay"); // Puedes ajustar las etiquetas
        const tumblrUrl = `${tumblrBaseUrl}?posttype=quote&content=${text}&tags=${tags}`;

        window.open(tumblrUrl, "_blank");
    };
    
    return (
        <>
            <div className="container background-color">
                <div className="quote">
                    <p id="text-container">
                        <i
                            className="fa-solid fa-quote-left quote-icon"
                            id="quote-icon"
                        ></i>
                        <span className="text" id="text">
                            {data.quote}
                        </span>
                    </p>
                    <p className="author " id="author">
                        - {data.author}
                    </p>

                    <div className="buttons">
                        <a
                            className="link"
                            id="twiter-link"
                            target="_blank"
                            onClick={shareOnTwitter}
                        >
                            <i className="fa-brands fa-twitter"></i>
                        </a>
                        <a
                            className="link"
                            id="tumblr-link"
                            onClick={shareOnTumblr}
                            target="_blank"
                        >
                            <i className="fa-brands fa-tumblr"></i>
                        </a>
                        <button
                            id="new-quote-button"
                            type="button"
                            className="new-quote-button"
                            onClick={fetchQuote}
                        >
                            New quote
                        </button>
                    </div>
                </div>
            </div>
            <footer className="attribution">
                <a
                    href="https://github.com/NickGV"
                    target="_blank"
                    rel="noreferrer"
                >
                    by NickGV
                </a>
            </footer>
        </>
    );
};

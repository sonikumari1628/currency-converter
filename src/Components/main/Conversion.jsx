import React, { useEffect, useState } from "react";
import "./Conversion.css";
import { Avatar, Box, Card, Paper, TextField, Typography } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SwapVertIcon from "@mui/icons-material/SwapVert";

import INR from "../images/INR.png";
import USD from "../images/USD.png";
import JPY from "../images/JPY.png";
import SGD from "../images/SGD.png";
import EUR from "../images/EUR.png";
import GBP from "../images/GBP.png";
import AUD from "../images/AUD.png";
import CAD from "../images/CAD.png";
import CHF from "../images/CHF.png";
import HKD from "../images/HKD.png";
import NZD from "../images/NZD.png";

const Conversion = () => {
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const currency = [
        "INR",
        "USD",
        "JPY",
        "SGD",
        "EUR",
        "GBP",
        "AUD",
        "CAD",
        "CHF",
        "HKD",
        "NZD",
    ];
    const [selectedCurrency1, setSelectedCurrency1] = useState(
        localStorage.getItem("selectedCurrency1") || "INR"
    );
    const [selectedCurrency2, setSelectedCurrency2] = useState(
        localStorage.getItem("selectedCurrency2") || "USD"
    );

    const [showKeypad, setShowKeypad] = useState(false);
    const [inputValue1, setInputValue1] = useState("");
    const [inputValue2, setInputValue2] = useState("");

    const [activeInput, setActiveInput] = useState("");

    const [convertedAmount, setConvertedAmount] = useState(0);

    const [exchangeRate, setExchangeRate] = useState(0);

    const buttons = [
        { number: "1" },
        { number: "2", letters: ["A", "B", "C"] },
        { number: "3", letters: ["D", "E", "F"] },
        { number: "4", letters: ["G", "H", "I"] },
        { number: "5", letters: ["J", "K", "L"] },
        { number: "6", letters: ["M", "N", "O"] },
        { number: "7", letters: ["P", "Q", "R", "S"] },
        { number: "8", letters: ["T", "U", "V"] },
        { number: "9", letters: ["W", "X", "Y", "Z"] },
        { number: ["+", " ", "*", " ", "#"] },
        { number: "0" },
        { number: "Del" },
    ];

    const handleToggle1 = () => {
        setShow1(!show1);
    };

    const handleToggle2 = () => {
        setShow2(!show2);
    };

    const handleCurrency1 = (currency) => {
        setSelectedCurrency1(currency);
        setShow1(false);
        localStorage.setItem("selectedCurrency1", currency);
    };

    const handleCurrency2 = (currency) => {
        setSelectedCurrency2(currency);
        setShow2(false);
        localStorage.setItem("selectedCurrency2", currency);
    };

    const handleInputClick = (field) => {
        setActiveInput(field);
        setShowKeypad(true);
    };

    const handleKeypadClick = (input) => {
        if (input === "Del") {
            if (activeInput === "input1") {
                setInputValue1(inputValue1.slice(0, -1));
            } else if (activeInput === "input2") {
                setInputValue2(inputValue2.slice(0, -1));
            }
        } else {
            if (activeInput === "input1") {
                setInputValue1(inputValue1 + input);
            } else if (activeInput === "input2") {
                setInputValue2(inputValue2 + input);
            }
        }
    };

    async function fetchSpecificCurrencies() {
        const currencies = "INR,USD,JPY,SGD,EUR,GBP,AUD,CAD,CHF,CNH,HKD,NZD";
        const apiKey = "fca_live_VoDSov6nb2j7eUK6OWs8N4WL8yZgnncv2svp336z";
        const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

        try {
            const response = await fetch(apiUrl);
            const data = await response.json();

            const selectedCurrencies = {
                INR: data.data.INR,
                USD: data.data.USD,
                JPY: data.data.JPY,
                SGD: data.data.SGD,
                EUR: data.data.EUR,
                GBP: data.data.GBP,
                AUD: data.data.AUD,
                CAD: data.data.CAD,
                CHF: data.data.CHF,
                HKD: data.data.HKD,
                NZD: data.data.NZD,
            };

            console.log(selectedCurrencies);
            return selectedCurrencies;
        } catch (error) {
            console.error("There was a problem with the fetch operation:", error);
            return null;
        }
    }
    useEffect(() => {
        fetchSpecificCurrencies();
    }, []);

    const convertCurrency = async () => {
        if (selectedCurrency1 && selectedCurrency2 && inputValue1) {
            // const apiKey = 'fca_live_VoDSov6nb2j7eUK6OWs8N4WL8yZgnncv2svp336z'; // Replace with your API key
            const apiUrl = `https://api.exchangerate-api.com/v4/latest/${selectedCurrency1}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                const rate = data.rates[selectedCurrency2];
                const converted = inputValue1 * rate;
                setConvertedAmount(converted);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
            }
        }
    };

    useEffect(() => {
        convertCurrency();
    }, [selectedCurrency1, selectedCurrency2, inputValue1]);

    const fetchExchangeRate = async () => {
        if (selectedCurrency1 && selectedCurrency2) {
            const apiKey = "fca_live_VoDSov6nb2j7eUK6OWs8N4WL8yZgnncv2svp336z";
            const apiUrl = `https://api.freecurrencyapi.com/v1/latest?apikey=${apiKey}`;

            try {
                const response = await fetch(apiUrl);
                const data = await response.json();

                // Get exchange rate between selected currencies
                const rate =
                    data.data[selectedCurrency2] / data.data[selectedCurrency1];
                setExchangeRate(rate);
            } catch (error) {
                console.error("Error fetching exchange rate:", error);
            }
        }
    };

    useEffect(() => {
        fetchExchangeRate();
    }, [selectedCurrency1, selectedCurrency2]);

  

    return (
        <>
            <Card className="card">
                <Typography
                    sx={{
                        p: "0.8em 0 0.5em 1.2em",
                        color: "#989898",
                        fontSize: "0.9em",
                    }}>
                    Amount
                </Typography>
                <Box className="boxCont">
                    <Box className="boxAmo" gap={2}>
                        <Avatar
                            alt={selectedCurrency1}
                            src={selectedCurrency1==="JPY"?JPY:""||selectedCurrency1==="INR"?INR:""||selectedCurrency1==="AUD"?AUD:""||selectedCurrency1==="CAD"?CAD:""||selectedCurrency1==="CHF"?CHF:""||selectedCurrency1==="EUR"?EUR:""||selectedCurrency1==="GBP"?GBP:""||selectedCurrency1==="HKD"?HKD:""||selectedCurrency1==="NZD"?NZD:""||selectedCurrency1==="SGD"?SGD:""||selectedCurrency1==="USD"?USD:""}
                            className="avatar"
                        />
                        <Typography sx={{ color: "#26278D", fontWeight: "600" }}>
                            {selectedCurrency1}
                        </Typography>
                        <KeyboardArrowDownIcon onClick={handleToggle1} />
                    </Box>
                    <TextField
                        type="number"
                        className="text"
                        value={inputValue1}
                        onClick={() => handleInputClick("input1")}
                        onChange={(e) => setInputValue1(e.target.value)}
                    />
                </Box>
                {show1 && (
                    <Box className="drop">
                        {currency.map((currency, index) => (
                            <Box
                                key={index}
                                className="dropItem"
                                onClick={() => handleCurrency1(currency)}>
                                <Typography>{currency}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
                <Box className="avatarCont">
                    <hr className="line left" />
                    <Avatar sx={{ backgroundColor: "#26278D" }} className="avatar2">
                        <SwapVertIcon />
                    </Avatar>
                    <hr className="line right" />
                </Box>

                <Typography
                    sx={{
                        p: "0.8em 0 0.5em 1.2em",
                        color: "#989898",
                        fontSize: "0.9em",
                    }}>
                    Converted Amount
                </Typography>
                <Box className="boxCont">
                    <Box className="boxAmo" gap={2}>
                        <Avatar
                            alt={selectedCurrency2}
                            src={selectedCurrency2==="JPY"?JPY:""||selectedCurrency2==="INR"?INR:""||selectedCurrency2==="AUD"?AUD:""||selectedCurrency2==="CAD"?CAD:""||selectedCurrency2==="CHF"?CHF:""||selectedCurrency2==="EUR"?EUR:""||selectedCurrency2==="GBP"?GBP:""||selectedCurrency2==="HKD"?HKD:""||selectedCurrency2==="NZD"?NZD:""||selectedCurrency2==="SGD"?SGD:""||selectedCurrency2==="USD"?USD:""}
                            className="avatar"
                        />
                        <Typography sx={{ color: "#26278D", fontWeight: "600" }}>
                            {selectedCurrency2}
                        </Typography>
                        <KeyboardArrowDownIcon onClick={handleToggle2} />
                    </Box>
                    <TextField
                        type="number"
                        className="text"
                        value={convertedAmount}
                        disabled
                    // onClick={() => handleInputClick('input2')}
                    // onChange={(e) => setInputValue2(e.target.value)}
                    />
                </Box>
                {show2 && (
                    <Box className="drop">
                        {currency.map((currency, index) => (
                            <Box
                                key={index}
                                className="dropItem"
                                onClick={() => handleCurrency2(currency)}>
                                <Typography>{currency}</Typography>
                            </Box>
                        ))}
                    </Box>
                )}
            </Card>
            {!showKeypad && (
                <Box>
                    <Typography
                        sx={{
                            p: "1em 0 0.5em 1.8em",
                            color: "#989898",
                            fontSize: "0.9em",
                        }}>
                        Indicative Exchange Rate
                    </Typography>
                    <Typography
                        sx={{ pl: "1.5em", fontSize: "1.2em", fontWeight: "600" }}>
                        {" "}
                        1 {selectedCurrency1} = {exchangeRate.toFixed(4)}{" "}
                        {selectedCurrency2}
                    </Typography>
                </Box>
            )}

            {showKeypad && (
                <div className="keypad">
                    {buttons.map((button, index) => (
                        <Card
                            key={index}
                            className="key"
                            onClick={() => handleKeypadClick(button.number)}>
                            <button>{button.number}</button>
                            {button.letters && (
                                <div className="letters">
                                    {button.letters.map((letter, idx) => (
                                        <span key={idx}>{letter}</span>
                                    ))}
                                </div>
                            )}
                        </Card>
                    ))}
                </div>
            )}
        </>
    );
};

export default Conversion;

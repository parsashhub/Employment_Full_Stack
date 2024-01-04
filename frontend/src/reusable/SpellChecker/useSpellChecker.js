import React, { useCallback, useEffect, useState } from "react";
import { setupCache } from "axios-cache-adapter";
import Spellchecker from "hunspell-spellchecker";
import axios from "axios";

const UseSpellChecker = (text) => {
  const [hunspell, setHunspell] = useState();
  const [retVal, setRetVal] = useState({ notDetectedArr: undefined });

  const loadDictionary = useCallback(async () => {
    const baseUrl = "http://localhost:3333/download/";
    const cache = setupCache({
      maxAge: 24 * 60 * 60 * 1000 * 30, // 1 month
    });
    const api = axios.create({
      adapter: cache.adapter,
    });
    const dictionaryResponse = await api.get(baseUrl + "dic");
    const affixResponse = await api.get(baseUrl + "aff");

    const aff = await affixResponse.data;
    const dic = await dictionaryResponse.data;

    const spellchecker = new Spellchecker();
    let DICT = spellchecker.parse({
      aff,
      dic,
    });
    spellchecker.use(DICT);

    return spellchecker;
  }, []);

  const checkText = useCallback(() => {
    let detected = 0;
    let notDetected = 0;
    let detectedArr = [];
    let notDetectedArr = [];

    let lines = text.split(/\r?\n/);

    lines.forEach((line) => {
      let tokens = line.split(" ");
      tokens.forEach((token) => {
        let word = token.trim();
        // replace the non-word characters from start and the end of word and replace it with nothing.
        chars.map((char) => (word = word.replaceAll(char, "")));

        if (!hunspell?.check(word)) {
          notDetected += 1;
          notDetectedArr.push(word);
          let suggests = "";
          hunspell?.suggest(word).forEach((s) => {
            suggests += s;
            suggests += ", ";
          });
        } else {
          detected += 1;
          // detectedArr.push(word);
        }
      });
    });

    setRetVal({ notDetectedArr });
  }, [text, hunspell]);

  useEffect(async () => {
    if (hunspell === undefined) {
      const spellChecker = await loadDictionary();
      setHunspell(spellChecker);
    }
  }, [hunspell]);

  useEffect(() => {
    if (hunspell && text) {
      checkText(text);
    }
  }, [text, hunspell]);

  return [retVal];
};

export default UseSpellChecker;

const chars = [
  "[",
  "]",
  "...",
  "?",
  ".",
  ";",
  ":",
  "(",
  ")",
  "؛",
  "!",
  "،",
  "«",
  "»",
  "-",
  "؟",
  "،",
];

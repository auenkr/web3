import { generateMnemonic } from "bip39";
import { useCallback, useEffect, useState } from "react";
import { MnemonicsType } from ".";

export function useMnemonics() {
  const [mnemonic, setMnemonic] = useState<string>("");
  // const [mnemonic, setMnemonic] = useState<string>(TestingData.mnemonicPhase);

  const createMnemonics = useCallback(
    (defaultValue: string = "") => {
      if (defaultValue !== "") {
        window.localStorage.setItem("mnemonic", defaultValue);
        setMnemonic(defaultValue);
        return;
      }

      if (mnemonic !== "") return;
      const mnemonicsPhrase = generateMnemonic(MnemonicsType.character_12);
      window.localStorage.setItem("mnemonic", mnemonicsPhrase);
      setMnemonic(mnemonicsPhrase);
    },
    [mnemonic],
  );

  const deleteMnemonics = useCallback(() => {
    window.localStorage.removeItem("mnemonic");
    window.localStorage.removeItem("solanaWallet");
    window.localStorage.removeItem("ethereumWallet");
    setMnemonic("");
  }, []);

  useEffect(() => {
    const data = window.localStorage.getItem("mnemonic");
    if (data) {
      setMnemonic(data);
    }
  }, []);

  return { mnemonic, createMnemonics, deleteMnemonics };
}

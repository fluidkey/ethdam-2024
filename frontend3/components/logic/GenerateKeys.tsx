"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { getPublicKey } from "@noble/secp256k1";
import React from "react";
import { toHex } from "viem";
import { generatePrivateKey } from "viem/accounts";
import { useMain } from "../context/main";
import { Button } from "../ui/button";

export default function GenerateKeys(): React.ReactElement {

  const { keys, setKeys } = useMain();

  const generateKeys = () => {
    const privateKey = generatePrivateKey();
    const publicKey = toHex(getPublicKey(privateKey.slice(2), false));
    const displayPubKey = publicKey.substring(0, 6) + '...' + publicKey.substring(publicKey.length - 4);
    const color = hashToColor(publicKey);
    
    // add the keys to the keys array in the state
    setKeys(prevKeys => [...prevKeys, {privateKey, publicKey, displayPubKey, color, isSet: false}]);
  }

  const deleteKey = (index: number) => {
    const newKeys = [...keys];
    newKeys.splice(index, 1);
    setKeys(newKeys);
  }

  const hashToColor = (publicKey: string) => {
    let hash = 0;
    for (let i = 0; i < publicKey.length; i++) {
      hash = publicKey.charCodeAt(i) + ((hash << 5) - hash);
    }
    let color = '#';
    for (let i = 0; i < 3; i++) {
      let value = (hash >> (i * 8)) & 0xFF;
      color += ('00' + value.toString(16)).substr(-2);
    }
    return color;
  }

  return(
    <Card className="flex flex-col align-middle justify-center w-96">
      <CardHeader>
        <CardTitle>
          1. Generate your keys
        </CardTitle>
        <CardDescription>
          Generate a new private key to control stealth accounts.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <Button onClick={generateKeys} className="bg-slate-500 hover:bg-slate-400">
            Generate keys
          </Button> 
        </div>
        <div className="flex flex-col items-center justify-center mt-2">
          {keys.map((key, index) => (
            <div key={index} className={index === 0 ? "mt-4" : ""} style={{ display: 'flex', alignItems: 'center' }}>
              <div style={{ width: '10px', height: '10px', borderRadius: '50%', backgroundColor: hashToColor(key.publicKey), marginRight: '10px' }}></div>
              <p className="w-44 font-mono">{key.publicKey.substring(0, 6) + '...' + key.publicKey.substring(key.publicKey.length - 4)}</p>
              <button className={key.isSet ? "ml-3 text-gray-200" : "ml-3"} disabled={key.isSet} onClick={() => deleteKey(index)}>X</button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
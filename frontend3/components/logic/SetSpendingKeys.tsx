"use client";

import React, { useState } from "react";
import { registerNewKey } from "../actions/registerNewKey";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { updateKey } from '@/components/actions/updateKey';

export default function SetSpendingKeys(): React.ReactElement {
  const { keys, setKeys, index, setIndex } = useMain();
  const [selectedKey, setSelectedKey] = useState<string>("Select a key to set");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Find the selected key object
  const selectedKeyObject = keys.find(key => key.publicKey === selectedKey);

  const setKeyInKeystore = async () => {
    setIsLoading(true);

    // set the key if underfined
    if (index === undefined) {
      const response = await registerNewKey(selectedKeyObject?.privateKey as `0x${string}`)
        .catch((error) => {
          console.error(error);
          return;
        });
      if (response)
      setIndex(response.toString());
    } else {
      const oldKey = keys.find(key => key.isSet);
      const newKey = selectedKeyObject;
      if (!oldKey || !index || oldKey.privateKey === newKey?.privateKey || !newKey){
        throw new Error('Old and index must be set');
      }
      const response = await updateKey(
        oldKey.privateKey as `0x${string}`,
        newKey.privateKey as `0x${string}`,
        parseInt(index),
      )
        .catch((error) => {
          console.error(error);
          return;
        });
    }
    const newKeys = keys.map(key => {
      if (key.publicKey === selectedKey) {
        key.isSet = true;
      } else {
        key.isSet = false;
      }
      return key;
    });
    //
    // const newKeys = await Promise.all(keys.map(async key => {
    //   if (key.publicKey === selectedKey) {
    //     if (index === undefined) {
    //       const response = await registerNewKey(key.privateKey as `0x${string}`)
    //         .catch((error) => {
    //           console.error(error);
    //           key.isSet = false;
    //           return;
    //         });
    //       if (response)
    //       setIndex(response.toString());
    //     } else {
    //       const oldKey = keys.find(key => key.isSet);
    //       const newKey = key;
    //       console.log('oldKeyList', oldKey, index, newKey);
    //       if (!oldKey || !index) {
    //         throw new Error('Old and index must be set');
    //       }
    //       const response = await updateKey(
    //         oldKey.privateKey as `0x${string}`,
    //         newKey.privateKey as `0x${string}`,
    //         parseInt(index),
    //       )
    //         .catch((error) => {
    //           console.error(error);
    //           key.isSet = false;
    //           return;
    //         });
    //     }
    //     key.isSet = true;
    //   } else {
    //     key.isSet = false;
    //   }
    //   return key;
    // }));
    localStorage.setItem('keys', JSON.stringify(newKeys));
    setKeys(newKeys);
    setIsLoading(false);
  }

  return(
    <Card className="flex flex-col align-middle justify-center mt-12 w-96">
      <CardHeader>
        <CardTitle>
          2. Set keys in the keystore
        </CardTitle>
        <CardDescription>
          Select the key that should control your stealth accounts.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center justify-center">
          <Select value={selectedKey} onValueChange={setSelectedKey}>
            <SelectTrigger>
              {selectedKeyObject ? (
                <SelectValue>
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full mr-2.5" style={{ backgroundColor: selectedKeyObject.color }} />
                    <div className="flex-grow">{selectedKeyObject.displayPubKey}</div>
                  </div>
                </SelectValue>
              ) : (
                <SelectValue>Select a keypair to set</SelectValue>
              )}
            </SelectTrigger>
            <SelectContent>
            {keys.map((key, index) => (
                <SelectItem value={key.publicKey} key={key.publicKey}>
                  <div className="flex items-center">
                    <div className="w-2.5 h-2.5 rounded-full mr-2.5" style={{ backgroundColor: key.color }} />
                    <div className="flex-grow">{key.displayPubKey}</div>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="text-center ml-3">
            <Button className="bg-slate-500 hover:bg-slate-400" disabled={keys.length === 0 || selectedKeyObject?.isSet || isLoading || selectedKeyObject === undefined} onClick={setKeyInKeystore}>
              Set keys
            </Button>
          </div>
        </div>
        <div>
          {keys.map((key, index) => {
            if (key.isSet) {
              return (
                <div key={key.publicKey} className="flex ml-1 items-center mt-6 font-semibold">
                  <p className="mr-2">{"Active key ->"}</p>
                  <div className="w-2.5 h-2.5 rounded-full mr-2.5" style={{ backgroundColor: key.color }} />
                  <div className="font-mono">{key.displayPubKey}</div>
                </div>
              );
            }
          })}
        </div>
      </CardContent>
    </Card>
  );
}

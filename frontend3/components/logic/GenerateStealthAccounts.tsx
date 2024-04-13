"use client";

import React, { useState } from "react";
import { generateStealthZkSafe } from "../actions/generateStealthZkSafe";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function GenerateStealthAccounts(): React.ReactElement {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { stealthAccounts, index, setStealthAccounts } = useMain();
  const deployStealthAccount = async () => {
    setIsLoading(true);
    const { randomSecret, safeAddress } = await generateStealthZkSafe(parseInt(index as string));
    setStealthAccounts(prevStealthAccounts => [...prevStealthAccounts, { address: safeAddress, randomSecret }]);
    setIsLoading(false);
  };
  return (
    <Card className="flex flex-col align-middle justify-center mt-12 w-96 min-w-32 mx-10">
      <CardHeader>
        <CardTitle>
          3. Deploy stealth accounts
        </CardTitle>
        <CardDescription>
          Deploy stealth accounts that are controlled by the keys currently set in the keystore.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-center">
          <Button className="bg-slate-500 hover:bg-slate-400" disabled={index === undefined || isLoading} onClick={deployStealthAccount}>
            Deploy
          </Button>
        </div>
       <div className="flex flex-col items-center justify-center mt-2">
        {stealthAccounts.map(stealthAccount => (
          <div key={stealthAccount.address} className="flex flex-col items-center justify-center mt-2">
              <div key={index} className="flex items-center justify-center mt-1">
                <a href={`https://basescan.org/address/${stealthAccount.address}`} target="_blank" className="font-mono font-bold text-teal-700 hover:text-teal-500 underline">
                  {stealthAccount.address.substring(0, 6) + '...' + stealthAccount.address.substring(stealthAccount.address.length - 4)}
                </a>
              </div>
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  );
}
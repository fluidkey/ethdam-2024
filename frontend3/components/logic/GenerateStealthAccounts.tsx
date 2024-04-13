"use client";

import React from "react";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";

export default function GenerateStealthAccounts(): React.ReactElement {
  const { keys } = useMain();
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
          <Button className="bg-slate-500 hover:bg-slate-400" disabled={
            keys.filter(key => key.isSet).length === 0
          }>
            Deploy
          </Button>
        </div>
       <div className="flex flex-col items-center justify-center mt-2">
        {keys.filter(key => key.isSet).map(key => (
          <div key={key.publicKey} className="flex flex-col items-center justify-center mt-2">
            {key.stealthAccounts.map((account, index) => (
              <div key={index} className="flex items-center justify-center mt-1">
                <a href="https://example.com" className="font-mono font-bold text-teal-700 hover:text-teal-500 underline">
                  {account.substring(0, 6) + '...' + account.substring(account.length - 4)}
                </a>
              </div>
            ))}
          </div>
        ))}
      </div>
      </CardContent>
    </Card>
  );
}
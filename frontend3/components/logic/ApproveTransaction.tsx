"use client";

import React, { useState } from "react";
import { moveEth } from "../actions/moveEth";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SetSpendingKeys(): React.ReactElement {
  const { stealthAccounts, keys, index } = useMain();
  const [selectedKey, setSelectedKey] = useState<string>("Select a stealth account");
  const [to, setTo] = useState<`0x${string}`>("0x");
  const [amount, setAmount] = useState<number>(0);

  console.log(amount, to, selectedKey)

  const executeTransaction = async () => {
    // Execute the transaction
    console.log("starting")
    await moveEth({
      fromSafeAddress: selectedKey as `0x${string}`,
      amount: BigInt(amount),
      to,
      privateKey: keys[0].privateKey as `0x${string}`,
      randomSecret: stealthAccounts.find(account => account.address === selectedKey)?.randomSecret as `0x${string}`,
      keyStoreIndex: parseInt(index as string),
    });
  }

  return(
    <Card className="flex flex-col align-middle justify-center mt-12 w-96">
      <CardHeader>
        <CardTitle>
          4. Approve a transaction
        </CardTitle>
        <CardDescription>
          Sign a transaction for one of the stealth accounts using the active keys.
        </CardDescription>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex flex-col items-center justify-center">
          <Select value={selectedKey} onValueChange={setSelectedKey}>
            <SelectTrigger>
              <SelectValue>
                {selectedKey}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {stealthAccounts.map(stealthAccount => (
                <SelectItem value={stealthAccount.address} key={stealthAccount.address}>
                  {stealthAccount.address.substring(0, 10) + '...' + stealthAccount.address.substring(stealthAccount.address.length - 8)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Input placeholder="to" className="mt-2" type="string" value={to} onChange={e => setTo(e.target.value as `0x${string}`)} />
          <div className="flex flex-row items-center justify-between w-full">
            <Input placeholder="ETH amount" className="mt-2" type="number" value={amount} onChange={e => setAmount(Number(e.target.value))} />
            <Button className="bg-slate-500 hover:bg-slate-400 mt-2 ml-2" onClick={executeTransaction}>
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

"use client";

import React, { useState } from "react";
import { moveEth } from "../actions/moveEth";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SetSpendingKeys(): React.ReactElement {
  const { stealthAccounts } = useMain();
  const [selectedKey, setSelectedKey] = useState<string>("Select a stealth account");

  const executeTransaction = async () => {
    // Execute the transaction
    await moveEth({
      fromSafeAddress: "0xdC9387877C1D893b21A7511002d5688E2DC36CD0",
      amount: BigInt(0),
      to: "0x9Cb5433d5C5BDdc5C480103F06f03dB13b36b7C9",
      privateKey: "0x97b20c8f3877e08a74fde564f7d1300a59ba18dadb1f78808a705af75730e192",
      randomSecret: "0xcf0c7fc6b084a98b2647036f4cf1c12e05d4c8e96d35f1fb6d82ab690fad2f06",
      keyStoreIndex: 9,
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
          <Input placeholder="to" className="mt-2" type="string" />
          <div className="flex flex-row items-center justify-between w-full">
            <Input placeholder="ETH amount" className="mt-2" type="number" />
            <Button className="bg-slate-500 hover:bg-slate-400 mt-2 ml-2" onClick={executeTransaction}>
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
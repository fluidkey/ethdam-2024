"use client";

import React, { useState } from "react";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../ui/card";
import { Input } from "../ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SetSpendingKeys(): React.ReactElement {
  const { stealthAccounts } = useMain();
  const [selectedKey, setSelectedKey] = useState<string>("Select a stealth account");

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
            <Button className="bg-slate-500 hover:bg-slate-400 mt-2 ml-2">
              Send
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
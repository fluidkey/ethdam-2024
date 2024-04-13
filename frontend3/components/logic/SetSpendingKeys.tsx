"use client";

import React, { useState } from "react";
import { useMain } from "../context/main";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export default function SetSpendingKeys(): React.ReactElement {
  const { keys } = useMain();
  const [selectedKey, setSelectedKey] = useState<string>("Select a key to set");

  // Find the selected key object
  const selectedKeyObject = keys.find(key => key.publicKey === selectedKey);

  return(
    <Card className="flex flex-col align-middle justify-center mt-12 w-96">
      <CardHeader>
        <CardTitle>
          2. Set keys in the keystore
        </CardTitle>
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
                <SelectValue>Select a key to set</SelectValue>
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
            <Button className="bg-slate-500 hover:bg-slate-400" disabled={keys.length === 0}>
              Set keys
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
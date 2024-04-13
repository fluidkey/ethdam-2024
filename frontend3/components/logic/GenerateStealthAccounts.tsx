"use client";

import React from "react";
import { Button } from "../ui/button";
import { Card, CardHeader, CardTitle } from "../ui/card";

export default function GenerateStealthAccounts(): React.ReactElement {
  return (
    <Card className="flex flex-col align-middle justify-center mt-12 w-96">
      <CardHeader>
        <CardTitle>
          3. Deploy stealth accounts
        </CardTitle>
      </CardHeader>
      <div className="text-center">
        <Button className="bg-slate-500 hover:bg-slate-400">
          Deploy
        </Button>
      </div>
    </Card>
  );
}
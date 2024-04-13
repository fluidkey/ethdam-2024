"use client"
import GenerateKeys from "@/components/logic/GenerateKeys";
import GenerateStealthAccounts from "@/components/logic/GenerateStealthAccounts";
import SetSpendingKeys from "@/components/logic/SetSpendingKeys";
import { useEffect } from 'react';
import { registerNewKey } from '@/components/actions/registerNewKey';

export default function Home() {

  useEffect(() => {
    const pKey = '0x514213855d6cf975ba1d970225f90846b521b4f57df7d76303890152cc6cf34b';
    void (async () => {
      await registerNewKey(pKey);
    })().catch(e => console.error(e));
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-100">
      <h1 className="text-4xl font-bold mb-16">Stealth Keystore</h1>
      <GenerateKeys />
      <SetSpendingKeys />
      <GenerateStealthAccounts />
    </main>
  );
}

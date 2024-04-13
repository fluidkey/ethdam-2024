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
    <main className="flex min-h-screen flex-col items-center p-12">
      <h1 className="text-4xl font-bold mb-16 text-center">🗒️ Stealth Keystore</h1>
      <GenerateKeys />
      <SetSpendingKeys />
      <GenerateStealthAccounts />
      <ApproveTransaction />
      <div className="mt-32 text-center text-gray-500">
        <p>a demo created by <a href="https://fluidkey.com" target="_blank" className="font-mono font-bold text-teal-700 hover:text-teal-500">fluidkey</a> 💧🔑</p>
      </div>
    </main>
  );
}

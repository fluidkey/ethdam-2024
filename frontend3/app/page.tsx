import GenerateKeys from "@/components/logic/GenerateKeys";
import GenerateStealthAccounts from "@/components/logic/GenerateStealthAccounts";
import SetSpendingKeys from "@/components/logic/SetSpendingKeys";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center p-24 w-100">
      <h1 className="text-4xl font-bold mb-16">Stealth Keystore</h1>
      <GenerateKeys />
      <SetSpendingKeys />
      <GenerateStealthAccounts />
    </main>
  );
}

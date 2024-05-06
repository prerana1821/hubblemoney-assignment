import { CreateVoucher } from "@/app/components/voucher/buttons";

export default async function Page() {
  return (
    <main>
      <h1 className={"mb-4 text-xl md:text-2xl"}>Voucher Management</h1>
      <CreateVoucher />
    </main>
  );
}

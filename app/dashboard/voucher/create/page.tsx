// import Form from "@/app/ui/invoices/create-form";
// import { fetchCustomers } from "@/app/lib/data";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import Form from "@/app/components/metadata/create-form";

export default async function Page() {
  //   const customers = await fetchCustomers();

  return (
    <main>
      <Breadcrumbs
        breadcrumbs={[
          { label: "Voucher Management", href: "/dashboard/voucher" },
          {
            label: "Create Voucher",
            href: "/dashboard/voucher/create",
            active: true,
          },
        ]}
      />
      <Form />
    </main>
  );
}

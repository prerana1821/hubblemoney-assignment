import getBrandNames from "@/app/actions/getBrandNames";
import Breadcrumbs from "@/app/components/layout/breadcrumbs";
import Form from "@/app/components/voucher/form";

export default async function Page() {
  const brands = await getBrandNames();

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
      <Form brandNames={brands} />
    </main>
  );
}

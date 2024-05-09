import {
  BrandNames,
  FAQ,
  Highlight,
  VoucherFormState,
  VoucherFormSubmitParams,
} from "@/types/app";
import { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import toast from "react-hot-toast";
import uniqid from "uniqid";
import { handleFormValidations } from "./file-handling";

export const voucherFormInitialState: VoucherFormState = {
  brandName: { value: "", error: null },
  bannerImage: {
    name: "",
    photo: "",
    type: "",
    size: 0,
    file: null,
    error: null,
  },
  discountPercentage: { value: 0, error: null },
  expirationDate: { value: "", error: null },
  highlightsDescription: { value: "", error: null },
  FAQs: [{ question: "", answer: "", error: null }],
  highlights: [{ title: "", text: "", error: null }],
};

export const handleVoucherChange = (
  event: ChangeEvent<
    HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
  >,
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  const { name, value } = event.target;

  setFormData((prevFormData) => ({
    ...prevFormData,
    [name]: { value },
  }));
};

export const handleFAQChange = (
  index: number,
  event: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  formData: VoucherFormState,
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  const { name, value } = event.target;
  const newFAQs = formData.FAQs.map((faq, i) =>
    i === index ? { ...faq, [name]: value } : faq
  );
  setFormData({
    ...formData,
    FAQs: newFAQs,
  });
};

export const handleHighlightChange = (
  index: number,
  event: ChangeEvent<
    HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
  >,
  formData: VoucherFormState,
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  const { name, value } = event.target;
  const newHighlights = formData.highlights.map((highlight, i) =>
    i === index ? { ...highlight, [name]: value } : highlight
  );
  setFormData({
    ...formData,
    highlights: newHighlights,
  });
};

export const addFAQ = (
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    FAQs: [...prevFormData.FAQs, { question: "", answer: "", error: null }],
  }));
};

export const addHighlight = (
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    highlights: [
      ...prevFormData.highlights,
      { title: "", text: "", error: null },
    ],
  }));
};

export const removeHighlight = (
  indexToRemove: number,
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    highlights: prevFormData.highlights.filter(
      (_, index) => index !== indexToRemove
    ),
  }));
};

export const removeFAQ = (
  indexToRemove: number,
  setFormData: Dispatch<SetStateAction<VoucherFormState>>
) => {
  setFormData((prevFormData) => ({
    ...prevFormData,
    FAQs: prevFormData.FAQs.filter((_, index) => index !== indexToRemove),
  }));
};

export const handleFormSubmit = async ({
  event,
  setIsLoading,
  formData,
  setFormData,
  supabaseClient,
  router,
  voucher,
  brandNames,
}: VoucherFormSubmitParams) => {
  event.preventDefault();

  try {
    setIsLoading(true);

    if (!formData.bannerImage?.file && formData.bannerImage.path === "") {
      setIsLoading(false);
      return toast.error("Missing Banner Image File.");
    }

    const hasErrors = handleFormValidations(formData, setFormData, "voucher");

    if (hasErrors) {
      setIsLoading(false);
      return;
    }

    const uniqueID = uniqid();
    let bannerData;

    if (!formData.bannerImage.path || formData.bannerImage.path.length === 0) {
      const { data: _bannerData, error: bannerError } =
        await supabaseClient.storage
          .from("banners")
          .upload(
            `banner-${formData.bannerImage.name}-${uniqueID}`,
            formData.bannerImage.file as File,
            {
              cacheControl: "3600",
              upsert: false,
            }
          );

      if (bannerError) {
        console.error({ bannerError });
        setIsLoading(false);
        return toast.error("Failed Banner Image upload.");
      }

      bannerData = _bannerData;
    }

    const selectedBrandId = brandNames.find(
      (brand: BrandNames) => brand.name === formData.brandName.value
    );

    if (voucher) {
      const { error: supabaseEditError } = await supabaseClient
        .from("vouchers")
        .upsert({
          id: voucher?.id,
          brand_id: voucher?.brand.id,
          ...(formData.bannerImage.path
            ? {}
            : { banner_path: bannerData?.path }),
          discount_percentage: formData.discountPercentage.value,
          expiration_date: formData.expirationDate.value,
          faq: JSON.stringify(
            formData.FAQs.map((faq: FAQ) => ({
              question: faq.question,
              answer: faq.answer,
            }))
          ),
          highlights: JSON.stringify({
            description: formData.highlightsDescription,
            list: formData.highlights.map((highlight: Highlight) => ({
              title: highlight.title,
              text: highlight.text,
            })),
          }),
        });

      if (supabaseEditError) {
        setIsLoading(false);
        return toast.error(
          `Error updating the voucher: ${supabaseEditError.message}`
        );
      } else {
        toast.success("Voucher is updated for the brand successfully.");
        router.push("/dashboard");
      }
    } else {
      const { error: supabaseError } = await supabaseClient
        .from("vouchers")
        .insert({
          brand_id: selectedBrandId?.id,
          banner_path: bannerData?.path,
          discount_percentage: formData.discountPercentage.value,
          expiration_date: formData.expirationDate.value,
          faq: JSON.stringify(
            formData.FAQs.map((faq: FAQ) => ({
              question: faq.question,
              answer: faq.answer,
            }))
          ),
          highlights: JSON.stringify({
            description: formData.highlightsDescription,
            list: formData.highlights.map((highlight: Highlight) => ({
              title: highlight.title,
              text: highlight.text,
            })),
          }),
        });

      if (supabaseError) {
        setIsLoading(false);
        return toast.error(supabaseError.message);
      } else {
        toast.success("Voucher is added to the brand!");
      }
    }

    router.push("/dashboard");
    setIsLoading(false);
    setFormData({
      ...voucherFormInitialState,
      FAQs: [{ question: "", answer: "", error: null }],
      highlights: [{ title: "", text: "", error: null }],
    });
  } catch (error) {
    toast.error("Something went wrong");
  } finally {
    setIsLoading(false);
  }
};

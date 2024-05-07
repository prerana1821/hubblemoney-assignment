import { Highlight, MetadataItem, TableData } from "@/types/app";

export function transformMetadata(metadata: MetadataItem[]) {
  const transformedMetadata: TableData[] = [];

  metadata.forEach((item) => {
    if (item.discountPercentage.length === 0) {
      const emptyItem: TableData = {
        brandName: item.brandName,
        brandLogoPath: item.brandLogoPath,
        brandStatus: item.brandStatus,
        brandCategory: item.brandCategory,
        highlights: [],
        expirationDate: "",
        discountPercentage: "",
      };
      transformedMetadata.push(emptyItem);
    } else {
      for (let i = 0; i < item.discountPercentage.length; i++) {
        const transformedItem: TableData = {
          brandName: item.brandName,
          brandLogoPath: item.brandLogoPath,
          brandStatus: item.brandStatus,
          brandCategory: item.brandCategory,
          highlights: [],
          expirationDate: "",
          discountPercentage: "",
        };

        if (item.highlights[i]) {
          const parsedHighlight = JSON.parse(item.highlights[i]) as {
            list: Highlight[];
          };
          transformedItem.highlights = parsedHighlight.list.map(
            (listItem) => listItem.title
          );
        }

        transformedItem.discountPercentage =
          item.discountPercentage[i].toString();
        transformedItem.expirationDate = item.expirationDate[i] || "";

        transformedMetadata.push(transformedItem);
      }
    }
  });

  return transformedMetadata;
}

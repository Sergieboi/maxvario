import { Block, MVRace } from "./types/misc";

export function groupAndSortByDate(data: MVRace[]) {
  // Step 1: Group objects by year and month
  const grouped: Record<string, MVRace[]> = {};

  data.forEach((item) => {
    const date = new Date(item.start_date);
    const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
      2,
      "0"
    )}`;

    if (!grouped[key]) {
      grouped[key] = [];
    }
    grouped[key].push(item);
  });

  // Step 2: Sort keys
  const sortedKeys = Object.keys(grouped).sort(
    (a, b) => new Date(a).getTime() - new Date(b).getTime()
  );

  // Step 3: Build the sorted result
  const result = sortedKeys.map((key) => ({
    key, // year-month
    items: grouped[key], // grouped objects
  }));

  return result;
}

export function capitalize(s: string) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

export const extractBlockInnerHTML = (blocks: Array<Block>): string => {
  return blocks.map((block) => block.innerHTML).join(" ");
}
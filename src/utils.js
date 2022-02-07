export const formatTitle = title => {
  return title
    .toString()
    .replace(/[^\p{L}\p{N}\p{P}\p{Z}^$\n]/gu, '')
    .toUpperCase();
};

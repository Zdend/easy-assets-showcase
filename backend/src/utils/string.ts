export const stripSpecial = (text: string): string => {
  if (!text) {
    return text;
  }
  return text
    .replace(/[^\w\d]+/g, ' ')
    .replace(/\s/g, ' ')
    .trim();
};

export const calculateSlug = (name: string): string => {
  if (!name) {
    return name;
  }
  return stripSpecial(name)
    .toLowerCase()
    .replace(/\s/g, '-');
};

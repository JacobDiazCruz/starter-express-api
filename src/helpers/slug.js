export const makeSlug = (data) => {
  const slug = data.replace(/\s+/g, '-').toLowerCase();
  return slug
}

export default makeSlug
export const getGlobalData = () => {
  return {
    name: process.env.BLOG_NAME,
    blogTitle: process.env.BLOG_TITLE,
    footerText: process.env.BLOG_FOOTER_TEXT,
  };
};

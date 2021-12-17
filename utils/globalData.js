export const getGlobalData = () => {
  return {
    name: decodeURI(process.env.BLOG_NAME) || "Jay Doe",
    blogTitle: decodeURI(process.env.BLOG_TITLE) || "Next.js Blog Theme",
    footerText:
      decodeURI(process.env.BLOG_FOOTER_TEXT) || "All rights reserved.",
  };
};

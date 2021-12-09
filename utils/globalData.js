export const getGlobalData = () => {
  return {
    name: process.env.BLOG_NAME || "Jay Doe",
    blogTitle: process.env.BLOG_TITLE || "Next.js Blog Theme",
    footerText: process.env.BLOG_FOOTER_TEXT || "All rights reserved.",
  };
};

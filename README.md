# Next.js Blog Theme

A simple blog starter based on Next.js, Tailwind 3.0 and MDX support. Includes modern design with dark and light theme.

[Wizard](https://nextjs-wizard.netlify.app/) - create your own blog in few clicks and deploy on Netlify.

## Configure the blog

The config is based on ENV Variables to make it easy to integrate with any Jamstack platform like Netlify.

Here are the variables you can edit:

- `BLOG_NAME` - that's the name of your blog and will be displayed below the avatar.
- `BLOG_TITLE` - the main header (`h1`) on the home page, this can be a slogan.
- `BLOG_FOOTER_TEXT` - the text in the footer, usually copyright info.
- `BLOG_THEME`
- `BLOG_FONT_HEADINGS` - the font-family for all HTML headings, from `h1` to `h6`. The value can be one of those:
  - `sans-serif` (selected by default)
  - `serif`
  - `monospace`
- `BLOG_FONT_PARAGRAPHS` - the font-family for all other HTML elements. The value can be one of those:
  - `sans-serif` (selected by default)
  - `serif`
  - `monospace`

All of the env variables can be configured through the [Wizard](https://nextjs-wizard.netlify.app/).

## Adding new posts

All posts are stored in `posts` directory in `.mdx` format. That means you can use React components there to make your posts more interactive.

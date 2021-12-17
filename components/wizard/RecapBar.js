import { useState } from "react";
import classNames from "classnames";
import { NetlifyLogo, WizardButton, WizardLabel } from "./elements";
import { COLOR_THEMES, FONT_THEMES } from "../../themes";

function ThemeIcon({ onClick, style }) {
  return (
    <button
      className="w-12 h-12 my-1 mx-1 rounded-full block bg-gradient-conic from-gradient-3 to-gradient-4 border-4 border-white shadow-lg m-auto dark:border-gray-600"
      onClick={onClick}
      style={style}
    />
  );
}

export function ThemeSwitcher({
  menuIsOpen,
  open,
  setMenuIsOpen,
  withBackground,
  variant = "vertical",
  setData,
}) {
  const setTheme = (theme) => {
    let root = document.documentElement;

    root.style.setProperty("--color-primary", theme.colors["primary"]);
    root.style.setProperty("--color-gradient-1", theme.colors["gradient-1"]);
    root.style.setProperty("--color-gradient-2", theme.colors["gradient-2"]);
    root.style.setProperty("--color-gradient-3", theme.colors["gradient-3"]);
    root.style.setProperty("--color-gradient-4", theme.colors["gradient-4"]);

    root.style.setProperty("--tw-gradient-from", theme.colors["gradient-3"]);
    root.style.setProperty("--tw-gradient-to", theme.colors["gradient-4"]);
  };

  const handleClick = (e, theme) => {
    e.preventDefault();
    setTheme(COLOR_THEMES[theme]);
    setData((prevData) => ({ ...prevData, theme: theme }));
    if (!open) {
      setMenuIsOpen(false);
    }
  };

  const handleIconClick = (e) => {
    e.preventDefault();
    if (!open) {
      setMenuIsOpen(!menuIsOpen);
    }
  };

  const classes = classNames({
    "flex-col": variant === "vertical",
    "bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-500 shadow-xl rounded-xl":
      withBackground,
    "absolute -bottom-1 left-0": withBackground,
    "flex p-2 py-1 z-10 -mb-px ml-[-2px]": true,
  });

  return (
    <div className="flex my-auto relative justify-center">
      {!open && <ThemeIcon onClick={handleIconClick} />}

      {(menuIsOpen || open) && (
        <div className={classes}>
          {Object.keys(COLOR_THEMES).map((theme) => {
            return (
              <ThemeIcon
                key={theme}
                style={{
                  "--tw-gradient-from":
                    COLOR_THEMES[theme].colors["gradient-3"],
                  "--tw-gradient-to": COLOR_THEMES[theme].colors["gradient-4"],
                }}
                onClick={(e) => handleClick(e, theme)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

const arrowIcon = (
  <svg
    fill="currentColor"
    className="w-5 h-5 text-gray-400 absolute top-1/2 right-2 -mt-2.5 pointer-events-none"
  >
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    ></path>
  </svg>
);

export function FontSwitcher({ cssVariable, setData, data }) {
  const handleFontChange = (e) => {
    let { value } = e.target;

    let root = document.documentElement;
    setData((prevData) => ({ ...prevData, [cssVariable]: value }));
    root.style.setProperty(cssVariable, FONT_THEMES[value]);
  };

  return (
    <div className="relative w-full">
      <select
        className="appearance-none cursor-pointer w-full text-gray-900 p-4 pr-8 rounded-xl border border-gray-200 shadow-md dark:text-white dark:bg-gray-700 dark:border-gray-500"
        onChange={handleFontChange}
        value={data[cssVariable]}
      >
        <option value="sans-serif">sans-serif</option>
        <option value="serif">serif</option>
        <option value="monospace">monospace</option>
      </select>
      {arrowIcon}
    </div>
  );
}
export default function RecapBar({ data, setData, onClickNext }) {
  const [menuIsOpen, setMenuIsOpen] = useState(false);
  const deployUrl = `https://app.netlify.com/start/deploy?repository=https://github.com/bejamas/nextjs-blog-theme#BLOG_NAME=${data.name}&BLOG_TITLE=${data.blogTitle}&BLOG_FOOTER_TEXT=${data.footerText}&BLOG_THEME=${data.theme}&BLOG_FONT_HEADINGS=${data["--font-primary"]}&BLOG_FONT_PARAGRAPHS=${data["--font-secondary"]}`;

  return (
    <div className="font-sans fixed bottom-4 z-index-10 w-full max-w-[56rem] left-2/4 transform -translate-x-2/4 ">
      <div className="flex flex-wrap lg:justify-around bg-white dark:bg-black dark:bg-opacity-30 backdrop-blur-lg bg-opacity-30 px-6 pt-4 rounded-xl border border-gray-200 dark:border-white dark:border-opacity-10 shadow-xl">
        <div className="mr-6 mb-4">
          <p className="uppercase mb-2 text-gray-700 font-bold dark:text-white dark:opacity-60">
            Content
          </p>
          <WizardButton
            as="a"
            onClick={(e) => onClickNext(e, 1)}
            href="/?step=1"
            className="border border-gray-200 shadow-md bg-white text-gray-800 dark:text-white dark:bg-gray-700 dark:border-gray-500"
          >
            Edit Content
          </WizardButton>
        </div>
        <div className="mr-6 flex flex-col mb-4">
          <p className="uppercase mb-2 text-gray-700 font-bold dark:text-white dark:opacity-60">
            Theme
          </p>
          <ThemeSwitcher
            menuIsOpen={menuIsOpen}
            setMenuIsOpen={setMenuIsOpen}
            setData={setData}
            withBackground
          />
        </div>
        <div className="mr-6 mb-4">
          <WizardLabel>Headings</WizardLabel>
          <FontSwitcher
            cssVariable="--font-primary"
            data={data}
            setData={setData}
          />
        </div>
        <div className="mr-6 mb-4">
          <WizardLabel>Paragraphs</WizardLabel>
          <FontSwitcher
            cssVariable="--font-secondary"
            data={data}
            setData={setData}
          />
        </div>
        <div className="mt-auto mb-4">
          <WizardButton
            as="a"
            href={deployUrl}
            icon={<NetlifyLogo className="dark:text-white" />}
          >
            Deploy to Netlify
          </WizardButton>
        </div>
      </div>
    </div>
  );
}

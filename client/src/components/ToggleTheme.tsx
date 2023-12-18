import Button from "./ui/Button";
import SunIcon from "./icons/SunIcon";
import { useEffect, useState } from "react";
import MoonIcon from "./icons/MoonIcon";

const ToggleTheme = () => {
  const [colorTheme, setColorTheme] = useState(
    () => localStorage.getItem("theme") || "dark"
  );
  let iconColorTheme;

  const handleThemeClick = () => {
    setColorTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  useEffect(() => {
    const htmlElement = document.documentElement;

    htmlElement.setAttribute("data-color-scheme", colorTheme);
    htmlElement.style.colorScheme = colorTheme;
    localStorage.setItem("theme", colorTheme);
  }, [colorTheme]);

  if (colorTheme === "dark") iconColorTheme = <SunIcon />;
  if (colorTheme === "light") iconColorTheme = <MoonIcon />;

  return (
    <Button variant="icon" onClick={handleThemeClick}>
      {iconColorTheme}
    </Button>
  );
};

export default ToggleTheme;

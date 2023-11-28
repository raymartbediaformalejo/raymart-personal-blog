const ToggleTheme = () => {
  const handleThemeClick = () => {
    const htmlElement = document.documentElement;
    const currentColorScheme = htmlElement.style.colorScheme;

    // Toggle between light and dark themes
    const newColorScheme = currentColorScheme === "light" ? "dark" : "light";

    // Set the inline style for the color-scheme property
    htmlElement.style.colorScheme = newColorScheme;
  };
  return (
    <>
      <p>Personal blog</p>
      <button onClick={handleThemeClick}>Toggle Theme</button>
    </>
  );
};

export default ToggleTheme;

import React, { useEffect, useState } from 'react';
import { JsonService } from "@formsflow/service";
console.log(JsonService);

function ThemeSelector() {
  const storedThemeName = localStorage.getItem('selectedThemeName');
  console.log(storedThemeName)
  const defaultThemeIndex = JsonService.findIndex(theme => theme.name === storedThemeName);
  console.log(defaultThemeIndex)

  const [selectedThemeIndex, setSelectedThemeIndex] = useState(
    defaultThemeIndex >= 0 ? defaultThemeIndex : 0
  );

  // Function to apply the selected theme
  function applyTheme(themeData) {
    const root = document.documentElement;
    for (const [key, value] of Object.entries(themeData)) {
      root.style.setProperty(key, value);
    }
  }

  // Handle theme change
  function handleThemeChange(event) {
    const selectedIndex = event.target.value;
    setSelectedThemeIndex(selectedIndex);

    // Store the selected theme name in localStorage
    const selectedThemeName = JsonService[selectedIndex].name;
    localStorage.setItem('selectedThemeName', selectedThemeName);

    // Apply the selected theme
    const selectedThemeData = JsonService[selectedIndex].data;
    applyTheme(selectedThemeData);
  }

  useEffect(() => {
    // Apply the selected theme on component mount
    const selectedThemeData = JsonService[selectedThemeIndex].data;
    applyTheme(selectedThemeData);
  }, [selectedThemeIndex]);

  return (
    <div>
      <select id="themeSelector" value={selectedThemeIndex} onChange={handleThemeChange}>
        {JsonService.map((theme, index) => (
          <option key={index} value={index}>
            {theme.name}
          </option>
        ))}
      </select>
    </div>
  );
}

export default ThemeSelector;

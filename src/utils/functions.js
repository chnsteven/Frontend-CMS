export const fetchMarkdownContent = async (filePaths) => {
  const fetchMarkdown = async (filePath) => {
    try {
      const response = await fetch(filePath);
      console.log(filePath);
      console.log(response.url);
      return await response.text();
    } catch (error) {
      console.error("Error fetching markdown:", error);
      return "";
    }
  };

  const mainContent = await fetchMarkdown(filePaths.main);
  const sectionsContent = await Promise.all(
    filePaths.tabs.map((tab) => fetchMarkdown(tab.path))
  );

  return { mainContent, sectionsContent };
};

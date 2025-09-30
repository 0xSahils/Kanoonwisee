import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

// Cache for processed content
const contentCache = new Map();

/**
 * Load and process markdown content from src/content/pages/
 * @param {string} slug - The page slug (filename without .md extension)
 * @returns {Object} Processed content with frontmatter and HTML
 */
export function getPageContent(slug) {
  // Check cache first
  if (contentCache.has(slug)) {
    return contentCache.get(slug);
  }

  try {
    // Use Vite's import.meta.glob to load all markdown files
    const modules = import.meta.glob('../content/pages/*.md', {
      as: 'raw',
      eager: true
    });

    // Find the matching file
    const filePath = `../content/pages/${slug}.md`;
    const content = modules[filePath];

    if (!content) {
      throw new Error(`Content file not found: ${slug}.md`);
    }

    // Parse frontmatter and content
    const { data: frontmatter, content: markdownContent } = matter(content);

    // Convert markdown to HTML
    const processedContent = remark()
      .use(remarkHtml)
      .processSync(markdownContent);

    const htmlContent = processedContent.toString();

    // Cache the result
    const result = {
      frontmatter,
      content: htmlContent,
      slug
    };

    contentCache.set(slug, result);
    return result;

  } catch (error) {
    console.error(`Error loading content for ${slug}:`, error);
    return {
      frontmatter: {},
      content: '<p>Content not found</p>',
      slug
    };
  }
}

/**
 * Get all available page slugs
 * @returns {string[]} Array of page slugs
 */
export function getAllPageSlugs() {
  try {
    const modules = import.meta.glob('../content/pages/*.md', {
      as: 'raw',
      eager: true
    });

    return Object.keys(modules).map(path => {
      const fileName = path.split('/').pop();
      return fileName.replace('.md', '');
    });
  } catch (error) {
    console.error('Error getting page slugs:', error);
    return [];
  }
}

/**
 * Clear the content cache (useful for development)
 */
export function clearContentCache() {
  contentCache.clear();
}
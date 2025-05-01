import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export function loadScroll(vault: string, scroll: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'vaults', vault, `${scroll}.md`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data: frontmatter, content } = matter(fileContents);

    return {
      frontmatter,
      contentHtml: content,
    };
  } catch (err) {
    console.error(`Scroll not found: ${vault}/${scroll}`, err);
    return null;
  }
}

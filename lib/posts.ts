import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

export type Post = {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
  draft: boolean;
};

export type PostWithContent = Post & {
  content: string;
};

const POSTS_DIR = path.join(process.cwd(), "content", "posts");

function readPostFile(filename: string): PostWithContent {
  const slug = filename.replace(/\.mdx$/, "");
  const filePath = path.join(POSTS_DIR, filename);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  for (const field of ["title", "date", "excerpt"] as const) {
    if (typeof data[field] !== "string" || data[field].length === 0) {
      throw new Error(
        `Post "${slug}" is missing required frontmatter field: ${field}`,
      );
    }
  }

  return {
    slug,
    title: data.title,
    date: data.date,
    excerpt: data.excerpt,
    tags: Array.isArray(data.tags) ? data.tags : [],
    draft: data.draft === true,
    content,
  };
}

function isVisible(post: Post): boolean {
  return process.env.NODE_ENV === "production" ? !post.draft : true;
}

export function getAllPosts(): Post[] {
  const filenames = fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx"));

  return filenames
    .map(readPostFile)
    .filter(isVisible)
    .sort((a, b) => b.date.localeCompare(a.date))
    .map((full): Post => ({
      slug: full.slug,
      title: full.title,
      date: full.date,
      excerpt: full.excerpt,
      tags: full.tags,
      draft: full.draft,
    }));
}

export function getPostBySlug(slug: string): PostWithContent | null {
  const filename = `${slug}.mdx`;
  const filePath = path.join(POSTS_DIR, filename);
  if (!fs.existsSync(filePath)) return null;

  const post = readPostFile(filename);
  if (!isVisible(post)) return null;
  return post;
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(POSTS_DIR)
    .filter((name) => name.endsWith(".mdx"))
    .map((name) => name.replace(/\.mdx$/, ""));
}

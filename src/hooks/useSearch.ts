import Fuse from 'fuse.js';
import { useMemo, useState } from 'react';
import { Link } from '../utils/validation';

interface CategoryLinks {
  [key: string]: Link[];
}

export function useSearch(categories: CategoryLinks) {
  const [searchQuery, setSearchQuery] = useState('');

  const fuse = useMemo(() => {
    const searchData = Object.entries(categories).flatMap(([category, links]) =>
      links.map(link => ({ ...link, category }))
    );

    return new Fuse(searchData, {
      keys: ['title', 'description', 'category'],
      threshold: 0.4,
    });
  }, [categories]);

  const results = useMemo(() => {
    if (!searchQuery) return null;
    return fuse.search(searchQuery).map(result => result.item);
  }, [fuse, searchQuery]);

  return { searchQuery, setSearchQuery, results };
}
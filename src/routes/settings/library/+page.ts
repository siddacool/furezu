import { getBooksFromLibrary } from '$lib/data/library';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
  try {
    const library = await getBooksFromLibrary();

    return {
      library,
    };
  } catch (e) {
    console.log(e);
    return {
      library: [],
    };
  }
};

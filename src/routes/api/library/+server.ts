import { getBooksFromLibrary } from '$lib/data/library';
import { json } from '@sveltejs/kit';

export async function GET() {
  try {
    const books = await getBooksFromLibrary();

    return json(books);
  } catch (e) {
    console.log(e);
    return json([]);
  }
}

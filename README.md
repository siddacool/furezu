# Furezu

A simple Phrasebook for travel. Checkout [Web app](https://furezu.netlify.app/).

---

Links:

- [Web app](https://furezu.netlify.app/)
- [Github](https://github.com/siddacool/furezu)

## Development

Make sure you are on suitable `node` and `pnpm` versions. I would recommend using [volta](https://volta.sh/).

1. Install all dependancies with `pnpm install`
2. Use `pnpm dev` or `npm run dev` to run the project

### Debug mode

#### Enable debug mode

1. copy `.env.example` as `.env`
2. set `VITE_APP_DEBUG_MODE` to `yes`

#### Debug tools

1. Quick theme changer - Change theme quickly
2. Download book button - Download books and the corrosponding phrases

### Check code

use `pnpm check` or `npm run check` to check code for issues.

### Storybook

Components can be previewed, tested, and modified in isolation with storybook.
use `pnpm storybook` or `npm run storybook` to do so.

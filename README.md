0x054 is a note taking tool with a notion like file structre and text editor to make use of [convex's vector search](https://docs.convex.dev/vector-search) and locally ran LLMs. It's [live](https://github.com/hfkhrni/0x054), you can make an account and start using it.

## Run Locally

clone this repo
```bash
git clone https://github.com/hfkhrni/0x054.git
```
`cd` into the repo's folder and install dependencies
```bash
pnpm install
```
rename `.env-example.local` to `.env.local` and fill it out

start Next's dev server
```bash
pnpm run dev
```
start Convex's dev server
```bash
pnpm dlx convex dev
```

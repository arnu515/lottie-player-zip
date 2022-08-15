# Lottie Player with ZIP Support

This React component is a wrapper for `@lottiefiles/lottie-player`. It enables extracting ZIP files and playing them with `@zip.js/zip.js` directly in the browser.

**NOTICE** The zip file must have a `data.json` file containing the lottie sticker.

## Installation

Currently, it only supports React. I plan on making this a web component so you can use it with any framework soon.

```bash
npm install --save lottie-player-zip
```

## Usage

```jsx
import LottiePlayerZIP from "lottie-player-zip"

function Test() {
	return (
		<>
			{/* Load any zip file hosted anywhere on the internet! */}
			{/* Load any zip file hosted anywhere on the internet! You can pass any prop supported by `@lottiefiles/lottie-player` */}
			<LottiePlayerZIP
				url="https://files.catbox.moe/6cia06.zip"
				width={512}
				height={512}
			/>
			{/* You can also use regular JSON files */}
			<LottiePlayerZIP url="https://files.catbox.moe/nlgyq2.json" />
		</>
	)
}
```

## To-do

[ ] Add support for GZipped files (e.g. `.tgs`)
[ ] Add support for passing local zip files (e.g. files uploaded by the user using `<input>`)
[ ] Add first-class support for Deno. You can use `esm.sh` to import it for now.

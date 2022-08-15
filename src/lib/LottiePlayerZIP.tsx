import React, { useEffect, useRef, useState } from "react"
import "@lottiefiles/lottie-player"
import { BlobReader, ZipReader } from "@zip.js/zip.js"

interface Props {
	url: string
	lottieProps?: any
}

const LottiePlayerZip: React.FC<Props> = ({
	url,
	lottieProps = {
		background: "transparent",
		speed: "1",
		style: { width: "300px", height: "300px" },
		loop: true,
		autoplay: true
	}
}) => {
	const [data, setData] = useState<string | null>(null)
	const playerRef = useRef<any>(null)

	useEffect(() => {
		const run = async () => {
			if (url.endsWith("zip")) {
				try {
					const res = await fetch(url)
					const file = await res.blob()

					const br = new BlobReader(file)
					const zr = new ZipReader(br)
					const stream = new TransformStream()
					const dataJson = (await zr.getEntries()).find(i =>
						i.filename.endsWith(".json")
					)
					if (!dataJson?.getData) {
						throw new Error()
					}

					dataJson.getData(stream)
					await zr.close()

					const fileData = await new Response(stream.readable).text()
					// parse to json to make sure file is valid
					JSON.parse(fileData)

					setData(fileData)
				} catch {
					throw new Error("Invalid zip file")
				}
			} else setData(url)
		}
		run()
	}, [url])

	useEffect(() => {
		if (!playerRef.current) return
		if (data) {
			playerRef.current.addEventListener("rendered", () => {
				playerRef.current.load(data)
			})
		}
	}, [data, playerRef])

	if (!data) return null

	return <lottie-player ref={playerRef} {...lottieProps}></lottie-player>
}

export default LottiePlayerZip

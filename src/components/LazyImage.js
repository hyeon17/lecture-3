import React, { useRef, useEffect } from 'react'

function LazyImage({ src, webpSrc, sources, alt, className }) {
	const pictureRef = useRef(null)

	useEffect(() => {
		const picture = pictureRef.current
		if (!picture) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					const sourceEls = picture.querySelectorAll('source[data-srcset]')
					sourceEls.forEach(source => {
						source.srcset = source.dataset.srcset
					})
					const img = picture.querySelector('img[data-src]')
					if (img) {
						img.src = img.dataset.src
					}
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)

		observer.observe(picture)

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<picture ref={pictureRef}>
			{webpSrc && <source data-srcset={webpSrc} type="image/webp"/>}
			{sources && sources.map((source, i) => (
				<source key={i} data-srcset={source.srcset} type={source.type} media={source.media}/>
			))}
			<img data-src={src} alt={alt || ''} className={className}/>
		</picture>
	)
}

export default LazyImage

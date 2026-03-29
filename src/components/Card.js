import React, { useRef, useEffect } from 'react'

function Card(props) {
	const imgRef = useRef(null)

	useEffect(() => {
		const img = imgRef.current
		if (!img) return

		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					img.src = img.dataset.src
					observer.disconnect()
				}
			},
			{ threshold: 0.1 }
		)

		observer.observe(img)

		return () => {
			observer.disconnect()
		}
	}, [])

	return (
		<div className="Card text-center">
			<img ref={imgRef} data-src={props.image}/>
			<div className="p-5 font-semibold text-gray-700 text-xl md:text-lg lg:text-xl keep-all">
				{props.children}
			</div>
		</div>
	)
}

export default Card

import React, { useState, useEffect } from 'react';
import FontFaceObserver from 'fontfaceobserver';
import video from '../assets/banner-video.mp4';

function BannerVideo({ sources }) {
	const [fontLoaded, setFontLoaded] = useState(false);

	useEffect(() => {
		const font = new FontFaceObserver('BMYEONSUNG');
		console.log('BMYEONSUNG 폰트 로딩 시작');
		font
			.load(null, 200000)
			.then(() => {
				console.log('BMYEONSUNG 폰트 로딩 완료');
			})
			.then(() => {
				setFontLoaded(true);
			})
			.catch(() => {
				console.log('BMYEONSUNG 폰트 로딩 실패 (타임아웃)');
				setFontLoaded(true);
			});
	}, []);

	return (
		<div className='BannerVideo w-full h-screen overflow-hidden relative bg-texture'>
			<div className='absolute h-screen w-full left-1/2'>
				<video
					src={video}
					className='absolute translateX--1/2 h-screen max-w-none min-w-screen -z-1 bg-black min-w-full min-h-screen'
					autoPlay
					loop
					muted>
					{sources && sources.map((source, index) => <source key={index} src={source.src} type={source.type} />)}
				</video>
			</div>
			<div className='w-full h-full flex justify-center items-center'>
				<div
					className='text-white text-center'
					style={{
						opacity: fontLoaded ? 1 : 0,
						transition: 'opacity 0.3s ease',
					}}>
					<div className='text-6xl leading-none font-semibold'>KEEP</div>
					<div className='text-6xl leading-none font-semibold'>CALM</div>
					<div className='text-3xl leading-loose'>AND</div>
					<div className='text-6xl leading-none font-semibold'>RIDE</div>
					<div className='text-5xl leading-tight font-semibold'>LONGBOARD</div>
				</div>
			</div>
		</div>
	);
}

export default BannerVideo;

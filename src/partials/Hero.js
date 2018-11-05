import React from 'react'

import ImageLoader from '../handler/ImageLoader'
import * as helpers from '../handler/helpers'



//const getProgress = ( start, end, duration ) => {
//
//	console.log( "ProgressBar ", duration )
//	const range = end - ondragstart
//	let current = ondragstart
//	const step = end > start ? 1 : -1
//	const stepTime = Math.abs( Math.floor( duration / range ) )
//	
//	const timer = setInterval( function() {
//
//		console.log( "set interval" )
//		current += step
//		if ( current === end ) {
//			console.log( "clear interval" )
//			clearInterval( timer )
//		}
//		
//		return current
//
//	}, stepTime )
//}

class Hero extends React.Component {
	
	componentDidMount() {
		
		if ( window.scrollY > 0 ) {
			this.scrollToTop();
		}

		return () => { this.props.ativateHero( true ) }

	}
	
	scrollToTop() {		
		window.scroll( { top: 0 } )
	}

	imageOrVideo( alt, src ) {
		
		const count = 0
		const oneUp = this.props.oneUp		
		const type = helpers.getFiletype( src )
		const id = "background"

		const videoDataPath = "http://www.mariotestino.com/wp-content/uploads/2017/07/"
		const videoURL = "CHNY_AW17.mp4"
		
		const backgroundImage = `url( ${ src } )`	

		
		const imageTag = (

			<figure id = { id }>
				<ImageLoader 
					src = { src }
					alt = { alt }
					count = { count }
					oneUp = { oneUp }
				/>
			</figure>

		)
		
		const videoTag = (
			
			<figure id = { id }>
				<video 
					aria-hidden = "true" 
					className = "background" 
					data-inline-video-path = { videoDataPath }
					autoplay
					loop
					muted
					playsinline 
					src = { videoDataPath + videoURL }
					tabindex = "-1"
				/>
			</figure>

		)
		
		const divTag = (
			
			<div id = { id }>
				<div style = { backgroundImage }></div>
			</div>
			
		)
		
		switch( type ) {

			case "image": return imageTag
			case "video": return videoTag
			default: return divTag
		
		}

	}
		
	render() {

//		const timing = window.performance.timing
//
//		const estimatedTime = ( timing.loadEventEnd - timing.navigationStart )
//		const timeInMs = parseInt( ( estimatedTime / 1000 ) % 60 ) * 100
//
//		console.log( "loadEventEnd: ", timing.loadEventEnd )
//		console.log( "timeInMs: ", timeInMs )
//
//		getProgress( 0, 100, timeInMs )
		
		const state = this.props.state
		const mainTitle = state.mainTitle
		const hero = state.hero
		const logo = helpers.changeLogoColor( state.logo, "white" )
		const heroIsActive = state.heroIsActive
		const heroIsVisible = this.props.heroIsVisible
		const heroDidLoad = this.props.heroDidLoad

//		const virgin = state.virgin
		
		
		
//		if ( virgin ) {
//			progressBar = (
//				<div id = "virgin-progress">
//					{ getProgress( 0, 100, timeInMs ) }
//				</div>
//			)
//		}
		
//		const progress = ProgressBar( 0, 100, timeInSeconds )
//		console.log( "progress: ", progress )

		// Fading Out Loadbar on Finished
//		setTimeout(function(){
//			$('.preloader-wrap').fadeOut(300);
//		}, time);


		
		const heroClass = "uppercase down " +
			( heroIsVisible ? "appear" : "vanish" )
		
		const bouncerClass = state.scrollingDown ? "vanish" : "appear-delayed"
		
		const onLoad = heroIsActive ? 
			null : 
			() => this.props.activateHero( true )
		
		const bouncerTag = (
			
			<div className = { bouncerClass }>
				<div className = "fat" id = "bouncer-text"><span>scroll</span></div>
			</div>

		)

		return (

			<section 
				className = { heroClass }
				id = "hero" 
				onClick = { () => this.props.onClick( "heroClick" ) }						
				onLoad = { onLoad }
				onError = { () => this.props.activateHero( false ) }
			>

				{ this.imageOrVideo( mainTitle, hero ) }

				<div className = "infobox no-select" id = "logo">

					<picture>
						<source srcSet = { logo } type = "image/svg+xml" />
						<img src = { logo } alt = { mainTitle } />
					</picture>

					{ heroDidLoad ? bouncerTag : null }

				</div>

			</section>
		)
	
	}
	
}

export default Hero

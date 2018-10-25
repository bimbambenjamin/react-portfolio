import React from 'react'

import * as helpers from '../handler/helpers'



class Hero extends React.Component {
	
	componentDidMount() {
		this.scrollToTop();
		return () => { this.props.ativateHero( true ) }
	}
	componentWillUnmount() {
	}
	scrollToTop() {
		window.scroll( { top: 0 } )
	}

	imageOrVideo( alt, src ) {
		
		const type = helpers.getFiletype( src )
		
		const videoDataPath = "http://www.mariotestino.com/wp-content/uploads/2017/07/"
		const videoURL = "CHNY_AW17.mp4"
		const backgroundImage = `url( ${ src } )`	
		const id = "background"
		
		switch( type ) {

			case "image":
			return (
				<figure id = { id }>
					<img 
						src = { src }
						alt = { alt }
					/>
				</figure>
			)
				
			case "video":
			return (
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
			default:
			return (
				<div id = { id }>
					<div style = { backgroundImage }></div>
				</div>
			)
		
		}

	}
	
	render() {

		const state = this.props.state
		const mainTitle = state.mainTitle
		const hero = state.hero
		const logo = helpers.changeLogoColor( state.logo, "white" )
		const heroIsActive = state.heroIsActive
		const heroIsVisible = this.props.heroIsVisible
		
		console.log( "HERO STATE: ", state )
		
		const heroClass = "uppercase down " +
			( heroIsVisible ? "appear" : "vanish" )
		
		const bouncerClass = state.scrollingDown ? "vanish" : "appear-delayed"
		
		const onLoad = heroIsActive ? 
			null : 
			() => this.props.activateHero( true )

		return (

			<section 
				className = { heroClass }
				id = "hero" 
				onClick = { () => this.props.onClick( "heroClick" ) }						onLoad = { onLoad }
				onError = { () => this.props.activateHero( false ) }
 
			>

				{ this.imageOrVideo( mainTitle, hero ) }

				<div className = "infobox no-select" id = "logo">

					<picture>
						<source srcSet = { logo } type = "image/svg+xml" />
						<img src = { logo } alt = { mainTitle } />
					</picture>

				</div>

				<div className = { bouncerClass }>
					<div className = "fat" id = "bouncer-text"><span>scroll</span></div>
				</div>

			</section>
		)
	
	}
	
}

export default Hero

import React from 'react'



class Hero extends React.Component {
	
	scrollToTop() {
		window.scroll( { top: 0 } )
	}
	componentDidMount() {		
		this.scrollToTop();
		console.log( "i am your hero!" )
		return () => { this.props.ativateHero( true ) }
	}
	
	getFiletype( filename ) {

		if ( typeof filename === "string" ) {
			
			const extension = filename.split( '.' ).pop()
		
			if ( extension === "jpg" || extension === "gif" || extension === "png" || extension === "jpeg" ) {
				return "image"
			} else if ( extension === "mp4" ) {
				return "video"
			} else {
				return "not valid"
			}

		}

	}

	imageOrVideo( alt, src ) {
		
		const type = this.getFiletype( src )
		
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
	
	whiteLogo( logo ) {
		
		if ( typeof logo === "string" ) {
			const filename = logo.split( '.' ).shift()
			const extension = logo.split( '.' ).pop()
			const whiteLogo = filename + "-white." + extension
			return whiteLogo
		}
		
	}
	
	render() {

		const state = this.props.state
		const mainTitle = state.mainTitle
		const hero = state.hero
		const logo = this.whiteLogo( state.logo )
		const logoPath = state.imagePath + "logo/" + logo
		const heroIsActive = state.heroIsActive
		console.log( "scrolling? ", state.isScrolling )
		const bouncerClass = state.scrollingDown ? "vanish" : "appear-delayed"
		
		const onLoad = heroIsActive ? 
			null : 
			() => this.props.activateHero( true )

		return (

			<section 
				className = "uppercase down" 
				id = "hero" 
				onClick = { () => this.props.onClick( "heroClick" ) }						onLoad = { onLoad }
				onError = { () => this.props.activateHero( false ) }
 
			>

				{ this.imageOrVideo( mainTitle, hero ) }

				<div className = "infobox no-select" id = "logo">

					<picture>
						<source srcSet = { logoPath } type = "image/svg+xml" />
						<img src = { logoPath } alt = { mainTitle } />
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

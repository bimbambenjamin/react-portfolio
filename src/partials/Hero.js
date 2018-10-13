import React from 'react'



class Hero extends React.Component {

	getFiletype( filename ) {

		const extension = filename.split( '.' ).pop()
		
		if ( extension === "jpg" || extension === "gif" || extension === "png" || extension === "jpeg" ) {
			return "image"
		} else if ( extension === "mp4" ) {
			return "video"
		} else {
			return "not valid"
		}
		
	}

	imageOrVideo( alt, src ) {
		
		const type = this.getFiletype( src )
		
		const videoDataPath = "http://www.mariotestino.com/wp-content/uploads/2017/07/"
		const videoURL = "CHNY_AW17.mp4"
		
		switch( type ) {

			case "image":
			return (
				<figure id = "background">
					<img 
						src = { src }
						alt = { alt }
					/>
				</figure>
			)
				
			case "video":
			return (
				<figure id = "background">
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
			return
		
		}

	}
	
	render() {

		const mainTitle = this.props.mainTitle
		const hero = this.props.hero
		const bouncerClasses = "appear-delayed"

		return (

			<section className = "uppercase down" id = "hero" onClick = { () => this.props.onClick( "heroClick" ) } >

				{ this.imageOrVideo( mainTitle, hero ) }

				<div className = "infobox no-select" id = "logo">

					<object
						id = "logo-svg"
						data = "assets/img/logo/hoechstetter-white.svg" 
						type = "image/svg+xml">
						<span>{ this.props.mainTitle }</span>
					</object>

				</div>

				<div className = { bouncerClasses }>
					<div id = "bouncer"></div>
				</div>

			</section>
		)
	
	}
	
}

export default Hero

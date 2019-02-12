import React from 'react'

import * as helpers from '../handler/helpers'



const getVideoTag = ( src, id, count, oneUp ) => {
    
	const splitVideoPath = src.split( "/" )
	const videoURL = splitVideoPath.pop()
	const videoDataPath = splitVideoPath.join( "/" )
	const videoTag = (
        
		<figure id = { id }>
        
			<video 
				aria-hidden = "true" 
				data-inline-video-path = { videoDataPath }
				autoPlay
				loop
				muted
				playsInline 
				tabIndex = "-1"
			>
                <source src = { videoDataPath + "/" + videoURL } />
            </video>

		</figure>
        
	)
	return videoTag
}

const getImageTag = ( alt, src, id ) => {
	const imageTag = (
		<figure id = { id }>
			<img
				src = { src }
				alt = { alt }
			/>
		</figure>
	)
	return imageTag
}

const getDivTag = ( src, id ) => {
	const backgroundImage = `url( ${ src } )`
	const divTag = (
		<div id = { id }>
			<div style = { backgroundImage }></div>
		</div>
	)
	return divTag
}

class Hero extends React.Component {
	
	componentDidMount() {
		
		if ( window.scrollY > 0 ) {
			this.scrollToTop();
		}
		( () => this.props.oneUp() )()


	}
	
	scrollToTop() {		
		window.scroll( { top: 0 } )
	}

	imageOrVideo( alt, src ) {
		
		const type = helpers.getFileType( src )
		const id = "background"
		
		switch( type ) {

			case "video": return getVideoTag( src, id )
			case "image": return getImageTag( alt, src, id )
			default: return getDivTag( src, id )
		}

	}
        
	render() {
		
		const state = this.props.state
		const mainTitle = state.mainTitle
        
    let hero = ""
        
        // TODO: check for video ---> load still first, then swap it to video
        
        if ( state.heroElements.length ) {
//            console.log("heroElements", state.heroElements)
//            const randomHeroElement = Math.floor( ( Math.random() * state.heroElements.length ) + 0 )
            const e = state.heroElements[ 0 ]
			hero = helpers.getFullPath( state.backendPath, "hero", e )
            
        }
        
//		const logo = helpers.changeLogoColor( state.logo, "white" )
		const logoSvg = state.logo.hero.svg
		const logoPng = state.logo.hero.png
    const heroIsAvailable = hero ? true : false
		const heroIsActive = state.heroIsActive
		const heroIsVisible = this.props.heroIsVisible
		const heroDidLoad = this.props.heroDidLoad
		
		const divStyle = state.divStyle        
    const logoClasses = "infobox no-select " + divStyle
        
		const heroClass = "uppercase " +
			( heroIsVisible ? "appear" : "vanish" )
		
		const bouncerClass = state.scrollingDown ? "vanish" : "appear-delayed"
		
		const onLoad = heroIsActive ? 
			null : 
			() => this.props.activateHero( true )
		
		const logoTag = (
			
			<div className = { logoClasses } id = "logo">

				<picture>
					<source srcSet = { logoSvg } type = "image/svg+xml" />
					<img src = { logoPng } alt = { mainTitle } />
				</picture>

			</div>

		)
		
		const bouncerTag = (
			
			<div className = { bouncerClass }>
				<div className = "fat" id = "bouncer-text"><span>&#x25BC;</span></div>
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

				{ heroIsAvailable ? this.imageOrVideo( mainTitle, hero ) : null }
				{ logoTag }
				{ heroDidLoad ? bouncerTag : null }

			</section>
		)
	
	}
	
}

export default Hero

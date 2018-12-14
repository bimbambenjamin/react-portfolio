import React from 'react'
import { NavLink } from 'react-router-dom'

import Socializer from '../partials/Socializer'
import * as helpers from '../handler/helpers'



function HeaderLogo( props ) {

    return (
		
		<NavLink 
			exact
			to = "/"
		>
			<div 
				className = "header-logo" 
				id = "header-logo" 
				onClick = { () => props.onClick( "/" ) }
                onMouseEnter = { props.onMouseEnter }
                onMouseLeave = { props.onMouseLeave }
			>
				<picture>
					<source srcSet = { props.logoSvg } type = "image/svg+xml" />
					<img src = { props.logoPng } alt = { props.mainTitle } />
				</picture>

			</div>
		</NavLink>

	)

}

function HeaderNav( props ) {
	
    const servicesTag = (
        
        <div className = "services no-select">
            <ul>
                <li>photography</li>
                <li>motion</li>
                <li>art direction</li>
            </ul>
        </div>
        
    )
    
	return (

		<nav className="flexbox row">

			<button 
				className = "uppercase hidden-button" 
				type = "button"
				onClick = { () => props.onClick( "back" ) }
			>
				<span>back</span>
			</button>

            { props.logoIsShort ? servicesTag : null }
			
			<NavLink 
				exact
				to = "/contact"
				activeClassName = "vanish no-select current"
				isActive = { helpers.checkActive }
			>
			
				<button 
					className = "uppercase"
					type = "button" 
					onClick = { () => props.onClick( "/contact" ) }
				>
					<span>contact</span>
				</button>

			</NavLink>

		</nav>

	)
	
}

class Header extends React.Component {
    
    constructor( props ) {
        super( props )
        this.state = {            
            logoIsShort: true
        }
        this.showFullLogo = this.showFullLogo.bind( this )
        this.showShortLogo = this.showShortLogo.bind( this )
    }
    
    randomNumber( from, to ) {
        const value = Math.floor( ( Math.random() * to ) + from )
        return value
    }
    
    showFullLogo() {
        const windowWidth = window.innerWidth
        if ( windowWidth > 500 ) {
            this.setState( { 
                logoIsShort: false 
            } )
        }
    }
    showShortLogo() {
        this.setState( { 
            logoIsShort: true 
        } )
    }

	render() {

//        const logoNames = [
//            "sth"
//        ]
//        const logoFile = logoNames[ this.randomNumber( 0, logoNames.length ) ]
		const state = this.props.state
		const targetLocation = state.targetLocation
		const mainTitle = state.mainTitle
//		const logo = state.logo
        const longOrShort = this.state.logoIsShort ? "" : "-full"
        const logoFile = "sth" + longOrShort
        
        const logoSvg = helpers.getFullPath( state.imagesPath, "logo", logoFile + ".svg" )
        const logoPng = helpers.getFullPath( state.imagesPath, "logo", logoFile + ".png" )

		const logo = helpers.changeLogoColor( state.logo, "black" )
		const heroIsActive = this.props.heroIsActive
		const id = this.props.headerId
		
        const instagramBwSvg = helpers.getFullPath( state.imagesPath, "tools", "instagram-bw.svg" )
        const instagramBwPng = helpers.getFullPath( state.imagesPath, "tools", "instagram-bw.png" )
        const instagramColorPng = helpers.getFullPath( state.imagesPath, "tools", "instagram-color.png" )

        let headerClasses = 
			"uppercase appear-later " +
			( heroIsActive ? "stick-to-second-section " : "" )
			  
		if ( id === "3" ) {
			
			// reconstruted css vars
			const unit = 20
			const pageFrameBig = unit * 5
			const pageFrame = window.visualViewport.width <= 1023 ? unit : pageFrameBig
			const logoHeight = unit * 2
			const headerHeight = pageFrame * 2 + logoHeight

			const windowHeight = window.visualViewport.height
			const headerPosition = heroIsActive ?
				windowHeight + headerHeight :
				headerHeight

			const scrollingDown = state.scrollingDown
			const scrollPosition = window.scrollY
			const stickToTop = scrollPosition > headerPosition ? true : false
			const moveUp = scrollingDown && stickToTop ? true : false
			
			const updateClasses = 
				headerClasses +
				( stickToTop ? "stick-to-top " : "" ) +
				( moveUp ? "move-up" : "" )
			
			headerClasses = updateClasses
			
		}
		
		return (

			<header 
				id = { id }
				className = { headerClasses } 
			>

				<HeaderLogo
					mainTitle = { mainTitle }
					logo = { logo }
					logoSvg = { logoSvg }
					logoPng = { logoPng }
					onClick = { ( i ) => this.props.onClick( i ) }
                    onMouseEnter = { this.showFullLogo }
                    onMouseLeave = { this.showShortLogo }
				/>
				<HeaderNav
					targetLocation = { targetLocation }
					onClick = { ( i ) => this.props.onClick( i ) }
                    logoIsShort = { this.state.logoIsShort }
				/>
                <Socializer
                    srcSvg = { instagramBwSvg }
                    srcPng = { instagramBwPng }
                    srcColorPng = { instagramColorPng }
                />

			</header>

		)

	}
		
}

export default Header;

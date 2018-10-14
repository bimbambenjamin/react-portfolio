import React from 'react'

import Hero from './Hero'
import Header from './Header'
import Gallery from './Gallery'
import Showcase from './Showcase'
import Social from './Social'
import Contact from './Contact'
import Imprint from './Imprint'
import Privacy from './Privacy'



class Main extends React.Component {

	renderComponents( targetLocation ) {
		
		const target = !isNaN( targetLocation ) ? "showcase" : targetLocation
		const state = this.props.state
		const showcaseId = targetLocation
		const showcase = state.showcases[ showcaseId ]
		const mainTitle = state.mainTitle
		const onClick = ( i ) => this.props.onClick( i )
		const hero = state.hero
		
		let mainClass = "appear"
		if ( state.fadeOut ) {
			console.log("F A D E O U T:  ", state.fadeOut )
			mainClass = "vanish"
		}
		
	
		switch ( target ) {

			case "home":
			return (
				<main className = { mainClass }>
					<Hero 
						mainTitle = { mainTitle }
						hero = { hero }
						onClick = { onClick }
					/>
					<Gallery 
						state = { state } 
						onClick = { onClick }
					/>
					<Social />
				</main>
			)
			case "showcase": 
			return (
				<main className = { mainClass }>
					<Showcase 
						showcase = { showcase }
						showcasesPath = { state.showcasesPath }
						imageStatus = { ( status ) => this.props.imageStatus( status ) }
					/>
					<Header 
						mainTitle = { state.mainTitle }
						logo = { state.logo }
						onClick = { ( i ) => this.handleClick( i ) }
						targetLocation = { target }

					/>
					<Gallery 
						state = { state }
						onClick = { onClick }
					/>
					<Social />
				</main>
			)	
			case "contact":
			return (
				<main className = { mainClass }>
					<Contact />
				</main>
			)
			case "imprint":
			return (
				<main className = { mainClass }>
					<Imprint />
				</main>
			)
			case "privacy":
			return (
				<main className = { mainClass }>
					<Privacy />
				</main>
			)
			default: 
			return (
				<main className = { mainClass }>
					<Hero 
						mainTitle = { mainTitle }
						hero = { hero }
						onClick = { onClick }
					/>
					<Gallery 
						state = { state } 
						onClick = { onClick }
					/>
					<Social />
				</main>
			)
		}
		
	}

	render() {

		return this.renderComponents( this.props.targetLocation )

	}
}

export default Main

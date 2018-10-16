import React from 'react'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import Hero from './Hero'
import Header from './Header'
import Gallery from './Gallery'
import Showcase from './Showcase'
import Social from './Social'
import Contact from './Contact'
import Imprint from './Imprint'
import Privacy from './Privacy'



class HomeStory extends React.Component {
	
	render() {
		
		const state = this.props.state
		const mainClass = this.props.mainClass
		const onClick = ( i ) => this.props.onClick( i )
		
		const imagePath = state.imagePath
		const imageStatus = ( status ) => state.imageStatus( status )
		const mainTitle = state.mainTitle

		return(
			
			<main className = { mainClass }>
			
				<Hero 
					state = { state } 
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
class Main extends React.Component {

	handleRoutes( state ) {
		
		let target = !isNaN( state.targetLocation ) ? "showcase" : state.targetLocation
		const current = state.currentLocation
		
		const showcaseId = state.targetLocation
		const showcase = state.showcases[ showcaseId ]
		const currentShowcase = state.showcases[ current ]
		const mainTitle = state.mainTitle
		const hero = state.hero
		const logo = state.logo
		
		const onClick = ( i ) => this.props.onClick( i )

		let mainClass = "appear"
		
		if ( state.fadeOut ) {
			target = current
			mainClass = "hide"
		}
		
		switch ( target ) {

			case "home":
			return (
				
				<Route
					name = "home"
					path = "/" 
					component = { ( props ) => ( 
						<HomeStory 
							state = { state } 
							props = { props } 
							mainClass = { mainClass }
							onClick = { onClick }
						/> 
					) }
				/>
				
			)
			case "showcase": 
			return (
				<main className = { mainClass }>
					<Showcase 
						currentShowcase = { currentShowcase }
						showcase = { showcase }
						imagePath = { state.imagePath }
						imageStatus = { ( status ) => this.props.imageStatus( status ) }
					/>
					<Header 
						mainTitle = { state.mainTitle }
						imagePath = { state.imagePath }
						logo = { logo }
						targetLocation = { target }

					/>
					<Gallery 
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
					<Social />
				</main>
			)
		}
		
	}

	render() {

		const state = this.props.state

		return this.handleRoutes( state )

	}
}

export default Main

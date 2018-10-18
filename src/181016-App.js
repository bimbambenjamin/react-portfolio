import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import axios from 'axios'

import Header from './partials/Header'
import Main from './partials/Main'
import Footer from './partials/Footer'



class App extends React.Component {

	constructor( props ) {
		
		super( props )
		
		this.state = {
			
			showcases: [],
			imagePath: "https://benjamin-jager.com/projects/sacha-assets/img/",
			currentLocation: this.handleLocation( window.location.pathname ),
			targetLocation: this.handleLocation( window.location.pathname ),
			showcaseId: null,
			mainTitle: "SASCHA TASSILO HOECHSTETTER",
			logo: "hoechstetter.svg",
			hero: "https://www.benjamin-jager.com/projects/sacha-assets/img/hero/The-future-is-now04.jpg",
			fadeOut: false
			
		}
	}
		
	handleLocation( url ) {
		
		let target = url
		const index = "/"
		const validLocations = [
			index,
			"/home",
			"/contact",
			"/imprint",
			"/privacy",
		]
		
		if ( validLocations.includes( target ) ) {
			return target
		} else {
			console.log("replaced")
			window.location.replace( index )
			return index
		}
		
	}
    componentDidMount() {
		
		const backend = process.env.REACT_APP_BACKEND_URL || 8080 

		axios.get( backend )
		.then( res => {
			const showcases = res.data
			this.setState( { showcases } )
		})

		window.addEventListener( "scroll", this.handleScroll.bind(this));

	}
		
	handleImages( status ) {
		console.log("handleImages: ", status)		
	}
	scrollToTop() {
		window.scroll( { top: 0 } )
	}
	heroScroll() {
		window.scroll( { left: 0, top: window.innerHeight, behavior: "smooth" } )
	}
	handleScroll() {
		if ( this.state.fadeOut && window.pageYOffset === 0 ) {
//			this.jumpTo()
		}
	}

	handleClick( i ) {

		console.log( "handleClick i: ", i )

		let current = this.state.currentLocation
		const showcaseId = !isNaN( i ) ? i : null
		const samo = i === current ? true : false
		
		if ( i === "heroClick" ) {
			
			current = "home"
			this.heroScroll()
			
		} else if ( !samo ) {
			
			this.handleTransition( current, i, showcaseId )
			
		} else {
			console.log( "SAMO" )
		}

	}
	handleTransition( current, target, showcaseId ) {

		let newCurrent = target
		
		if ( this.state.showcases[current] ) {
			console.log( "FADE THIS FUCKER OUT PLEASE", current )
		}

		console.log( "RE-RENDER handleTransition", current, target )

		this.setState( {
			
			currentLocation: current,
			targetLocation: target,
			showcaseId: showcaseId,
			fadeOut: true

		} )

		const _this = this
		setTimeout( function() {
			console.log( "--- time ---" )
			_this.jumpTo( newCurrent, target )
		}, 1000 )
		this.scrollToTop()


	}
	jumpTo( newCurrent, target ) {
		
		console.log( "RE-RENDER jumpTo ", newCurrent, target )
		this.setState( {
			
			currentLocation: newCurrent,
			fadeOut: false

		} )

	}
	
	writeMainSection( targetLocation, showcaseId ) {

//		if ( this.state.showcases.length >= 0 ) {

			return (

				<Main 
					state = { this.state }
					onClick = { ( i ) => this.handleClick( i ) }
					imageStatus = { ( status ) => this.handleImages( status ) }
				/>
	
			)

//		} else {
//
//			return (
//
//				<Main 
//					state = { this.state }
//					onClick = { ( i ) => this.handleClick( i ) }
//					imageStatus = { ( status ) => this.handleImages( status ) }
//					ref = { this.content }
//				/>
//
//			)
//
//		}
		
	}
	
	render() {
		
		// get target from user interaction
		// showcase target includes showcase id
		const currentLocation = this.state.currentLocation
		const targetLocation = this.state.targetLocation
		const showcaseId = this.state.showcaseId
		
		console.log( "A P P   R E N D E R" )
		return (

			<BrowserRouter>

				<div>
		
					<Header 
						state = { this.state }
						onClick = { ( i ) => this.handleClick( i ) }

					/>

					<Route exact path = "/" component = { HomeStory } />
					<Route path = "/contact" component = { ContactStory } />
					<Route path = "/imprint" component = { ImprintStory } />
					<Route path = "/privacy" component = { PrivacyStory } />
					<Route path = "/showcase" component = { ShowcaseStory } />
//						
//					{ this.writeMainSection( currentLocation, targetLocation, showcaseId ) }

					<Footer 
						targetLocation = { targetLocation }
						onClick = { ( i ) => this.handleClick( i ) }
					/>

				</div>

			</BrowserRouter>

		)

	}

}

export default App

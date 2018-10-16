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
		
		console.log( "target ", target )
		const validLocations = [
			index,
			"/home",
			"/contact",
			"/imprint",
			"/privacy",
		]
		
		if ( validLocations.includes( target ) ) {
			console.log( "valid" )
			return target
		} else {
			console.log( "invalid = /" )
			console.log( window.location.href )
			console.log( window.history )
			window.location.href = index
			return index
		}


	}
    componentDidMount() {

		const backend = process.env.NODE_ENV === "production" ? 
			"http://localhost:3000" : 
			process.env.REACT_APP_BACKEND_URL

		console.log("backend url: ", backend)
		axios.get( backend )
		.then( res => {
			const showcases = res.data
//			console.log( "backend/showcases: ", showcases )
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
		window.scrollBy( { left: 0, top: window.innerHeight, behavior: "smooth" } )
		
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

		this.setState( {
			
			currentLocation: current,
			showcaseId: showcaseId,
			fadeOut: true

		} )

		const _this = this
		setTimeout( function() {
			_this.jumpTo( newCurrent, target )
		}, 100 )
		this.scrollToTop()


	}
	jumpTo( newCurrent, target ) {
		
		this.setState( {
			
			currentLocation: newCurrent,
			targetLocation: target,
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
					ref = { this.content }
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
		const logo = this.state.logo
		
		return (

			<BrowserRouter>

				<div>
		
					<Header 
						mainTitle = { this.state.mainTitle }
						imagePath = { this.state.imagePath }

						logo = { logo }
						onClick = { ( i ) => this.handleClick( i ) }
						targetLocation = { targetLocation }

					/>
					{ this.writeMainSection( currentLocation, targetLocation, showcaseId ) }
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

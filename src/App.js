import React from 'react'
//import ReactDOM from 'react-dom'
import axios from 'axios'

import Header from './partials/Header'
import Main from './partials/Main'
import Footer from './partials/Footer'



class App extends React.Component {

	constructor( props ) {
		
		super( props )
		
		this.content = React.createRef()
		
		this.state = {
			
			showcases: [],
			currentLocation: window.location.pathname,
			targetLocation: this.handleLocation( window.location.pathname ),
			scrolling: false,
			showcaseId: null,
			mainTitle: "SASCHA TASSILO HOECHSTETTER",
			logo: "assets/img/logo/hoechstetter.svg",
			hero: "assets/img/hero/quest-magazine-04.jpg",
			fadeOut: false
			
		}
	}
	
	handleLocation( url ) {
		
//		let currentLocation = this.state.currentLocation
		let target = url
		const home = "home"
//		
//		const validLocations = [
//			"contact",
//			"imprint",
//			"privacy",
//			"showroom"
//		all showcases ( showcases[ i ].folder )
//		]
//		
//		
//		if ( targetLocation )
		
//		check if window.location is valid
//		if yes, go there
//		in not, go go home
		
		if ( url !== home ) {
			target = home
		}
		return target
//		console.log( "targetLocation: ", targetLocation )
		
	}
    componentDidMount() {

		const backend = "http://localhost:8080/public/showcases"

		axios.get( backend )
		.then( res => {
			const showcases = res.data
			this.setState( { showcases } )
		})

		window.addEventListener( "scroll", this.handleScroll.bind(this));

	}
		
	handleImages( status ) {
//		console.log("handleImages: ", status)
		
	}
	scrollToTop() {
		window.scroll( { top: 0 } )
	}
	heroScroll() {
		window.scroll( { top: window.innerHeight, left: 0, behavior: "smooth" } )
	}
	handleScroll() {
		if ( this.state.fadeOut && window.pageYOffset === 0 ) {
			this.jumpTo()
		}
	}

	handleTransition( current, i, showcaseId ){

		console.log( "getY: ", window.pageYOffset )
		this.setState( {
			
			currentLocation: current,
			targetLocation: i,
			showcaseId: showcaseId,
			fadeOut: true

		} )
		if ( window.pageYOffset === 0 ) {
			this.jumpTo()
		} else {
			this.scrollToTop()
		}

	}
	jumpTo() {
		
		console.log( "JUMP!" )
		this.setState( {

			fadeOut: false

		} )

	}
	handleClick( i ) {

		console.log( "handleClick ", this.state.fadeOut )
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
	
	writeMainSection( targetLocation, showcaseId ) {

		if ( this.state.showcases.length >= 0 ) {

			return (

				<Main 
					targetLocation = { targetLocation }
					state = { this.state }
					showcaseId = { showcaseId }
					onClick = { ( i ) => this.handleClick( i ) }
					imageStatus = { ( status ) => this.handleImages( status ) }
					ref = { this.content }
				/>
	
			)

		} else {

			return (

				<Main 
					targetLocation = { targetLocation }
					state = { this.state }
					showcaseId = { showcaseId }
					onClick = { ( i ) => this.handleClick( i ) }
					imageStatus = { ( status ) => this.handleImages( status ) }
					ref = { this.content }
				/>

			)

		}
		
	}
	
	render() {
		
		// get target from user interaction
		// showcase target includes showcase id
//		const currentLocation = this.state.currentLocation
		const targetLocation = this.state.targetLocation
		const showcaseId = this.state.showcaseId
		
		return (
			
			<div>
				<Header 
					mainTitle = { this.state.mainTitle }
					logo = { this.state.logo }
					onClick = { ( i ) => this.handleClick( i ) }
					targetLocation = { targetLocation }
					
				/>
				{ this.writeMainSection( targetLocation, showcaseId ) }
				<Footer 
					targetLocation = { targetLocation }
					onClick = { ( i ) => this.handleClick( i ) }
				/>
			</div>
		)

	}

}

export default App;

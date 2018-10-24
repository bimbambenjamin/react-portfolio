import React from 'react'
import { Route, Switch } from 'react-router-dom'
import axios from 'axios'

import Header from './partials/Header'
import Footer from './partials/Footer'
import HomeRoute from './routes/HomeRoute'
import ShowcaseRoute from './routes/ShowcaseRoute'
import ContactRoute from './routes/ContactRoute'
import ImprintRoute from './routes/ImprintRoute'
import PrivacyRoute from './routes/PrivacyRoute'


class App extends React.Component {
	
	constructor( props ) {
		
		super( props )
		
		
		this.state = {
			
			showcases: [],
			backendConnected: false,
			imagePath: "https://benjamin-jager.com/projects/sacha-assets/img/",
			logo: "hoechstetter.svg",
			hero: "https://benjamin-jager.com/projects/sacha-assets/img/hero/The-future-is-now04.jpg",
			heroIsActive: false,
			mainTitle: "SASCHA TASSILO HOECHSTETTER",
			targetLocation: this.handleLocation( window.location.pathname ),
			validRoutes: [
				"/",
				"/showcase/:folderId",
				"/contact",
				"/imprint",
				"/privacy"
			],
			imageLoaded: false,
			imageErrored: false,
			scrollPosition: window.scrollY,
			scrollingDown: false
		
		}
		
		this.handleScroll = this.handleScroll.bind( this )
	
	}
	
	componentDidMount() {
		
		window.addEventListener( "scroll", this.handleScroll )
		
		if ( this.state.backendConnected === false ) {
			
			const backend = process.env.REACT_APP_BACKEND_URL || 8080
		
			axios.get( backend )
			.then( res => {
				const showcases = res.data
				this.setState( { 
					showcases,
					backendConnected: true
				} )
			})
			
		}
		
	}
	componentWillUnmount() {
		window.removeEventListener( "scroll", this.handleScroll );
	}
	
	handleScroll( e ) {
		
		let previousScrollPosition = this.state.scrollPosition
		const scrollPosition = window.scrollY
		const scrollingDown = previousScrollPosition < scrollPosition ? 
			true : false
		
		this.setState( { 
			scrollPosition: scrollPosition,
			scrollingDown: scrollingDown
		} )
	}

	heroScroll() {
		window.scroll( { left: 0, top: window.innerHeight, behavior: "smooth" } )
	}
	
	handleHero( heroIsActive ) {
		this.setState( {
			heroIsActive: heroIsActive
		} )
	}
	
	handleClick( i ) {

		if ( i === "/" || i === "heroClick" ) {
			if ( i === "heroClick" ) {
				this.heroScroll()
			}
		} else {
			if ( this.state.heroIsActive ) {
				this.handleHero( false )
			}
		}

	}
	
	// TODO: do i need this?
	handleLocation( pathname ) {

		let newPath
		
		if ( pathname === "/" ) {
			
			newPath = pathname

		} else {
			
			const splitPath = pathname.split( "/" )
//			console.log( "handling location -split: ", splitPath )

			if ( splitPath.length > 0 ) {
				if ( splitPath[ 0 ] === "" ) {
					splitPath.shift()
				}
				if ( splitPath[ 0 ] === "showcase" ) {
					newPath = splitPath[ 1 ]
				} else {
					newPath = splitPath[ 0 ]
				}
			}

		}

		return newPath
		
	}

	// TODO: do i need this?
	validateShowcase( target ) {

		if ( target === null ) {
			
			return false
			
		} else {
			
			const validShowcases = this.state.showcases.map( ( showcase ) => (
				showcase.folder
			) )
			return validShowcases.includes( target ) ? true : false
			
		}

	}

	// TODO: do i need this?
	goHome() {
		console.log( "go home" )
		this.setState( { targetLocation: "/" } )		
	}
	
	render() {
		
		const showcasesAvailable = this.state.showcases.length > 0 ? true : false

		const state = this.state
		
		const validRoutes = this.state.validRoutes
		const mainClass = "appear freedom-below"
		const onClick = ( i ) => this.handleClick( i )
		const imageStatus = ( status, i ) => this.handleImages( status, i )
		const heroIsActive = this.state.heroIsActive
		const activateHero = ( i ) => this.handleHero( i )

		console.log( "A P P   R E N D E R   ––– ", heroIsActive )

		return (

			<div>

				<Header 
					state = { state }
					onClick = { onClick }
					heroIsActive = { heroIsActive }
					headerId = "1"
				/>

				<Switch>
					<Route 
						exact 
						path = { validRoutes[ 0 ] } 
						render = { props => ( 
							<HomeRoute 
								{ ...props }
								state = { state } 
								mainClass = { mainClass }
								onClick = { onClick }
								imageStatus = { imageStatus }
								activateHero = { activateHero }
								showcasesAvailable = { showcasesAvailable }
							/>
						) }
					/>
					<Route 
						exact 
						path = { validRoutes[ 1 ] } 
						render = { props => ( 
							<ShowcaseRoute 
								{ ...props }
								state = { state } 
								mainClass = { mainClass }
								onClick = { onClick }
								imageStatus = { imageStatus }
								activateHero = { activateHero }
								goHome = { () => this.goHome() }
								showcasesAvailable = { showcasesAvailable }
								headerId = "2"
							/>
						) } 
					/>
					<Route 
						path = { validRoutes[ 2 ] }
						render = { props => ( 
							<ContactRoute 
								{ ...props }
								state = { state } 
								mainClass = { mainClass }
								activateHero = { activateHero }
							/> 
						) } 
					/>
					<Route 
						path = { validRoutes[ 3 ] }
						render = { props => ( 
							<ImprintRoute 
								{ ...props }
								state = { state } 
								mainClass = { mainClass }
								activateHero = { activateHero }
							/> 
						) } 
					/>
					<Route 
						path = { validRoutes[ 4 ] }
						render = { props => ( 
							<PrivacyRoute 
								{ ...props }
								state = { state } 
								mainClass = { mainClass }
								activateHero = { activateHero }
							/> 
						) } 
					/>
				</Switch>

				<Footer 
					state = { state }
					onClick = { onClick }
				/>

			</div>

		)

	}

}

export default App

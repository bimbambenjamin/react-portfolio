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

//import CheckSpeed from './handler/CheckSpeed'
import * as helpers from './handler/helpers'

const backend = process.env.REACT_APP_BACKEND_URL || 8080
const imagesPath = "/assets/img"



class App extends React.Component {
	
	constructor( props ) {
		
		super( props )
		
		this.state = {
			
			showcases: [],
			backendConnected: false,
			imagesPath: imagesPath,
			logo: helpers.getFullPath( imagesPath, "logo", "hoechstetter.svg" ),
			hero: helpers.getFullPath( imagesPath, "hero", "Kaltblut-09-large.jpg" ),
			heroIsActive: false,
			heroIsVisible: true,
			heroDidLoad: false,
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
		this.oneUp = this.heroStatus.bind( this )
	
	}
	
	componentDidMount() {
		
		window.addEventListener( "scroll", this.handleScroll )
		
//		console.log( "logo: ", CheckSpeed( this.state.logo ) )
//		console.log( "hero: ", CheckSpeed( this.state.hero ) )
		
		if ( this.state.backendConnected === false ) {
						
			console.log( backend )
		
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
		window.removeEventListener( "scroll", this.handleScroll )
	}
	
	handleScroll( e ) {
		
		let previousScrollPosition = this.state.scrollPosition
		const scrollPosition = window.scrollY
		const windowHeight = window.innerHeight

		const scrollingDown = previousScrollPosition < scrollPosition ? 
			true : false
		
		const heroIsVisible = scrollPosition < windowHeight ?
			true : false
		
		this.setState( { 
			scrollPosition: scrollPosition,
			scrollingDown: scrollingDown,
			heroIsVisible: heroIsVisible
		} )
	}

	heroScroll() {
		window.scroll( { left: 0, top: window.innerHeight, behavior: "smooth" } )
	}
	scrollToTop() {
		window.scroll( { left: 0, top: 0, behavior: "smooth" } )		
	}
	
	heroStatus( i ) {
		// TODO: place lo-res image first, then change it to hi-res
		if ( i > 0 ) {
			this.setState( {
				heroDidLoad: true,
//				hero: helpers.getFullPath( imagesPath, "hero", "Kaltblut-09.jpg" )
			} )	
		}	
	}
	handleHero( heroIsActive ) {
		this.setState( {
			heroIsActive: heroIsActive
		} )
	}
	
	handleClick( i ) {

		console.log( "--- CLICK --- ", i )
		if ( i === "/" || i === "heroClick" ) {
			if ( i === "/" ) {
				this.scrollToTop()
			}
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
		const onClick = ( i ) => this.handleClick( i )
		const heroIsActive = this.state.heroIsActive
		const activateHero = ( i ) => this.handleHero( i )
		const heroIsVisible = this.state.heroIsVisible
		const heroDidLoad = this.state.heroDidLoad
		const oneUp = this.oneUp

		const mainClass = "appear " +
			( heroDidLoad ? "freedom-below" : "" )

		const headerTag = (
				<Header 
					state = { state }
					onClick = { onClick }
					heroIsActive = { heroIsActive }
					headerId = "1"
				/>
		)
		
		const footerTag = (
				<Footer 
					state = { state }
					onClick = { onClick }
				/>
		)
		
		console.log( "devicePixelRatio", window.devicePixelRatio )
		

		return (

			<div>
			
				{ heroDidLoad ? headerTag : null }

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
								activateHero = { activateHero }
								heroIsVisible = { heroIsVisible }
								showcasesAvailable = { showcasesAvailable }
								heroDidLoad = { heroDidLoad }
								oneUp = { oneUp }
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

				{ heroDidLoad ? footerTag : null }

			</div>

		)

	}

}

export default App

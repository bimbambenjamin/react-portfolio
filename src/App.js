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
const showcasesPath = "/assets/showcases"



class App extends React.Component {
	
	constructor( props ) {
		
		super( props )
		
		this.state = {
			
			showcases: [],
			showcasesPath: showcasesPath,
			backendConnected: false,
			imagesPath: imagesPath,
			imageLoaded: false,
			imageErrored: false,
			logo: helpers.getFullPath( imagesPath, "logo", "hoechstetter.svg" ),
			hero: helpers.getFullPath( imagesPath, "hero", "Film-Noir-05.jpg" ),
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
			scrollPosition: window.scrollY,
			scrollingDown: false
		
		}
		
		this.handleScroll = this.handleScroll.bind( this )
		this.oneUp = this.heroStatus.bind( this )
	
	}
	
	componentDidMount() {
		
		this.handleViewHeight()
		
		window.addEventListener( "scroll", this.handleScroll )
		window.addEventListener( "resize", this.handleViewHeight )
		
		if ( this.state.backendConnected === false ) {
						
//			console.log( backend )
		
			axios.get( backend )
			.then( res => {
				const showcases = res.data
				this.setState( { 
					showcases,
					backendConnected: true
				} )
				
				this.validateTarget( this.state.targetLocation )
			})
			
		}
		
	}
	componentWillUnmount() {
		window.removeEventListener( "scroll", this.handleScroll )
		window.removeEventListener( "resize", this.handleViewHeight )
	}
	
	handleViewHeight() {
		
		const vh = window.innerHeight;
		document.documentElement.style.setProperty( "--vh", `${ vh }px` );
		
	}
	
	validateTarget( target ) {

		const home = this.state.validRoutes[ 0 ]
		const validRoutes = this.state.validRoutes.slice( 2 )
		
		const validFolders = this.state.showcases.map( ( showcase ) => (
			showcase.folder
		) )
		
		if ( validRoutes.includes( "/" + target ) || target === home || validFolders.includes( target )) {
			console.log( "valid!", target )
		} else {
			this.goTo( home )
		}

	}
	
	handleScroll( e ) {
		
		let previousScrollPosition = this.state.scrollPosition
		const scrollPosition = window.scrollY
		const windowHeight = window.innerHeight
		const heroViewHeight = windowHeight - 100

		const scrollingDown = previousScrollPosition < scrollPosition ? 
			true : false
		
		const heroIsVisible = scrollPosition < heroViewHeight ?
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
				if ( splitPath[ 0 ] === "showcase" && splitPath.length > 1 && splitPath[ 1 ] !== "" ) {
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

		if ( target !== null && this.state.backendConnected ) {
			
			const validShowcases = this.state.showcases.map( ( showcase ) => (
				showcase.folder
			) )

			return validShowcases.includes( target ) ? true : false
				
		} else {
			
			return false
			
		}

	}

	goTo( target ) {
		console.log( "go home", target )
		window.location.replace( target )
//		window.history.pushState( { target: target }, "target", target );
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

		const targetLocation = this.state.targetLocation
		
		
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
//		
//		console.log( "devicePixelRatio", window.devicePixelRatio )
//		console.log( "targetLocation", targetLocation )
		
		const home = targetLocation === "/" ? true : false
		

		return (

			<div>
			
				{ heroDidLoad || !home ? headerTag : null }

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

				{ heroDidLoad || !home ? footerTag : null }

			</div>

		)

	}

}

export default App

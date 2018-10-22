import React from 'react'
import { Route } from 'react-router-dom'
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
			imageErrored: false
		
		}
	
	}
	
	handleLoadedImage( bool ) {
//		this.setState( { imageLoaded: bool } )
	}

	handleFahrenheitChange( bool ) {
//		this.setState( { imageErrored: bool } )
	}
	
	componentDidMount( prevProps, prevState ) {
		
//		console.log( "MOUNTIE prevProps: ", prevProps )
//		console.log( "MOUNTIE prevState: ", prevState )

		console.log( "getBackendData" )
		
		if ( this.state.backendConnected === false ) {
			
			const backend = process.env.REACT_APP_BACKEND_URL || 8080
		
			// TODO: fake loader!
//			setTimeout( () => {
				axios.get( backend )
				.then( res => {
					console.log( "FAKER setState ", this.state )
					const showcases = res.data
					this.setState( { 
						showcases,
						backendConnected: true
					} )
				})
//			}, 1000 )
			
		}
		
	}
	handleLocation( pathname ) {
		
		// is valid showcase?
		const path = pathname.split( "/" )
		
		if ( path.length > 0 ) {
			if ( path[ 0 ] === "" ) {
				path.shift()
			}
			if ( path[ 0 ] === "showcase" ) {
				return path[ 1 ]
			} else {
				return path[ 0 ]
			}
		}
		
	}
	handleImages( status, i ) {
//		console.log( "handleImages: ", status, i )
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

		console.log( "---CLICK--- " )
		
		if ( i === "/" || i === "heroClick" ) {
//			console.log( "---home ", i )
			if ( i === "heroClick" ) {
				this.heroScroll()
			}
		} else {
//			console.log( "---homeless ", i )
			if ( this.state.heroIsActive ) {
				this.handleHero( false )
			}
			
			if ( !isNaN( i ) ) {
				const targetShowcase = this.state.showcases[ i ].folder
//				console.log( "targetShowcase: ", targetShowcase )
//				window.location.href = targetShowcase
				this.setState( {
					targetLocation: targetShowcase
				} )
			}
			
			
		}
		

	}

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
	
	render() {
		
//		console.log( "showcases.length: ", this.state.showcases.length )
		if ( this.state.showcases.length > 0 ) {
			
//			console.log( "YESSS ", this )

			const state = this.state
			
//			console.log( "loading target: ", this.state.targetLocation )
			const targetLocation = state.targetLocation
			const validShowcase = this.validateShowcase( targetLocation )
//			console.log( "validShowcase: ", validShowcase )
			
			const validRoutes = this.state.validRoutes
			
			if ( !validRoutes.includes( targetLocation ) || !validShowcase ) {
//				console.log( "go home" )
//				const newTargetLocation = "/"
//				window.location.href = newTargetLocation
//				this.setState( { targetLocation: newTargetLocation } )
				
			}
			
			
			const mainClass = "appear freedom-below"
			const onClick = ( i ) => this.handleClick( i )
			const imageStatus = ( status, i ) => this.handleImages( status, i )
			const heroIsActive = this.state.heroIsActive
			const activateHero = ( i ) => this.handleHero( i )
			console.log( "validRoutes[ 1 ] ", validRoutes[ 1 ] )
//			const handleLoadedImage = ( bool ) => this.handleLoadedImage( bool )
//			const handleErroredImage = ( bool ) => this.handleErroredImage( bool )

			console.log( "A P P   R E N D E R   ––– ", heroIsActive )

			return (

				<div>

					<Header 
						state = { state }
						onClick = { onClick }
						heroIsActive = { heroIsActive }
					/>

					<Route 
						exact 
						path = { validRoutes[ 0 ] } 
						component = { ( props ) => ( 
							<HomeRoute 
								state = { state } 
								props = { props } 
								mainClass = { mainClass }
								onClick = { onClick }
								imageStatus = { imageStatus }
								activateHero = { activateHero }
							/>
						) }
					/>
					<Route 
						exact 
						path = { validRoutes[ 1 ] } 
						component = { ( props ) => ( 
							<ShowcaseRoute 
								state = { state } 
								props = { props } 
								mainClass = { mainClass }
								onClick = { onClick }
								imageStatus = { imageStatus }
								activateHero = { activateHero }
								
							/> 
						) } 
					/>
					<Route 
						path = { validRoutes[ 2 ] }
						component = { ( props ) => ( 
							<ContactRoute 
								state = { state } 
								props = { props } 
								mainClass = { mainClass }
								activateHero = { activateHero }
							/> 
						) } 
					/>
					<Route 
						path = { validRoutes[ 3 ] }
						component = { ( props ) => ( 
							<ImprintRoute 
								state = { state } 
								props = { props } 
								mainClass = { mainClass }
								activateHero = { activateHero }
							/> 
						) } 
					/>
					<Route 
						path = { validRoutes[ 4 ] }
						component = { ( props ) => ( 
							<PrivacyRoute 
								state = { state } 
								props = { props } 
								mainClass = { mainClass }
								activateHero = { activateHero }
							/> 
						) } 
					/>

					<Footer 
						state = { state }
						onClick = { onClick }
					/>

				</div>

			)

		} else {

			console.log( "no showcases yet" )
			const state = this.state
			const onClick = ( i ) => this.handleClick( i )
			const heroIsActive = this.state.heroIsActive

			return (
				
				<div>

					<Header 
						state = { state }
						onClick = { onClick }
						heroIsActive = { heroIsActive }
					/>
					<main>
						<h1 
							className = "waiting uppercase"
						>
							loading showcase
						</h1>
					</main>
					<Footer 
						state = { state }
						onClick = { onClick }
					/>
				</div>
			)

		}

	}

}

export default App

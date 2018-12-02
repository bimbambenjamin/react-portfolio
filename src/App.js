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

// for scroll fn
const TIMINGFUNC_MAP = {
	"linear": t => t,
	"ease-in": t => t * t,
	"ease-out": t => t * ( 2 - t ),
	"ease-in-out": t => ( t < .5 ? 2 * t * t : -1 + ( 4 - 2 * t ) * t )
}


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
            preloader: helpers.getFullPath( imagesPath, "tools", "tail-spin.svg" ),
			logo: helpers.getFullPath( imagesPath, "logo", "hoechstetter-2.png" ),
			hero: helpers.getFullPath( imagesPath, "hero", "video_12112018_1-noBlack.mp4" ),
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
			windowHeight: window.innerheight,
			scrollPosition: window.scrollY,
			scrollingDown: false,
			logoIndex: 0,
			divStyle: "logo-angled"
//			divStyle: { 
//                transform: `rotate( -${ this.getAlpha() }deg )`
//            }
		
		}
		
		this.handleScroll = this.handleScroll.bind( this )
		this.oneUp = this.heroStatus.bind( this )
		this.getViewHeight = this.handleViewHeight.bind( this )
//		this.logoChange = this.logoChange.bind( this )
	
	}
	
    getAlpha() {
        
        const a = window.innerHeight
        const b = window.innerWidth
        const c = Math.sqrt( ( a * a ) + ( b * b ) )        
        const sinAlpha = a / c
        const alpha = Math.asin( sinAlpha ) 
        return Math.floor( alpha * -180 / Math.PI )
    }
    setAngleCss( angle ) {
		document.documentElement.style.setProperty( "--logo-angle", `${ angle }deg` );
    }
	logoChange() {
//		let i = this.state.logoIndex + 1
//		if ( i >= 5 ) {
//			i = 0
//		}
//		const newLogo = helpers.getFullPath( imagesPath, "logo", "hoechstetter-" + i + ".png" )
		
//		const deg = Math.floor( ( Math.random() * -70) + 1 );
        const angle = this.getAlpha()
//		const divStyle = {
//			transform: `rotate( -${ angle }deg )`
//		}
        this.setAngleCss( angle )
//		document.documentElement.style.setProperty( "--logo-angle", `${ angle }deg` );
		
//		this.setState( {
//			logoIndex: i,
//			logo: newLogo,
//			divStyle: divStyle
//		} )
	}
	
	componentDidMount() {
        
        //      26th nov 2018
        ( function() {
            var trial = document.createElement( 'script' );
            trial.type = 'text/javascript';
            trial.async = true;
            trial.src = 'https://easy.myfonts.net/v2/js?sid=210856(font-family=Avenir+Next+Pro+Demi)&sid=210860(font-family=Avenir+Next+Pro+Bold)&sid=217165(font-family=Avenir+Next+Pro+Regular)&sid=255224(font-family=Avenir+Next+Pro+Thin)&key=ursUm90UoD';
            var head = document.getElementsByTagName( "head" )[ 0 ];
            head.appendChild( trial );
        })();

        this.getViewHeight()
		
		window.addEventListener( "scroll", this.handleScroll )
		window.addEventListener( "resize", this.getViewHeight )
		
		if ( this.state.backendConnected === false ) {
						
			console.log( "backend", backend )
		
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
		window.removeEventListener( "resize", this.getViewHeight )
	}
	
	handleViewHeight() {
		
		const vh = window.innerHeight;
		document.documentElement.style.setProperty( "--vh", `${ vh }px` );

		const storedHeight = this.state.windowHeight ? this.state.windowHeight : vh
        
        this.logoChange()
		
		if ( vh !== storedHeight ) {
			this.setState( {
				windowHeight: vh
			})
		}
		
	}
	
	validateTarget( target ) {

		const home = this.state.validRoutes[ 0 ]
		const validRoutes = this.state.validRoutes.slice( 2 )
		
		const validFolders = this.state.showcases.map( ( showcase ) => (
			showcase.folder
		) )
		
		if ( validRoutes.includes( "/" + target ) || target === home || validFolders.includes( target )) {
//			console.log( "valid!", target )
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
//		const body = document.getElementsByTagName( "body" )
//		if ( body ) {
//			body.animate( { scrollTop: window.innerHeight }, "slow" );
//		} else {
//			window.scroll( { left: 0, top: window.innerHeight, behavior: "smooth" } )
//		}
	
//		this.scrollTopSmooth( window.innerHeight, 700, "ease-in" ); 
	
		const storedHeight = this.state.windowHeight ? this.state.windowHeight : window.innerHeight
		this.scrollYSmooth( { from: window.scrollY, to: storedHeight, duration: 700, behavior: "ease-in-out" } ); 
	}
	
	
	getBrowser() {
		return navigator ? navigator.userAgent : "other";
	}



	scrollYSmooth( { from, to, duration, behavior } ) {
		
		/*
		 * Scroll from initY to 0
		 * @param { number } initY - initial scroll Y
		 * @param { number } duration - transition duration
		 * @param { string } timingName - timing function name. Can be one of linear, ease-in, ease-out, ease-in-out
		 */

		
		
		const timingFunc = TIMINGFUNC_MAP[ behavior ]
		let start = null

		const step = ( timestamp ) => {
			
			start = start || timestamp
			const progress = timestamp - start
			// Growing from 0 to 1
			const time = Math.min( 1, ( ( timestamp - start ) / duration ) )
			const distance = Math.abs( from - to )
			const target = timingFunc( time ) * distance
			const movement = from > to ? from - target : from + target

			window.scrollTo( 0, movement )

			if ( progress < duration ) {
				window.requestAnimationFrame( step )
			}
		}

		window.requestAnimationFrame( step )

	}

	scrollToTop() {
		const storedHeight = this.state.windowHeight ? this.state.windowHeight : window.innerHeight
		this.scrollYSmooth( { from: storedHeight, to: 0, duration: 700, behavior: "ease-in-out" } ); 
//		window.scroll( { left: 0, top: 0, behavior: "smooth" } )		
	}
	
	heroStatus() {
		// TODO: place lo-res image first, then change it to hi-res
//		if ( i > 0 ) {
			this.setState( {
				heroDidLoad: true,
//				hero: helpers.getFullPath( imagesPath, "hero", "Kaltblut-09.jpg" )
			} )	
//		}	
	}
	handleHero( heroIsActive ) {
		this.setState( {
			heroIsActive: heroIsActive
		} )
	}
	
	handleClick( i ) {

		if ( i === "/" || i === "heroClick" ) {
			if ( i === "/" ) {
				this.scrollToTop()
			}
			if ( i === "heroClick" ) {
//				this.logoChange()
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

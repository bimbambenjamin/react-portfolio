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


//
//const backend = process.env.REACT_APP_BACKEND_URL
//const backendPath = "https://storage.googleapis.com/buck-the-bucket/assets"
const backendPath = process.env.REACT_APP_BACKEND_URL

//const PUBLIC_JSON = "https://00e9e64bac9dcbeb01d692fdd9889917fefbe0670dece00791-apidata.googleusercontent.com/download/storage/v1/b/buck-the-bucket/o/assets%2Fpublic.json?qk=AD5uMEv9w0pEm6GJf_JmmA0HTVxPUmH9-Qu7RsG31i9Vv09kvlK0b7kKnG0meROynqTz7aclU8opiVfqahHjg0oEZjFLwW5hccn_UQ8HnXwoy7Nd3N3Y9juz4IPlgBur3CA2kcsz0SVh_pHulvH8MtW3I0gAIiKzGH5A44b6CXZawMO8XOltpMWF7dVoBwPR39agWQWheygL6dzQqAaYH91OW_mBiPyAY4gG8-W41DZIwIupugv4joOFaSLd-HgEZBVNqDbCluP7FQ9E6ZEKnvq6gwbCNg_xU_75_ILWG1N9owLQzD0rMsNPXSFPHXpO8glWEZZJaxJsTIQSlJtPM0wOb7zlZvuRmnaMTwEfKXe_OwTjUEg7am3C8Gfl0JACLcKMcSfS960LrsQh7nQlCsfaDOLLElKi4YUOCpho-g47mICE3xVqv3pLFmT53S4Sxni5rEsO9fBQMrtSQDWFMJA_M24XF6d3N0hFK9xrmtgDiVngsyx6MZxLiXuMITHs5RFz_T4MpL4iufFscGk3ttzsCm8ixFefSIpE26bKzqISz37YeL1nv4eO2p0MsgcKxD9K-YcFcIobU5mYBLX_keUJcMera_jWFLgL584Sn-MVqhfhTN564QeczcgQ1M0TeaZidApTWeII26H2legv3RI7h9Tm-Hkj5hSjbn7Bdg0lTz2z-DWTA2rcWJ7aBIkzhDVcXc2XmgpVxi2r6X5i1SZ3-8W7uSkyBzvbpHItF5thir-cGJEkW3ejLaLqRFf70mhUYmRUh791Hw2Fhd9jpetW_2CQw-i27Q"
const PUBLIC_JSON = backendPath + "/public.json"

const backend = PUBLIC_JSON || 8080
const showcasesPath = backendPath + "/showcases"

//const backendPath = "/assets"
//const backend = "http://localhost:8080/public/showcases" || 8080
//const showcasesPath = backendPath + "/showcases"

const imagesPath =  "/assets/img"


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
			
            // backend files
			showcases: [],
            heroElements: [],
//			hero: helpers.getFullPath( imagesPath, "hero", "video_12112018_1-noBlack.mp4" ),
            
    		backendConnected: false,
			backendPath: backendPath,
			showcasesPath: showcasesPath,
            
            imagesPath: imagesPath,

            imageLoaded: false,
			imageErrored: false,            
            
            // server files
            preloader: helpers.getFullPath( imagesPath, "tools", "tail-spin.svg" ),
			logo: helpers.getFullPath( imagesPath, "logo", "hoechstetter-2.png" ),
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
        this.onClick = this.handleClick.bind( this )
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
        
        // valid: 26th nov 2018 + 30 days
//        ( function() {
//            var trial = document.createElement( 'script' );
//            trial.type = 'text/javascript';
//            trial.async = true;
//            trial.src = 'https://easy.myfonts.net/v2/js?sid=210856(font-family=Avenir+Next+Pro+Demi)&sid=210860(font-family=Avenir+Next+Pro+Bold)&sid=217165(font-family=Avenir+Next+Pro+Regular)&sid=255224(font-family=Avenir+Next+Pro+Thin)&key=ursUm90UoD';
//            var head = document.getElementsByTagName( "head" )[ 0 ];
//            head.appendChild( trial );
//        })();

        this.getViewHeight()
		
		window.addEventListener( "scroll", this.handleScroll )
		window.addEventListener( "resize", this.getViewHeight )
		
		if ( this.state.backendConnected === false ) {
            
			axios
                .get( backend )
                .then( res => {
                    const assets = res.data
                    this.setState( {
                        showcases: assets.showcases,
                        heroElements: assets.heroElements,
                        backendConnected: true
                    } )
                    this.validateTarget( this.state.targetLocation )
                } )
                        
			console.log( "backend", backend )
			
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

        console.log( "CLICK", i )
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
        
		console.log( "showcases", this.state.showcases )
		console.log( "heroElements", this.state.heroElements )
        console.log( "logo", this.state.logo )
		
		const showcasesAvailable = this.state.showcases.length > 0 ? true : false

		const state = this.state
			  
		const validRoutes = this.state.validRoutes
		const heroIsActive = this.state.heroIsActive
		const activateHero = ( i ) => this.handleHero( i )
		const heroIsVisible = this.state.heroIsVisible
		const heroDidLoad = this.state.heroDidLoad
		const oneUp = this.oneUp
		const onClick = this.onClick

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

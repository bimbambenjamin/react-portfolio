import React from 'react'
import { Route, matchPath } from 'react-router-dom'
import axios from 'axios'

import Header from './partials/Header'
import Footer from './partials/Footer'

import Hero from './partials/Hero'
import Gallery from './partials/Gallery'
import Social from './partials/Social'
import Showcase from './partials/Showcase'
import Contact from './partials/Contact'
import Imprint from './partials/Imprint'
import Privacy from './partials/Privacy'



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
			heroIsActive: false,
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
			"/showcase"
		]
		
		if ( validLocations.includes( target ) ) {
			return target
		} else {
			console.log("replaced")
//			window.location.replace( index )
			return index
		}
		
	}
    componentDidMount( prevProps, prevState ) {
		
		console.log( "MOUNTIE prevProps: ", prevProps )
		console.log( "MOUNTIE prevState: ", prevState )
		console.log( "MOUNTIE this: ", this )
//		const { pathname } = this.props.location
//		const { pathname: prevPathname } = prevProps.location
//		
//		const currentParams = GetParams( pathname )
//		const prevParams = GetParams( prevPathname )
//		
//		if ( currentParams.folderId && 
//			currentParams.folderId !== prevParams.folderId ) {
//			
//			this.setState( {
//				loading: true
//			} )
//			// mock loading process
//			setTimeout( () => {
//				this.setState( {
//					loading: false
//				} )
//			}, 1000 )
//
//		}
		
		const backend = process.env.REACT_APP_BACKEND_URL || 8080 

		axios.get( backend )
		.then( res => {
			const showcases = res.data
			this.setState( { showcases } )
		})

		window.addEventListener( "scroll", this.handleScroll.bind(this));

	}
	
//	componentWillUnmount() {
//		clearTimeout( this.timeout )
//	}
	
	
	
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
	handleHero( heroIsActive ) {
		console.log( "H E R O :  ", heroIsActive )
		
		this.setState( {
			heroIsActive: heroIsActive
		} )
	}

	handleClick( i ) {

		console.log( "handleClick i: ", i )

		let current = this.state.currentLocation
		const showcaseId = !isNaN( i ) ? i : null
		const samo = i === current ? true : false
		
		if ( i === "/" || i === "heroClick" ) {
			console.log( "--- CLICK --- ", i )
			console.log( "--- HERO ---" )
		} else {
			this.handleHero( false )
			this.scrollToTop()
		}
		
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

//		let newCurrent = target
//		
//		if ( this.state.showcases[current] ) {
//			console.log( "FADE THIS FUCKER OUT PLEASE", current )
//		}

//		console.log( "RE-RENDER handleTransition", current, target )

//		this.setState( {
//			
//			currentLocation: current,
//			targetLocation: target,
//			showcaseId: showcaseId,
//			fadeOut: true
//
//		} )

//		const _this = this
//		setTimeout( function() {
//			console.log( "--- time ---" )
//			_this.jumpTo( newCurrent, target )
//		}, 1000 )


	}
	jumpTo( newCurrent, target ) {
		
		console.log( "RE-RENDER jumpTo ", newCurrent, target )
		this.setState( {
			
			currentLocation: newCurrent,
			fadeOut: false

		} )

	}
	
	render() {
		
//		const targetLocation = this.state.targetLocation
//		const showcaseId = this.state.showcaseId
		
		const state = this.state
		const mainClass = "appear freedom-below"
		const onClick = ( i ) => this.handleClick( i )
		const imageStatus = ( status ) => this.handleImages( status )
		const heroIsActive = this.state.heroIsActive
		const activateHero = ( i ) => this.handleHero( i )

		console.log( "A P P   R E N D E R   ––– ", heroIsActive )
		
		return (

			<div>
			
				<Header 
					state = { state }
					onClick = { onClick }
					heroIsActive = { heroIsActive }
				/>

				<Route 
					exact path = "/" 
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
					path = "/showcase/:folderId" 
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
					path = "/contact" 
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
					path = "/imprint" 
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
					path = "/privacy" 
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

	}

}

class HomeRoute extends React.Component {
	
	render() {

		const state = this.props.state
		const onClick = ( i ) => this.props.onClick( i )
		const activateHero = ( i ) => this.props.activateHero( i )
		console.log( "rendering HOME ", state.heroIsActive )
		
		return(

			<main className = { this.props.mainClass }>

				<Hero 
					state = { state }
					onClick = { onClick }
					activateHero = { activateHero }
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
class ShowcaseRoute extends React.Component {
	
	render() {

		const state = this.props.state

		console.log( "ShowcaseRoute THIS: ", this )

		const showcases = state.showcases
		const imageStatus = ( status ) => this.props.imageStatus( status )
		const onClick = ( i ) => this.props.onClick( i )
		const heroIsActive = state.heroIsActive
		console.log( "rendering SHOWCASE ", heroIsActive )
		const onLoad = heroIsActive ? 
			() => this.props.activateHero( false ) : 
			null
		
		const match = this.props.props.match
		console.log( "ShowcaseRoute MATCH: ", match )
		const folderId = match.params.folderId
		const validFolders = showcases.map( ( showcase ) => (
			showcase.folder
		) )
		
		if ( validFolders.includes( folderId ) ) {
			const showcaseId = validFolders.indexOf( folderId )
			
			console.log( "valid Showcase folder: ", folderId )
			console.log( "valid Showcase index: ", showcaseId )

			return(

				<main 
					className = { this.props.mainClass }
					onLoad = { onLoad }
				>
				
					<Showcase
						state = { state }
						showcaseId = { showcaseId }
						imageStatus = { imageStatus }
					/>
					<Header
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

		} else {
			
			console.log( "invalid Showcase: ", folderId )
			window.location.href = "/"

		}

	}
	
}

class ContactRoute extends React.Component {

	render() {
		
		const heroIsActive = this.props.state.heroIsActive
		const onLoad = heroIsActive ? 
			() => this.props.activateHero( false ) : 
			null

		return(

			<main 
				className = { this.props.mainClass }
				onLoad = { onLoad }
			>
				<Contact />
			</main>

		)

	}
	
}

class ImprintRoute extends React.Component {

	render() {
		
		const heroIsActive = this.props.state.heroIsActive
		console.log( "rendering IMPRINT ", this.props.mainClass )
		const onLoad = heroIsActive ? 
			() => this.props.activateHero( false ) : 
			null

		console.log( "ImprintRoute props: ", this )
	
		return(

			<main 
				className = { this.props.mainClass }
				onLoad = { onLoad }
			>
				<Imprint />
			</main>

		)

	}
	
}
class PrivacyRoute extends React.Component {

	render() {
		
		const heroIsActive = this.props.state.heroIsActive
		console.log( "rendering PRIVACY ", heroIsActive )
		const onLoad = heroIsActive ? 
			() => this.props.activateHero( false ) : 
			null

		console.log( "PrivacyRoute props: ", this )
	
		return(

			<main 
				className = { this.props.mainClass }
				onLoad = { onLoad }
			>
				<Privacy />
			</main>

		)

	}

}

export default App

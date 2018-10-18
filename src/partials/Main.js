import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Hero from './Hero'
import Header from './Header'
import Gallery from './Gallery'
import Showcase from './Showcase'
import Social from './Social'
import Contact from './Contact'
import Imprint from './Imprint'
import Privacy from './Privacy'



class HomeStory extends React.Component {
	
	render() {
		
		console.log( "HomeStory" )
	
		const state = this.props.state
		const mainClass = this.props.mainClass
		const onClick = ( i ) => this.props.onClick( i )
		
		return(
			
			<main className = { mainClass }>
			
				<Hero 
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
		
	}
	
}
//const ShowcaseStory = ( { props } ) => (
//	
//	<div>
//		{ props.match.params }
//	</div>
//
//)
class ShowcaseStory extends React.Component {
		
	render() {
		
		console.log( "ShowcaseStory" )

		const match = this.props.props.match
		console.log( "MATCH: ", match )
		const matching = match.params.showcaseId
		console.log( "MATCHING: ", matching )
		const history = this.props.props.history
		console.log( "history: ", history )
		const location = this.props.props.history.location
		console.log( "location: ", location )
				
		const state = this.props.state
		const mainClass = this.props.mainClass
		const onClick = ( i ) => this.props.onClick( i )
		
		const imageStatus = ( status ) => this.props.imageStatus( status )

		return(
			
			<main className = { mainClass }>
			
				<Showcase 
					state = { state }
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
		
	}
	
}

class ContactStory extends React.Component {
	
	render() {

		console.log( "ContactStory" )

		const mainClass = this.props.mainClass

		return (
			<main className = { mainClass }>
				<Contact />
			</main>
		)

	}	

}
class ImprintStory extends React.Component {
	
	render() {

		console.log( "ImprintStory" )

		const mainClass = this.props.mainClass

		return (			
			<main className = { mainClass }>
				<Imprint />
			</main>
		)

	}	

}
class PrivacyStory extends React.Component {
	
	render() {

		console.log( "PrivacyStory" )

		const mainClass = this.props.mainClass
		
		return (			
			<main className = { mainClass }>
				<Privacy />
			</main>
		)

	}	

}

class Main extends React.Component {

	componentDidMount() {
		console.log("MAIN MOUNTED ", this.props.state.targetLocation )
	}
	
	handleRoutes( state ) {
		
		let target = !isNaN( state.targetLocation ) ? 
			"/showcase" : 
			state.targetLocation

		let mainClass = "appear"
		console.log( "handle target: ", target )
		console.log( "handle this: ", this )
				
		const current = state.currentLocation
		console.log( "handle current: ", current )
		const imageStatus = ( status ) => this.props.imageStatus( status )
		const onClick = ( i ) => this.props.onClick( i )
		const targetURL = target === "/showcase" ? 
			target + "/" + 
			state.showcases[ state.targetLocation ].folder :
			target

		console.log( "targetURL: ", targetURL )
		console.log( "target: ", target )

		if ( state.fadeOut ) {
			console.log( "fadeOut: ", state.fadeOut, current )
			target = current
			mainClass = "hide"
		}		
		
//		switch( target ) {
//			
//			case "/":
			return (
			<BrowserRouter>
				<Route
					name = "home"
					exact = { true }
					path = "/" 
					component = { ( props ) => ( 
						<HomeStory 
							state = { state } 
							props = { props } 
							mainClass = { mainClass }
							onClick = { onClick }
						/> 
					) }
				/>
//			)
//			case "/showcase" :
//			return (
				
				<Route
					name = "showcase"
					path = "/showcase/:showcaseId?" 
					component = { ( props ) => ( 
						<ShowcaseStory 
							state = { state } 
							props = { props } 
							mainClass = { mainClass }
							onClick = { onClick }
							imageStatus = { imageStatus }
						/> 
					) }
				/>

//			)
//			case "/contact":
//			return (
				<Route
					name = "contact"
					exact = { true }
					path = "/contact" 
					component = { ( props ) => ( 
						<ContactStory 
							mainClass = { mainClass }
						/> 
					) }
				/>
//			)
//			case "/imprint":
//			return (
				<Route
					name = "imprint"
					exact = { true }
					path = "/imprint" 
					render = { ( { match } ) => (
						<ImprintStory 
							mainClass = { mainClass }
						/> 
					) }
				/>
//			)
//			case "/privacy":
//			return (
				<Route
					name = "privacy"
					exact = { true }
					path = "/privacy" 
					component = { ( props ) => ( 
						<PrivacyStory 
							mainClass = { mainClass }
						/> 
					) }
				/>
//			)
//			default :
//			return (
				<Route
					name = "home"
					exact = { true }
					path = "/" 
					component = { ( props ) => ( 
						<HomeStory 
							state = { state } 
							props = { props } 
							mainClass = { mainClass }
							onClick = { onClick }
						/> 
					) }
				/>
			</BrowserRouter>
			)
			
//		}
		
	}

	render() {

		const state = this.props.state

		return this.handleRoutes( state )

	}
}

export default Main

import React from 'react'
import Showcase from '../partials/Showcase'
import Header from '../partials/Header'
import Gallery from '../partials/Gallery'
import Social from '../partials/Social'



class ShowcaseRoute extends React.Component {
	
	render() {
		
		const state = this.props.state

		const showcases = state.showcases
		const imageStatus = ( status, i ) => this.props.imageStatus( status, i )
		const onClick = ( i ) => this.props.onClick( i )
		const heroIsActive = state.heroIsActive

		const onLoad = heroIsActive ? 
			() => this.props.activateHero( false ) : 
			null
		
		const clickedTarget = state.targetLocation
		console.log( "ShowcaseRoute CLICK: ", clickedTarget )
		
		const match = this.props.props.match
		const folderId = match.params.folderId
		console.log( "ShowcaseRoute folderId: ", folderId )
		
		const target = folderId === clickedTarget ? folderId : clickedTarget
		console.log( "ShowcaseRoute target: ", target )

		const validFolders = showcases.map( ( showcase ) => (
			showcase.folder
		) )
		
		if ( validFolders.includes( target ) ) {
			const showcaseId = validFolders.indexOf( target )
			
			console.log( "valid Showcase folder: ", target )
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
						mountImages = { ( images ) => this.props.mountImages ( images ) }
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
//			window.location.href = "/"

		}

	}
	
}

export default ShowcaseRoute

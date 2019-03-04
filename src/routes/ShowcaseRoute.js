import React from 'react'
import Showcase from '../partials/Showcase'
import Header from '../partials/Header'
import Gallery from '../partials/Gallery'
import Social from '../partials/Social'



class ShowcaseRoute extends React.Component {
	
	render() {
		
		const state = this.props.state
		const showcases = state.showcases

		const onClick = this.props.onClick

		const showcasesAvailable = this.props.showcasesAvailable
		const heroIsActive = state.heroIsActive
		
		const onLoad = heroIsActive ? 
			() => this.props.activateHero( false ) : 
			null
		
		const match = this.props.match
		const folderId = match.params.folderId

		const validFolders = showcases.map( ( showcase ) => (
			showcase.folder
		) )
		
		const showcaseId = validFolders.includes( folderId ) ? 
			validFolders.indexOf( folderId ) :
			null

		const showcaseTag = (
			<Showcase
				key = { showcaseId }
				state = { state }
				showcaseId = { showcaseId }
				mountImages = { ( images ) => this.props.mountImages ( images ) }
			/>
		)
		const headerTag = (
			<Header
				state = { state }
				onClick = { onClick }
				headerId = { this.props.headerId }
			/>
		)
		const sectionTag = (
			
			<section className = "flexbox column header-space freedom-below">

				{ showcasesAvailable ? (
					<Gallery state = { state }/>
				) : (
					<div className = "message uppercase appear-delayed">
						<h1>
							getting showcases
						</h1>
					</div>
				) }

				<Social />

			</section>
		)

		return (

			<main 
				className = { this.props.mainClass }
				onLoad = { onLoad }
			>
			
				{ showcaseId ? showcaseTag : null }
				{ headerTag }
				{ sectionTag }
				
			</main>

		)

	}
	
}

export default ShowcaseRoute

import React from 'react'
import Showcase from '../partials/Showcase'
import Header from '../partials/Header'
import Gallery from '../partials/Gallery'
import Social from '../partials/Social'



class AdminRoute extends React.Component {
	
	render() {
		
		const state = this.props.state

		const showcases = state.showcases
		const showcasesAvailable = this.props.showcasesAvailable

		const onClick = ( i ) => this.props.onClick( i )
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


		return(

			<main 
				className = { this.props.mainClass }
				onLoad = { onLoad }
			>
			
				{ showcaseId !== null ? (
					<Showcase
						key = { showcaseId }
						state = { state }
						showcaseId = { showcaseId }
						mountImages = { ( images ) => this.props.mountImages ( images ) }
					/>
				) : ( null ) }
				
				<Header
					state = { state }
					onClick = { onClick }
					headerId = { this.props.headerId }
				/>
				
				<section className = "flexbox column header-space">

				{ showcasesAvailable ? (
					<Gallery
						state = { state }
						onClick = { onClick }
					/>
				) : (
					<div className = "message uppercase">
						<h1>
							getting showcases
						</h1>
					</div>
				) }

				<Social />

				</section>

			</main>

		)

	}
	
}

export default AdminRoute
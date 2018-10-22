import React from 'react'
import Imprint from '../partials/Imprint'



class ImprintRoute extends React.Component {

	render() {
		
		const heroIsActive = this.props.state.heroIsActive
		console.log( "rendering Imprint ", heroIsActive )
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

export default ImprintRoute

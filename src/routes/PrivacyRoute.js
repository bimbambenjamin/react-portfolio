import React from 'react'
import Privacy from '../partials/Privacy'



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

export default PrivacyRoute

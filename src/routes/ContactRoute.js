import React from 'react'
import Contact from '../partials/Contact'



class ContactRoute extends React.Component {

	render() {
		
		console.log( "contactRoute" )

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

export default ContactRoute

import React from 'react'
import Contact from '../partials/Contact'



class ContactRoute extends React.Component {

	componentDidMount() {
		this.deactivateHero()
	}
	
	deactivateHero = () => this.props.activateHero( false )

	render() {

		return(

			<main className = { this.props.mainClass }>
				<Contact />
			</main>

		)

	}
	
}

export default ContactRoute

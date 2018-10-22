import React from 'react'
import Hero from '../partials/Hero'
import Gallery from '../partials/Gallery'
import Social from '../partials/Social'



class HomeRoute extends React.Component {
	
	render() {

		console.log( "HomeRoute" )

		const state = this.props.state
		const onClick = ( i ) => this.props.onClick( i )
		const activateHero = ( i ) => this.props.activateHero( i )
		
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

export default HomeRoute

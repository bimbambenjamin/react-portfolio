import React from 'react'
import Hero from '../partials/Hero'
import Gallery from '../partials/Gallery'
import Social from '../partials/Social'



class HomeRoute extends React.Component {
	
	render() {

		const showcasesAvailable = this.props.showcasesAvailable
		const state = this.props.state
		const onClick = ( i ) => this.props.onClick( i )
		const activateHero = ( i ) => this.props.activateHero( i )
		const heroIsVisible = this.props.heroIsVisible

		return(

			<main className = { this.props.mainClass }>

				<Hero 
					state = { state }
					onClick = { onClick }
					activateHero = { activateHero }
					heroIsVisible = { heroIsVisible }
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
							error loading showcases
						</h1>
					</div>
				) }

				<Social />

				</section>

			</main>

		)
		
	}

}

export default HomeRoute

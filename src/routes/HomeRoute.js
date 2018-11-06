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
		const heroDidLoad = this.props.heroDidLoad
		const heroIsVisible = this.props.heroIsVisible
		const oneUp = this.props.oneUp
		
		const heroTag = (
			
			<Hero 
				state = { state }
				onClick = { onClick }
				activateHero = { activateHero }
				heroIsVisible = { heroIsVisible }
				heroDidLoad = { heroDidLoad }
				oneUp = { oneUp }
			/>
			
		)
		
		const sectionTag = (
			
			<section className = "flexbox column header-space freedom-below">

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
		
		)

		return(

			<main className = { this.props.mainClass }>

				{ heroTag }
				{ heroDidLoad ? sectionTag : null }

			</main>

		)
		
	}

}

export default HomeRoute

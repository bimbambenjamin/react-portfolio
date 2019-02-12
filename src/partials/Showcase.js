import React from 'react'

// import HandleElements from '../handler/HandleElements'



class Showcase extends React.Component {

	componentDidMount() {
		window.scroll( { top: 0 } )
		return () => { this.props.ativateHero( false ) }
	}

	render() {

		const state = this.props.state
		const showcaseId = this.props.showcaseId
		const showcase = state.showcases[ showcaseId ]
		// const showcasesPath = state.showcasesPath

		// const h = false
		// const handler = (
		// 	<HandleElements
		// 		state = { state }
		// 		elements = { showcase.elements }
		// 		elementsPath = { showcasesPath }
		// 		folder = { showcase.folder }
		// 		className = "flexbox column uppercase"
		// 		id = "showcase-work"
		// 		alt = { showcase.title }
		// 		handleLoadedElement = { ( bool ) => this.props.handleLoadedElement( bool ) }
		// 		handleErroredElement = { ( bool ) => this.props.handleErroredElement( bool ) }
		// 	/>
		// )
		return (
			
			<section className = "grid appear header-space freedom-below uppercase" id = "showcase" key = { showcaseId }>

				<div className = "big-text uppercase" id = "showcase-title">
					<h1>{ showcase.title }</h1>
					<p>{ showcase.subtitle }</p>
				</div>
				
			</section>

		)
	}
}

export default Showcase

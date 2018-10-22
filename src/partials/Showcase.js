import React from 'react'

import HandleImages from '../handler/HandleImages'



class Showcase extends React.Component {

	componentDidMount() {
		window.scroll( { top: 0 } )
		return () => { this.props.ativateHero( true ) }
	}
	componentWillUnmount() {
//		console.log( "UNMOUNTING SHOWCASE ", this )
//		return () => { this.props.fadeOut( true ) }
	}
	render() {

		const state = this.props.state
		const showcaseId = this.props.showcaseId
		const showcase = state.showcases[ showcaseId ]
		const path = state.imagePath + "showcases/"
		const classNames = "flexbox column uppercase"
		const id = "showcase-work"

		return (
			
			<section className = "grid appear header-space freedom-below uppercase" id = "showcase" key = { showcaseId }>

				<div className = "freedom-above big-text uppercase" id = "showcase-title">
					<h1>{ showcase.title }</h1>
					<p>{ showcase.subtitle }</p>
				</div>

				<HandleImages
					images = { showcase }
					path = { path }
					classNames = { classNames }
					id = { id }
					alt = { showcase.title }
					handleLoadedImage = { ( bool ) => this.props.handleLoadedImage( bool ) }
					handleErroredImage = { ( bool ) => this.props.handleErroredImage( bool ) }
				/>

			</section>

		)
	}
}

export default Showcase

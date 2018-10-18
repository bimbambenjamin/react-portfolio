import React from 'react'

import HandleImages from '../handler/HandleImages'



class Showcase extends React.Component {
	
	render() {

		const state = this.props.state
		console.log( "showcase this: ", this)
		const showcaseId = this.props.showcaseId
		const showcase = state.showcases[ showcaseId ]
		const path = state.imagePath + "showcases/"
		const classNames = "flexbox column uppercase"
		const id = "showcase-work"
		const imageStatus = ( status ) => this.props.imageStatus( status )

		return (
			
			<section className = "grid appear header-space freedom-below uppercase" id = "showcase" key = { showcaseId }>

				<div className = "freedom-above big-text uppercase" id = "showcase-title">
					<h1>{ showcase.title }</h1>
					<p>{ showcase.subtitle }</p>
				</div>

				<HandleImages
					showcase = { showcase }
					path = { path }
					classNames = { classNames }
					id = { id }
					imageStatus = { imageStatus }
				/>

			</section>

		)
	}
}

export default Showcase

import React from 'react'

import HandleImages from '../handler/HandleImages'



class Showcase extends React.Component {
	
	render() {
		
		const showcase = this.props.showcase
		const path = this.props.showcasesPath
		const classNames = "flexbox column uppercase"
		const id = "showcase-work"

		return (
			
			<section className = "grid appear uppercase" id = "showcase">

				<div className = "freedom-above big-text uppercase" id = "showcase-title">
					<h1>{ showcase.title }</h1>
					<p>{ showcase.subtitle }</p>
				</div>

				<HandleImages
					showcase = { showcase }
					path = { path }
					classNames = { classNames }
					id = { id }
					imageStatus = { ( status ) => this.props.imageStatus( status ) }
				/>

			</section>

		)
	}
}

export default Showcase

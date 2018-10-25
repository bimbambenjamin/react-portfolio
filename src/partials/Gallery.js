import React from 'react'

import Teaser from './Teaser'
import * as helpers from '../handler/helpers'



class Gallery extends React.Component {

	render() {

		const imagesPath = this.props.state.imagesPath
		const showcasesPath = imagesPath + "/showcases"
		
		return (

			<div className = "grid header-space" id = "works">
				<div className = "flexbox row freedom-below uppercase">
			
					{ this.props.state.showcases.map( ( showcase, i ) => (
			
						<Teaser 
							{ ...showcase }
							key = { showcase._id }
							unloadedSrc = { helpers.getFullPath( imagesPath, "tools", "cover.gif" ) }
							src = { helpers.getFullPath( showcasesPath, showcase.folder, showcase.teaser ) }
							onClick = { () => this.props.onClick( i ) }
						/>
						
					) ) }
					
				</div>
			</div>

		)
	}
}

export default Gallery

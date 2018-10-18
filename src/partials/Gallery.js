import React from 'react'
import { NavLink } from 'react-router-dom'



function Teaser( props )  {
			
	return (
		
			<div className = "item citizen">

				<div className = "teaser one-word-per-line" onClick = { props.onClick }>

					<NavLink to = { `/showcase/${ props.folder }` }>
						<img 
							className = "teaser-image"
							src = { props.value }
							title = { props.title } 
							alt = { props.title } 
						/>
					</NavLink>

					<span className = "teaser-title">{ props.title }</span>

				</div>

			</div>

	)
	
}

class Gallery extends React.Component {

	getFullPath( showcase, path ) {
	
		const folder = showcase.folder
		const file = showcase.teaser
		const filePath = path + folder + "/" + file

		return filePath
		
	}

	render() {

		const showcasesPath = this.props.state.imagePath + "showcases/"
		
		return (

			<div className = "grid header-space" id = "works">
				<div className = "flexbox row freedom-above freedom-below uppercase">
			
					{ this.props.state.showcases.map( ( showcase, i ) => (
						<Teaser 
							key = { i }
							value = { this.getFullPath( showcase, showcasesPath ) }
							folder = { showcase.folder }
							title = { showcase.title }
							onClick = { () => this.props.onClick( i ) }
						/>
					) ) }
					
				</div>
			</div>

		)
	}
}

export default Gallery

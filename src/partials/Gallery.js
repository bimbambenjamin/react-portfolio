import React from 'react'



function Teaser( props )  {
			
	return (
		
		<div className = "item citizen">
		
			<div className = "teaser" onClick = { props.onClick }>

				<img 
					className = "teaser-image"
					src = { props.value }
                    title = { props.title } 
                    alt = { props.title } 
				/>

				<span className = "teaser-title">{ props.title }</span>

			</div>

		</div>

	)
	
}

class Gallery extends React.Component {

	getFullPath( showcase ) {
	
		const path = showcase.path
		const folder = showcase.folder
		const file = showcase.teaser
		const filePath = path + folder + "/" + file

		return filePath
		
	}

	render() {
		
		return (

			<div className = "grid" id = "works">
				<div className = "flexbox row freedom-above freedom-below uppercase">
			
					{ this.props.state.showcases.map( ( showcase, i ) => (
						<Teaser 
							key = { i }
							value = { this.getFullPath( showcase ) }
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

import React from "react"



class HandleImages extends React.Component {

	getFullPath( showcase, image ) {
	
		const path = showcase.path
		const folder = showcase.folder
		const file = image
		const filePath = path + folder + "/" + file

		return filePath
		
	}
	
	render() {
		
		const showcase = this.props.showcase
		const classNames = this.props.classNames
		const id = this.props.id
		console.log( "showcase.images: ", showcase.images )

		return (
			<div 
				className = { classNames }
				id = { id }
			>
			
				{ showcase.images.map( ( image, i ) => ( 
					<img
						key = { i }
						src = { this.getFullPath( showcase, image ) }
						title = { showcase.title }
						alt = { showcase.title }
						onLoad = { () => this.props.imageStatus( "loaded" ) }
						onError = { () => this.props.imageStatus( "error" ) }
					/>
				) ) }

			</div>
		)

	}

}

export default HandleImages

import React from "react"
import ImageLoader from './ImageLoader'



class HandleImages extends React.Component {

	getFullPath( images, image, path ) {
	
		const folder = images.folder
		const file = image
		const filePath = path + folder + "/" + file
		
		return filePath
		
	}

	render() {
		
		const images = this.props.images
		const path = this.props.path
		const classNames = this.props.classNames
		const id = this.props.id
		const alt = this.props.alt
		
		// TODO: change this

		const getImages = images.images.map( ( image, i ) => ( 
			
			<ImageLoader 
				key = { i }
				src = { this.getFullPath( images, image, path ) }
				alt = { alt }
			/>

		) )

		return (

			<div 
				className = { classNames }
				id = { id }
			>
				{ getImages }

			</div>
		)

	}

}

export default HandleImages

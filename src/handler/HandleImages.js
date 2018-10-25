import React from "react"
import ImageLoader from './ImageLoader'
import * as helpers from '../handler/helpers'



class HandleImages extends React.Component {

	render() {
		
		const images = this.props.images
		const imagesPath = this.props.imagesPath
		const folder = "/showcases/" + this.props.folder
		const classNames = this.props.classNames
		const id = this.props.id
		const alt = this.props.alt

		const getImages = images.map( ( image, i ) => ( 
			
			<ImageLoader 
				key = { i }
				unloadedSrc = { helpers.getFullPath( imagesPath, "tools", "cover.gif" ) }
				src = { helpers.getFullPath( imagesPath, folder, image ) }
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

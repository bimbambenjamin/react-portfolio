import React from "react"
import ImageLoader from './ImageLoader'
import * as helpers from '../handler/helpers'



class HandleImages extends React.Component {

	constructor( props ) {

		super ( props )
		
		this.state = {
			allElementsLoaded: false,
			loadedImages: [ this.props.images[0] ],
			count: 1
		}
		this.oneUp = this.nextImageHandler.bind( this )
		
	}
	
	nextImageHandler( i ) {

		if ( this.state.allElementsLoaded ) {

			return

		} else {
			
			const allImages = this.props.images.length
			const loadedImages = this.state.loadedImages
			const updated = loadedImages.concat( this.props.images[ this.state.count ] )
			
			if ( i > allImages ) {
				
				this.setState( {
					allElementsLoaded: true,
					count: 1
				} )
				
			} else {

				this.setState( {
					loadedImages: updated,
					count: i
				} )

			}

		}
		
	}
	
	render() {
		
//		TODO: choose image size according to screen dimensions and available speed
	
		const loadedImages = this.state.loadedImages
		const imagesPath = this.props.imagesPath
		const folder = "/showcases/" + this.props.folder
		const className = this.props.className
		const id = this.props.id
		const alt = this.props.alt
		const allElementsLoaded = this.state.allElementsLoaded
		const oneUp = allElementsLoaded ? null : this.oneUp

		const getImages = loadedImages.map( ( image, i ) => ( 
			
			<ImageLoader 
				key = { i }
				className = "appear"
				unloadedSrc = { helpers.getFullPath( imagesPath, "tools", "tail-spin.svg" ) }
				src = { helpers.getFullPath( imagesPath, folder, image ) }
				alt = { alt }
				count = { this.state.count }
				oneUp = { oneUp }
			/>

		) )

		return (

			<div 
				className = { className }
				id = { id }
			>
				{ getImages }

			</div>
		)

	}

}

export default HandleImages

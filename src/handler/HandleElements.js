import React from "react"
import ElementLoader from './ElementLoader'
import * as helpers from '../handler/helpers'



class HandleElements extends React.Component {

	constructor( props ) {

		super ( props )
		
		this.state = {
			allElementsLoaded: false,
			loadedElements: [ this.props.elements[0] ],
			count: 1
		}
		this.oneUp = this.nextElementHandler.bind( this )
		
	}
	
	nextElementHandler( i ) {

		if ( this.state.allElementsLoaded ) {

			return

		} else {
			
			const allElements = this.props.elements.length
			const loadedElements = this.state.loadedElements
			const updated = loadedElements.concat( this.props.elements[ this.state.count ] )
			
			if ( i > allElements ) {
				
				this.setState( {
					allElementsLoaded: true,
					count: 1
				} )
				
			} else {

				this.setState( {
					loadedElements: updated,
					count: i
				} )

			}

		}
		
	}
	
	render() {
	
		const state = this.props.state
		const loadedElements = this.state.loadedElements
		const elementsPath = this.props.elementsPath
		const folder = "/" + this.props.folder
		const className = this.props.className
		const id = this.props.id
		const alt = this.props.alt
		const allElementsLoaded = this.state.allElementsLoaded
		const oneUp = allElementsLoaded ? null : this.oneUp

		const getElements = loadedElements.map( ( element, i ) => ( 
			
			<ElementLoader 
				key = { i }
				className = "appear"
				unloadedSrc = { helpers.getFullPath( state.imagesPath, "tools", "tail-spin.svg" ) }
				src = { helpers.getFullPath( elementsPath, folder, element ) }
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
				{ getElements }

			</div>
		)

	}

}

export default HandleElements

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
	
	showVideoControls() {
		
		const id = this.props.id + "-" + ( this.state.count - 1 )
		const element = document.getElementById( id )
        if ( element ) {

            element.controls = true		
            element.addEventListener( "loadeddata", console.log( "got data", element ) )
            
        }
		
	}
	
	nextElementHandler( i ) {

		this.showVideoControls()
		
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
	
    getElements( elements ) {
        
		const state = this.props.state
		const elementsPath = this.props.elementsPath
		const folder = this.props.folder
		const alt = this.props.alt
		const allElementsLoaded = this.state.allElementsLoaded
		const oneUp = allElementsLoaded ? null : this.oneUp

        if ( elements[0] ) {

            const e = elements.map( ( element, i ) => ( 

                <ElementLoader 
                    key = { i }
                    id = { element.id }
                    className = "appear"
                    unloadedSrc = { helpers.getFullPath( state.imagesPath, "tools", "tail-spin.svg" ) }
                    src = { helpers.getFullPath( elementsPath, folder, element.name ) }
                    alt = { alt }
                    count = { this.state.count }
					oneUp = { oneUp }
					imageWidth = { element.imageMediaMetadata.width }
					imageHeight = { element.imageMediaMetadata.height }
					windowHeight = { state.windowHeight }
                />

            ) )

            return e
        
        } else {
            
            return null
            
        }
        
    }
	render() {
	
		const loadedElements = this.state.loadedElements
		const className = this.props.className
		const id = this.props.id

		console.log('loadedElements', loadedElements)
		
		return (

			<div 
				className = { className }
				id = { id }
			>
				{ this.getElements( loadedElements ) }

			</div>
		)

	}

}

export default HandleElements

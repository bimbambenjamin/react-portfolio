import React from 'react'
// import axios from 'axios'

import LoadElement from '../handler/LoadElement'

import * as helpers from '../handler/helpers'
// import HandleElements from './handler/HandleElements'



class Showcase extends React.Component {

	_isMounted = false

	constructor( props ) {
		super( props )
		this.state = {

			// handle elements
			allElementsLoaded: false,
			loadedElements: [],
			count: null

		}

		// handle elements
		this.oneUp = this.handleNextElement.bind( this )

	}

	componentDidMount() {

		// TODO: get vimeo dimensions

		// axios
		// 	.get( vimeo )
		// 	.then( res => {
		// 		const data = res
		// 	} )


		window.scroll( { top: 0 } )
		// return () => { this.props.ativateHero( false ) }
	}

	handleNextElement( i ) {

		const showcases = this.props.state.showcases
		const loadedElements = this.state.loadedElements

		const previous = i - 1
		if ( previous >= 0 ) {
			loadedElements.push( showcases[ previous ] )
		}

		if ( this.state.allElementsLoaded ) {
			console.log( "all elements loaded" )
		} else {
			// console.log( "keep loading" )
		}

		this.setState( {
			count: i
		} )

	}

	getVimeoDimensions( src ) {

		// GEThttps://vimeo.com/api/oembed.json?url={video_url}
		const dimensions = {}

		const width = 160
		const height = 90

		dimensions.width = width
		dimensions.height = height

		return dimensions

	}



	render() {

		const state = this.props.state
		const showcasesPath = state.showcasesPath
		const showcaseId = this.props.showcaseId
		const showcase = state.showcases[ showcaseId ]
		const elements= showcase.elements

		const count = this.state.count
		const oneUp = this.oneUp
		const preloader = state.preloader
		const allElementsLoaded = this.state.allElementsLoaded

		const titleTag = (
			<div className = "big-text uppercase" id = "showcase-title">
				<h1>{ showcase.title }</h1>
				<p>{ showcase.subtitle }</p>
			</div>
		)

		const loaderTag = elements.map( ( e, i ) => {

			// TODO: check if video, image or whatever
			// e.g. vimeo has no id …
				

			console.log( "ID", e.id, e.title )

			const index = i + 1
			const init = count === index

			let width
			let height

			// if image
			if ( e.hasOwnProperty( "imageMediaMetadata" ) ) {
				width = e.imageMediaMetadata.width
				height = e.imageMediaMetadata.height
			}
			if ( e.hasOwnProperty( "imageVideoMetadata" ) ) {
				width = e.imageVideoMetadata.width
				height = e.imageVideoMetadata.height
			}
			const src = helpers.getFullPath( showcasesPath, showcase.folder, e.name )
			const type = helpers.getFileType( e.name )

			const element = {
				index: index,
				src: src,
				type: type,
				title: showcase.title,
				width: width,
				height: height
			}

			const loader = (
				<LoadElement 
					key = { e.id }
					flag = "--showcase"
					init = { init }
					className = "showcase-element"
					unloadedSrc = { preloader }
					element = { element }
					allElementsLoaded = { allElementsLoaded }
					count = { count }
					oneUp = { oneUp }
					windowWidth = { state.windowWidth }
					windowHeight = { state.windowHeight }
				/>
			)

			console.log( init, element.title )

			return loader

		} )

		return (
			
			<section 
				className = "grid appear header-space freedom-below uppercase" 
				id = "showcase" 
				key = { showcaseId }
			>

				{ titleTag }
				<div 
					className = "flexbox column uppercase"
					id = "showcase-content"
				>
					{ loaderTag }
				</div>
				
			</section>

		)

	}

}

export default Showcase

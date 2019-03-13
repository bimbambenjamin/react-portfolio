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

			flag: "showcase",

			// handle elements
			allElementsLoaded: false,
			loadedElements: [],
			count: 0,
			// batch
			batchLoaded: false,
			batchNumber: 1,

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


		// window.scroll( { top: 0 } )
		// return () => { this.props.ativateHero( false ) }
	}

	handleNextElement( i ) {

		if ( i === this.state.count ) {

			const oneUp = i + 1
			const showcases = this.props.state.showcases
			const loadedElements = this.state.loadedElements
			loadedElements.push( showcases[ i ] )
			const batchLoaded = i === this.state.batchSize * this.state.batchNumber
			const remainingElements = showcases.length - loadedElements.length

			if ( remainingElements === 0 ) {
				this.stopLoading()
			} else if ( batchLoaded ) {
				this.setState( { batchLoaded: batchLoaded } )
			} else {
				if ( this._isMounted ) this.setState( { count: oneUp } )
			}

		}

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
		const index = this.props.index
		const showcase = state.showcases[ index ]

		const elements= showcase.elements

		const count = this.state.count
		// const oneUp = this.oneUp
		// const preloader = state.preloader
		// const allElementsLoaded = this.state.allElementsLoaded

		const titleTag = (
			<div className = "big-text uppercase" id = "showcase-title">
				<h1>{ showcase.title }</h1>
				<p>{ showcase.subtitle }</p>
			</div>
		)

		const loaderTag = elements.map( ( e, i ) => {

			// TODO: check if video, image or whatever
			// e.g. vimeo has no id …
				

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
				index: i,
				src: src,
				type: type,
				title: showcase.title,
				width: width,
				height: height
			}

			const flag = this.state.flag

			const props = {
				flag: flag,
				loaded: this.props.loaded,
				preloaderSrc: this.props.preloader,
				className: `${ flag }-element`,
				element: element,
				count: count,
				oneUp: this.oneUp,
				windowWidth: this.props.windowWidth,
				windowHeight: this.props.windowHeight,
			}
	
			console.log( "SHOWCASE:", e.name )

			const loader = (
				<LoadElement 
					{ ...props }
					key = { e.id }
				/>
			)

			// console.log( init, element.title )

			return loader

		} )

		return (
			
			<section 
				className = "grid appear header-space freedom-below uppercase" 
				id = "showcase" 
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

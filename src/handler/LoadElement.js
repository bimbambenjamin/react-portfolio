import React from 'react'

// import * as helpers from './helpers'


// TODO: refactor to creators.js?
// creators
const CreateImage = ( src, didLoad, oneUp ) => {

	const img = new Image()
	console.log( "creating image", src )

	img.onload = () => {
		console.log( "image loaded", src )
		return didLoad( oneUp )

	}
	img.src = src
	
}
const CreateIframe = ( src, didLoad, oneUp ) => {

	const PLAYER_URL = "https://player.vimeo.com/video/"
	const url = PLAYER_URL + src.split("/").pop()

	const iframe = document.createElement( "iframe" )

	iframe.onload = () => {
		console.log( "iframe loaded", url )
		return didLoad( oneUp )
	}
	iframe.src = url

}
const CreateVideo = ( src, didLoad, oneUp, i ) => {

	const video = document.createElement( "video" )

	video.onloadstart = () => {
		console.log( "video loading", src )
		return oneUp( i )
	}
	video.oncanplay = () => {
		console.log( "video can play", src )
		return didLoad()
	}
	video.src = src

}






class LoadElement extends React.Component {

	_isMounted = false

	constructor( props ) {
		super( props )
		this.state = {
			init: this.props.count === this.props.element.index,
			preloader: this.props.count === this.props.element.index,
			progress: false,
			value: 0,
			loaded: false,
			error: false
		}
		this.ref = null

	}

	componentDidMount() {

		this._isMounted = true

		const i = this.props.element.index
		console.log( "MOUNTED", i )
		// this.handlePreloader()
		
	}
	componentWillUnmount() {
		this._isMounted = false
	}

	// handlePreloader() {
	// 	const init = this.state.init
	// 	this.setState( {
	// 		preloader: init
	// 	} )
	// }
	handleDidLoad( oneUp ) {
		console.log( "HDL-1UP", oneUp )
		this.setState( {
			init: false,
			preloader: false,
			loaded: true
		} )
		if ( oneUp ) return oneUp( this.props.element.index )
	}

	handleSrc( src, i ) {

		console.log( "HANDLE SRC", this.props.element.index )

		const oneUp = this.props.oneUp
		const didLoad = ( oneUp ) => this.handleDidLoad( oneUp )

		switch ( this.props.element.type ) {
			case "image":
				CreateImage( src, didLoad, oneUp )
				break
			case "video":
				CreateVideo( src, didLoad, oneUp, i )
				break
			case "vimeo":
				CreateIframe( src, didLoad, oneUp )
				break
			default:
				return
		}

	}


	// TODO: refactor
	// handle element
	getDimensions( flag ) {

		let dimensions = {}

		// window		
		const wWidth = this.props.windowWidth
		const wHeight = this.props.windowHeight

		// element
		const element = this.props.element
		let originalWidth = element.width
		let originalHeight = element.height
		const ratio = originalWidth / originalHeight


		// TODO: make values dynamic
		// css values


		// vars
		const unit = 20
		const pageFrame = wWidth > 1111 ? unit * 5 : unit
		const contentWidth = wWidth - pageFrame * 2
		const maxHeight = wHeight * 0.8

		let width = originalWidth
		let height = originalHeight

		if ( flag === "teaser" ) {

			// TEASER
			const citizenWidth = 400
			const rebelWidth = 600
			// is rebel? bool
			const isRebel = originalWidth === rebelWidth || originalWidth > originalHeight

			// correct original if width is incorrect
			const correctWidth = originalWidth === citizenWidth || originalWidth === rebelWidth
			if ( !correctWidth ) {
				originalWidth = isRebel ? rebelWidth : citizenWidth
				originalHeight = originalWidth / ratio
			}

			// set itemWidth
			const item = 328
			let itemWidth = isRebel ? item * 1.5 : item
			if ( wWidth < 834 ) {
				itemWidth = 320 - pageFrame * 2
			}
			if ( wWidth > 1365 ) {
				itemWidth = originalWidth
			}
			width = itemWidth
			height = width / ratio

		} else if ( flag === "showcase" ) {
			// SHOWCASE	
		}

		// handle ratio
		if ( width > contentWidth ) {
			width = contentWidth
			height = width / ratio
		}
		if ( height > maxHeight ) {
			height = maxHeight
			width = height * ratio
		}

		// return dimensions object
		dimensions = {
			width: width,
			height: height
		}

		// console.log( "dimensions", element.title, dimensions )
		return dimensions

	}

	// TODO: read vimeo json
	// get json from:
	//	https://vimeo.com/api/oembed.json?url={ encodeURI( element.src ) }
	// const width = this
	// const height = that
	// const ratio = width / height
	// return width, height, ratio



	render() {

		const count = this.props.count
		const init = this.props.count === this.props.element.index
		const showPreloader = init
		const loaded = this.state.loaded

		const preloaderSrc = this.props.preloaderSrc
		const tailSpin = { background: `url( ${ preloaderSrc } ) no-repeat center center` }
		const element = this.props.element
		const i = element.index
		const src = element.src
		
		const flag = this.props.flag
		const dimensions = this.getDimensions( flag )
		const divStyle = {
			width: dimensions.width,
			height: dimensions.height
		}
		
		const className = this.props.className
		const preloaderBackground = !loaded ? " preloader-background" : ""
		const divClassName = className + " appear" + preloaderBackground

		if ( init ) {
			console.log( "count", count )
			console.log( "i", this.props.element.index )
			console.log( "init", init )
			console.log( "showPreloader", showPreloader )
			console.log( "loaded", loaded )
		}

		if ( this._isMounted && init && !loaded ) this.handleSrc( src, i )
		
		// create tag
		const imgTag = (
			<figure className = "appear">
				<img
					id = { element.id }
					src = { src }
					title = { element.title }
					alt = { element.title }
				/>
			</figure>
		)
		const iframeTag = (
			<div className = "appear">
				<iframe
					src = { src }
					id = { element.id }
					title = { element.title }
					width = { element.width }
					height={ element.height }
					frameBorder = "0"
					webkitallowfullscreen = "true"
					mozallowfullscreen = "true"
					allowFullScreen
				>
				</iframe>
			</div>
		)
		const videoTag = (
			<figure className = "appear"
			ref = { loadedElement => this.ref = loadedElement }
			>
			<video
					id = { element.id }
					aria-hidden = "true"
					autoPlay
					loop
					muted
					playsInline
					src = { src }
					tabIndex = "-1"
				/>
			</figure>
		)
		const preloaderTag = (
			<div
				className = "appear preloader"
				style = { tailSpin }
			/>
		)
		// const progressTag = if ( progress ) (
		// 	<progress value = { this.state.value } max = "100" />
		// ) : null

		// switch tag content
		const getTag = () => {
			// console.log( "TAG?", loaded )
			if ( loaded ) {
				let tag
				switch ( this.props.element.type ) {
					case "image":
						tag = imgTag
						break
					case "vimeo":
						tag = iframeTag
						break
					case "video":
						tag = videoTag
						break
					default:
						tag = null
				}
				return tag
			}
		}
		const contentTag = getTag()

		// if ( this._isMounted && !this.state.error && !this.state.loaded && this.props.init ) {
		// 	console.log( "fetching", this.props.count )
		// 	console.log( "loading", this.props.element.title )

		// load src
		// if it has the correct ticket
		// if ( validTicket ) this.handleSrc( src, oneUp )
		
		// div contains grey preloader background
		return (
			<div 
				className = { divClassName } 
				style = { divStyle }
			>
				{ contentTag }
				{ showPreloader ? preloaderTag : null }
			</div>
		)

	}

}

export default LoadElement

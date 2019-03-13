import React from 'react'

// import * as helpers from './helpers'


// TODO: refactor to creators.js?
// creators
const CreateImage = ( props ) => {

	const img = new Image()
	console.log( "creating image", props.src )
	
	img.onload = () => {
		console.log( "image loaded", props.src )
		return props.didLoad( props.oneUp( props.i ) )

	}
	img.src = props.src
	return props.loading( true )
	
}
const CreateIframe = ( props ) => {

	const PLAYER_URL = "https://player.vimeo.com/video/"
	const url = PLAYER_URL + props.src.split( "/" ).pop()

	const iframe = document.createElement( "iframe" )

	iframe.onload = () => {
		console.log( "iframe loaded", url )
		return props.didLoad( props.oneUp( props.i ) )
	}
	iframe.src = props.url
	return props.loading( true )

}
const CreateVideo = ( props ) => {

	const video = document.createElement( "video" )

	video.onloadstart = () => {
		console.log( "video loading", props.src )
		return props.oneUp( props.i )
	}
	video.oncanplay = () => {
		console.log( "video can play", props.src )
		return props.didLoad()
	}
	video.src = props.src
	return props.loading( true )

}






class LoadElement extends React.Component {

	_isMounted = false
	_isLoading = false

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
		console.log("MOUNTED")
	}
	componentWillUnmount() {
		this._isMounted = false
	}

	handleDidLoad( i ) {
		this._isLoading = false
		this.setState( {
			init: false,
			preloader: false,
			loaded: true
		} )
		if ( i ) return i
	}

	handleSrc( src, i ) {

		console.log( "handling:", src )
		const props = {
			src: src,
			loading: i => this._isLoading = i,
			didLoad: ( i ) => this.handleDidLoad( i ),
			oneUp: this.props.oneUp,
			i: i
		}

		switch ( this.props.element.type ) {
			case "image":
				CreateImage( props)
				break
			case "video":
				CreateVideo( props )
				break
			case "vimeo":
				CreateIframe( props )
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
			const rebelWidth = citizenWidth * 1.5
			// is rebel? bool
			let isRebel = originalWidth === rebelWidth || originalWidth > originalHeight

			// correct original if width is incorrect
			const correctWidth = originalWidth === citizenWidth || originalWidth === rebelWidth
			if ( !correctWidth ) {
				originalWidth = isRebel ? rebelWidth : citizenWidth
				originalHeight = originalWidth / ratio
			}

			// set itemWidth
			let item = 328
			
			if ( wWidth > 1365 ) {
				item = citizenWidth
			} else if ( wWidth < 834 ) {
				item = 320 - pageFrame * 2
				if ( wWidth < item * 1.5 + pageFrame * 2 ) {
					isRebel = false
				}
			}
			const itemWidth = isRebel ? item * 1.5 : item
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
		
		const loading = this._isLoading
		const loaded = this.state.loaded
		// const count = this.props.count
		const init = this.props.count === this.props.element.index
		const showPreloader = !loaded && ( init || loading )

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
		if ( flag === "showcase" ) {
			console.log( "---> fetching:", flag, element.src )
			console.log( "isMounted:", this._isMounted )
			console.log( "init:", init )
			console.log( "loading:", loading )
			console.log( "loaded:", loaded )
		}
		const className = this.props.className
		const preloaderBackground = !loaded ? " preloader-background" : ""
		const divClassName = className + " appear" + preloaderBackground

		if ( this._isMounted && init && !loading && !loaded ) this.handleSrc( src, i )
		
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
		// const progressTag = { progress && 
		// 	<progress value = { this.state.value } max = "100" />
		// }

		// switch tag content
		const getTag = () => {
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

		return (
			<div 
				className = { divClassName } 
				style = { divStyle }
			>
				{ contentTag }
				{ showPreloader && preloaderTag }
			</div>
		)

	}

}

export default LoadElement

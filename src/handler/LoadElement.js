import React from 'react'

// import * as helpers from './helpers'

const VIMEO_PLAYER = "https://player.vimeo.com/video/"



class LoadElement extends React.Component {

	_isMounted = false

	constructor( props ) {
		super( props )
		this.state = {
			error: false,
			preloader: false,
			progress: false,
			loaded: false,
			value: 0
		}
	}

	componentDidMount() {
		this._isMounted = true
		this.handleSrc( this.props.element.src )
	}
	componentWillUnmount() {
		this._isMounted = false
	}

	handleSrc( src ) {
		if ( this._isMounted && this.state.error === false && this.state.loaded === false && this.props.count === this.props.element.index ) {
			console.log( "fetching", this.props.count )
			console.log( "loading", src )
			switch ( this.props.element.type ) {
				case "image":
					this.createImage( src )
					break
				case "vimeo":
					this.createIframe( src )
					break
				case "video":
					this.createVideo( src )
					break
				default:
					return
			}
		}
	}

	// create content
	createImage( src ) {
		const img = new Image()
		img.onload = () => {
			if ( this._isMounted ) {
				console.log( "image loaded", this.props.element.index )
				this.setState( {
					loaded: true,
					preloader: false,
				} )
				this.oneUp()
			}
		}
		if ( this._isMounted ) {
			img.onerror = () => {
				this.setState( {
					error: true,
					preloader: false
				} )
			}
		}
		img.src = src
	}
	createIframe( src ) {
		const iframe = document.createElement( "iframe" )
		const vimeoPlayerUrl = VIMEO_PLAYER + src.split("/").pop()
	
		iframe.onload = () => {
			if ( this._isMounted ) {
				// this.setState( {
				// 	loaded: true,
				// 	preloader: false
				// } )
			}
		}
		if ( this._isMounted ) {
			iframe.onerror = () => {
				// this.setState( {
				// 	error: true,
				// 	preloader: false
				// } )
			}
		}
		iframe.src = vimeoPlayerUrl
	}
  createVideo ( src ) {
		const video = document.createElement("video")
		video.onloadstart = () => {
			if ( this._isMounted ) {
				console.log( "video loaded", this.props.element.index )
				// this.setState( {
				// 	loaded: true,
				// 	preloader: false
				// })
			}
		}
		if ( this._isMounted ) {
			video.onerror = () => {
				// this.setState( {
				// 	error: true,
				// 	preloader: false
				// } )
			}
		}
		video.src = src
	}

	oneUp() {
		// if(this.props.count <  ) {
			console.log( "+1", this.props.count + 1 )
		this.props.oneUp( this.props.count + 1 )
		// }
	}

	// handle element
	getDimensions() {
		const unit = 20
		const itemWidth = 328
		const pageFrame = this.props.windowWidth >= 1112 ? unit * 5 : unit
		const contentWidth = this.props.windowWidth - ( pageFrame * 2 )
		const maxHeight = this.props.windowHeight * 0.8
		const element = this.props.element
		let originalWidth
		let originalHeight

		if ( element.hasOwnProperty( "width" ) && element.hasOwnProperty( "height" ) ) {
			originalWidth = element.width
			originalHeight = element.height
		}
		const ratio = originalWidth / originalHeight

		let width = this.props.windowWidth >= 1366 ? originalWidth : itemWidth
		let height = width / ratio

		if ( width > contentWidth ) {
			width = contentWidth
			height = width / ratio
		}
		if ( height > maxHeight ) {
			height = maxHeight
			width = height * ratio
		}

		const dimensions = {
			height: height,
			width: width
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

		let preloader = this.state.preloader
		if ( this.props.init && !this.state.preloader && !this.state.loaded ) {
			preloader = true
		}
		
		const progress = this.state.progress
		// const preloader = this.state.preloader
		const loaded = this.state.loaded
		const className = this.props.className
		const unloadedSrc = this.props.unloadedSrc
		const tailSpin = { background: `url( ${ unloadedSrc } ) no-repeat center center` }
		const element = this.props.element
		const src = element.src

		const divClassName = className + " appear " + (
			preloader ? "preloader-background" : "dark-background"
		)

		const vimeoPlayerUrl = src.includes( "vimeo" ) ? 
			VIMEO_PLAYER + src.split("/").pop() : src

		const dimensions = this.getDimensions()
		const divStyle = {
			width: dimensions.width,
			height: dimensions.height
		}

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
			<div>
				<iframe
					src = { vimeoPlayerUrl }
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
			<figure className = "appear">
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
		const preloaderTag = preloader ? (
			<div
				className = "appear preloader"
				style = { tailSpin }
			/>
		) : null
		const progressTag = progress ? (
			<progress value = { this.state.value } max = "100" />
		) : null

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

		this.handleSrc( src )
		
		// div contains grey preloader background
		return (
			<div 
				className = { divClassName } 
				style = { divStyle }
			>
				{ progressTag }
				{ preloaderTag }
				{ contentTag }
			</div>
		)

	}

}

export default LoadElement

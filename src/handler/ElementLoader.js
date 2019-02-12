import React from 'react'

import * as helpers from './helpers'



class ElementLoader extends React.Component {

	_isMounted = false

	constructor(props) {

		super(props)

		this.state = {
			loaded: false,
			error: false,
			preloader: true,
			progress: false,
			value: 0,
			windowWidth: window.innerWidth
		}
		this.getViewWidth = this.handleViewWidth.bind(this)

	}

	componentDidMount() {

		window.addEventListener("resize", this.getViewWidth)

		this._isMounted = true
		this.handleSrc()

	}

	componentWillUnmount() {

		this._isMounted = false
		window.removeEventListener("resize", this.getViewWidth)

	}

	handleViewWidth() {

		console.log( "hVW setState" )

		const vw = window.innerWidth;
		const storedWidth = this.state.windowWidth ? this.state.windowWidth : vw

		if (vw !== storedWidth) {
			this.setState({
				windowWidth: vw
			})
		}

	}

	handleSrc() {

		const fileType = helpers.getFiletype(this.props.src)
		if (fileType) {
			if (fileType === "video") {
				this.createVideo()
			} else if (fileType === "image") {
				this.createImage()
			} else if (fileType.includes("vimeo")) {
				this.createIframe()
			}
		}

	}

	createImage() {

		const img = new Image()
		console.log( "cI setState" )

		img.onload = () => {

			if (this._isMounted) {

				this.setState({
					loaded: true,
					preloader: false
				})

				const oneUp = this.props.oneUp

				if (oneUp) {
					return oneUp(this.props.count + 1)
				}

			}

		}

		if (this._isMounted) {

			img.onerror = () => {
				this.setState({
					error: true,
					preloader: false
				})
			}

		}

		img.src = this.props.src

	}

	createVideo() {

		console.log( "cV setState" )
		const video = document.createElement("video")

		video.onloadstart = () => {

			if (this._isMounted) {

				this.setState({
					loaded: true,
					preloader: false
				})

				const oneUp = this.props.oneUp

				if (oneUp) {
					return oneUp(this.props.count + 1)
				}

			}

		}

		if (this._isMounted) {

			video.onerror = () => {
				this.setState({
					error: true,
					preloader: false
				})
			}

		}

		video.src = this.props.src

	}

	createIframe() {

		console.log( "cIF setState" )
		const iframe = document.createElement("iframe")

		const src = this.props.src
		const vimeo = src.includes("vimeo") ? true : false
		const vimeoPlayerUrl = vimeo ? "https://player.vimeo.com/video/" + src.split("/").pop() : null

		iframe.onload = () => {

			if (this._isMounted) {

				this.setState({
					loaded: true,
					preloader: false
				})

				const oneUp = this.props.oneUp

				if (oneUp) {
					return oneUp(this.props.count + 1)
				}

			}

		}

		if (this._isMounted) {

			iframe.onerror = () => {
				this.setState({
					error: true,
					preloader: false
				})
			}

		}

		iframe.src = vimeoPlayerUrl

	}
	getVimeoJson(src) {

		// TODO: read vimeo json
		console.log("getting json")
		// get https://vimeo.com/api/oembed.json?url={ encodeURI( src ) }
		// const width = this
		// const height = that
		// const ratio = width / height
		// return width, height, ratio

	}

	getDimensions() {
		// image or video?
		// this.handleImageDimensions()
	}

	handleImageDimensions() {
		let originalImageWidth = null
		let originalImageHeight = null
		if ( this.props.dimensions ) {
			originalImageWidth = this.props.dimensions.width
			originalImageHeight = this.props.dimensions.height
			}
		const imageRatio = originalImageWidth / originalImageHeight
		let imageWidth = originalImageWidth
		let imageHeight = originalImageHeight
		if (imageWidth > contentWidth) {
			imageWidth = contentWidth
			imageHeight = imageWidth / imageRatio
		}
		if (imageHeight > imageMaxHeight) {
			imageHeight = imageMaxHeight
			imageWidth = imageHeight * imageRatio
		}
	}

	handleVimeoDimensions() {
		// const vimeo = this.state.vimeo
		// if (src.includes("vimeo")) {
			// vimeo = true
			// const vimeoJson = getVimeoJson(src)
			// const vimeoRatio = videoJSON
			// const vimeoPlayerUrl = "https://player.vimeo.com/video/" + src.split( "/" ).pop()
		// }
		const vimeo = src.includes( "vimeo" ) ? true : false
		// const vimeoJSON = vimeo ? this.getVimeoRatio( src ) : null
		// const vimeoRatio = videoJSON
		const vimeoPlayerUrl = vimeo ? "https://player.vimeo.com/video/" + src.split( "/" ).pop() : null
		// const iFrameHeight = contentWidth * vimeoRatio
		const iFrameHeight = contentWidth / 16 * 9
		const windowHeight = this.props.windowHeight // y px
		const imageMaxHeight = windowHeight * 0.8
	}

	render() {

		console.log("EL render")

		const id = this.props.id
		const className = this.props.className
		const unloadedSrc = this.props.unloadedSrc
		const src = this.props.src || ""
		const progress = this.state.progress ? "progress" : null
		let preloader = this.state.preloader ? "preloader" : null
		let loaded = this.state.loaded
		// const elementSrc = loaded ? src : unloadedSrc

		const alt = this.props.alt
		const title = helpers.cleanTitle(this.props.title)
		const fileType = helpers.getFiletype(src)

		// TODO: not in auto-sync with css
		const unit = 20
		const pageFrame = this.state.windowWidth > 1112 ? unit * 5 : unit
		const contentWidth = this.state.windowWidth - (pageFrame * 2)
		
		// image || video
		// const dimensions = getDimensions()
		// const width = dimensions.width
		// const height = dimensions.height
		// const ratio = dimenstions.ratio


		const progressTag = (
			<progress value={ this.state.value } max="100" />
		)
		const preloaderTag = (
			<div
				className="appear preloader"
				style={ { background: "url(" + unloadedSrc + ") no-repeat center center" } }
			/>
		)
		const imgTag = (
			<figure className="appear">
				<img
					id={ id }
					className={ className }
					src={ src }
					title={ title }
					alt={ alt }
				/>
			</figure>
		)
		const iframeTag = (
			<div>
				<iframe
					id={ id }
					title={ id }
					src={ vimeoPlayerUrl }
					width={ contentWidth }
					height={ iFrameHeight }
					frameBorder="0"
					webkitallowfullscreen="true"
					mozallowfullscreen="true"
					allowFullScreen
				>
				</iframe>
			</div>
		)
		const videoTag = (
			<figure className="appear">
				<video
					id={ id }
					aria-hidden="true"
					className={ className }
					autoPlay
					loop
					muted
					playsInline
					src={ src }
					tabIndex="-1"
				/>
			</figure>
		)




		let content
		if (fileType === "image") {
			content = imgTag
		} else if (fileType.includes("vimeo")) {
			content = iframeTag
			preloader = false
			loaded = true
		} else {
			// loaded = true
			// preloader = false
			content = videoTag
		}
		const divClassName = "appear " + (
			preloader ? "preloader-background" : ""
		)
		const divStyle = {
			width: imageWidth,
			height: imageHeight
		}

		return (

			<div className={divClassName} style={divStyle}>

				{progress ? progressTag : null}
				{preloader ? preloaderTag : null}
				{loaded ? content : null}

			</div>

		)

	}

}

export default ElementLoader

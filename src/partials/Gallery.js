import React from 'react'

// import Teaser from './Teaser'
import LoadElement from '../handler/LoadElement'
import * as helpers from '../handler/helpers'
import { NavLink } from 'react-router-dom'



class Gallery extends React.Component {

	_isMounted = false

	constructor( props ) {
		super( props )
		this.state = {

			// handle elements
			allElementsLoaded: false,
			loadedElements: [],
			count: 1,
			// batch
			batch: this.getBatchSize(),
			batchLoaded: false,
			batchNumber: 1,
			// dimensions
			initialHeight: null

		}

		// handle elements
		this.oneUp = this.nextImageHandler.bind( this )
	}

	componentDidMount() {
		this._isMounted = true
		this.getBatchSize()
		window.addEventListener("scroll", this.handleScroll.bind(this))
		window.addEventListener("resize", this.handleResize.bind(this))
	}

	componentWillUnmount() {
		this._isMounted = false
		window.removeEventListener("scroll", this.handleScroll.bind(this))
		window.removeEventListener("resize", this.handleResize.bind(this))
	}

	getBatchSize() {

		const width = window.innerWidth
		const height = window.innerHeight

		let unit = 20
		const gap = unit * 2
		const pageFrame = width > 1024 ? unit * 5 : unit
		let item = 320

		if (width > 1365) {
			item = 400
		} else if (width < 834) {
			item = 320 - pageFrame * 2
		}

		const itemWidth = item + gap
		const netWidth = (width - pageFrame * 2) / itemWidth
		const columns = netWidth < 1 ? 1 : Math.floor(netWidth)
		const netHeight = (height - pageFrame * 2) / itemWidth
		const rows = Math.floor(netHeight)
		const visibleItems = columns * rows
		const batchSize = visibleItems * 3

		if (this._isMounted) {

			this.setState({
				batch: batchSize,
				initialHeight: height
			})

		} else {

			return batchSize

		}

	}

	handleResize(e) {
		this.getBatchSize()
	}

	handleScroll(e) {
		// const scrollY = window.scrollY
		// if (this._isMounted && this.props.state.scrollingDown && scrollY > this.state.initialHeight * 2) {
		// 	this.loadNextBatch()
		// }
	}

	loadNextBatch() {
		if (!this.state.allElementsLoaded && this.state.batchLoaded) {
			const nextBatch = this.state.batchNumber + 1
			this.setState({
				batchLoaded: false,
				batchNumber: nextBatch
			})
			this.nextImageHandler(this.state.count + 1)
		}
	}

	handleBatch(i, allShowcases) {

		const lastImage = i - 1
		const loadingBatch = this.state.batchNumber
		const remainingTeasers = allShowcases - this.state.loadedTeasers.length
		const batch = remainingTeasers < this.state.batch ? remainingTeasers : this.state.batch

		if (remainingTeasers === 0) {
			window.removeEventListener("scroll", this.handleScroll.bind(this))
			window.removeEventListener("resize", this.handleResize.bind(this))
		}

		if (lastImage === batch * loadingBatch) {

			this.setState({
				batchLoaded: true
			})

		}

	}

	nextImageHandler( i ) {
		const showcases = this.props.state.showcases
		const loadedElements = this.state.loadedElements

		const previous = i - 1
		if ( previous >= 0 ) {
			console.log( "push", previous)
			loadedElements.push( showcases[ previous ] )
		}

		console.log( "loadedElements", loadedElements )

		if ( this.state.allElementsLoaded ) {
			console.log( "all elements loaded" )
		} else {
			console.log( "keep loading" )
		}

		// this.handleBatch(i, allShowcases)

		// if (this.state.allElementsLoaded || this.state.batchLoaded) {
		// 	return
		// } else {
		// 	const updated = loadedTeasers.concat(showcases[this.state.count])
		// 	if (i > allShowcases) {
		// 		this.setState({
		// 			allElementsLoaded: true,
		// 			count: 1
		// 		})
		// 	} else {
		// 		this.setState({
		// 			loadedTeasers: updated,
		// 			count: i
		// 		})
		// 	}
		// }

		this.setState( {
			count: i
		} )

	}

	render() {

		const count = this.state.count
		const oneUp = this.oneUp

		const state = this.props.state
		const showcases = state.showcases
		const preloader = state.preloader
		const showcasesPath = state.showcasesPath

		const allElementsLoaded = this.state.allElementsLoaded

		// TODO: choose image size according to screen dimensions and available speed

		const teaser = showcases.map( ( showcase, i ) => {
			
			const index = i + 1
			const init = count === index ? true : false
			// TODO: upload new json to get teaser object
			const teaser = showcase.teaser

			const width = teaser.width
			const height = teaser.height
			const ratio = width / height

			const element = {
				index: index,
				src: helpers.getFullPath( showcasesPath, showcase.folder, teaser.name ),
				type: helpers.getFileType( teaser.name ),
				title: showcase.title,
				width: width,
				height: height,
				ratio: ratio
			}

			const className = "item " + ( element.width === 600 ? "rebel" : "citizen" )

			return (
				<div 
					className = { className }
					key = { showcase.id }
				>
					<div className = "teaser one-word-per-line">

						<NavLink 
							exact
							to = { `/showcase/${ showcase.folder }` }
						>
							<LoadElement 
								init = { init }
								className = "teaser-element"
								unloadedSrc = { preloader }
								element = { element }
								allElementsLoaded = { allElementsLoaded }
								count = { count }
								oneUp = { oneUp }
								windowWidth = { state.windowWidth }
								windowHeight = { state.windowHeight }
							/>
							<span className = "teaser-title">{ element.title }</span>
						</NavLink>

					</div>
				</div>
			)
		} )

		return (
			<div className = "grid" id = "works">
				<div className = "flexbox row freedom-below uppercase">
					{ teaser }
				</div>
			</div>
		)
	}
}

export default Gallery

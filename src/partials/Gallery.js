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
			count: 0,
			// batch
			batch: this.getBatchSize(),
			batchLoaded: false,
			batchNumber: 1,
			// dimensions
			initialHeight: null

		}

		// handle elements
		this.oneUp = this.handleNextElement.bind( this )
	}


	componentDidMount() {
		this._isMounted = true
		this.getBatchSize()		
		window.addEventListener( "resize", this.handleResize.bind( this ) )
		window.addEventListener( "scroll", this.handleScroll.bind( this ) )
	}

	componentWillUnmount() {
		this._isMounted = false
		window.removeEventListener( "resize", this.handleResize.bind( this ) )
		window.removeEventListener( "scroll", this.handleScroll.bind( this ) )
	}

	getBatchSize() {

		// window dimensions
		const width = this.props.state.windowWidth
		const height = this.props.state.windowHeight

		// css vars
		let unit = 20
		const gap = unit * 2
		const pageFrame = width > 1024 ? unit * 5 : unit
		let item = 328

		if ( width > 1365 ) {
			item = 400
		} else if ( width < 834 ) {
			item = 320 - pageFrame * 2
		}

		// calculate batch size
		const itemWidth = item + gap
		const netWidth = ( width - pageFrame * 2 ) / itemWidth
		const columns = netWidth < 1 ? 1 : Math.floor( netWidth )
		const netHeight = ( height - pageFrame * 2 ) / itemWidth
		const rows = Math.floor( netHeight )
		const visibleItems = columns * rows
		const batchSize = visibleItems * 3
		console.log( "batchSize", batchSize )
		
		if ( this._isMounted ) {
			this.setState( {
				batch: batchSize
			} )
		} else {
			return batchSize
		}

	}

	handleResize( e ) {
		this.getBatchSize()
	}

	handleScroll( e ) {
		const scrollY = window.scrollY
		// TODO: change scroll rules
		if ( this._isMounted && this.props.state.scrollingDown && scrollY > this.state.initialHeight * 2 ) {
			console.log( "LOAD NEXT BATCH" )
			// this.loadNextBatch()
		}
	}

	loadNextBatch() {
		// console.log( "LOAD NEXT BATCH", this.state.allElementsLoaded )
		if ( !this.state.allElementsLoaded && this.state.batchLoaded ) {
			const nextBatch = this.state.batchNumber + 1
			this.setState( {
				batchLoaded: false,
				batchNumber: nextBatch
			} )
			this.handleNextElement( this.state.count + 1 )
		}
	}

	handleBatch( i, showcases ) {

		const lastImage = i - 1
		const loadingBatch = this.state.batchNumber
		const remainingElements = showcases - this.state.loadedElements.length
		const batch = remainingElements < this.state.batch ? remainingElements : this.state.batch

		if ( remainingElements === 0 ) {
			window.removeEventListener("scroll", this.handleScroll.bind(this))
			window.removeEventListener("resize", this.handleResize.bind(this))
		}

		if ( lastImage === batch * loadingBatch ) {

			this.setState( {
				batchLoaded: true
			} )

		}

	}

	handleNextElement( i ) {

		const ticket = this.ticketMachine( i )
		console.log( "HANDLE", ticket )

		// gets previously loaded element
		// loads loadedElements array
		// checks if all elements were loaded
		// sets state for count

		const showcases = this.props.state.showcases
		const loadedElements = this.state.loadedElements

		// const previous = i - 1
		// if ( previous >= 0 ) {
		// 	loadedElements.push( showcases[ previous ] )
		// }
		// console.log( "loadedElements", loadedElements )

		// if ( loadedElements.length === showcases.length )
		// 	console.log( "all elements loaded" )
		// }
		// if ( this.state.allElementsLoaded ) {
		// } else {
		// 	// console.log( "keep loading" )
		// }

		// this.handleBatch( i, showcases )

		if ( !this.state.allElementsLoaded || !this.state.batchLoaded ) {

			const count = this.state.count
			const updated = loadedElements.concat( showcases[ count ] )

			if ( i > showcases) {
				this.setState( {
					allElementsLoaded: true,
					count: 1
				} )
			} else {
				this.setState( {
					loadedElements: updated,
					count: ticket
				} )
			}
		}

		// this.setState( {
		// 	count: ticket
		// } )

	}





	ticketMachine( i ) {

		const showcases = this.props.state.showcases
		const loadedElements = this.state.loadedElements

		// save last ticket
		const previous = i
		if ( previous >= 0 ) {
			loadedElements.push( showcases[ previous ] )
		}
		// tickets available?
		const packed = showcases.length === loadedElements.length
		const ticket = !packed ? i + 1 : null
		console.log( "--- ticketMachine:", i, ticket )
		return ticket

	}

	checker( i ) {

		let valid
		const max = 10
		const count = this.state.count

		// console.log("COUNT", ticket, this.state.loadedElements.length - 1 )
		if ( i < max && i <= count) {
			console.log( "go in")
			valid = true
		} else {
			// console.log( "invalid ticket")
			valid = false
		}
		return valid

	}


	handleLoadingElements( i ) {
		console.log( "CURRENTLY LOADING:", i )
	}
	onMouseEnter() {
		// console.log( "HOORAY" )
	}
	onMouseLeave() {
		// console.log( "BOO" )
	}

	render() {

		// const loadingElements = this.state.loadingElements

		const count = this.state.count
		const oneUp = this.oneUp

		const state = this.props.state
		const showcases = state.showcases
		const preloader = state.preloader
		const showcasesPath = state.showcasesPath

		// const allElementsLoaded = this.state.allElementsLoaded


		// TODO: choose image size according to screen dimensions and available speed
		const teaserTag = showcases.map( ( showcase, i ) => {
			
			const index = i
			// const init = count === index
			
			// TODO: upload new json to get teaser object
			const teaser = showcase.teaser

			const width = teaser.width
			const height = teaser.height
			const isRebel = width > height
			const src = helpers.getFullPath( showcasesPath, showcase.folder, teaser.name )
			const type = helpers.getFileType( teaser.name )
			const loaded = this.checker( i )


			const element = {
				index: index,
				src: src,
				type: type,
				title: showcase.title,
				width: width,
				height: height
			}

			const className = "item " + ( isRebel ? "rebel" : "citizen" )
			const flag = "teaser"

			const divTag = (
				<div 
					className = { className }
					key = { showcase.id }
				>
					<div
						className = "teaser one-word-per-line"
						onMouseEnter = { this.onMouseEnter }
						onMouseLeave = { this.onMouseLeave }
					>

						<NavLink 
							exact
							to = { `/showcase/${ showcase.folder }` }
						>
							<LoadElement 
								loaded = { loaded }
								flag = { flag }
								className = { flag + "-element" }
								preloaderSrc = { preloader }
								element = { element }
								count = { count }
								oneUp = { oneUp }
								windowWidth = { state.windowWidth }
								windowHeight = { state.windowHeight }
							/>
							<span className = { flag + "-title" }>{ element.title }</span>
						</NavLink>

					</div>
				</div>
			)

			return divTag

		} )

		return (
			<div className = "appear grid" id = "works">
				<div className = "flexbox row freedom-below uppercase">
					{ teaserTag }
				</div>
			</div>
		)
	}
}

export default Gallery

import React from 'react'

import Teaser from './Teaser'
import * as helpers from '../handler/helpers'



class Gallery extends React.Component {

	_isMounted = false

	constructor( props ) {
		super( props )
		this.state = {

			hover: false,
			// handle elements
			allElementsLoaded: false,
			loadedElements: [],
			count: 0,
			// batch
			batchSize: this.getBatchSize(),
			batchLoaded: false,
			batchNumber: 1,

		}

		// handle elements
		this.oneUp = this.handleNextElement.bind( this )
		this.scroll = e => this.handleNextBatch( e )
		
		// refs
		this.teaserRef = React.createRef()
	}


	componentDidMount() {
		console.log( "G MOUNTED", this.state.count )
		this._isMounted = true
		// if ( !this.state.batchSize ) this.getBatchSize()		
		// window.addEventListener( "resize", this.handleResize.bind( this ) )
		window.addEventListener( "scrollingDown", this.scroll )
	}

	componentWillUnmount() {
		this._isMounted = false
		// window.removeEventListener( "resize", this.handleResize.bind( this ) )
		window.removeEventListener( "scrollingDown", this.scroll )
	}

	// handleResize( e ) {
	// 	this.getBatchSize()
	// }
	// handleScroll( e ) {
	// 	const scrollingDown = this.props.state.scrollingDown
	// 	const scrollY = window.scrollY
	// 	const y = this.props.state.windowHeight * 2
	// 	console.log( "SCROLLING", scrollingDown, y )
	// 	// TODO: change scroll rules
	// 	if ( this._isMounted && scrollingDown && scrollY > y ) {
	// 		console.log( "SCROLLING DOWN" )
	// 		// this.handleNextBatch()
	// 	}
	// }

	getBatchSize() {

		// window dimensions
		const width = this.props.state.windowWidth
		const height = this.props.state.windowHeight

		// TODO: get those from json
		// css vars
		const unit = 20
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
		const batchSize = visibleItems * 1
		console.log( "batchSize", batchSize )
		
		if ( this._isMounted ) {
			this.setState( {
				batch: batchSize
			} )
		} else {
			return batchSize
		}

	}
	handleNextBatch( e ) {
		console.log( "LOAD NEXT BATCH", this.state.allElementsLoaded, this.state.batchLoaded )
		if ( !this.state.allElementsLoaded && this.state.batchLoaded ) {
			const nextBatch = this.state.batchNumber + 1
			this.setState( {
				batchLoaded: false,
				batchNumber: nextBatch
			} )
			this.handleNextElement( this.state.count )
		}
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
	stopLoading() {

		window.removeEventListener( "scrollingDown", this.scroll )
		// window.removeEventListener( "resize", this.handleResize.bind( this ) )

		this.setState( {
			allElementsLoaded: true,
			count: null
		} )

	}



	
	render() {
		
		// content info
		const state = this.props.state
		const count = this.state.count
		const showcases = state.showcases
		
		const teaserTag = showcases.map( ( showcase, i ) => {
			
			const teaser = showcase.teaser
			const width = teaser.width
			const height = teaser.height
			const isRebel = width > height
			const className = "item " + ( isRebel ? "rebel" : "citizen" )

			const props = {
				count: count,
				loaded: i <= count,
				oneUp: this.oneUp,
				linkTo: `/showcase/${ showcase.folder }`,
				preloader: state.preloader,
				element: {
					index: i,
					src: helpers.getFullPath( state.showcasesPath, showcase.folder, teaser.name ),
					type: helpers.getFileType( teaser.name ),
					title: showcase.title,
					width: width,
					height: height
				},
				windowWidth: state.windowWidth,
				windowHeight: state.windowHeight
			}

			return (
				<div 
					className = { className }
					key = { showcase.id }
				>
					<Teaser { ...props }/>
				</div>
			)

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

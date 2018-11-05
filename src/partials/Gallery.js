import React from 'react'

import Teaser from './Teaser'
import * as helpers from '../handler/helpers'



class Gallery extends React.Component {

	_isMounted = false

	constructor( props ) {

		super ( props )
		
		this.state = {
			allElementsLoaded: false,
			loadedTeasers: [ this.props.state.showcases[0] ],
			count: 1,
			batch: this.getBatchSize(),
			batchLoaded: false,
			batchNumber: 1,
			initialHeight: null
		}
		this.oneUp = this.nextImageHandler.bind( this )
		
	}
	
	componentDidMount() {
		
		this._isMounted = true

		this.getBatchSize()
		
		window.addEventListener( "scroll", this.handleScroll.bind( this ) )
		window.addEventListener( "resize", this.handleResize.bind( this ) )
		
	}

	componentWillUnmount() {
		
		this._isMounted = false

		window.removeEventListener( "scroll", this.handleScroll.bind( this ) )
		window.removeEventListener( "resize", this.handleResize.bind( this ) )
		
	}

	getBatchSize() {
		
		const width = window.innerWidth
		const height = window.innerHeight
		
		
		let unit = 20
		const gap = unit * 2
		const pageFrame = width > 1024 ? unit * 5 : unit
		let item = 320
		
		if ( width > 1365 ) {
			item = 400
		} else if ( width < 834 ) {
			item = 320 - pageFrame * 2
		}		
		
		const itemWidth = item + gap		
		const netWidth = ( width - pageFrame * 2 ) / itemWidth
		const columns = Math.floor( netWidth )		
		const netHeight = ( height - pageFrame * 2 ) / itemWidth
		const rows = Math.floor( netHeight )
		const visibleItems = columns * rows
		const batchSize = visibleItems * 3

		if ( this._isMounted ) {

			this.setState( {
				batch: batchSize,
				initialHeight: height
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

		if ( this._isMounted && this.props.state.scrollingDown && scrollY > this.state.initialHeight * 2 ) {
			this.loadNextBatch()
		}
			
	}
	
	loadNextBatch() {
		
		if ( !this.state.allElementsLoaded && this.state.batchLoaded ) {

			const nextBatch = this.state.batchNumber + 1
			this.setState( {
				batchLoaded: false,
				batchNumber: nextBatch
			} )

			this.nextImageHandler( this.state.count + 1 )
		}
		
	}
	
	handleBatch( i, allShowcases ) {

		const lastImage = i - 1
		const loadingBatch = this.state.batchNumber
		const remainingTeasers = allShowcases - this.state.loadedTeasers.length
		const batch = remainingTeasers < this.state.batch ? remainingTeasers : this.state.batch
		
		if ( remainingTeasers === 0) {
			window.removeEventListener( "scroll", this.handleScroll.bind( this ) )
			window.removeEventListener( "resize", this.handleResize.bind( this ) )
		}
		
		if ( lastImage === batch * loadingBatch ) {
			
			this.setState( {
				batchLoaded: true
			} )
			
		}

	}
	
	nextImageHandler( i ) {
		
		const showcases = this.props.state.showcases
		const allShowcases = showcases.length
		const loadedTeasers = this.state.loadedTeasers
		
		this.handleBatch( i, allShowcases )
		
		if ( this.state.allElementsLoaded || this.state.batchLoaded ) {

			return

		} else {
			
			const updated = loadedTeasers.concat( showcases[ this.state.count ] )

			if ( i > allShowcases ) {
				
				this.setState( {
					allElementsLoaded: true,
					count: 1
				} )
				
			} else {

				this.setState( {
					loadedTeasers: updated,
					count: i
				} )

			}

		}

	}

	render() {

//		TODO: choose image size according to screen dimensions and available speed

		const loadedTeasers = this.state.loadedTeasers
		const imagesPath = this.props.state.imagesPath
		const showcasesPath = imagesPath + "/showcases"
		const allElementsLoaded = this.state.allElementsLoaded
		const oneUp = allElementsLoaded ? null : this.oneUp
		const batch = this.state.batch
		
		const teaser = loadedTeasers.map( ( showcase, i ) => (

			<Teaser 
				{ ...showcase }
				key = { showcase._id }
				unloadedSrc = { helpers.getFullPath( imagesPath, "tools", "tail-spin.svg" ) }
				src = { helpers.getFullPath( showcasesPath, showcase.folder, showcase.teaser ) }
				onClick = { ( i ) => this.props.onClick( i ) }
				count = { this.state.count }
				oneUp = { oneUp }
				allElementsLoaded = { allElementsLoaded }
				batch = { batch }
			/>

		) )

		return (

			<div className = "grid header-space" id = "works">
			
				<div className = "flexbox row freedom-below uppercase">
			
					{ teaser }
					
				</div>

			</div>

		)
	}
}

export default Gallery

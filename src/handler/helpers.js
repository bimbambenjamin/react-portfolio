export const checkActive = ( match, location ) => {

	return match ? true : false
	
}

export function getFullPath( path, folder, file ) {
    
    if ( file ) {

        if ( file.includes( "http" ) ) {
            return file
        } else {
            const fullPath = path + "/" + folder + "/" + file
            return fullPath
        }
        
    }

}

export function getFiletype( filename ) {

    console.log( "FN getFileType", typeof filename )

	if ( typeof filename === "string" ) {
        
        console.log( "STRING !!!", filename )

		const extension = filename.split( '.' ).pop()

        // mimeType?
		if ( extension === "jpg" || extension === "gif" || extension === "png" || extension === "jpeg" ) {
			return "image"
		} else if ( filename.includes( "vimeo" ) ) {
            const vimeoPlayerUrl = "https://player.vimeo.com/video/" + filename.split( "/" ).pop()
            return vimeoPlayerUrl
		} else if ( extension === "mp4" ) {
			return "video"
		} else {
			return "not valid"
		}

	}

}

export function changeLogoColor( logoPath, colorString ) {

	if ( typeof logoPath === "string" ) {

		const splitPath = logoPath.split( "/" )
		const logo = splitPath.pop()
		const reconstructedPath = splitPath.join( "/" )

		const filename = logo.split( '.' ).shift()
		const extension = logo.split( '.' ).pop()
		const newLogo = 
			reconstructedPath + 
			"/" + 
			filename + 
			"-" + 
			colorString + 
			"." + 
			extension

		return newLogo
	}

}	

export function cleanTitle( text ) {

    // TODO: clean title
    const result = text
    
    return result
    
}

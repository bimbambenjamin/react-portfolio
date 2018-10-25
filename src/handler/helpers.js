export const checkActive = ( match, location ) => {

	return match ? true : false
	
}

export function getFullPath( path, folder, file ) {

	const fullPath = path + "/" + folder + "/" + file
	return fullPath

}

export function getFiletype( filename ) {

	if ( typeof filename === "string" ) {

		const extension = filename.split( '.' ).pop()

		if ( extension === "jpg" || extension === "gif" || extension === "png" || extension === "jpeg" ) {
			return "image"
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

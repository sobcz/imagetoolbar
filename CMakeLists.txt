# CMake Basics
cmake_minimum_required (VERSION 2.8.11)
project (imagetoolbox)

# Preprocessor Metadata
set(ADDON_ID "imagetoolbox@addons.palemoon.org")
set(ADDON_VERSION "1.0.0")
set(ADDON_NAME "Image Toolbox")
set(ADDON_XPI_NAME "imagetoolbox")
set(ADDON_SHORT_DESC "")
set(ADDON_LONG_DESC "")
set(ADDON_AUTHOR "Pale Moon Add-ons Team")
set(ADDON_TARGET_APP_NAME "Pale Moon")
set(ADDON_TARGET_APP_ID "{8de7fcbb-c55c-4fbe-bfc5-fc555c87dbc4}")
set(ADDON_TARGET_APP_MINVER "25.0")
set(ADDON_TARGET_APP_MAXVER "25.*")
set(ADDON_APMO_ID "")
set(ADDON_APMO_TYPE "extension")

# Process Pale Moon Add-ons Site manifest.ini
configure_file(
	${CMAKE_SOURCE_DIR}/manifest.ini.in 
	${CMAKE_BINARY_DIR}/dist/package/manifest.ini 
	@only
)

# Copy Add-on files to dist/bin
file(
	COPY "${CMAKE_SOURCE_DIR}/src/"
	DESTINATION "${CMAKE_BINARY_DIR}/dist/bin/"
)

# Process Add-on chrome.manifest file
configure_file(
	${CMAKE_SOURCE_DIR}/chrome.manifest.in 
	${CMAKE_BINARY_DIR}/dist/bin/chrome.manifest 
	@only
)

# Process Add-on install.rdf file
configure_file(
	${CMAKE_SOURCE_DIR}/install.rdf.in 
	${CMAKE_BINARY_DIR}/dist/bin/install.rdf 
	@only
)

# Zip up the dist/bin contents into an XPI file and hash it to the console
add_custom_command (
	WORKING_DIRECTORY ${CMAKE_BINARY_DIR}/dist/bin/
	OUTPUT ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
	COMMAND zip -r ../package/${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi ./
	DEPENDS package-xpi
)

add_custom_target(
	package-xpi
	ALL
	DEPENDS ${ADDON_XPI_NAME}-${ADDON_VERSION}.xpi
)

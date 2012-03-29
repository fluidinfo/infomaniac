all:
	zip -r infomaniac.xpi chrome chrome.manifest install.rdf

clean:
	-rm infomaniac.xpi

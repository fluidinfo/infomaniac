all:
	zip -r infomaniac.xpi defaults chrome chrome.manifest install.rdf

clean:
	-rm infomaniac.xpi

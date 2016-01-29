JS_FILES = \
	lib/prefix.js \
	lib/core.js \
	lib/postfix.js \
	lib/deco/prefix.js \
	lib/deco/buhlmann.js \
	lib/deco/postfix.js

JS_COMPILER = \
        uglifyjs


BROWSERIFY_COMPILER = \
        browserify

all: scuba-dive.js scuba-dive.min.js scuba-dive.browserified.js

scuba-dive.js: $(JS_FILES)
scuba-dive.min.js: $(JS_FILES)
scuba-dive.browserified.js: scuba-dive.js

scuba-dive.js: Makefile
	  rm -f $@
	  cat $(filter %.js,$^) >> $@

%.min.js:: Makefile
	rm -f $@
	cat $(filter %.js,$^) | $(JS_COMPILER) >> $@

%.browserified.js:: Makefile
	rm -f $@
	$(BROWSERIFY_COMPILER) browser.js -o $@

clean:
	rm -rf scuba-dive.js scuba-dive.min.js scuba-dive.browserified.js

test: all
	grunt test

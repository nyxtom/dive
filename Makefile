JS_FILES = \
	lib/prefix.js \
	lib/core.js \
	lib/postfix.js \
	lib/deco/prefix.js \
	lib/deco/buhlmann.js \
	lib/deco/postfix.js

JS_COMPILER = \
        uglifyjs

all: scuba-dive.js scuba-dive.min.js
scuba-dive.js: $(JS_FILES)
scuba-dive.min.js: $(JS_FILES)

scuba-dive.js: Makefile
	  rm -f $@
	  cat $(filter %.js,$^) >> $@

%.min.js:: Makefile
	rm -f $@
	cat $(filter %.js,$^) | $(JS_COMPILER) >> $@

clean:
	rm -rf scuba-dive.js scuba-dive.min.js

test: all
	grunt test

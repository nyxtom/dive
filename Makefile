JS_FILES = \
	lib/prefix.js \
	lib/core.js \
	lib/postfix.js

JS_COMPILER = \
        uglifyjs

all: dive.js dive.min.js
dive.js: $(JS_FILES)
dive.min.js: $(JS_FILES)

dive.js: Makefile
	  rm -f $@
	  cat $(filter %.js,$^) >> $@

%.min.js:: Makefile
	rm -f $@
	cat $(filter %.js,$^) | $(JS_COMPILER) >> $@

clean:
	rm -rf dive.js n3.min.js

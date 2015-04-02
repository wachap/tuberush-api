DEFAULT:
	make test

test:
	.\node_modules\mocha\bin\mocha $(ARGS) test/

.PHONY: \
	DEFAULT \
	test \


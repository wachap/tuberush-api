DEFAULT:
	make test

test:
	C:\Users\Jaime\AppData\Roaming\npm\node_modules\mocha\bin\mocha $(ARGS) test/

.PHONY: \
	DEFAULT \
	test \


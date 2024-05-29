install:
	npm ci

publish:
	npm publish --dry-run

link:
	npm link

test:
	NODE_OPTIONS=--experimental-vm-modules npx jest
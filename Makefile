deploy:
	cd next && npm run build && rm -rf ../pages && mv -f ./out ../pages
	npm run deploy

page-build:
	cd next && npm run build && rm -rf ../pages && mv -f ./out ../pages

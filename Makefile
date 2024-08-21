run:
	@npm run dev
ui:
	@npx shadcn-ui@latest add $(ARGS)
db-push:
	@npx prisma db push
db-generate:
	@npx prisma generate
20:
	@nvm use 20
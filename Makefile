run:
	@npm run dev
ui:
	@npx shadcn-ui@latest add $(ARGS)
db-push:
	@npx prisma db push
db-generate:
	@npx prisma generate
db-seed:
	@npx prisma db seed
20:
	@nvm use 20
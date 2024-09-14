run:
	@npm run dev
ui:
	@npx shadcn@latest add $(ARGS)
db-p:
	@npx prisma db push
db-g:
	@npx prisma generate
db:
	@npx prisma generate && npx prisma db push
db-seed:
	@npx prisma db seed
20:
	@nvm use 20
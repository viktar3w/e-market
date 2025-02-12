run:
	@npm run dev
ui:
	@npx shadcn@latest add $(ARGS)
db:
	@npx prisma generate && npx prisma db push
db-p:
	@npx prisma db push
db-g:
	@npx prisma generate
db-seed:
	@npx prisma db seed
20:
	@nvm use 20
gen:
	@npm run codegen
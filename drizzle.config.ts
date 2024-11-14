import { defineConfig } from 'drizzle-kit';
import { Resource } from 'sst';

export default defineConfig({
	dialect: "postgresql",
	schema: './src/lib/server/db/schema.ts',
	out: './drizzle',
	dbCredentials: {
		ssl: {
			rejectUnauthorized: false,
		},
		host: Resource.MyPostgres.host,
		port: Resource.MyPostgres.port,
		user: Resource.MyPostgres.username,
		password: Resource.MyPostgres.password,
		database: Resource.MyPostgres.database,
	},

});

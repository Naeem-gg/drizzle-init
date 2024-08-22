# drizzle-init

![Naeemgg](https://img.shields.io/badge/Naeemgg-yellow)

`drizzle-init` is a CLI tool designed to initialize a Drizzle ORM setup with various database configurations, including PostgreSQL, SQLite, and MySQL. This tool simplifies the process of creating the necessary configuration files and folders for your Drizzle-based project.

## TODOs

- [ ] Add support for env variables
- [ ] Implement unit tests
- [ ] Improve error handling and logging
- [ ] Add more customization options for the generated configuration
- [ ] Write detailed documentation for each command and option
- [ ] Add a feature to check for existing files before overwriting

## Features

- **Database Support**: Configure your project for PostgreSQL, SQLite, or MySQL.
- **Automated Setup**: Automatically creates necessary directories and files, including `drizzle.config.ts`, `schema.ts`, and `db.ts`.
- **Custom Configuration**: Choose from various database providers and customize the generated configuration based on your project requirements.
- **Custom Scripts**: automatically adds useful database management scripts to your `package.json`.
## Installation

To install `drizzle-init`, you can clone the repository and install dependencies:

```bash
npx drizzle-init
    # OR
git clone https://github.com/naeem-gg/drizzle-init.git
cd drizzle-init
npm install
```

You can also install it globally:

```bash
npm install -g drizzle-init
```

## Usage

After installing, you can use the CLI by running:

```bash
drizzle-init
```

This will prompt you to choose your database and provider, and automatically generate the necessary files.

### Example

```bash
$ npx drizzle-init

Choose your database?
> postgresql
> sqlite
> mysql

What are you using?
> Neon
> Xata
> PostgresJS
> node-postgres
> Vercel Postgres
> Supabase
> AWS Data API
> HTTP Proxy

Directory 'drizzle' has been created successfully.
Directory 'migrations' has been created successfully.
schema.ts has been created successfully.
db.ts has been created successfully.
drizzle.config.ts has been written successfully.
```

## File Structure

After running the CLI, your project structure will look like this:

```
/your-project/
  ├── drizzle/
  │   ├── schema.ts
  │   ├── db.ts
  │   └── migrations/
  └── drizzle.config.ts
```

### Configuration Files

- **`drizzle.config.ts`**: Contains the configuration for Drizzle ORM based on the database and provider you selected.
- **`schema.ts`**: Placeholder for your database schema.
- **`db.ts`**: Contains the setup for connecting to your database.

## Scripts

The `drizzle-init` tool automatically adds useful database management scripts to your `package.json`:

- **`db:pull`**: Introspect the database schema.
- **`db:push`**: Apply the latest changes to the database.
- **`db:migrate`**: Run pending migrations.
- **`db:generate`**: Generate types and migrations based on your schema.
- **`db:drop`**: Drop the current database schema.
- **`db:up`**: Apply all migrations to bring the database up to date.
- **`db:check`**: Verify the database state against the schema.
- **`db:studio`**: Launch a database management studio for interaction.

These scripts help streamline database operations and ensure consistency across your development workflow.


## Contributing

Contributions are welcome! If you have any ideas, issues, or suggestions, feel free to open an issue or create a pull request.

1. Fork the repository.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add some feature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a pull request.

## License

This project is licensed under the ISC License.

## Acknowledgments

Special thanks to the developers of Drizzle ORM and the open-source community for their contributions.


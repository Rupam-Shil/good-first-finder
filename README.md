# GitHub Good First Issues

A web application that helps developers find and contribute to open-source projects by searching for "good first issues" on GitHub. This tool makes it easier for newcomers to start their open-source journey by providing an intuitive interface to discover beginner-friendly issues.

![GitHub Good First Issues](public/logo.png)

## Features

- **Smart Search**: Find repositories containing "good first issues" with comprehensive filtering options
- **Detailed Information**: View complete issue details including repository info, descriptions, labels, and assignees
- **Modern UI**: Clean and intuitive interface built with Next.js and Tailwind CSS
- **Real-time Updates**: Auto-updating results as you modify search criteria
- **Repository Insights**: Quick access to repository stars, activity, and other metrics

## Tech Stack

- [Next.js](https://nextjs.org) - React framework for production
- [Tailwind CSS](https://tailwindcss.com) - Utility-first CSS framework
- [GitHub API](https://docs.github.com/en/rest) - For fetching repository and issue data
- [Bun](https://bun.sh) - Fast JavaScript runtime and package manager

## Getting Started

### Prerequisites

- [Bun](https://bun.sh) installed on your machine

### Installation

1. Clone the repository

```bash
git clone https://github.com/yourusername/good-first-issue.git
cd good-first-issue
```

2. Install dependencies

```bash
bun install
```

3. Start the development server

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Usage

1. Enter your search criteria in the search box
2. Use filters to narrow down results by:
   - Programming language
   - Repository stars
   - Issue labels
   - Last updated date
3. Click on an issue to view detailed information
4. Start contributing!

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Thanks to GitHub for providing the API
- All the open-source projects that inspire us
- Contributors who help improve this project

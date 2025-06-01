# Mutual Fund Category & Performance Visualization  
**Interactive Web-Based Financial Dashboard | D3.js v7 | Kent State University Team Project**

## Overview
This project presents an interactive financial dashboard that enables users to explore performance metrics, expense ratios, and category-wise asset distribution across U.S. mutual funds. Built using D3.js v7 and deployed via GitHub Pages, the system supports real-time data visualization with high interactivity—ideal for financial analysts, investors, and educators.

Developed as part of the *Information Visualization* course at Kent State University, the project emphasizes accessibility, usability, and decision-support for non-technical users engaging with complex mutual fund data.

---

## Live Demo & Source

- **Live Site:** [https://subhasmita23-s.github.io/Mutualfund-vis/](https://subhasmita23-s.github.io/Mutualfund-vis/)
- **GitHub Repository:** [https://github.com/Subhasmita23-S/Mutualfund-vis](https://github.com/Subhasmita23-S/Mutualfund-vis)

---

## Team Collaboration

| Name                     | Role & Contributions                                                  |
|--------------------------|-----------------------------------------------------------------------|
| **Mukthasree Vengoti**   | Designed Treemap Visualization, implemented asset distribution logic, enhanced zoom and tooltip interactivity |
| **Keerthi Akhila Pasam** | Led data cleaning, assisted in correlation analysis, and built scatter plot interactivity |
| **Subhasmita Maharana**  | Created grouped bar chart visualization, coordinated repository structure and deployment via GitHub Pages |

All members collaboratively contributed to planning, development, and refining user interactions.

---

## Features

- Fully browser-based interactive dashboard (no backend required)
- Visualization modules: Bar Chart, Scatter Plot, Treemap
- Dynamic filtering, brushing, zoom, tooltips, and axis scaling
- Modular architecture for easy maintenance and scalability
- Designed for clarity and responsiveness on modern browsers

---

## Visualization Tasks

### Task 1: Compare Fund Performance Over Time  
**Grouped Bar Chart** for 3MO, YTD, 1YR, 3YR, 5YR, 10YR returns

- Dropdown: Sort by selected return period
- Brushing: View Top 10, Top 20, or Top 50 funds
- Tooltip: View exact return values on hover
- Scroll: Navigate horizontal overflow

> File: `task1_bar_chart/task1_index.html`

---

### Task 2: Analyze Expense Ratio vs Performance  
**Scatter Plot** comparing return % vs. fund expense ratio

- Dropdown: Switch between different return periods
- Tooltip: Display fund name, return, and fee
- Color scale: Encodes return strength visually
- Axes adjust automatically to data range

> File: `task2_scatter_plot/task2_index.html`

---

### Task 3: Explore Fund Categories by Assets  
**Treemap** for visualizing asset concentration by fund category

- Zoom interaction: Click to enlarge a category
- Reset button: Return to full view
- Tooltip: Category name, total assets, fund count, asset share %
- Color scale: Relative total assets

> File: `task3_treemap/task3_index.html`

---

## Technical Stack

| Technology      | Purpose                                  |
|------------------|-------------------------------------------|
| HTML, CSS        | Structure and layout                     |
| JavaScript       | Interactivity logic                      |
| D3.js v7         | Data-driven document rendering            |
| CSV              | Cleaned financial datasets               |
| GitHub Pages     | Hosting and public deployment            |

---

## Dataset

- Derived from anonymized mutual fund performance records
- Cleaned with custom scripts to standardize formats
- Includes returns (3MO to 10YR), net assets, expense ratios, and categories
- Aggregated per category for treemap view

---

## How to Run Locally

```bash
git clone https://github.com/vengotimuktha/mutual-fund-visualization.git
cd mutual-fund-visualization

# Open any of these in a browser:
# task1_bar_chart/task1_index.html
# task2_scatter_plot/task2_index.html
# task3_treemap/task3_index.html
```
## Academic Acknowledgment

This project was developed for the *Information Visualization* course (Spring 2025) at **Kent State University**. We thank our instructors for their valuable feedback and guidance throughout the development process.
